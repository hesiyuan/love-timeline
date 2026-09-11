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

  // ---- RICH INTERIOR AIRPORT TERMINAL (event 1) ------------------------------
  // Departures hall: glass curtain wall with tarmac + parked planes beyond, plus
  // interior fixtures — storefronts, a gate, a flight board, seated + walking people.
  airportInterior(base, gy, pal, o){
    const topWall = gy - 300;                 // interior ceiling line
    // 1) back wall / interior fill above the floor
    ctx.fillStyle = '#c3ccd6'; ctx.fillRect(base, topWall, W, gy-topWall);
    ctx.fillStyle = '#aab4c0'; ctx.fillRect(base, topWall, W, 22);            // ceiling band
    ctx.fillStyle = 'rgba(255,248,220,0.7)';                                  // light strips
    for(let x=base+40; x<base+W-30; x+=140) ctx.fillRect(x, topWall+8, 70, 5);

    // 2) glass curtain wall showing the tarmac/apron + parked planes beyond
    const gx0 = base+250, gx1 = base+W-250, gTop = topWall+26, gBot = gy-70;
    airportGlassWall(gx0, gTop, gx1-gx0, gBot-gTop);

    // 3) interior tiled floor
    ctx.fillStyle = '#cfd6de'; ctx.fillRect(base, gy, W, H-gy);
    ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.lineWidth = 1;
    for(let x=base; x<base+W; x+=34){ ctx.beginPath(); ctx.moveTo(x, gy); ctx.lineTo(x, gy+40); ctx.stroke(); }
    ctx.fillStyle='rgba(0,0,0,0.05)'; ctx.fillRect(base, gy, W, 3);

    // 4) storefronts left + right
    storefront(base+40,   gy, 150, 118, '#7a1f22', "TERRY'S DINER", '#ffd24a');
    storefront(base+205,  gy, 120, 118, '#3a5a78', "BOOK NOOK",     '#eaf2ff');
    storefront(base+W-190,gy, 150, 118, '#8a2f2f', "DUTY FREE",     '#ffe08a');
    signBox(base+W-232, gy-152, 86, 24, 'RESTROOMS', '#2f6f9f', '#eaf6ff');

    // 5) DEPARTURES sign + a control tower through the glass
    signBox(base+50, topWall+34, 150, 28, 'DEPARTURES', '#111', '#ffd24a');
    ctx.fillStyle='#8fa0b0'; ctx.fillRect(base+W-150, gTop-4, 20, 120);
    ctx.fillStyle='rgba(210,235,255,0.9)'; roundRect(base+W-160, gTop-18, 40, 20, 4); ctx.fill();

    // 6) GATE A13 sign + flight-status board
    signBox(base+Math.round(W*0.66), gy-152, 74, 40, 'GATE', '#0b0b0b', '#ffd24a', 'A13');
    flightBoard(base+Math.round(W*0.48), gy-152, 150, 44);

    // 7) gate desk + attendant
    gateDesk(base+Math.round(W*0.40), gy);

    // 8) seated traveller rows
    seatedRow(base+Math.round(W*0.50), gy-2, 6);
    seatedRow(base+Math.round(W*0.72), gy-2, 5);

    // 9) walking travellers with luggage (deterministic)
    for(let i=0;i<9;i++){
      const r=((i*97)%100)/100, r2=((i*151)%100)/100;
      const x = base + 60 + Math.round(i*((W-120)/9) + r*30);
      npcWalker(x, gy-1, r, r2);
    }
  },
  // animated flight: a plane climbs across the sky (already airborne) and loops.
  // screenSpace layer — positions itself from state.time (independent of camera).
  airplane(base, gy, pal, o){
    const period = o.period || 520;          // frames per full fly-by cycle
    const t = (state.time % period) / period; // 0..1 progress through the cycle
    const startY = gy - 70;                   // enters low on the left, already flying
    const climbTop = H * 0.12;                // how high it climbs
    // 0..0.82 climb + cross the sky; 0.82..1 off-screen (brief gap before next)
    if(t >= 0.82) return;
    const p = t / 0.82;
    const x = -60 + p * (W + 120);            // left edge to off the right edge
    const y = startY - (p*p) * (startY - climbTop);   // ease-in climb
    const ang = -0.34 * Math.min(1, p*2.2);           // nose up, capped
    drawPlane(x, y, ang, o.scale || 1, Math.max(0.25, p));
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
  // Vancouver-style winter skyline: towers packed ADJACENT (continuous block), colors
  // alternating across a palette, each tower one of three styles — glassy, brutalist
  // (grotesque), or creative (varied rooflines). Deterministic per-index so tiles wrap.
  winterCity(base, gy, pal, o){
    // tower body color palette (cool winter glass/concrete tones), cycled per index
    const PAL = ['#8f9bb0', '#7c8aa2', '#a2adc0', '#6f7d95', '#97a2b6'];
    const GLASS = '#8fb2d6';                 // glassy tint
    const BRUT  = '#5f6473';                 // grotesque/brutalist concrete
    const snow  = 'rgba(255,255,255,0.92)';
    const dark  = 'rgba(0,0,0,0.12)';
    const lit   = o.lit || 'rgba(255,236,180,0.6)';
    const glassWin = 'rgba(190,225,255,0.5)';

    let x = base;                            // walk left→right, no gaps (adjacent)
    let i = 0;
    while(x < base + W){
      const r1=((i*73)%100)/100, r2=((i*149)%100)/100, r3=((i*211)%100)/100, r4=((i*307)%100)/100;
      const bw = Math.round(44 + r1*40);              // 44–84 wide
      let bh = Math.round(160 + r2*150);              // 160–310
      if(i % 4 === 1) bh = Math.round(320 + r3*150);  // standout 320–470
      const style = i % 3;                             // 0 glassy, 1 brutalist, 2 creative
      const topY = gy - bh;

      if(style === 0){
        // GLASSY: blue tint, shaded right, dense large window grid
        ctx.fillStyle = GLASS; ctx.fillRect(x, topY, bw, bh);
        ctx.fillStyle = dark; ctx.fillRect(x + Math.round(bw*0.62), topY, Math.round(bw*0.38), bh);
        ctx.fillStyle = glassWin;
        for(let wy=topY+10; wy<gy-12; wy+=12) for(let wx=x+5; wx<x+bw-5; wx+=9) ctx.fillRect(wx,wy,6,8);
        ctx.fillStyle = snow; ctx.fillRect(x-1, topY-4, bw+2, 5);
      } else if(style === 1){
        // BRUTALIST/GROTESQUE: dark blocky concrete, stepped shoulders, sparse slit windows
        ctx.fillStyle = BRUT; ctx.fillRect(x, topY, bw, bh);
        ctx.fillStyle = 'rgba(0,0,0,0.16)'; ctx.fillRect(x + Math.round(bw*0.7), topY, Math.round(bw*0.3), bh);
        // blocky shoulder setbacks
        ctx.fillStyle = BRUT; ctx.fillRect(x-4, topY+Math.round(bh*0.18), bw+8, Math.round(bh*0.10));
        ctx.fillStyle = lit;
        for(let wy=topY+18; wy<gy-16; wy+=20) for(let wx=x+8; wx<x+bw-8; wx+=14)
          if(((wx+wy+i)|0)%3===0) ctx.fillRect(wx,wy,4,10);   // tall slit windows
        ctx.fillStyle = snow; ctx.fillRect(x-1, topY-3, bw+2, 4);
      } else {
        // CREATIVE: palette color + a varied roofline (spire / stepped / tapered crown)
        ctx.fillStyle = PAL[i % PAL.length]; ctx.fillRect(x, topY, bw, bh);
        ctx.fillStyle = dark; ctx.fillRect(x + Math.round(bw*0.66), topY, Math.round(bw*0.34), bh);
        const roof = i % 3;   // reuse index for roof variety
        if(r4 < 0.34){        // spire
          ctx.fillStyle = PAL[i % PAL.length];
          ctx.beginPath(); ctx.moveTo(x, topY); ctx.lineTo(x+bw/2, topY-Math.round(bw*0.7)); ctx.lineTo(x+bw, topY); ctx.closePath(); ctx.fill();
          ctx.fillStyle = snow; ctx.fillRect(x+Math.round(bw/2)-1, topY-Math.round(bw*0.7), 2, Math.round(bw*0.3));
        } else if(r4 < 0.67){ // stepped crown
          ctx.fillStyle = PAL[i % PAL.length]; ctx.fillRect(x+Math.round(bw*0.2), topY-Math.round(bh*0.08), Math.round(bw*0.6), Math.round(bh*0.08));
          ctx.fillStyle = snow; ctx.fillRect(x+Math.round(bw*0.2)-1, topY-Math.round(bh*0.08)-3, Math.round(bw*0.6)+2, 4);
        } else {              // tapered top (trapezoid cap)
          ctx.fillStyle = PAL[i % PAL.length];
          ctx.beginPath(); ctx.moveTo(x, topY); ctx.lineTo(x+Math.round(bw*0.2), topY-Math.round(bh*0.1)); ctx.lineTo(x+Math.round(bw*0.8), topY-Math.round(bh*0.1)); ctx.lineTo(x+bw, topY); ctx.closePath(); ctx.fill();
          ctx.fillStyle = snow; ctx.fillRect(x+Math.round(bw*0.2), topY-Math.round(bh*0.1)-3, Math.round(bw*0.6), 4);
        }
        ctx.fillStyle = lit;
        for(let wy=topY+12; wy<gy-14; wy+=14) for(let wx=x+6; wx<x+bw-6; wx+=10)
          if(((wx*3+wy*7+i*13)%5)<2) ctx.fillRect(wx,wy,5,7);
      }
      x += bw;   // ADJACENT — next tower butts against this one
      i++;
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
  const gy=groundY();
  // screen-space layers (e.g. an animated airplane) draw ONCE in screen coords,
  // not tiled/parallax-scrolled — the painter positions itself from state.time.
  if(opts && opts.screenSpace){ fn(0, gy, pal, opts||{}); return; }
  const off=state.camX*speed;
  ctx.save();
  ctx.translate(-off%W - W, 0);   // 3× tiling for seamless wrap
  for(let tile=0; tile<3; tile++) fn(tile*W, gy, pal, opts||{});
  ctx.restore();
}

// derive a scenery spec from legacy backgroundType when event.scenery is absent
function deriveScenery(ev){
  const t=ev.backgroundType;
  const M={
    airport_terminal:      [ {kind:'airportInterior',speed:0.25}, {kind:'airplane',speed:0,opts:{screenSpace:true,scale:1.0}} ],
    park_and_city:         [ {kind:'hills',speed:0.2,opts:{h:120,h2:80}}, {kind:'skyline',speed:0.4,opts:{count:4,w:60,h:150}}, {kind:'trees',speed:0.55,opts:{density:7}} ],
    suburban_driveway:     [ {kind:'hills',speed:0.2,opts:{h:110}}, {kind:'trees',speed:0.55,opts:{density:6}} ],
    ocean_ferry_cruise:    [ {kind:'hills',speed:0.2,opts:{h:70}}, {kind:'sailboats',speed:0.5} ],
    mountain_resort_vineyard:[ {kind:'mountains',speed:0.18,opts:{snow:true}}, {kind:'vineyard',speed:0.55} ],
    theme_park_castles:    [ {kind:'hills',speed:0.2,opts:{h:80}}, {kind:'castles',speed:0.45} ],
    cozy_winter_city:      [ {kind:'mountains',speed:0.12,opts:{color:'#c3ccdb',snow:true,peaks:[[0,520,220],[420,620,300],[900,560,240]]}}, {kind:'winterCity',speed:0.25}, {kind:'trees',speed:0.55,opts:{density:8,color:'#e9eef6',scale:0.8}} ],
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

// side-view airliner (nose pointing right), rotated by `ang`, scaled by `s`.
// `t` (cycle progress) fades a short contrail behind it once airborne.
function drawPlane(x, y, ang, s, t){
  ctx.save();
  ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
  // contrail (only once climbing)
  if(t > 0.2){
    const g=ctx.createLinearGradient(-16,0,-90,0);
    g.addColorStop(0,'rgba(255,255,255,0.5)'); g.addColorStop(1,'rgba(255,255,255,0)');
    ctx.fillStyle=g; ctx.fillRect(-90,-2,78,4);
  }
  // fuselage
  ctx.fillStyle='#eef2f7';
  roundRect(-20,-5,44,10,5); ctx.fill();
  ctx.beginPath(); ctx.moveTo(20,-4); ctx.lineTo(30,0); ctx.lineTo(20,4); ctx.closePath(); ctx.fill(); // nose
  // tail fin
  ctx.beginPath(); ctx.moveTo(-20,-4); ctx.lineTo(-26,-16); ctx.lineTo(-14,-4); ctx.closePath(); ctx.fill();
  // wing
  ctx.fillStyle='#cfd8e3';
  ctx.beginPath(); ctx.moveTo(-2,2); ctx.lineTo(-16,14); ctx.lineTo(2,4); ctx.closePath(); ctx.fill();
  // windows
  ctx.fillStyle='#7fb3e0';
  for(let wx=-12; wx<14; wx+=6) ctx.fillRect(wx,-2,3,3);
  // accent stripe
  ctx.strokeStyle='#e0556b'; ctx.lineWidth=1.5;
  ctx.beginPath(); ctx.moveTo(-18,1); ctx.lineTo(22,1); ctx.stroke();
  ctx.restore();
}

/* ============ AIRPORT INTERIOR HELPERS ============ */

// glass curtain wall showing sky + tarmac apron + parked planes beyond, with mullions
function airportGlassWall(x, y, w, h){
  // sky above the horizon, tarmac below
  const horizon = y + Math.round(h*0.5);
  ctx.fillStyle = '#bcd7ee'; ctx.fillRect(x, y, w, horizon-y);   // sky
  ctx.fillStyle = '#6f7d74'; ctx.fillRect(x, horizon, w, y+h-horizon);                                // grass/apron edge
  ctx.fillStyle = '#5a5f66'; ctx.fillRect(x, horizon+Math.round(h*0.16), w, y+h-(horizon+Math.round(h*0.16))); // tarmac
  // runway markings
  ctx.fillStyle='rgba(255,255,255,0.5)';
  for(let rx=x+10; rx<x+w-16; rx+=48) ctx.fillRect(rx, horizon+Math.round(h*0.30), 24, 3);
  // a couple of parked planes beyond the glass
  tarmacPlane(x+Math.round(w*0.30), horizon+Math.round(h*0.20), 1.0, '#e8edf2', '#3a78c0');
  tarmacPlane(x+Math.round(w*0.66), horizon+Math.round(h*0.30), 0.8, '#f2ede8', '#e08a3a');
  // glass tint + vertical mullions + horizontal transom
  ctx.fillStyle = 'rgba(180,215,245,0.16)'; ctx.fillRect(x, y, w, h);
  ctx.fillStyle = '#9aa7b4';
  for(let mx=x; mx<=x+w; mx+=Math.round(w/8)) ctx.fillRect(mx-2, y, 4, h);   // mullions
  ctx.fillRect(x, y+Math.round(h*0.5)-2, w, 4);                              // transom
  ctx.fillRect(x-3, y-3, w+6, 5); ctx.fillRect(x-3, y+h-2, w+6, 5);          // frame top/bottom
}

// small parked airliner seen through the glass (simple side view on the apron)
function tarmacPlane(x, y, s, body, accent){
  ctx.save(); ctx.translate(Math.round(x), Math.round(y)); ctx.scale(s, s);
  ctx.fillStyle = body; roundRect(-46, -9, 92, 18, 9); ctx.fill();       // fuselage
  ctx.beginPath(); ctx.moveTo(46,-7); ctx.lineTo(60,0); ctx.lineTo(46,7); ctx.closePath(); ctx.fill(); // nose
  ctx.beginPath(); ctx.moveTo(-46,-7); ctx.lineTo(-58,-24); ctx.lineTo(-36,-7); ctx.closePath(); ctx.fill(); // tail fin
  ctx.fillStyle = accent; ctx.fillRect(-40, -2, 78, 4);                  // livery stripe
  ctx.fillStyle = '#8fb3d6'; for(let wx=-36; wx<40; wx+=8) ctx.fillRect(wx, -3, 4, 4); // windows
  ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.fillRect(-30, 9, 60, 3);       // ground shadow
  ctx.restore();
}

// storefront: awning + fascia sign + lit window with silhouettes
function storefront(x, gy, w, h, color, label, textCol){
  const top = gy - h;
  ctx.fillStyle = '#e7ebf0'; ctx.fillRect(x, top, w, h);                 // shop interior wall
  ctx.fillStyle = 'rgba(255,240,200,0.55)'; ctx.fillRect(x+6, top+22, w-12, h-30); // lit window
  // silhouettes / product shelves inside
  ctx.fillStyle = 'rgba(60,70,90,0.35)';
  for(let sx=x+12; sx<x+w-12; sx+=16) ctx.fillRect(sx, gy-Math.round(h*0.5), 8, Math.round(h*0.5)-4);
  // fascia sign
  ctx.fillStyle = color; ctx.fillRect(x, top, w, 20);
  pixelLabel(label, x+6, top+14, Math.max(6, Math.round((w-12)/(label.length))), textCol);
  // frame
  ctx.strokeStyle='rgba(0,0,0,0.2)'; ctx.lineWidth=1; ctx.strokeRect(x, top, w, h);
}

// a rectangular sign box with a label (and optional big secondary text, e.g. GATE + A13)
function signBox(x, y, w, h, label, bg, textCol, big){
  ctx.fillStyle = bg; roundRect(x, y, w, h, 4); ctx.fill();
  ctx.strokeStyle='rgba(0,0,0,0.35)'; ctx.lineWidth=1; ctx.strokeRect(x, y, w, h);
  if(big){
    pixelLabel(label, x+6, y+12, 5, textCol);
    pixelLabel(big, x+6, y+h-6, 12, textCol);
  } else {
    pixelLabel(label, x+5, y+Math.round(h/2)+3, Math.max(6, Math.round((w-10)/label.length)), textCol);
  }
}

// dark flight-status board with amber departures text
function flightBoard(x, y, w, h){
  ctx.fillStyle = '#0c1016'; roundRect(x, y, w, h, 3); ctx.fill();
  ctx.strokeStyle='rgba(0,0,0,0.5)'; ctx.strokeRect(x, y, w, h);
  pixelLabel('BA203 LONDON', x+6, y+14, 6, '#ffd24a');
  pixelLabel('BOARDING', x+6, y+30, 6, '#8fe08a');
  // blinking cursor
  if(Math.floor(state.time/30)%2===0){ ctx.fillStyle='#8fe08a'; ctx.fillRect(x+w-16, y+24, 8, 8); }
}

// gate desk with a standing attendant + a traveller at the counter
function gateDesk(x, gy){
  const w=70, h=34, top=gy-h;
  ctx.fillStyle='#4a5a72'; ctx.fillRect(x, top, w, h);                 // desk body
  ctx.fillStyle='#6f83a0'; ctx.fillRect(x, top, w, 6);                 // counter top
  ctx.fillStyle='#1a2230'; ctx.fillRect(x+w-20, top-10, 16, 12);       // monitor
  ctx.fillStyle='rgba(140,200,240,0.7)'; ctx.fillRect(x+w-18, top-8, 12, 8);
  person(x+14, gy, '#2f3a52', '#f2c39a', '#241a14');                    // attendant behind
  person(x-14, gy, '#7a5a3a', '#f6c9a8', '#3a2a22');                    // traveller in front
}

// a row of seats with seated travellers
function seatedRow(x, gy, n){
  const seatW=26;
  for(let i=0;i<n;i++){
    const sx = x + i*seatW;
    // seat
    ctx.fillStyle='#3f4756'; ctx.fillRect(sx, gy-16, seatW-4, 16);
    ctx.fillStyle='#4d566a'; ctx.fillRect(sx, gy-30, 4, 30);           // seat back post
    // seated person (deterministic colours)
    const r=((i*61+x)%100)/100;
    const shirt = ['#c0553f','#3f6bc0','#4f9f6f','#b06fb0','#c9a23f'][i%5];
    const skin  = r<0.5 ? '#f2c39a' : '#c98a5a';
    ctx.fillStyle=shirt; ctx.fillRect(sx+5, gy-24, 12, 14);            // torso
    ctx.fillStyle=skin;  ctx.beginPath(); ctx.arc(sx+11, gy-28, 5, 0, 7); ctx.fill(); // head
    ctx.fillStyle='#2a2028'; ctx.fillRect(sx+6, gy-31, 10, 4);         // hair
    ctx.fillStyle='#39406a'; ctx.fillRect(sx+6, gy-11, 11, 8);         // lap/legs
  }
}

// a walking traveller with a rolling suitcase (deterministic look from r/r2)
function npcWalker(x, gy, r, r2){
  const shirt = ['#4a7fc0','#c0553f','#4f9f6f','#8a5a3a','#b06fb0','#3a3f52'][Math.floor(r*6)%6];
  const pants = r2<0.5 ? '#2f3a5c' : '#3a3a3f';
  const skin  = r<0.5 ? '#f2c39a' : '#c98a5a';
  const bob = Math.round(Math.abs(Math.sin((state.time*0.05)+(x)))*2);
  const y = gy - bob;
  person(x, y, shirt, skin, r2<0.5?'#241a14':'#3a2a22', pants);
  // rolling suitcase beside some of them
  if(r2>0.45){
    const cx=x+ (r<0.5?10:-10);
    ctx.fillStyle=['#8a2f2f','#2f5a8a','#3f7f5f','#7a5f2f'][Math.floor(r2*4)%4];
    ctx.fillRect(cx-4, y-26, 9, 18);                                   // case
    ctx.strokeStyle='#333'; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(cx+ (r<0.5?5:-5), y-26); ctx.lineTo(x, y-34); ctx.stroke(); // handle
  }
}

// simple standing pixel-person (torso, head, hair, legs)
function person(x, y, shirt, skin, hair, pants){
  x=Math.round(x); y=Math.round(y);
  ctx.fillStyle = pants||'#39406a'; ctx.fillRect(x-5, y-16, 4, 16); ctx.fillRect(x+1, y-16, 4, 16); // legs
  ctx.fillStyle = shirt; ctx.fillRect(x-6, y-32, 12, 17);            // torso
  ctx.fillStyle = skin;  ctx.beginPath(); ctx.arc(x, y-37, 5, 0, 7); ctx.fill(); // head
  ctx.fillStyle = hair||'#241a14'; ctx.fillRect(x-5, y-41, 10, 4);   // hair
}

// tiny bitmap-ish label: draws chunky uppercase blocks approximating text (readable at scene scale)
function pixelLabel(text, x, y, size, color){
  ctx.save();
  ctx.fillStyle = color || '#fff';
  ctx.font = `bold ${Math.max(8,size+3)}px "Courier New", monospace`;
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(text, Math.round(x), Math.round(y));
  ctx.restore();
}

/* ground / path */
function drawGround(pal, bg){
  const gy=groundY();
  // airport interior supplies its own tiled floor + seated people; don't paint over them
  if(bg.backgroundType==='airport_terminal'){
    ctx.strokeStyle='rgba(255,255,255,0.30)'; ctx.lineWidth=4; ctx.setLineDash([26,26]);
    ctx.lineDashOffset = -state.camX%52;
    ctx.beginPath(); ctx.moveTo(0,gy+ (H-gy)*0.62); ctx.lineTo(W,gy+(H-gy)*0.62); ctx.stroke();
    ctx.setLineDash([]);
    return;
  }
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
