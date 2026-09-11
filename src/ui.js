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
  // show collected memories as their item PNG icons (in timeline order), not emojis
  const box = document.getElementById('hParty');
  let html = '';
  gameTimeline.forEach((e, i) => {
    if(state.collected.has(i)){
      const key = e.collectible && e.collectible.icon;
      const src = (typeof ITEM_ICONS!=='undefined') ? ITEM_ICONS[key] : null;
      if(src) html += `<img class="hud-item" src="${src}" alt="${e.collectible.name}" title="${e.collectible.name}" width="20" height="20">`;
    }
  });
  box.innerHTML = html;
  const prog = Math.min(1, heroWorldX()/(WORLD_W - SEGMENT_W*0.15));
  document.getElementById('pFill').style.width = (prog*100)+'%';
}

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
