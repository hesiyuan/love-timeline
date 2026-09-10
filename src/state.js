/* love-timeline — state.js
   Canvas setup, mutable game state, world builders
   NOTE: loaded as a plain <script> sharing global scope; keep the load order in index.html. */

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
