#!/usr/bin/env python3
"""Generate a pixel-art side-profile Tesla Model Y (nose LEFT, open rear liftgate) as a
PNG sprite, matching the game's chunky pixel-art idiom. Output: assets/objects/tesla.png
Native resolution is small (~118x46) so the game upscales it crisp/nearest-neighbor.
"""
from PIL import Image
import os

BASE = os.path.dirname(__file__)
OUT  = os.path.join(BASE, "..", "objects")
os.makedirs(OUT, exist_ok=True)

W, H = 118, 46
im = Image.new("RGBA", (W, H), (0, 0, 0, 0))
px = im.load()

RED    = (212, 38, 48, 255)
RED_SH = (168, 28, 38, 255)     # lower-body shade
RED_HI = (233, 92, 100, 255)    # top highlight
GLASS  = (32, 36, 43, 255)
GLASS_HI = (74, 92, 108, 255)
TIRE   = (17, 17, 17, 255)
RIM    = (201, 206, 214, 255)
RIM_SH = (150, 156, 166, 255)
OUT_L  = (24, 12, 14, 255)      # dark outline
HEAD   = (238, 244, 255, 255)
TAIL   = (150, 26, 30, 255)
WHITE  = (240, 244, 248, 255)

def rect(x0, y0, x1, y1, c):
    for y in range(max(0,y0), min(H,y1+1)):
        for x in range(max(0,x0), min(W,x1+1)):
            px[x, y] = c

def plot(x, y, c):
    if 0 <= x < W and 0 <= y < H:
        px[x, y] = c

def col(x, y0, y1, c):
    for y in range(max(0,y0), min(H,y1+1)):
        if 0 <= x < W: px[x, y] = c

# ---- geometry (native px). Ground contact at y=H-1; wheels sit at bottom. ----
BODY_BOTTOM = 36        # rocker line
NOSE_X = 6
TAIL_X = 108

# lower body slab (rocker to belt line)
rect(NOSE_X+4, 26, TAIL_X, BODY_BOTTOM, RED)
# --- define a top-edge profile y(x) for the body silhouette ---
def body_top(x):
    # piecewise: low nose -> hood -> roof peak -> fastback taper -> rear
    if x < NOSE_X: return 100
    if x < NOSE_X+14:      # hood rising
        return 30 - int((x-NOSE_X)*0.7)
    if x < 34:             # windshield base to roof rise
        return 20 - int((x-(NOSE_X+14))*0.7)
    if x < 66:             # roof (peak, flat-ish)
        return 9
    if x < 96:             # fastback slope down
        return 9 + int((x-66)*0.5)
    if x <= TAIL_X:        # rear haunch
        return 24 + int((x-96)*0.25)
    return 100

# repaint body cleanly from the profile
for x in range(W):
    for y in range(H):
        px[x, y] = (0,0,0,0)
for x in range(NOSE_X, TAIL_X+1):
    t = body_top(x)
    col(x, t, BODY_BOTTOM, RED)
# top highlight row + lower shade band
for x in range(NOSE_X+2, TAIL_X-1):
    t = body_top(x); plot(x, t, RED_HI)
rect(NOSE_X+4, BODY_BOTTOM-3, TAIL_X-1, BODY_BOTTOM, RED_SH)

# ---- greenhouse glass (follows roof 34..96) ----
def roof_top(x): return body_top(x)
for x in range(34, 96):
    gtop = roof_top(x) + 2
    gbot = 24
    if gtop < gbot:
        col(x, gtop, gbot, GLASS)
# glass highlight streak
for x in range(42, 88):
    plot(x, roof_top(x)+3, GLASS_HI)
# B-pillar split + door seam
for y in range(11, 26): plot(64, y, RED_SH)          # B-pillar
for y in range(26, BODY_BOTTOM): plot(40, y, RED_SH) # front door seam
for y in range(26, BODY_BOTTOM): plot(64, y, RED_SH) # rear door seam
# door handles
rect(48, 24, 54, 24, WHITE)
rect(78, 24, 84, 24, WHITE)

# ---- OPEN liftgate raised at the rear (a raised red bar with glass, angled up-right) ----
# drawn as a stepped diagonal from the rear roof upward to the right
lx, ly = 96, 22
for i in range(0, 22):
    x = lx + i
    y = ly - int(i*0.7)
    col(x, y, y+4, RED)
    if 2 <= i <= 18: plot(x, y+1, GLASS)     # hatch glass strip
    plot(x, y, RED_HI)

# ---- headlight (front, left) + taillight (rear) ----
rect(NOSE_X, 27, NOSE_X+3, 30, HEAD)
rect(TAIL_X-2, 26, TAIL_X, 31, TAIL)

# ---- Tesla 'T' hint on the front door ----
rect(28, 28, 34, 28, WHITE)      # T top bar
rect(30, 28, 31, 33, WHITE)      # T stem

# ---- wheels: two, with rims + hub. sit at the bottom. ----
def wheel(cx):
    r = 8
    for y in range(-r, r+1):
        for x in range(-r, r+1):
            d = x*x + y*y
            if d <= r*r:
                px[cx+x, (BODY_BOTTOM-1)+y] = TIRE if (cx+x < W and (BODY_BOTTOM-1)+y < H) else px[cx+x,(BODY_BOTTOM-1)+y]
    # rim
    for y in range(-4, 5):
        for x in range(-4, 5):
            if x*x+y*y <= 16:
                plot(cx+x, (BODY_BOTTOM-1)+y, RIM)
    # spokes (5-ish via a plus + diagonals)
    for d in range(-4,5):
        plot(cx+d, BODY_BOTTOM-1, RIM_SH); plot(cx, BODY_BOTTOM-1+d, RIM_SH)
    plot(cx, BODY_BOTTOM-1, (60,64,70,255))   # hub
wheel(28)
wheel(90)

# ---- 1px dark outline around the solid body (from alpha) ----
base = im.copy(); bpx = base.load()
for y in range(H):
    for x in range(W):
        if bpx[x, y][3] == 0:
            # if any 4-neighbor is opaque and not tire, draw outline
            for dx,dy in ((1,0),(-1,0),(0,1),(0,-1)):
                nx,ny=x+dx,y+dy
                if 0<=nx<W and 0<=ny<H and bpx[nx,ny][3]>0:
                    px[x,y]=OUT_L; break

im.save(os.path.join(OUT, "tesla.png"))
print("wrote", os.path.abspath(os.path.join(OUT, "tesla.png")), im.size)
