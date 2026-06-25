/*
 * Recommendation engine (client-side demo version).
 * Scores the catalog against a structured "intent" {budget, occasion, metal, style, region, gender, category}
 * using a transparent weighted model, then returns ranked matches + cross-sell suggestions.
 * The production architecture (see docs/02-architecture.md) replaces this with a hybrid
 * rules + embedding-similarity + collaborative-filtering service. The interface is identical.
 */
(function () {
  const within = (price, budget) => {
    if (!budget) return 1;
    // Reward fitting just under budget; penalise far-over and far-under.
    const r = price / budget;
    if (r <= 1.02) return 1 - Math.max(0, (0.85 - Math.min(r, 0.85))) * 0.4; // sweet spot 0.6–1.0 of budget
    if (r <= 1.25) return 0.45;        // slight stretch — still show as "upsell"
    return 0;                          // out of range
  };

  function score(p, q) {
    let s = 0;
    s += within(p.price, q.budget) * 5;
    if (q.category && p.cat === q.category) s += 3;
    if (q.metal && p.metal.toLowerCase().includes(q.metal.toLowerCase())) s += 2;
    if (q.gender && (p.gender === q.gender || p.gender === 'unisex')) s += 1;
    if (q.occasion) (Array.isArray(q.occasion) ? q.occasion : [q.occasion]).forEach(o => {
      if (p.occasion.includes(o)) s += 2.5;
    });
    if (q.style) (Array.isArray(q.style) ? q.style : [q.style]).forEach(st => {
      if (p.style.includes(st)) s += 1.5;
    });
    if (q.region) (Array.isArray(q.region) ? q.region : [q.region]).forEach(rg => {
      if (p.region.includes(rg) || p.region.includes('all')) s += 1;
    });
    return s;
  }

  // Human-readable reason the AI can show ("why this fits").
  function reason(p, q) {
    const bits = [];
    if (q.budget) {
      if (p.price <= q.budget) bits.push(`fits your ₹${(q.budget/100000).toFixed(1)}L budget`);
      else bits.push(`a small stretch above budget but worth a look`);
    }
    const occ = q.occasion && (Array.isArray(q.occasion) ? q.occasion : [q.occasion]).find(o => p.occasion.includes(o));
    if (occ) bits.push(`ideal for ${occ.replace('-', ' ')}`);
    if (q.region && p.region.find(r => (Array.isArray(q.region)?q.region:[q.region]).includes(r))) bits.push('matches the regional tradition');
    if (p.brand !== 'Malabar') bits.push(`from our ${p.brand} line`);
    return bits.slice(0, 2).join(', ');
  }

  function recommend(q, n = 3) {
    return window.PRODUCTS
      .map(p => ({ p, s: score(p, q), why: reason(p, q) }))
      .filter(x => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, n);
  }

  // Cross-sell / complete-the-look: complementary sub-types around a chosen product.
  const COMPLEMENTS = {
    necklace: ['earring', 'bangle', 'jhumka'], ring: ['pendant', 'studs'], pendant: ['studs', 'ring'],
    studs: ['pendant', 'ring'], bangle: ['necklace'], chain: ['pendant'], earring: ['necklace'],
    bracelet: ['ring', 'studs'], kada: ['chain'], coin: ['bar'], bar: ['coin'],
  };
  function crossSell(prod, max = 2) {
    const wants = COMPLEMENTS[prod.sub] || [];
    return window.PRODUCTS
      .filter(p => p.id !== prod.id && wants.includes(p.sub) && p.cat === prod.cat)
      .slice(0, max);
  }

  // Allocate a bridal budget across the classic set (illustrative percentages).
  function bridalAllocation(total) {
    const plan = [
      { part: 'Long Haram / Necklace set', pct: 0.40, pick: 'MG-NL-2201' },
      { part: 'Bangles (pair)',            pct: 0.25, pick: 'MG-BG-2203' },
      { part: 'Earrings / Jhumkas',        pct: 0.10, pick: 'MG-ER-2205' },
      { part: 'Short necklace / Kasumalai',pct: 0.15, pick: 'MG-NL-2202' },
      { part: 'Diamond ring (engagement)', pct: 0.10, pick: 'MD-RG-3301' },
    ];
    return plan.map(x => ({ ...x, amount: Math.round(total * x.pct), product: window.PRODUCT_BY_ID[x.pick] }));
  }

  window.RecoEngine = { recommend, crossSell, bridalAllocation, score };
})();
