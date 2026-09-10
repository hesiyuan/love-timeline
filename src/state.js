/* love-timeline — state.js
   Canvas setup, mutable game state, world builders
   NOTE: loaded as a plain <script> sharing global scope; keep the load order in index.html. */

/* ---------------- CANVAS SETUP (low-res pixel-art render buffer) ----------------
   The whole scene is drawn to a small offscreen buffer at 1/PIXEL resolution, then
   upscaled to the display canvas with smoothing OFF. This makes ALL procedural drawing
   (gradients, curves, structures) render as chunky, grid-snapped pixels that match the
   PNG sprites — no per-coordinate rounding needed. All game code keeps drawing in the
   same logical W/H space; W/H are now the BUFFER dimensions, so groundY/camX/etc. adapt. */
const displayCanvas = document.getElementById('c');
const displayCtx = displayCanvas.getContext('2d');

// offscreen low-res buffer the game actually draws into
const buffer = document.createElement('canvas');
const ctx = buffer.getContext('2d');

const PIXEL = 3;                 // pixel chunkiness: bigger = chunkier (2–4 sensible)
let W = 0, H = 0, DPR = 1;

function resize(){
  DPR = Math.min(window.devicePixelRatio || 1, 2);
  W = window.innerWidth; H = window.innerHeight;         // logical full-screen units (unchanged)
  // display canvas fills the screen at device resolution
  displayCanvas.width = Math.round(W * DPR);
  displayCanvas.height = Math.round(H * DPR);
  // low-res buffer = 1/PIXEL of logical size; game still draws in W/H coords via a scale
  buffer.width = Math.max(1, Math.round(W / PIXEL));
  buffer.height = Math.max(1, Math.round(H / PIXEL));
  ctx.setTransform(1 / PIXEL, 0, 0, 1 / PIXEL, 0, 0);    // W/H logical -> buffer pixels
  ctx.imageSmoothingEnabled = false;                     // crisp sprite upscales in the buffer
  displayCtx.imageSmoothingEnabled = false;
}
window.addEventListener('resize', resize);
resize();

// blit the low-res buffer onto the display canvas, upscaled nearest-neighbor.
function present(){
  displayCtx.imageSmoothingEnabled = false;
  displayCtx.clearRect(0, 0, displayCanvas.width, displayCanvas.height);
  displayCtx.drawImage(buffer, 0, 0, buffer.width, buffer.height, 0, 0, displayCanvas.width, displayCanvas.height);
}

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
