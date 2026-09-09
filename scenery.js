/* love-timeline — scenery.js
   Sky/sun/clouds, layered parallax scenery, ground, special objects, collectibles + icons
   NOTE: loaded as a plain <script> sharing global scope; keep the load order in index.html. */

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
