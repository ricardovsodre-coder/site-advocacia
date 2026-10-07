// api/lead.ts — Vercel Edge Function: Exportar leads (protegido por token)
import { createClient } from '@vercel/kv';

export const config = {
  runtime: 'edge',
};

const kv = createClient({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export default async function handler(request: Request): Promise<Response> {
  // CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': 'https://verissimosodre.com.br',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
      },
    });
  }

  // Auth check
  const auth = request.headers.get('authorization');
  const expectedToken = process.env.LEAD_EXPORT_TOKEN;
  if (!expectedToken || auth !== `Bearer ${expectedToken}`) {
    return new Response(JSON.stringify({ error: 'unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // List all leads
  const leads = [];
  const keys = await kv.keys('lead:*');
  
  for (const key of keys) {
    const lead = await kv.get(key);
    if (lead) {
      leads.push(lead);
    }
  }

  // Sort by last activity (newest first)
  leads.sort((a, b) => (b.lastActivity || 0) - (a.lastActivity || 0));

  return new Response(JSON.stringify({ leads, total: leads.length }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'https://verissimosodre.com.br',
      'Access-Control-Allow-Credentials': 'true',
    },
  });
}