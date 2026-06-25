/*
 * Scenario scripts that drive the interactive WhatsApp demo.
 * Each scenario is a small node-graph. A node has:
 *   user    : (optional) a simulated inbound customer message shown before the bot replies
 *   bot     : array of bot message specs (see app.js renderers for `t` types)
 *   choices : array of quick-reply chips { label, goto }  (goto = next node key, or 'END')
 * Free-typed text is handled by app.js (NLU + RAG) and then returns to the current node's choices.
 */
window.SCENARIOS = {

  /* 1 ──────────────────────────── PRODUCT DISCOVERY ─────────────────────── */
  discovery: {
    title: 'Product Discovery', emoji: '💍', persona: 'Aarthi · Chennai',
    blurb: '“₹1 lakh for my wife’s anniversary” → recommend, explain, cross-sell.',
    entry: 'start',
    nodes: {
      start: {
        user: 'Hi, I have ₹1 lakh budget for my wife’s anniversary 💕',
        bot: [
          { t:'text', text:'Hello! 🙏 I’m *Maya*, your Malabar Gold & Diamonds jewellery concierge. Happy anniversary in advance! 💕' },
          { t:'text', text:'A ₹1 lakh budget opens up some really lovely options. To pick the *perfect* one — what does she love most?' },
        ],
        choices: [
          { label:'💎 Diamonds', goto:'diamonds' },
          { label:'🟡 Gold', goto:'gold' },
          { label:'🌈 Coloured stones', goto:'gems' },
          { label:'Surprise me ✨', goto:'diamonds' },
        ],
      },
      diamonds: {
        user: 'She loves diamonds 💎',
        bot: [
          { t:'text', text:'Excellent taste! 💎 Here are my top picks under ₹1 lakh — each from our *Mine* and *Viraaz* diamond lines:' },
          { t:'reco', query:{ budget:100000, category:'diamond', occasion:'anniversary', gender:'women' }, n:3 },
          { t:'text', text:'My personal favourite for an anniversary is the *Diamond Studs (Viraaz)* — she can wear them every single day and think of you. 🥰' },
        ],
        choices: [
          { label:'Tell me why the studs', goto:'why' },
          { label:'Complete the look 👀', goto:'cross' },
          { label:'Reserve the studs', goto:'reserve' },
        ],
      },
      gold: {
        user: 'She prefers gold',
        bot: [
          { t:'text', text:'Beautiful — gold is always treasured. Here’s what ₹1 lakh buys beautifully right now (22K @ ₹7,150/g):' },
          { t:'reco', query:{ budget:100000, category:'gold', occasion:'gifting', gender:'women' }, n:3 },
        ],
        choices: [
          { label:'Complete the look 👀', goto:'cross' },
          { label:'Reserve a piece', goto:'reserve' },
          { label:'See diamonds instead', goto:'diamonds' },
        ],
      },
      gems: {
        user: 'Maybe something colourful',
        bot: [
          { t:'text', text:'Lovely idea! Coloured stones feel personal. From our *Precia* gemstone line:' },
          { t:'reco', query:{ budget:100000, category:'gemstone', occasion:'anniversary', gender:'women' }, n:2 },
          { t:'text', text:'Tip: if her birthday is in May, the *Emerald & Diamond Ring* doubles as a birthstone gift. 🌿' },
        ],
        choices: [
          { label:'Complete the look 👀', goto:'cross' },
          { label:'Reserve the ring', goto:'reserve' },
        ],
      },
      why: {
        user: 'Why the diamond studs?',
        bot: [
          { t:'text', text:'Great question 👇\n\n• *Everyday wear* — 0.30ct studs go with office wear, sarees and dinners alike.\n• *Future-proof* — a classic that never dates.\n• *Buyback-protected* — covered by our diamond rate-protection promise.\n• *Within budget* at ₹64,000 — leaving room for a matching gift. 😉' },
        ],
        choices: [
          { label:'What pairs with it?', goto:'cross' },
          { label:'Reserve the studs', goto:'reserve' },
        ],
      },
      cross: {
        user: 'What would complete the look?',
        bot: [
          { t:'text', text:'Here’s how I’d *complete the look* — pairs beautifully and is still close to budget:' },
          { t:'cards', ids:['MD-PD-3302'], note:'Matching pendant — gift the set, save the surprise for later 🎁' },
          { t:'text', text:'Studs (₹64,000) + Pendant (₹1,46,000) makes a stunning *set*. Many customers gift studs now and reserve the pendant for her birthday — I can hold today’s price for you.' },
        ],
        choices: [
          { label:'Reserve the studs', goto:'reserve' },
          { label:'Book a store visit', goto:'store' },
        ],
      },
      reserve: {
        user: 'Reserve the diamond studs for me',
        bot: [
          { t:'text', text:'Done! ✨ I’ve placed a *complimentary 72-hour reservation* on the Viraaz Diamond Studs (MD-ER-3303, ₹64,000) — no payment needed now.' },
          { t:'appt', kind:'reserve', product:'MD-ER-3303' },
          { t:'text', text:'Want me to keep the matching pendant on hold too, and book a quick store visit so she can try them on?' },
        ],
        choices: [
          { label:'Yes, book a store visit', goto:'store' },
          { label:'Just the reservation, thanks', goto:'leadcap' },
        ],
      },
      store: {
        user: 'Book a store visit in Chennai',
        bot: [
          { t:'text', text:'Perfect — here’s your nearest store with a private consultation desk:' },
          { t:'store', city:'Chennai' },
          { t:'appt', kind:'visit', store:'Chennai', when:'Tomorrow, 6:30 PM' },
        ],
        choices: [
          { label:'Done — thank you!', goto:'leadcap' },
        ],
      },
      leadcap: {
        bot: [
          { t:'text', text:'Wonderful, Aarthi! 🌟 You’re all set. I’ll WhatsApp you a reminder and the piece details.' },
          { t:'lead', data:{ name:'Aarthi', occasion:'Anniversary', budget:'₹1,00,000', category:'Diamonds', city:'Chennai', timeline:'This week' } },
          { t:'system', text:'High-intent lead routed to T. Nagar sales team in 38 seconds ⚡' },
        ],
        choices: [],
      },
    },
  },

  /* 2 ──────────────────────────── BRIDAL CONSULTANT ─────────────────────── */
  bridal: {
    title: 'Bridal Consultant', emoji: '👰', persona: 'Lakshmi · Hyderabad',
    blurb: '“December wedding, ₹10 lakh budget” → full set, budget split, bridal suite.',
    entry: 'start',
    nodes: {
      start: {
        user: 'I’m getting married in December and my jewellery budget is ₹10 lakhs.',
        bot: [
          { t:'text', text:'Congratulations on your wedding! 🎉👰 I’m Maya — I’ll help you plan a *complete bridal look* within ₹10 lakhs, beautifully and without stress.' },
          { t:'text', text:'First, which tradition should the look lean towards? It helps me choose the right pieces.' },
        ],
        choices: [
          { label:'South Indian / Temple', goto:'south' },
          { label:'North Indian / Polki', goto:'north' },
          { label:'A modern mix', goto:'south' },
        ],
      },
      south: {
        user: 'South Indian, temple style',
        bot: [
          { t:'text', text:'Beautiful choice 🛕 — our *Divine* temple line and *Brides of Malabar* are made for this. Here’s how I’d *allocate ₹10 lakhs* across the classic bridal set:' },
          { t:'alloc', total:1000000 },
          { t:'text', text:'This gives you a balanced, photograph-ready look — statement haram, bangles, jhumkas, a short Kasumalai and an engagement ring — all within budget. 💛' },
        ],
        choices: [
          { label:'Show me the haram', goto:'haram' },
          { label:'Can we adjust the split?', goto:'adjust' },
          { label:'Book a bridal consultation', goto:'consult' },
        ],
      },
      north: {
        user: 'North Indian, I love Polki',
        bot: [
          { t:'text', text:'Gorgeous 👑 — our *Era* uncut-diamond Polki line is the showstopper. With ₹10L I’d anchor the look around one statement Polki necklace and balance the rest in gold:' },
          { t:'cards', ids:['MD-NL-3304'], note:'Era Polki Bridal Necklace — the centrepiece' },
          { t:'alloc', total:1000000 },
        ],
        choices: [
          { label:'Book a bridal consultation', goto:'consult' },
          { label:'Can we adjust the split?', goto:'adjust' },
        ],
      },
      haram: {
        user: 'Show me the haram',
        bot: [
          { t:'cards', ids:['MG-NL-2201','MG-NL-2202'], note:'The statement haram + the Kasumalai short chain' },
          { t:'text', text:'The *Lakshmi Temple Haram* (₹3,85,000) is the hero piece — pair it with the *Kasumalai* for layering in your muhurtham photos. 📸' },
        ],
        choices: [
          { label:'See the full set', goto:'south' },
          { label:'Book a bridal consultation', goto:'consult' },
        ],
      },
      adjust: {
        user: 'I want to spend more on the necklace',
        bot: [
          { t:'text', text:'Absolutely — it’s your day. 💖 If you’d like the necklace to be the star, I’d shift to *50% necklace / 20% bangles / 10% earrings / 10% short chain / 10% ring*. Our consultant can fine-tune live with you and even factor in old-gold exchange to stretch the budget further.' },
        ],
        choices: [
          { label:'Book a bridal consultation', goto:'consult' },
        ],
      },
      consult: {
        user: 'Book a bridal consultation',
        bot: [
          { t:'text', text:'Wonderful! Our Hyderabad flagship has a *private bridal suite* with a dedicated stylist. Here are the details:' },
          { t:'store', city:'Hyderabad' },
          { t:'appt', kind:'bridal', store:'Hyderabad', when:'Sat 28 Jun, 11:00 AM' },
          { t:'text', text:'I’ll also keep today’s gold rate noted via *Smart Buy* so a December wedding isn’t exposed to rate rises — shall I explain that at the appointment?' },
        ],
        choices: [ { label:'Yes please', goto:'leadcap' } ],
      },
      leadcap: {
        bot: [
          { t:'lead', data:{ name:'Lakshmi', occasion:'Wedding (Dec)', budget:'₹10,00,000', category:'Bridal · Temple', city:'Hyderabad', timeline:'5 months' } },
          { t:'system', text:'★ HIGH-VALUE bridal lead (₹10L) routed to Kukatpally bridal team + senior stylist assigned ⚡' },
          { t:'text', text:'You’re all set, Lakshmi! 🎉 Expect a call from our bridal stylist to confirm. Congratulations again! 👰💛' },
        ],
        choices: [],
      },
    },
  },

  /* 3 ──────────────────────────── GOLD INVESTMENT ──────────────────────── */
  invest: {
    title: 'Gold Investment', emoji: '🪙', persona: 'Mr. Menon · Kochi',
    blurb: 'Live rate, coins vs bars, Smart Buy rate-protection on Akshaya Tritiya.',
    entry: 'start',
    nodes: {
      start: {
        user: 'What’s today’s gold rate? Thinking of buying for Akshaya Tritiya.',
        bot: [
          { t:'text', text:'Namaskaram! 🙏 Akshaya Tritiya is one of the most auspicious days to buy gold — wonderful timing. Here’s our live, *One India One Gold Rate*:' },
          { t:'rate' },
          { t:'text', text:'Are you buying to *invest*, to *gift*, or a bit of both?' },
        ],
        choices: [
          { label:'Invest', goto:'invest2' },
          { label:'Gift', goto:'gift' },
          { label:'Coins vs bars?', goto:'coinsbars' },
        ],
      },
      invest2: {
        user: 'Mainly to invest',
        bot: [
          { t:'text', text:'For pure investment, *999.9 coins & bars* are ideal — no making-charge wastage, tamper-sealed, assay-certified and fully buyback-protected.' },
          { t:'cards', ids:['MI-GC-9902','MI-GB-9903','MI-GB-9904'], note:'Popular investment denominations' },
        ],
        choices: [
          { label:'Lock today’s rate (Smart Buy)', goto:'smartbuy' },
          { label:'Coins vs bars?', goto:'coinsbars' },
          { label:'Reserve a 50g bar', goto:'reserve' },
        ],
      },
      gift: {
        user: 'Some of it is for gifting',
        bot: [
          { t:'text', text:'Lovely 🎁 — for gifting, the *1g and 8g coins* (Lakshmi-embossed) are favourites, and a *silver Lakshmi-Ganesha coin* makes a thoughtful, budget-friendly token for Dhanteras.' },
          { t:'cards', ids:['MI-GC-9901','MI-GC-9902','MI-SC-9905'] },
        ],
        choices: [
          { label:'Lock today’s rate (Smart Buy)', goto:'smartbuy' },
          { label:'Reserve coins', goto:'reserve' },
        ],
      },
      coinsbars: {
        user: 'What’s better, coins or bars?',
        bot: [
          { t:'rag', q:'gold coin vs bar investment 999' },
          { t:'text', text:'Rule of thumb 👉 *Coins* (1–8g) = flexible, giftable, easy to liquidate a little at a time. *Bars* (10–50g) = lowest premium per gram, best for accumulating a larger amount. Both are 999.9 and buyback-protected.' },
        ],
        choices: [
          { label:'Lock today’s rate (Smart Buy)', goto:'smartbuy' },
          { label:'Reserve a 50g bar', goto:'reserve' },
        ],
      },
      smartbuy: {
        user: 'How do I lock today’s rate?',
        bot: [
          { t:'rag', q:'smart buy advance rate protection scheme' },
          { t:'text', text:'So if gold *rises* by December, you still pay today’s ₹7,800/g (24K). If it *falls*, you pay the lower rate. It’s rate-protection with no downside. 📈🛡️' },
        ],
        choices: [
          { label:'Reserve a 50g bar at this rate', goto:'reserve' },
          { label:'Start a Smart Saver 11+1 plan', goto:'reserve' },
        ],
      },
      reserve: {
        user: 'Reserve a 50g bar and lock the rate',
        bot: [
          { t:'text', text:'Excellent decision, Mr. Menon. ✅ I’ve reserved a *50g 999.9 bar* and noted today’s 24K rate of ₹7,800/g under Smart Buy.' },
          { t:'appt', kind:'reserve', product:'MI-GB-9904' },
          { t:'lead', data:{ name:'Mr. Menon', occasion:'Akshaya Tritiya', budget:'₹3,90,000+', category:'Investment · Gold bar', city:'Kochi', timeline:'This week' } },
          { t:'system', text:'Investment lead routed to Kochi MG Road relationship manager ⚡' },
        ],
        choices: [],
      },
    },
  },

  /* 4 ──────────────────────── PERSONAL SHOPPING CONCIERGE ───────────────── */
  concierge: {
    title: 'Personal Concierge', emoji: '🛍️', persona: 'Priya · Mumbai (returning)',
    blurb: 'Remembers past chats, maintains a profile, makes personalised picks.',
    entry: 'start',
    nodes: {
      start: {
        user: 'Hi Maya, it’s Priya again',
        bot: [
          { t:'text', text:'Welcome back, Priya! 🌸 Lovely to hear from you. Last time you were admiring the *Viraaz Diamond Studs* for everyday wear, and you mentioned you love minimal, office-friendly pieces.' },
          { t:'profile', data:{ name:'Priya', city:'Mumbai', taste:'Minimal · office-luxe', loves:'Viraaz diamonds', lastSeen:'Diamond studs (MD-ER-3303)', occasions:'Self-purchase' } },
          { t:'text', text:'Did you have something in mind today, or shall I show you a few new arrivals I think you’ll love?' },
        ],
        choices: [
          { label:'Show me new arrivals', goto:'newarr' },
          { label:'I want a gift for my mom', goto:'momgift' },
        ],
      },
      newarr: {
        user: 'Show me new arrivals for me',
        bot: [
          { t:'text', text:'Based on your taste — *minimal, daily-wearable, diamond* — here’s a curated trio just for you:' },
          { t:'reco', query:{ category:'diamond', style:['minimal','everyday','office'], gender:'women', budget:160000 }, n:3 },
          { t:'text', text:'The *Tennis Bracelet* is a step up — many of our office-luxe customers add it as a “treat yourself” milestone piece. 💫' },
        ],
        choices: [
          { label:'Add bracelet to my wishlist', goto:'wish' },
          { label:'Reserve the studs', goto:'wish' },
        ],
      },
      momgift: {
        user: 'I want a gift for my mom',
        bot: [
          { t:'text', text:'How thoughtful 💛 You usually lean minimal, but for your mom — does she enjoy *traditional gold* or something *diamond*?' },
        ],
        choices: [
          { label:'Traditional gold', goto:'momgold' },
          { label:'Diamond', goto:'newarr' },
        ],
      },
      momgold: {
        user: 'Traditional gold for mom',
        bot: [
          { t:'reco', query:{ category:'gold', style:['ethnic','traditional','festive'], gender:'women', budget:120000 }, n:2 },
          { t:'text', text:'The *Ethnix Jhumkas* are a beautiful, wearable gift — and I’ll remember your mom prefers traditional for next time. 📝' },
        ],
        choices: [ { label:'Reserve the jhumkas', goto:'wish' } ],
      },
      wish: {
        bot: [
          { t:'text', text:'Saved! 💾 I’ve updated your profile and wishlist. I’ll alert you if any of these feature in an upcoming offer, and keep your preferences for next time.' },
          { t:'system', text:'Customer profile enriched · re-engagement reminder scheduled · CLV segment: High' },
        ],
        choices: [],
      },
    },
  },

  /* 5 ──────────────────────────── VIRTUAL TRY-ON ──────────────────────── */
  tryon: {
    title: 'Virtual Try-On', emoji: '📸', persona: 'Rahul · Bengaluru',
    blurb: 'Upload a photo → AI detects neck/ears → visualises matching jewellery.',
    entry: 'start',
    nodes: {
      start: {
        user: 'Can I see how a necklace looks on me?',
        bot: [
          { t:'text', text:'Absolutely! 📸 Just share a clear, front-facing photo (good lighting, shoulders visible) and I’ll show you how our pieces look on *you*.' },
        ],
        choices: [ { label:'📎 Upload my photo', goto:'detect' } ],
      },
      detect: {
        user: '[photo]',
        bot: [
          { t:'photo' },
          { t:'text', text:'Got it! Analysing… 🔍' },
          { t:'tryon', detect:['Face ✔','Neckline ✔','Ear position ✔','Skin undertone: warm'] },
          { t:'text', text:'Your warm undertone suits *yellow gold and emerald* beautifully. Here are two looks rendered on your photo:' },
          { t:'cards', ids:['MG-NL-2202','MP-RG-3401'], note:'Tap a piece to “try” it on your photo' },
        ],
        choices: [
          { label:'I like the Kasumalai', goto:'like' },
          { label:'Show diamond options', goto:'dia' },
        ],
      },
      dia: {
        user: 'Show me diamond options on me',
        bot: [
          { t:'tryon', detect:['Re-rendering with diamonds ✨'] },
          { t:'cards', ids:['MD-PD-3302','MD-ER-3303'], note:'Diamond pendant + studs visualised on your photo' },
        ],
        choices: [ { label:'I like the pendant', goto:'like' } ],
      },
      like: {
        user: 'I like this one!',
        bot: [
          { t:'text', text:'It looks stunning on you! 😍 Would you like to *reserve* it, or try it on for real at a store near you?' },
        ],
        choices: [
          { label:'Book a store try-on', goto:'store' },
          { label:'Reserve it', goto:'done' },
        ],
      },
      store: {
        user: 'Book a store try-on',
        bot: [
          { t:'store', city:'Bengaluru' },
          { t:'appt', kind:'visit', store:'Bengaluru', when:'Sun 29 Jun, 5:00 PM' },
        ],
        choices: [ { label:'Great, thanks!', goto:'done' } ],
      },
      done: {
        bot: [
          { t:'lead', data:{ name:'Rahul', occasion:'Self / gift', budget:'₹70k–₹1.5L', category:'Try-on interest', city:'Bengaluru', timeline:'Exploring' } },
          { t:'system', text:'Try-on engagement logged · visual-preference tags saved to profile' },
        ],
        choices: [],
      },
    },
  },

  /* 6 ──────────────────────── STORE VISIT CONVERSION ──────────────────── */
  store: {
    title: 'Store Visit & Booking', emoji: '📍', persona: 'Walk-in intent',
    blurb: 'Locate nearest store, book appointment, reserve a piece for trial.',
    entry: 'start',
    nodes: {
      start: {
        user: 'Where’s your nearest showroom?',
        bot: [
          { t:'text', text:'Happy to help! 📍 Share your location or tell me your city and I’ll find the nearest Malabar showroom with hours and languages spoken.' },
        ],
        choices: [
          { label:'📍 Share location', goto:'chennai' },
          { label:'I’m in Chennai', goto:'chennai' },
          { label:'I’m in Delhi', goto:'delhi' },
        ],
      },
      chennai: {
        user: '📍 Chennai',
        bot: [
          { t:'store', city:'Chennai' },
          { t:'text', text:'Would you like to *book an appointment* so a consultant is ready for you (no waiting), or *reserve a piece* to try when you arrive?' },
        ],
        choices: [
          { label:'Book appointment', goto:'appt' },
          { label:'Reserve a piece', goto:'reserve' },
        ],
      },
      delhi: {
        user: '📍 Delhi',
        bot: [
          { t:'store', city:'Delhi' },
        ],
        choices: [
          { label:'Book appointment', goto:'appt' },
          { label:'Reserve a piece', goto:'reserve' },
        ],
      },
      appt: {
        user: 'Book an appointment',
        bot: [
          { t:'appt', kind:'visit', store:'Chennai', when:'Today, 7:00 PM' },
          { t:'text', text:'All set! You’ll skip the queue and a consultant will be assigned to you. 🙌' },
        ],
        choices: [ { label:'Thank you', goto:'done' } ],
      },
      reserve: {
        user: 'Reserve a piece to try',
        bot: [
          { t:'text', text:'Sure! Here’s a popular piece you can reserve and try on arrival:' },
          { t:'cards', ids:['MD-RG-3301'] },
          { t:'appt', kind:'reserve', product:'MD-RG-3301' },
        ],
        choices: [ { label:'Thanks!', goto:'done' } ],
      },
      done: {
        bot: [
          { t:'lead', data:{ name:'—', occasion:'Store visit', budget:'—', category:'Walk-in', city:'Chennai', timeline:'Today' } },
          { t:'system', text:'Appointment synced to store calendar · staff notified · footfall +1 ⚡' },
        ],
        choices: [],
      },
    },
  },

  /* 7 ──────────────────────── CUSTOMER SUPPORT ────────────────────────── */
  support: {
    title: 'Support Automation', emoji: '🛟', persona: 'Existing customer',
    blurb: 'Order tracking, exchange, buyback, warranty, repair — grounded in policy (RAG).',
    entry: 'start',
    nodes: {
      start: {
        user: 'I need some help with my order and a few policies',
        bot: [
          { t:'text', text:'Of course — I’m here 24×7. 🛟 What can I help you with?' },
        ],
        choices: [
          { label:'Track my order', goto:'track' },
          { label:'Buyback policy', goto:'buyback' },
          { label:'Exchange old gold', goto:'exchange' },
          { label:'Repair status', goto:'repair' },
        ],
      },
      track: {
        user: 'Track order MG48213',
        bot: [
          { t:'text', text:'Found it! 📦 Order *MG48213* — Diamond Pendant Set (MD-PD-3302):' },
          { t:'order', data:{ id:'MG48213', item:'Diamond Pendant Set', status:'Out for delivery', eta:'Today by 7 PM', note:'ID verification required on delivery (high-value item).' } },
        ],
        choices: [
          { label:'Change delivery time', goto:'handoff' },
          { label:'Anything else', goto:'start' },
        ],
      },
      buyback: {
        user: 'What’s your buyback policy?',
        bot: [
          { t:'rag', q:'buyback policy gold diamond resale value invoice' },
          { t:'text', text:'In short: bring your *original invoice*, and we buy back gold at the prevailing rate (diamonds under our rate-protection promise). Want me to estimate a buyback value? I can connect you to a store expert.' },
        ],
        choices: [
          { label:'Estimate my buyback', goto:'handoff' },
          { label:'Exchange instead', goto:'exchange' },
        ],
      },
      exchange: {
        user: 'I want to exchange old gold',
        bot: [
          { t:'rag', q:'exchange old gold upgrade purity assessment' },
        ],
        choices: [
          { label:'Book a store visit', goto:'handoff' },
          { label:'Anything else', goto:'start' },
        ],
      },
      repair: {
        user: 'Repair status for ticket RP7781',
        bot: [
          { t:'text', text:'Checking ticket *RP7781*… 🔧' },
          { t:'order', data:{ id:'RP7781', item:'Gold bangle — resize', status:'Ready for pickup', eta:'Available now', note:'Pickup at Kochi MG Road, counter 4.' } },
        ],
        choices: [ { label:'Thanks!', goto:'csat' } ],
      },
      handoff: {
        user: 'Can a human help with this?',
        bot: [
          { t:'text', text:'Absolutely — I’ll bring in a store expert. 👩‍💼' },
          { t:'system', text:'Warm handoff → human agent (with full chat context). Avg pickup: 45s' },
          { t:'text', text:'Meanwhile, is there anything else I can take care of?' },
        ],
        choices: [ { label:'No, that’s all', goto:'csat' } ],
      },
      csat: {
        bot: [
          { t:'text', text:'Glad I could help! 🌟 On a scale of 1–5, how was this support experience?' },
          { t:'system', text:'~70% of support queries resolved without a human · cost-to-serve < ₹3 vs ₹45–70 ⚡' },
        ],
        choices: [],
      },
    },
  },

  /* 8 ──────────────────────── FESTIVAL CAMPAIGN ──────────────────────── */
  festival: {
    title: 'Festival Campaign', emoji: '🪔', persona: 'Broadcast → conversation',
    blurb: 'Akshaya Tritiya / Dhanteras push that becomes a personalised sale.',
    entry: 'start',
    nodes: {
      start: {
        bot: [
          { t:'campaign', data:{ title:'✨ Akshaya Tritiya — Buy Gold for Prosperity ✨', body:'0% making charges on select gold coins · Assured gift on purchases above ₹50,000 · Smart Buy rate-lock available today only.', cta:'Shop the Akshaya Tritiya edit' } },
          { t:'text', text:'Namaskaram! 🙏 On this auspicious *Akshaya Tritiya*, even a small gold purchase is considered lucky. Shall I show you the *coin edit* or *festive jewellery*?' },
        ],
        choices: [
          { label:'Gold coins 🪙', goto:'coins' },
          { label:'Festive jewellery 💫', goto:'jewel' },
          { label:'What’s the offer?', goto:'offer' },
        ],
      },
      coins: {
        user: 'Show me the coins',
        bot: [
          { t:'rate' },
          { t:'cards', ids:['MI-GC-9901','MI-GC-9902','MI-SC-9905'], note:'0% making charge on these today' },
        ],
        choices: [
          { label:'Reserve the 8g coin', goto:'buy' },
          { label:'Lock rate (Smart Buy)', goto:'buy' },
        ],
      },
      jewel: {
        user: 'Show me festive jewellery',
        bot: [
          { t:'reco', query:{ category:'gold', occasion:'festival', style:['festive','ethnic','designer'] }, n:3 },
          { t:'text', text:'Spend above ₹50,000 today and you’ll receive an *assured festive gift*. 🎁' },
        ],
        choices: [ { label:'Reserve the jhumkas', goto:'buy' } ],
      },
      offer: {
        user: 'What exactly is the offer?',
        bot: [
          { t:'text', text:'For Akshaya Tritiya 🪔:\n• *0% making charges* on select gold coins\n• *Assured gift* on purchases above ₹50,000\n• *Smart Buy* rate-lock so you’re protected from price rises\n• Free insured delivery anywhere in India' },
        ],
        choices: [
          { label:'Gold coins 🪙', goto:'coins' },
          { label:'Festive jewellery 💫', goto:'jewel' },
        ],
      },
      buy: {
        user: 'Reserve it for me',
        bot: [
          { t:'appt', kind:'reserve', product:'MI-GC-9902' },
          { t:'lead', data:{ name:'—', occasion:'Akshaya Tritiya', budget:'₹50k+', category:'Festival · Coins', city:'—', timeline:'Today' } },
          { t:'system', text:'Campaign → conversion. WhatsApp open rate ~90% vs email ~20% · attributed sale tagged to campaign ⚡' },
        ],
        choices: [],
      },
    },
  },

  /* 9 ──────────────────────── VOICE / MULTILINGUAL ──────────────────────── */
  voice: {
    title: 'Voice & Multilingual', emoji: '🎙️', persona: 'Divya · Coimbatore (Tamil)',
    blurb: 'Voice note in Tamil → Maya understands, replies by voice in the same language.',
    entry: 'start',
    nodes: {
      start: {
        bot: [
          { t:'text', text:'You can talk to me by *voice note* in your language — English, हिंदी, தமிழ், తెలుగు, മലയാളം or ಕನ್ನಡ. 🎙️ Tap a voice note below to hear how it works.' },
        ],
        choices: [
          { label:'▶️ Send a Tamil voice note', goto:'tamil' },
          { label:'▶️ Send a Malayalam voice note', goto:'mal' },
          { label:'Type in Hindi instead', goto:'hindi' },
        ],
      },
      tamil: {
        user: '[voice note · Tamil]',
        bot: [
          { t:'voiceIn', lang:'Tamil', dur:'0:09', text:'“Vanakkam, en thangai kalyanathukku oru thali chain venum, budget oru lakh.”', gloss:'“Hello, I need a thali chain for my sister’s wedding, budget ₹1 lakh.”' },
          { t:'text', text:'வணக்கம்! 🙏 Maya here — I understood perfectly. For a *thali chain* around ₹1 lakh, here are lovely options:' },
          { t:'reco', query:{ category:'gold', occasion:'wedding', region:['tamil'], budget:100000 }, n:2 },
          { t:'voiceOut', lang:'Tamil', dur:'0:11', text:'“Inga rendu nalla thali chain options irukku. Ungaluku pidichirundha, naan store-la reserve panren.”', gloss:'“Here are two good thali chain options. If you like them, I’ll reserve them at the store for you.”' },
        ],
        choices: [
          { label:'Reserve & book Coimbatore store', goto:'done' },
          { label:'Try Malayalam', goto:'mal' },
        ],
      },
      mal: {
        user: '[voice note · Malayalam]',
        bot: [
          { t:'voiceIn', lang:'Malayalam', dur:'0:08', text:'“Namaskaram, ente ammaykku oru gold churidaar set venam, budget onnara lakh.”', gloss:'“Hello, I’d like a gold set for my mother, budget ₹1.5 lakh.”' },
          { t:'text', text:'നമസ്കാരം! 🙏 Here are two elegant options your mother will love:' },
          { t:'reco', query:{ category:'gold', gender:'women', style:['traditional','ethnic'], budget:150000 }, n:2 },
          { t:'voiceOut', lang:'Malayalam', dur:'0:10', text:'“Ee randu options ammaykku nannായിരിക്കും. Venamenkil njan Kochi store-il reserve cheyyam.”', gloss:'“These two options will suit your mother. If you like, I’ll reserve them at the Kochi store.”' },
        ],
        choices: [ { label:'Reserve & book Kochi store', goto:'done' } ],
      },
      hindi: {
        user: 'मुझे दिवाली के लिए सोने का सिक्का चाहिए',
        bot: [
          { t:'text', text:'ज़रूर! 🪔 दिवाली के लिए ये सोने के सिक्के बहुत शुभ माने जाते हैं:' },
          { t:'cards', ids:['MI-GC-9901','MI-GC-9902'] },
          { t:'text', text:'क्या मैं आज का भाव *Smart Buy* से लॉक कर दूँ? 📈🛡️' },
        ],
        choices: [ { label:'हाँ, रिज़र्व करें', goto:'done' } ],
      },
      done: {
        bot: [
          { t:'lead', data:{ name:'Divya', occasion:'Wedding / gifting', budget:'₹1–1.5L', category:'Voice · Regional language', city:'Coimbatore', timeline:'This month' } },
          { t:'system', text:'Voice + vernacular handled end-to-end · 6 languages · reaches non-English & low-literacy customers 🌏' },
        ],
        choices: [],
      },
    },
  },

  /* 10 ──────────────────────── LEAD GENERATION ──────────────────────── */
  lead: {
    title: 'High-Value Lead Gen', emoji: '🎯', persona: 'Suresh · NRI (Dubai)',
    blurb: 'Qualify name/occasion/budget/category/location/timeline → route to sales in <60s.',
    entry: 'start',
    nodes: {
      start: {
        user: 'I’m in Dubai, want to gift jewellery to my mother in Kerala',
        bot: [
          { t:'text', text:'How lovely of you 💛 I can arrange everything — chosen here, *delivered insured to her in Kerala*, with a video unboxing if you like. Let me note a few details so our team gives you white-glove service.' },
          { t:'text', text:'What’s the occasion? 🎁' },
        ],
        choices: [
          { label:'Her birthday', goto:'budget' },
          { label:'Just because 💛', goto:'budget' },
        ],
      },
      budget: {
        user: 'Her 60th birthday',
        bot: [ { t:'text', text:'A milestone — she deserves something special! 🥳 What budget are you thinking?' } ],
        choices: [
          { label:'Around ₹1 lakh', goto:'cat' },
          { label:'₹2–3 lakh', goto:'cat' },
        ],
      },
      cat: {
        user: '₹2–3 lakh',
        bot: [ { t:'text', text:'Beautiful range. Does she prefer *traditional gold* or *diamonds*? 💎' } ],
        choices: [
          { label:'Traditional gold', goto:'pick' },
          { label:'Diamonds', goto:'pickDia' },
        ],
      },
      pick: {
        user: 'Traditional gold',
        bot: [
          { t:'reco', query:{ category:'gold', gender:'women', style:['traditional','ethnic'], budget:300000 }, n:2 },
          { t:'rag', q:'nri gift delivery to india insured' },
        ],
        choices: [ { label:'I like the Kasumalai', goto:'qualify' } ],
      },
      pickDia: {
        user: 'Diamonds',
        bot: [
          { t:'reco', query:{ category:'diamond', gender:'women', budget:300000 }, n:2 },
        ],
        choices: [ { label:'I like the bracelet', goto:'qualify' } ],
      },
      qualify: {
        user: 'Let’s go ahead',
        bot: [
          { t:'text', text:'Wonderful! Here’s your lead summary — our NRI desk will take it from here:' },
          { t:'lead', data:{ name:'Suresh', occasion:'Mother’s 60th', budget:'₹2–3 lakh', category:'Gold / Diamond', city:'Dubai → deliver Kerala', timeline:'2 weeks' }, score:'92 / 100 · HOT' },
          { t:'system', text:'⚡ Qualified HIGH-VALUE NRI lead auto-scored 92/100 and routed to NRI sales desk in 41 seconds. SLA: callback < 60 min.' },
          { t:'text', text:'You’ll get a call from our NRI relationship manager shortly, Suresh. Your mother is going to be so happy! 🌸' },
        ],
        choices: [],
      },
    },
  },

};

// Display order for the launcher
window.SCENARIO_ORDER = ['discovery','bridal','invest','concierge','tryon','store','support','festival','voice','lead'];
