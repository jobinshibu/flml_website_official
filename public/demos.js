/* Live capability demos. Each block initialises only if its markup is on the page. No dependencies. */
(()=>{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const fitCanvas=(c)=>{const r=c.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,2);c.width=r.width*d;c.height=r.height*d;const x=c.getContext('2d');x.setTransform(d,0,0,d,0,0);return [x,r.width,r.height]};
const wait=t=>new Promise(r=>setTimeout(r,RM?0:t));

/* ---------- HERO: logo assembles, scatters into a live network, re-forms ---------- */
(()=>{const cv=$('#net');if(!cv)return;const cx=cv.getContext('2d');let W,H,parts=[],pk=[],mouse={x:-9999,y:-9999},logo=null,linkR=12,phase='form',phaseT=performance.now();
 const BLUE='91,147,255',HI='150,186,255',AMBER='255,176,46',DUR={form:6500,hold:4500,scatter:10000};
 function targets(){const S=360,ar=logo.width/logo.height,ow=S,oh=Math.round(S/ar),o=document.createElement('canvas');o.width=ow;o.height=oh;const g=o.getContext('2d');g.drawImage(logo,0,0,ow,oh);const d=g.getImageData(0,0,ow,oh).data;
  const desk=W>900,bw=desk?Math.min(W*.3,H*.7*ar):Math.min(W*.86,H*.45*ar),bh=bw/ar,ox=desk?W*.79-bw/2:W/2-bw/2,oy=desk?H*.36-bh/2:H*.52-bh/2,sc=bw/ow;
  const want=desk?720:380;let n=0;for(let i=3;i<d.length;i+=4)if(d[i]>120)n++;const st=Math.max(2,Math.round(Math.sqrt(n/want)));const T=[];
  for(let y=0;y<oh;y+=st)for(let x=0;x<ow;x+=st)if(d[(y*ow+x)*4+3]>120)T.push({x:ox+(x+(Math.random()-.5)*st*.6)*sc,y:oy+(y+(Math.random()-.5)*st*.6)*sc});linkR=st*sc*1.9;return T}
 function rebuild(){const T=targets();parts=T.map((t,i)=>{const p=parts[i]||{x:Math.random()*W,y:Math.random()*H,vx:0,vy:0,dx:0,dy:0};p.tx=t.x;p.ty=t.y;if(RM){p.x=t.x;p.y=t.y}return p})}
 function size(){const r=cv.getBoundingClientRect(),dp=Math.min(devicePixelRatio||1,2);W=r.width;H=r.height;cv.width=W*dp;cv.height=H*dp;cx.setTransform(dp,0,0,dp,0,0);if(logo)rebuild()}
 function setPhase(p){phase=p;phaseT=performance.now();if(p==='scatter')parts.forEach(q=>{const a=Math.atan2(q.y-H*.46,q.x-W*.7)+(Math.random()-.5)*1.2,f=1.2+Math.random()*2.2;q.vx=Math.cos(a)*f;q.vy=Math.sin(a)*f;q.dx=(Math.random()-.5)*.35;q.dy=(Math.random()-.5)*.35})}
 const im=new Image();im.onload=()=>{logo=im;size();setPhase('form');if(RM)draw(performance.now())};im.src=cv.dataset.logo;
 addEventListener('resize',()=>{clearTimeout(size.t);size.t=setTimeout(size,150)});
 const host=cv.parentElement;host.addEventListener('pointermove',e=>{const r=cv.getBoundingClientRect();mouse.x=e.clientX-r.left;mouse.y=e.clientY-r.top});host.addEventListener('pointerleave',()=>{mouse.x=mouse.y=-9999});
 host.addEventListener('click',e=>{if(e.target.closest('a,button'))return;setPhase(phase==='scatter'?'form':'scatter')});
 let vis=true;new IntersectionObserver(es=>{vis=es[0].isIntersecting}).observe(cv);
 function draw(t){if(!W||!parts.length)return;const el=t-phaseT;
  if(!RM){if(phase==='form'&&el>DUR.form)setPhase('hold');else if(phase==='hold'&&el>DUR.hold)setPhase('scatter');else if(phase==='scatter'&&el>DUR.scatter)setPhase('form')}
  cx.clearRect(0,0,W,H);const fade=W>900?1:.35,free=phase==='scatter';
  for(const p of parts){const mx=p.x-mouse.x,my=p.y-mouse.y,m2=mx*mx+my*my;
   if(free){p.vx*=.985;p.vy*=.985;p.x+=p.vx+p.dx;p.y+=p.vy+p.dy;if(p.x<0||p.x>W){p.dx*=-1;p.vx*=-1;p.x=Math.max(0,Math.min(W,p.x))}if(p.y<0||p.y>H){p.dy*=-1;p.vy*=-1;p.y=Math.max(0,Math.min(H,p.y))}if(m2<25600){p.x+=(mouse.x-p.x)*.006;p.y+=(mouse.y-p.y)*.006}}
   else{if(m2<7000){const f=(7000-m2)/7000*2.2,d=Math.sqrt(m2)||1;p.vx+=mx/d*f;p.vy+=my/d*f}const k=phase==='form'?.0025+Math.min(1,el/DUR.form)*.012:.03,damp=phase==='form'?.9:.82;
    p.vx+=(p.tx-p.x)*k;p.vy+=(p.ty-p.y)*k;p.vx*=damp;p.vy*=damp;p.x+=p.vx;p.y+=p.vy;if(phase==='hold'){p.x+=Math.sin(t/700+p.tx)*.08;p.y+=Math.cos(t/800+p.ty)*.08}}}
  const R=free?40+80*Math.min(1,el/2500):linkR,grid=new Map();parts.forEach((p,i)=>{const k=(p.x/R|0)+','+(p.y/R|0);let a=grid.get(k);if(!a)grid.set(k,a=[]);a.push(i)});
  const L=[],cap=free?4:6;cx.lineWidth=.75;
  for(let i=0;i<parts.length;i++){const p=parts[i],gx=p.x/R|0,gy=p.y/R|0;let n=0;
   for(let ax=-1;ax<=1&&n<cap;ax++)for(let ay=-1;ay<=1&&n<cap;ay++){const c=grid.get((gx+ax)+','+(gy+ay));if(!c)continue;
    for(const j of c){if(j<=i)continue;const q=parts[j],d=Math.hypot(p.x-q.x,p.y-q.y);if(d<R){const near=free&&Math.min(Math.hypot(p.x-mouse.x,p.y-mouse.y),Math.hypot(q.x-mouse.x,q.y-mouse.y))<150;
     cx.strokeStyle=near?`rgba(${AMBER},${.5*(1-d/R)*fade})`:`rgba(${BLUE},${(free?.3:.55)*(1-d/R)*fade})`;cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(q.x,q.y);cx.stroke();L.push([i,j]);if(++n>=cap)break}}}}
  if(L.length&&!RM)for(let k=0;k<2;k++)if(Math.random()<.6){const [i,j]=L[Math.random()*L.length|0];pk.push({i,j,p:0,s:.025+Math.random()*.035})}
  pk=pk.filter(q=>(q.p+=q.s)<1);for(const q of pk){const a=parts[q.i],b=parts[q.j];if(!a||!b)continue;cx.fillStyle=`rgba(${AMBER},${.9*fade})`;cx.fillRect(a.x+(b.x-a.x)*q.p-1.2,a.y+(b.y-a.y)*q.p-1.2,2.4,2.4)}
  for(const p of parts){const sp=Math.min(1,Math.hypot(p.vx,p.vy)/5);cx.fillStyle=`rgba(${phase==='hold'?HI:BLUE},${(.6+.4*(1-sp))*fade})`;cx.beginPath();cx.arc(p.x,p.y,free?1.7:1.5,0,6.283);cx.fill()}}
 function loop(t){if(vis)draw(t);requestAnimationFrame(loop)}if(!RM)requestAnimationFrame(loop);
})();

/* ---------- ARCHITECTURE PLANNER ---------- */
(()=>{const svg=$('#archSvg');if(!svg)return;const USERS=['1k','10k','100k','1M','10M'];
 const feat={payments:true,offline:false,realtime:false,ai:false,tenant:false,desktop:false,pos:false,web3:false};let prev=new Set();
 function model(){const u=+$('#users').value,big=u>=2,huge=u>=3,C=[],E=[],S=[],D=[],log=[];
  C.push(['mob','Mobile apps','Android · iOS'],['web','Web app','responsive · PWA']);
  if(feat.desktop)C.push(['desk','Desktop apps','Windows · macOS']);if(feat.pos)C.push(['pos','POS terminals','retail · hospitality']);if(feat.tenant)C.push(['adm','Tenant console','per-org admin']);if(feat.web3)C.push(['wal','Wallet / dApp','web3 connect']);
  E.push(['gw','API gateway','auth · rate limits']);if(big)E.push(['lb','Load balancer','L7 · health checks']);if(huge)E.push(['cdn','CDN / edge','static + cached API']);
  S.push(['auth','Auth service','tokens · OTP · roles'],['core','Core API','business logic']);
  if(feat.payments)S.push(['pay','Payments service','UPI · cards · webhooks']);if(feat.realtime)S.push(['rt','Realtime service','WebSocket · WebRTC/TURN']);if(feat.ai)S.push(['ai','AI service','LLM · RAG · guardrails']);
  if(feat.tenant)S.push(['ten','Tenant manager','isolation · billing']);if(feat.desktop||feat.pos)S.push(['sync','Sync engine',feat.pos?'outlets ⇄ cloud':'desktop ⇄ cloud']);if(feat.pos)S.push(['inv','Inventory & billing','multi-outlet · tax']);if(feat.web3)S.push(['chain','Chain service','contracts · indexer']);
  const doc=u<=1&&!feat.tenant;D.push([doc?'doc':'pg',doc?'Document DB':'PostgreSQL',doc?'managed · realtime':(huge?'primary + read replicas':'managed · backups')]);
  if(big)D.push(['cache','Redis cache','hot reads · sessions']);if(feat.payments||big)D.push(['q','Event queue','async · retries']);if(feat.ai)D.push(['vec','Vector index','embeddings']);
  if(feat.offline||feat.desktop||feat.pos)D.push(['local','On-device DB','encrypted · offline sync']);if(feat.web3)D.push(['ledger','Blockchain','on-chain state']);D.push(['obj','Object storage','files · media']);
  log.push(`Sized for ${USERS[u]} users: ${['single region, managed services, low fixed cost','single region with autoscaling','load-balanced, cached, asynchronous processing','multi-zone, read replicas, CDN at the edge','multi-region active-active, sharded data'][u]}.`);
  log.push(doc?'A managed document database keeps the first version fast to ship and cheap to run.':'PostgreSQL for relational integrity'+(feat.tenant?' with row-level security per tenant.':' and reporting.'));
  if(big)log.push('Redis absorbs repeated reads so the database scales with writes, not views.');if(feat.payments)log.push('Payments isolated in their own service; every charge carries an idempotency key.');
  if(feat.offline)log.push('Offline-first: writes land on the device and sync when the network returns.');if(feat.realtime)log.push('Realtime over WebSockets; calls via WebRTC with TURN relays for strict networks.');
  if(feat.ai)log.push('AI behind its own service with retrieval, output validation and cost limits.');if(feat.tenant)log.push('Tenancy enforced in the data layer, so one organisation can never read another.');
  if(feat.desktop)log.push('Windows and macOS apps share business logic with mobile and sync through one engine.');if(feat.pos)log.push('POS terminals keep selling offline; sales and stock reconcile across outlets when the network returns.');
  if(feat.web3)log.push('Only trust-critical state goes on-chain; an indexer mirrors chain events for fast queries.');
  return {cols:[['CLIENTS',C],['EDGE',E],['SERVICES',S],['DATA',D]],log,tier:Math.min(5,1+u+((feat.realtime||feat.ai||feat.web3)?1:0))}}
 function draw(){const m=model(),X=[18,240,462,684],w=198,h=44,pos={},ids=new Set();let out='';
  m.cols.forEach(([n,items],ci)=>{out+=`<text class="colhead" x="${X[ci]}" y="22">${n}</text>`;const gap=Math.min(56,370/Math.max(items.length,1)),top=40+(380-gap*items.length)/2;items.forEach(([id],i)=>{pos[id]={x:X[ci],y:top+i*gap};ids.add(id)})});
  let e='';for(let ci=0;ci<3;ci++){const a=m.cols[ci][1],b=m.cols[ci+1][1];a.forEach((na,i)=>b.forEach((nb,j)=>{if(ci===0&&j>0&&nb[0]!=='lb'&&nb[0]!=='cdn')return;if(ci===1&&i!==a.length-1)return;if(ci===2&&Math.abs(i/a.length-j/b.length)>=.42)return;
   const p=pos[na[0]],q=pos[nb[0]],x1=p.x+w,y1=p.y+h/2,x2=q.x,y2=q.y+h/2,mx=(x1+x2)/2,d=`M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;e+=`<path class="edge" d="${d}"/><path class="flow" d="${d}" style="animation-delay:${-(i+j)*.3}s"/>`}))}
  let nd='';m.cols.forEach(([,it])=>it.forEach(([id,t,s])=>{const p=pos[id],nw=prev.size&&!prev.has(id);nd+=`<g class="node${nw?' new':''}"><rect x="${p.x}" y="${p.y}" width="${w}" height="${h}" rx="4"/><text x="${p.x+12}" y="${p.y+19}">${esc(t)}</text><text class="sub" x="${p.x+12}" y="${p.y+34}">${esc(s)}</text></g>`}));
  svg.innerHTML=out+e+nd;prev=ids;$('#archCount').textContent=ids.size+' components';$('#archLog').innerHTML=m.log.map(l=>`<div>${esc(l)}</div>`).join('');
  $('#tier').innerHTML=[1,2,3,4,5].map(i=>`<i class="${i<=m.tier?'on':''}"></i>`).join('');$('#tierName').textContent=['','Starter · managed services','Growth · autoscaling','Scale · load balancing, cache, queue','Enterprise · multi-zone','Global · multi-region'][m.tier];$('#usersOut').textContent=USERS[$('#users').value]}
 $('#users').addEventListener('input',draw);$$('#feat .chip').forEach(b=>b.addEventListener('click',()=>{feat[b.dataset.f]=!feat[b.dataset.f];b.setAttribute('aria-pressed',feat[b.dataset.f]);draw()}));draw();
})();

/* ---------- AI BLUEPRINT ---------- */
(()=>{const bp=$('#bp');if(!bp)return;let sample=null,ctl=null;const endpoint=bp.dataset.endpoint||'';
 const EX={summary:'A two-sided booking platform: patients book home physiotherapy, therapists receive routed visits, and admins control schedules and payouts, in Arabic and English.',
  modules:[{name:'Patient app',purpose:'Book, reschedule and pay for home visits in Arabic or English.'},{name:'Therapist app',purpose:'Daily route, visit notes and check-in at the patient’s door.'},{name:'Scheduling engine',purpose:'Matches therapist skills, zones and availability to requests.'},{name:'Payments & payouts',purpose:'Card payments, invoices and therapist settlements.'},{name:'Admin console',purpose:'Roster, pricing, approvals and reports.'},{name:'Notifications',purpose:'SMS, push and WhatsApp reminders before each visit.'}],
  stack:{mobile:'iOS & Android, RTL layouts',backend:'Node.js services',data:'PostgreSQL + analytics warehouse',infra:'Cloud, maps & routing APIs'},
  phases:[{name:'Blueprint',weeks:2,deliverable:'Flows, data model, architecture'},{name:'Core build',weeks:8,deliverable:'Both apps + scheduling'},{name:'Payments & admin',weeks:4,deliverable:'Payouts, console, reports'},{name:'Launch',weeks:2,deliverable:'QA, store release, training'}],
  risks:['Routing across city traffic needs zone-based scheduling.','Bilingual right-to-left layouts must be designed in from the start.','Payment gateway approval timelines in the target country.']};
 function render(b,label){const st=b.stack||{};bp.innerHTML=`<p class="bp-sum">${esc(b.summary||'')}</p><div><div class="mini-eb">Modules</div><div class="bp-grid">${(b.modules||[]).map((m,i)=>`<div class="mod" style="animation-delay:${i*60}ms"><b>${esc(m.name)}</b><span>${esc(m.purpose)}</span></div>`).join('')}</div></div>
  <div><div class="mini-eb">Stack</div><div class="stackrow">${['mobile','backend','data','infra'].map(k=>`<div>${k}<b>${esc(st[k]||'—')}</b></div>`).join('')}</div></div>
  <div><div class="mini-eb">Delivery plan · ${(b.phases||[]).reduce((s,p)=>s+(+p.weeks||0),0)} weeks</div><div class="phases">${(b.phases||[]).map((p,i)=>`<div class="phase" style="animation-delay:${i*90}ms;flex-grow:${+p.weeks||1}"><em>${+p.weeks||'?'} wk</em><b>${esc(p.name)}</b>${esc(p.deliverable||'')}</div>`).join('')}</div></div>
  <div><div class="mini-eb">Risks to plan for</div><div class="risks">${(b.risks||[]).map(r=>`<div>${esc(r)}</div>`).join('')}</div></div>`;$('#bpStatus').textContent=label}
 render(EX,'example');
 function local(t){const s=t.toLowerCase(),has=(...k)=>k.some(x=>s.includes(x)),m=[];
  if(has('book','appointment','visit','slot'))m.push({name:'Booking engine',purpose:'Availability, slots, reschedules and reminders.'});if(has('erp','inventory','stock','outlet','branch'))m.push({name:'Inventory & branches',purpose:'Stock per location, transfers and reorder levels.'});
  if(has('bill','pos','restaurant','retail'))m.push({name:'POS & billing',purpose:'Point of sale, invoicing, tax and daily reports.'});if(has('pay','upi','invoice','payout'))m.push({name:'Payments',purpose:'Gateway integration, invoices and reconciliation.'});
  if(has('ai','agent','call','voice','chat'))m.push({name:'AI agent',purpose:'Conversational agent with transcripts and human handoff.'});if(has('crm','lead'))m.push({name:'CRM pipeline',purpose:'Leads, stages, follow-ups and assignment.'});
  if(has('crypto','blockchain','token','wallet','nft'))m.push({name:'Blockchain layer',purpose:'Smart contracts, wallets and on-chain events.'});if(has('construction','site','project'))m.push({name:'Project costing',purpose:'Budgets vs actuals per site and material requests.'});
  if(has('offline'))m.push({name:'Offline sync',purpose:'On-device data that syncs when online.'});m.push({name:'Admin console',purpose:'Roles, approvals, reports and settings.'},{name:'Apps',purpose:'Android, iOS and web clients for staff and customers.'});
  return {summary:'Draft blueprint generated in your browser from keywords in the brief. Talk to our architects for a full plan.',modules:m.slice(0,7),stack:{mobile:'Android · iOS · web',backend:'Node.js services',data:has('erp','construction','restaurant','retail')?'PostgreSQL':'Managed document DB',infra:has('offline')?'Cloud + on-site sync':'Cloud, autoscaling'},
   phases:[{name:'Blueprint',weeks:2,deliverable:'Architecture and flows'},{name:'Build',weeks:m.length+3,deliverable:'Core modules'},{name:'Launch',weeks:2,deliverable:'QA and rollout'}],risks:['Scope must be fixed in the blueprint phase.','Integrations depend on third-party API access.','Data migration from existing systems.']}}
 const PROMPT=b=>`You are a senior solution architect at First Logic Meta Lab, a software engineering company in Kerala, India (Android, iOS, Windows, macOS and web apps, cloud backends, AI solutions, bots, blockchain, SaaS and enterprise ERP).
Turn this client brief into a concise technical blueprint. Reply with ONLY a JSON object:
{"summary": string (1-2 sentences), "modules": [{"name": string, "purpose": string (max 14 words)}] (5-7), "stack": {"mobile": string, "backend": string, "data": string, "infra": string}, "phases": [{"name": string, "weeks": number, "deliverable": string (max 6 words)}] (3-4), "risks": [string (max 16 words)] (3)}
Be specific to the brief. No marketing language.

Brief:
${b.slice(0,3000)}`;
 (async()=>{try{sample=window.claude?await window.claude.use('sample'):null}catch(e){sample=null}$('#aiMode').textContent=endpoint?'connected to model':sample?'live model connected':'browser demo mode';})();
 $$('#presets .chip').forEach(b=>b.addEventListener('click',()=>{$('#brief').value=b.dataset.brief}));
 $('#stopGen').addEventListener('click',()=>ctl&&ctl.abort());
 $('#gen').addEventListener('click',async()=>{const brief=$('#brief').value.trim();if(!brief)return;const g=$('#gen'),tr=$('#trace');g.disabled=true;$('#bpStatus').innerHTML='<span class="thinking"><i></i><i></i><i></i> architecting</span>';
  if(endpoint){ctl=new AbortController();$('#stopGen').hidden=false;tr.textContent='sending brief to the model…';
   try{const r=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({brief}),signal:ctl.signal});const j=await r.json();if(!r.ok||!Array.isArray(j.modules))throw 0;render(j,'generated by model');tr.textContent='done'}
   catch(e){render(local(brief),'browser draft');tr.textContent='model unavailable; showing a browser draft'}finally{g.disabled=false;$('#stopGen').hidden=true}return}
  if(!sample){tr.textContent='browser demo: scanning the brief for domain signals…';setTimeout(()=>{render(local(brief),'browser draft');g.disabled=false},600);return}
  ctl=new AbortController();$('#stopGen').hidden=false;tr.textContent='thinking…';
  try{const b=await sample.json(PROMPT(brief),{signal:ctl.signal,onText:({text})=>{tr.textContent=text.slice(-600)}});if(!b||!Array.isArray(b.modules))throw {code:'invalid_json'};render(b,'generated by model')}
  catch(e){if(e.code==='cancelled')$('#bpStatus').textContent='stopped';else if(['not_granted','sampling_disabled','not_declared','capability_disabled','capability_removed'].includes(e.code)){sample=null;$('#aiMode').textContent='browser demo mode';render(local(brief),'browser draft')}else $('#bpStatus').textContent='model busy, try again'}
  finally{g.disabled=false;$('#stopGen').hidden=true}});
})();

/* ---------- PLATFORMS ---------- */
(()=>{const dev=$('#dev');if(!dev)return;const app={plat:'ios',view:'home',svc:null,slot:null};
 const SV=[['Home consultation','45 min · ₹1,200'],['Wellness session','60 min · ₹800'],['Video consultation','20 min'],['Rehab programme','8 sessions']],SL=['09:00','10:30','12:00','14:00','15:30','17:00'],TK=new Set(['12:00','17:00']);
 const TR={home:['App','└ Screen<Home>','  ├ NavBar("Book a visit")','  └ ServiceList','    └ ServiceCard × 4  ◂ tap'],slots:['App','└ Screen<Slots>','  ├ NavBar(back)','  └ Stack','    ├ Heading(service)','    ├ SlotGrid  ◂ select','    └ PrimaryButton(confirm)'],done:['App','└ Screen<Done>','  └ Center','    ├ AnimatedCheck  ◂ played','    └ Text(booking id)']};
 function r(){dev.className='dev '+app.plat;const ab=$('#appbar'),sc=$('#screen');
  if(app.view==='home'){ab.innerHTML='<strong class="ttl">Book a visit</strong>';sc.innerHTML=SV.map((s,i)=>`<button class="svc" data-i="${i}"><span>${s[0]}<small>${s[1]}</small></span><span aria-hidden="true">›</span></button>`).join('');sc.querySelectorAll('.svc').forEach(b=>b.onclick=()=>{app.svc=+b.dataset.i;app.slot=null;app.view='slots';r()})}
  if(app.view==='slots'){ab.innerHTML='<button class="back" id="pBack">‹ Back</button>';sc.innerHTML=`<div class="full" style="font:700 18px var(--f-sans)">${SV[app.svc][0]}</div><div class="full" style="font-size:13px;color:#6A7388">Tomorrow · choose a time</div><div class="slots full">${SL.map(t=>`<button class="slot" ${TK.has(t)?'disabled':''} aria-pressed="${app.slot===t}">${t}</button>`).join('')}</div><button class="pbtn full" id="pConf" ${app.slot?'':'disabled'}>Confirm ${app.slot||''}</button>`;
   $('#pBack').onclick=()=>{app.view='home';r()};sc.querySelectorAll('.slot').forEach(b=>b.onclick=()=>{app.slot=b.textContent;r()});$('#pConf').onclick=()=>{app.view='done';r()}}
  if(app.view==='done'){ab.innerHTML='<strong class="ttl">Booked</strong>';sc.innerHTML=`<div class="done full"><div class="tick"><svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"/></svg></div><div style="font:700 20px var(--f-sans)">You're booked</div><div style="font-size:13px;color:#6A7388;margin-top:6px">${SV[app.svc][0]} · tomorrow ${app.slot}</div><button class="pbtn" id="pAgain" style="margin-top:24px">Book another</button></div>`;$('#pAgain').onclick=()=>{app.view='home';r()}}
  $('#tree').innerHTML=TR[app.view].map(l=>l.includes('◂')?`<span class="hot">${esc(l)}</span>`:esc(l)).join('\n');$('#stateName').textContent='state: '+app.view+' · '+app.plat}
 $$('#plat .chip').forEach(b=>b.addEventListener('click',()=>{app.plat=b.dataset.p;$$('#plat .chip').forEach(x=>x.setAttribute('aria-pressed',x===b));r()}));r();
})();

/* ---------- SCALE CONSOLE ---------- */
(()=>{const ch=$('#chart');if(!ch)return;const N=60;let rps=Array.from({length:N},()=>820+Math.random()*80),lat=Array.from({length:N},()=>58+Math.random()*10),pods=2,load=850,spike=0;
 function chart(){const [c,w,h]=fitCanvas(ch);if(!w)return;const pl=44,pr=44,pt=16,pb=24,mR=4000,mL=400;c.font='10px "JetBrains Mono",monospace';c.textBaseline='middle';
  for(let i=0;i<=4;i++){const y=pt+(h-pt-pb)*i/4;c.strokeStyle='#1A2540';c.beginPath();c.moveTo(pl,y);c.lineTo(w-pr,y);c.stroke();c.fillStyle='#5D6A86';c.textAlign='right';c.fillText(Math.round(mR*(1-i/4)),pl-6,y);c.textAlign='left';c.fillText(Math.round(mL*(1-i/4)),w-pr+6,y)}
  const yT=pt+(h-pt-pb)*(1-120/mL);c.setLineDash([4,4]);c.strokeStyle='rgba(61,220,151,.5)';c.beginPath();c.moveTo(pl,yT);c.lineTo(w-pr,yT);c.stroke();c.setLineDash([]);c.fillStyle='rgba(61,220,151,.85)';c.fillText('target 120 ms',pl+6,yT-8);
  const plot=(a,mx,col,fill)=>{c.beginPath();a.forEach((v,i)=>{const x=pl+(w-pl-pr)*i/(N-1),y=pt+(h-pt-pb)*(1-Math.min(v,mx)/mx);i?c.lineTo(x,y):c.moveTo(x,y)});c.strokeStyle=col;c.lineWidth=1.8;c.stroke();if(fill){c.lineTo(w-pr,h-pb);c.lineTo(pl,h-pb);c.closePath();c.fillStyle=fill;c.fill()}c.fillStyle=col;c.beginPath();c.arc(w-pr,pt+(h-pt-pb)*(1-Math.min(a[N-1],mx)/mx),3.5,0,7);c.fill()};
  plot(rps,mR,'#5B93FF','rgba(91,147,255,.10)');plot(lat,mL,'#FFB02E');c.fillStyle='#5D6A86';c.textAlign='left';c.fillText('−60 s',pl,h-8);c.textAlign='right';c.fillText('now',w-pr,h-8)}
 const EV=['POST /v1/bookings 201','GET /v1/slots 200','POST /v1/payments 202','webhook payment.captured ✓','WS presence.join','GET /v1/catalog 200 (cache hit)','POST /v1/orders 201','POST /v1/ai/complete 200','POST /v1/auth/otp 200','GET /v1/reports/daily 200'];
 const feed=$('#feed');function push(t,col){const d=document.createElement('div');d.innerHTML=`<span style="color:var(--ink-dim)">${new Date().toTimeString().slice(0,8)}</span> <span style="color:${col||'var(--ink-muted)'}">${esc(t)}</span>`;feed.prepend(d);while(feed.children.length>16)feed.lastChild.remove()}
 function tick(){load+=((spike>0?3300:850)-load)*.18+(Math.random()-.5)*60;if(spike>0)spike--;const util=load/(pods*520),l=48+Math.max(0,util-.6)*260+Math.random()*8;
  if(util>.82&&pods<12){pods++;push(`autoscaler: +1 instance → ${pods} (utilisation ${util*100|0}%)`,'var(--signal)')}else if(util<.35&&pods>2&&Math.random()<.3){pods--;push(`autoscaler: −1 instance → ${pods}`,'var(--brand-ink)')}
  rps.push(load);rps.shift();lat.push(l);lat.shift();if(!$('#kRps')) return; $('#kRps').textContent=Math.round(load).toLocaleString('en-IN');$('#kRpsD').textContent=spike>0?'spike in progress':'steady';
  $('#kLat').textContent=Math.round(l)+' ms';const k=$('#kLatD');k.textContent=l>120?'over target · scaling':'under 120 ms target';k.style.color=l>120?'var(--bad-ink)':'var(--ok-ink)';$('#kErr').textContent=(util>1.05?Math.min(3,(util-1)*8):0).toFixed(1)+'%';$('#kPods').textContent=pods;
  if(Math.random()<.7)push(EV[Math.random()*EV.length|0]);$('#pods').innerHTML=Array.from({length:12},(_,i)=>`<div class="pod ${i<pods?(load/pods>1100?'on hot':'on'):''}">${i<pods?'p'+(i+1):''}</div>`).join('');chart()}
 $('#spike').addEventListener('click',()=>{spike=26;push('traffic spike: 4× normal load','var(--bad-ink)')});tick();setInterval(tick,RM?2000:700);addEventListener('resize',chart);
})();

/* ---------- BLOCKCHAIN ---------- */
(()=>{const box=$('#chain');if(!box)return;
 function sha256(a){const rr=(v,n)=>(v>>>n)|(v<<(32-n)),K=[],Hh=[];let pc=0;const isC={};for(let c=2;pc<64;c++){if(!isC[c]){for(let i=0;i<313;i+=c)isC[i]=c;Hh[pc]=(Math.pow(c,.5)*4294967296)|0;K[pc++]=(Math.pow(c,1/3)*4294967296)|0}}
  const h=Hh.slice(0,8),b=unescape(encodeURIComponent(a)),w=[],L=b.length*8;let m=b+'\x80';while(m.length%64-56)m+='\x00';for(let i=0;i<m.length;i++)w[i>>2]|=m.charCodeAt(i)<<((3-i)%4)*8;w[w.length]=(L/4294967296)|0;w[w.length]=L;
  for(let j=0;j<w.length;){const W=w.slice(j,j+=16),o=h.slice(0);for(let i=0;i<64;i++){const w15=W[i-15],w2=W[i-2],A=h[0],E=h[4];const t1=h[7]+(rr(E,6)^rr(E,11)^rr(E,25))+((E&h[5])^((~E)&h[6]))+K[i]+(W[i]=(i<16)?W[i]:(W[i-16]+(rr(w15,7)^rr(w15,18)^(w15>>>3))+W[i-7]+(rr(w2,17)^rr(w2,19)^(w2>>>10)))|0);
   const t2=(rr(A,2)^rr(A,13)^rr(A,22))+((A&h[1])^(A&h[2])^(h[1]&h[2]));h.unshift((t1+t2)|0);h[4]=(h[4]+t1)|0;h.pop()}for(let i=0;i<8;i++)h[i]=(h[i]+o[i])|0}
  return h.map(x=>(x>>>0).toString(16).padStart(8,'0')).join('')}
 const D='000',B=['genesis','Asha → Ravi: 2.5 ETH','Ravi → Store: 120 USDT','Store → Supplier: 0.8 ETH'].map((d,i)=>({i,data:d,nonce:0,prev:'',hash:''}));
 const hashOf=b=>sha256(b.i+'|'+b.prev+'|'+b.data+'|'+b.nonce),mine=b=>{b.nonce=0;for(;;){b.hash=hashOf(b);if(b.hash.startsWith(D))return;b.nonce++}};
 const relink=()=>B.forEach(b=>{b.prev=b.i?B[b.i-1].hash:'0'.repeat(64);b.hash=hashOf(b)}),valid=b=>b.hash.startsWith(D)&&(b.i===0||b.prev===B[b.i-1].hash);
 B.forEach(b=>{b.prev=b.i?B[b.i-1].hash:'0'.repeat(64);mine(b)});
 function render(focus){let h='';B.forEach((b,k)=>{let ok=true;for(let x=0;x<=k;x++)if(!valid(B[x]))ok=false;if(k)h+=`<span class="link ${ok?'':'bad'}" aria-hidden="true"></span>`;
  h+=`<div class="blk ${ok?'':'bad'}"><div class="k">block #${b.i} · nonce ${b.nonce}</div><label class="k" for="bd${b.i}">data</label><input id="bd${b.i}" data-i="${b.i}" value="${esc(b.data)}"><div><div class="k">prev</div><div class="v">${b.prev.slice(0,22)}…</div></div><div><div class="k">hash</div><div class="v h">${b.hash.slice(0,22)}…</div></div><button data-m="${b.i}">${ok?'✓ valid':'Mine block'}</button></div>`});
  box.innerHTML=h;const bad=B.filter(b=>!valid(b)).length,st=$('#chainStat');st.textContent=bad?`${bad} invalid block${bad>1?'s':''} · tampering detected`:'chain valid';st.style.color=bad?'var(--bad-ink)':'var(--ok-ink)';
  $$('#chain input').forEach(inp=>inp.addEventListener('input',()=>{B[+inp.dataset.i].data=inp.value;relink();render(inp.id)}));
  $$('#chain button').forEach(btn=>btn.addEventListener('click',()=>{const b=B[+btn.dataset.m];if(valid(b))return;btn.textContent='mining…';setTimeout(()=>{const t0=performance.now();mine(b);for(let x=b.i+1;x<B.length;x++){B[x].prev=B[x-1].hash;B[x].hash=hashOf(B[x])}render();if(!B.some(v=>!valid(v)))$('#chainStat').textContent=`chain valid · mined in ${b.nonce.toLocaleString('en-IN')} tries (${Math.round(performance.now()-t0)} ms)`},30)}));
  if(focus){const f=document.getElementById(focus);if(f){f.focus();f.setSelectionRange(f.value.length,f.value.length)}}}
 render();
})();

/* ---------- TRADING BOT (simulated) ---------- */
(()=>{const cv=$('#candles');if(!cv)return;let bars=[],trades=[],run=true,cash=1e4,qty=0,nt=0,last=100;
 const nb=()=>{const o=last,c=Math.max(5,o+(Math.random()-.5)*1.8+Math.sin(bars.length/18)*.12),hi=Math.max(o,c)+Math.random()*.6,lo=Math.min(o,c)-Math.random()*.6;last=c;return{o,h:hi,l:lo,c}};
 const sma=(n,k)=>{const a=bars.slice(Math.max(0,k-n+1),k+1).map(b=>b.c);return a.reduce((x,y)=>x+y,0)/a.length};
 const lg=$('#tlog');function log(t,c){const d=document.createElement('div');d.innerHTML=`<span style="color:var(--ink-dim)">${new Date().toTimeString().slice(0,8)}</span> <span class="${c||''}">${t}</span>`;lg.prepend(d);while(lg.children.length>12)lg.lastChild.remove()}
 function reset(){bars=[];trades=[];cash=1e4;qty=0;nt=0;last=100;for(let i=0;i<60;i++)bars.push(nb());lg.innerHTML='';log('bot started · capital 10,000 USDT · '+($('#strat')&&$('#strat').selectedOptions[0]?$('#strat').selectedOptions[0].text:''))}
 function decide(){const stratEl=$('#strat');if(!stratEl)return;const k=bars.length-1,p=bars[k].c,s=stratEl.value;let g=0;
  if(s==='ma'){const f=sma(9,k),sl=sma(21,k),pf=sma(9,k-1),ps=sma(21,k-1);if(pf<=ps&&f>sl)g=1;if(pf>=ps&&f<sl)g=-1}
  if(s==='mr'){const a=bars.slice(-20).map(b=>b.c),m=a.reduce((x,y)=>x+y)/a.length,sd=Math.sqrt(a.reduce((x,y)=>x+(y-m)**2,0)/a.length);if(p<m-1.5*sd)g=1;if(p>m+.3*sd&&qty)g=-1}
  if(s==='mo'){const a=bars.slice(-21,-1),hi=Math.max(...a.map(b=>b.h)),lo=Math.min(...a.map(b=>b.l));if(p>hi)g=1;if(p<lo||(qty&&p<sma(10,k)))g=-1}
  if(g===1&&!qty){qty=cash/p;cash=0;nt++;trades.push({k,side:'b',p});log(`BUY  ${qty.toFixed(2)} @ ${p.toFixed(2)}`,'b')}else if(g===-1&&qty){cash=qty*p;nt++;trades.push({k,side:'s',p});log(`SELL ${qty.toFixed(2)} @ ${p.toFixed(2)} → ${cash.toFixed(0)} USDT`,'s');qty=0}
  const eq=cash+qty*p,pl=(eq/1e4-1)*100;$('#eq').textContent=Math.round(eq).toLocaleString('en-IN');const e=$('#pl');e.textContent=(pl>=0?'+':'')+pl.toFixed(2)+'%';e.style.color=pl>=0?'var(--ok-ink)':'var(--bad-ink)';$('#nt').textContent=nt;$('#pos').textContent=qty?'long':'flat'}
 function draw(){const [c,w,h]=fitCanvas(cv);if(!w)return;const pr=48,pt=14,pb=14,v=bars.slice(-70),off=bars.length-v.length,hi=Math.max(...v.map(b=>b.h)),lo=Math.min(...v.map(b=>b.l)),Y=x=>pt+(h-pt-pb)*(1-(x-lo)/(hi-lo||1)),cw=(w-pr)/v.length;
  c.font='10px "JetBrains Mono",monospace';c.textBaseline='middle';c.textAlign='left';for(let i=0;i<=4;i++){const x=lo+(hi-lo)*i/4,y=Y(x);c.strokeStyle='#1A2540';c.beginPath();c.moveTo(0,y);c.lineTo(w-pr,y);c.stroke();c.fillStyle='#5D6A86';c.fillText(x.toFixed(1),w-pr+6,y)}
  if($('#strat')&&$('#strat').value==='ma')[[9,'rgba(91,147,255,.9)'],[21,'rgba(255,176,46,.8)']].forEach(([n,col])=>{c.beginPath();v.forEach((b,i)=>{const y=Y(sma(n,off+i));i?c.lineTo(i*cw+cw/2,y):c.moveTo(i*cw+cw/2,y)});c.strokeStyle=col;c.lineWidth=1.3;c.stroke()});
  v.forEach((b,i)=>{const x=i*cw+cw/2,up=b.c>=b.o;c.strokeStyle=c.fillStyle=up?'#3DDC97':'#FF6B6B';c.beginPath();c.moveTo(x,Y(b.h));c.lineTo(x,Y(b.l));c.stroke();const y1=Y(Math.max(b.o,b.c)),y2=Y(Math.min(b.o,b.c));c.fillRect(x-cw*.32,y1,cw*.64,Math.max(1,y2-y1))});
  trades.filter(t=>t.k>=off).forEach(t=>{const x=(t.k-off)*cw+cw/2,y=Y(t.p);c.fillStyle=t.side==='b'?'#3DDC97':'#FF6B6B';c.beginPath();if(t.side==='b'){c.moveTo(x,y+8);c.lineTo(x-6,y+18);c.lineTo(x+6,y+18)}else{c.moveTo(x,y-8);c.lineTo(x-6,y-18);c.lineTo(x+6,y-18)}c.fill()});
  const lp=bars[bars.length-1].c,ly=Y(lp);c.fillStyle='#FFB02E';c.fillRect(w-pr+2,ly-8,pr-2,16);c.fillStyle='#1A1204';c.fillText(lp.toFixed(2),w-pr+6,ly)}
 let botTimer = setInterval(()=>{if(!run||!$('#strat'))return;bars.push(nb());if(bars.length>400){bars.shift();trades.forEach(t=>t.k--)}decide();draw()},RM?2000:800);
 const stratBtn=$('#strat');if(stratBtn)stratBtn.addEventListener('change',()=>{log('strategy switched → '+(stratBtn.selectedOptions[0]?stratBtn.selectedOptions[0].text:''));draw()});
 const toggleBtn=$('#botToggle');if(toggleBtn)toggleBtn.addEventListener('click',()=>{run=!run;toggleBtn.textContent=run?'Pause':'Resume';const bs=$('#botState');if(bs)bs.innerHTML=run?'<span class="dot"></span> running':'paused'});
 const resetBtn=$('#botReset');if(resetBtn)resetBtn.addEventListener('click',()=>{reset();draw()});addEventListener('resize',draw);
})();

/* ---------- PAYMENTS: idempotent UPI flow ---------- */
(()=>{const box=$('#states');if(!box)return;const ST=['CREATED','PENDING','CAPTURED','SETTLED'];
 box.innerHTML=ST.map((s,i)=>(i?'<span class="arrow"></span>':'')+`<span class="st" data-s="${s}">${s}</span>`).join('');
 const set=(s,cls='on')=>$$('.st').forEach(e=>{const a=ST.indexOf(e.dataset.s),b=ST.indexOf(s);e.className='st'+(a<b?' done':a===b?(cls?' '+cls:''):'')});
 const lg=$('#plog');let ms=0;const L=(t,c)=>{const d=document.createElement('div');d.innerHTML=`<span class="t">+${String(ms).padStart(4,'0')}ms</span> <span class="${c||''}">${t}</span>`;lg.appendChild(d)};
 $('#payBtn').addEventListener('click',async()=>{const b=$('#payBtn');b.disabled=true;lg.innerHTML='';ms=0;$('#ledger').textContent='0';const key='idk_'+Math.random().toString(36).slice(2,10);$('#payId').textContent='idempotency-key: '+key;const drop=$('#drop').checked;
  set('CREATED');L(`POST /payments  {amount: 125000, currency: "INR", key: "${key}"}`);await wait(500);ms+=120;L('order created · id pay_8Hq2 · status=CREATED','ok');await wait(500);ms+=340;
  L('UPI collect request sent to payer VPA');set('PENDING');await wait(600);ms+=900;
  if(drop){L('✕ client connection dropped before response','bad');await wait(700);ms+=2000;L(`retry 1 · POST /payments  key: "${key}"`,'a');await wait(600);ms+=80;L('idempotency hit → returning existing pay_8Hq2 (no new charge)','ok');await wait(500)}
  ms+=1400;L('webhook payment.captured · signature HMAC-SHA256 verified','ok');set('CAPTURED');$('#ledger').textContent='1';await wait(800);
  ms+=86400;L('settlement batch T+1 · reconciled against bank statement','ok');$$('.st').forEach(e=>e.className='st done');L(`result: 1 charge of ₹1,250${drop?' despite a retry':''}`,'a');b.disabled=false});
 set('CREATED','');L('ready. toggle the network drop, then pay.','t');
})();

/* ---------- PIPELINE ---------- */
(()=>{const p=$('#pipe');if(!p)return;const run=async()=>{const st=$$('#pipe .stage');st.forEach(s=>s.classList.remove('ok'));for(const s of st){s.querySelector('.bar2').style.width='100%';await wait(650);s.classList.add('ok')}};
 const io=new IntersectionObserver(es=>{if(es[0].isIntersecting){run();io.disconnect()}},{threshold:.4});io.observe(p);window.__runPipe=run;})();
})();
