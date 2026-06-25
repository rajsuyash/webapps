/*
 * Maya backend — mock API server for the Malabar Gold WhatsApp AI concierge demo.
 * Zero dependencies: runs on Node's built-in http. Start with:  node backend/server.js
 *
 * Endpoints
 *   GET  /api/health
 *   GET  /api/rate                         → live (demo) gold rate
 *   GET  /api/products                     → full catalog ( ?cat= ?brand= )
 *   GET  /api/product/:id
 *   GET  /api/stores                       → store directory ( ?city= )
 *   POST /api/recommend     {budget,occasion,category,metal,style,region,gender,n}
 *   GET  /api/cross-sell/:id
 *   POST /api/bridal-plan   {budget}
 *   POST /api/rag           {query}        → grounded answer (RAG)
 *   POST /api/agent         {message,profile} → orchestrated structured reply
 *   POST /api/lead          {name,occasion,budget,category,city,timeline} → qualify + route
 *   POST /api/appointment   {storeId,kind,when,name}
 *   POST /api/voice/transcribe {audioRef,langHint}
 *   POST /api/voice/synthesize {text,lang}
 *   POST /webhook/whatsapp                 → WhatsApp Cloud API webhook stub (+ GET verify)
 */
const http = require('http');
const data = require('./lib/data');
const reco = require('./lib/recommendation');
const rag = require('./lib/rag');
const agent = require('./lib/agent');
const voice = require('./lib/voice');

const PORT = process.env.PORT || 8787;
const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'malabar-maya-demo';

const send = (res, code, body) => {
  res.writeHead(code, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS' });
  res.end(typeof body === 'string' ? body : JSON.stringify(body, null, 2));
};
const readBody = req => new Promise(r => { let b = ''; req.on('data', c => b += c); req.on('end', () => { try { r(b ? JSON.parse(b) : {}); } catch { r({}); } }); });

// ---- lead scoring: turns a captured lead into a 0–100 priority for sales routing ----
function scoreLead(lead) {
  let s = 30;
  const b = Number(String(lead.budget || '').replace(/[^\d]/g, '')) || 0;
  if (b >= 1000000) s += 40; else if (b >= 300000) s += 28; else if (b >= 100000) s += 18; else if (b > 0) s += 8;
  if (/wedding|bridal/i.test(lead.occasion || '')) s += 18;
  if (/anniversary|akshaya|dhanteras|diwali/i.test(lead.occasion || '')) s += 10;
  if (lead.timeline && /today|week|this/i.test(lead.timeline)) s += 12;
  if (lead.city) s += 4;
  s = Math.min(100, s);
  return { score: s, band: s >= 80 ? 'HOT' : s >= 55 ? 'WARM' : 'NURTURE' };
}
function routeLead(lead) {
  const store = data.STORES.find(s => (lead.city || '').toLowerCase().includes(s.city.toLowerCase())) || data.STORES[0];
  const isNRI = /dubai|abroad|nri|uae|overseas|qatar|kuwait/i.test((lead.city || '') + (lead.notes || ''));
  return { team: isNRI ? 'NRI Sales Desk' : `${store.city} sales team`, store: store.name, slaSeconds: 60 };
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const p = url.pathname;
  if (req.method === 'OPTIONS') return send(res, 204, '');

  try {
    // ---- WhatsApp Cloud API webhook (verification handshake + inbound messages) ----
    if (p === '/webhook/whatsapp' && req.method === 'GET') {
      if (url.searchParams.get('hub.verify_token') === VERIFY_TOKEN) return send(res, 200, url.searchParams.get('hub.challenge') || '');
      return send(res, 403, { error: 'verify token mismatch' });
    }
    if (p === '/webhook/whatsapp' && req.method === 'POST') {
      const body = await readBody(req);
      // Extract a text message from the Cloud API envelope (best-effort) and run the agent.
      const msg = body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
      const text = msg?.text?.body || body.message || '';
      const reply = agent.reply(text);
      console.log(`[webhook] in="${text}" → intent=${reply.intent}`);
      // In production you'd POST `reply.blocks` back via the Cloud API /messages endpoint here.
      return send(res, 200, { received: true, reply });
    }

    if (p === '/api/health') return send(res, 200, { ok: true, service: 'maya-backend', time: new Date().toISOString() });
    if (p === '/api/rate') return send(res, 200, data.RATE);

    if (p === '/api/products') {
      let items = data.PRODUCTS;
      const cat = url.searchParams.get('cat'); const brand = url.searchParams.get('brand');
      if (cat) items = items.filter(x => x.cat === cat);
      if (brand) items = items.filter(x => x.brand.toLowerCase() === brand.toLowerCase());
      return send(res, 200, { count: items.length, items });
    }
    if (p.startsWith('/api/product/')) {
      const item = data.PRODUCTS.find(x => x.id === p.split('/').pop());
      return item ? send(res, 200, item) : send(res, 404, { error: 'not found' });
    }
    if (p === '/api/stores') {
      const city = url.searchParams.get('city');
      const items = city ? data.STORES.filter(s => s.city.toLowerCase().includes(city.toLowerCase())) : data.STORES;
      return send(res, 200, { count: items.length, items });
    }
    if (p.startsWith('/api/cross-sell/')) return send(res, 200, { items: reco.crossSell(p.split('/').pop()) });

    if (req.method === 'POST' && p === '/api/recommend') {
      const q = await readBody(req);
      return send(res, 200, { query: q, items: reco.recommend(q, q.n || 3) });
    }
    if (req.method === 'POST' && p === '/api/bridal-plan') {
      const { budget = 1000000 } = await readBody(req);
      return send(res, 200, { budget, allocation: reco.bridalAllocation(budget) });
    }
    if (req.method === 'POST' && p === '/api/rag') {
      const { query } = await readBody(req);
      const a = rag.answer(query);
      return send(res, 200, a || { text: 'No grounded answer — route to human expert.', grounded: false });
    }
    if (req.method === 'POST' && p === '/api/agent') {
      const { message, profile } = await readBody(req);
      const fromClaude = await agent.replyWithClaude(message, profile);
      return send(res, 200, fromClaude || agent.reply(message, profile || {}));
    }
    if (req.method === 'POST' && p === '/api/lead') {
      const lead = await readBody(req);
      const scored = scoreLead(lead);
      const routing = routeLead(lead);
      const leadId = 'LD' + Math.floor(10000 + (Date.now() % 90000));
      console.log(`[lead] ${leadId} score=${scored.score} band=${scored.band} → ${routing.team}`);
      return send(res, 200, { leadId, ...scored, routing, capturedAt: new Date().toISOString(), lead });
    }
    if (req.method === 'POST' && p === '/api/appointment') {
      const a = await readBody(req);
      const store = data.STORES.find(s => s.id === a.storeId) || data.STORES[0];
      return send(res, 200, { confirmed: true, ref: 'APT' + Math.floor(1000 + (Date.now() % 9000)), kind: a.kind || 'visit', store: store.name, when: a.when || 'Tomorrow 6:30 PM', name: a.name || null });
    }
    if (req.method === 'POST' && p === '/api/voice/transcribe') {
      const { audioRef, langHint } = await readBody(req);
      return send(res, 200, await voice.transcribe(audioRef, langHint));
    }
    if (req.method === 'POST' && p === '/api/voice/synthesize') {
      const { text, lang } = await readBody(req);
      return send(res, 200, await voice.synthesize(text || '', lang || 'en'));
    }

    return send(res, 404, { error: 'route not found', path: p });
  } catch (e) {
    return send(res, 500, { error: e.message });
  }
});

if (require.main === module) {
  server.listen(PORT, () => console.log(`Maya backend listening on http://localhost:${PORT}`));
}
module.exports = { server, scoreLead, routeLead };
