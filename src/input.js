/* love-timeline — input.js
   Keyboard + touch input
   NOTE: loaded as a plain <script> sharing global scope; keep the load order in index.html. */

/* ---------------- INPUT ---------------- */
const keys = { left:false, right:false };
window.addEventListener('keydown', e=>{
  if(e.key==='a'||e.key==='A'||e.key==='ArrowLeft'){ keys.left=true; }
  if(e.key==='d'||e.key==='D'||e.key==='ArrowRight'){ keys.right=true; }
});
window.addEventListener('keyup', e=>{
  if(e.key==='a'||e.key==='A'||e.key==='ArrowLeft'){ keys.left=false; }
  if(e.key==='d'||e.key==='D'||e.key==='ArrowRight'){ keys.right=false; }
});
function bindTouch(el, which){
  const on = ()=>{ keys[which]=true; ensureAudio(); };
  const off= ()=>{ keys[which]=false; };
  el.addEventListener('touchstart', e=>{e.preventDefault();on();}, {passive:false});
  el.addEventListener('touchend', e=>{e.preventDefault();off();}, {passive:false});
  el.addEventListener('mousedown', on); el.addEventListener('mouseup', off);
  el.addEventListener('mouseleave', off);
}
bindTouch(document.getElementById('btnL'),'left');
bindTouch(document.getElementById('btnR'),'right');
if('ontouchstart' in window){ document.getElementById('touch').style.display='flex'; }
