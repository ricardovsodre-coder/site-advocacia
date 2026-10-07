// api/chat.ts — proxy seguro do Gemini (a chave fica no servidor, nunca no navegador).
// OAB-safe: prompt proíbe promessa de resultado, valor ou prazo.
export const config = { runtime: 'edge' };

const SYS = 'Você é a assistente informativa do escritório Veríssimo Sodré (Advocacia Trabalhista, OAB/SP 441.049). Responda SOMENTE sobre Direito do Trabalho brasileiro, em português simples e direto, de forma resumida. Nunca prometa resultado, valor exato ou prazo. Para outros assuntos, indique o WhatsApp (15) 98803-3000 e o e-mail escritorio@verissimosodre.com.br. Nunca invente artigos de lei.';

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') return json({ error: 'method' }, 405);

  let body: any = null;
  try { body = await req.json(); } catch { return json({ error: 'json' }, 400); }
  const q = String(body?.q ?? '').trim().slice(0, 600);
  if (q.length < 2) return json({ error: 'q' }, 422);

  const key = process.env.GEMINI_API_KEY;
  if (!key) return json({ error: 'key-off' }, 500);

  const hist = Array.isArray(body?.hist) ? body.hist.slice(-6) : [];
  const contents = hist.flatMap((h: any) => ([
    { role: 'user', parts: [{ text: String(h.u ?? '').slice(0, 600) }] },
    { role: 'model', parts: [{ text: String(h.a ?? '').slice(0, 600) }] },
  ]));
  contents.push({ role: 'user', parts: [{ text: q }] });

  const models = ['gemini-2.0-flash', 'gemini-1.5-flash'];
  for (const model of models) {
    try {
      const r = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent?key=' + encodeURIComponent(key),
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: SYS }] },
            contents,
            generationConfig: { temperature: 0.4, maxOutputTokens: 700 },
          }),
        }
      );
      if (!r.ok) continue;
      const d: any = await r.json();
      const t = (d?.candidates?.[0]?.content?.parts ?? []).map((p: any) => p?.text ?? '').join('').trim();
      if (t) return json({ a: t });
    } catch { /* tenta próximo modelo */ }
  }
  return json({ error: 'ia' }, 502);
}
