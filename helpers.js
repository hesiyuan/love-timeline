/* love-timeline — helpers.js
   Math/color helpers + segment lookup
   NOTE: loaded as a plain <script> sharing global scope; keep the load order in index.html. */

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
