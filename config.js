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
const GAME_VERSION = '1.2.1';


/* ---------------- MEMORY ITEM ICONS (32x32 pixel-art, base64) ---------------- */
const ITEM_ICONS={"ticket": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAqUlEQVR4nGNgGAWjYBSMgpEOGNEFNBR0/pNr2I0HVxgJ6QepQeazYFN0fZMPWQ44eUTgv7mNDU55Tb8tGGIsuBRX1i3DaVB7UxRWcYusI4z/L9mQFIJMDFQEJ6aRZjkIsJDqS3wAFgLT5+zCkMtMcRtiIUAOgIUALt/S3AEnoCGAHgX4HMRE7RAgVQ8LLUKAlChgGpQhoImlxCI2BMjVOwpGwSgYBSMXAABjrzp0ZgZRiwAAAABJRU5ErkJggg==", "water_bottle": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAkklEQVR4nGNgGAWjYKQDRlI1aCjo/Mcnf+PBFZLMZGEgAxiVzcEqfq4rZeiFABM1LSdWDUVRkLfpJF75SX7mDDQLAVoAJnI0ZepyDawDpl/+RjVHsJCj6cajNwz5jzDFNeRESDaLiWGAAdOoAxhGo2CAAdOoAxhGehSwkKOJnCJ30IYAIymKiW3tkNosGwUjGwAAJzgdY5kPaIsAAAAASUVORK5CYII=", "dog_bone": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAjUlEQVR4nGNgGAWjYBSMAiJAT0XAf1rpYyHGgMziWhAFZpd0bGAk1mJS9WEY8vX1WQxMyFek6mNiGGDAiE0Q5Fpo8GEF03ubccoR0oceFYy4FBNyBKkAm+UgMDijAEdqJgvAogtXLmBiGGDAiEtiZKeBHjpmQ5xgZJeE2LIhoexEDX0DUh2PglEwCkYBAIyaqRkpraBqAAAAAElFTkSuQmCC", "ship": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAu0lEQVR4nGNgGAWjYBQMMGCk1AAbG7f/MPaRI7tINo+JYYAB06gDGAYYsBCrUENB5z+pam48uMJINQeAwIkLJxmIBRYG5rSJgo4jz8EYH3tIpQFGYhWC4pfUKKB6GrAgMl5JAYy4JE7Y2BBM9aQAiyNHGAdlGmBB5kRNO4Hw9bISqlqEbPayLAvGQRMFLLg0JDz5AGcvkBEg22Jkc8jOhhpoRSw+B6FbSCgrMhLjAEIOIsXCUTAKRsGgAwAWyEFyx/IPNgAAAABJRU5ErkJggg==", "wine": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAvklEQVR4nGNgGAWjYKQDRlIUayjo/CdG3Y0HV4g2l5EUy3eeOEmUWncLc6IdwUSq5XJnLhNUD1JLbGgxMZAIHpnoMlATsBCr8KRDNAMtABMxikDxWffjDtGGgtRSNQ3QEjARq5DYUCDF9yQ5gBhHkGo5yQ7A5whyLKcIgPL5wxdfwZjYPD+0EyGtABPNTB51AJGAiWGkO4CFVA248jxMnNTCiJFUywm1ikhpDYHAgEcBI6kaCBW7dK0PRsGwAAC351jUsrV1lgAAAABJRU5ErkJggg==", "star": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAp0lEQVR4nGNgGAUUgBPTNP6D8IBZ/v9BFBhT4ggm6jqLTg44MU3jv7mXEZwPYpMbCiyELCLVYdjELbJuMOLSw0isLykBJ7edw+kIRmJ8RK5DQBaTHQKUOIQYi0lyACnRgi+4Kc4FFlk3GGG+o4blIEC0YmzRAHMMNjFiHcJIrOX4LMHlOKqkgRNIlhPyHbpDyIkSqlQ6A1pJjYJRMApGwSgYBaNgyAEAwcVxL1yWg+8AAAAASUVORK5CYII=", "scroll": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAjUlEQVR4nGNgGAWjYBQMMGDEJnhiQdR/WlhmkbAMwz4mhgEGTIMyCkBAQ0Hn/9lzqxmoAYyNQhluPLjCOChDgIUYRQu78skyPL5sInUcEE+EQeQCJobhGAXxJIQYC7UNJBUwMQznXEBM6LEwkGHIZb9KrOp0N7UzDLkoYBpoBzBiExytjkfBKBgFIwoAAFkEH2Db2x6BAAAAAElFTkSuQmCC", "heart": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAo0lEQVR4nO2VQQqAIBBFNTxM6w7humvUgeoarT2E625TVJsayuaPQgTzNqJ8/A8G1BhFUT7GckJD7Zfzvp+DzcmdcZzyrmno8UIv5+YoVlC+M8Z42adyKQlnEFp/rFN4LERxUHoKpjRV8RtLCvRzsHTWCG/zfxXIkeCUswQkEtxytgAigZRDAhwJtBwWSElIykUCdxLS8my2p5p+QIqiKMrvWAHvP2CUrB7jrgAAAABJRU5ErkJggg==", "rings": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAtklEQVR4nO2VwQ2DMAxF7Yg5ukG5dheYj87SXmGDTsAGRkZKJRDBdghCSH4XpJ/I/s4nAOA4juPckc9IVKpWZdlMfUPfRwevXzub4CfWb2R9vZd1TU3UNl4Izw5gaFWmJSPB2pwLMqlm64Zbp2MysFc86luaNoKwt5hyX0oXDURS00RdWi8SwVmEWxggIduc7FUG0JhtzrtQgZI4jeaeayb/mwND8xykm4CWYqlv/pF/geM4cDUToGpdWKlR9JkAAAAASUVORK5CYII="};

/* ---------------- EXTENSIBLE TIMELINE DATA ---------------- */
const gameTimeline = [
  { id:1, date:"May 27, 2020", location:"Xiamen Airport → Vancouver Flight",
    partyMembers:["husband"], backgroundType:"airport_terminal", weather:"clear_day",
    title:"The First Glance",
    eventNote:"First met at Xiamen Airport, both preparing to fly to Vancouver.",
    collectible:{ name:"Boarding Pass", icon:"ticket" } },
  { id:2, date:"June 27, 2020", location:"Stanley Park & Safeway Lot, Vancouver",
    partyMembers:["husband","wife"], backgroundType:"park_and_city", weather:"sunset",
    title:"Declaration of Love",
    eventNote:"A confession of love at the Safeway parking lot after a day in Stanley Park.",
    collectible:{ name:"Warm Water Bottle", icon:"water_bottle" } },
  { id:3, date:"Creamy's Arrival", location:"Vancouver (Arrival from Taiwan)",
    partyMembers:["husband","wife","creamy_dog"], backgroundType:"suburban_driveway",
    specialObject:"red_tesla_trunk", weather:"sunny",
    title:"Creamy Joins the Family",
    eventNote:"Met Creamy arriving from Taiwan in a red Tesla trunk. Shy at first, then sprinting all around her new home!",
    collectible:{ name:"Creamy's Leash", icon:"dog_bone" } },
  { id:4, date:"November 2021", location:"Ferry Cruise to Nanaimo",
    partyMembers:["husband","wife","creamy_dog"], backgroundType:"ocean_ferry_cruise",
    weather:"cloudy_coastal",
    title:"Island Getaway",
    eventNote:"Cruising over cloudy waters together toward Nanaimo.",
    collectible:{ name:"Ferry Ticket", icon:"ship" } },
  { id:5, date:"2021 / 2022", location:"Sparkling Hill Resort & Wine Country",
    partyMembers:["husband","wife","creamy_dog"], backgroundType:"mountain_resort_vineyard",
    weather:"golden_hour",
    title:"Sparkling Moments",
    eventNote:"Scenic vineyard views and mountain relaxation together.",
    collectible:{ name:"Wine Glass", icon:"wine" },
    // Explicit declarative scenery (overrides deriveScenery). Add/remove/reorder
    // layers here freely — back-to-front, each with its own parallax `speed`.
    scenery:{ layers:[
      { kind:"mountains", speed:0.14, opts:{ snow:true, peaks:[[40,420,300],[380,500,340]] } },
      { kind:"mountains", speed:0.22, opts:{ color:"#c9a86a", peaks:[[120,360,200],[520,420,240]] } },
      { kind:"vineyard",  speed:0.55, opts:{} },
      { kind:"trees",     speed:0.7,  opts:{ density:4, scale:0.8 } },
    ] } },
  { id:6, date:"June 2022", location:"Orlando — Disney World & Universal",
    partyMembers:["husband","wife","creamy_dog"], backgroundType:"theme_park_castles",
    weather:"bright_sunny",
    title:"Magical Celebration",
    eventNote:"Fun trips with friends through Disney World and Universal Studios.",
    collectible:{ name:"Magic Wand", icon:"star" } },
  { id:7, date:"December 22, 2022", location:"British Columbia, Canada",
    partyMembers:["husband","wife","creamy_dog"], backgroundType:"cozy_winter_city",
    weather:"snow_light",
    title:"Legally Married",
    eventNote:"Official legal marriage celebration in BC.",
    collectible:{ name:"Marriage Certificate", icon:"scroll" } },
  { id:8, date:"August 2023", location:"Hospital Room & Recovery Home",
    partyMembers:["husband","wife","creamy_dog"], backgroundType:"cozy_indoor_care",
    weather:"gentle_rain",
    title:"In Sickness and In Health",
    eventNote:"Taking care of my wife alongside her mother for a week of recovery.",
    collectible:{ name:"Warm Soup & Care", icon:"heart" } },
  { id:9, date:"October 22, 2023", location:"Lakeside Celebration, China",
    partyMembers:["husband","wife","creamy_dog"], backgroundType:"lakeside_trees_wedding",
    weather:"vibrant_daylight",
    title:"Grand Wedding Ceremony",
    eventNote:"A grand wedding by the lake, surrounded by green trees, friends, and family.",
    collectible:{ name:"Wedding Rings", icon:"rings" } },
];

/* ---------------- LAYOUT / WORLD CONSTANTS ---------------- */
const SEGMENT_W = 1400;                 // world px per timeline event
const WORLD_W = SEGMENT_W * gameTimeline.length;
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
