/* love-timeline — ui.js
   Toasts, HUD, progress nodes
   NOTE: loaded as a plain <script> sharing global scope; keep the load order in index.html. */

/* ---------------- TOASTS ---------------- */
function showToast(ev){
  const wrap=document.getElementById('toasts');
  const t=document.createElement('div'); t.className='toast';
  const iconSrc = (typeof ITEM_ICONS!=='undefined') ? ITEM_ICONS[ev.collectible.icon] : null;
  const iconImg = iconSrc
    ? `<img class="toast-icon" src="${iconSrc}" alt="${ev.collectible.name}" width="64" height="64">`
    : '';
  t.innerHTML=`<div class="h">${ev.title}</div>
    <div class="b">${ev.eventNote}</div>
    ${iconImg}
    <div class="item">✨ Collected: ${ev.collectible.name}</div>`;
  wrap.appendChild(t);
  setTimeout(()=>{ t.classList.add('out'); setTimeout(()=>t.remove(),500); }, 4200);
}

/* ---------------- HUD ---------------- */
function updateHUD(){
  const ev = gameTimeline[state.currentEvent];
  document.getElementById('hDate').textContent = ev.date;
  document.getElementById('hTitle').textContent = ev.title;
  document.getElementById('hLoc').textContent = ev.location;
  document.getElementById('hItems').textContent = state.collected.size;
  document.getElementById('hTotal').textContent = gameTimeline.length;
  // show only the MOST RECENT 3 collected memories as item PNG icons, centered
  const box = document.getElementById('hParty');
  const collectedIdx = [];
  gameTimeline.forEach((e,i)=>{ if(state.collected.has(i)) collectedIdx.push(i); });
  const recent = collectedIdx.slice(-3);
  let html = '';
  recent.forEach(i=>{
    const e=gameTimeline[i]; const key=e.collectible && e.collectible.icon;
    const src=(typeof ITEM_ICONS!=='undefined')?ITEM_ICONS[key]:null;
    if(src) html += `<img class="hud-item" src="${src}" alt="${e.collectible.name}" title="${e.collectible.name}" width="22" height="22">`;
  });
  box.innerHTML = html;
  const prog = Math.min(1, heroWorldX()/(WORLD_W - SEGMENT_W*0.15));
  document.getElementById('pFill').style.width = (prog*100)+'%';
}

/* ---------------- MEMORIES MODAL ---------------- */
function buildMemGrid(){
  const grid=document.getElementById('memGrid');
  const title=document.getElementById('memTitle');
  title.textContent = `Memories — ${state.collected.size} / ${gameTimeline.length}`;
  let html='';
  gameTimeline.forEach((e,i)=>{
    const got=state.collected.has(i);
    const key=e.collectible && e.collectible.icon;
    const src=(typeof ITEM_ICONS!=='undefined')?ITEM_ICONS[key]:null;
    if(got && src){
      html+=`<div class="mem-slot"><img src="${src}" alt="${e.collectible.name}">
        <div class="mn">${e.collectible.name}</div>
        <div class="md">${e.date} · ${e.title}</div></div>`;
    } else {
      html+=`<div class="mem-slot locked"><div class="lock">🔒</div>
        <div class="mn">???</div><div class="md">Not yet found</div></div>`;
    }
  });
  grid.innerHTML=html;
}
function openMemModal(){ buildMemGrid(); document.getElementById('memModal').classList.remove('hidden'); }
function closeMemModal(){ document.getElementById('memModal').classList.add('hidden'); }
(function wireMemModal(){
  const btn=document.getElementById('memBtn');
  if(btn){
    btn.addEventListener('click', openMemModal);
    btn.addEventListener('keydown', e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); openMemModal(); } });
  }
  const close=document.getElementById('memClose'); if(close) close.addEventListener('click', closeMemModal);
  const modal=document.getElementById('memModal');
  if(modal) modal.addEventListener('click', e=>{ if(e.target===modal) closeMemModal(); });
  window.addEventListener('keydown', e=>{ if(e.key==='Escape') closeMemModal(); });
})();

/* place progress nodes once */
function buildProgressNodes(){
  const bar=document.getElementById('progress');
  bar.querySelectorAll('.node').forEach(n=>n.remove());
  gameTimeline.forEach((ev,i)=>{
    const n=document.createElement('div'); n.className='node'; n.dataset.i=i;
    n.style.left = ((i/(gameTimeline.length-1))*100)+'%';
    bar.appendChild(n);
  });
}
function refreshNodes(){
  document.querySelectorAll('#progress .node').forEach(n=>{
    if(state.collected.has(+n.dataset.i)) n.classList.add('reached');
  });
}
