/* love-timeline — engine.js
   Update/render loop, game flow, mute, bootstrap (must load LAST)
   NOTE: loaded as a plain <script> sharing global scope; keep the load order in index.html. */

/* =====================================================================
   UPDATE + RENDER LOOP
   ===================================================================== */
let WIFE_MEET_X = null;   // fixed world-X where the wife waits at the airport (set in update)

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

  // Wife is PRE-PLACED at the airport (segment 0): she stands at a fixed spot near the
  // boarding board facing the approaching husband, so she never pops in. Once he reaches
  // her (or once we pass into event 2), she JOINS and trails him like a normal party member.
  if(WIFE_MEET_X == null) WIFE_MEET_X = SEGMENT_W*0.80;   // fixed meet point in segment 0
  if(!state.wifeJoined){
    if(state.hero.x >= WIFE_MEET_X - 70 || seg >= 1){ state.wifeJoined = true; state.wifeActive = true; }
  }
  if(ev.partyMembers.includes('wife') && seg >= 1) state.wifeActive=true;
  if(ev.partyMembers.includes('creamy_dog')) state.creamyActive=true;

  // Ferry voyage (segment index 3): progress = fraction walked across that segment.
  // Drives the ferryScene (coastline scroll, ramps on/off) so walking right = sailing.
  const FERRY_SEG = gameTimeline.findIndex(e=>e.backgroundType==='ocean_ferry_cruise');
  if(seg === FERRY_SEG && FERRY_SEG >= 0){
    state.ferryProgress = Math.max(0, Math.min(1, (state.hero.x - FERRY_SEG*SEGMENT_W)/SEGMENT_W));
  }

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

  // On the ferry segment, the walking surface rises up the ramp / onto the deck / down the
  // far ramp — so the couple's feet-Y follows ferryFloorY(progress) instead of the ground.
  const onFerry = bg.backgroundType==='ocean_ferry_cruise';
  const ferryP = state.ferryProgress||0;
  const floorY = onFerry ? ferryFloorY(ferryP, gy) : gy;

  // party — draw trailing members behind hero
  // On the ferry, the hero's screen-X follows the on-screen ramp/deck path (so feet meet
  // the ramp); off-ferry it's the usual camera-relative position.
  const heroScreenX = onFerry ? ferryFloorX(ferryP, gy) : (state.hero.x - state.camX);
  const walk = state.hero.phase;
  const moving = state.moving;
  const face = state.hero.facing;
  if(state.creamyActive){
    drawCreamy(heroScreenX - 118, floorY, walk*1.1, face, moving);
  }
  if(state.wifeJoined){
    // joined: wife trails the husband as a normal party member
    drawHuman(heroScreenX - 62, floorY, {who:'wife', skin:'#f6c9a8', shirt:'#ff8fb1', hair:'#3a2a22',
      dress:'#ff9ec2', longHair:true, walkPhase:walk+0.6, facing:face, moving});
  } else {
    // pre-placed: wife stands still at the airport meet point, facing LEFT toward the husband
    const wifeScreenX = (WIFE_MEET_X||SEGMENT_W*0.80) - state.camX;
    if(wifeScreenX > -40 && wifeScreenX < W+40){
      drawHuman(wifeScreenX, gy, {who:'wife', skin:'#f6c9a8', shirt:'#ff8fb1', hair:'#3a2a22',
        dress:'#ff9ec2', longHair:true, walkPhase:0, facing:-1, moving:false});
    }
  }
  // hero
  drawHuman(heroScreenX, floorY, {who:'husband', skin:'#f2c39a', shirt:'#4a7fc0', pants:'#2f3a5c', hair:'#241a14',
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
  state.wifeJoined=false; WIFE_MEET_X=null;
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

/* kick things off: load the timeline JSON, then boot the engine */
async function loadTimeline(){
  try{
    const res = await fetch('timeline.json?v=' + GAME_VERSION, { cache: 'no-cache' });
    if(!res.ok) throw new Error('HTTP ' + res.status);
    gameTimeline = await res.json();
  }catch(e){
    console.error('Failed to load timeline.json:', e);
    gameTimeline = [];   // guard; boot() will show a message
  }
  WORLD_W = SEGMENT_W * gameTimeline.length;
}

async function boot(){
  await loadTimeline();
  if(!gameTimeline.length){
    const b=document.getElementById('versionBadge');
    if(b) b.textContent = 'v'+GAME_VERSION+' — failed to load timeline.json';
    return;
  }
  loadSprites();
  WardrobeManager.load();
  const b=document.getElementById('versionBadge'); if(b) b.textContent='v'+GAME_VERSION;
  updateHUD();
  document.getElementById('hTotal').textContent = gameTimeline.length;  // in case markup default differs
  loop();
}
boot();
