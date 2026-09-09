/* love-timeline — characters.js
   Sprite loading, WardrobeManager, sprite/human/dog rendering, per-character heights
   NOTE: loaded as a plain <script> sharing global scope; keep the load order in index.html. */

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
