# Conversation Flows — Malabar Gold & Diamonds WhatsApp AI Agent ("Maya")

> Companion to `00-CANONICAL-BRIEF.md`. All sub-brands (Brides of Malabar, Mine, Era, Ethnix, Divine, Precia, Starlet, Mehrab, Viraaz), SKUs, gold rates (22K ₹7,150/g · 24K ₹7,800/g · Silver ₹95/g — *indicative demo rate, One India One Gold Rate*), stores and personas referenced here are the canonical ones. Figures are **illustrative for demo purposes**.

---

## 0. Global Conversation Design Principles

These apply to **every** scenario below and are the contract the agent honours in all 10 flows.

### 0.1 Persona & tone
- **Maya** — Malabar's AI Jewellery Concierge. Warm, courteous, knowledgeable luxury consultant. Never pushy.
- Speaks like a trusted store relationship manager, not a chatbot: short sentences, light emoji (✨💛💎), one idea per bubble.
- **Multilingual**: English, Hindi, Tamil, Telugu, Malayalam, Kannada, plus Hinglish. Detects and mirrors the customer's language.
- Always closes with a **next step** (recommend / reserve / book / connect human). Never a dead end.

### 0.2 Opening message (first contact)
```
✨ Namaste! I'm Maya, your personal jewellery concierge at
Malabar Gold & Diamonds 💛

I'm an AI assistant — and a real store expert is always one
tap away if you'd like.

How can I help you today?
```
Followed by an **interactive list / reply buttons** menu (see 0.3).

### 0.3 Master menu (interactive list)
| Row | Title | Routes to scenario |
|---|---|---|
| 🔎 | Explore jewellery | 1 Product Discovery |
| 👰 | Plan a bridal look | 2 Bridal Consultant |
| 🪙 | Gold rate & investment | 3 Gold Investment |
| 🛍️ | Personal shopper | 4 Concierge |
| 📸 | Virtual try-on | 5 Try-On |
| 📍 | Visit a store | 6 Store Visit |
| 🛠️ | Order / support | 7 Support |
| 🎉 | Festival offers | 8 Festival |
| 🗣️ | Talk in my language | 9 Voice AI |

### 0.4 Consent & AI disclosure (first session, once)
- **AI disclosure** in the opening message (above) — non-negotiable, every new chat.
- **Consent capture** before storing any PII / sending marketing:
```
Before we continue — may I save your preferences and send you
updates on gold rates & offers on WhatsApp? You can opt out
anytime by replying STOP. [ Yes, sure ✅ ] [ Not now ]
```
- Stored under DPDP Act basis; consent state persisted in CRM. No marketing broadcast without an opted-in flag.

### 0.5 Error handling & fallbacks
- **Unrecognised intent (1st time):** reflect + re-offer menu — *"I want to get this right 🙏 Did you mean…"* + 3 likely reply buttons.
- **Unrecognised intent (2nd consecutive):** offer human — *"Let me bring in a store expert."* → `handoffToHuman`.
- **Out-of-catalogue ask:** never invent SKUs/prices. *"I don't have that exact piece, but here's the closest from our collection…"* via `searchCatalog`.
- **Price/purity questions:** quote only canonical data + BIS Hallmark; for anything beyond, hand off. **No financial advice** beyond product facts.
- **Profanity / distress / complaint heat:** immediate empathetic ack + `handoffToHuman`.

### 0.6 Human handoff rules (global)
Trigger handoff when ANY of: explicit request ("talk to person"), 2× fallback, high-value intent (> ₹2L or bridal), complaint/repair dispute, payment/refund, or low NLU confidence < 0.55. On handoff: summarise context to agent, set expectation (*"A specialist will reply here within ~5 min, 10:30–20:30 IST"*), keep transcript.

### 0.7 Ending / next-step rule
Every flow terminates in one of: **Reserve item**, **Book appointment**, **Capture qualified lead**, **Share store/location**, or **Handoff**. Always confirm + tell the customer what happens next.

```mermaid
flowchart TD
    Start([Inbound message]) --> Disc{First contact?}
    Disc -->|Yes| Open[Opening + AI disclosure]
    Disc -->|No| Mem[Load CRM memory/prefs]
    Open --> Consent{Consent given?}
    Mem --> Menu
    Consent -->|Yes| Menu[Master menu list]
    Consent -->|Not now| Menu
    Menu --> Route{Detect intent}
    Route -->|low conf x2| HH[[handoffToHuman]]
    Route -->|matched| Scenario[Scenario flow 1-10]
    Scenario --> Exit{Next-step}
    Exit --> Reserve[Reserve]
    Exit --> Book[bookAppointment]
    Exit --> Lead[captureLead]
    Exit --> Loc[shareStore]
    Exit --> HH
```

### 0.8 Tool inventory (shared across flows)
`searchCatalog(query, brand, budget, occasion)` · `getGoldRate()` · `getProduct(sku)` · `reserveItem(sku, store)` · `bookAppointment(store, type, slot)` · `captureLead(profile, intent, value)` · `getStores(city|geo)` · `tryOnRender(image, sku)` · `getOrderStatus(orderId)` · `startSavingScheme(plan)` · `handoffToHuman(reason, summary)`

---

## Scenario 1 — Product Discovery

**Goal:** Help a browsing customer find 2–3 relevant pieces and reserve / shortlist one.
**Success metric:** % chats reaching a product card view → shortlist/reserve; target ≥ 35% shortlist rate.
**Triggers:** Click-to-WhatsApp ad ("Shop Diamonds ✨"), organic "Hi", catalogue link on website, QR on print ad.
**Persona fit:** Aarthi (anniversary gift, ₹1L), Priya (self-purchase Viraaz).

### Flow
```mermaid
flowchart TD
    A([Entry: ad / organic]) --> B[Greeting + menu]
    B --> C{Pick category}
    C -->|Gold| D[Ask occasion + budget]
    C -->|Diamond| D
    C -->|Gemstone| D
    D --> E[[searchCatalog]]
    E --> F[Show 2-3 product cards]
    F --> G{Reaction}
    G -->|More like this| E
    G -->|Filter budget| D
    G -->|Tell me more| H[[getProduct details + BIS info]]
    G -->|Not my style| D
    H --> I{Quick replies}
    I -->|Reserve| J[[reserveItem]]
    I -->|Try on| K[Go to Scenario 5]
    I -->|See in store| L[[bookAppointment]]
    J --> M[Confirmation + next step]
    L --> M
    M --> N([Exit: shortlist/reserve/booked])
    G -->|Talk to expert| HH[[handoffToHuman]]
```

**Key intents & sample utterances**
- `browse_category`: "show me diamond pendants", "gold chains under 1 lakh", "something for my wife's anniversary"
- `filter_budget`: "anything cheaper", "around 60k", "below 1.5L"
- `product_detail`: "is it hallmarked", "what's the weight", "making charges?"
- `shortlist/reserve`: "reserve this", "hold it for me", "I'll take the studs"

**WhatsApp UI:** interactive **list** (categories) → **reply buttons** (occasion/budget bands) → **product cards/catalog** (image + title + price + View CTA) → reply buttons (Reserve / Try on / See in store). Example cards surfaced: `MD-PD-3302 Diamond Pendant Set ₹1,46,000`, `MD-ER-3303 Diamond Studs (Viraaz) ₹64,000`.

**Guardrails:** only canonical SKUs/prices; always state BIS Hallmark + transparent price tag when asked; cap to 3 cards per turn to avoid overload; if budget < lowest SKU, suggest Smart Saver 11+1 rather than dead-end.

---

## Scenario 2 — Bridal Consultant

**Goal:** Qualify a bridal lead and book a private bridal-suite consultation.
**Success metric:** bridal consultation bookings / bridal chats; target ≥ 25%, plus full lead capture (budget, date, region style).
**Triggers:** "Brides of Malabar" ad, wedding-season broadcast, organic "wedding jewellery", QR at bridal expo.
**Persona fit:** Lakshmi & family (Dec wedding, ₹10L), Divya (Tamil temple bridal).

### Flow
```mermaid
flowchart TD
    A([Entry: Brides of Malabar ad]) --> B[Warm bridal greeting]
    B --> C[Ask wedding date]
    C --> D[Ask region/style: South Indian temple / North / Polki]
    D --> E[Ask budget band]
    E --> F[[searchCatalog brand=Divine/Era/Brides]]
    F --> G[Curated bridal lookbook cards]
    G --> H{Reaction}
    H -->|Love this| I[[captureLead high-value]]
    H -->|Show more| F
    H -->|Mix with diamonds| F2[[searchCatalog brand=Mine/Era]]
    F2 --> G
    I --> J[Offer private bridal-suite consult]
    J --> K{Book?}
    K -->|Yes| L[[bookAppointment type=bridal]]
    K -->|Call me| M[[captureLead + handoffToHuman]]
    L --> N[Confirmation card + RM assigned]
    M --> N
    N --> O([Exit: booked / hot lead routed <60s])
```

**Key intents & utterances:** "jewellery for my December wedding", "temple haram set", "Polki necklace", "full bridal set in 10 lakhs", "Brides of Malabar collection", "book consultation".

**WhatsApp UI:** reply buttons (style/region), **WhatsApp Flow form** for date+budget+city, product **carousel** (`MD-NL-3304 Polki Bridal Necklace ₹6,90,000`, `MG-NL-2201 Lakshmi Temple Haram ₹3,85,000`, `MG-BG-2203 Antique Lakshmi Bangles ₹4,46,000`), **CTA URL button** (lookbook PDF), **appointment confirmation card**.

**Guardrails / handoff:** any bridal intent is **high-value** → `captureLead` + route to bridal RM within 60s SLA. Don't over-promise customisation timelines; defer to RM. Confirm bridal-suite availability per store before booking (Kozhikode, Chennai T.Nagar, Hyderabad Kukatpally = Y).

---

## Scenario 3 — Gold Investment Advisor

**Goal:** Inform on live rate, surface coins/bars + Smart Buy / Smart Saver, drive a coin reservation or scheme enrolment.
**Success metric:** rate-checks → scheme enrolment or coin reservation; target ≥ 15% conversion.
**Triggers:** Akshaya Tritiya / Dhanteras broadcast, "gold rate today" organic, ad "Lock today's gold rate".
**Persona fit:** Mr. Menon (Kochi, investment, Akshaya Tritiya).

### Flow
```mermaid
flowchart TD
    A([Entry: rate broadcast / organic]) --> B[[getGoldRate]]
    B --> C[Show 22K 24K silver + timestamp + One India One Gold Rate]
    C --> D{Goal?}
    D -->|Buy coin/bar| E[Coin & bar cards]
    D -->|Save monthly| F[Explain Smart Saver 11+1]
    D -->|Lock the rate| G[Explain Smart Buy Advance Purchase]
    E --> H{Reserve?}
    H -->|Yes| I[[reserveItem coin/bar]]
    F --> J[[startSavingScheme plan=11+1]]
    G --> K[[startSavingScheme plan=smartbuy]]
    I --> L[Confirm + store pickup/delivery]
    J --> L
    K --> L
    L --> M([Exit: reserved / enrolled])
    D -->|Advice on amount| HH[[handoffToHuman - no financial advice]]
```

**Key intents & utterances:** "gold rate today", "1 gram coin price", "Akshaya Tritiya offer", "how does advance purchase work", "monthly gold scheme", "is it BIS hallmark".

**WhatsApp UI:** rate shown as **text bubble** (timestamped), product **cards** (`MI-GC-9901 Gold Coin 1g ₹live+3%`, `MI-GB-9903 Gold Bar 10g`, `MI-SC-9905 Silver Coin 10g ₹1,150`), reply buttons (Buy / Save / Lock rate), **WhatsApp Flow form** for scheme KYC, CTA URL (scheme T&C).

**Guardrails:** rate always timestamped + labelled *indicative demo rate*; **never** give investment advice ("should I buy?") → hand off / neutral framing. State 999.9 purity + BIS. Coin premium shown transparently (+3%).

---

## Scenario 4 — Personal Shopping Concierge

**Goal:** White-glove, memory-driven curation for repeat / high-intent shoppers; cross-sell to lift AOV.
**Success metric:** cross-sell attach rate + AOV uplift; target +8–12% AOV.
**Triggers:** returning opted-in customer, "help me pick a gift", VIP broadcast.
**Persona fit:** Suresh (NRI Dubai, gift for mother in Kerala, remote + delivery), Aarthi.

### Flow
```mermaid
flowchart TD
    A([Returning customer]) --> B[Load CRM memory: past views/purchases]
    B --> C[Personalised greeting by name + recall]
    C --> D[Ask: occasion / recipient / budget]
    D --> E[[searchCatalog personalised]]
    E --> F[2-3 curated cards + 1 cross-sell]
    F --> G{Reaction}
    G -->|Pick one| H[Suggest complement set]
    G -->|Refine| D
    H --> I{Add complement?}
    I -->|Yes| J[Bundle summary + AOV up]
    I -->|No| K[Single item summary]
    J --> L{Fulfilment}
    K --> L
    L -->|Deliver| M[[captureLead + insured shipping]]
    L -->|Store pickup| N[[reserveItem + getStores]]
    M --> O([Exit: order intent + delivery])
    N --> O
    L -->|Video shopping| HH[[handoffToHuman personal shopper]]
```

**Key intents & utterances:** "gift for my mother", "ship to Kerala from Dubai", "something to match the pendant I saw", "video call to show me", "remember what I liked".

**WhatsApp UI:** personalised **text bubble**, product **carousel**, **reply buttons** (Add matching / Just this), **WhatsApp Flow** for shipping address, **CTA URL** (video-shopping booking), confirmation card. Cross-sell example: pendant `MD-PD-3302` → studs `MD-ER-3303`.

**Guardrails:** only recall data the customer consented to store; confirm before sharing remembered details ("Last time you liked the Mine pendant — want to continue?"). For NRI/remote, surface free insured shipping + buyback transparently; complex remote payment → personal shopper handoff.

---

## Scenario 5 — Virtual Try-On

**Goal:** Let customer "wear" a piece via uploaded selfie → boost confidence → shortlist/visit.
**Success metric:** try-on completions → reserve/book; target ≥ 30% post-try-on action.
**Triggers:** product card "Try on 📸" button, ad "See it on you", in-store QR.

### Flow
```mermaid
flowchart TD
    A([Entry: Try-on tap]) --> B[Explain + ask for selfie / pick model]
    B --> C{Photo provided?}
    C -->|Upload selfie| D[[tryOnRender image+sku]]
    C -->|Use a model| D
    C -->|Privacy worry| E[Reassure: photo not stored, on-device note]
    E --> C
    D --> F[Return rendered try-on image]
    F --> G{Reaction}
    G -->|Love it| H{Quick replies}
    G -->|Try another piece| I[[searchCatalog]] --> D
    G -->|Different angle| D
    H -->|Reserve| J[[reserveItem]]
    H -->|Book store try| K[[bookAppointment]]
    J --> L([Exit: reserved])
    K --> L
    G -->|Looks off| HH[[handoffToHuman / suggest store]]
```

**Key intents & utterances:** "how will this look on me", "try the jhumkas", "can I see the haram on me", "use a model instead".

**WhatsApp UI:** **image-upload** prompt, **typing/processing indicator** during render, returned **media image** bubble, reply buttons (Reserve / Try another / Book store visit). Try-on candidates: `MG-ER-2205 Jhumka Earrings`, `MG-NL-2201 Temple Haram`, `MD-RG-3301 Solitaire Ring`.

**Guardrails:** explicit consent before processing a face image; state photo is **not stored** and used only to render; never render someone other than the sender's intent; offer model-based fallback. If render quality low → suggest in-store / video shopping.

---

## Scenario 6 — Store Visit Conversion

**Goal:** Convert a digital chat into a booked, attributed store appointment.
**Success metric:** chats → confirmed appointments + show-up rate; target +15–25% lead-to-store.
**Triggers:** "visit store" intent, end of any flow, location-based ad, broadcast.

### Flow
```mermaid
flowchart TD
    A([Intent: visit store]) --> B[Ask city or request location]
    B --> C[[getStores by city/geo]]
    C --> D[Show nearest 1-2 store location cards]
    D --> E{Action}
    E -->|Get directions| F[Location card + maps link]
    E -->|Book appointment| G[Pick date/time slot]
    G --> H[[bookAppointment]]
    H --> I[Appointment confirmation card]
    I --> J[Offer: reserve item to view in-store]
    J -->|Yes| K[[reserveItem held at store]]
    J -->|No| L[Set reminder + add to calendar]
    K --> M([Exit: booked + reserved])
    L --> M
    E -->|Bridal suite| HH[[handoffTo bridal RM]]
```

**Key intents & utterances:** "nearest showroom", "store in T Nagar", "book a visit Saturday", "what are your timings", "is bridal suite available".

**WhatsApp UI:** **location request** button, **store location cards** (name, address, hours 10:30–20:30, languages, bridal-suite Y/N, maps CTA), **WhatsApp Flow** date/time picker, **appointment confirmation card**, calendar reminder. Stores: Chennai T.Nagar, Hyderabad Kukatpally, Bengaluru Jayanagar, etc.

**Guardrails:** confirm store hours/closure before booking; double-book protection; send reminder 24h + 2h prior; mark UTM/attribution on booking for ROI tracking.

---

## Scenario 7 — Customer Support Automation

**Goal:** Deflect routine queries (order status, repair, buyback, hallmark, schemes) at low cost; escalate cleanly.
**Success metric:** % deflected without human; target ~70% deflection at < ₹3/chat.
**Triggers:** organic support question, "order status", post-purchase message, QR on bill.

### Flow
```mermaid
flowchart TD
    A([Support query]) --> B{Classify intent}
    B -->|Order status| C[Ask order id] --> D[[getOrderStatus]] --> E[Status + ETA]
    B -->|Repair/polish| F[Explain lifetime free maintenance] --> G[[bookAppointment service]]
    B -->|Buyback/exchange| H[Explain transparent buyback/DGRP]
    B -->|Hallmark/purity| I[Explain BIS Hallmark + price tag]
    B -->|Scheme balance| J[[getOrderStatus scheme]]
    B -->|Complaint| K[Empathy ack]
    E --> L{Resolved?}
    H --> L
    I --> L
    J --> L
    L -->|Yes| M[Confirm + CSAT thumbs]
    L -->|No| HH[[handoffToHuman]]
    K --> HH
    G --> M
    M --> N([Exit: resolved / escalated])
```

**Key intents & utterances:** "where is my order", "track MG order", "ring needs resizing", "do you buy back old gold", "scheme balance", "this is hallmark certified?", "I want to complain".

**WhatsApp UI:** **reply buttons** (Order / Repair / Buyback / Other), text bubbles, **CTA URL** (warranty/care policy), service **appointment card**, **CSAT** reply buttons (👍/👎).

**Guardrails:** never quote a buyback amount → policy + store/RM; complaints & refunds always escalate; verify identity (order id / registered mobile) before sharing order details; honest "I'm not sure — let me connect you" over guessing.

---

## Scenario 8 — Festival Campaigns

**Goal:** Drive seasonal conversion (Akshaya Tritiya, Dhanteras, Diwali, Onam, Pongal) via broadcast → offer → reserve/visit.
**Success metric:** broadcast → click → conversion; target broadcast CTR + reservation lift.
**Triggers:** opted-in **broadcast** (template message), festival ad, organic "Diwali offer".

### Flow
```mermaid
flowchart TD
    A([Broadcast template: festival offer]) --> B{CTA tapped}
    B -->|Shop coins| C[[getGoldRate]] --> D[Festival coin cards]
    B -->|Festive jewellery| E[[searchCatalog brand=Ethnix/Divine]]
    B -->|Offers| F[Show festival offer terms]
    D --> G{Action}
    E --> G
    G -->|Reserve| H[[reserveItem]]
    G -->|Visit store| I[[bookAppointment]]
    G -->|Gift idea| J[[searchCatalog gifting]]
    J --> G
    F --> G
    H --> K[Confirm + festival pickup]
    I --> K
    K --> L([Exit: reserved/booked])
    B -->|STOP| M[Opt-out honoured]
```

**Key intents & utterances:** "Akshaya Tritiya gold", "Dhanteras coin", "Diwali jewellery offer", "Onam collection", "festive jhumkas".

**WhatsApp UI:** **broadcast template** with header image + **CTA buttons**, product **carousel** (`MG-ER-2205 Jhumka`, `MI-SC-9905 Silver Lakshmi-Ganesha Coin ₹1,150`, `MI-GC-9901 Gold Coin 1g`), countdown copy, reply buttons.

**Guardrails:** broadcast **only to opted-in** contacts; honour STOP instantly + suppress; offer terms must be truthful + dated; respect template messaging policy + 24h window rules; throttle frequency.

---

## Scenario 9 — Voice AI (Multilingual)

**Goal:** Let customers converse via **voice notes** in their language; transcribe → respond (voice + text); inclusive access.
**Success metric:** voice-session completion + intent fulfilment across languages; target parity with text flows.
**Triggers:** customer sends a voice note, "🗣️ Talk in my language" menu row, voice-first ad.

### Flow
```mermaid
flowchart TD
    A([Voice note received]) --> B[[transcribe + detect language]]
    B --> C{Confidence}
    C -->|High| D[Route to matching scenario intent]
    C -->|Low| E[Ask to confirm language / repeat]
    E --> A
    D --> F[Respond: voice note + text bubble in same language]
    F --> G{Intent type}
    G -->|Browse| H[Scenario 1 cards]
    G -->|Rate| I[[getGoldRate]]
    G -->|Store| J[[getStores]]
    G -->|Bridal| K[Scenario 2]
    H --> L{Next}
    I --> L
    J --> L
    K --> L
    L -->|Continue voice| A
    L -->|Switch to typing| M[Text mode]
    L -->|Human| HH[[handoffToHuman language-matched agent]]
    M --> N([Exit])
    HH --> N
```

**Key intents & multilingual sample utterances** (transliteration + English gloss):

| Lang | Voice utterance (transliteration) | English gloss |
|---|---|---|
| Hindi | "Aaj sone ka rate kya hai?" | What is today's gold rate? |
| Hindi | "Shaadi ke liye haar dikhao" | Show necklaces for the wedding |
| Tamil | "Inraikku thanga vilai enna?" | What's today's gold price? |
| Tamil | "Kovil maadhiri thaali set venum" | I want a temple-style thaali set |
| Telugu | "Ee roju bangaram rate enta?" | What is today's gold rate? |
| Telugu | "Pelliki haram chudali" | I want to see a haram for the wedding |
| Malayalam | "Innathe swarna vila ethra?" | What is today's gold price? |
| Malayalam | "Divine collection kaanikkamo?" | Can you show the Divine collection? |
| Kannada | "Ivattu chinnada bele estu?" | What is today's gold rate? |
| Kannada | "Maduvege haara torsi" | Show a necklace for the wedding |

**Reply pattern (Tamil example):** Voice note + text — *"இன்றைய 22K தங்க விலை ₹7,150/கிராம் (குறிப்பிட்ட விலை). கோயில் தாலி செட் காட்டவா? 💛"* (Today's 22K rate is ₹7,150/g — shall I show a temple thaali set?).

**WhatsApp UI:** inbound **voice note**, outbound **voice note + text bubble** pair, reply buttons localised, product cards with localised titles, language-switch button.

**Guardrails:** always send a **text transcript alongside voice** (accessibility); confirm language if STT confidence low; numbers/prices repeated in text to avoid mishearing; if dialect unsupported → polite fallback to English/text + offer language-matched human. Disclose AI voice is synthetic.

---

## Scenario 10 — High-Value Lead Generation

**Goal:** Identify, qualify, and route high-ticket intent (> ₹2L, bridal, HNI investment, NRI) to a human specialist within **60s SLA**.
**Success metric:** qualified-lead capture rate + 60s routing SLA adherence + lead-to-sale.
**Triggers:** budget/intent signals in any flow, "premium collection" ad, HNI broadcast, Era/Polki interest.
**Persona fit:** Lakshmi (₹10L bridal), Suresh (NRI HNI), Mr. Menon (50g bar).

### Flow
```mermaid
flowchart TD
    A([Any flow signals high value]) --> B{Qualify: budget>2L OR bridal OR HNI OR NRI}
    B -->|No| C[Stay in normal flow]
    B -->|Yes| D[Soft-qualify: occasion, timeline, budget]
    D --> E[[captureLead profile+intent+value]]
    E --> F[Tag HOT + assign specialist]
    F --> G[[handoffToHuman SLA<60s]]
    G --> H[Bridge message: specialist intro]
    H --> I{Specialist available?}
    I -->|Yes <60s| J[Live handoff in-thread]
    I -->|No| K[Promise callback window + capture slot]
    J --> L([Exit: hot lead with human])
    K --> L
    D -->|Reluctant to share| M[Offer value first: lookbook/private viewing]
    M --> E
```

**Key intents & utterances:** "10 lakh bridal budget", "50 gram gold bar", "private viewing", "Era Polki collection", "NRI delivery to Dubai", "speak to a senior consultant".

**WhatsApp UI:** **WhatsApp Flow** lead form (name, city, budget band, occasion, timeline, preferred contact), reply buttons (budget bands), **CTA URL** (premium lookbook), confirmation card with assigned specialist name + ETA.

**Guardrails:** progressive profiling — don't over-ask upfront; give value before capture; **60s routing SLA** for HOT leads; never lose context on handoff (pass full summary); store with consent; if after hours, capture callback slot honestly. Premium pieces referenced: `MD-NL-3304 Polki Bridal Necklace ₹6,90,000`, `MD-BR-3305 Diamond Tennis Bracelet ₹2,35,000`, `MI-GB-9904 Gold Bar 50g`.

---

## Cross-scenario routing map

```mermaid
flowchart LR
    M[Master Menu] --> S1[1 Discovery]
    M --> S2[2 Bridal]
    M --> S3[3 Investment]
    M --> S4[4 Concierge]
    M --> S5[5 Try-On]
    M --> S6[6 Store Visit]
    M --> S7[7 Support]
    M --> S8[8 Festival]
    M --> S9[9 Voice]
    S1 --> S5
    S1 --> S6
    S2 --> S10[10 HV Lead]
    S3 --> S10
    S4 --> S6
    S5 --> S6
    S9 --> S1
    S9 --> S3
    S8 --> S3
    S10 --> HH[[Human Specialist]]
    S2 --> HH
    S7 --> HH
```

Every scenario can fall through to **Store Visit (6)**, **High-Value Lead (10)**, or **Human Handoff** — guaranteeing the global "always a next step" rule.
