/*
 * Canonical demo data for the backend services (mirrors js/data/* used by the browser demo).
 * Prices are ILLUSTRATIVE. See docs/00-CANONICAL-BRIEF.md.
 */
const RATE = { gold22: 7150, gold24: 7800, silver: 95, asOf: '25 Jun 2026, 10:30 IST', basis: 'One India One Gold Rate (indicative demo rate)' };

const PRODUCTS = [
  { id:'MG-NL-2201', name:'Lakshmi Temple Haram', brand:'Divine', cat:'gold', sub:'necklace', metal:'22K Gold', weight:'48.2g', price:385000, style:['traditional','temple','bridal','south-indian'], occasion:['wedding','bridal'], region:['south','tamil','telugu','kerala'], gender:'women', desc:'Temple-motif haram with Goddess Lakshmi — a South-Indian bridal heirloom.' },
  { id:'MG-NL-2202', name:'Kasumalai Coin Necklace', brand:'Divine', cat:'gold', sub:'necklace', metal:'22K Gold', weight:'32.5g', price:258000, style:['traditional','temple','bridal'], occasion:['wedding','bridal','festival'], region:['tamil','telugu','south'], gender:'women', desc:'Classic Lakshmi-coin Kasumalai for Tamil & Telugu bridal trousseaus.' },
  { id:'MG-BG-2203', name:'Antique Lakshmi Bangles (pair)', brand:'Divine', cat:'gold', sub:'bangle', metal:'22K Gold', weight:'56g', price:446000, style:['traditional','antique','bridal'], occasion:['wedding','bridal'], region:['south'], gender:'women', desc:'Antique-finish broad bangles with temple work.' },
  { id:'MG-NL-2204', name:'Daily-wear Gold Chain (20")', brand:'Malabar', cat:'gold', sub:'chain', metal:'22K Gold', weight:'12g', price:96500, style:['minimal','everyday'], occasion:['gifting','everyday','birthday'], region:['all'], gender:'unisex', desc:'Lightweight 20-inch chain — versatile everyday gift under ₹1L.' },
  { id:'MG-ER-2205', name:'Jhumka Earrings', brand:'Ethnix', cat:'gold', sub:'earring', metal:'22K Gold', weight:'9.4g', price:78000, style:['ethnic','designer','festive'], occasion:['festival','gifting','wedding'], region:['all'], gender:'women', desc:'Handcrafted Ethnix jhumkas with pearl drops.' },
  { id:'MG-MG-2206', name:"Men's Royal Kada", brand:'Mehrab', cat:'gold', sub:'kada', metal:'22K Gold', weight:'22g', price:172000, style:['contemporary','bold'], occasion:['gifting','wedding'], region:['all'], gender:'men', desc:'Polished kada from the Mehrab men’s line.' },
  { id:'MG-ST-2207', name:'Baby Bangles (Starlet, pair)', brand:'Starlet', cat:'gold', sub:'bangle', metal:'22K Gold', weight:'6g', price:52000, style:['cute','traditional'], occasion:['gifting','newborn','birthday'], region:['all'], gender:'kids', desc:'Smooth-edge baby bangles — classic newborn gift.' },
  { id:'MD-RG-3301', name:'Solitaire-look Diamond Ring', brand:'Mine', cat:'diamond', sub:'ring', metal:'18K Gold', weight:'0.45ct SI/GH', price:118000, style:['modern','solitaire','elegant'], occasion:['anniversary','proposal','gifting'], region:['all'], gender:'women', desc:'Halo setting that wears like a solitaire.' },
  { id:'MD-PD-3302', name:'Diamond Pendant Set', brand:'Mine', cat:'diamond', sub:'pendant', metal:'18K Gold', weight:'0.62ct', price:146000, style:['modern','elegant'], occasion:['anniversary','gifting','birthday'], region:['all'], gender:'women', desc:'Pendant + matching studs, just under ₹1.5L.' },
  { id:'MD-ER-3303', name:'Diamond Studs', brand:'Viraaz', cat:'diamond', sub:'studs', metal:'18K Gold', weight:'0.30ct', price:64000, style:['minimal','everyday','office'], occasion:['everyday','gifting','self'], region:['all'], gender:'women', desc:'Everyday diamond studs from Viraaz.' },
  { id:'MD-NL-3304', name:'Polki Bridal Necklace', brand:'Era', cat:'diamond', sub:'necklace', metal:'18K + Uncut Diamonds', weight:'Statement', price:690000, style:['heritage','polki','bridal','statement'], occasion:['wedding','bridal'], region:['north','all'], gender:'women', desc:'Uncut-diamond Polki statement piece from Era.' },
  { id:'MD-BR-3305', name:'Diamond Tennis Bracelet', brand:'Mine', cat:'diamond', sub:'bracelet', metal:'18K Gold', weight:'1.10ct', price:235000, style:['modern','luxe'], occasion:['anniversary','milestone','gifting'], region:['all'], gender:'women', desc:'A line of brilliant diamonds — milestone gift.' },
  { id:'MP-RG-3401', name:'Emerald & Diamond Ring', brand:'Precia', cat:'gemstone', sub:'ring', metal:'18K Gold', weight:'Emerald', price:89000, style:['colour','elegant'], occasion:['gifting','birthday','anniversary'], region:['all'], gender:'women', desc:'Vivid emerald framed in diamonds — May birthstone.' },
  { id:'MP-PD-3402', name:'Ruby Pendant', brand:'Precia', cat:'gemstone', sub:'pendant', metal:'18K Gold', weight:'Ruby', price:72000, style:['colour','elegant'], occasion:['gifting','birthday'], region:['all'], gender:'women', desc:'Glowing ruby pendant — July birthstone.' },
  { id:'MI-GC-9901', name:'Gold Coin 1g (999.9)', brand:'Malabar', cat:'invest', sub:'coin', metal:'24K 999.9', weight:'1g', price:7800, style:['investment'], occasion:['akshaya-tritiya','dhanteras','gifting','investment'], region:['all'], gender:'unisex', desc:'BIS-hallmarked 1g coin — auspicious starter buy.' },
  { id:'MI-GC-9902', name:'Gold Coin 8g (999.9)', brand:'Malabar', cat:'invest', sub:'coin', metal:'24K 999.9', weight:'8g', price:62400, style:['investment'], occasion:['muhurat','gifting','investment'], region:['all'], gender:'unisex', desc:'8g coin — popular muhurat denomination.' },
  { id:'MI-GB-9903', name:'Gold Bar 10g (999.9)', brand:'Malabar', cat:'invest', sub:'bar', metal:'24K 999.9', weight:'10g', price:78000, style:['investment'], occasion:['investment','dhanteras'], region:['all'], gender:'unisex', desc:'Assay-certified 10g bar.' },
  { id:'MI-GB-9904', name:'Gold Bar 50g (999.9)', brand:'Malabar', cat:'invest', sub:'bar', metal:'24K 999.9', weight:'50g', price:390000, style:['investment'], occasion:['investment'], region:['all'], gender:'unisex', desc:'50g investment bar, buyback-protected.' },
  { id:'MI-SC-9905', name:'Silver Lakshmi-Ganesha Coin 10g', brand:'Malabar', cat:'invest', sub:'silver', metal:'Silver', weight:'10g', price:1150, style:['investment','festive'], occasion:['dhanteras','diwali','gifting'], region:['all'], gender:'unisex', desc:'Embossed silver coin — Dhanteras gift.' },
];

const STORES = [
  { id:'CCJ', city:'Kozhikode', name:'Malabar Gold — Mavoor Road (Flagship)', area:'Mavoor Road, Kozhikode', hours:'10:30–20:30', langs:['Malayalam','English','Hindi','Tamil'], bridalSuite:true },
  { id:'MAA', city:'Chennai', name:'Malabar Gold — T. Nagar', area:'Usman Road, T. Nagar, Chennai', hours:'10:30–20:30', langs:['Tamil','English','Telugu','Hindi'], bridalSuite:true },
  { id:'HYD', city:'Hyderabad', name:'Malabar Gold — Kukatpally', area:'KPHB, Kukatpally, Hyderabad', hours:'10:30–20:30', langs:['Telugu','Hindi','English'], bridalSuite:true },
  { id:'BLR', city:'Bengaluru', name:'Malabar Gold — Jayanagar', area:'4th Block, Jayanagar, Bengaluru', hours:'10:30–20:30', langs:['Kannada','English','Tamil','Hindi'], bridalSuite:true },
  { id:'BOM', city:'Mumbai', name:'Malabar Gold — Borivali', area:'S.V. Road, Borivali West, Mumbai', hours:'10:30–20:30', langs:['Hindi','Marathi','English','Gujarati'], bridalSuite:false },
  { id:'COK', city:'Kochi', name:'Malabar Gold — M.G. Road', area:'M.G. Road, Ernakulam, Kochi', hours:'10:30–20:30', langs:['Malayalam','English','Hindi'], bridalSuite:true },
  { id:'DEL', city:'Delhi', name:'Malabar Gold — Karol Bagh', area:'Ajmal Khan Road, Karol Bagh, New Delhi', hours:'11:00–21:00', langs:['Hindi','English','Punjabi'], bridalSuite:true },
  { id:'DXB', city:'Dubai', name:'Malabar Gold — Gold Souk, Meena Bazaar', area:'Meena Bazaar, Bur Dubai, UAE', hours:'10:00–22:00', langs:['Malayalam','Hindi','English','Arabic','Tamil'], bridalSuite:true },
];

const KNOWLEDGE = [
  { id:'purity', tags:['purity','bis','hallmark','karat','quality','916','22k'], cites:'Quality & Purity Policy', text:'All Malabar Gold jewellery is BIS Hallmarked. 22K gold is 916 (91.6% pure). Every piece carries a detailed, transparent price tag breaking up metal value, making charges, stones and GST.' },
  { id:'price', tags:['price','rate','transparent','making','charge','gst','tag','one india one gold rate'], cites:'Transparent Pricing', text:'We follow "One India One Gold Rate" — the same gold rate across all Indian showrooms. Bills itemise metal value, making charges, stone value and GST.' },
  { id:'buyback', tags:['buyback','buy back','resale','sell','dgrp'], cites:'Buyback & Exchange Guarantee', text:'Transparent buyback guarantee. Gold is bought back at the prevailing rate; diamonds under our rate-protection promise. Keep your original invoice.' },
  { id:'exchange', tags:['exchange','old gold','upgrade','swap','trade in'], cites:'Old-Gold Exchange Policy', text:'Exchange old gold towards new jewellery. Purity assessed transparently in front of you. Bring a valid ID and invoice if available.' },
  { id:'maintenance', tags:['maintenance','polish','cleaning','service','lifetime','care'], cites:'Lifetime Maintenance', text:'Lifetime free maintenance — complimentary cleaning and polishing at any Malabar showroom.' },
  { id:'warranty', tags:['warranty','guarantee','certificate','igi'], cites:'Certification & Warranty', text:'Diamond jewellery comes with a certificate of authenticity detailing carat, colour and clarity.' },
  { id:'shipping', tags:['delivery','shipping','courier','dispatch','track','order','insured'], cites:'Shipping & Delivery', text:'Online orders ship fully insured. Standard delivery 3–7 working days in India; high-value items may need ID verification on delivery.' },
  { id:'repair', tags:['repair','fix','broken','resize','restring','damage'], cites:'Repair Service', text:'Repair and resizing at showrooms. Drop the piece for a service ticket and estimated ready date.' },
  { id:'tryathome', tags:['try at home','home','trial','video shopping'], cites:'Try-at-Home / Video Shopping', text:'Try-at-home in select cities, or shop live over a video call with a personal shopper.' },
  { id:'smartbuy', tags:['smart buy','advance','rate protection','book rate','scheme','plan','save','smart saver'], cites:'Smart Buy & Savings Schemes', text:'Smart Buy Advance Purchase books today’s gold rate via an advance; at delivery you pay the LOWER of booked or prevailing rate. Smart Saver 11+1: pay 11 monthly instalments and redeem in jewellery with a benefit on the final instalment.' },
  { id:'invest', tags:['invest','coin','bar','gold coin','gold bar','999','akshaya','dhanteras','muhurat'], cites:'Gold Investment Products', text:'BIS-hallmarked 999.9 gold coins (1–8g) and bars (10–100g), assay-certified, tamper-sealed, buyback-protected.' },
  { id:'emi', tags:['emi','instalment','finance','credit'], cites:'Payment Options', text:'Cards, UPI, net-banking, and EMI on eligible cards.' },
  { id:'nri', tags:['nri','dubai','abroad','gift to india','deliver to india','overseas'], cites:'NRI & Gifting', text:'NRI customers can order for delivery to family in India, or buy at overseas showrooms (e.g. Dubai – Meena Bazaar), with insured delivery and video unboxing.' },
  { id:'consult', tags:['consultation','appointment','bridal','stylist','personal shopper'], cites:'Personal & Bridal Consultation', text:'Book a private appointment with a consultant — including a dedicated bridal suite at flagship stores.' },
];

module.exports = { RATE, PRODUCTS, STORES, KNOWLEDGE };
