/*
 * Agent orchestration layer (demo).
 * Routes an inbound message to an intent, calls the right "tool" (recommend / rag / rate / store /
 * lead), and returns a structured reply the WhatsApp layer can render.
 *
 * PRODUCTION: replace `classifyIntent` + templated replies with an LLM tool-calling loop.
 * A reference Anthropic Claude integration is included in `replyWithClaude()` — it is OFF by
 * default and only used when ANTHROPIC_API_KEY is set. Recommended model tiers (see docs/02):
 *   - claude-opus-4-8     → complex bridal planning / high-value advisory
 *   - claude-sonnet-4-6   → default concierge conversations
 *   - claude-haiku-4-5    → fast intent routing / classification
 */
const reco = require('./recommendation');
const rag = require('./rag');
const { RATE, STORES, PRODUCTS } = require('./data');

// ---- lightweight intent + slot extraction (Haiku-class job in production) ----
function parseBudget(t) {
  let m = t.match(/(\d+(?:\.\d+)?)\s*(lakh|lakhs|lac|l\b)/); if (m) return Math.round(parseFloat(m[1]) * 100000);
  m = t.match(/(\d+(?:\.\d+)?)\s*(k|thousand)/); if (m) return Math.round(parseFloat(m[1]) * 1000);
  m = t.match(/₹?\s?(\d{4,7})/); if (m) return parseInt(m[1], 10);
  return null;
}
function detectOccasion(t) {
  const map = { anniversary:'anniversary', wedding:'wedding', marriage:'wedding', bridal:'bridal', gift:'gifting', birthday:'birthday', proposal:'proposal', festival:'festival', diwali:'diwali', dhanteras:'dhanteras', akshaya:'akshaya-tritiya', invest:'investment' };
  for (const k in map) if (t.includes(k)) return map[k];
  return null;
}
function detectCategory(t) {
  if (/(diamond|solitaire|ring)/.test(t)) return 'diamond';
  if (/(coin|bar|invest)/.test(t)) return 'invest';
  if (/(emerald|ruby|gemstone|stone)/.test(t)) return 'gemstone';
  if (/(gold|chain|bangle|haram|necklace|jhumka)/.test(t)) return 'gold';
  return null;
}

function classifyIntent(text) {
  const t = String(text || '').toLowerCase();
  const slots = { budget: parseBudget(t), occasion: detectOccasion(t), category: detectCategory(t) };
  if (/(rate|price today|bhav|how much.*gold)/.test(t) && /(gold|rate|today)/.test(t)) return { intent: 'GOLD_RATE', slots };
  if (slots.budget || slots.occasion || (slots.category && /(show|find|want|looking|recommend|suggest|buy)/.test(t))) return { intent: 'PRODUCT_DISCOVERY', slots };
  if (rag.answer(t)) return { intent: 'SUPPORT_FAQ', slots };
  if (/(store|showroom|near|location|address|visit|appointment|book)/.test(t)) return { intent: 'STORE_LOCATOR', slots };
  if (/(bridal|wedding|marriage)/.test(t)) return { intent: 'BRIDAL', slots };
  if (/(hi|hello|hey|namaste|vanakkam|namaskaram)/.test(t)) return { intent: 'GREETING', slots };
  return { intent: 'FALLBACK', slots };
}

// ---- the demo (rule-based) responder. Returns a structured WhatsApp reply ----
function reply(text, profile = {}) {
  const { intent, slots } = classifyIntent(text);
  switch (intent) {
    case 'GOLD_RATE':
      return { intent, blocks: [ { type:'text', text:`Today’s ${RATE.basis}:` }, { type:'rate', rate: RATE } ] };
    case 'PRODUCT_DISCOVERY': {
      const items = reco.recommend({ budget: slots.budget, occasion: slots.occasion, category: slots.category }, 3);
      return { intent, slots, blocks: [
        { type:'text', text:'Here are some pieces I think you’ll love 👇' },
        { type:'products', items },
        { type:'text', text:'Would you like to reserve one, or book a store visit to try them on?' },
      ] };
    }
    case 'SUPPORT_FAQ': {
      const a = rag.answer(text);
      return { intent, blocks: [ { type:'text', text:a.text, source:a.source } ] };
    }
    case 'STORE_LOCATOR':
      return { intent, blocks: [ { type:'text', text:'Tell me your city and I’ll find the nearest showroom. Here’s a popular one:' }, { type:'store', store: STORES.find(s => s.city === 'Chennai') } ] };
    case 'BRIDAL':
      return { intent, blocks: [ { type:'text', text:'Congratulations! 👰 What’s your overall jewellery budget? I’ll plan a complete bridal look.' } ] };
    case 'GREETING':
      return { intent, blocks: [ { type:'text', text:`Hello${profile.name ? ' ' + profile.name : ''}! 🙏 I’m Maya, your Malabar jewellery concierge. I can help you find jewellery, plan a bridal look, check today’s gold rate, track an order, or book a store visit.` } ] };
    default:
      return { intent, blocks: [ { type:'text', text:'I’d love to help! Try “diamond ring under ₹1 lakh for anniversary”, or ask about gold rate, buyback, exchange or stores. A human expert is one tap away too.' } ] };
  }
}

// ---- OPTIONAL production path: Claude tool-calling (off unless API key present) ----
async function replyWithClaude(text, profile = {}) {
  if (!process.env.ANTHROPIC_API_KEY) return null; // disabled in demo
  // Pseudocode reference — wire up @anthropic-ai/sdk in production:
  //
  //   const Anthropic = require('@anthropic-ai/sdk');
  //   const client = new Anthropic();
  //   const tools = [
  //     { name:'search_catalog', description:'Find jewellery by budget/occasion/metal/style', input_schema:{...} },
  //     { name:'get_gold_rate',  description:'Live One India One Gold Rate', input_schema:{type:'object',properties:{}} },
  //     { name:'lookup_policy',  description:'Grounded answer from policy/FAQ (RAG)', input_schema:{...} },
  //     { name:'book_appointment', ... }, { name:'capture_lead', ... }, { name:'handoff_to_human', ... },
  //   ];
  //   const res = await client.messages.create({
  //     model: 'claude-sonnet-4-6', max_tokens: 1024, system: MAYA_SYSTEM_PROMPT,
  //     messages: [{ role:'user', content: text }], tools,
  //   });
  //   // execute tool_use blocks against ./recommendation, ./rag, etc., loop until final text.
  return null;
}

module.exports = { reply, replyWithClaude, classifyIntent };
