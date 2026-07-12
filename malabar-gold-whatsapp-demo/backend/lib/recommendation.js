/* Recommendation engine (server). Mirrors js/engine/recommendation.js. */
const { PRODUCTS } = require('./data');

function within(price, budget) {
  if (!budget) return 1;
  const r = price / budget;
  if (r <= 1.02) return 1 - Math.max(0, (0.85 - Math.min(r, 0.85))) * 0.4;
  if (r <= 1.25) return 0.45;
  return 0;
}
function asArr(x) { return x == null ? [] : Array.isArray(x) ? x : [x]; }

function score(p, q) {
  let s = 0;
  s += within(p.price, q.budget) * 5;
  if (q.category && p.cat === q.category) s += 3;
  if (q.metal && p.metal.toLowerCase().includes(String(q.metal).toLowerCase())) s += 2;
  if (q.gender && (p.gender === q.gender || p.gender === 'unisex')) s += 1;
  asArr(q.occasion).forEach(o => { if (p.occasion.includes(o)) s += 2.5; });
  asArr(q.style).forEach(st => { if (p.style.includes(st)) s += 1.5; });
  asArr(q.region).forEach(rg => { if (p.region.includes(rg) || p.region.includes('all')) s += 1; });
  return s;
}
function reason(p, q) {
  const bits = [];
  if (q.budget) bits.push(p.price <= q.budget ? `fits your ₹${(q.budget/100000).toFixed(1)}L budget` : 'a small stretch above budget but worth a look');
  const occ = asArr(q.occasion).find(o => p.occasion.includes(o));
  if (occ) bits.push(`ideal for ${String(occ).replace('-', ' ')}`);
  if (asArr(q.region).find(r => p.region.includes(r))) bits.push('matches the regional tradition');
  if (p.brand !== 'Malabar') bits.push(`from our ${p.brand} line`);
  return bits.slice(0, 2).join(', ');
}
function recommend(q = {}, n = 3) {
  return PRODUCTS.map(p => ({ ...p, _score: +score(p, q).toFixed(2), why: reason(p, q) }))
    .filter(x => x._score > 0).sort((a, b) => b._score - a._score).slice(0, n);
}

const COMPLEMENTS = { necklace:['earring','bangle'], ring:['pendant','studs'], pendant:['studs','ring'], studs:['pendant','ring'], bangle:['necklace'], chain:['pendant'], earring:['necklace'], bracelet:['ring','studs'], kada:['chain'], coin:['bar'], bar:['coin'] };
function crossSell(id, max = 2) {
  const prod = PRODUCTS.find(p => p.id === id); if (!prod) return [];
  const wants = COMPLEMENTS[prod.sub] || [];
  return PRODUCTS.filter(p => p.id !== id && wants.includes(p.sub) && p.cat === prod.cat).slice(0, max);
}
function bridalAllocation(total) {
  const plan = [
    { part:'Long Haram / Necklace set', pct:0.40, pick:'MG-NL-2201' },
    { part:'Bangles (pair)', pct:0.25, pick:'MG-BG-2203' },
    { part:'Earrings / Jhumkas', pct:0.10, pick:'MG-ER-2205' },
    { part:'Short necklace / Kasumalai', pct:0.15, pick:'MG-NL-2202' },
    { part:'Diamond ring (engagement)', pct:0.10, pick:'MD-RG-3301' },
  ];
  return plan.map(x => ({ ...x, amount: Math.round(total * x.pct), productId: x.pick }));
}
module.exports = { recommend, crossSell, bridalAllocation, score };
