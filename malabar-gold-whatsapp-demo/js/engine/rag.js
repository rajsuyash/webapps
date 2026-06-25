/*
 * Retrieval-Augmented Generation — demo knowledge base + retriever.
 * In production this is an embeddings + vector-DB pipeline (see docs/02-architecture.md).
 * Here we ship a curated knowledge base of Malabar policies/services/FAQs and a lightweight
 * TF-style keyword retriever, so answers are GROUNDED in real documents — not invented.
 */
(function () {
  // Each entry = a "chunk" the retriever can return. `cites` = the source document label shown to the user.
  const KB = [
    { id:'purity', tags:['purity','bis','hallmark','karat','quality','916','22k'], cites:'Quality & Purity Policy',
      text:'All Malabar Gold jewellery is BIS Hallmarked. 22K gold is 916 (91.6% pure). Every piece carries a detailed, transparent price tag breaking up metal value, making charges, stones and GST — so you always know what you pay for.' },
    { id:'price', tags:['price','rate','transparent','making','charge','gst','tag','one india one gold rate'], cites:'Transparent Pricing',
      text:'We follow "One India One Gold Rate" — the same gold rate across all our Indian showrooms. Your bill clearly itemises metal value, making charges, stone value and GST. Today’s indicative 22K rate is ₹7,150/g, 24K ₹7,800/g.' },
    { id:'buyback', tags:['buyback','buy back','resale','sell','return value','exchange value','dgrp'], cites:'Buyback & Exchange Guarantee',
      text:'Malabar offers a transparent buyback guarantee. Gold ornaments are bought back at the prevailing gold rate (deductions only for stones/making as per policy). Diamonds carry a guaranteed buyback under our Diamond rate-protection promise. Keep your original invoice.' },
    { id:'exchange', tags:['exchange','old gold','upgrade','swap','trade in'], cites:'Old-Gold Exchange Policy',
      text:'You can exchange old gold towards new jewellery. We assess purity transparently in front of you and adjust the value against your new purchase. Bring a valid ID and the invoice if available.' },
    { id:'maintenance', tags:['maintenance','polish','cleaning','service','lifetime','care'], cites:'Lifetime Maintenance',
      text:'Malabar provides lifetime free maintenance — complimentary cleaning and polishing of jewellery bought from us, at any Malabar showroom.' },
    { id:'warranty', tags:['warranty','guarantee','certificate','diamond certificate','igi'], cites:'Certification & Warranty',
      text:'Diamond jewellery comes with a certificate of authenticity (e.g. IGI/in-house grading) detailing carat, colour and clarity. Hallmark and certificate together back the value of your purchase.' },
    { id:'shipping', tags:['delivery','shipping','courier','dispatch','track','order','insured'], cites:'Shipping & Delivery',
      text:'Online orders ship fully insured. Standard delivery is 3–7 working days within India; high-value items may require ID verification on delivery. You can track your order anytime here in chat with your order number.' },
    { id:'repair', tags:['repair','fix','broken','resize','restring','damage'], cites:'Repair Service',
      text:'We offer repair and resizing at our showrooms. Drop the piece at any Malabar store; you’ll get a service ticket and an estimated ready date. You can check repair status here with your ticket number.' },
    { id:'tryathome', tags:['try at home','home','trial','try on'], cites:'Try-at-Home / Video Shopping',
      text:'In select cities you can request try-at-home, or shop live over a video call with a personal shopper who shows pieces on camera. We can schedule either right here.' },
    { id:'smartbuy', tags:['smart buy','advance','rate protection','book rate','scheme','plan','save','smart saver'], cites:'Smart Buy & Savings Schemes',
      text:'Smart Buy Advance Purchase lets you pay an advance to book today’s gold rate; at delivery you pay the LOWER of the booked or prevailing rate. Our Smart Saver 11+1 plan lets you pay 11 monthly instalments and redeem in jewellery with a benefit on the final instalment.' },
    { id:'invest', tags:['invest','coin','bar','gold coin','gold bar','999','akshaya','dhanteras','muhurat'], cites:'Gold Investment Products',
      text:'We offer BIS-hallmarked 999.9 gold coins (1g, 4g, 8g) and bars (10g, 20g, 50g, 100g), assay-certified and tamper-sealed, fully buyback-protected. Coins are the traditional auspicious buy on Akshaya Tritiya and Dhanteras.' },
    { id:'emi', tags:['emi','instalment','finance','installment','credit'], cites:'Payment Options',
      text:'We accept cards, UPI and net-banking, and offer EMI options on eligible cards. For schemes, see Smart Buy and Smart Saver 11+1.' },
    { id:'nri', tags:['nri','dubai','abroad','gift to india','deliver to india','overseas'], cites:'NRI & Gifting',
      text:'NRI customers can order for delivery to family in India, or buy at any of our overseas showrooms (e.g. Dubai – Meena Bazaar). We can arrange insured delivery and a video unboxing.' },
    { id:'consult', tags:['consultation','appointment','bridal','expert','stylist','personal shopper'], cites:'Personal & Bridal Consultation',
      text:'Book a private appointment with a jewellery consultant — including a dedicated bridal suite at flagship stores — for unhurried selection, styling advice and trousseau planning.' },
  ];

  // very small keyword retriever (stand-in for vector similarity)
  function retrieve(query, k = 1) {
    const q = (query || '').toLowerCase();
    const tokens = q.split(/[^a-z0-9]+/).filter(Boolean);
    const scored = KB.map(doc => {
      let s = 0;
      doc.tags.forEach(t => { if (q.includes(t)) s += 3; });
      tokens.forEach(tok => { if (doc.tags.some(t => t.includes(tok)) || doc.text.toLowerCase().includes(tok)) s += 1; });
      return { doc, s };
    }).filter(x => x.s > 0).sort((a, b) => b.s - a.s);
    return scored.slice(0, k).map(x => x.doc);
  }

  // Returns a grounded answer object {text, cites} or null.
  function answer(query) {
    const hits = retrieve(query, 1);
    if (!hits.length) return null;
    return { text: hits[0].text, cites: hits[0].cites };
  }

  window.RAG = { retrieve, answer, KB };
})();
