/* =====================================================================
   OUR STORY — a side-scrolling love timeline
   Vanilla HTML5 Canvas. Zero dependencies. Single file.
   ===================================================================== */

/* ---------------- CC0 SPRITE FRAMES (base64 data-URIs) ----------------
   Mr. Man (GrafxKid) + Mrs. Man (knekko) + Dog Walk (kirard), all CC0 from OpenGameArt.org. */

/* Game version — shown on the start screen and used to cache-bust the <script> tags
   in index.html (keep the ?v=… query strings in sync when you bump this). */
const GAME_VERSION = '1.1.1';


/* ---------------- MEMORY ITEM ICONS (32x32 pixel-art, base64) ---------------- */
const ITEM_ICONS={"ticket": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAqUlEQVR4nGNgGAWjYBSMgpEOGNEFNBR0/pNr2I0HVxgJ6QepQeazYFN0fZMPWQ44eUTgv7mNDU55Tb8tGGIsuBRX1i3DaVB7UxRWcYusI4z/L9mQFIJMDFQEJ6aRZjkIsJDqS3wAFgLT5+zCkMtMcRtiIUAOgIUALt/S3AEnoCGAHgX4HMRE7RAgVQ8LLUKAlChgGpQhoImlxCI2BMjVOwpGwSgYBSMXAABjrzp0ZgZRiwAAAABJRU5ErkJggg==", "water_bottle": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAkklEQVR4nGNgGAWjYKQDRlI1aCjo/Mcnf+PBFZLMZGEgAxiVzcEqfq4rZeiFABM1LSdWDUVRkLfpJF75SX7mDDQLAVoAJnI0ZepyDawDpl/+RjVHsJCj6cajNwz5jzDFNeRESDaLiWGAAdOoAxhGo2CAAdOoAxhGehSwkKOJnCJ30IYAIymKiW3tkNosGwUjGwAAJzgdY5kPaIsAAAAASUVORK5CYII=", "dog_bone": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAjUlEQVR4nGNgGAWjYBSMAiJAT0XAf1rpYyHGgMziWhAFZpd0bGAk1mJS9WEY8vX1WQxMyFek6mNiGGDAiE0Q5Fpo8GEF03ubccoR0oceFYy4FBNyBKkAm+UgMDijAEdqJgvAogtXLmBiGGDAiEtiZKeBHjpmQ5xgZJeE2LIhoexEDX0DUh2PglEwCkYBAIyaqRkpraBqAAAAAElFTkSuQmCC", "ship": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAu0lEQVR4nGNgGAWjYBQMMGCk1AAbG7f/MPaRI7tINo+JYYAB06gDGAYYsBCrUENB5z+pam48uMJINQeAwIkLJxmIBRYG5rSJgo4jz8EYH3tIpQFGYhWC4pfUKKB6GrAgMl5JAYy4JE7Y2BBM9aQAiyNHGAdlGmBB5kRNO4Hw9bISqlqEbPayLAvGQRMFLLg0JDz5AGcvkBEg22Jkc8jOhhpoRSw+B6FbSCgrMhLjAEIOIsXCUTAKRsGgAwAWyEFyx/IPNgAAAABJRU5ErkJggg==", "wine": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAvklEQVR4nGNgGAWjYKQDRlIUayjo/CdG3Y0HV4g2l5EUy3eeOEmUWncLc6IdwUSq5XJnLhNUD1JLbGgxMZAIHpnoMlATsBCr8KRDNAMtABMxikDxWffjDtGGgtRSNQ3QEjARq5DYUCDF9yQ5gBhHkGo5yQ7A5whyLKcIgPL5wxdfwZjYPD+0EyGtABPNTB51AJGAiWGkO4CFVA248jxMnNTCiJFUywm1ikhpDYHAgEcBI6kaCBW7dK0PRsGwAAC351jUsrV1lgAAAABJRU5ErkJggg==", "star": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAp0lEQVR4nGNgGAUUgBPTNP6D8IBZ/v9BFBhT4ggm6jqLTg44MU3jv7mXEZwPYpMbCiyELCLVYdjELbJuMOLSw0isLykBJ7edw+kIRmJ8RK5DQBaTHQKUOIQYi0lyACnRgi+4Kc4FFlk3GGG+o4blIEC0YmzRAHMMNjFiHcJIrOX4LMHlOKqkgRNIlhPyHbpDyIkSqlQ6A1pJjYJRMApGwSgYBaNgyAEAwcVxL1yWg+8AAAAASUVORK5CYII=", "scroll": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAjUlEQVR4nGNgGAWjYBQMMGDEJnhiQdR/WlhmkbAMwz4mhgEGTIMyCkBAQ0Hn/9lzqxmoAYyNQhluPLjCOChDgIUYRQu78skyPL5sInUcEE+EQeQCJobhGAXxJIQYC7UNJBUwMQznXEBM6LEwkGHIZb9KrOp0N7UzDLkoYBpoBzBiExytjkfBKBgFIwoAAFkEH2Db2x6BAAAAAElFTkSuQmCC", "heart": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAo0lEQVR4nO2VQQqAIBBFNTxM6w7humvUgeoarT2E625TVJsayuaPQgTzNqJ8/A8G1BhFUT7GckJD7Zfzvp+DzcmdcZzyrmno8UIv5+YoVlC+M8Z42adyKQlnEFp/rFN4LERxUHoKpjRV8RtLCvRzsHTWCG/zfxXIkeCUswQkEtxytgAigZRDAhwJtBwWSElIykUCdxLS8my2p5p+QIqiKMrvWAHvP2CUrB7jrgAAAABJRU5ErkJggg==", "rings": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAtklEQVR4nO2VwQ2DMAxF7Yg5ukG5dheYj87SXmGDTsAGRkZKJRDBdghCSH4XpJ/I/s4nAOA4juPckc9IVKpWZdlMfUPfRwevXzub4CfWb2R9vZd1TU3UNl4Izw5gaFWmJSPB2pwLMqlm64Zbp2MysFc86luaNoKwt5hyX0oXDURS00RdWi8SwVmEWxggIduc7FUG0JhtzrtQgZI4jeaeayb/mwND8xykm4CWYqlv/pF/geM4cDUToGpdWKlR9JkAAAAASUVORK5CYII="};

/* ---------------- EXTENSIBLE TIMELINE DATA ---------------- */
const gameTimeline = [
  { id:1, date:"May 27, 2020", location:"Xiamen Airport → Vancouver Flight",
    partyMembers:["husband"], backgroundType:"airport_terminal", weather:"clear_day",
    title:"The First Glance",
    eventNote:"First met at Xiamen Airport, both preparing to fly to Vancouver.",
    collectible:{ name:"Boarding Pass", icon:"ticket" } },
  { id:2, date:"June 27, 2020", location:"Stanley Park & Safeway Lot, Vancouver",
    partyMembers:["husband","wife"], backgroundType:"park_and_city", weather:"sunset",
    title:"Declaration of Love",
    eventNote:"A confession of love at the Safeway parking lot after a day in Stanley Park.",
    collectible:{ name:"Warm Water Bottle", icon:"water_bottle" } },
  { id:3, date:"Creamy's Arrival", location:"Vancouver (Arrival from Taiwan)",
    partyMembers:["husband","wife","creamy_dog"], backgroundType:"suburban_driveway",
    specialObject:"red_tesla_trunk", weather:"sunny",
    title:"Creamy Joins the Family",
    eventNote:"Met Creamy arriving from Taiwan in a red Tesla trunk. Shy at first, then sprinting all around her new home!",
    collectible:{ name:"Creamy's Leash", icon:"dog_bone" } },
  { id:4, date:"November 2021", location:"Ferry Cruise to Nanaimo",
    partyMembers:["husband","wife","creamy_dog"], backgroundType:"ocean_ferry_cruise",
    weather:"cloudy_coastal",
    title:"Island Getaway",
    eventNote:"Cruising over cloudy waters together toward Nanaimo.",
    collectible:{ name:"Ferry Ticket", icon:"ship" } },
  { id:5, date:"2021 / 2022", location:"Sparkling Hill Resort & Wine Country",
    partyMembers:["husband","wife","creamy_dog"], backgroundType:"mountain_resort_vineyard",
    weather:"golden_hour",
    title:"Sparkling Moments",
    eventNote:"Scenic vineyard views and mountain relaxation together.",
    collectible:{ name:"Wine Glass", icon:"wine" },
    // Explicit declarative scenery (overrides deriveScenery). Add/remove/reorder
    // layers here freely — back-to-front, each with its own parallax `speed`.
    scenery:{ layers:[
      { kind:"mountains", speed:0.14, opts:{ snow:true, peaks:[[40,420,300],[380,500,340]] } },
      { kind:"mountains", speed:0.22, opts:{ color:"#c9a86a", peaks:[[120,360,200],[520,420,240]] } },
      { kind:"vineyard",  speed:0.55, opts:{} },
      { kind:"trees",     speed:0.7,  opts:{ density:4, scale:0.8 } },
    ] } },
  { id:6, date:"June 2022", location:"Orlando — Disney World & Universal",
    partyMembers:["husband","wife","creamy_dog"], backgroundType:"theme_park_castles",
    weather:"bright_sunny",
    title:"Magical Celebration",
    eventNote:"Fun trips with friends through Disney World and Universal Studios.",
    collectible:{ name:"Magic Wand", icon:"star" } },
  { id:7, date:"December 22, 2022", location:"British Columbia, Canada",
    partyMembers:["husband","wife","creamy_dog"], backgroundType:"cozy_winter_city",
    weather:"snow_light",
    title:"Legally Married",
    eventNote:"Official legal marriage celebration in BC.",
    collectible:{ name:"Marriage Certificate", icon:"scroll" } },
  { id:8, date:"August 2023", location:"Hospital Room & Recovery Home",
    partyMembers:["husband","wife","creamy_dog"], backgroundType:"cozy_indoor_care",
    weather:"gentle_rain",
    title:"In Sickness and In Health",
    eventNote:"Taking care of my wife alongside her mother for a week of recovery.",
    collectible:{ name:"Warm Soup & Care", icon:"heart" } },
  { id:9, date:"October 22, 2023", location:"Lakeside Celebration, China",
    partyMembers:["husband","wife","creamy_dog"], backgroundType:"lakeside_trees_wedding",
    weather:"vibrant_daylight",
    title:"Grand Wedding Ceremony",
    eventNote:"A grand wedding by the lake, surrounded by green trees, friends, and family.",
    collectible:{ name:"Wedding Rings", icon:"rings" } },
];

/* ---------------- LAYOUT / WORLD CONSTANTS ---------------- */
const SEGMENT_W = 1400;                 // world px per timeline event
const WORLD_W = SEGMENT_W * gameTimeline.length;
const WALK_SPEED = 4.2;
const GROUND_RATIO = 0.80;              // ground line as fraction of height

/* ---------------- PALETTES PER WEATHER/BG ----------------
   Each palette: sky top/bottom, far scenery, mid scenery, ground, accent. */
const PALETTES = {
  clear_day:        { skyT:"#8fd0ff", skyB:"#e8f6ff", far:"#bcd9ef", mid:"#9fbfd8", ground:"#d7c9a8", accent:"#ffffff" },
  sunset:           { skyT:"#ff9a6b", skyB:"#ffd9a0", far:"#c98fb0", mid:"#7d5a86", ground:"#6b5a3e", accent:"#ffe6b3" },
  sunny:            { skyT:"#7ec8ff", skyB:"#eafaff", far:"#9fd0a0", mid:"#7bb37c", ground:"#c9b98a", accent:"#fff6d0" },
  cloudy_coastal:   { skyT:"#9fb3c4", skyB:"#d9e6ee", far:"#8ea6b8", mid:"#6d8598", ground:"#4b6b82", accent:"#eaf3f8" },
  golden_hour:      { skyT:"#f6b25a", skyB:"#ffe2ad", far:"#b98a5a", mid:"#8a6f45", ground:"#7a6440", accent:"#ffedc2" },
  bright_sunny:     { skyT:"#57b8ff", skyB:"#dff3ff", far:"#c7a3e0", mid:"#f28fb0", ground:"#cbb389", accent:"#fff2c0" },
  snow_light:       { skyT:"#b9c6da", skyB:"#eef3fb", far:"#c7d2e0", mid:"#9fb0c6", ground:"#eef2f8", accent:"#ffffff" },
  gentle_rain:      { skyT:"#6f7a8a", skyB:"#aab6c4", far:"#7c8898", mid:"#5f6b7c", ground:"#4f5866", accent:"#dfe7ee" },
  vibrant_daylight: { skyT:"#6fc9ff", skyB:"#eafff0", far:"#8fd6a0", mid:"#59b06f", ground:"#8fb46a", accent:"#fff7d6" },
};

/* ---------------- CANVAS SETUP ---------------- */
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
let W = 0, H = 0, DPR = 1;
function resize(){
  DPR = Math.min(window.devicePixelRatio || 1, 2);
  W = window.innerWidth; H = window.innerHeight;
  canvas.width = W * DPR; canvas.height = H * DPR;
  ctx.setTransform(DPR,0,0,DPR,0,0);
}
window.addEventListener('resize', resize);
resize();

/* ---------------- STATE ---------------- */
const state = {
  running:false,
  camX:0,
  hero:{ x:200, facing:1, phase:0, bob:0 },
  wife:{ x:120 },        // trails behind hero (world offset handled in draw)
  creamy:{ x:60 },
  currentEvent:0,
  collected:new Set(),
  collectibles:[],       // {segIndex, worldX, data, taken, float}
  particles:[],
  clouds:[],
  raindrops:[],
  snow:[],
  time:0,
  paletteCur:{...PALETTES.clear_day},
  wifeActive:false,
  creamyActive:false,
  finished:false,
};

/* build collectibles: one per segment, placed ~70% into the segment */
function buildCollectibles(){
  state.collectibles = gameTimeline.map((ev,i)=>({
    segIndex:i,
    worldX: i*SEGMENT_W + SEGMENT_W*0.7,
    data:ev,
    taken:false,
    float:Math.random()*Math.PI*2,
  }));
}

/* clouds for parallax */
function buildClouds(){
  state.clouds = [];
  for(let i=0;i<40;i++){
    state.clouds.push({
      x: Math.random()*WORLD_W,
      y: 40 + Math.random()*180,
      s: 0.6 + Math.random()*1.1,
      spd: 0.15 + Math.random()*0.25,
    });
  }
}

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

/* ---------------- AUDIO ----------------
   Primary background: "Emotional Mood Piece" — "Rest (For A Bit)" by
   The Orchestral Movement of 1932 (jacksontorreal) & fourstones, CC-BY 3.0
   (via OpenGameArt.org / ccMixter). Attribution REQUIRED (see credit on the
   start overlay). Played on a looping HTMLAudioElement with a gentle fade-in.
   A very quiet procedural arpeggio (WebAudio) sits underneath as light texture,
   and the collectible pickup chime is procedural. */
let audioCtx=null, musicGain=null, musicTimer=null, currentMood=null;
let bgMusic=null, bgStarted=false;
const MUSIC_SRC = 'audio/mood_piece.mp3';
const MUSIC_TARGET_VOL = 0.5;

function startBgTrack(){
  if(bgStarted) return;
  bgStarted=true;
  try{
    bgMusic = new Audio(MUSIC_SRC);
    bgMusic.loop = true;
    bgMusic.preload = 'auto';
    bgMusic.volume = 0;
    const p = bgMusic.play();
    if(p && p.catch) p.catch(()=>{ bgStarted=false; }); // will retry on next gesture
    // gentle fade-in to target volume
    let v=0;
    const fade=setInterval(()=>{
      if(!bgMusic){ clearInterval(fade); return; }
      v=Math.min(MUSIC_TARGET_VOL, v+0.02);
      bgMusic.volume=v;
      if(v>=MUSIC_TARGET_VOL) clearInterval(fade);
    }, 120);
  }catch(e){ bgStarted=false; }
}

function ensureAudio(){
  startBgTrack();               // real tranquil loop (primary)
  if(audioCtx) return;
  try{
    audioCtx = new (window.AudioContext||window.webkitAudioContext)();
    musicGain = audioCtx.createGain();
    musicGain.gain.value = 0.018;  // quiet texture layer under the real track
    musicGain.connect(audioCtx.destination);
    startMusic();
  }catch(e){ /* audio optional */ }
}
// Simple ambient pad + arpeggio whose scale shifts with mood
const MOODS = {
  clear_day:[0,4,7,11], sunset:[0,3,7,10], sunny:[0,4,7,9], cloudy_coastal:[0,3,5,10],
  golden_hour:[0,4,7,11], bright_sunny:[0,4,7,12], snow_light:[0,2,7,9],
  gentle_rain:[0,3,7,10], vibrant_daylight:[0,4,7,11],
};
function midiToFreq(m){ return 440*Math.pow(2,(m-69)/12); }
function startMusic(){
  if(!audioCtx) return;
  let step=0;
  musicTimer = setInterval(()=>{
    if(!state.running || !audioCtx) return;
    const mood = currentMood || 'clear_day';
    const scale = MOODS[mood] || MOODS.clear_day;
    const root = 57; // A3
    const note = root + scale[step % scale.length] + (step%8<4?0:12);
    playTone(midiToFreq(note), 0.55, 'sine', 0.05);
    if(step%4===0) playTone(midiToFreq(note-12), 1.6, 'triangle', 0.03);
    step++;
  }, 480);
}
function playTone(freq, dur, type, vol){
  if(!audioCtx) return;
  const o=audioCtx.createOscillator(), g=audioCtx.createGain();
  o.type=type; o.frequency.value=freq;
  g.gain.setValueAtTime(0, audioCtx.currentTime);
  g.gain.linearRampToValueAtTime(vol, audioCtx.currentTime+0.05);
  g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime+dur);
  o.connect(g); g.connect(musicGain);
  o.start(); o.stop(audioCtx.currentTime+dur+0.05);
}
function chime(){ // pickup cue: quick 3-note sparkle
  if(!audioCtx) return;
  [0,4,7].forEach((s,i)=>{
    setTimeout(()=>playTone(midiToFreq(72+s), 0.4, 'sine', 0.09), i*70);
  });
}

/* ---------------- HELPERS ---------------- */
function lerp(a,b,t){ return a+(b-a)*t; }
function hexToRgb(h){ const n=parseInt(h.slice(1),16); return [n>>16&255,n>>8&255,n&255]; }
function mixHex(a,b,t){ const A=hexToRgb(a),B=hexToRgb(b);
  return `rgb(${Math.round(lerp(A[0],B[0],t))},${Math.round(lerp(A[1],B[1],t))},${Math.round(lerp(A[2],B[2],t))})`; }
function lerpPalette(pa,pb,t){
  const o={};
  for(const k in pa){ o[k]=mixHex(pa[k],pb[k],t); }
  return o;
}

/* current segment from camera-centered hero world X */
function heroWorldX(){ return state.hero.x; }
function segmentAt(worldX){
  return Math.max(0, Math.min(gameTimeline.length-1, Math.floor(worldX / SEGMENT_W)));
}

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
  let party='🧑';
  if(state.wifeActive) party+=' 👩';
  if(state.creamyActive) party+=' 🐕';
  document.getElementById('hParty').textContent = party;
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

/* =====================================================================
   DRAWING
   ===================================================================== */
function groundY(){ return H*GROUND_RATIO; }

function drawSky(pal){
  const g=ctx.createLinearGradient(0,0,0,groundY());
  g.addColorStop(0,pal.skyT); g.addColorStop(1,pal.skyB);
  ctx.fillStyle=g; ctx.fillRect(0,0,W,groundY());
}

function drawSun(pal, bg){
  // sun/moon position varies subtly with mood
  const warm = ['sunset','golden_hour','clear_day','sunny','bright_sunny','vibrant_daylight'];
  const isWarm = warm.includes(bg.weather);
  const cx = W*0.78, cy = H*0.22;
  ctx.save();
  const grad=ctx.createRadialGradient(cx,cy,10,cx,cy,120);
  grad.addColorStop(0, isWarm?'rgba(255,240,200,0.95)':'rgba(230,240,255,0.85)');
  grad.addColorStop(1,'rgba(255,240,200,0)');
  ctx.fillStyle=grad; ctx.beginPath(); ctx.arc(cx,cy,120,0,7); ctx.fill();
  ctx.fillStyle= isWarm?'#fff3cf':'#eef3ff';
  ctx.beginPath(); ctx.arc(cx,cy,34,0,7); ctx.fill();
  ctx.restore();
}

function drawClouds(pal){
  ctx.save();
  for(const c of state.clouds){
    const px = c.x - state.camX*c.spd*0.4;
    // wrap
    let x = ((px % WORLD_W)+WORLD_W)%WORLD_W;
    x = x - state.camX*0; // already offset
    const screenX = c.x - state.camX*c.spd;
    const sx = ((screenX % (W+400))+(W+400))%(W+400) - 200;
    ctx.fillStyle='rgba(255,255,255,0.55)';
    puff(sx, c.y, 34*c.s);
  }
  ctx.restore();
}
function puff(x,y,r){
  ctx.beginPath();
  ctx.arc(x,y,r,0,7); ctx.arc(x+r*0.8,y+6,r*0.8,0,7);
  ctx.arc(x-r*0.8,y+6,r*0.7,0,7); ctx.arc(x+r*0.3,y-r*0.5,r*0.7,0,7);
  ctx.fill();
}

/* =====================================================================
   DECLARATIVE LAYERED SCENERY
   ---------------------------------------------------------------------
   Each timeline event can carry an optional `scenery` object:
     scenery: {
       sky: ["#top","#bottom"],           // optional; else derived from weather palette
       layers: [                          // painted back-to-front
         { kind:"mountains", speed:0.18, opts:{...} },
         { kind:"trees",     speed:0.5,  opts:{density:8} },
         ...
       ],
       ground: "#hex"                     // optional; else palette.ground
     }
   `speed` is the parallax factor (0 = infinitely far, 1 = moves with the ground).
   If an event has no `scenery`, one is derived from its `backgroundType`+`weather`
   (see deriveScenery) so older data keeps working. Layers are looked up by name in
   LAYER_DRAW, so adding a new scene = add a painter + reference it in event.scenery.
   ===================================================================== */

// ---- fine-grained layer painters. Each fills a tile [base .. base+W] at ground gy.
// `pal` = current interpolated palette, `o` = layer opts.
const LAYER_DRAW = {
  // distant mountain range with ridge shading + optional snow caps
  mountains(base, gy, pal, o){
    const col=o.color||pal.far; const peaks=o.peaks||[[60,380,240],[360,460,300]];
    for(const [px,pw,ph] of peaks){
      ctx.fillStyle=col; mountain(base+px, gy, pw, ph); ctx.fill();
      // shaded right face
      ctx.fillStyle='rgba(0,0,0,0.10)';
      ctx.beginPath(); ctx.moveTo(base+px+pw*0.5, gy-ph); ctx.lineTo(base+px+pw, gy); ctx.lineTo(base+px+pw*0.5, gy); ctx.closePath(); ctx.fill();
      if(o.snow){ ctx.fillStyle='rgba(255,255,255,0.9)';
        ctx.beginPath(); ctx.moveTo(base+px+pw*0.5, gy-ph);
        ctx.lineTo(base+px+pw*0.5-ph*0.13, gy-ph*0.72); ctx.lineTo(base+px+pw*0.5+ph*0.13, gy-ph*0.72);
        ctx.closePath(); ctx.fill(); }
    }
  },
  // rolling hills band
  hills(base, gy, pal, o){
    ctx.fillStyle=o.color||pal.far;
    hill(base, gy, W, o.h||110); ctx.fill();
    if(o.h2){ ctx.fillStyle='rgba(0,0,0,0.06)'; hill(base+W*0.3, gy, W*0.8, o.h2); ctx.fill(); }
  },
  // distant city skyline of towers with lit windows
  skyline(base, gy, pal, o){
    const col=o.color||pal.far; const n=o.count||6;
    for(let i=0;i<n;i++){
      const bx=base+40+i*((W-80)/n); const bw=(o.w||70); const bh=(o.h||150)+((i*53)%70);
      ctx.fillStyle=col; roundRect(bx,gy-bh,bw,bh,4); ctx.fill();
      // windows
      ctx.fillStyle=o.lit||'rgba(255,240,190,0.5)';
      for(let wy=gy-bh+10; wy<gy-14; wy+=14)
        for(let wx=bx+6; wx<bx+bw-8; wx+=12)
          if(((wx+wy)|0)%3!==0) ctx.fillRect(wx,wy,6,7);
    }
  },
  // airport terminal: long low glass building + control tower
  terminal(base, gy, pal, o){
    const col=o.color||pal.far;
    ctx.fillStyle=col; roundRect(base+30,gy-120,W-60,120,8); ctx.fill();
    // glass strip
    ctx.fillStyle='rgba(200,230,255,0.4)'; ctx.fillRect(base+40,gy-96,W-80,26);
    // control tower
    ctx.fillStyle=col; ctx.fillRect(base+W*0.7,gy-210,26,210);
    ctx.fillStyle='rgba(210,235,255,0.85)'; roundRect(base+W*0.7-8,gy-224,42,26,6); ctx.fill();
  },
  // trees with layered foliage clumps + trunk
  trees(base, gy, pal, o){
    const n=o.density||7; const col=o.color||pal.mid;
    for(let i=0;i<n;i++){ const x=base+70+i*((W-120)/n); const s=(o.scale||1)*(0.85+((i*37)%40)/100);
      tree(x, gy, s, col);
      // darker underside clump
      ctx.fillStyle='rgba(0,0,0,0.08)'; ctx.beginPath(); ctx.arc(x, gy-42*s, 20*s, 0.1, Math.PI-0.1); ctx.fill();
    }
  },
  // vineyard rows receding
  vineyard(base, gy, pal, o){
    const col=o.color||pal.mid;
    for(let i=0;i<10;i++){ const x=base+40+i*130;
      ctx.fillStyle=col; ctx.fillRect(x,gy-40,90,40);
      ctx.fillStyle='rgba(0,0,0,0.10)'; ctx.fillRect(x,gy-40,90,8);
      // vine posts
      ctx.fillStyle='rgba(90,70,50,0.5)'; ctx.fillRect(x+10,gy-52,4,14); ctx.fillRect(x+76,gy-52,4,14);
    }
  },
  // theme-park castles
  castles(base, gy, pal, o){ castle(base+180, gy); castle(base+W*0.62, gy); },
  // cozy winter city: snow-topped buildings + a few bare trees
  winterCity(base, gy, pal, o){
    const col=o.color||pal.far;
    for(let i=0;i<6;i++){ const bx=base+50+i*((W-80)/6); const bh=150+((i%2)*34);
      ctx.fillStyle=col; roundRect(bx,gy-bh,100,bh,6); ctx.fill();
      ctx.fillStyle='rgba(255,255,255,0.9)'; ctx.fillRect(bx-2,gy-bh-4,104,8);   // snow cap
      ctx.fillStyle=o.lit||'rgba(255,236,180,0.55)';
      for(let wy=gy-bh+14; wy<gy-16; wy+=16) for(let wx=bx+10; wx<bx+90; wx+=16)
        if(((wx*wy)|0)%2===0) ctx.fillRect(wx,wy,7,8);
    }
  },
  // ferry: distant coastline + sailboats
  sailboats(base, gy, pal, o){ for(let i=0;i<4;i++) sailboat(base+140+i*260, gy-10); },
  // cozy indoor: warm wall + window with sill
  indoorCare(base, gy, pal, o){
    ctx.fillStyle=o.wall||'rgba(120,96,80,0.35)'; ctx.fillRect(base,gy-260,W,260);
    ctx.fillStyle='rgba(180,205,235,0.5)'; roundRect(base+W*0.55,gy-210,200,150,10); ctx.fill();
    ctx.fillStyle='rgba(255,255,255,0.5)'; ctx.fillRect(base+W*0.55,gy-64,210,10);   // sill
  },
};

// tiling + parallax wrapper for a single layer
function drawSceneryLayer(kind, speed, pal, opts){
  const fn=LAYER_DRAW[kind]; if(!fn) return;
  const gy=groundY(); const off=state.camX*speed;
  ctx.save();
  ctx.translate(-off%W - W, 0);   // 3× tiling for seamless wrap
  for(let tile=0; tile<3; tile++) fn(tile*W, gy, pal, opts||{});
  ctx.restore();
}

// derive a scenery spec from legacy backgroundType when event.scenery is absent
function deriveScenery(ev){
  const t=ev.backgroundType;
  const M={
    airport_terminal:      [ {kind:'terminal',speed:0.25}, {kind:'skyline',speed:0.5,opts:{count:5,h:90}} ],
    park_and_city:         [ {kind:'hills',speed:0.2,opts:{h:120,h2:80}}, {kind:'skyline',speed:0.4,opts:{count:4,w:60,h:150}}, {kind:'trees',speed:0.55,opts:{density:7}} ],
    suburban_driveway:     [ {kind:'hills',speed:0.2,opts:{h:110}}, {kind:'trees',speed:0.55,opts:{density:6}} ],
    ocean_ferry_cruise:    [ {kind:'hills',speed:0.2,opts:{h:70}}, {kind:'sailboats',speed:0.5} ],
    mountain_resort_vineyard:[ {kind:'mountains',speed:0.18,opts:{snow:true}}, {kind:'vineyard',speed:0.55} ],
    theme_park_castles:    [ {kind:'hills',speed:0.2,opts:{h:80}}, {kind:'castles',speed:0.45} ],
    cozy_winter_city:      [ {kind:'winterCity',speed:0.25}, {kind:'trees',speed:0.55,opts:{density:8,color:'#e9eef6',scale:0.8}} ],
    cozy_indoor_care:      [ {kind:'indoorCare',speed:0.3} ],
    lakeside_trees_wedding:[ {kind:'mountains',speed:0.18,opts:{peaks:[[80,400,180]]}}, {kind:'hills',speed:0.28,opts:{h:90}}, {kind:'trees',speed:0.55,opts:{density:8}} ],
  };
  return { layers: M[t] || [ {kind:'hills',speed:0.2,opts:{h:100}}, {kind:'trees',speed:0.55,opts:{density:6}} ] };
}
function sceneryFor(ev){ return ev.scenery || (ev.__scenery ||= deriveScenery(ev)); }

// draw every layer of one segment's scenery at a given global alpha (for cross-fade)
function drawSegmentScenery(ev, pal, alpha){
  const sc=sceneryFor(ev);
  ctx.save(); ctx.globalAlpha=alpha;
  for(const L of sc.layers) drawSceneryLayer(L.kind, L.speed, pal, L.opts);
  ctx.restore();
}


/* shapes */
function roundRect(x,y,w,h,r){ ctx.beginPath();
  ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r); ctx.arcTo(x+w,y+h,x,y+h,r);
  ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); ctx.closePath(); }
function hill(x,gy,w,h){ ctx.beginPath(); ctx.moveTo(x,gy);
  ctx.quadraticCurveTo(x+w*0.5, gy-h, x+w, gy); ctx.lineTo(x+w,gy); ctx.closePath(); }
function mountain(x,gy,w,h){ ctx.beginPath(); ctx.moveTo(x,gy);
  ctx.lineTo(x+w*0.5, gy-h); ctx.lineTo(x+w, gy); ctx.closePath(); }
function tree(x,gy,s,color){
  ctx.fillStyle='#6b4a2f'; ctx.fillRect(x-4*s, gy-40*s, 8*s, 40*s);
  ctx.fillStyle=color; ctx.beginPath();
  ctx.arc(x, gy-52*s, 26*s,0,7); ctx.arc(x-18*s, gy-40*s, 20*s,0,7); ctx.arc(x+18*s, gy-40*s, 20*s,0,7);
  ctx.fill();
}
function mountainSnow(){}
function castle(x,gy){
  ctx.fillStyle=PALETTES.theme_park_castles?PALETTES.theme_park_castles.mid:'#f28fb0';
  ctx.fillStyle='#e6d7f2';
  ctx.fillRect(x, gy-160, 120, 160);
  ctx.beginPath(); ctx.moveTo(x-6,gy-160); ctx.lineTo(x+60,gy-230); ctx.lineTo(x+126,gy-160); ctx.closePath();
  ctx.fillStyle='#c48ad0'; ctx.fill();
  ctx.fillStyle='#e6d7f2';
  ctx.fillRect(x-24,gy-120,24,120); ctx.fillRect(x+120,gy-120,24,120);
  ctx.fillStyle='#c48ad0';
  ctx.beginPath(); ctx.moveTo(x-30,gy-120); ctx.lineTo(x-12,gy-150); ctx.lineTo(x+6,gy-120); ctx.fill();
  ctx.beginPath(); ctx.moveTo(x+114,gy-120); ctx.lineTo(x+132,gy-150); ctx.lineTo(x+150,gy-120); ctx.fill();
}
function tent(x,gy){ ctx.beginPath(); ctx.moveTo(x-40,gy); ctx.lineTo(x,gy-70); ctx.lineTo(x+40,gy); ctx.closePath(); ctx.fill(); }
function sailboat(x,y){ ctx.fillStyle='rgba(255,255,255,0.8)';
  ctx.beginPath(); ctx.moveTo(x,y-40); ctx.lineTo(x,y); ctx.lineTo(x+26,y); ctx.closePath(); ctx.fill();
  ctx.fillStyle='rgba(60,40,30,0.7)'; ctx.fillRect(x-14,y,44,8); }

/* ground / path */
function drawGround(pal, bg){
  const gy=groundY();
  ctx.fillStyle=pal.ground;
  ctx.fillRect(0,gy,W,H-gy);
  // water surface for ferry
  if(bg.backgroundType==='ocean_ferry_cruise'){
    const g=ctx.createLinearGradient(0,gy,0,H);
    g.addColorStop(0,'#5b86a8'); g.addColorStop(1,'#385f7d');
    ctx.fillStyle=g; ctx.fillRect(0,gy,W,H-gy);
    ctx.strokeStyle='rgba(255,255,255,0.25)'; ctx.lineWidth=2;
    for(let i=0;i<10;i++){ const y=gy+18+i*22 + Math.sin(state.time*0.05+i)*3;
      ctx.beginPath(); ctx.moveTo(0,y); for(let x=0;x<=W;x+=40){ ctx.lineTo(x, y+Math.sin((x+state.camX)*0.02+i)*3);} ctx.stroke(); }
  } else {
    // path line
    ctx.strokeStyle='rgba(0,0,0,0.12)'; ctx.lineWidth=3;
    ctx.beginPath(); ctx.moveTo(0,gy+2); ctx.lineTo(W,gy+2); ctx.stroke();
    // dashes moving with camera to sell motion
    ctx.strokeStyle='rgba(255,255,255,0.28)'; ctx.lineWidth=4; ctx.setLineDash([26,26]);
    ctx.lineDashOffset = -state.camX%52;
    ctx.beginPath(); ctx.moveTo(0,gy+ (H-gy)*0.5); ctx.lineTo(W,gy+(H-gy)*0.5); ctx.stroke();
    ctx.setLineDash([]);
  }
}

/* special object: red Tesla trunk (segment 3) */
function drawSpecialObjects(){
  const seg = state.collectibles[2]; // Creamy segment
  const teslaWorldX = 2*SEGMENT_W + SEGMENT_W*0.45;
  const sx = teslaWorldX - state.camX;
  if(sx > -260 && sx < W+120){
    const gy=groundY();
    ctx.save();
    // body
    ctx.fillStyle='#d32b3a';
    roundRect(sx, gy-70, 220, 54, 14); ctx.fill();
    roundRect(sx+34, gy-100, 150, 44, 18); ctx.fill();
    // windows
    ctx.fillStyle='rgba(210,235,255,0.85)'; roundRect(sx+46, gy-94, 120, 32, 10); ctx.fill();
    // open trunk hatch
    ctx.fillStyle='#b02330'; ctx.save();
    ctx.translate(sx+200, gy-96); ctx.rotate(-0.5); roundRect(0,0,70,14,6); ctx.fill(); ctx.restore();
    // wheels
    ctx.fillStyle='#1a1a1a';
    ctx.beginPath(); ctx.arc(sx+50,gy-14,20,0,7); ctx.arc(sx+170,gy-14,20,0,7); ctx.fill();
    ctx.fillStyle='#555';
    ctx.beginPath(); ctx.arc(sx+50,gy-14,9,0,7); ctx.arc(sx+170,gy-14,9,0,7); ctx.fill();
    ctx.restore();
  }
}

/* collectibles */
function drawCollectibles(){
  const gy=groundY();
  for(const c of state.collectibles){
    if(c.taken) continue;
    const sx=c.worldX - state.camX;
    if(sx<-60||sx>W+60) continue;
    c.float += 0.05;
    const fy = gy-70 + Math.sin(c.float)*8;
    // glow
    ctx.save();
    const g=ctx.createRadialGradient(sx,fy,2,sx,fy,34);
    g.addColorStop(0,'rgba(255,215,150,0.55)'); g.addColorStop(1,'rgba(255,215,150,0)');
    ctx.fillStyle=g; ctx.beginPath(); ctx.arc(sx,fy,34,0,7); ctx.fill();
    ctx.restore();
    drawIcon(c.data.collectible.icon, sx, fy);
  }
}
function drawIcon(icon, x, y){
  ctx.save(); ctx.translate(x,y);
  ctx.lineWidth=2; ctx.strokeStyle='rgba(0,0,0,0.25)';
  switch(icon){
    case 'ticket': ctx.fillStyle='#ffd27a'; roundRect(-16,-11,32,22,4); ctx.fill(); ctx.stroke();
      ctx.strokeStyle='#b98a2a'; ctx.setLineDash([2,3]); ctx.beginPath(); ctx.moveTo(4,-11); ctx.lineTo(4,11); ctx.stroke(); ctx.setLineDash([]); break;
    case 'water_bottle': ctx.fillStyle='#7fd0ff'; roundRect(-8,-16,16,30,6); ctx.fill(); ctx.stroke();
      ctx.fillStyle='#4a9fd0'; ctx.fillRect(-6,-20,12,6); break;
    case 'dog_bone': ctx.fillStyle='#f3e3c0'; ctx.beginPath();
      ctx.arc(-14,-8,7,0,7); ctx.arc(-14,8,7,0,7); ctx.arc(14,-8,7,0,7); ctx.arc(14,8,7,0,7);
      ctx.fill(); ctx.fillRect(-14,-6,28,12); ctx.stroke(); break;
    case 'ship': ctx.fillStyle='#e8e8ee'; ctx.beginPath(); ctx.moveTo(-18,4); ctx.lineTo(18,4); ctx.lineTo(12,16); ctx.lineTo(-12,16); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.fillStyle='#d34a4a'; ctx.fillRect(-4,-16,4,20); ctx.beginPath(); ctx.moveTo(0,-16); ctx.lineTo(14,-4); ctx.lineTo(0,-4); ctx.fill(); break;
    case 'wine': ctx.fillStyle='#b5335a'; ctx.beginPath(); ctx.moveTo(-9,-14); ctx.lineTo(9,-14); ctx.quadraticCurveTo(6,2,0,2); ctx.quadraticCurveTo(-6,2,-9,-14); ctx.fill();
      ctx.strokeStyle='#7a2440'; ctx.beginPath(); ctx.moveTo(0,2); ctx.lineTo(0,14); ctx.moveTo(-8,15); ctx.lineTo(8,15); ctx.stroke(); break;
    case 'star': ctx.fillStyle='#ffe27a'; star(0,0,5,15,7); ctx.fill(); ctx.stroke(); break;
    case 'scroll': ctx.fillStyle='#f4ecd6'; roundRect(-15,-12,30,24,3); ctx.fill(); ctx.stroke();
      ctx.strokeStyle='#c9b184'; ctx.beginPath(); ctx.moveTo(-9,-4); ctx.lineTo(9,-4); ctx.moveTo(-9,2); ctx.lineTo(9,2); ctx.stroke(); break;
    case 'heart': heartPath(0,0,16); ctx.fillStyle='#ff6b8f'; ctx.fill(); ctx.stroke(); break;
    case 'rings': ctx.strokeStyle='#ffd27a'; ctx.lineWidth=4; ctx.beginPath(); ctx.arc(-6,0,10,0,7); ctx.arc(7,0,10,0,7); ctx.stroke();
      ctx.fillStyle='#fff'; ctx.beginPath(); ctx.arc(-6,-11,3,0,7); ctx.fill(); break;
    default: ctx.fillStyle='#ffd27a'; ctx.beginPath(); ctx.arc(0,0,12,0,7); ctx.fill(); ctx.stroke();
  }
  ctx.restore();
}
function star(cx,cy,spikes,outer,inner){ let rot=Math.PI/2*3, x=cx,y=cy; const step=Math.PI/spikes;
  ctx.beginPath(); ctx.moveTo(cx,cy-outer);
  for(let i=0;i<spikes;i++){ x=cx+Math.cos(rot)*outer; y=cy+Math.sin(rot)*outer; ctx.lineTo(x,y); rot+=step;
    x=cx+Math.cos(rot)*inner; y=cy+Math.sin(rot)*inner; ctx.lineTo(x,y); rot+=step; }
  ctx.lineTo(cx,cy-outer); ctx.closePath(); }
function heartPath(x,y,s){ ctx.beginPath(); const t=s*0.5;
  ctx.moveTo(x,y+t*0.6);
  ctx.bezierCurveTo(x,y-t*0.4, x-s, y-t*0.4, x-s, y+t*0.2);
  ctx.bezierCurveTo(x-s, y+t, x, y+t*1.4, x, y+s);
  ctx.bezierCurveTo(x, y+t*1.4, x+s, y+t, x+s, y+t*0.2);
  ctx.bezierCurveTo(x+s, y-t*0.4, x, y-t*0.4, x, y+t*0.6);
  ctx.closePath(); }

/* ---------------- CHARACTERS (CC0 pixel-art sprites) ----------------
   Sprites: Mr. Man / Mrs. Man by GrafxKid & knekko (CC0), Dog Walk by kirard (CC0),
   all from OpenGameArt.org. Frames embedded as data-URIs in SPRITES (see bottom of file).
   Each character is drawn at a fixed display height with its feet on the ground line,
   the frame index cycles with walkPhase, the whole sprite bobs, and it mirrors on facing. */
const SPRITE_IMGS = { husband:[], wife:[], creamy:[], ready:false };
function loadSprites(){
  let pending=0, done=0;
  for(const who of ['husband','wife','creamy']){
    for(const src of (SPRITES[who]||[])){
      pending++;
      const img=new Image();
      img.onload=()=>{ done++; if(done>=pending) SPRITE_IMGS.ready=true; };
      img.onerror=()=>{ done++; if(done>=pending) SPRITE_IMGS.ready=true; };
      img.src=src;
      SPRITE_IMGS[who].push(img);
    }
  }
  if(pending===0) SPRITE_IMGS.ready=true;
}

/* =====================================================================
   WARDROBE / CHARACTER-STATE SYSTEM
   ---------------------------------------------------------------------
   Manages which OUTFIT each character wears and swaps their sprite frames
   as timeline milestones are hit. Outfit frames live in OUTFIT_SPRITES
   (sprites.js) keyed "<who>_<outfit>"; the base walk frames in SPRITES are
   the "casual" outfit. All frame arrays are decoded into SPRITE_IMGS under
   the same keys so the existing drawSprite() pipeline is reused unchanged.

   To add a future outfit:
     1. add its frames to OUTFIT_SPRITES as "<who>_<newoutfit>" in sprites.js
     2. add the outfit name to OUTFITS below
     3. map the milestone (event index) -> outfit in MILESTONE_OUTFITS
   ===================================================================== */
const OUTFITS = ['casual', 'wedding', 'cozy'];   // 'casual' == base SPRITES frames

// timeline event INDEX (0-based) -> outfit. Unlisted indices inherit the
// most recent lower index's outfit (so you only mark the CHANGE points).
const MILESTONE_OUTFITS = {
  0: 'casual',    // The First Glance ... through
  6: 'wedding',   // idx6 = "Legally Married" (Dec 2022) -> tux & gown
  7: 'cozy',      // idx7 = "In Sickness and In Health" (recovery home) -> cozy
  8: 'wedding',   // idx8 = "Grand Wedding Ceremony" -> gown & tux again
};

const WardrobeManager = {
  current: { husband: 'casual', wife: 'casual' },   // live outfit per character
  loaded: false,

  // decode every outfit's frames into SPRITE_IMGS under "<who>_<outfit>" keys
  load(){
    if(this.loaded) return;
    // base frames are the casual outfit — alias them
    SPRITE_IMGS['husband_casual'] = SPRITE_IMGS.husband;
    SPRITE_IMGS['wife_casual']    = SPRITE_IMGS.wife;
    if(typeof OUTFIT_SPRITES !== 'undefined'){
      for(const key in OUTFIT_SPRITES){          // e.g. "husband_wedding"
        SPRITE_IMGS[key] = OUTFIT_SPRITES[key].map(src=>{ const im=new Image(); im.src=src; return im; });
      }
    }
    this.loaded = true;
  },

  // resolve the outfit for a given timeline event index (carry-forward)
  outfitForEvent(idx){
    let outfit = 'casual';
    for(let i=0; i<=idx; i++){ if(MILESTONE_OUTFITS[i]) outfit = MILESTONE_OUTFITS[i]; }
    return outfit;
  },

  // frame array for a character's CURRENT outfit (falls back to base frames)
  framesFor(who){
    const key = `${who}_${this.current[who]}`;
    return SPRITE_IMGS[key] && SPRITE_IMGS[key].length ? SPRITE_IMGS[key] : SPRITE_IMGS[who];
  },

  // called every frame from update(); swaps + fires transition FX on change
  syncToEvent(idx){
    const target = this.outfitForEvent(idx);
    for(const who of ['husband','wife']){
      if(this.current[who] !== target){
        this.current[who] = target;
        this._transition(who, target);
      }
    }
  },

  // lightweight sparkle "poof" at the character during an outfit change
  _transition(who, outfit){
    if(!state.running) return;
    const gy = groundY();
    // screen-x of this character (hero at hero.x; wife trails 62px behind)
    const baseX = (who === 'wife') ? state.hero.x - 62 : state.hero.x;
    const sx = baseX - state.camX;
    const cy = gy - 40;
    const palette = outfit === 'wedding' ? ['#fff6d8','#ffe27a','#ffffff']
                  : outfit === 'cozy'    ? ['#ffd1a6','#ffb877','#fff0dc']
                  :                        ['#ff8fb1','#ffd27a','#ffffff'];
    for(let i=0;i<30;i++){
      const a=Math.random()*Math.PI*2, sp=1.2+Math.random()*3.2;
      state.particles.push({
        x:sx, y:cy, vx:Math.cos(a)*sp, vy:Math.sin(a)*sp-1.2, life:1,
        heart:Math.random()<0.25,
        col:palette[(Math.random()*palette.length)|0],
      });
    }
    // frame-pop: a brief scale-punch on this character
    state.wardrobePop = state.wardrobePop || {};
    state.wardrobePop[who] = 1;   // decays in update()
  },

  reset(){ this.current.husband='casual'; this.current.wife='casual'; }
};

// draw one sprite: feet at (x, gy), scaled to displayH, mirrored if facing<0, frame-cycled
function drawSprite(frames, x, gy, displayH, walkPhase, facing, moving, speedMul){
  if(!frames || !frames.length) return false;
  const n=frames.length;
  // advance frame only while moving; hold a neutral frame when idle
  const idx = moving ? (Math.floor(walkPhase*(speedMul||1.4)) % n + n) % n : 0;
  const img=frames[idx];
  if(!img || !img.complete || !img.naturalWidth) return false;
  const bob = moving ? Math.abs(Math.sin(walkPhase))*3 : 0;
  const scale = displayH / img.naturalHeight;
  const w = img.naturalWidth*scale, h=displayH;
  ctx.save();
  ctx.imageSmoothingEnabled=false; // crisp pixel art
  ctx.translate(x, gy - bob);
  if(facing<0) ctx.scale(-1,1);
  ctx.drawImage(img, -w/2, -h, w, h);
  ctx.restore();
  return true;
}

// On-screen character heights in px, from real-world height (wife 160cm = 72px baseline).
// husband 180cm -> 72 * (180/160) = 81px. Adjust here to re-tune relative heights.
const HUMAN_HEIGHTS = { wife: 72, husband: 81 };

function drawHuman(x, gy, opts){
  const moving = opts.moving!==false;
  // resolve frames from the wardrobe (current outfit) — falls back to base frames
  const frames = (WardrobeManager.loaded ? WardrobeManager.framesFor(opts.who) : SPRITE_IMGS[opts.who]) || [];
  // per-character on-screen height (real-world scale): wife 160cm -> 72px baseline,
  // husband 180cm -> 72 * 180/160 = 81px. Sprite art is unchanged; pixel-art stays crisp.
  const dh = HUMAN_HEIGHTS[opts.who] || 72;
  // frame-pop: brief scale punch right after an outfit change
  const pop = (state.wardrobePop && state.wardrobePop[opts.who]) || 0;
  if(pop > 0){
    const s = 1 + pop*0.28;                 // up to +28% then eases back
    ctx.save(); ctx.translate(x, gy); ctx.scale(s, s); ctx.translate(-x, -gy);
    const drawn = drawSprite(frames, x, gy, dh, opts.walkPhase, opts.facing, moving, 1.4);
    ctx.restore();
    if(drawn) return;
  } else if(drawSprite(frames, x, gy, dh, opts.walkPhase, opts.facing, moving, 1.4)) return;
  // ---- fallback: original vector figure (used until sprites load) ----
  const bob=Math.abs(Math.sin(opts.walkPhase))*3; const y=gy-bob;
  ctx.save(); ctx.translate(x,0);
  const legSwing=Math.sin(opts.walkPhase)*10;
  ctx.strokeStyle=opts.pants||'#39406a'; ctx.lineWidth=7; ctx.lineCap='round';
  ctx.beginPath(); ctx.moveTo(0,y-38); ctx.lineTo(legSwing*0.5,y-2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0,y-38); ctx.lineTo(-legSwing*0.5,y-2); ctx.stroke();
  if(opts.dress){ ctx.fillStyle=opts.dress; ctx.beginPath();
    ctx.moveTo(-8,y-64); ctx.lineTo(8,y-64); ctx.lineTo(15,y-30); ctx.lineTo(-15,y-30); ctx.closePath(); ctx.fill(); }
  else { ctx.fillStyle=opts.shirt; roundRect(-9,y-64,18,30,6); ctx.fill(); }
  ctx.strokeStyle=opts.shirt; ctx.lineWidth=6;
  ctx.beginPath(); ctx.moveTo(0,y-58); ctx.lineTo(opts.facing*(8+-legSwing*0.4), y-40); ctx.stroke();
  ctx.fillStyle=opts.skin; ctx.beginPath(); ctx.arc(0,y-74,11,0,7); ctx.fill();
  ctx.fillStyle=opts.hair;
  if(opts.longHair){ ctx.beginPath(); ctx.arc(0,y-77,12,Math.PI,0); ctx.fill();
    ctx.fillRect(-12,y-78,5,22); ctx.fillRect(7,y-78,5,22); }
  else { ctx.beginPath(); ctx.arc(0,y-78,11,Math.PI,0); ctx.fill(); ctx.fillRect(-11,y-79,22,5); }
  ctx.restore();
}

function drawCreamy(x, gy, walkPhase, facing, moving){
  if(drawSprite(SPRITE_IMGS.creamy, x, gy, 34, walkPhase, (facing||1), moving!==false, 1.2)) return;
  // ---- fallback vector dog ----
  const bob=Math.abs(Math.sin(walkPhase*1.4))*2; const y=gy-bob;
  ctx.save(); ctx.translate(x,0);
  const legSwing=Math.sin(walkPhase*1.4)*6;
  ctx.fillStyle='#f0dfb8'; roundRect(-22,y-30,44,20,10); ctx.fill();
  ctx.beginPath(); ctx.arc(20,y-32,12,0,7); ctx.fill();
  ctx.fillStyle='#e0cb9a'; ctx.beginPath(); ctx.ellipse(15,y-40,4,8,-0.3,0,7); ctx.fill();
  ctx.fillStyle='#f6ecd2'; ctx.beginPath(); ctx.arc(30,y-30,6,0,7); ctx.fill();
  ctx.fillStyle='#333'; ctx.beginPath(); ctx.arc(33,y-31,2,0,7); ctx.fill();
  ctx.beginPath(); ctx.arc(23,y-34,1.6,0,7); ctx.fill();
  ctx.strokeStyle='#e0cb9a'; ctx.lineWidth=5; ctx.lineCap='round';
  ctx.beginPath(); ctx.moveTo(-14,y-12); ctx.lineTo(-14+legSwing,y); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(14,y-12); ctx.lineTo(14-legSwing,y); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-22,y-26); ctx.lineTo(-34,y-34-Math.sin(walkPhase*3)*5); ctx.stroke();
  ctx.restore();
}

/* ---------------- WEATHER FX ---------------- */
function drawWeather(bg){
  const w=bg.weather;
  if(w==='gentle_rain'){
    ctx.strokeStyle='rgba(200,220,240,0.5)'; ctx.lineWidth=1.5;
    if(state.raindrops.length<120){ for(let i=state.raindrops.length;i<120;i++)
      state.raindrops.push({x:Math.random()*W,y:Math.random()*H,l:8+Math.random()*8,s:6+Math.random()*4}); }
    for(const d of state.raindrops){ ctx.beginPath(); ctx.moveTo(d.x,d.y); ctx.lineTo(d.x-2,d.y+d.l); ctx.stroke();
      d.y+=d.s; if(d.y>H){ d.y=-10; d.x=Math.random()*W; } }
  } else if(w==='snow_light'){
    ctx.fillStyle='rgba(255,255,255,0.85)';
    if(state.snow.length<90){ for(let i=state.snow.length;i<90;i++)
      state.snow.push({x:Math.random()*W,y:Math.random()*H,r:1.5+Math.random()*2.5,s:0.6+Math.random()*1,d:Math.random()*7}); }
    for(const f of state.snow){ ctx.beginPath(); ctx.arc(f.x,f.y,f.r,0,7); ctx.fill();
      f.y+=f.s; f.x+=Math.sin(f.d+state.time*0.02)*0.6; if(f.y>H){ f.y=-6; f.x=Math.random()*W; } }
  }
}

/* ---------------- PARTICLES (pickup sparkles + ambient hearts) ---------------- */
function spawnPickupParticles(x,y){
  for(let i=0;i<26;i++){
    const a=Math.random()*Math.PI*2, sp=1+Math.random()*3.5;
    state.particles.push({x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp-1,life:1,heart:Math.random()<0.4,
      col:Math.random()<0.5?'#ff8fb1':'#ffd27a'});
  }
}
function updateParticles(){
  for(const p of state.particles){ p.x+=p.vx; p.y+=p.vy; p.vy+=0.06; p.life-=0.02; }
  state.particles=state.particles.filter(p=>p.life>0);
}
function drawParticles(){
  for(const p of state.particles){
    ctx.save(); ctx.globalAlpha=Math.max(0,p.life); ctx.fillStyle=p.col; ctx.translate(p.x,p.y);
    if(p.heart){ heartPath(0,0,6); ctx.fill(); }
    else { ctx.beginPath(); ctx.arc(0,0,3,0,7); ctx.fill(); }
    ctx.restore();
  }
}
// occasional floating hearts between the couple
let heartTimer=0;
function ambientHearts(gy){
  if(!state.wifeActive) return;
  heartTimer++;
  if(heartTimer>90){ heartTimer=0;
    const hx=(state.hero.x-24)-state.camX;
    state.particles.push({x:hx,y:gy-90,vx:(Math.random()-0.5)*0.6,vy:-1.1,life:1,heart:true,col:'#ff8fb1'});
  }
}

/* =====================================================================
   UPDATE + RENDER LOOP
   ===================================================================== */
function update(){
  if(!state.running) return;
  state.time++;

  // movement
  let moving=false;
  if(keys.right){ state.hero.x+=WALK_SPEED; state.hero.facing=1; moving=true; }
  if(keys.left){ state.hero.x-=WALK_SPEED; state.hero.facing=-1; moving=true; }
  state.hero.x=Math.max(120, Math.min(WORLD_W-120, state.hero.x));
  state.moving=moving;
  if(moving) state.hero.phase += 0.28; 

  // camera follows hero, clamped
  const targetCam = state.hero.x - W*0.32;
  state.camX = Math.max(0, Math.min(WORLD_W-W, lerp(state.camX, targetCam, 0.12)));
  if(WORLD_W < W) state.camX = 0;

  // current event + activation of party members
  const seg = segmentAt(state.hero.x);
  if(seg !== state.currentEvent){ state.currentEvent = seg; updateHUD(); }
  const ev = gameTimeline[seg];
  if(ev.partyMembers.includes('wife')) state.wifeActive=true;
  if(ev.partyMembers.includes('creamy_dog')) state.creamyActive=true;

  // wardrobe: swap outfits + fire transition FX when a milestone changes them
  WardrobeManager.syncToEvent(seg);
  // decay the frame-pop punch
  if(state.wardrobePop){
    for(const who in state.wardrobePop){
      state.wardrobePop[who] = Math.max(0, state.wardrobePop[who] - 0.06);
    }
  }

  // mood/music by weather
  if(currentMood!==ev.weather){ currentMood=ev.weather; }

  // palette interpolation across segment boundary
  const segFloat = state.hero.x / SEGMENT_W;
  const iA = Math.floor(segFloat), iB = Math.min(gameTimeline.length-1, iA+1);
  const tt = segFloat - iA;
  const pa = PALETTES[gameTimeline[Math.min(iA,gameTimeline.length-1)].weather];
  const pb = PALETTES[gameTimeline[iB].weather];
  state.paletteCur = lerpPalette(pa, pb, Math.min(1,Math.max(0,tt)));

  // collectible pickup
  for(const c of state.collectibles){
    if(c.taken) continue;
    if(Math.abs(state.hero.x - c.worldX) < 55){
      c.taken=true;
      state.collected.add(c.segIndex);
      showToast(c.data);
      spawnPickupParticles(c.worldX-state.camX, groundY()-70);
      chime();
      refreshNodes();
      updateHUD();
    }
  }

  updateParticles();

  // finish
  if(state.hero.x >= WORLD_W-140 && !state.finished){
    state.finished=true;
    setTimeout(endGame, 700);
  }
}

function render(){
  const bg = gameTimeline[state.currentEvent];
  const pal = state.paletteCur;
  ctx.clearRect(0,0,W,H);
  drawSky(pal);
  drawSun(pal, bg);
  drawClouds(pal);

  // layered scenery with cross-fade between adjacent segments near the boundary
  const segF = state.hero.x / SEGMENT_W;
  const iA = Math.max(0, Math.min(gameTimeline.length-1, Math.floor(segF)));
  const iB = Math.min(gameTimeline.length-1, iA+1);
  const frac = segF - Math.floor(segF);
  const FADE = 0.15;                                  // last 15% of a segment cross-fades
  drawSegmentScenery(gameTimeline[iA], pal, 1);       // current segment, full
  if(iB!==iA && frac > 1-FADE){                       // approaching next: fade it in
    const a=(frac-(1-FADE))/FADE;
    drawSegmentScenery(gameTimeline[iB], pal, a);
  }

  drawGround(pal, bg);
  drawSpecialObjects();
  drawCollectibles();

  const gy=groundY();
  ambientHearts(gy);

  // party — draw trailing members behind hero
  const heroScreenX = state.hero.x - state.camX;
  const walk = state.hero.phase;
  const moving = state.moving;
  const face = state.hero.facing;
  if(state.creamyActive){
    drawCreamy(heroScreenX - 118, gy, walk*1.1, face, moving);
  }
  if(state.wifeActive){
    drawHuman(heroScreenX - 62, gy, {who:'wife', skin:'#f6c9a8', shirt:'#ff8fb1', hair:'#3a2a22',
      dress:'#ff9ec2', longHair:true, walkPhase:walk+0.6, facing:face, moving});
  }
  // hero
  drawHuman(heroScreenX, gy, {who:'husband', skin:'#f2c39a', shirt:'#4a7fc0', pants:'#2f3a5c', hair:'#241a14',
    walkPhase:walk, facing:face, moving});

  drawParticles();
  drawWeather(bg);
}

function loop(){
  update();
  render();
  requestAnimationFrame(loop);
}

/* =====================================================================
   GAME FLOW
   ===================================================================== */
function startGame(){
  buildCollectibles();
  buildClouds();
  buildProgressNodes();
  state.running=true;
  state.hero.x=200; state.camX=0; state.currentEvent=0;
  state.collected=new Set(); state.particles=[]; state.finished=false;
  state.wifeActive=false; state.creamyActive=false;
  state.wardrobePop={};
  WardrobeManager.reset();
  document.getElementById('startOverlay').classList.add('hidden');
  document.getElementById('endOverlay').classList.add('hidden');
  updateHUD();
  ensureAudio();
}

function endGame(){
  state.running=false;
  const total=gameTimeline.length;
  const got=state.collected.size;
  document.getElementById('endMsg').textContent =
    got===total ? "Every memory gathered — every year, every place, with you. 💗"
                : `You gathered ${got} of ${total} memories. Walk it again to find them all.`;
  const list = gameTimeline.map(ev=>{
    const has=[...state.collected].some(i=>gameTimeline[i].id===ev.id);
    return `${has?'💗':'🤍'} ${ev.date} — ${ev.title}`;
  }).join('<br>');
  document.getElementById('endStats').innerHTML=list;
  document.getElementById('endOverlay').classList.remove('hidden');
}

document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('replayBtn').addEventListener('click', startGame);

/* ---------------- MUTE / UNMUTE ---------------- */
let isMuted = false;
function applyMute(){
  if(bgMusic) bgMusic.muted = isMuted;
  if(musicGain) musicGain.gain.value = isMuted ? 0 : 0.018;
  const btn=document.getElementById('muteBtn');
  btn.textContent = isMuted ? '🔇' : '🔊';
  btn.classList.toggle('muted', isMuted);
  btn.title = isMuted ? 'Unmute music' : 'Mute music';
}
document.getElementById('muteBtn').addEventListener('click', (e)=>{
  e.stopPropagation();
  ensureAudio();            // in case audio hasn't started yet, start it (then toggle)
  isMuted = !isMuted;
  applyMute();
});

/* kick the render loop (idles until running) */
loadSprites();
WardrobeManager.load();
(function(){ const b=document.getElementById('versionBadge'); if(b) b.textContent='v'+GAME_VERSION; })();
updateHUD();
loop();
