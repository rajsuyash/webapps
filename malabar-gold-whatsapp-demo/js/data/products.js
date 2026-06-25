/*
 * Malabar Gold & Diamonds — Demo product catalog.
 * Prices are ILLUSTRATIVE placeholders for demonstration only.
 * Imagery is rendered as inline SVG so the demo works fully offline.
 */
window.MALABAR_RATE = { gold22: 7150, gold24: 7800, silver: 95, asOf: '25 Jun 2026, 10:30 IST' };

// ---- Elegant inline-SVG "photography" for each product type --------------
function jewelSVG(kind) {
  const g = `<defs>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f7e3a1"/><stop offset=".5" stop-color="#e8b84b"/><stop offset="1" stop-color="#b8860b"/>
    </linearGradient>
    <linearGradient id="dia" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="#d8ecff"/><stop offset="1" stop-color="#9bc7f0"/>
    </linearGradient>
    <radialGradient id="bg" cx=".5" cy=".35" r=".9">
      <stop offset="0" stop-color="#fbf6ec"/><stop offset="1" stop-color="#efe2c8"/>
    </radialGradient></defs>
    <rect width="200" height="200" rx="10" fill="url(#bg)"/>`;
  const M = {
    haram: `<path d="M40 60 Q100 130 160 60" stroke="url(#gold)" stroke-width="9" fill="none"/>
      ${[60,80,100,120,140].map((x,i)=>`<circle cx="${x}" cy="${88+ (i===2?22:i===1||i===3?14:6)}" r="${i===2?14:10}" fill="url(#gold)" stroke="#9c6b08"/>`).join('')}
      <circle cx="100" cy="150" r="9" fill="url(#dia)" stroke="#7fa8d0"/>`,
    coin_necklace: `<path d="M45 65 Q100 120 155 65" stroke="url(#gold)" stroke-width="6" fill="none"/>
      ${[64,82,100,118,136].map(x=>`<circle cx="${x}" cy="98" r="11" fill="url(#gold)" stroke="#9c6b08"/><circle cx="${x}" cy="98" r="5" fill="none" stroke="#9c6b08"/>`).join('')}`,
    bangle: `<ellipse cx="70" cy="100" rx="34" ry="48" fill="none" stroke="url(#gold)" stroke-width="11"/>
      <ellipse cx="130" cy="100" rx="34" ry="48" fill="none" stroke="url(#gold)" stroke-width="11"/>`,
    chain: `<path d="M70 40 C40 90 160 110 130 160" stroke="url(#gold)" stroke-width="8" fill="none" stroke-linecap="round"/>`,
    jhumka: `${[70,130].map(x=>`<circle cx="${x}" cy="78" r="9" fill="url(#gold)"/><path d="M${x-18} 88 Q${x} 120 ${x+18} 88 Z" fill="url(#gold)" stroke="#9c6b08"/>${[-12,0,12].map(d=>`<circle cx="${x+d}" cy="118" r="4" fill="url(#gold)"/>`).join('')}`).join('')}`,
    kada: `<ellipse cx="100" cy="100" rx="52" ry="62" fill="none" stroke="url(#gold)" stroke-width="16"/><ellipse cx="100" cy="100" rx="52" ry="62" fill="none" stroke="#9c6b08" stroke-width="1"/>`,
    baby_bangle: `<ellipse cx="78" cy="100" rx="22" ry="30" fill="none" stroke="url(#gold)" stroke-width="8"/><ellipse cx="122" cy="100" rx="22" ry="30" fill="none" stroke="url(#gold)" stroke-width="8"/>`,
    ring: `<ellipse cx="100" cy="125" rx="40" ry="46" fill="none" stroke="url(#gold)" stroke-width="12"/>
      <path d="M82 70 L100 50 L118 70 L100 88 Z" fill="url(#dia)" stroke="#7fa8d0"/>`,
    pendant: `<path d="M55 60 Q100 100 145 60" stroke="url(#gold)" stroke-width="5" fill="none"/>
      <path d="M88 96 L100 84 L112 96 L100 130 Z" fill="url(#dia)" stroke="#7fa8d0"/>`,
    studs: `${[72,128].map(x=>`<circle cx="${x}" cy="100" r="16" fill="url(#dia)" stroke="#7fa8d0"/><circle cx="${x}" cy="100" r="7" fill="#fff" opacity=".7"/>`).join('')}`,
    polki: `<path d="M40 70 Q100 140 160 70" stroke="url(#gold)" stroke-width="7" fill="none"/>
      ${[58,78,100,122,142].map((x,i)=>`<rect x="${x-8}" y="${92+(i===2?20:i===1||i===3?12:4)}" width="16" height="16" rx="3" fill="url(#dia)" stroke="#caa94e"/>`).join('')}`,
    bracelet: `<path d="M45 100 Q100 130 155 100" stroke="url(#gold)" stroke-width="4" fill="none"/>
      ${[60,80,100,120,140].map(x=>`<rect x="${x-6}" y="98" width="12" height="12" rx="2" fill="url(#dia)" stroke="#7fa8d0"/>`).join('')}`,
    emerald_ring: `<ellipse cx="100" cy="125" rx="40" ry="46" fill="none" stroke="url(#gold)" stroke-width="12"/><rect x="86" y="56" width="28" height="28" rx="4" fill="#2e9d6a" stroke="#1c6b48"/>`,
    ruby_pendant: `<path d="M55 60 Q100 100 145 60" stroke="url(#gold)" stroke-width="5" fill="none"/><path d="M88 96 L100 84 L112 96 L100 130 Z" fill="#c0304a" stroke="#8a1f33"/>`,
    coin: `<circle cx="100" cy="100" r="56" fill="url(#gold)" stroke="#9c6b08" stroke-width="3"/><circle cx="100" cy="100" r="44" fill="none" stroke="#9c6b08"/><text x="100" y="108" text-anchor="middle" font-size="26" fill="#7a5206" font-family="serif">999.9</text>`,
    bar: `<rect x="52" y="74" width="96" height="52" rx="6" fill="url(#gold)" stroke="#9c6b08" stroke-width="2"/><text x="100" y="106" text-anchor="middle" font-size="15" fill="#7a5206" font-family="serif">FINE GOLD</text>`,
    silver_coin: `<circle cx="100" cy="100" r="54" fill="#dfe3e8" stroke="#9aa3ad" stroke-width="3"/><circle cx="100" cy="100" r="40" fill="none" stroke="#9aa3ad"/><text x="100" y="106" text-anchor="middle" font-size="14" fill="#5a626b" font-family="serif">LAKSHMI</text>`,
  }[kind] || `<circle cx="100" cy="100" r="40" fill="url(#gold)"/>`;
  return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">${g}${M}</svg>`;
}

window.PRODUCTS = [
  // ---- Gold 22K ----
  { id:'MG-NL-2201', name:'Lakshmi Temple Haram', brand:'Divine', cat:'gold', sub:'necklace', metal:'22K Gold', weight:'48.2g', price:385000, icon:'haram',
    style:['traditional','temple','bridal','south-indian'], occasion:['wedding','bridal'], region:['south','tamil','telugu','kerala'], gender:'women',
    desc:'Handcrafted temple-motif haram with Goddess Lakshmi, a South-Indian bridal heirloom.' },
  { id:'MG-NL-2202', name:'Kasumalai Coin Necklace', brand:'Divine', cat:'gold', sub:'necklace', metal:'22K Gold', weight:'32.5g', price:258000, icon:'coin_necklace',
    style:['traditional','temple','bridal'], occasion:['wedding','bridal','festival'], region:['tamil','telugu','south'], gender:'women',
    desc:'Classic Lakshmi-coin Kasumalai — a must-have in Tamil & Telugu bridal trousseaus.' },
  { id:'MG-BG-2203', name:'Antique Lakshmi Bangles (pair)', brand:'Divine', cat:'gold', sub:'bangle', metal:'22K Gold', weight:'56g', price:446000, icon:'bangle',
    style:['traditional','antique','bridal'], occasion:['wedding','bridal'], region:['south'], gender:'women',
    desc:'Antique-finish broad bangles with temple work — completes the bridal set.' },
  { id:'MG-NL-2204', name:'Daily-wear Gold Chain (20")', brand:'Malabar', cat:'gold', sub:'chain', metal:'22K Gold', weight:'12g', price:96500, icon:'chain',
    style:['minimal','everyday'], occasion:['gifting','everyday','birthday'], region:['all'], gender:'unisex',
    desc:'Lightweight 20-inch chain — a versatile everyday gift under ₹1L.' },
  { id:'MG-ER-2205', name:'Jhumka Earrings', brand:'Ethnix', cat:'gold', sub:'earring', metal:'22K Gold', weight:'9.4g', price:78000, icon:'jhumka',
    style:['ethnic','designer','festive'], occasion:['festival','gifting','wedding'], region:['all'], gender:'women',
    desc:'Handcrafted Ethnix jhumkas with pearl drops — festive and gift-perfect.' },
  { id:'MG-MG-2206', name:"Men's Royal Kada", brand:'Mehrab', cat:'gold', sub:'kada', metal:'22K Gold', weight:'22g', price:172000, icon:'kada',
    style:['contemporary','bold'], occasion:['gifting','wedding'], region:['all'], gender:'men',
    desc:'Substantial polished kada from the Mehrab men’s line — a statement gift for him.' },
  { id:'MG-ST-2207', name:'Baby Bangles (Starlet, pair)', brand:'Starlet', cat:'gold', sub:'bangle', metal:'22K Gold', weight:'6g', price:52000, icon:'baby_bangle',
    style:['cute','traditional'], occasion:['gifting','newborn','birthday'], region:['all'], gender:'kids',
    desc:'Smooth-edge baby bangles — the classic newborn / first-birthday gift.' },

  // ---- Diamonds ----
  { id:'MD-RG-3301', name:'Solitaire-look Diamond Ring', brand:'Mine', cat:'diamond', sub:'ring', metal:'18K Gold', weight:'0.45ct SI/GH', price:118000, icon:'ring',
    style:['modern','solitaire','elegant'], occasion:['anniversary','proposal','gifting'], region:['all'], gender:'women',
    desc:'Brilliant halo setting that wears like a solitaire — anniversary & proposal favourite.' },
  { id:'MD-PD-3302', name:'Diamond Pendant Set', brand:'Mine', cat:'diamond', sub:'pendant', metal:'18K Gold', weight:'0.62ct', price:146000, icon:'pendant',
    style:['modern','elegant'], occasion:['anniversary','gifting','birthday'], region:['all'], gender:'women',
    desc:'Pendant + matching studs — a complete gift just under ₹1.5L.' },
  { id:'MD-ER-3303', name:'Diamond Studs', brand:'Viraaz', cat:'diamond', sub:'studs', metal:'18K Gold', weight:'0.30ct', price:64000, icon:'studs',
    style:['minimal','everyday','office'], occasion:['everyday','gifting','self'], region:['all'], gender:'women',
    desc:'Everyday diamond studs from Viraaz — self-purchase & office-luxe staple.' },
  { id:'MD-NL-3304', name:'Polki Bridal Necklace', brand:'Era', cat:'diamond', sub:'necklace', metal:'18K + Uncut Diamonds', weight:'Statement', price:690000, icon:'polki',
    style:['heritage','polki','bridal','statement'], occasion:['wedding','bridal'], region:['north','all'], gender:'women',
    desc:'Uncut-diamond Polki statement piece from Era — the bridal showstopper.' },
  { id:'MD-BR-3305', name:'Diamond Tennis Bracelet', brand:'Mine', cat:'diamond', sub:'bracelet', metal:'18K Gold', weight:'1.10ct', price:235000, icon:'bracelet',
    style:['modern','luxe'], occasion:['anniversary','milestone','gifting'], region:['all'], gender:'women',
    desc:'A line of brilliant diamonds — the classic milestone-anniversary gift.' },

  // ---- Gemstone (Precia) ----
  { id:'MP-RG-3401', name:'Emerald & Diamond Ring', brand:'Precia', cat:'gemstone', sub:'ring', metal:'18K Gold', weight:'Emerald', price:89000, icon:'emerald_ring',
    style:['colour','elegant'], occasion:['gifting','birthday','anniversary'], region:['all'], gender:'women',
    desc:'Vivid emerald framed in diamonds — May-birthstone gift from Precia.' },
  { id:'MP-PD-3402', name:'Ruby Pendant', brand:'Precia', cat:'gemstone', sub:'pendant', metal:'18K Gold', weight:'Ruby', price:72000, icon:'ruby_pendant',
    style:['colour','elegant'], occasion:['gifting','birthday'], region:['all'], gender:'women',
    desc:'Glowing ruby pendant — July-birthstone & festive gifting.' },

  // ---- Investment ----
  { id:'MI-GC-9901', name:'Gold Coin 1g (999.9)', brand:'Malabar', cat:'invest', sub:'coin', metal:'24K 999.9', weight:'1g', price:7800, icon:'coin',
    style:['investment'], occasion:['akshaya-tritiya','dhanteras','gifting','investment'], region:['all'], gender:'unisex',
    desc:'BIS-hallmarked 1g coin — the auspicious starter buy for Akshaya Tritiya.' },
  { id:'MI-GC-9902', name:'Gold Coin 8g (999.9)', brand:'Malabar', cat:'invest', sub:'coin', metal:'24K 999.9', weight:'8g', price:62400, icon:'coin',
    style:['investment'], occasion:['muhurat','gifting','investment'], region:['all'], gender:'unisex',
    desc:'8g coin (one pavan) — popular muhurat & gifting denomination.' },
  { id:'MI-GB-9903', name:'Gold Bar 10g (999.9)', brand:'Malabar', cat:'invest', sub:'bar', metal:'24K 999.9', weight:'10g', price:78000, icon:'bar',
    style:['investment'], occasion:['investment','dhanteras'], region:['all'], gender:'unisex',
    desc:'Sealed, assay-certified 10g bar — clean entry into gold investment.' },
  { id:'MI-GB-9904', name:'Gold Bar 50g (999.9)', brand:'Malabar', cat:'invest', sub:'bar', metal:'24K 999.9', weight:'50g', price:390000, icon:'bar',
    style:['investment'], occasion:['investment'], region:['all'], gender:'unisex',
    desc:'50g investment bar for serious accumulation — fully buyback-protected.' },
  { id:'MI-SC-9905', name:'Silver Lakshmi-Ganesha Coin 10g', brand:'Malabar', cat:'invest', sub:'silver', metal:'Silver', weight:'10g', price:1150, icon:'silver_coin',
    style:['investment','festive'], occasion:['dhanteras','diwali','gifting'], region:['all'], gender:'unisex',
    desc:'Embossed Lakshmi-Ganesha silver coin — the ₹-friendly Dhanteras gift.' },
];

// Quick lookup
window.PRODUCT_BY_ID = Object.fromEntries(window.PRODUCTS.map(p => [p.id, p]));
window.jewelSVG = jewelSVG;
