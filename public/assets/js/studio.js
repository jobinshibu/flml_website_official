/* App studio + design-system demo. No dependencies. Each block starts only if its markup exists. */
(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const sleep=t=>new Promise(r=>setTimeout(r,RM?0:t));

/* =====================================================================
   APP STUDIO: one product idea in six design languages, four platforms,
   every tab a real screen, driven by a voice-controlled robot
   ===================================================================== */
const ST=$('#studio');
if(ST){
let UID=0;const uid=()=>'sv'+(++UID);
const FD={serif:"system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif",geo:"system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif",sans:"system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif",round:"system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif"};
/* ---------- illustrations (inline SVG, no image downloads) ---------- */
const ART={
 aurum(i,big){const P=[['#F7C978','#D9776A','#4B3A63','#FFE9B8','#24304F'],['#9FD3F0','#E9D9C2','#2D6E8E','#FFF6DA','#1E4A5E'],['#C9DFB0','#F1D9A8','#3F6B4F','#FFF0C2','#2A4A35']][i%3];const g=uid();
  return `<svg viewBox="0 0 200 130" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${P[0]}"/><stop offset=".62" stop-color="${P[1]}"/></linearGradient><radialGradient id="${g}s"><stop offset="0" stop-color="${P[3]}"/><stop offset="1" stop-color="${P[3]}" stop-opacity="0"/></radialGradient></defs>
  <rect width="200" height="130" fill="url(#${g})"/><circle cx="142" cy="52" r="34" fill="url(#${g}s)"/><circle cx="142" cy="52" r="13" fill="${P[3]}"/>
  <path d="M0 74 Q40 58 80 70 T160 66 T200 70 V130 H0Z" fill="${P[2]}" opacity=".55"/><rect y="80" width="200" height="50" fill="${P[4]}"/>
  <g stroke="${P[3]}" stroke-opacity=".5" stroke-width="1.4" stroke-linecap="round"><path d="M118 90h48M128 98h30M136 106h16"/></g>
  <rect x="26" y="66" width="62" height="22" rx="2" fill="#F3EBDD"/><rect x="22" y="62" width="70" height="6" rx="2" fill="#E6D8BF"/><rect x="34" y="72" width="10" height="10" fill="#F7C978"/><rect x="50" y="72" width="10" height="10" fill="#F7C978"/><rect x="66" y="72" width="14" height="16" fill="#3B2A3F"/>
  <rect x="20" y="88" width="78" height="10" rx="2" fill="#7FD0E0" opacity=".85"/>
  <path d="M104 92 C102 72 106 56 112 44" stroke="#3B2A2A" stroke-width="2.6" fill="none"/><g fill="#2F5A3C"><path d="M112 44 q-16 -6 -26 4 q12 -2 26 -4z"/><path d="M112 44 q14 -10 28 -2 q-14 0 -28 2z"/><path d="M112 44 q-4 -14 6 -22 q-4 10 -6 22z"/><path d="M112 44 q10 4 14 16 q-8 -8 -14 -16z"/></g></svg>`},
 vita(i){const P=[['#CFF2EA','#F2C9A8','#2B2B3A'],['#DCE8FF','#C68B62','#1B1B22'],['#FFE3DA','#F6D2B5','#7A4B2A']][i%3];
  return `<svg viewBox="0 0 120 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="120" height="120" fill="${P[0]}"/><circle cx="96" cy="22" r="26" fill="#fff" opacity=".5"/>
  <path d="M20 120 C22 92 40 82 60 82 C80 82 98 92 100 120Z" fill="#FFFFFF"/><path d="M52 84 L60 100 L68 84" fill="#0E9F8E"/><path d="M40 92 C40 104 48 108 56 106" stroke="#5F7676" stroke-width="2.4" fill="none"/><circle cx="56" cy="106" r="3" fill="#5F7676"/>
  <rect x="53" y="66" width="14" height="18" rx="6" fill="${P[1]}"/><ellipse cx="60" cy="54" rx="18" ry="20" fill="${P[1]}"/>
  <path d="M41 52 C40 32 54 26 62 28 C74 28 82 38 79 54 C76 44 70 40 60 40 C50 40 45 46 41 52Z" fill="${P[2]}"/>
  <circle cx="53" cy="56" r="2" fill="#2B2B3A"/><circle cx="67" cy="56" r="2" fill="#2B2B3A"/><path d="M54 64 q6 5 12 0" stroke="#9B5A44" stroke-width="2" fill="none" stroke-linecap="round"/><circle cx="48" cy="61" r="3" fill="#F49C8C" opacity=".5"/><circle cx="72" cy="61" r="3" fill="#F49C8C" opacity=".5"/></svg>`},
 nova(i){const I=['<path d="M64 26 L48 64 H60 L54 94 L74 52 H62 Z" fill="#fff"/>','<circle cx="60" cy="48" r="14" fill="#fff"/><path d="M34 96 C36 76 46 68 60 68 C74 68 84 76 86 96Z" fill="#fff"/>','<ellipse cx="60" cy="82" rx="26" ry="8" fill="#FFE08A"/><rect x="34" y="62" width="52" height="20" fill="#F7C548"/><ellipse cx="60" cy="62" rx="26" ry="8" fill="#FFE9A8"/><ellipse cx="60" cy="48" rx="26" ry="8" fill="#FFE08A"/><rect x="34" y="40" width="52" height="8" fill="#F7C548"/><ellipse cx="60" cy="40" rx="26" ry="8" fill="#FFF1C4"/>'][i%3];const g=uid();const c=[['#3E7BFA','#22D3EE'],['#8B6CFF','#EC4899'],['#F59E0B','#EF4444']][i%3];
  return `<svg viewBox="0 0 120 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="${g}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c[0]}"/><stop offset="1" stop-color="${c[1]}"/></linearGradient></defs><rect width="120" height="120" fill="url(#${g})"/>${I}</svg>`},
 bloom(i){const F=[['#F4B740','#E07A2E','#fff'],['#E9C79A','#7A3B1D','#F3E2C4'],['#FFF6E5','#8BC34A','#FFFFFF']][i%3];let dots='';for(let k=0;k<26;k++){const a=k*2.4,r=8+(k*37%22);dots+=`<circle cx="${60+Math.cos(a)*r}" cy="${62+Math.sin(a)*r}" r="${k%5?1.6:2.6}" fill="${k%4?F[2]:F[1]}" opacity=".9"/>`}
  return `<svg viewBox="0 0 120 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="120" height="120" fill="#FFD9B8"/><circle cx="20" cy="18" r="10" fill="#7BC86C" opacity=".8"/><circle cx="104" cy="104" r="12" fill="#FF8E6E" opacity=".7"/>
  <ellipse cx="62" cy="66" rx="46" ry="44" fill="#000" opacity=".08"/><circle cx="60" cy="62" r="44" fill="#FFFFFF"/><circle cx="60" cy="62" r="36" fill="${F[0]}"/>${i%3===1?'<path d="M60 62 m-24 0 a24 24 0 1 0 48 0 a18 18 0 1 0 -36 0 a12 12 0 1 0 24 0" fill="none" stroke="#C99A62" stroke-width="5"/>':''}${dots}
  <path d="M74 44 q10 -8 16 2 q-10 4 -16 -2z" fill="#3E9B4F"/><path d="M44 80 q-8 8 -16 0 q8 -6 16 0z" fill="#3E9B4F"/><circle cx="76" cy="74" r="4" fill="#E53935"/></svg>`},
 maison(i){const S=['<path d="M42 30 L54 26 Q60 34 66 26 L78 30 L92 48 L82 56 L78 50 L78 98 L42 98 L42 50 L38 56 L28 48 Z" fill="#E8DCC6"/><path d="M54 26 L60 40 L66 26" fill="none" stroke="#B9A584" stroke-width="2"/><path d="M60 40 V98" stroke="#B9A584" stroke-width="1.4"/>',
  '<path d="M50 24 L52 40 Q60 44 68 40 L70 24" fill="none" stroke="#2B2B2B" stroke-width="2"/><path d="M50 40 Q60 46 70 40 L82 100 Q60 108 38 100 Z" fill="#2B2B2B"/>',
  '<path d="M40 30 L56 26 L60 34 L64 26 L80 30 L86 98 L34 98 Z" fill="#4A4A4F"/><path d="M56 26 L50 60 L60 70 L70 60 L64 26" fill="#3A3A3F"/><circle cx="60" cy="78" r="2" fill="#C9B79C"/><circle cx="60" cy="88" r="2" fill="#C9B79C"/>'][i%3];const g=uid();
  return `<svg viewBox="0 0 120 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="${g}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#EFE6DA"/><stop offset="1" stop-color="#D8C6AE"/></linearGradient></defs><rect width="120" height="120" fill="url(#${g})"/><path d="M60 12 v8 M44 22 L60 18 L76 22" stroke="#8B7355" stroke-width="2" fill="none" stroke-linecap="round"/>${S}<ellipse cx="60" cy="110" rx="30" ry="4" fill="#000" opacity=".08"/></svg>`},
 atlas(i){const c=['#F59E0B','#2F5BEA','#10B981'][i%3];
  return `<svg viewBox="0 0 120 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="120" height="120" fill="#EEF2FD"/><rect x="34" y="20" width="52" height="70" rx="6" fill="#fff" stroke="#D6DDF0"/><g fill="#D6DDF0"><rect x="42" y="32" width="36" height="5" rx="2"/><rect x="42" y="44" width="28" height="5" rx="2"/><rect x="42" y="56" width="32" height="5" rx="2"/></g><circle cx="82" cy="84" r="16" fill="${c}"/><path d="M75 84 l5 5 l9 -10" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`},
};
const heroArt={
 nova:()=>'<svg class="a-wave" viewBox="0 0 300 120" preserveAspectRatio="none" aria-hidden="true"><path d="M0 90 C60 60 110 110 170 80 S260 40 300 60 V120 H0Z" fill="#fff" opacity=".12"/><path d="M0 100 C70 80 120 120 190 96 S270 70 300 84 V120 H0Z" fill="#fff" opacity=".1"/></svg><i class="a-chip"></i><span class="a-nfc">))</span>',
 atlas:()=>'<svg class="a-chart" viewBox="0 0 160 70" aria-hidden="true"><g fill="currentColor" opacity=".18"><rect x="4" y="40" width="12" height="30" rx="3"/><rect x="24" y="30" width="12" height="40" rx="3"/><rect x="44" y="44" width="12" height="26" rx="3"/><rect x="64" y="22" width="12" height="48" rx="3"/><rect x="84" y="28" width="12" height="42" rx="3"/><rect x="104" y="14" width="12" height="56" rx="3"/><rect x="124" y="20" width="12" height="50" rx="3"/><rect x="144" y="8" width="12" height="62" rx="3"/></g><path d="M10 46 L30 36 L50 48 L70 26 L90 32 L110 18 L130 24 L150 10" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>'
};
const TH={
 aurum:{name:'Aurum Stays',ind:'Luxury hotel',fd:FD.serif,fb:FD.sans,r:4,mode:'dark',url:'aurumstays.com',over:1,
  L:{bg:'#F6F1E8',sf:'#FFFFFF',ink:'#1C1A16',mut:'#7A7264',pri:'#A8823A',on:'#FFFFFF',line:'#E9E0D0'},
  D:{bg:'#0B0F19',sf:'#141A29',ink:'#F3EBDD',mut:'#A39BAA',pri:'#D4AF6A',on:'#15110A',line:'#252D42'},
  hello:'Good evening, Ria',search:'Where would you like to escape?',cats:['Villas','Suites','Spa','Dining','Experiences'],heroK:'Members’ escape',heroT:'Three nights by the lagoon',heroS:'From ₹38,000 a night · breakfast included',cta:'Book now',listT:'Suites & villas',
  items:[['Lagoon Pool Villa','Private pool · 120 m²','₹38,000','4.9'],['Sky Suite','Panoramic deck · 86 m²','₹26,500','4.8'],['Garden Pavilion','Courtyard bath · 64 m²','₹18,900','4.8']],
  feats:['Private pool','Butler','Sea view'],optT:'Length of stay',opts:['1 night','2 nights','3 nights','5 nights'],unit:'/ night',conf:'Confirm booking',done:'Your stay is reserved',doneS:'Check-in Fri 14 Nov, 2:00 PM',
  tabs:['Stays','Explore','Trips','Profile'],browse:'Explore Aurum',act:{t:'My trips',rows:[['Lagoon Pool Villa','14–17 Nov · 2 guests','Confirmed','ok'],['Spa ritual for two','15 Nov · 6:30 PM','Reserved','ok'],['Sky Suite','Mar 2026','Completed','mut']]},
  prof:{tier:'Gold member',stats:[['6','Stays'],['18.4k','Points'],['Gold','Tier']],rows:['Saved places','Payment methods','Concierge chat']}},
 vita:{name:'Vita Care',ind:'Healthcare',fd:FD.sans,fb:FD.sans,r:18,mode:'light',url:'vitacare.health',
  L:{bg:'#F3F8F7',sf:'#FFFFFF',ink:'#0F2A2A',mut:'#5F7676',pri:'#0E9F8E',on:'#FFFFFF',line:'#DFEBE9'},
  D:{bg:'#0A1515',sf:'#112221',ink:'#E3F2F0',mut:'#86A3A0',pri:'#2CC6B2',on:'#03201C',line:'#1D3533'},
  hello:'Hi Ria, how are you feeling?',search:'Search doctors, symptoms, tests',cats:['Physio','Cardiology','Skin','Dental','Lab tests'],heroK:'Next available',heroT:'Physiotherapy at home',heroS:'Dr. Anjali Menon · today, 4:15 PM',cta:'Book now',listT:'Specialists near you',
  items:[['Dr. Anjali Menon','Physiotherapist · 12 yrs','₹900','4.9'],['Dr. Faisal Rahman','Cardiologist · 15 yrs','₹1,200','4.8'],['Dr. Leena Thomas','Dermatologist · 9 yrs','₹1,000','4.9']],
  feats:['Home visit','Video call','Insurance'],optT:'Choose a time',opts:['9:30 AM','11:00 AM','4:15 PM','7:00 PM'],unit:'/ visit',conf:'Confirm appointment',done:'Appointment confirmed',doneS:'Home visit today',
  tabs:['Home','Doctors','Visits','Profile'],browse:'Find a doctor',act:{t:'My visits',rows:[['Dr. Anjali Menon','Today · 4:15 PM · Home','Upcoming','ok'],['Blood test panel','Sat · 8:00 AM · Lab','Booked','ok'],['Dr. Faisal Rahman','12 Sep · Video','Completed','mut']]},
  prof:{tier:'Family plan',stats:[['4','Members'],['9','Visits'],['2','Reports']],rows:['Health records','Insurance','Family members']}},
 nova:{name:'Nova Pay',ind:'Fintech',fd:FD.geo,fb:FD.sans,r:20,mode:'dark',url:'novapay.app',
  L:{bg:'#F4F3FB',sf:'#FFFFFF',ink:'#14122B',mut:'#6C6990',pri:'#6D4CFF',on:'#FFFFFF',line:'#E4E1F5'},
  D:{bg:'#08080E',sf:'#13131E',ink:'#EEEDF8',mut:'#8E8BA8',pri:'#8B6CFF',on:'#FFFFFF',line:'#23223A'},
  hello:'Welcome back, Ria',search:'Search people, bills, merchants',cats:['Send','Bills','Recharge','Invest','Rewards'],heroK:'Available balance',heroT:'₹2,48,560.40',heroS:'+₹12,400 this week',cta:'Pay now',listT:'Recent & upcoming',
  items:[['KSEB Electricity','Bill due 18 Nov','₹2,340','auto'],['Arjun Nair','Sent · today 9:12 AM','₹1,200',''],['Gold SIP','Auto-invest · monthly','₹5,000','']],
  feats:['Instant UPI','Cashback','Secure'],optT:'Amount',opts:['₹500','₹1,000','₹2,340','₹5,000'],unit:'',conf:'Pay securely',done:'Payment successful',doneS:'UPI ref 4821 0093',
  tabs:['Home','Cards','Invest','Profile'],browse:'Pay & transfer',act:{t:'Investments',rows:[['Gold SIP','₹5,000 monthly · +8.2%','Active','ok'],['Nifty 50 index','₹12,000 · +14.1%','Active','ok'],['Fixed deposit','₹50,000 · 7.4%','Matures Jan','mut']]},
  prof:{tier:'Verified · KYC done',stats:[['3','Cards'],['₹840','Cashback'],['742','Credit score']],rows:['Linked bank accounts','Security & PIN','Statements']}},
 bloom:{name:'Bloom Kitchen',ind:'Food delivery',fd:FD.round,fb:FD.round,r:22,mode:'light',url:'bloomkitchen.in',over:1,
  L:{bg:'#FFF7EE',sf:'#FFFFFF',ink:'#2B1A0E',mut:'#8A6F5B',pri:'#FF6B35',on:'#FFFFFF',line:'#F6E4D2'},
  D:{bg:'#150D07',sf:'#22160D',ink:'#FDEBDC',mut:'#B79A84',pri:'#FF7A45',on:'#1C0C02',line:'#3A2718'},
  hello:'Hungry, Ria?',search:'Biryani, parotta, desserts…',cats:['Biryani','Kerala','Desserts','Healthy','Drinks'],heroK:'Today’s special',heroT:'Malabar dum biryani',heroS:'Ready in 25 min · free delivery',cta:'Order now',listT:'Popular near you',
  items:[['Malabar biryani','Dum-cooked · serves 1','₹240','4.9'],['Parotta & beef roast','Kerala classic','₹180','4.8'],['Tender coconut pudding','Chilled dessert','₹120','4.7']],
  feats:['25 min','Free delivery','Bestseller'],optT:'Portion',opts:['Regular','Large','Family pack'],unit:'',conf:'Place order',done:'Order on its way',doneS:'Arriving in 25 minutes',
  tabs:['Home','Search','Orders','Profile'],browse:'What are you craving?',act:{t:'Your orders',rows:[['Malabar biryani ×2','Out for delivery · 12 min','On the way','ok'],['Parotta & beef roast','Yesterday · 8:40 PM','Delivered','mut'],['Tender coconut pudding','Sun · 1:15 PM','Delivered','mut']]},
  prof:{tier:'Bloom Plus',stats:[['24','Orders'],['₹1.2k','Saved'],['4.9','Rating']],rows:['Saved addresses','Payment methods','Favourite dishes']}},
 maison:{name:'Maison Noir',ind:'Fashion store',fd:FD.serif,fb:FD.sans,r:0,mode:'light',url:'maisonnoir.co',over:1,
  L:{bg:'#FAF8F5',sf:'#FFFFFF',ink:'#111111',mut:'#77716A',pri:'#111111',on:'#FFFFFF',line:'#ECE7E0'},
  D:{bg:'#0E0D0C',sf:'#181614',ink:'#F4F0EA',mut:'#A39C92',pri:'#E9DFD0',on:'#111111',line:'#2B2724'},
  hello:'New season',search:'Search the collection',cats:['New in','Shirts','Dresses','Tailoring','Shoes'],heroK:'The autumn edit',heroT:'Quiet tailoring',heroS:'Linen, silk & wool · free returns',cta:'Shop now',listT:'Just in',
  items:[['Linen overshirt','Sand · relaxed fit','₹4,990','4.8'],['Silk slip dress','Ink · bias cut','₹7,450','4.9'],['Wool blazer','Charcoal · tailored','₹11,900','4.9']],
  feats:['Free returns','Made in India','Natural fibre'],optT:'Size',opts:['S','M','L','XL'],unit:'',conf:'Add to bag',done:'Added to your bag',doneS:'Free delivery by Thursday',
  tabs:['Shop','Search','Bag','Account'],browse:'The collection',act:{t:'Your bag',rows:[['Silk slip dress','Ink · size M','₹7,450','ok'],['Linen overshirt','Sand · size L','₹4,990','ok'],['Free express delivery','Arrives Thursday','Included','mut']]},
  prof:{tier:'Maison Circle',stats:[['8','Orders'],['3','Wishlist'],['Silver','Tier']],rows:['Wishlist','Size profile','Returns']}},
 atlas:{name:'Atlas ERP',ind:'Enterprise',fd:FD.sans,fb:FD.sans,r:10,mode:'light',url:'atlas.yourcompany.com',
  L:{bg:'#F4F6FB',sf:'#FFFFFF',ink:'#111A33',mut:'#5D6886',pri:'#2F5BEA',on:'#FFFFFF',line:'#E3E8F2'},
  D:{bg:'#0A0F1E',sf:'#121A30',ink:'#E6EBF7',mut:'#8692B0',pri:'#5B82FF',on:'#FFFFFF',line:'#223050'},
  hello:'Good morning, Ria',search:'Search orders, vendors, items',cats:['Pending','Approved','Urgent','Site A','Site B'],heroK:'Revenue this month',heroT:'₹1.84 Cr',heroS:'▲ 12.4% vs last month · 4 approvals waiting',cta:'Review now',listT:'Waiting for approval',
  items:[['PO-1042 Steel rods','Site B · 2 days waiting','₹4.2 L','Urgent'],['PO-1043 Cement, 400 bags','Site A · today','₹1.6 L',''],['PO-1047 Electrical fittings','Head office · today','₹86 K','']],
  feats:['3 quotes','Budget OK','Vendor A-rated'],optT:'Decision',opts:['Approve','Approve with note','Send back'],unit:'',conf:'Submit decision',done:'Decision recorded',doneS:'Vendor notified automatically',
  tabs:['Dashboard','Orders','Stock','Account'],browse:'Purchase orders',act:{t:'Stock levels',rows:[['TMT steel 12 mm','62% · reorder at 40%','Healthy','ok'],['Cement OPC 53','18% · reorder now','Low','bad'],['Electrical wire 2.5 mm','44% · on order','Incoming','mut']]},
  prof:{tier:'Head of Operations',stats:[['₹1.84Cr','Revenue'],['126','Orders'],['98%','On-time']],rows:['Team & roles','Approval rules','Export reports']}},
};
const ICONS=['<path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1z"/>','<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>','<path d="M6 4h12v17l-6-4-6 4z"/>','<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4.5 4.5-6 8-6s6.5 1.5 8 6"/>'];
const ico=i=>`<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[i]}</svg>`;
const HEART='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>';
const STAR='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/></svg>';
const s={theme:'aurum',plat:'ios',mode:null,view:'home',item:0,opt:0,tab:0,cat:0,fav:{}};
const frame=$('#stFrame',ST),dev=$('#stDev',ST),app=$('#stApp',ST),urlEl=$('#stUrl',ST),winT=$('#stWinT',ST);
const T=()=>TH[s.theme],dark=()=>(s.mode||T().mode)==='dark';
function vars(){const t=T(),c=t[dark()?'D':'L'],st=frame.style;for(const k in c)st.setProperty('--a-'+k,c[k]);st.setProperty('--a-r',t.r+'px');st.setProperty('--a-fd',t.fd);st.setProperty('--a-fb',t.fb);frame.dataset.mode=dark()?'dark':'light';frame.dataset.theme=s.theme}
const art=(i,big)=>ART[s.theme](i,big);
const tag=it=>it[3]?(/^\d/.test(it[3])?`<span class="a-rate">${STAR}${it[3]}</span>`:`<span class="a-pill">${esc(it[3])}</span>`):'';
function top(){const t=T();return `<header class="a-top"><div><small>${esc(t.hello)}</small><b class="a-brand">${esc(t.name)}</b></div><button class="a-av" data-tab="3" data-say="profile avatar" aria-label="Profile">RM<i></i></button></header>`}
function tabs(){return `<nav class="a-tabs" aria-label="App navigation">${T().tabs.map((n,i)=>`<button class="a-tab" data-tab="${i}" data-say="${esc(n)} tab" aria-current="${i===s.tab?'page':'false'}">${ico(i)}<span>${esc(n)}</span></button>`).join('')}</nav>`}
function search(){return `<button class="a-search" data-tab="1" data-say="search">${ico(1)}<span>${esc(T().search)}</span></button>`}
function cats(active){return `<div class="a-cats">${T().cats.map((c,i)=>`<button class="a-cat" data-act="cat" data-i="${i}" data-say="${esc(c)}" aria-pressed="${active&&i===s.cat}">${esc(c)}</button>`).join('')}</div>`}
function item(it,i){return `<button class="a-item" data-act="item" data-i="${i}" data-say="${esc(it[0])}"><i class="a-th">${art(i)}</i><span><b>${esc(it[0])}</b><small>${esc(it[1])}</small>${tag(it)}</span><em>${esc(it[2])}</em></button>`}
function vHome(){const t=T();const hero=s.theme==='nova'?heroArt.nova():s.theme==='atlas'?heroArt.atlas():art(0,1);
 return top()+`<div class="a-body">${search()}${cats(false)}
 <article class="a-hero${t.over?' over':''}"><div class="a-art">${hero}</div><div class="a-hx"><small>${esc(t.heroK)}</small><p class="a-h">${esc(t.heroT)}</p><p>${esc(t.heroS)}</p><button class="a-cta" data-primary data-act="hero" data-say="${esc(t.cta)}">${esc(t.cta)}</button></div>${t.over?`<button class="a-fav" data-act="fav" data-i="0" data-say="favourite like" aria-pressed="${!!s.fav[s.theme+0]}" aria-label="Save">${HEART}</button>`:''}</article>
 <div class="a-sec"><b>${esc(t.listT)}</b><button class="a-link" data-tab="1" data-say="see all">See all</button></div>
 <div class="a-list">${t.items.map(item).join('')}</div></div>`+tabs()}
function vBrowse(){const t=T();const grid=[...t.items,...t.items.slice(0,1)].map((it,k)=>{const i=k%t.items.length;return `<button class="a-card" data-act="item" data-i="${i}" data-say="${esc(it[0])}"><i class="a-cart">${art(i)}</i><b>${esc(it[0])}</b><small>${esc(it[2])} ${esc(t.unit)}</small></button>`}).join('');
 return `<header class="a-top"><div><small>${esc(t.name)}</small><b class="a-brand">${esc(t.browse)}</b></div></header><div class="a-body">${search()}${cats(true)}<div class="a-grid">${grid}</div></div>`+tabs()}
function vAct(){const t=T(),a=t.act;
 return `<header class="a-top"><div><small>${esc(t.name)}</small><b class="a-brand">${esc(a.t)}</b></div></header><div class="a-body"><div class="a-seg2"><span aria-pressed="true">Current</span><span>History</span></div>
 ${a.rows.map((r,i)=>`<button class="a-row" data-act="item" data-i="${i%t.items.length}" data-say="${esc(r[0])}"><i class="a-th">${art(i)}</i><span><b>${esc(r[0])}</b><small>${esc(r[1])}</small></span><em class="a-st ${r[3]}">${esc(r[2])}</em></button>`).join('')}
 <div class="a-tip"><b>Tip</b><span>Ask the robot: “show ${esc(t.tabs[1].toLowerCase())}” or “open profile”.</span></div></div>`+tabs()}
function vProf(){const t=T(),p=t.prof;
 return `<header class="a-top"><div><small>${esc(t.name)}</small><b class="a-brand">${esc(t.tabs[3])}</b></div></header><div class="a-body"><div class="a-me"><i class="a-big-av">RM</i><div><b>Ria Menon</b><small>${esc(p.tier)}</small></div></div>
 <div class="a-stats">${p.stats.map(x=>`<div><b>${esc(x[0])}</b><small>${esc(x[1])}</small></div>`).join('')}</div>
 <div class="a-set"><button class="a-setrow" data-act="mode" data-say="dark mode switch"><span>Dark mode</span><i class="a-sw" aria-hidden="true" data-on="${dark()}"></i></button>${p.rows.map(r=>`<button class="a-setrow" data-say="${esc(r)}"><span>${esc(r)}</span><i class="a-chev">›</i></button>`).join('')}<button class="a-setrow" data-say="sign out"><span style="color:var(--a-pri)">Sign out</span></button></div></div>`+tabs()}
function vDetail(){const t=T(),it=t.items[s.item];const price=it[2];
 return `<div class="a-body a-det"><div class="a-art big">${art(s.item,1)}<button class="a-back" data-act="back" data-say="back" aria-label="Back">‹</button><button class="a-fav" data-act="fav" data-i="${s.item}" data-say="favourite like" aria-pressed="${!!s.fav[s.theme+s.item]}" aria-label="Save">${HEART}</button></div>
 <div class="a-sheet"><small>${esc(t.ind)}</small><p class="a-h">${esc(it[0])}</p><p>${esc(it[1])} ${tag(it)}</p>
 <div class="a-feats">${t.feats.map(f=>`<span>${esc(f)}</span>`).join('')}</div>
 <div class="a-ot">${esc(t.optT)}</div><div class="a-opts" role="group" aria-label="${esc(t.optT)}">${t.opts.map((o,i)=>`<button class="a-opt" data-act="opt" data-i="${i}" data-say="${esc(o)}" aria-pressed="${i===s.opt}">${esc(o)}</button>`).join('')}</div></div></div>
 <div class="a-bar"><div><small>Total</small><b>${esc(price)}<span>${esc(t.unit)}</span></b></div><button class="a-cta" data-primary data-act="confirm" data-say="${esc(t.conf)}">${esc(t.conf)}</button></div>`}
function vDone(){const t=T(),it=t.items[s.item];let conf='';for(let k=0;k<18;k++)conf+=`<i style="--x:${(k*53%100)-50}px;--d:${k*37%400}ms;--c:${['var(--a-pri)','#FFC857','#7BD389','#FF8FA3'][k%4]}"></i>`;
 return `<div class="a-body a-done"><div class="a-conf" aria-hidden="true">${conf}</div><div class="a-tick" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></div><p class="a-h">${esc(t.done)}</p><div class="a-rcpt"><div><span>${esc(it[0])}</span><b>${esc(it[2])}</b></div><div><span>${esc(t.optT)}</span><b>${esc(t.opts[s.opt])}</b></div><div><span>Status</span><b>${esc(t.doneS)}</b></div></div><button class="a-cta" data-primary data-act="home" data-say="done">Done</button></div>`}
const VIEWS={home:vHome,browse:vBrowse,act:vAct,prof:vProf,detail:vDetail,done:vDone};
const TABV=['home','browse','act','prof'];
function fit(){
    const r=$('.a-root',app);if(!r)return;
    const W=app.clientWidth, H=app.clientHeight;
    if(s.plat==='web'||s.plat==='desktop'){
      const L=s.plat==='web'?820:780, k=W/L;
      r.style.width=L+'px';
      r.style.height=(H/k)+'px';
      r.style.transform=`scale(${k})`;
    } else {
      const BASE_W=360;
      const k=W/BASE_W;
      r.style.width=BASE_W+'px';
      r.style.height=(H/k)+'px';
      r.style.transform=`scale(${k})`;
    }
  }
function render(anim){vars();const t=T();dev.className='st-dev plat-'+s.plat;
 if(urlEl)urlEl.textContent=t.url+({home:'',browse:'/explore',act:'/'+t.tabs[2].toLowerCase(),prof:'/account',detail:'/book',done:'/confirmed'}[s.view]);
 if(winT)winT.textContent=t.name;
 app.innerHTML=`<div class="a-root"><div class="a a-${s.view}${anim?' a-in':''}">${VIEWS[s.view]()}</div></div>`;fit();clearTimeout(fit.t);fit.t=setTimeout(()=>{fit();dock()},480);
 $$('[data-theme-pick]',ST).forEach(b=>b.setAttribute('aria-pressed',b.dataset.themePick===s.theme));
 $$('[data-plat-pick]',ST).forEach(b=>b.setAttribute('aria-pressed',b.dataset.platPick===s.plat));
 const mb=$('#stMode',ST);if(mb){mb.setAttribute('aria-pressed',dark());mb.querySelector('span').textContent=dark()?'Dark':'Light'}
 const nm=$('#stName',ST);if(nm)nm.textContent=`${t.name} · ${t.ind}`;
 requestAnimationFrame(dock)}
app.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const a=b.dataset.act;
 if(b.dataset.tab!=null){s.tab=+b.dataset.tab;s.view=TABV[s.tab];render(1);return}
 if(a==='hero'){s.item=0;s.opt=Math.min(T().opts.length-1,s.theme==='vita'||s.theme==='aurum'||s.theme==='nova'?2:0);s.view='detail';render(1)}
 else if(a==='item'){s.item=+b.dataset.i;s.opt=0;s.view='detail';render(1)}
 else if(a==='opt'){s.opt=+b.dataset.i;$$('.a-opt',app).forEach(x=>x.setAttribute('aria-pressed',x===b))}
 else if(a==='cat'){s.cat=+b.dataset.i;$$('.a-cat',app).forEach(x=>x.setAttribute('aria-pressed',x===b));if(s.view==='home'){s.tab=1;s.view='browse';render(1)}}
 else if(a==='fav'){const k=s.theme+b.dataset.i;s.fav[k]=!s.fav[k];b.setAttribute('aria-pressed',s.fav[k]);b.classList.remove('pop');void b.offsetWidth;b.classList.add('pop')}
 else if(a==='mode'){s.mode=dark()?'light':'dark';render(0)}
 else if(a==='confirm'){s.view='done';render(1)}
 else if(a==='back'||a==='home'){s.view=TABV[s.tab]||'home';if(a==='home'){s.tab=0;s.view='home'}render(1)}});
ST.addEventListener('click',e=>{const b=e.target.closest('[data-theme-pick],[data-plat-pick],#stMode');if(!b)return;
 if(b.dataset.themePick){s.theme=b.dataset.themePick;s.mode=null;s.view='home';s.tab=0;s.cat=0;render(1)}
 else if(b.dataset.platPick){s.plat=b.dataset.platPick;render(1)}
 else{s.mode=dark()?'light':'dark';render(0)}});

/* ---------------- robot ---------------- */
const bot=$('#stBot',ST),bub=$('#stBub',ST),mic=$('#stMic',ST),inp=$('#stIn',ST),form=$('#stForm',ST),note=$('#stNote',ST);
let busy=false;const queue=[];
const FX=58,FY=47; // fingertip position inside the 72x80 robot
function place(x,y,slow){bot.style.transitionDuration=RM?'0ms':(slow?'780ms':'0ms');bot.style.transform=`translate(${x}px,${y}px)`}
function dock(){if(busy)return;const sr=ST.getBoundingClientRect(),fr=dev.getBoundingClientRect();const wide=innerWidth>760;
 place(wide?fr.right-sr.left-22:fr.right-sr.left-64,fr.bottom-sr.top-(wide?118:86),true)}
function setBot(st){bot.dataset.state=st}
function bubble(t,ms){bub.textContent=t;bub.hidden=!t;clearTimeout(bubble.t);if(ms)bubble.t=setTimeout(()=>{bub.hidden=true},ms)}
let speakOn=false;
function talk(t){if(!speakOn||!('speechSynthesis' in window))return;try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.rate=1.05;u.pitch=1.3;u.lang='en-IN';speechSynthesis.speak(u)}catch(e){}}
async function tap(el,label){const sr=ST.getBoundingClientRect();
 const body=el.closest('.a-body,.a-cats');if(body){const br=body.getBoundingClientRect(),er=el.getBoundingClientRect();
  if(body.classList.contains('a-cats')){if(er.left<br.left||er.right>br.right){body.scrollTo({left:body.scrollLeft+(er.left-br.left)-20,behavior:RM?'auto':'smooth'});await sleep(350)}}
  else if(er.top<br.top||er.bottom>br.bottom){body.scrollTo({top:body.scrollTop+(er.top-br.top)-br.height/3,behavior:RM?'auto':'smooth'});await sleep(380)}}
 const r=el.getBoundingClientRect();const cx=r.left-sr.left+Math.min(r.width*.5,r.width-14),cy=r.top-sr.top+r.height*.55;
 setBot('move');bubble('Tapping “'+label+'”');place(cx-FX,cy-FY,true);await sleep(820);
 setBot('tap');const rp=document.createElement('span');rp.className='st-ripple';el.appendChild(rp);setTimeout(()=>rp.remove(),700);await sleep(180);
 el.click();await sleep(380);setBot('happy')}
const STOP=new Set('click tap press hit push the a an on button please select choose open pick go to for me can you could will it this that i want would like show option item kindly and then logi robot hey ok okay screen page'.split(' '));
const tok=x=>(x.toLowerCase().replace(/[’']/g,'').match(/[a-z]+|\d+/g)||[]);
const PRIMARY=/\b(book|booking|order|buy|pay|confirm|checkout|purchase|reserve|approve|submit|shop|review|place|bag|cart|proceed)\b/;
function visible(el){const r=el.getBoundingClientRect();return r.width>0&&r.height>0}
function bestMatch(q){const Q=tok(q).filter(w=>!STOP.has(w));if(!Q.length)return null;
 let best=null,bs=0;for(const el of $$('button',app)){if(!visible(el))continue;const L=tok((el.dataset.say||'')+' '+el.textContent);let sc=0;
  for(const w of Q){if(L.includes(w))sc+=1;else if(w.length>=3&&L.some(l=>l.length>=3&&(l.startsWith(w)||w.startsWith(l))))sc+=.7}
  if(sc>0&&Q.every(w=>L.includes(w)))sc+=.5;if(el.hasAttribute('data-primary'))sc+=.05;if(el.classList.contains('a-tab'))sc+=.02;
  if(sc>bs){bs=sc;best=el}}
 if(bs>=1)return best;
 if(PRIMARY.test(Q.join(' '))){const p=$('[data-primary]',app);if(p)return p}
 return bs>=.7?best:null}
const THK=[['aurum',/\b(luxury|hotel|resort|villa|aurum|stays?)\b/],['vita',/\b(health|healthcare|doctor|doctors|clinic|medical|hospital|vita|physio)\b/],['nova',/\b(fintech|finance|bank|banking|wallet|nova|money)\b/],['bloom',/\b(food|restaurant|delivery|kitchen|bloom|biryani)\b/],['maison',/\b(fashion|clothing|clothes|boutique|maison|ecommerce|commerce|store|shopping)\b/],['atlas',/\b(erp|enterprise|dashboard|business|atlas|admin|corporate)\b/]];
const PK=[['ios',/\b(ios|iphone|apple|ipad)\b/],['android',/\b(android|samsung|pixel)\b/],['web',/\b(web|website|browser|site)\b/],['desktop',/\b(desktop|windows|mac|macos|computer|laptop|pc)\b/]];
function plan(raw){const q=raw.toLowerCase();
 for(const [p,re] of PK)if(re.test(q)&&p!==s.plat&&/\b(switch|show|change|view|open|on|to|as|in|make|use|platform|version|app)\b|^\s*\w+\s*$/.test(q)){const el=$(`[data-plat-pick="${p}"]`,ST);return {el,label:el.textContent.trim()}}
 if(/\b(dark|night)\b/.test(q)&&!dark())return {el:$('#stMode',ST),label:'Dark mode'};
 if(/\b(light|bright|day)\b/.test(q)&&dark())return {el:$('#stMode',ST),label:'Light mode'};
 for(const [k,re] of THK)if(re.test(q)){if(k!==s.theme){const el=$(`[data-theme-pick="${k}"]`,ST);return {el,label:TH[k].ind}}if(!bestMatch(q))return {msg:'This is the '+TH[k].ind.toLowerCase()+' style.'}}
 if(/\b(back|previous|return)\b/.test(q)||(/\bhome\b/.test(q)&&s.view!=='home')){const el=$('[data-act="back"],[data-act="home"]',app)||$('.a-tab[data-tab="0"]',app);if(el&&s.view!=='home')return {el,label:el.dataset.say||'Back'};return {msg:'We are already on the home screen.'}}
 if(/\b(profile|account|settings|explore|search)\b/.test(q)||T().tabs.some(n=>new RegExp('\\b'+n.toLowerCase()+'\\b').test(q))){if(!$('.a-tabs',app)){const h=$('[data-act="back"],[data-act="home"]',app);if(h)return {el:h,label:'Back',again:true}}if(/\b(profile|account|settings)\b/.test(q)){const el=$('.a-tab[data-tab="3"]',app);if(el)return {el,label:T().tabs[3]}}}
 if(/\b(scroll|down|up)\b/.test(q)&&!PRIMARY.test(q)){const b=$('.a-body',app);if(b){b.scrollBy({top:/\bup\b/.test(q)?-180:180,behavior:'smooth'});return {msg:'Scrolling.'}}}
 const el=bestMatch(q);if(el)return {el,label:(el.dataset.say||el.textContent).replace(/ tab$/,'').trim()};
 return null}
const VERBS=new Set('show switch change open turn go book order pay pick select choose confirm place add tap click press scroll dark light approve review shop submit buy reserve'.split(' '));
function splitCmds(raw){const out=[];for(const chunk of raw.split(/\s*(?:[,.;!?]|\band then\b|\bafter that\b|\bthen\b|\band\b|\balso\b)\s*/i)){const w=chunk.trim().split(/\s+/).filter(Boolean);let cur=[];
  w.forEach((x,i)=>{const lx=x.toLowerCase();if(cur.length&&VERBS.has(lx)&&!VERBS.has(w[i-1].toLowerCase())&&!(lx==='light'||lx==='dark')||(cur.length&&(lx==='dark'||lx==='light')&&!/^(to|in|on)$/i.test(w[i-1])&&!VERBS.has(w[i-1].toLowerCase()))){out.push(cur.join(' '));cur=[]}cur.push(x)});
  if(cur.length)out.push(cur.join(' '))}return out.filter(Boolean)}
async function run(raw,o={}){raw=(raw||'').trim();if(!raw)return;if(busy){queue.push([raw,o]);return}busy=true;speakOn=!!o.voice;
 const parts=splitCmds(raw);let did=0;
 for(const p of parts){let pl=plan(p);if(!pl&&o.alts&&parts.length===1)for(const a of o.alts){pl=plan(a);if(pl)break}
  if(!pl){bubble('Oh sorry… I am limited to the UI/UX section.',3600);talk('Oh sorry. I am limited to the U I, U X section.');setBot('confused');await sleep(1300);continue}
  if(pl.msg){bubble(pl.msg,2200);await sleep(600);continue}
  await tap(pl.el,pl.label);did++;await sleep(260);if(pl.again){const p2=plan(p);if(p2&&p2.el&&!p2.again){await tap(p2.el,p2.label);did++;await sleep(260)}}}
 if(did){bubble(did>1?'All done! ✨':'Done! ✨',1700);talk(did>1?'All done':'Done')}
 busy=false;if(queue.length){const [q,qo]=queue.shift();return run(q,qo)}setTimeout(()=>{if(!busy){setBot(session?'listen':'idle');if(session)bubble('Listening… next command?');dock()}},900)}
form.addEventListener('submit',e=>{e.preventDefault();run(inp.value);inp.value=''});
$$('[data-try]',ST).forEach(b=>b.addEventListener('click',()=>run(b.dataset.try)));
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;let rec=null,listening=false,session=false,idleT=0;
if(!SR)mic.title='Voice needs Chrome, Edge or Safari. Type a command instead.';
const IDLE_MS=12000;
function endSession(msg){session=false;clearTimeout(idleT);try{rec&&rec.stop()}catch(e){}mic.setAttribute('aria-pressed','false');if(!busy){setBot('idle');bubble(msg||'',msg?2200:0)}}
function armIdle(){clearTimeout(idleT);idleT=setTimeout(()=>{if(session&&!busy&&!queue.length)endSession('I’ll stop listening now. Tap the mic anytime.')},IDLE_MS)}
function startRec(){rec=new SR();rec.lang='en-IN';rec.interimResults=true;rec.maxAlternatives=3;rec.continuous=true;
 rec.onstart=()=>{listening=true};
 rec.onresult=e=>{armIdle();let live='';for(let i=e.resultIndex;i<e.results.length;i++){const r=e.results[i];
   if(r.isFinal){const t=r[0].transcript.trim();if(t){const alts=[...r].map(a=>a.transcript);inp.value='';bubble('“'+t+'”');run(t,{voice:true,alts})}}else live+=r[0].transcript}
  if(live)inp.value=live};
 rec.onerror=e=>{if(e.error==='no-speech'||e.error==='aborted')return;note.textContent=e.error==='not-allowed'||e.error==='service-not-allowed'?'Microphone access is blocked. Allow it in the address bar, or type a command.':'Voice is unavailable right now. Type a command instead.';note.hidden=false;endSession()};
 rec.onend=()=>{listening=false;if(session){try{startRec()}catch(err){endSession()}}};
 try{rec.start()}catch(e){}}
mic.addEventListener('click',()=>{
 if(!SR){note.textContent='Voice input needs Chrome, Edge or Safari. Type a command instead, it works the same.';note.hidden=false;inp.focus();return}
 if(session){endSession('Okay, stopped listening.');return}
 session=true;note.hidden=true;mic.setAttribute('aria-pressed','true');setBot('listen');bubble('I’m listening! Say commands one after another.');armIdle();startRec()});
bot.addEventListener('click',()=>{if(!busy){setBot('wave');bubble(SR?'Hi, I’m Logi! Tap the mic and say “book now”.':'Hi, I’m Logi! Type “book now” below.',2800);setTimeout(()=>{if(!busy)setBot('idle')},1600)}});
addEventListener('resize',()=>{clearTimeout(dock.t);dock.t=setTimeout(()=>{fit();dock()},150)});
render(0);
setTimeout(()=>{dock();setBot('wave');bubble('Hi, I’m Logi! Say “book now” and I’ll tap it.',4200);setTimeout(()=>{if(!busy)setBot('idle')},1800)},600);
let auto=false;new IntersectionObserver((es,ob)=>{if(es[0].isIntersecting&&!auto){auto=true;ob.disconnect();setTimeout(()=>{if(!busy&&s.view==='home'&&!listening)run('book now')},2800)}},{threshold:.55}).observe(frame);
}

/* =====================================================================
   DESIGN SYSTEM: brand, type, radius, density -> tokens + contrast checks
   ===================================================================== */
const TK=$('#tok');
if(TK){
const PAIRS={editorial:["system-ui,-apple-system,sans-serif","system-ui,-apple-system,sans-serif",'System Sans / Sans'],geometric:["system-ui,-apple-system,sans-serif","system-ui,-apple-system,sans-serif",'System Sans / Sans'],friendly:["system-ui,-apple-system,sans-serif","system-ui,-apple-system,sans-serif",'System Sans / Sans'],technical:["'JetBrains Mono',monospace","system-ui,-apple-system,sans-serif",'JetBrains Mono / Sans']};
const t={brand:'#2F5BEA',pair:'geometric',r:12,dens:1,mode:'light'};
const hex2rgb=h=>{h=h.replace('#','');if(h.length===3)h=h.split('').map(c=>c+c).join('');const n=parseInt(h,16);return [n>>16&255,n>>8&255,n&255]};
const rgb2hex=a=>'#'+a.map(v=>Math.round(Math.max(0,Math.min(255,v))).toString(16).padStart(2,'0')).join('').toUpperCase();
const mix=(a,b,p)=>rgb2hex(hex2rgb(a).map((v,i)=>v+(hex2rgb(b)[i]-v)*p));
const lum=h=>{const c=hex2rgb(h).map(v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)});return .2126*c[0]+.7152*c[1]+.0722*c[2]};
const cr=(a,b)=>{const x=lum(a),y=lum(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
const prev=$('#tp',TK),code=$('#tokCode',TK),scale=$('#tokScale',TK),checks=$('#tokChecks',TK),aa=$('#tokAA',TK);
function apply(){const dark=t.mode==='dark';const b=t.brand;
 const steps=[50,100,200,300,400,500,600,700,800,900];const sc=steps.map((s,i)=>i<5?mix(b,'#FFFFFF',[.92,.82,.64,.42,.2][i]):i===5?b.toUpperCase():mix(b,'#000000',[.18,.36,.54,.7][i-6]));
 const bg=dark?mix(b,'#07090F',.9):mix(b,'#FFFFFF',.965),sf=dark?mix(b,'#0E121C',.86):'#FFFFFF',ink=dark?'#EEF1F8':'#121522',mut=dark?'#9AA3B8':'#5B6175',line=dark?mix(b,'#1A2030',.8):mix(b,'#E6E8EF',.9);
 const on=cr(b,'#FFFFFF')>=cr(b,'#111111')?'#FFFFFF':'#111111';const pf=PAIRS[t.pair];const sp=t.dens;
 const V={'--t-brand':b,'--t-on':on,'--t-bg':bg,'--t-sf':sf,'--t-ink':ink,'--t-mut':mut,'--t-line':line,'--t-soft':dark?mix(b,'#000000',.55):sc[1],'--t-r':t.r+'px','--t-sp':sp,'--t-fd':pf[0],'--t-fb':pf[1]};
 for(const k in V)prev.style.setProperty(k,V[k]);
 scale.innerHTML=sc.map((c,i)=>`<i style="background:${c}" title="brand-${steps[i]} ${c}"><span style="color:${cr(c,'#FFFFFF')>cr(c,'#111111')?'#fff':'#111'}">${steps[i]}</span></i>`).join('');
 code.textContent=`:root {\n  --color-brand: ${b.toUpperCase()};\n  --color-on-brand: ${on};\n  --color-bg: ${bg};\n  --color-surface: ${sf};\n  --color-text: ${ink};\n  --color-muted: ${mut};\n  --radius-md: ${t.r}px;\n  --radius-lg: ${Math.round(t.r*1.6)}px;\n  --space-unit: ${Math.round(8*sp)}px;\n  --font-display: ${pf[2].split(' / ')[0]};\n  --font-body: ${pf[2].split(' / ')[1]};\n}`;
 const C=[['Button text on brand',on,b,4.5],['Body text on background',ink,bg,4.5],['Muted text on surface',mut,sf,4.5],['Brand as text on surface',b,sf,3]];
 let ok=0;checks.innerHTML=C.map(([n,f,g,min])=>{const r=cr(f,g);const p=r>=min;if(p)ok++;return `<div class="${p?'pass':'fail'}"><i style="background:${g};color:${f}">Aa</i><span>${n}<small>${r.toFixed(2)}:1 · needs ${min}:1</small></span><b>${p?'AA ✓':'Fails'}</b></div>`}).join('');
 aa.textContent=`WCAG AA · ${ok}/${C.length} pass`;
 $$('[data-brand]',TK).forEach(x=>x.setAttribute('aria-pressed',x.dataset.brand.toLowerCase()===b.toLowerCase()));
 $$('[data-pair]',TK).forEach(x=>x.setAttribute('aria-pressed',x.dataset.pair===t.pair));
 $$('[data-dens]',TK).forEach(x=>x.setAttribute('aria-pressed',+x.dataset.dens===t.dens));
 $$('[data-tmode]',TK).forEach(x=>x.setAttribute('aria-pressed',x.dataset.tmode===t.mode));
 $('#tokROut',TK).textContent=t.r+'px';}
TK.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
 if(b.dataset.brand){t.brand=b.dataset.brand;$('#tokColor',TK).value=t.brand}
 else if(b.dataset.pair)t.pair=b.dataset.pair;else if(b.dataset.dens)t.dens=+b.dataset.dens;else if(b.dataset.tmode)t.mode=b.dataset.tmode;else return;apply()});
$('#tokColor',TK).addEventListener('input',e=>{t.brand=e.target.value;apply()});
$('#tokR',TK).addEventListener('input',e=>{t.r=+e.target.value;apply()});
apply();
}
})();
