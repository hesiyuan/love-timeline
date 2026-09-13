#!/usr/bin/env python3
"""Pixel-art side-profile Tesla Model Y (nose LEFT, open rear liftgate).
LOW native resolution (~54x24) so each sprite-pixel is the SAME physical size as the
12x16 character sprites when both are on screen. Smooth, streamlined Model Y curve
(domed roof, fastback rear) approximated on the pixel grid via a math profile.
Output: assets/objects/tesla.png
"""
from PIL import Image
import math, os

BASE = os.path.dirname(__file__)
OUT  = os.path.join(BASE, "..", "objects")
os.makedirs(OUT, exist_ok=True)

W, H = 54, 24
im = Image.new("RGBA", (W, H), (0, 0, 0, 0))
px = im.load()

RED    = (212, 38, 48, 255)
RED_SH = (168, 28, 38, 255)
RED_HI = (233, 96, 104, 255)
GLASS  = (32, 36, 43, 255)
GLASS_HI = (86, 104, 120, 255)
TIRE   = (18, 18, 20, 255)
RIM    = (205, 210, 218, 255)
HUB    = (70, 74, 82, 255)
OUT_L  = (24, 12, 14, 255)
HEAD   = (240, 246, 255, 255)
TAIL   = (150, 26, 30, 255)
WHITE  = (238, 242, 248, 255)

def plot(x, y, c):
    if 0 <= x < W and 0 <= y < H: px[x, y] = c
def col(x, y0, y1, c):
    for y in range(int(max(0,y0)), int(min(H, y1+1))): plot(x, y, c)

BOTTOM = 19          # body underside / rocker (wheels dip just below)
NOSE = 3
TAIL = 50

# --- smooth top-edge profile y(x): a streamlined Model Y curve ---
# blends: low rounded nose -> long hood -> domed roof (apex ~center) -> fastback taper -> rounded rear
def body_top(x):
    if x < NOSE or x > TAIL: return 100
    u = (x - NOSE) / (TAIL - NOSE)            # 0 at nose .. 1 at tail
    # single smooth dome: low at nose (u~0), peak cabin (u~0.5), gentle fastback fall to tail.
    # sine hump gives the rounded Model Y roofline; scale sets dome height.
    dome = math.sin(min(math.pi, max(0.0, u) * math.pi))     # 0..1..0
    roof = 2.5 + 11.0 * dome                                 # body height above BOTTOM
    # keep the nose a touch higher than the tail (MY has a short hood, long fastback)
    top = BOTTOM - roof
    return int(round(max(2.0, top)))

# paint body columns
for x in range(NOSE, TAIL+1):
    col(x, body_top(x), BOTTOM, RED)
# top highlight + lower shade
for x in range(NOSE+1, TAIL):
    plot(x, body_top(x), RED_HI)
for x in range(NOSE+2, TAIL-1):
    plot(x, BOTTOM, RED_SH); plot(x, BOTTOM-1, RED_SH)

# --- greenhouse glass: sits under the dome, roughly x 16..40 ---
gx0, gx1 = 16, 40
for x in range(gx0, gx1):
    gtop = body_top(x) + 1
    gbot = 11
    if gtop < gbot: col(x, gtop, gbot, GLASS)
# windshield/backlight rake: trim front & rear glass corners
for i in range(3):
    plot(gx0+i, body_top(gx0+i)+1+i, RED)      # A-pillar rake
    plot(gx1-1-i, body_top(gx1-1-i)+1+i, RED)  # C-pillar rake
# glass highlight + B-pillar
for x in range(gx0+3, gx1-3): plot(x, body_top(x)+2, GLASS_HI)
col(28, body_top(28)+1, 11, RED_SH)            # B-pillar
# door seams
col(20, 12, BOTTOM-1, RED_SH); col(36, 12, BOTTOM-1, RED_SH)
plot(24, 13, WHITE); plot(40, 13, WHITE)       # door handles

# --- OPEN liftgate raised at the rear (smooth diagonal, up to the right) ---
lx, ly = 46, 10
for i in range(0, 12):
    x = lx + i; y = ly - int(round(i*0.75))
    col(x, y, y+2, RED)
    if 1 <= i <= 10: plot(x, y+1, GLASS)
    plot(x, y, RED_HI)

# --- headlight + taillight ---
col(NOSE+1, 13, 15, HEAD)
col(TAIL-1, 12, 15, TAIL)

# --- Tesla 'T' hint on front door ---
plot(12,14,WHITE); plot(13,14,WHITE); plot(14,14,WHITE); plot(13,15,WHITE); plot(13,16,WHITE)

# --- wheels (small, rimmed), sit at the bottom ---
def wheel(cx):
    r = 4
    for y in range(-r, r+1):
        for x in range(-r, r+1):
            if x*x+y*y <= r*r: plot(cx+x, (BOTTOM-1)+y, TIRE)
    for y in range(-2, 3):
        for x in range(-2, 3):
            if x*x+y*y <= 4: plot(cx+x, (BOTTOM-1)+y, RIM)
    plot(cx,(BOTTOM-1),HUB)
wheel(14)
wheel(42)

# --- 1px dark outline around the solid body (from alpha) ---
base = im.copy(); bpx = base.load()
for y in range(H):
    for x in range(W):
        if bpx[x, y][3] == 0:
            for dx,dy in ((1,0),(-1,0),(0,1),(0,-1)):
                nx,ny=x+dx,y+dy
                if 0<=nx<W and 0<=ny<H and bpx[nx,ny][3]>0:
                    plot(x,y,OUT_L); break

# --- strip orphan outline pixels (no body neighbor in the FINAL image) -> kills stray dots ---
fpx = im.load()
orphans=[]
for y in range(H):
    for x in range(W):
        if fpx[x,y]==OUT_L:
            body=False
            for dx in (-1,0,1):
                for dy in (-1,0,1):
                    nx,ny=x+dx,y+dy
                    if 0<=nx<W and 0<=ny<H and fpx[nx,ny][3]>0 and fpx[nx,ny]!=OUT_L:
                        body=True
            if not body: orphans.append((x,y))
for (x,y) in orphans: fpx[x,y]=(0,0,0,0)

im.save(os.path.join(OUT, "tesla.png"))
print("wrote", os.path.abspath(os.path.join(OUT, "tesla.png")), im.size)
