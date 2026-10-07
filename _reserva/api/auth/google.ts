// api/auth/google.ts — Vercel Edge Function: OAuth Google callback
import { createClient } from '@vercel/kv';

export const config = {
  runtime: 'edge',
};

const kv = createClient({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export default async function handler(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');
  const state = url.searchParams.get('state') || '';

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': 'https://verissimosodre.com.br',
    'Access-Control-Allow-Credentials': 'true',
  };

  // Handle OAuth errors
  if (error) {
    const redirectUrl = `/chat?error=${encodeURIComponent(error)}`;
    return Response.redirect(`${url.origin}${redirectUrl}`, 302);
  }

  if (!code) {
    const redirectUrl = '/chat?error=missing_code';
    return Response.redirect(`${url.origin}${redirectUrl}`, 302);
  }

  try {
    // Exchange code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: `${url.origin}/api/auth/google`,
        grant_type: 'authorization_code',
      }),
    });

    const tokens = await tokenResponse.json();
    if (!tokenResponse.ok) {
      throw new Error(tokens.error_description || 'Token exchange failed');
    }

    // Get user info
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
    const user = await userResponse.json();

    const userId = user.id;
    const email = user.email;
    const name = user.name;
    const picture = user.picture;

    // Create session in Vercel KV (30 days)
    const sessionData = {
      userId,
      email,
      name,
      picture,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      createdAt: Date.now(),
      expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
      questionsToday: 0,
      lastQuestionDate: new Date().toISOString().split('T')[0],
    };

    await kv.set(`session:${userId}`, sessionData, { ex: 30 * 24 * 60 * 60 });

    // Set httpOnly cookie
    const cookie = `session_id=${userId}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${30 * 24 * 60 * 60}`;

    // Redirect to chat with area context
    const redirectUrl = `/chat?area=${encodeURIComponent(state)}`;
    return new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        Location: redirectUrl,
        'Set-Cookie': cookie,
      },
    });
  } catch (e: any) {
    console.error('OAuth error:', e);
    const redirectUrl = `/chat?error=${encodeURIComponent(e.message)}`;
    return Response.redirect(`${url.origin}${redirectUrl}`, 302);
  }
}