/* love-timeline — audio.js
   Background music, procedural WebAudio texture, pickup chime
   NOTE: loaded as a plain <script> sharing global scope; keep the load order in index.html. */

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
