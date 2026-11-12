/* Site-wide behaviour: navigation, work filters, enquiry form. No dependencies. */
(()=>{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
// mobile nav
const t=$('.navtoggle'),m=$('.menu');
if(t&&m){t.addEventListener('click',()=>{const o=m.classList.toggle('open');t.setAttribute('aria-expanded',o)})}
// close services dropdown on outside click / escape
document.addEventListener('click',e=>{$$('.menu details[open]').forEach(d=>{if(!d.contains(e.target))d.removeAttribute('open')})});
document.addEventListener('keydown',e=>{if(e.key==='Escape')$$('.menu details[open]').forEach(d=>d.removeAttribute('open'))});

// work filters
const fb=$('#workFilters');
if(fb){const cards=$$('[data-cat]');fb.addEventListener('click',e=>{const b=e.target.closest('.chip');if(!b)return;
  $$('#workFilters .chip').forEach(x=>x.setAttribute('aria-pressed',x===b));const c=b.dataset.f;
  cards.forEach(k=>{k.hidden=!(c==='All'||k.dataset.cat===c||(k.dataset.plat||'').split(',').includes(c))})})}

// enquiry form
const tsEl=document.getElementById('ts');if(tsEl)tsEl.value=Date.now();
const f=$('#enquiry');
if(f){
  const msg=$('#formMsg'),btn=f.querySelector('button[type=submit]');
  const req={name:'Please enter your name.',email:'Please enter a valid business email.',category:'Please choose a project category.',description:'Please describe your project in a few sentences (at least 30 characters).'};
  const err=(id,text)=>{const el=document.getElementById(id+'Err');if(el){el.textContent=text||'';el.hidden=!text}const inp=document.getElementById(id);if(inp)inp.setAttribute('aria-invalid',text?'true':'false')};
  f.addEventListener('submit',async e=>{
    e.preventDefault();msg.hidden=true;let ok=true;const d=Object.fromEntries(new FormData(f));
    for(const k of Object.keys(req)){let bad=!String(d[k]||'').trim();if(k==='email')bad=!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email||'');if(k==='description')bad=String(d.description||'').trim().length<30;err(k,bad?req[k]:'');if(bad)ok=false}
    if(!ok){const first=f.querySelector('[aria-invalid=true]');first&&first.focus();return}
    btn.disabled=true;btn.textContent='Sending…';
    try{
      const r=await fetch(f.dataset.endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)});
      const j=await r.json().catch(()=>({}));
      if(!r.ok)throw new Error(j.error||'');
      msg.className='formmsg ok';msg.textContent='Thank you. Your enquiry has reached our solution architects. We usually reply within one business day.';msg.hidden=false;f.reset();
      if(window.gtag)gtag('event','generate_lead',{form:'enquiry',category:d.category,engagement:d.engagement||''});
    }catch(ex){
      msg.className='formmsg bad';msg.textContent=(ex.message&&ex.message.length<160?ex.message+' ':'We could not send your enquiry right now. ')+'Please email info@firstlogicmetalab.com or call +91 70124 83828.';msg.hidden=false;
    }finally{btn.disabled=false;btn.textContent='Send enquiry'}
  });
}
})();
