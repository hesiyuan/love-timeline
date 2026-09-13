#!/usr/bin/env python3
"""Generate cohesive 32x32 pixel-art icons for the 9 memory collectibles.
Each icon is drawn pixel-by-pixel on a 32x32 RGBA grid (transparent bg),
with a dark outline for a clean game-icon look."""
from PIL import Image
import os

OUT = os.path.join(os.path.dirname(__file__), "..", "items")
os.makedirs(OUT, exist_ok=True)
N = 32

def new(): return Image.new("RGBA", (N, N), (0, 0, 0, 0))

def px(img, x, y, c):
    if 0 <= x < N and 0 <= y < N:
        img.putpixel((x, y), c)

def rect(img, x0, y0, x1, y1, c):
    for y in range(y0, y1 + 1):
        for x in range(x0, x1 + 1):
            px(img, x, y, c)

def outline_rect(img, x0, y0, x1, y1, fill, line):
    rect(img, x0, y0, x1, y1, fill)
    for x in range(x0, x1 + 1):
        px(img, x, y0, line); px(img, x, y1, line)
    for y in range(y0, y1 + 1):
        px(img, x0, y, line); px(img, x1, y, line)

OUTLINE = (40, 32, 44, 255)

def outline_from_alpha(img, line):
    """Add a 1px outline only around the actual opaque shape (not a bbox)."""
    opaque = [[img.getpixel((x, y))[3] > 0 for y in range(N)] for x in range(N)]
    for x in range(N):
        for y in range(N):
            if not opaque[x][y]:
                if any(0 <= x+dx < N and 0 <= y+dy < N and opaque[x+dx][y+dy]
                       for dx, dy in [(-1,0),(1,0),(0,-1),(0,1)]):
                    px(img, x, y, line)

# ---- ticket / boarding pass ----
def ticket():
    im = new()
    outline_rect(im, 4, 10, 27, 21, (255, 210, 120, 255), OUTLINE)   # body
    rect(im, 6, 12, 12, 13, (120, 80, 30, 255))                      # header stripe
    for y in range(10, 22): px(im, 19, y, (200, 150, 60, 255))       # perforation
    for y in range(10, 22, 2): px(im, 19, y, (0, 0, 0, 0))
    rect(im, 21, 14, 25, 15, (150, 110, 50, 255))                    # line
    rect(im, 21, 17, 24, 18, (150, 110, 50, 255))
    return im

# ---- water bottle ----
def water_bottle():
    im = new()
    outline_rect(im, 12, 6, 19, 8, (90, 150, 200, 255), OUTLINE)     # cap
    outline_rect(im, 11, 9, 20, 27, (150, 210, 245, 255), OUTLINE)   # body
    rect(im, 13, 14, 18, 24, (110, 180, 225, 255))                   # water
    px(im, 13, 12, (255, 255, 255, 255)); px(im, 14, 13, (255, 255, 255, 255))  # highlight
    return im

# ---- dog bone (leash tag stand-in) ----
def dog_bone():
    im = new()
    c = (245, 235, 205, 255)
    for (cx, cy) in [(9, 12), (9, 19), (23, 12), (23, 19)]:
        for y in range(-3, 4):
            for x in range(-3, 4):
                if x*x + y*y <= 9: px(im, cx+x, cy+y, c)
    rect(im, 9, 13, 23, 18, c)
    outline_from_alpha(im, (140, 120, 80, 255))
    return im

# ---- ferry ticket / ship ----
def ship():
    im = new()
    rect(im, 3, 20, 28, 20, (90, 150, 200, 255))                     # water line
    # hull
    for x in range(6, 26):
        top = 18
        bot = 24 - abs(x - 16) // 4
        rect(im, x, top, x, bot, (200, 60, 60, 255))
    for x in range(6, 26): px(im, x, 24 - abs(x-16)//4, OUTLINE)
    rect(im, 10, 12, 22, 17, (240, 240, 245, 255))                   # cabin
    outline_rect(im, 10, 12, 22, 17, (240, 240, 245, 255), OUTLINE)
    for wx in range(12, 21, 3): rect(im, wx, 14, wx+1, 15, (120, 180, 220, 255))  # windows
    rect(im, 16, 7, 18, 12, (60, 60, 70, 255))                       # funnel
    return im

# ---- wine glass ----
def wine():
    im = new()
    glass = (225, 232, 245, 255)
    winec = (170, 40, 80, 255)
    # bowl: rows 7..15, a rounded cup
    bowl_widths = {7:(11,20), 8:(10,21), 9:(10,21), 10:(10,21), 11:(11,20), 12:(11,20), 13:(12,19), 14:(13,18), 15:(14,17)}
    for y, (x0, x1) in bowl_widths.items():
        for x in range(x0, x1+1):
            # wine fills lower part of the bowl
            px(im, x, y, winec if y >= 10 else glass)
    px(im, 12, 8, (255, 180, 200, 255))            # wine highlight
    rect(im, 15, 16, 16, 24, glass)                # stem
    rect(im, 12, 25, 19, 26, glass)                # base
    outline_from_alpha(im, OUTLINE)
    return im

# ---- magic wand / star ----
def star():
    im = new()
    pts = {(15,4),(16,4),(14,5),(15,5),(16,5),(17,5),
           (10,8),(11,8),(12,8),(13,8),(14,6),(15,6),(16,6),(17,6),(18,8),(19,8),(20,8),(21,8),
           (13,9),(14,9),(15,7),(16,7),(17,9),(18,9),
           (14,10),(15,8),(16,8),(17,10),
           (12,12),(13,11),(14,11),(15,11),(16,11),(17,11),(18,11),(19,12),
           (13,13),(14,13),(17,13),(18,13),
           (12,15),(13,15),(18,15),(19,15)}
    y = (255, 225, 90, 255)
    for (x, yy) in pts: px(im, x, yy, y)
    # simpler: draw a clean 5-point star via scanline
    im = new()
    star_pixels = [
        (15,3),(16,3),
        (15,4),(16,4),
        (14,5),(15,5),(16,5),(17,5),
        (14,6),(15,6),(16,6),(17,6),
        (7,7),(8,7),(9,7),(10,7),(11,7),(12,7),(13,7),(14,7),(15,7),(16,7),(17,7),(18,7),(19,7),(20,7),(21,7),(22,7),(23,7),(24,7),
        (9,8),(10,8),(11,8),(12,8),(13,8),(14,8),(15,8),(16,8),(17,8),(18,8),(19,8),(20,8),(21,8),(22,8),
        (11,9),(12,9),(13,9),(14,9),(15,9),(16,9),(17,9),(18,9),(19,9),(20,9),
        (12,10),(13,10),(14,10),(15,10),(16,10),(17,10),(18,10),(19,10),
        (13,11),(14,11),(15,11),(16,11),(17,11),(18,11),
        (12,12),(13,12),(14,12),(17,12),(18,12),(19,12),
        (10,13),(11,13),(12,13),(19,13),(20,13),(21,13),
        (9,14),(10,14),(21,14),(22,14),
    ]
    yc = (255, 224, 90, 255)
    for p in star_pixels: px(im, p[0], p[1], yc)
    # outline
    for x in range(N):
        for yy in range(N):
            if im.getpixel((x, yy))[3] == 0:
                if any(0 <= x+dx < N and 0 <= yy+dy < N and im.getpixel((x+dx, yy+dy))[:3] == yc[:3]
                       for dx, dy in [(-1,0),(1,0),(0,-1),(0,1)]):
                    px(im, x, yy, (200, 150, 40, 255))
    return im

# ---- scroll / marriage certificate ----
def scroll():
    im = new()
    outline_rect(im, 6, 8, 25, 23, (245, 238, 215, 255), OUTLINE)    # parchment
    rect(im, 5, 7, 26, 9, (200, 160, 90, 255))                       # top roll
    rect(im, 5, 22, 26, 24, (200, 160, 90, 255))                     # bottom roll
    for ly, lx1 in [(12,22),(15,20),(18,23)]:
        rect(im, 9, ly, lx1, ly, (150, 120, 70, 255))                # text lines
    rect(im, 13, 19, 18, 21, (200, 60, 80, 255))                     # wax seal
    return im

# ---- warm tomato soup (hospital event: Warm Soup & Care) ----
def soup():
    im = new()
    BOWL   = (238, 240, 244, 255)   # white ceramic bowl
    BOWL_SH= (206, 210, 218, 255)   # bowl shade
    TOMATO = (226, 78, 54, 255)     # tomato-red soup
    TOMATO_HI=(244, 120, 92, 255)   # soup highlight
    STEAM  = (220, 228, 236, 200)   # steam wisps
    SPOON  = (196, 200, 208, 255)   # spoon
    # steam wisps rising above the bowl (rows 3..12), gently curving
    for (sx, ys) in ((12,(3,4,6,7,9,10)), (16,(2,3,5,6,8,9)), (20,(3,4,6,7,9,10))):
        for y in ys: px(im, sx + (1 if (y//2)%2 else 0), y, STEAM)
    # soup surface (ellipse top of the bowl) rows 14..17
    surf = {14:(9,22), 15:(8,23), 16:(9,22), 17:(11,20)}
    for y,(x0,x1) in surf.items():
        for x in range(x0,x1+1): px(im, x, y, TOMATO)
    px(im,12,15,TOMATO_HI); px(im,13,15,TOMATO_HI); px(im,18,15,TOMATO_HI)  # soup sheen
    # bowl body (a rounded bowl narrowing to the base) rows 17..25
    body = {17:(8,23),18:(8,23),19:(9,22),20:(9,22),21:(10,21),22:(11,20),23:(12,19),24:(13,18)}
    for y,(x0,x1) in body.items():
        for x in range(x0,x1+1): px(im, x, y, BOWL)
    # bowl right-side shade
    for y,(x0,x1) in body.items():
        for x in range(x1-2,x1+1): px(im, x, y, BOWL_SH)
    # a little foot/base
    rect(im, 13, 25, 18, 25, BOWL_SH)
    # spoon resting in the bowl (handle up-right)
    for i in range(6):
        px(im, 20+i, 13-i, SPOON)          # handle
    rect(im, 18, 14, 21, 16, SPOON)        # spoon bowl
    outline_from_alpha(im, (120, 60, 46, 255))
    return im

# ---- heart (kept for reference / other uses) ----
def heart():
    im = new()
    h = (255, 90, 120, 255)
    # symmetric heart via row spans
    rows = {
        8:  [(9,12),(19,22)],
        9:  [(8,13),(18,23)],
        10: [(8,23)],
        11: [(8,23)],
        12: [(8,23)],
        13: [(9,22)],
        14: [(10,21)],
        15: [(11,20)],
        16: [(12,19)],
        17: [(13,18)],
        18: [(14,17)],
        19: [(15,16)],
    }
    for y, spans in rows.items():
        for (x0, x1) in spans:
            for x in range(x0, x1+1): px(im, x, y, h)
    px(im, 11, 10, (255, 170, 190, 255)); px(im, 12, 10, (255, 170, 190, 255))  # highlight
    outline_from_alpha(im, (150, 40, 70, 255))
    return im

# ---- wedding rings ----
def rings():
    im = new()
    gold = (255, 210, 90, 255); goldsh = (200, 150, 40, 255)
    def ring(cx, cy, r):
        for a in range(360):
            import math
            for rr in (r, r-1):
                x = int(round(cx + rr*math.cos(math.radians(a))))
                y = int(round(cy + rr*math.sin(math.radians(a))))
                px(im, x, y, gold)
    ring(13, 18, 6); ring(19, 18, 6)
    # diamond on first ring
    px(im, 13, 11, (200, 240, 255, 255)); px(im, 12, 12, (200, 240, 255, 255))
    px(im, 14, 12, (200, 240, 255, 255)); px(im, 13, 13, (255,255,255,255))
    return im

ICONS = {
    "ticket": ticket, "water_bottle": water_bottle, "dog_bone": dog_bone,
    "ship": ship, "wine": wine, "star": star, "scroll": scroll,
    "heart": heart, "rings": rings, "soup": soup,
}

for name, fn in ICONS.items():
    img = fn()
    img.save(os.path.join(OUT, f"{name}.png"))
    print("wrote", name)
print("done")
