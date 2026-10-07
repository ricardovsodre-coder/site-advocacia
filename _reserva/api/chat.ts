// api/chat.ts — Vercel Edge Function: Chat IA (Gemini 1.5 Flash) + rate limit + save lead
import { createClient } from '@vercel/kv';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const config = {
  runtime: 'edge',
};

const kv = createClient({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// System prompt — advogado trabalhista lado do empregado
const SYSTEM_PROMPT = `Você é um assistente jurídico especializado em Direito do Trabalho (lado do empregado), atuando sob supervisão do Dr. Ricardo Sodré (OAB/SP 441.049).

REGRAS OBRIGATÓRIAS:
1. NUNCA prometa resultado, valor exato ou prazo garantido.
2. SEMPRE informe: "Esta é uma orientação informativa baseada na CLT e jurisprudência. A análise definitiva do seu caso e a ação judicial são feitas pelo advogado."
3. Use linguagem clara, sem juridiquês. Explique termos técnicos em 1 frase.
4. Foque em direitos de empregados com renda até R$ 5.000/mês.
5. Se o caso for complexo ou urgente, oriente: "Procure atendimento completo via WhatsApp para análise de documentos e prazos."
6. Não invente leis, súmulas ou precedentes. Se não souber, diga: "Preciso consultar a legislação atualizada para te responder com precisão."
7. Responda em português do Brasil, tom empático mas técnico.

ÁREAS PRINCIPAIS:
- Rescisão indireta / verbas rescisórias / multa art. 477
- Horas extras, banco de horas, intervalo intrajornada
- Assédio moral, discriminação, metas abusivas
- Trabalho sem registro (vínculo empregatício)
- Justa causa indevida
- Insalubridade / periculosidade / adicional noturno
- Acidente de trabalho / doença ocupacional / CAT / estabilidade
- FGTS, seguro-desemprego, PIS
- Acordos/Convenções coletivas

FORMATO DE RESPOSTA:
- Resposta direta (2-4 parágrafos curtos)
- "O que a lei diz:" (1-2 bullets)
- "O que fazer agora:" (2-3 passos práticos)
- Rodapé fixo: "Orientação informativa. Assessoria completa: Dr. Ricardo Sodré — OAB/SP 441.049 | WhatsApp: (15) 98803-3000"`;

export default async function handler(request: Request): Promise<Response> {
  // CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': 'https://verissimosodre.com.br',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
      },
    });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Get userId from cookie
  const cookie = request.headers.get('cookie') || '';
  const match = cookie.match(/session_id=([^;]+)/);
  const userId = match?.[1];

  if (!userId) {
    return new Response(JSON.stringify({
      error: 'unauthorized',
      loginUrl: '/api/auth/google'
    }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Get session from KV
  const session = await kv.get(`session:${userId}`);
  if (!session) {
    return new Response(JSON.stringify({
      error: 'session_expired',
      loginUrl: '/api/auth/google'
    }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Rate limit: 5 questions per day
  const today = new Date().toISOString().split('T')[0];
  let questionsToday = session.questionsToday || 0;
  let lastQuestionDate = session.lastQuestionDate || '';

  if (lastQuestionDate !== today) {
    questionsToday = 0;
    lastQuestionDate = today;
  }

  if (questionsToday >= 5) {
    return new Response(JSON.stringify({
      error: 'rate_limit',
      message: 'Você atingiu o limite de 5 perguntas hoje. Para análise completa do seu caso, fale direto no WhatsApp: (15) 98803-3000',
      resetAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body: { message: string; area?: string; history?: Array<{role: string, content: string}> };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'invalid_json' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { message, area, history = [] } = body;
  if (!message?.trim()) {
    return new Response(JSON.stringify({ error: 'empty_message' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Ping check
  if (message === '__ping__') {
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Increment counter
    questionsToday += 1;
    const updatedSession = {
      ...session,
      questionsToday,
      lastQuestionDate: today,
    };
    await kv.set(`session:${userId}`, updatedSession, { ex: 30 * 24 * 60 * 60 });

    // Prepare chat history for model
    const chatHistory = [
      { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
      { role: 'model', parts: [{ text: 'Entendido. Estou pronto para orientar dentro desses parâmetros.' }] },
      ...history.slice(-6).map(h => ({
        role: h.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: h.content }],
      })),
      { role: 'user', parts: [{ text: `Área: ${area || 'geral'}\nPergunta: ${message}` }] },
    ];

    // Stream response
    const result = await model.generateContentStream({ contents: chatHistory });
    const encoder = new TextEncoder();
    let fullText = '';

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of result.stream) {
          const text = chunk.text();
          if (text) {
            fullText += text;
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text, done: false })}\n\n`));
          }
        }

        // Save lead
        await saveLead(userId, session, area || 'geral', message, fullText);

        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: '', done: true, questionsLeft: 5 - questionsToday })}\n\n`));
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': 'https://verissimosodre.com.br',
        'Access-Control-Allow-Credentials': 'true',
      },
    });
  } catch (e: any) {
    console.error('Chat error:', e);
    return new Response(JSON.stringify({
      error: 'internal_error',
      message: 'Erro ao processar. Tente novamente ou chame no WhatsApp.'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

async function saveLead(userId: string, session: any, area: string, question: string, answer: string) {
  const leadKey = `lead:${userId}`;
  let lead = await kv.get(leadKey) || {
    userId,
    email: session.email,
    name: session.name,
    createdAt: Date.now(),
    questions: [],
  };

  lead.questions.push({
    area,
    question,
    answer: answer.slice(0, 500),
    timestamp: Date.now(),
  });
  lead.lastActivity = Date.now();

  await kv.set(leadKey, lead, { ex: 90 * 24 * 60 * 60 });
}