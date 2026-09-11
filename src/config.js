/* love-timeline — config.js
   Version, memory-item icons, timeline data, world constants, weather palettes
   NOTE: loaded as a plain <script> sharing global scope; keep the load order in index.html. */

/* =====================================================================
   OUR STORY — a side-scrolling love timeline
   Vanilla HTML5 Canvas. Zero dependencies. Single file.
   ===================================================================== */

/* ---------------- CC0 SPRITE FRAMES (base64 data-URIs) ----------------
   Mr. Man (GrafxKid) + Mrs. Man (knekko) + Dog Walk (kirard), all CC0 from OpenGameArt.org. */

/* Game version — shown on the start screen and used to cache-bust the <script> tags
   in index.html (keep the ?v=… query strings in sync when you bump this). */
const GAME_VERSION = '1.6.2';


/* ---------------- MEMORY ITEM ICONS (32x32 pixel-art, base64) ---------------- */
const ITEM_ICONS={"ticket": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAqUlEQVR4nGNgGAWjYBSMgpEOGNEFNBR0/pNr2I0HVxgJ6QepQeazYFN0fZMPWQ44eUTgv7mNDU55Tb8tGGIsuBRX1i3DaVB7UxRWcYusI4z/L9mQFIJMDFQEJ6aRZjkIsJDqS3wAFgLT5+zCkMtMcRtiIUAOgIUALt/S3AEnoCGAHgX4HMRE7RAgVQ8LLUKAlChgGpQhoImlxCI2BMjVOwpGwSgYBSMXAABjrzp0ZgZRiwAAAABJRU5ErkJggg==", "water_bottle": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAkklEQVR4nGNgGAWjYKQDRlI1aCjo/Mcnf+PBFZLMZGEgAxiVzcEqfq4rZeiFABM1LSdWDUVRkLfpJF75SX7mDDQLAVoAJnI0ZepyDawDpl/+RjVHsJCj6cajNwz5jzDFNeRESDaLiWGAAdOoAxhGo2CAAdOoAxhGehSwkKOJnCJ30IYAIymKiW3tkNosGwUjGwAAJzgdY5kPaIsAAAAASUVORK5CYII=", "dog_bone": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAjUlEQVR4nGNgGAWjYBSMAiJAT0XAf1rpYyHGgMziWhAFZpd0bGAk1mJS9WEY8vX1WQxMyFek6mNiGGDAiE0Q5Fpo8GEF03ubccoR0oceFYy4FBNyBKkAm+UgMDijAEdqJgvAogtXLmBiGGDAiEtiZKeBHjpmQ5xgZJeE2LIhoexEDX0DUh2PglEwCkYBAIyaqRkpraBqAAAAAElFTkSuQmCC", "ship": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAu0lEQVR4nGNgGAWjYBQMMGCk1AAbG7f/MPaRI7tINo+JYYAB06gDGAYYsBCrUENB5z+pam48uMJINQeAwIkLJxmIBRYG5rSJgo4jz8EYH3tIpQFGYhWC4pfUKKB6GrAgMl5JAYy4JE7Y2BBM9aQAiyNHGAdlGmBB5kRNO4Hw9bISqlqEbPayLAvGQRMFLLg0JDz5AGcvkBEg22Jkc8jOhhpoRSw+B6FbSCgrMhLjAEIOIsXCUTAKRsGgAwAWyEFyx/IPNgAAAABJRU5ErkJggg==", "wine": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAvklEQVR4nGNgGAWjYKQDRlIUayjo/CdG3Y0HV4g2l5EUy3eeOEmUWncLc6IdwUSq5XJnLhNUD1JLbGgxMZAIHpnoMlATsBCr8KRDNAMtABMxikDxWffjDtGGgtRSNQ3QEjARq5DYUCDF9yQ5gBhHkGo5yQ7A5whyLKcIgPL5wxdfwZjYPD+0EyGtABPNTB51AJGAiWGkO4CFVA248jxMnNTCiJFUywm1ikhpDYHAgEcBI6kaCBW7dK0PRsGwAAC351jUsrV1lgAAAABJRU5ErkJggg==", "star": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAp0lEQVR4nGNgGAUUgBPTNP6D8IBZ/v9BFBhT4ggm6jqLTg44MU3jv7mXEZwPYpMbCiyELCLVYdjELbJuMOLSw0isLykBJ7edw+kIRmJ8RK5DQBaTHQKUOIQYi0lyACnRgi+4Kc4FFlk3GGG+o4blIEC0YmzRAHMMNjFiHcJIrOX4LMHlOKqkgRNIlhPyHbpDyIkSqlQ6A1pJjYJRMApGwSgYBaNgyAEAwcVxL1yWg+8AAAAASUVORK5CYII=", "scroll": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAjUlEQVR4nGNgGAWjYBQMMGDEJnhiQdR/WlhmkbAMwz4mhgEGTIMyCkBAQ0Hn/9lzqxmoAYyNQhluPLjCOChDgIUYRQu78skyPL5sInUcEE+EQeQCJobhGAXxJIQYC7UNJBUwMQznXEBM6LEwkGHIZb9KrOp0N7UzDLkoYBpoBzBiExytjkfBKBgFIwoAAFkEH2Db2x6BAAAAAElFTkSuQmCC", "heart": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAo0lEQVR4nO2VQQqAIBBFNTxM6w7humvUgeoarT2E625TVJsayuaPQgTzNqJ8/A8G1BhFUT7GckJD7Zfzvp+DzcmdcZzyrmno8UIv5+YoVlC+M8Z42adyKQlnEFp/rFN4LERxUHoKpjRV8RtLCvRzsHTWCG/zfxXIkeCUswQkEtxytgAigZRDAhwJtBwWSElIykUCdxLS8my2p5p+QIqiKMrvWAHvP2CUrB7jrgAAAABJRU5ErkJggg==", "rings": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAtklEQVR4nO2VwQ2DMAxF7Yg5ukG5dheYj87SXmGDTsAGRkZKJRDBdghCSH4XpJ/I/s4nAOA4juPckc9IVKpWZdlMfUPfRwevXzub4CfWb2R9vZd1TU3UNl4Izw5gaFWmJSPB2pwLMqlm64Zbp2MysFc86luaNoKwt5hyX0oXDURS00RdWi8SwVmEWxggIduc7FUG0JhtzrtQgZI4jeaeayb/mwND8xykm4CWYqlv/pF/geM4cDUToGpdWKlR9JkAAAAASUVORK5CYII="};

/* ---------------- EXTENSIBLE TIMELINE DATA ----------------
   The 9-event timeline now lives in timeline.json (edit it there — no code change).
   It is fetched asynchronously at boot (see engine.js loadTimeline()); until then
   gameTimeline is [] and WORLD_W is 0. The game loop does not start until it loads. */
let gameTimeline = [];


/* ---------------- LAYOUT / WORLD CONSTANTS ---------------- */
const SEGMENT_W = 1400;                 // world px per timeline event
let   WORLD_W = 0;                       // = SEGMENT_W * gameTimeline.length, set after timeline loads
const WALK_SPEED = 4.2;
const GROUND_RATIO = 0.80;              // ground line as fraction of height

/* ---------------- PALETTES PER WEATHER/BG ----------------
   Each palette: sky top/bottom, far scenery, mid scenery, ground, accent. */
const PALETTES = {
  clear_day:        { skyT:"#8fd0ff", skyB:"#e8f6ff", far:"#bcd9ef", mid:"#9fbfd8", ground:"#d7c9a8", accent:"#ffffff" },
  sunset:           { skyT:"#ff9a6b", skyB:"#ffd9a0", far:"#c98fb0", mid:"#7d5a86", ground:"#6b5a3e", accent:"#ffe6b3" },
  sunny:            { skyT:"#7ec8ff", skyB:"#eafaff", far:"#9fd0a0", mid:"#7bb37c", ground:"#c9b98a", accent:"#fff6d0" },
  cloudy_coastal:   { skyT:"#9fb3c4", skyB:"#d9e6ee", far:"#8ea6b8", mid:"#6d8598", ground:"#4b6b82", accent:"#eaf3f8" },
  golden_hour:      { skyT:"#f6b25a", skyB:"#ffe2ad", far:"#b98a5a", mid:"#8a6f45", ground:"#7a6440", accent:"#ffedc2" },
  bright_sunny:     { skyT:"#57b8ff", skyB:"#dff3ff", far:"#c7a3e0", mid:"#f28fb0", ground:"#cbb389", accent:"#fff2c0" },
  snow_light:       { skyT:"#b9c6da", skyB:"#eef3fb", far:"#c7d2e0", mid:"#9fb0c6", ground:"#eef2f8", accent:"#ffffff" },
  gentle_rain:      { skyT:"#6f7a8a", skyB:"#aab6c4", far:"#7c8898", mid:"#5f6b7c", ground:"#4f5866", accent:"#dfe7ee" },
  vibrant_daylight: { skyT:"#6fc9ff", skyB:"#eafff0", far:"#8fd6a0", mid:"#59b06f", ground:"#8fb46a", accent:"#fff7d6" },
};
