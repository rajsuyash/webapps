/* Illustrative store directory for the demo. */
window.STORES = [
  { id:'CCJ', city:'Kozhikode', name:'Malabar Gold — Mavoor Road (Flagship)', area:'Mavoor Road, Kozhikode', state:'Kerala',
    hours:'10:30–20:30', langs:['Malayalam','English','Hindi','Tamil'], bridalSuite:true, lat:11.25, lng:75.78 },
  { id:'MAA', city:'Chennai', name:'Malabar Gold — T. Nagar', area:'Usman Road, T. Nagar, Chennai', state:'Tamil Nadu',
    hours:'10:30–20:30', langs:['Tamil','English','Telugu','Hindi'], bridalSuite:true, lat:13.04, lng:80.23 },
  { id:'HYD', city:'Hyderabad', name:'Malabar Gold — Kukatpally', area:'KPHB, Kukatpally, Hyderabad', state:'Telangana',
    hours:'10:30–20:30', langs:['Telugu','Hindi','English'], bridalSuite:true, lat:17.49, lng:78.39 },
  { id:'BLR', city:'Bengaluru', name:'Malabar Gold — Jayanagar', area:'4th Block, Jayanagar, Bengaluru', state:'Karnataka',
    hours:'10:30–20:30', langs:['Kannada','English','Tamil','Hindi'], bridalSuite:true, lat:12.93, lng:77.58 },
  { id:'BOM', city:'Mumbai', name:'Malabar Gold — Borivali', area:'S.V. Road, Borivali West, Mumbai', state:'Maharashtra',
    hours:'10:30–20:30', langs:['Hindi','Marathi','English','Gujarati'], bridalSuite:false, lat:19.23, lng:72.85 },
  { id:'COK', city:'Kochi', name:'Malabar Gold — M.G. Road', area:'M.G. Road, Ernakulam, Kochi', state:'Kerala',
    hours:'10:30–20:30', langs:['Malayalam','English','Hindi'], bridalSuite:true, lat:9.98, lng:76.28 },
  { id:'DEL', city:'Delhi', name:'Malabar Gold — Karol Bagh', area:'Ajmal Khan Road, Karol Bagh, New Delhi', state:'Delhi',
    hours:'11:00–21:00', langs:['Hindi','English','Punjabi'], bridalSuite:true, lat:28.65, lng:77.19 },
  { id:'DXB', city:'Dubai', name:'Malabar Gold — Gold Souk, Meena Bazaar', area:'Meena Bazaar, Bur Dubai, UAE', state:'UAE',
    hours:'10:00–22:00', langs:['Malayalam','Hindi','English','Arabic','Tamil'], bridalSuite:true, lat:25.26, lng:55.29 },
];
window.STORE_BY_CITY = {};
window.STORES.forEach(s => { window.STORE_BY_CITY[s.city.toLowerCase()] = s; });
