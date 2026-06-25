# Product Requirements Document — "Maya": WhatsApp AI Concierge for Malabar Gold & Diamonds

> **Document status:** v1.0 — Flagship deliverable
> **Author:** Product & Strategy (McKinsey × Luxury Retail Product)
> **Date:** 25 June 2026
> **Owners:** VP Digital Commerce · Head of CRM · Head of Retail · CTO
> **Reference:** Stays 100% consistent with `00-CANONICAL-BRIEF.md` (single source of truth).
>
> ⚠️ **All financial figures, ROI ranges, and rates in this document are illustrative demo placeholders** and must be labelled as such in any CEO-facing material. Gold rates follow Malabar's *"One India One Gold Rate"* (indicative demo rate, timestamped).

---

## 1. Executive Summary

### 1.1 The Opportunity
Malabar Gold & Diamonds operates **300+ showrooms across 13+ countries** with a brand built on **trust, transparency, BIS Hallmark purity and fair pricing**. Yet the customer journey between *intent* and *showroom footfall* — where bridal, diamond, investment and gifting decisions are actually made — is largely invisible, unowned, and unassisted. Customers research on Google and Instagram, message friends, and walk into stores cold. Malabar captures the transaction but not the **consideration journey** that precedes a ₹1L–₹10L decision.

**WhatsApp is where that journey already happens.** With **~90%+ open rates** (vs ~20% for email), near-universal penetration across India and the GCC, and native support for voice notes, images, video and rich media, it is the single highest-intent, highest-reach channel Malabar can own. Today it is used reactively (broadcast offers, basic support). The opportunity is to convert it into a **proactive, intelligent, multilingual luxury concierge** that guides, advises, reassures and converts — at the cost-to-serve of software, not staff.

### 1.2 The Vision
**"Maya"** — Malabar's AI Jewellery Concierge on WhatsApp. A verified WhatsApp Business agent (green tick, display name *"Malabar Gold & Diamonds"*) that behaves like Malabar's best showroom consultant: warm, courteous, knowledgeable, never pushy, multilingual (English, Hindi, Tamil, Telugu, Malayalam, Kannada + Hinglish), and available 24×7. Maya helps a bride design a *Brides of Malabar* trousseau, helps an NRI in Dubai gift his mother in Kerala, locks a gold rate for a Dhanteras investor via *Smart Buy Advance Purchase*, deflects 70% of routine support, and routes a ₹10L bridal lead to a human within **60 seconds** — always disclosing she's an AI and always one tap from a human expert.

Maya is not a chatbot. She is **the digital front door to 300+ showrooms**, a CRM-aware relationship that remembers the customer, and a measurable revenue and margin engine.

### 1.3 The Ask
Approve a **phased 6-month build** (MVP → scale) of the Maya WhatsApp concierge, covering 10 prioritized scenarios, on Malabar's existing brand, catalog, trust programs and store network. Target **illustrative** outcomes:

| Lever | Illustrative target |
|---|---|
| Lead-to-store conversion | **+15–25%** |
| Average order value (cross-sell) | **+8–12%** |
| Support cost reduction | **40–60%** |
| Lead response speed | **3–5× faster** (qualified lead → sales in **<60s**) |
| Repeat purchase (memory/CRM) | **+20%** |
| Cost-to-serve per support chat | **₹45–₹70 (human) → <₹3 (AI)** at ~70% deflection |

**Investment ask:** funding and cross-functional staffing for Phase 1 MVP (Months 1–2), with stage-gated go/no-go reviews into Phases 2 and 3.

---

## 2. Problem Statement & Market Context

### 2.1 The Indian & GCC Jewellery Buying Journey
Jewellery in India is not a transaction; it is an emotionally and financially loaded decision spanning weeks to months, with distinct journeys:

| Journey | Trigger | Ticket size | Decision dynamics | Pain today |
|---|---|---|---|---|
| **Gold (everyday/gifting)** | Birthdays, festivals, gifting | ₹50K–₹2L | Quick, trust- & price-driven | Price opacity fears; "is the rate fair?" |
| **Diamond** | Anniversary, proposal, self-purchase | ₹60K–₹2.5L | High research; 4C confusion; resale anxiety | Education gap; buyback uncertainty |
| **Bridal** | Wedding (often 3–6 months out) | ₹3L–₹15L+ | Multi-visit, family-driven, regional traditions | Overwhelming; coordination across family; fear of mistakes |
| **Wedding gifting** | Guest/relative gifting | ₹50K–₹3L | Time-pressed, deadline-bound | Decision fatigue; delivery timing |
| **Investment** | Akshaya Tritiya, Dhanteras, Muhurat | ₹30K–₹10L+ | Rate-sensitive, timing-sensitive | Rate volatility; "when to buy?"; purity trust |
| **Gifting (general)** | Newborn, birthday, festival | ₹50K–₹2L | Occasion-led, emotional | Inspiration & sizing; remote delivery (NRI) |

Across all of these, three behaviours dominate: **(a) heavy pre-visit research** (Google/Instagram/family), **(b) trust as the #1 purchase driver** (purity, fair price, buyback), and **(c) WhatsApp as the default communication medium** — customers already screenshot designs and forward them to family and to store staff.

### 2.2 Customer Behaviour Shifts
- **Mobile-first, chat-first.** Buyers expect to message a brand the way they message a friend — with photos, voice notes, and in their own language.
- **NRI & GCC demand.** A large diaspora (UAE, Saudi, Qatar, etc.) buys for family in India and expects remote shopping + insured delivery.
- **Regional & linguistic diversity.** South-Indian bridal (temple/*Divine*), Polki/*Era* heritage, Tamil/Telugu/Malayalam/Kannada speakers — a one-language web flow underserves them.
- **Always-on expectation.** Festival and muhurat windows create demand spikes that human teams cannot staff against affordably.

### 2.3 Why WhatsApp
- **Reach & engagement:** ~90%+ open rates vs ~20% email; near-universal install base in India & GCC.
- **Rich, intimate medium:** images, video, voice notes, location, catalogs, payments, list/reply buttons — ideal for jewellery's visual, consultative nature.
- **Verified trust:** green-tick *"Malabar Gold & Diamonds"* business profile carries the brand's trust into the chat.
- **Native to the journey:** customers already share designs and ask "is this nice?" on WhatsApp — Maya simply joins the conversation that's already happening.

### 2.4 Why Now
- **AI maturity:** LLMs now sustain warm, multilingual, context-aware luxury conversations with reliable product grounding (RAG over the catalog) and safe human handoff.
- **WhatsApp Business Platform maturity:** flows, catalogs, interactive messages and verified profiles are production-grade.
- **DPDP Act (India):** a clear consent framework now exists to build compliant, durable customer relationships.
- **Competitive whitespace:** no major jewellery retailer in the region has yet deployed a true AI concierge at this depth — first-mover advantage on the trust narrative.

**Net:** the channel, the technology, the regulation and the customer behaviour have converged. Maya is the right product at the right moment.

---

## 3. Goals & Non-Goals

### 3.1 Goals
1. **Own the consideration journey** on WhatsApp from discovery to store visit / purchase, in 6 languages + Hinglish.
2. **Convert intent to footfall & sales** — measurably lift lead-to-store conversion and AOV via cross-sell.
3. **Deflect routine support** at a fraction of human cost while preserving brand warmth.
4. **Route high-value leads instantly** to human experts (<60s SLA) — never let a ₹10L bridal lead go cold.
5. **Build durable, CRM-aware relationships** (memory) that drive repeat purchase.
6. **Reinforce trust** — every interaction surfaces BIS Hallmark, transparent pricing, buyback and *One India One Gold Rate*.
7. **Stay compliant** — AI disclosure, DPDP consent, WhatsApp policy, no misleading claims, no financial advice beyond product info.

### 3.2 Non-Goals (for this product)
- **Not** a replacement for showroom experts or the in-store experience — Maya *drives to* and *augments* them.
- **Not** a regulated financial advisor — investment scenarios surface product info and rate mechanics only, never personalised financial advice.
- **Not** a public, ungrounded chatbot — Maya answers from Malabar's catalog, policies and CRM; she does not free-associate about pricing or purity.
- **Not** an autonomous discounting engine — Maya never invents prices, offers, or making-charge waivers.
- **Not** a new e-commerce checkout platform — payments/checkout use existing Malabar/WhatsApp rails; Maya orchestrates, it does not rebuild.

---

## 4. Target Users & Personas

Personas are drawn directly from the canonical brief and map to the 10 scenarios.

| Persona | Profile | Need | Primary scenario(s) | Sub-brands |
|---|---|---|---|---|
| **Aarthi** | Chennai, 28 | Anniversary gift for wife, ₹1L budget | Product Discovery (1), Concierge (4) | *Mine* (MD-PD-3302) |
| **Rahul** | Bengaluru, 31 | Diamond ring for proposal | Product Discovery (1), Try-On (5), Lead Gen (10) | *Mine* (MD-RG-3301) |
| **Lakshmi & family** | Hyderabad, December wedding, ₹10L | Full bridal trousseau | Bridal Consultant (2), Store Conversion (6), Lead Gen (10) | *Brides of Malabar*, *Divine*, *Era* |
| **Mr. Menon** | Kochi, 52 | Gold investment, Akshaya Tritiya | Investment Advisor (3), Festival (8) | Coins/Bars (MI-GC/GB) |
| **Priya** | Mumbai, 34 | Self-purchase, daily diamonds | Product Discovery (1), Concierge (4) | *Viraaz* (MD-ER-3303) |
| **Suresh** | NRI, Dubai | Gift for mother in Kerala, remote + delivery | Concierge (4), Support (7) | *Ethnix*, *Divine* |
| **Divya** | Coimbatore | Tamil bridal, temple jewellery | Voice AI / Multilingual (9), Bridal (2) | *Divine* (MG-NL-2201) |

**Secondary users:** Malabar **store sales experts & bridal consultants** (receive qualified leads, briefs, appointment context), **CRM/marketing team** (campaign orchestration, opt-in management), **support team** (handoff for the ~30% Maya escalates).

---

## 5. Success Metrics / KPIs / North Star

> All figures **illustrative** for demo purposes.

### 5.1 North Star Metric
**Assisted Revenue per 1,000 WhatsApp Conversations** — the blended value of in-store visits, reservations, and direct purchases attributable to Maya-assisted journeys. It captures the core thesis: conversations → conversions.

### 5.2 KPI Tree

| Layer | Metric | Illustrative target | Source mechanic |
|---|---|---|---|
| **Conversion** | Lead-to-store conversion | **+15–25%** | Guided discovery, appointment booking, reminders |
| **Conversion** | Qualified lead → sales response | **<60s** (3–5× faster) | Auto-routing of high-value leads |
| **Monetization** | AOV uplift via cross-sell | **+8–12%** | "Complete the look", set recommendations |
| **Retention** | Repeat purchase rate | **+20%** | CRM memory, occasion reminders, milestones |
| **Efficiency** | Support cost reduction | **40–60%** | ~70% deflection of routine queries |
| **Efficiency** | Cost-to-serve per support chat | **₹45–₹70 → <₹3** | AI deflection vs human handling |
| **Engagement** | Message open rate | **~90%+** | WhatsApp channel |
| **Engagement** | Conversation → meaningful action | **≥35%** (target) | Discovery, reserve, book, buy |
| **Trust/Quality** | Human-handoff CSAT | **≥4.5/5** | Warm, accurate handoffs |
| **Compliance** | Consent capture rate | **100% before marketing** | DPDP opt-in flow |

### 5.3 Operational / Quality Metrics
- **Containment rate** (resolved without human): target ≥70% for support intents.
- **Grounded-answer accuracy** (price/purity/policy correctness): ≥99% (zero tolerance for misleading purity/price claims).
- **Latency:** P50 < 2s, P95 < 5s for text responses.
- **Language coverage success:** ≥95% correct language detection & response across the 6 languages + Hinglish.

---

## 6. Detailed Feature Requirements (10 Scenarios)

> Legend — **Complexity:** Low / Med / High · **Priority:** P0 (MVP, must-have) / P1 (fast-follow) / P2 (later). ROI figures **illustrative**.

---

### 6.1 Scenario 1 — Product Discovery Assistant

**Description:** Conversational, multilingual product discovery across Malabar's catalog and sub-brands. Maya understands intent ("anniversary gift under ₹1L", "office diamonds", "temple haram for bridal"), asks smart clarifying questions (budget, occasion, recipient, metal/stone, style), and returns curated, image-rich recommendations grounded in canonical SKUs with transparent pricing and trust badges (BIS Hallmark, buyback).

**User stories**
- *As Aarthi*, I want to describe an anniversary gift and budget so Maya shows me 2–3 perfect options (e.g., **MD-PD-3302 Diamond Pendant Set, ₹1,46,000** vs an under-₹1L alternative) without scrolling a website.
- *As Priya*, I want daily-wear *Viraaz* diamond studs (**MD-ER-3303, ₹64,000**) suggested for self-purchase.
- *As a customer*, I want to send a photo/screenshot of a style I like and get the closest Malabar match.

**Functional requirements**
- Intent + slot extraction (occasion, budget, recipient, metal, stone, sub-brand, region).
- RAG over canonical catalog; never invent SKUs/prices; show price, weight, purity, sub-brand, trust badges.
- Image-in (style match) and image-out (carousel of options) via WhatsApp media/catalog messages.
- Always-on next step: *Reserve · See more · Try-on · Book a visit*.
- Budget-aware: respect stated budget; offer one "stretch" and one "value" option transparently.

| Dimension | Detail |
|---|---|
| **Customer Value** | Effortless, personalised discovery in own language; no website hunting; transparent pricing builds trust |
| **Business Value** | Top-of-funnel capture; cross-sell entry point; feeds CRM with preferences |
| **Expected ROI** *(illustrative)* | Anchors **+15–25%** lead-to-store conversion; entry to **+8–12%** AOV |
| **Complexity** | Med |
| **Priority** | **P0** |

---

### 6.2 Scenario 2 — Bridal Jewellery Consultant

**Description:** A guided, multi-session bridal journey under **Brides of Malabar**, blending **Divine** (temple/antique), **Era** (Polki/uncut) and gold sets. Maya builds a budget-aware trousseau plan (necklace/haram, bangles, earrings, mangalsutra), respects regional traditions (South-Indian temple, Tamil/Telugu styles), coordinates family input, and routes to a **private bridal consultation** with a bridal suite store.

**User stories**
- *As Lakshmi's family*, we want a ₹10L December-wedding trousseau plan combining a **Lakshmi Temple Haram (MG-NL-2201, ₹3,85,000)**, **Antique Lakshmi Bangles (MG-BG-2203, ₹4,46,000)** and a **Polki Era necklace (MD-NL-3304, ₹6,90,000)** — with options to fit budget.
- *As Divya*, I want Tamil-language temple-jewellery guidance (*Divine*).
- *As a bride*, I want to save my plan and share it with my mother on WhatsApp.

**Functional requirements**
- Multi-turn, multi-session memory of the bridal brief (date, budget, region, tradition, pieces chosen).
- Budget allocation engine across categories; show running total vs budget.
- Regional/tradition awareness (temple vs Polki vs contemporary).
- Shareable plan summary; family-collaboration friendly.
- High-value → bridal-suite store + private consultation booking; warm human handoff with full brief.

| Dimension | Detail |
|---|---|
| **Customer Value** | Turns an overwhelming process into a guided, reassuring plan; respects tradition & budget |
| **Business Value** | Highest-ticket journeys (₹3L–₹15L+); deepest cross-sell; captures full trousseau, not one piece |
| **Expected ROI** *(illustrative)* | Drives premium AOV and **<60s** routing of ₹10L leads; strong contributor to conversion uplift |
| **Complexity** | High |
| **Priority** | **P0** |

---

### 6.3 Scenario 3 — Gold Investment Advisor

**Description:** Helps investment-minded customers (e.g., Mr. Menon, Akshaya Tritiya) understand gold/silver coin & bar options, the **indicative live rate** (*One India One Gold Rate*: 22K ₹7,150/g · 24K ₹7,800/g · Silver ₹95/g, timestamped), and Malabar's rate-protection mechanics — **Smart Buy Advance Purchase** (book today's rate, take delivery later at the *lower* of booked vs prevailing) and **Smart Saver 11+1** monthly plan. **Product info & mechanics only — no personalised financial advice.**

**User stories**
- *As Mr. Menon*, I want to know today's 24K rate and lock it for an Akshaya Tritiya purchase via Smart Buy.
- *As an investor*, I want to compare a **10g Gold Bar (MI-GB-9903)** vs **8g Coin (MI-GC-9902)** and understand purity (999.9, BIS Hallmark) and buyback.
- *As a saver*, I want to start a **Smart Saver 11+1** plan.

**Functional requirements**
- Surface timestamped indicative rate with clear "indicative demo rate" labelling.
- Explain Smart Buy & Smart Saver mechanics factually; never imply guaranteed returns or give buy/sell timing advice.
- Coin/bar catalog (MI-GC/GB/SC) with premium-over-rate logic (e.g., 1g coin = live rate + 3%).
- Compliance guardrail: hard refusal to give financial advice; offer human/store expert for plan enrolment.
- CTA: reserve, enrol in scheme, or book a store visit.

| Dimension | Detail |
|---|---|
| **Customer Value** | Clarity on rate, purity, buyback and rate-protection — confidence to act at the right muhurat |
| **Business Value** | Captures festival investment demand; drives scheme enrolment (recurring relationship) |
| **Expected ROI** *(illustrative)* | Festival-window conversion; scheme sign-ups seed **+20%** repeat purchase |
| **Complexity** | Med |
| **Priority** | **P0** |

---

### 6.4 Scenario 4 — Personal Shopping Concierge

**Description:** A persistent, CRM-aware personal shopper. Maya remembers past purchases, preferences, sizes, occasions and family relationships; proactively assists with gifting (including NRI remote purchase + insured delivery for Suresh), curates "for you" picks, and offers video shopping / try-at-home where available.

**User stories**
- *As Suresh (NRI, Dubai)*, I want to buy an *Ethnix* / *Divine* piece for my mother in Kerala and have it delivered insured, paying remotely.
- *As Priya*, I want Maya to remember I like *Viraaz* and suggest pieces for my birthday.
- *As a returning customer*, I want Maya to greet me by name with relevant picks.

**Functional requirements**
- CRM integration: profile, purchase history, preferences, occasions; consented memory.
- Proactive (opt-in) nudges: occasion reminders, milestone gifting, restock of complementary pieces.
- NRI flow: remote purchase, insured shipping, delivery-to-different-recipient, currency/context awareness.
- Surface services: free insured shipping, try-at-home (select cities), video shopping / personal shopper, EMI.
- Cross-sell "complete the look" tied to history.

| Dimension | Detail |
|---|---|
| **Customer Value** | Feels personally known; effortless gifting and remote buying; white-glove service |
| **Business Value** | Drives repeat purchase & AOV; unlocks NRI/GCC revenue; deepens LTV |
| **Expected ROI** *(illustrative)* | Core driver of **+20%** repeat purchase and **+8–12%** AOV |
| **Complexity** | High (CRM dependency) |
| **Priority** | **P1** |

---

### 6.5 Scenario 5 — Virtual Try-On

**Description:** Lets customers visualise jewellery on themselves before visiting. Customer sends a selfie (or uses a provided face/hand template); Maya returns a try-on visualisation for eligible categories (earrings, necklaces, rings, bangles) — e.g., Rahul previewing **MD-RG-3301** on a hand. Sets expectations honestly that final fit/look is confirmed in-store.

**User stories**
- *As Rahul*, I want to preview the proposal ring (**MD-RG-3301**) before booking a visit.
- *As a customer*, I want to see how **Jhumka earrings (MG-ER-2205)** look on me.

**Functional requirements**
- Image upload → AR/AI try-on render for supported categories; clear "indicative visualisation" disclaimer.
- Privacy: selfies processed with consent, retention-minimised, not used for marketing without opt-in.
- Graceful fallback to model/lifestyle imagery where try-on unsupported.
- CTA from try-on → reserve / book a visit.

| Dimension | Detail |
|---|---|
| **Customer Value** | Confidence and delight before committing; reduces "will it suit me?" friction |
| **Business Value** | Differentiation; higher discovery→visit conversion; shareable/viral moments |
| **Expected ROI** *(illustrative)* | Incremental lift to conversion; brand-tech halo |
| **Complexity** | High |
| **Priority** | **P2** |

---

### 6.6 Scenario 6 — Store Visit Conversion

**Description:** Converts online consideration into booked, prepared store visits. Maya recommends the nearest/right store (bridal suite for bridal), books an appointment, reserves specific SKUs to view, sends location + hours + languages spoken, and shares a **pre-visit brief** with the store expert so the customer is recognised and served fast.

**User stories**
- *As Lakshmi's family*, we want a private bridal consultation booked at **Hyderabad – Kukatpally** with our shortlisted pieces reserved.
- *As Aarthi*, I want to book **Chennai – T. Nagar** and have the pendant ready to view.
- *As a customer*, I want a reminder and easy reschedule.

**Functional requirements**
- Store directory (8 demo stores) with address, hours (10:30–20:30), languages, bridal-suite flag.
- Appointment booking + calendar integration; SKU reservation; reminders & reschedule.
- Pre-visit brief to store/CRM: customer name, language, shortlist, budget, occasion.
- Bridal routing → bridal-suite-enabled stores only.

| Dimension | Detail |
|---|---|
| **Customer Value** | Frictionless, prepared visit; no repeating yourself; right store, right language |
| **Business Value** | Directly lifts footfall→sale; arms store staff with context; reduces no-shows |
| **Expected ROI** *(illustrative)* | Primary engine of **+15–25%** lead-to-store conversion |
| **Complexity** | Med |
| **Priority** | **P0** |

---

### 6.7 Scenario 7 — Customer Support Automation

**Description:** Deflects routine, high-volume support: order status, store hours/location, BIS Hallmark & purity explainer, transparent price-tag explainer, buyback/exchange policy, lifetime free maintenance, EMI, shipping, returns. Resolves ~70% autonomously; escalates the rest with full context.

**User stories**
- *As a customer*, I want my order/delivery status instantly.
- *As a buyer*, I want to understand buyback & exchange on gold and diamonds.
- *As Suresh*, I want shipping & insurance details for an NRI delivery.

**Functional requirements**
- Grounded FAQ/policy RAG (services list: BIS Hallmark, price tag, maintenance, buyback, exchange, shipping, try-at-home, video shopping, EMI, appointments).
- Order/status lookup via integration; secure identity check.
- Confidence-gated handoff: escalate when uncertain or on request; pass transcript + context.
- Strict accuracy on purity/price/policy (no misleading claims).

| Dimension | Detail |
|---|---|
| **Customer Value** | Instant 24×7 answers in own language; no queues |
| **Business Value** | **40–60%** support-cost reduction; frees staff for high-value selling |
| **Expected ROI** *(illustrative)* | Cost-to-serve **₹45–₹70 → <₹3** at ~70% deflection |
| **Complexity** | Low–Med |
| **Priority** | **P0** |

---

### 6.8 Scenario 8 — Festival Campaigns

**Description:** Orchestrates opt-in, personalised campaigns for **Akshaya Tritiya, Dhanteras, Diwali, wedding season, Onam/Pongal** etc. Segmented broadcasts (WhatsApp template messages) that open into full Maya conversations — e.g., Dhanteras **Silver Lakshmi-Ganesha coin (MI-SC-9905, ₹1,150)** or Akshaya Tritiya gold-coin offers — with rate, muhurat info and reserve/buy CTAs.

**User stories**
- *As Mr. Menon*, I want a timely Akshaya Tritiya nudge with today's rate and a reserve option.
- *As a gifter*, I want Dhanteras silver-coin suggestions.
- *As marketing*, I want to segment by persona/history and measure conversion.

**Functional requirements**
- DPDP-compliant opt-in; WhatsApp-approved template messages; segmentation by CRM attributes.
- Campaign → live Maya conversation handoff (not dead-end blasts).
- Festival content packs (gold/silver coins, *Ethnix* festive, *Divine*); rate + muhurat surfacing.
- Per-campaign analytics: delivered, opened, engaged, reserved, converted.
- Frequency caps & easy opt-out to protect trust.

| Dimension | Detail |
|---|---|
| **Customer Value** | Timely, relevant, non-spammy festival offers in own language |
| **Business Value** | Monetises peak windows; reactivates dormant customers; ~90%+ open rate |
| **Expected ROI** *(illustrative)* | High-ROI peak-window revenue; reactivation; feeds repeat-purchase lift |
| **Complexity** | Med |
| **Priority** | **P1** |

---

### 6.9 Scenario 9 — Voice AI Multilingual

**Description:** Accepts and responds to **WhatsApp voice notes** in all six languages (English, Hindi, Tamil, Telugu, Malayalam, Kannada) + Hinglish — critical for less text-comfortable and regional customers (e.g., Divya speaking Tamil about temple jewellery). Speech-to-text → intent → response (text and/or voice note).

**User stories**
- *As Divya*, I want to send a Tamil voice note about temple jewellery and get a helpful reply.
- *As an older investor*, I want to speak rather than type my gold query.

**Functional requirements**
- ASR for all 6 languages + code-mixed Hinglish; robust to accents/noise.
- Language auto-detect; respond in the customer's language; optional voice-note replies.
- Same grounded logic as text (no accuracy regression by modality).
- Graceful fallback ("I didn't catch that — could you repeat or type?").

| Dimension | Detail |
|---|---|
| **Customer Value** | Inclusive, natural, accessible — especially for regional & older customers |
| **Business Value** | Expands addressable audience; differentiator; deepens regional bridal (high-ticket) reach |
| **Expected ROI** *(illustrative)* | Widens funnel; supports conversion uplift in regional markets |
| **Complexity** | High |
| **Priority** | **P2** |

---

### 6.10 Scenario 10 — High-Value Lead Generation

**Description:** Detects and routes high-value leads (bridal ₹3L+, investment ₹5L+, HNI, proposal/milestone) to the right human expert within **60 seconds**, with a full brief. Never lets a Rahul (proposal) or Lakshmi (₹10L bridal) lead go cold.

**User stories**
- *As Lakshmi's family*, our ₹10L bridal enquiry reaches a bridal expert within 60s.
- *As Rahul*, my proposal-ring interest is fast-tracked to a diamond specialist.
- *As a sales manager*, I want qualified leads with context, not raw chats.

**Functional requirements**
- Lead scoring (ticket size, intent strength, persona, urgency, occasion date).
- Routing rules → right expert/store/queue by category & geography; **<60s SLA**, escalation if unmet.
- Auto-generated lead brief: budget, shortlist, language, timeline, transcript summary.
- CRM logging; feedback loop to improve scoring.

| Dimension | Detail |
|---|---|
| **Customer Value** | Premium, instant, human attention exactly when stakes are highest |
| **Business Value** | Protects highest-margin revenue; **3–5× faster** response; higher close rates |
| **Expected ROI** *(illustrative)* | Direct lever on conversion & AOV; safeguards ₹L-scale tickets |
| **Complexity** | Med |
| **Priority** | **P0** |

---

## 7. Consolidated Feature Prioritization Matrix

### 7.1 MoSCoW × Phasing

| # | Scenario | Priority | Complexity | MoSCoW | Phase |
|---|---|---|---|---|---|
| 1 | Product Discovery Assistant | P0 | Med | **Must** | 1 (MVP) |
| 2 | Bridal Jewellery Consultant | P0 | High | **Must** | 1 (MVP) |
| 3 | Gold Investment Advisor | P0 | Med | **Must** | 1 (MVP) |
| 6 | Store Visit Conversion | P0 | Med | **Must** | 1 (MVP) |
| 7 | Customer Support Automation | P0 | Low–Med | **Must** | 1 (MVP) |
| 10 | High-Value Lead Generation | P0 | Med | **Must** | 1 (MVP) |
| 4 | Personal Shopping Concierge | P1 | High | **Should** | 2 |
| 8 | Festival Campaigns | P1 | Med | **Should** | 2 |
| 5 | Virtual Try-On | P2 | High | **Could** | 3 |
| 9 | Voice AI Multilingual | P2 | High | **Could** | 3 |

### 7.2 RICE-style View (illustrative scoring; Reach 1–5, Impact 1–5, Confidence %, Effort 1–5)

| Scenario | Reach | Impact | Confidence | Effort | RICE-ish (R×I×C/E) | Rank |
|---|---|---|---|---|---|---|
| 7 Support Automation | 5 | 4 | 90% | 2 | **9.0** | 1 |
| 1 Product Discovery | 5 | 4 | 85% | 3 | **5.7** | 2 |
| 6 Store Visit Conversion | 4 | 5 | 85% | 3 | **5.7** | 2 |
| 10 High-Value Lead Gen | 3 | 5 | 85% | 2 | **6.4** | — high |
| 3 Investment Advisor | 3 | 4 | 80% | 3 | **3.2** | 5 |
| 2 Bridal Consultant | 3 | 5 | 75% | 5 | **2.3** | 6 |
| 8 Festival Campaigns | 5 | 3 | 80% | 3 | **4.0** | 4 |
| 4 Personal Concierge | 4 | 4 | 70% | 5 | **2.2** | 7 |
| 9 Voice AI | 4 | 3 | 65% | 5 | **1.6** | 8 |
| 5 Virtual Try-On | 3 | 3 | 60% | 5 | **1.1** | 9 |

> Note: Bridal (2) scores lower on pure RICE due to effort, but is a **strategic Must (P0)** — it owns Malabar's highest-ticket, highest-margin journey and the *Brides of Malabar* brand. Strategic weighting overrides raw RICE here.

---

## 8. Non-Functional Requirements

| Category | Requirement |
|---|---|
| **Latency** | Text P50 < 2s, P95 < 5s; voice/try-on async with "working on it" acknowledgement |
| **Scale** | Handle festival spikes (Akshaya Tritiya/Dhanteras) — design for 10–20× baseline concurrency; auto-scaling; queueing for media tasks |
| **Availability** | 99.9% uptime target for the conversational core; graceful degradation (catalog/support stay up if try-on/voice degrade) |
| **Languages** | English, Hindi, Tamil, Telugu, Malayalam, Kannada + Hinglish; auto-detect; no accuracy regression across languages or modalities |
| **Accuracy / Grounding** | All price, purity, weight, policy and rate answers grounded in canonical catalog/policy data; **zero tolerance** for misleading purity/price claims; no invented SKUs/offers |
| **Security & Privacy** | Encryption in transit & at rest; PII minimisation; selfie/voice data retention-minimised; role-based access; audit logs |
| **DPDP Consent (India)** | Explicit opt-in before marketing/proactive messages; purpose limitation; easy withdrawal/opt-out; consent records; data-principal rights honoured |
| **WhatsApp Policy Compliance** | Verified business profile (green tick), approved message templates, 24-hour customer-care window rules, opt-in for broadcasts, quality-rating protection (frequency caps) |
| **AI Disclosure** | Maya always discloses she is an AI assistant and offers human/store-expert handoff at any time |
| **Compliance Guardrails** | No financial advice beyond product info/mechanics for investment; BIS Hallmark claims accurate; transparent pricing surfaced |
| **Observability** | Conversation analytics, containment/deflection dashboards, lead-routing SLA monitoring, language-detection accuracy, model quality eval harness |
| **Human-in-the-loop** | Seamless handoff with full context; agents can take over any conversation; escalation on low confidence or sensitive topics |

---

## 9. Phased Rollout Roadmap (6 Months)

### Phase 1 — MVP (Months 1–2): *"Trusted, grounded, converting"*
**Ships:** Verified WhatsApp profile (green tick, *"Malabar Gold & Diamonds"*) · Maya persona & tone · grounded catalog (all canonical SKUs) · **(1) Product Discovery**, **(2) Bridal Consultant**, **(3) Investment Advisor**, **(6) Store Visit Conversion**, **(7) Support Automation**, **(10) High-Value Lead Gen** · 3 launch languages (English, Hindi, + one regional, e.g., Tamil) · DPDP consent flow · AI disclosure · human handoff · core analytics.
**Goal:** Prove containment (≥70% support), conversion lift, and <60s lead routing on a controlled store set (e.g., Chennai, Hyderabad, Kochi, Kozhikode). **Stage gate → Phase 2.**

### Phase 2 — Scale & Personalize (Months 3–4): *"Known, proactive, festive"*
**Ships:** **(4) Personal Shopping Concierge** (CRM memory, NRI/GCC remote purchase + insured delivery) · **(8) Festival Campaigns** (opt-in segmented templates → live Maya) · full 6-language text coverage + Hinglish · all 8 demo stores incl. Dubai · *Smart Saver 11+1* & *Smart Buy* enrolment flows · expanded analytics (AOV, repeat-purchase, campaign ROI).
**Goal:** Drive AOV (+8–12%), repeat purchase (+20%), and peak-window revenue. **Stage gate → Phase 3.**

### Phase 3 — Differentiate (Months 5–6): *"Inclusive, immersive, flagship"*
**Ships:** **(9) Voice AI Multilingual** (voice notes, all 6 languages + Hinglish) · **(5) Virtual Try-On** (AR/AI for eligible categories) · advanced proactive concierge (milestone/occasion intelligence) · GCC market deepening · optimization from Phases 1–2 learnings.
**Goal:** Inclusivity, differentiation, and brand-tech leadership; full 10-scenario coverage.

---

## 10. Risks & Mitigations

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| 1 | **Misleading purity/price claim** (brand-trust damage) | Low | High | Strict RAG grounding; no invented prices/SKUs; eval harness; legal review of claim templates; "indicative rate" labelling |
| 2 | **Inadvertent financial advice** (investment) | Med | High | Hard guardrail: product info/mechanics only; refusal + human handoff for advice; compliance-reviewed scripts |
| 3 | **DPDP / consent non-compliance** | Med | High | Explicit opt-in before marketing; consent records; easy opt-out; purpose limitation; DPO review |
| 4 | **WhatsApp policy breach / quality-rating drop** | Med | High | Approved templates; frequency caps; respect 24h window; opt-in broadcasts; monitor quality rating |
| 5 | **AI errors / hallucination in 6 languages** | Med | Med | Grounded answers; confidence-gated handoff; per-language eval; "I'll connect a human" fallback |
| 6 | **Cold high-value lead (SLA miss)** | Med | High | <60s routing + escalation; alerting on SLA breach; on-call expert coverage during peaks |
| 7 | **Festival-spike overload** | Med | Med | Auto-scaling; queueing for media; load testing pre-Akshaya Tritiya/Dhanteras |
| 8 | **Over-automation / loss of warmth** | Med | Med | Luxury-consultant tone guidelines; always offer human; never pushy; CSAT monitoring |
| 9 | **Privacy concern on selfies/voice (try-on/voice AI)** | Med | Med | Consent-gated; retention-minimised; not used for marketing without opt-in; clear disclaimers |
| 10 | **CRM data gaps undermine personalization** | Med | Med | Phase concierge after CRM integration validated; graceful degradation when data missing |
| 11 | **Store-staff adoption friction** | Med | Med | Pre-visit briefs that visibly help staff; training; feedback loop; start with champion stores |

---

## 11. Out-of-Scope / Future

**Explicitly out of scope for this build:**
- Full standalone e-commerce checkout rebuild (Maya orchestrates existing payment/checkout rails).
- Autonomous discounting / making-charge negotiation by AI.
- Personalised financial/investment advisory (regulated activity).
- Channels beyond WhatsApp (Instagram DM, web chat, in-store kiosk) — candidates for later.

**Future / backlog candidates:**
- **Omnichannel Maya** — unify WhatsApp, Instagram, web, and in-store clienteling under one memory.
- **In-store companion** — store experts use Maya's brief + live catalog/AR during consultations.
- **Advanced AR/3D** — high-fidelity try-on, 360° product views, virtual showroom.
- **Predictive occasion intelligence** — anniversary/festival/wedding-season anticipation at scale.
- **Resale & buyback marketplace** assistant (transparent valuation via DGRP-style mechanics).
- **GCC-specific expansion** — Arabic language, region-specific collections and delivery.
- **Loyalty & scheme deepening** — Smart Saver lifecycle nudges, tiered clienteling.
- **Voice calling agent** — beyond voice notes to real-time voice calls.

---

*End of PRD v1.0. All figures illustrative for demo purposes. Consistent with `00-CANONICAL-BRIEF.md`.*
