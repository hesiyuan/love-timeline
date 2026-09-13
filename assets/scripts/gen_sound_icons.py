#!/usr/bin/env python3
"""Pixel-art speaker icons for the mute/unmute button:
  sound_on.png  = speaker + sound waves
  sound_off.png = speaker + X (muted)
Native 16x16 so it scales up crisp. White-ish so it reads on the dark HUD button.
Output: assets/objects/sound_on.png, assets/objects/sound_off.png
"""
from PIL import Image
import os

OUT = os.path.join(os.path.dirname(__file__), "..", "objects")
os.makedirs(OUT, exist_ok=True)
N = 16
INK   = (238, 242, 248, 255)   # speaker body / lines (light)
INK_D = (200, 208, 218, 255)   # slight shade
WAVE  = (140, 208, 232, 255)   # cyan sound waves
X_RED = (240, 110, 120, 255)   # mute X

def new():
    im = Image.new("RGBA", (N, N), (0,0,0,0)); return im, im.load()

def speaker(px):
    # cone box (rows 6..9) + flared triangle to the right
    for y in range(6,10):
        for x in range(2,5): px[x,y]=INK              # back box
    # cone triangle: widens downward-right from x5..9
    cone=[(5,5,10),(6,4,11),(7,4,11),(8,4,11),(9,5,10)]
    for (x,y0,y1) in cone:
        for y in range(y0,y1): px[x,y]=INK
    # small shade column
    for y in range(6,10): px[4,y]=INK_D

def gen_on():
    im,px = new(); speaker(px)
    # three sound-wave arcs to the right
    for (cx,ys) in ((11,(6,7,8,9)),(12,(5,6,9,10)),(13,(4,5,10,11))):
        for y in ys: px[cx,y]=WAVE
    im.save(os.path.join(OUT,"sound_on.png")); return im

def gen_off():
    im,px = new(); speaker(px)
    # red X to the right (muted)
    for i in range(0,5):
        px[11+i, 5+i]=X_RED
        px[15-i, 5+i]=X_RED
    im.save(os.path.join(OUT,"sound_off.png")); return im

gen_on(); gen_off()
print("wrote sound_on.png + sound_off.png (16x16)")
