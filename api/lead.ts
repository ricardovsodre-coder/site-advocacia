// api/lead.ts — salva lead do formulário mobile (POST). Leitura via painel Vercel KV.
// Sem dependências (usa REST direto) para funcionar no deploy estático.
export const config = { runtime: 'edge' };

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204 });
  if (req.method !== 'POST') return json({ error: 'method' }, 405);

  let body: any = null;
  try { body = await req.json(); } catch { return json({ error: 'json' }, 400); }

  const nome = String(body?.nome ?? '').trim().slice(0, 80);
  const fone = String(body?.fone ?? '').replace(/\D/g, '').slice(0, 13);
  const caso = String(body?.caso ?? '').trim().slice(0, 600);
  const lgpd = body?.lgpd === true;
  if (nome.length < 2 || fone.length < 10 || !lgpd) return json({ error: 'dados' }, 422);

  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return json({ error: 'kv-off' }, 500);

  const key = 'lead:' + Date.now();
  const val = JSON.stringify({ nome, fone, caso, origem: 'mobile', data: new Date().toISOString() });
  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
      body: JSON.stringify(['SET', key, val]),
    });
    if (!r.ok) return json({ error: 'kv' }, 500);
  } catch { return json({ error: 'kv' }, 500); }

  return json({ ok: true });
}
