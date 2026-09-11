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
    //    floor-to-ceiling: from just under the ceiling band down to the floor line
    const gx0 = base+250, gx1 = base+W-250, gTop = topWall+24, gBot = gy;
    const wthr = (gameTimeline[state.currentEvent]||{}).weather;
    airportGlassWall(gx0, gTop, gx1-gx0, gBot-gTop, wthr);

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
    for(let i=0;i<2;i++){
      const r=((i*97+37)%100)/100, r2=((i*151+11)%100)/100;
      const dir = (i%2===0) ? 1 : -1;
      const span = W - 100;
      const speed = 0.35 + r*0.4;
      let off = (state.time*speed + i*300) % span;
      let x = base + 50 + (dir>0 ? off : span-off);
      npcWalker(Math.round(x), gy-1, r, r2, dir, ATTENDANT_IDS[i % ATTENDANT_IDS.length]);
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

  // ---- FERRY VOYAGE (event 4): board via ramp -> sail as you cross the deck -> dock ----
  // screenSpace layer. `state.ferryProgress` (0..1) = hero's position across the segment;
  // 0=at the dock boarding, 1=arrived at Nanaimo. Ocean + coastline scroll with progress.
  ferryScene(base, gy, pal, o){
    const p = state.ferryProgress || 0;
    const deckTop = gy - 26;                 // deck surface the characters stand on
    const t = state.time;
    // 1) ocean fills below the horizon; distant coastline scrolls left as we sail
    const horizon = gy - 150;
    ctx.fillStyle='#7fa9c8'; ctx.fillRect(0, horizon, W, gy-horizon);            // sea
    // departure coastline slides off to the LEFT as progress grows
    drawCoast(Math.round(W*0.10 - p*(W*1.4)), horizon, 260, 46, '#6f8f74', 'Departure Bay');
    // Nanaimo coastline slides IN from the right as we approach (p->1)
    drawCoast(Math.round(W*1.2 - p*(W*1.05)), horizon, 300, 56, '#5f8f7a', 'Nanaimo');
    // animated wave lines on the sea
    ctx.strokeStyle='rgba(255,255,255,0.28)'; ctx.lineWidth=2;
    for(let i=0;i<8;i++){ const wy=horizon+22+i*16 + Math.sin(t*0.05+i)*2;
      ctx.beginPath(); ctx.moveTo(0,wy); for(let x=0;x<=W;x+=44){ ctx.lineTo(x, wy+Math.sin((x+t*3)*0.03+i)*3);} ctx.stroke(); }

    // 2) the ferry deck the couple walks on (spans the screen, gentle bob)
    const bob = Math.round(Math.sin(t*0.04)*2);
    const hullTop = deckTop + bob;
    ctx.fillStyle='#d8dde4'; ctx.fillRect(0, hullTop, W, gy-hullTop+14);          // deck
    ctx.fillStyle='#b8c0c9'; ctx.fillRect(0, hullTop, W, 5);                      // deck edge
    ctx.fillStyle='#8a4a2a'; for(let x=8; x<W; x+=40) ctx.fillRect(x, hullTop+8, 26, 2); // planks
    // railing along the back of the deck
    ctx.strokeStyle='#9aa4ae'; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(0, hullTop-18); ctx.lineTo(W, hullTop-18); ctx.stroke();
    for(let x=20; x<W; x+=46){ ctx.beginPath(); ctx.moveTo(x, hullTop-18); ctx.lineTo(x, hullTop); ctx.stroke(); }
    // a life-ring + funnel for flavor
    ctx.fillStyle='#e05a4a'; ctx.beginPath(); ctx.arc(W*0.5, hullTop-30, 10,0,7); ctx.fill();
    ctx.fillStyle='#fff'; ctx.beginPath(); ctx.arc(W*0.5, hullTop-30, 5,0,7); ctx.fill();

    // 3) BOARDING ramp at the left (fades/retracts after we've boarded, p>0.12)
    if(p < 0.16){
      const a = 1 - p/0.16;
      ctx.save(); ctx.globalAlpha=a;
      ferryRamp(0, gy, 120, hullTop, '#b98a4a');       // ramp from left dock up onto deck
      ctx.restore();
    }
    // 4) EXIT ramp at the far right, appears as we near Nanaimo (p>0.8) so we can walk off
    if(p > 0.8){
      const a = Math.min(1, (p-0.8)/0.2);
      ctx.save(); ctx.globalAlpha=a;
      ferryRamp(W-120, gy, 120, hullTop, '#b98a4a');    // exit ramp down to the dock
      ctx.restore();
    }
  },
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
    ocean_ferry_cruise:    [ {kind:'ferryScene',speed:0,opts:{screenSpace:true}} ],
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

// a distant coastline mound with a couple of trees + a dock, and a small label
function drawCoast(x, horizon, w, h, color, label){
  if(x < -w-40 || x > W+40) return;
  ctx.fillStyle=color;
  ctx.beginPath(); ctx.moveTo(x, horizon+8);
  ctx.quadraticCurveTo(x+w*0.5, horizon-h, x+w, horizon+8); ctx.lineTo(x+w, horizon+8); ctx.closePath(); ctx.fill();
  // little trees
  ctx.fillStyle='rgba(40,80,50,0.7)';
  for(let i=0;i<4;i++){ const tx=x+30+i*(w/5); ctx.beginPath(); ctx.arc(tx, horizon-2, 7,0,7); ctx.fill(); ctx.fillRect(tx-2, horizon-2, 4, 8); }
  // dock jutting into the water
  ctx.fillStyle='#7a5f3a'; ctx.fillRect(x+w*0.4, horizon+8, 40, 5);
  // label
  ctx.fillStyle='rgba(255,255,255,0.85)'; ctx.font='bold 11px "Courier New",monospace';
  ctx.fillText(label, Math.round(x+w*0.3), Math.round(horizon-h*0.5));
}

// a boarding/exit ramp from a side dock up to the deck top
function ferryRamp(dockX, gy, w, deckTop, color){
  ctx.fillStyle=color;
  ctx.beginPath();
  ctx.moveTo(dockX, gy); ctx.lineTo(dockX+w, deckTop+8);
  ctx.lineTo(dockX+w, deckTop+16); ctx.lineTo(dockX, gy+8); ctx.closePath(); ctx.fill();
  // ramp tread lines + side rails
  ctx.strokeStyle='rgba(0,0,0,0.2)'; ctx.lineWidth=1;
  for(let s=0;s<6;s++){ const tx=dockX + (w/6)*s; const ty=gy - (gy-(deckTop+8))*(s/6);
    ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(tx, ty+8); ctx.stroke(); }
  ctx.strokeStyle='#8a6a3a'; ctx.lineWidth=2;
  ctx.beginPath(); ctx.moveTo(dockX, gy-14); ctx.lineTo(dockX+w, deckTop-6); ctx.stroke();  // handrail
}

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
function airportGlassWall(x, y, w, h, weather){
  ctx.save();
  ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();   // everything stays inside the window
  const horizon = y + Math.round(h*0.42);
  const overcast = (weather==='gentle_rain' || weather==='snow_light' || weather==='cloudy_coastal');
  // sky (dimmer if overcast)
  ctx.fillStyle = overcast ? '#c2ccd6' : '#cfe6fb'; ctx.fillRect(x, y, w, horizon-y);
  ctx.fillStyle = overcast ? '#d4dbe2' : '#eaf4ff'; ctx.fillRect(x, horizon-Math.round(h*0.06), w, Math.round(h*0.06));
  // drifting clouds (animate so the window feels alive)
  ctx.fillStyle='rgba(255,255,255,0.85)';
  for(let k=0;k<3;k++){ const cx=x+((k*Math.round(w/3)+Math.round(state.time*0.2))%(w+60))-30; const cy=y+Math.round(h*0.13)+k*8;
    ctx.beginPath(); ctx.arc(cx,cy,9,0,7); ctx.arc(cx+11,cy+3,7,0,7); ctx.arc(cx-9,cy+3,6,0,7); ctx.fill(); }
  // treeline + apron tarmac (no runway)
  ctx.fillStyle = '#7fa06a'; ctx.fillRect(x, horizon, w, Math.round(h*0.08));
  ctx.fillStyle = '#6b7178'; ctx.fillRect(x, horizon+Math.round(h*0.08), w, y+h-(horizon+Math.round(h*0.08)));
  // yellow apron lead-in lines
  ctx.strokeStyle='rgba(240,210,90,0.7)'; ctx.lineWidth=2;
  ctx.beginPath(); ctx.moveTo(x+Math.round(w*0.1), y+h); ctx.lineTo(x+Math.round(w*0.4), horizon+Math.round(h*0.14)); ctx.stroke();
  // parked plane being serviced + GROUND OPS
  tarmacPlane(x+Math.round(w*0.44), horizon+Math.round(h*0.18), 1.0, '#e8edf2', '#3a78c0');
  apronTug(x+Math.round(w*0.30), horizon+Math.round(h*0.34));
  baggageCarts(x+Math.round(w*0.58), horizon+Math.round(h*0.42));
  groundCrew(x+Math.round(w*0.18), horizon+Math.round(h*0.44));
  groundCrew(x+Math.round(w*0.72), horizon+Math.round(h*0.46));
  // WEATHER through the glass, consistent with the scene
  if(weather==='gentle_rain'){
    ctx.strokeStyle='rgba(200,220,240,0.5)'; ctx.lineWidth=1;
    for(let i=0;i<60;i++){ const rx=x+((i*53+state.time*6)%w); const ry=y+((i*97+state.time*9)%h);
      ctx.beginPath(); ctx.moveTo(rx,ry); ctx.lineTo(rx-2,ry+8); ctx.stroke(); }
  } else if(weather==='snow_light'){
    ctx.fillStyle='rgba(255,255,255,0.9)';
    for(let i=0;i<50;i++){ const sx=x+((i*61+Math.sin(state.time*0.02+i)*20+w)%w); const sy=y+((i*83+state.time*2)%h);
      ctx.beginPath(); ctx.arc(sx,sy,1.5,0,7); ctx.fill(); }
  }
  // subtle glass sheen (transparent, not painted-on)
  ctx.fillStyle = 'rgba(190,220,250,0.08)'; ctx.fillRect(x, y, w, h);
  ctx.strokeStyle = 'rgba(255,255,255,0.10)'; ctx.lineWidth = 14;
  ctx.beginPath(); ctx.moveTo(x+Math.round(w*0.15), y+h); ctx.lineTo(x+Math.round(w*0.15)+h, y); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x+Math.round(w*0.6), y+h); ctx.lineTo(x+Math.round(w*0.6)+h, y); ctx.stroke();
  ctx.restore();
  // mullions + frame (over the clip)
  ctx.fillStyle = '#9aa7b4';
  for(let mx=x; mx<=x+w; mx+=Math.round(w/8)) ctx.fillRect(mx-2, y, 4, h);
  ctx.fillStyle = '#7f8b98';
  ctx.fillRect(x-4, y-4, w+8, 6); ctx.fillRect(x-4, y+h-2, w+8, 6);
}

// pushback tug (small tractor) on the apron
function apronTug(x, y){
  x=Math.round(x); y=Math.round(y);
  ctx.fillStyle='#d8dde2'; ctx.fillRect(x-16, y-8, 32, 10);
  ctx.fillStyle='#c2c8ce'; ctx.fillRect(x-6, y-15, 16, 8);
  ctx.fillStyle='rgba(150,200,235,0.85)'; ctx.fillRect(x-4, y-13, 12, 5);
  ctx.fillStyle='#2a2a2a'; ctx.beginPath(); ctx.arc(x-10,y+2,4,0,7); ctx.arc(x+10,y+2,4,0,7); ctx.fill();
  ctx.strokeStyle='#555'; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(x+16,y-3); ctx.lineTo(x+30,y-3); ctx.stroke();
}
// train of baggage carts loaded with luggage
function baggageCarts(x, y){
  x=Math.round(x); y=Math.round(y);
  const cols=['#b03b3b','#3b6bb0','#3b9f6b','#b0913b'];
  for(let c=0;c<3;c++){ const cx=x+c*30;
    ctx.fillStyle='#8a8f96'; ctx.fillRect(cx, y-6, 26, 8);
    ctx.fillStyle='#2a2a2a'; ctx.beginPath(); ctx.arc(cx+5,y+3,3,0,7); ctx.arc(cx+21,y+3,3,0,7); ctx.fill();
    ctx.fillStyle=cols[c%4]; ctx.fillRect(cx+3, y-14, 9, 8);
    ctx.fillStyle=cols[(c+1)%4]; ctx.fillRect(cx+14, y-12, 8, 6);
  }
}
// a ground-crew worker in a hi-vis vest
function groundCrew(x, y){
  x=Math.round(x); y=Math.round(y);
  ctx.fillStyle='#39406a'; ctx.fillRect(x-3, y-8, 2, 8); ctx.fillRect(x+1, y-8, 2, 8);
  ctx.fillStyle='#f2c33a'; ctx.fillRect(x-4, y-18, 8, 10);
  ctx.fillStyle='#f2c39a'; ctx.fillRect(x-3, y-24, 6, 6);
  ctx.fillStyle='#e06a2a'; ctx.fillRect(x-4, y-25, 8, 3);
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
  pixelLabel('MF805 VANCOUVER', x+6, y+14, 6, '#ffd24a');
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
  // attendant behind the desk (upper body over the counter) + traveller in front
  if(!drawNpc('npc3', x+14, top+18, 60, 0, -1, false)) person(x+14, gy, '#2f3a52', '#f2c39a', '#241a14');
  if(!drawNpc('npc1', x-16, gy,    64, 0,  1, false)) person(x-14, gy, '#7a5a3a', '#f6c9a8', '#3a2a22');
}

// a row of seats with SEATED NPC sprites (dedicated sit pose)
function seatedRow(x, gy, n){
  const seatW=30;
  for(let i=0;i<n;i++){
    const sx = Math.round(x + i*seatW);
    // seat back + cushion
    ctx.fillStyle='#3f4756'; ctx.fillRect(sx, gy-13, seatW-4, 13);
    ctx.fillStyle='#4d566a'; ctx.fillRect(sx-1, gy-32, 4, 32);
    const id = NPC_IDS[(i*3 + Math.floor(x/71)) % NPC_IDS.length];
    const cx = sx + Math.round((seatW-4)/2);
    if(!drawNpcSit(id, cx, gy-4, 58, (i%2?1:-1))){
      ctx.fillStyle=['#c0553f','#3f6bc0','#4f9f6f','#b06fb0','#c9a23f'][i%5];
      ctx.fillRect(cx-6, gy-24, 12, 13);
    }
    // seat front bar over the lower legs
    ctx.fillStyle='#353c49'; ctx.fillRect(sx, gy-6, seatW-4, 6);
  }
}

// a walking traveller/attendant (real sprite) drifting horizontally (dir = +1/-1)
function npcWalker(x, gy, r, r2, dir, forceId){
  dir = dir || 1;
  const id = forceId || NPC_IDS[Math.floor(r*NPC_IDS.length)%NPC_IDS.length];
  const isAttendant = forceId && forceId.indexOf('attendant')===0;
  const phase = state.time*0.18 + x*0.03;
  if(!drawNpc(id, x, gy, 66, phase, dir, true)){
    const shirt = ['#4a7fc0','#c0553f','#4f9f6f','#8a5a3a','#b06fb0','#3a3f52'][Math.floor(r*6)%6];
    person(x, gy, shirt, r<0.5?'#f2c39a':'#c98a5a', '#241a14', r2<0.5?'#2f3a5c':'#3a3a3f');
  }
  // rolling suitcase for regular travellers only (attendants walk the aisle empty-handed)
  if(!isAttendant && r2>0.45){
    const cx = x - dir*13, y = gy;
    ctx.fillStyle='#241d1a'; ctx.fillRect(cx-5, y-30, 11, 22);
    ctx.fillStyle=['#8a2f2f','#2f5a8a','#3f7f5f','#7a5f2f'][Math.floor(r2*4)%4]; ctx.fillRect(cx-4, y-29, 9, 20);
    ctx.strokeStyle='#333'; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(cx, y-30); ctx.lineTo(x-dir*3, y-38); ctx.stroke();
  }
}

// pixel-art standing figure matching the sprite idiom: square head, block torso,
// black hair cap, two block legs, all on integer pixels with a dark outline.
function person(x, y, shirt, skin, hair, pants){
  x=Math.round(x); y=Math.round(y);
  const OL='#241d1a';                                   // dark outline like the sprites
  hair=hair||'#241a14'; pants=pants||'#39406a';
  // legs (two blocks)
  ctx.fillStyle=OL; ctx.fillRect(x-6, y-14, 12, 14);
  ctx.fillStyle=pants; ctx.fillRect(x-5, y-13, 4, 12); ctx.fillRect(x+1, y-13, 4, 12);
  // shoes
  ctx.fillStyle='#fff'; ctx.fillRect(x-5, y-2, 4, 2); ctx.fillRect(x+1, y-2, 4, 2);
  // torso (outlined block)
  ctx.fillStyle=OL; ctx.fillRect(x-8, y-30, 16, 17);
  ctx.fillStyle=shirt; ctx.fillRect(x-7, y-29, 14, 15);
  // head (square, outlined)
  ctx.fillStyle=OL; ctx.fillRect(x-6, y-42, 12, 12);
  ctx.fillStyle=skin; ctx.fillRect(x-5, y-41, 10, 10);
  // hair cap
  ctx.fillStyle=hair; ctx.fillRect(x-6, y-42, 12, 4); ctx.fillRect(x-6, y-42, 2, 8); ctx.fillRect(x+4, y-42, 2, 8);
  // eyes
  ctx.fillStyle=OL; ctx.fillRect(x-3, y-36, 2, 2); ctx.fillRect(x+1, y-36, 2, 2);
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
  if(sx > -320 && sx < W+160){
    const gy=groundY();
    drawTeslaModelY(sx, gy);
  }
}

// smooth side-profile Tesla Model Y (nose to the left, open liftgate at the rear-right)
function drawTeslaModelY(x, gy){
  const RED='#d42630', RED_SH='#a81c26', GLASS='#20242b', GLASS_HI='#3a4552', TIRE='#111', RIM='#c9ced6';
  const baseY = gy-14;                 // wheel-contact / body bottom
  ctx.save();
  // ---- lower body (smooth curved silhouette) ----
  ctx.fillStyle=RED;
  ctx.beginPath();
  ctx.moveTo(x+6, baseY-6);                          // low nose tip
  ctx.quadraticCurveTo(x-2, baseY-30, x+34, baseY-34);   // hood rise
  ctx.quadraticCurveTo(x+70, baseY-70, x+120, baseY-74); // windshield->roof peak
  ctx.quadraticCurveTo(x+165, baseY-74, x+206, baseY-40);// roof->fastback slope
  ctx.quadraticCurveTo(x+232, baseY-18, x+236, baseY-6); // rear haunch to bumper
  ctx.lineTo(x+236, baseY);                            // rear bottom
  ctx.quadraticCurveTo(x+120, baseY+2, x+6, baseY);    // rocker/underbody
  ctx.closePath(); ctx.fill();
  // subtle lower shadow band
  ctx.fillStyle=RED_SH; ctx.fillRect(x+8, baseY-6, 224, 6);
  // ---- black greenhouse glass (follows the roofline) ----
  ctx.fillStyle=GLASS;
  ctx.beginPath();
  ctx.moveTo(x+44, baseY-34);
  ctx.quadraticCurveTo(x+74, baseY-66, x+118, baseY-68);
  ctx.quadraticCurveTo(x+162, baseY-68, x+196, baseY-40);
  ctx.lineTo(x+188, baseY-38);
  ctx.quadraticCurveTo(x+120, baseY-58, x+54, baseY-34);
  ctx.closePath(); ctx.fill();
  // glass highlight streak
  ctx.strokeStyle=GLASS_HI; ctx.lineWidth=2;
  ctx.beginPath(); ctx.moveTo(x+70, baseY-52); ctx.quadraticCurveTo(x+120,baseY-62,x+170,baseY-46); ctx.stroke();
  // B-pillar (door split)
  ctx.strokeStyle=RED_SH; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(x+120,baseY-70); ctx.lineTo(x+120,baseY-6); ctx.stroke();
  ctx.strokeStyle='rgba(0,0,0,0.25)'; ctx.beginPath(); ctx.moveTo(x+64,baseY-30); ctx.lineTo(x+64,baseY-6); ctx.stroke(); // door seam
  // door handle
  ctx.fillStyle='#eceff3'; ctx.fillRect(x+150, baseY-40, 12, 3);
  // ---- OPEN power liftgate (raised at the rear) ----
  ctx.save(); ctx.translate(x+206, baseY-40); ctx.rotate(-0.62);
  ctx.fillStyle=RED; roundRect(0,-8,64,12,4); ctx.fill();
  ctx.fillStyle=GLASS; roundRect(6,-6,44,7,3); ctx.fill();   // hatch glass
  ctx.restore();
  // ---- headlight + taillight ----
  ctx.fillStyle='#eef4ff'; ctx.beginPath(); ctx.moveTo(x+8,baseY-24); ctx.lineTo(x+22,baseY-22); ctx.lineTo(x+10,baseY-16); ctx.closePath(); ctx.fill();
  ctx.fillStyle='#8a1218'; ctx.fillRect(x+228, baseY-30, 6, 10);   // taillight
  // Tesla 'T' hint on the front door
  ctx.fillStyle='rgba(255,255,255,0.5)'; ctx.fillRect(x+92, baseY-30, 2, 6); ctx.fillRect(x+89, baseY-30, 8, 2);
  // ---- alloy wheels with spokes ----
  const wheels=[x+58, x+188];
  for(const wx of wheels){
    ctx.fillStyle=TIRE; ctx.beginPath(); ctx.arc(wx, baseY, 21, 0, 7); ctx.fill();      // tire
    ctx.fillStyle=RIM;  ctx.beginPath(); ctx.arc(wx, baseY, 12, 0, 7); ctx.fill();      // rim
    ctx.strokeStyle='#8a9099'; ctx.lineWidth=2;                                          // spokes
    for(let a=0;a<5;a++){ const ang=a*Math.PI*2/5; ctx.beginPath(); ctx.moveTo(wx,baseY); ctx.lineTo(wx+Math.cos(ang)*11, baseY+Math.sin(ang)*11); ctx.stroke(); }
    ctx.fillStyle='#3a3f47'; ctx.beginPath(); ctx.arc(wx, baseY, 3, 0, 7); ctx.fill();   // hub
    // wheel arch shading
    ctx.strokeStyle=RED_SH; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(wx, baseY, 24, Math.PI*1.05, Math.PI*1.95); ctx.stroke();
  }
  ctx.restore();
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
