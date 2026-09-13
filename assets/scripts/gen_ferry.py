#!/usr/bin/env python3
"""Pixel-art ferry sprite (hull + raised deck + superstructure + funnel + BOTH boarding ramps)
for the ocean voyage scene. LOW native resolution so its pixels match the 12x16 characters.

CRITICAL alignment: the sprite is drawn at SCALE=4 (screen px per sprite px) anchored so the
deck-top and ramp geometry line up EXACTLY with ferryWorldPath() in scenery.js, which uses:
  ramp bottoms at 34% / 76% of SEGMENT_W (at ground y=gy),
  ramp tops / deck ends at 44% / 66% (at deckY = gy-74),
  hull extends ~40px beyond the deck each side.
So in SCREEN px the full span (dock lead-in .. lead-out) and heights are known; we divide by
SCALE=4 to get the native sprite grid and place everything on it.

Screen geometry (SEGMENT_W=1400):
  rampBotL_x = 0.34*1400 = 476 ; rampTopL_x = 0.44*1400 = 616
  rampTopR_x = 0.66*1400 = 924 ; rampBotR_x = 0.76*1400 = 1064
  deck span 616..924 = 308 ; hull 40px beyond each deck end
  deckY = gy-74 ; ground = gy
Sprite origin (native 0,0) corresponds to screen (rampBotL_x - 0, gy-136) — see gen notes.
We build a sprite spanning rampBotL_x-8 .. rampBotR_x+8 horizontally, and (deckY-62)..(gy+30).
Output: assets/objects/ferry.png  +  prints the anchor offsets used by drawFerry.
"""
from PIL import Image
import os

SCALE = 4
SEGMENT_W = 1400
gy = 0                      # we work in a local frame; screen y handled at draw time

# screen-space key x's (relative to segment base)
rampBotL = round(0.34*SEGMENT_W)   # 476
rampTopL = round(0.44*SEGMENT_W)   # 616
rampTopR = round(0.66*SEGMENT_W)   # 924
rampBotR = round(0.76*SEGMENT_W)   # 1064
deckY = -74                        # relative to ground (gy=0)
HULL_PAD = 40                      # hull beyond deck ends
funnelTop = deckY-62               # tallest point (funnel)
waterBottom = 30                   # hull dips below ground line

# sprite covers x in [rampBotL-8 .. rampBotR+8], y in [funnelTop .. waterBottom]
SX0 = rampBotL - 8
SX1 = rampBotR + 8
SY0 = funnelTop
SY1 = waterBottom
# native grid (divide screen span by SCALE)
NW = (SX1 - SX0)//SCALE + 1
NH = (SY1 - SY0)//SCALE + 1

im = Image.new("RGBA", (NW, NH), (0,0,0,0))
px = im.load()

HULL   = (47, 74, 99, 255)
HULL_SH= (36, 59, 80, 255)
DECK   = (216, 221, 228, 255)
DECK_SH= (184, 192, 201, 255)
SUP    = (238, 242, 246, 255)
SUP_SH = (206, 214, 222, 255)
WIN    = (159, 194, 224, 255)
FUNNEL = (201, 79, 58, 255)
FUNNEL_T=(47, 58, 68, 255)
RAMP   = (185, 138, 74, 255)
RAMP_SH= (150, 108, 56, 255)
RAIL   = (154, 164, 174, 255)
OUT_L  = (26, 34, 44, 255)
RING   = (224, 90, 74, 255)

def S(x): return (x - SX0)//SCALE          # screen-x -> native col
def SY(y): return (y - SY0)//SCALE         # screen-y (rel ground) -> native row
def rect(x0,y0,x1,y1,c):
    for y in range(max(0,y0),min(NH,y1+1)):
        for x in range(max(0,x0),min(NW,x1+1)):
            px[x,y]=c

# ---- hull: trapezoid from deck ends (+pad) down into the water ----
hx0 = S(rampTopL - HULL_PAD); hx1 = S(rampTopR + HULL_PAD)
dY  = SY(deckY)                       # deck-top row
wB  = SY(waterBottom)                 # hull bottom row
# hull body (slightly tapered bow/stern)
for y in range(dY+4, wB+1):
    taper = round((y-(dY+4)) * 0.20)
    rect(hx0+taper, y, hx1-taper, y, HULL)
rect(hx0+2, wB-1, hx1-2, wB, HULL_SH)   # waterline shade

# ---- deck band (top edge EXACTLY at deckY = the walk surface) ----
rect(hx0, dY, hx1, dY+4, DECK)
rect(hx0, dY, hx1, dY, DECK_SH)
# deck plank ticks
for x in range(hx0+2, hx1, 9):
    px[x, dY+2] = (138,74,42,255) if 0<=x<NW else px[0,0]

# ---- superstructure (white cabin block) + windows, above the deck ----
sup_x0 = S(rampTopL + 30); sup_x1 = S(rampTopR - 20)
sup_top = dY - 9
rect(sup_x0, sup_top, sup_x1, dY-1, SUP)
rect(sup_x0, dY-2, sup_x1, dY-1, SUP_SH)
for wx in range(sup_x0+2, sup_x1-1, 4):
    rect(wx, sup_top+2, wx+1, sup_top+4, WIN)
# a smaller top cabin
rect(sup_x0+4, sup_top-4, sup_x1-6, sup_top-1, SUP)

# ---- funnel (red smokestack) ----
fx0 = S(rampTopL + int(0.5*(rampTopR-rampTopL)))
rect(fx0, SY(funnelTop), fx0+4, dY-9, FUNNEL)
rect(fx0, SY(funnelTop), fx0+4, SY(funnelTop)+1, FUNNEL_T)

# ---- life ring on the deck front ----
rx = S(rampTopL + 20); ry = dY-4
px[rx,ry]=RING; px[rx+1,ry]=RING; px[rx,ry+1]=RING; px[rx+1,ry+1]=RING

# ---- ramps: diagonal planks from ground (ramp bottom) up to the deck top ----
def ramp(x_bot, x_top):
    cB = S(x_bot); cT = S(x_top)
    y_bot = SY(0); y_top = dY        # ground row -> deck-top row
    steps = abs(cT - cB)
    for i in range(steps+1):
        t = i/max(1,steps)
        x = round(cB + (cT-cB)*t)
        y = round(y_bot + (y_top-y_bot)*t)
        rect(x, y, x, y+1, RAMP)     # 2px-thick plank
        px[x, y]=RAMP_SH if 0<=x<NW and 0<=y<NH else px[0,0]
ramp(rampBotL, rampTopL)             # boarding ramp (left, rising right)
ramp(rampBotR, rampTopR)             # exit ramp (right, rising left)

# ---- railing along deck + ramps (thin top line) ----
for x in range(hx0, hx1+1):
    if 0<=x<NW and dY-1>=0: px[x, dY-1] = px[x, dY-1]   # (deck edge already)
# outline pass (from alpha) for a crisp pixel edge
base = im.copy(); bpx = base.load()
for y in range(NH):
    for x in range(NW):
        if bpx[x,y][3]==0:
            for dx,dy in ((1,0),(-1,0),(0,1),(0,-1)):
                nx,ny=x+dx,y+dy
                if 0<=nx<NW and 0<=ny<NH and bpx[nx,ny][3]>0:
                    px[x,y]=OUT_L; break

OUT = os.path.join(os.path.dirname(__file__), "..", "objects")
os.makedirs(OUT, exist_ok=True)
im.save(os.path.join(OUT, "ferry.png"))
# anchor info for drawFerry: screen-x of native col 0 = SX0 (+segment base -camX at draw),
# screen-y of native row 0 = gy + SY0 (since SY0 is relative to ground). Deck-top native row = dY.
print("wrote ferry.png", im.size, "| SX0=%d SY0=%d NW=%d NH=%d SCALE=%d deckRow=%d"%(SX0,SY0,NW,NH,SCALE,SY(deckY)))
