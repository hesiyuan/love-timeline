/* love-timeline — effects.js
   Weather FX + particles (pickup sparkles, ambient hearts, wardrobe poof)
   NOTE: loaded as a plain <script> sharing global scope; keep the load order in index.html. */

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
