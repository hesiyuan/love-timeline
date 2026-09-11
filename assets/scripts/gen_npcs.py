#!/usr/bin/env python3
"""Generate diverse NPC sprites (walk + seated) by recoloring/editing the base
Mr./Mrs. Man frames. Adds varied hair styles/colors, glasses on some, and age
cues (grey hair = older, smaller = younger). Outputs, per variant id:
  assets/characters/npc/<id>/walk_0..7.png    (8-frame walk cycle)
  assets/characters/npc/<id>/sit.png          (single seated pose)
"""
from PIL import Image
import os

BASE = os.path.dirname(__file__)
CHARS = os.path.join(BASE, "..", "characters")

SRC = {
    "husband": {"shirt": (62,154,218), "shirtShade": (70,101,200)},
    "wife":    {"shirt": (194,62,218), "shirtShade": (165,30,161)},
}
SKIN, SKIN_SH = (255,212,168), (239,150,98)
HAIR1, HAIR2 = (30,28,34), (70,66,78)
OUTLINE = (25,14,14)

# 8 diverse variants. hair: 'short','long','bald','bun','cap'. glasses bool. age: 'y','a','o'
VARIANTS = {
  "npc1": dict(base="husband", shirt=(196,110,74), shirtShade=(150,82,54),  skin=(247,206,160),skinSh=(214,150,110), hair=(60,42,28),hairHi=(96,70,48),  style="short", glasses=False, age="a"),
  "npc2": dict(base="wife",    shirt=(79,159,111),shirtShade=(52,120,80),   skin=(222,170,130),skinSh=(190,132,96),  hair=(40,34,30),hairHi=(80,66,58),  style="long",  glasses=True,  age="a"),
  "npc3": dict(base="husband", shirt=(86,96,120), shirtShade=(60,68,90),    skin=(255,212,168),skinSh=(239,150,98),  hair=(196,180,120),hairHi=(226,214,160), style="short", glasses=True, age="a"),
  "npc4": dict(base="wife",    shirt=(200,80,110),shirtShade=(160,52,80),   skin=(150,102,72), skinSh=(120,80,56),   hair=(24,20,22),hairHi=(60,54,56),  style="bun",   glasses=False, age="a"),
  "npc5": dict(base="husband", shirt=(150,150,158),shirtShade=(110,110,120),skin=(232,190,158),skinSh=(200,158,124), hair=(190,190,196),hairHi=(220,220,226), style="bald", glasses=True, age="o"),  # older, grey/balding
  "npc6": dict(base="wife",    shirt=(214,170,60),shirtShade=(170,132,44),  skin=(255,212,168),skinSh=(239,150,98),  hair=(150,150,158),hairHi=(190,190,196), style="long", glasses=False, age="o"),  # older woman, grey
  "npc7": dict(base="husband", shirt=(90,170,190),shirtShade=(60,130,150),  skin=(248,214,178),skinSh=(214,168,128), hair=(120,70,30),hairHi=(160,100,50), style="cap",  glasses=False, age="y"),  # younger, ball cap
  "npc8": dict(base="wife",    shirt=(150,110,200),shirtShade=(110,78,160),  skin=(228,178,140),skinSh=(196,140,104), hair=(30,28,34),hairHi=(70,66,78),  style="long", glasses=True,  age="y"),
  # flight attendants: navy uniform, brown hair, white collar + red scarf + navy pillbox cap
  "attendant1": dict(base="wife", shirt=(38,52,92), shirtShade=(26,36,66),  skin=(247,206,160),skinSh=(214,150,110), hair=(96,64,36),hairHi=(132,92,52), style="bun",  glasses=False, age="a", uniform=True),
  "attendant2": dict(base="wife", shirt=(38,52,92), shirtShade=(26,36,66),  skin=(224,170,132),skinSh=(190,132,96),  hair=(60,42,28),hairHi=(96,68,44), style="short",glasses=False, age="a", uniform=True),
  # children: small kids playing in the park. child1 = boy in blue overalls (brown hair),
  # child2 = kid in grey hoodie (dark hair). age='c' => strong downscale (feet-aligned).
  "child1": dict(base="husband", shirt=(86,132,196),shirtShade=(58,98,156), skin=(247,206,160),skinSh=(214,150,110), hair=(96,64,36),hairHi=(132,92,52), style="short", glasses=False, age="c", overalls=True),
  "child2": dict(base="husband", shirt=(150,156,162),shirtShade=(108,114,120),skin=(224,170,132),skinSh=(190,132,96), hair=(30,28,34),hairHi=(66,60,64), style="short", glasses=False, age="c", hood=True),
}

def paint(px,w,h,v):
    s=SRC[v["base"]]
    for y in range(h):
        for x in range(w):
            r,g,b,a=px[x,y]
            if a==0: continue
            c=(r,g,b)
            if   c==s["shirt"]:      px[x,y]=v["shirt"]+(255,)
            elif c==s["shirtShade"]: px[x,y]=v["shirtShade"]+(255,)
            elif c==SKIN:            px[x,y]=v["skin"]+(255,)
            elif c==SKIN_SH:         px[x,y]=v["skinSh"]+(255,)
            elif c in (HAIR1,HAIR2): px[x,y]=(v["hair"] if c==HAIR1 else v["hairHi"])+(255,)

def hair_and_features(px,w,h,v):
    HAIR=v["hair"]+(255,); HHI=v["hairHi"]+(255,); OL=OUTLINE+(255,); SKIN=v["skin"]+(255,)
    # ---- FLAT-ISH HAIR with softened corners (natural, not a perfect box) ----
    # Flatter/wider than the husband's round dome, but the top corners are clipped
    # so it reads as a real short haircut rather than a rectangle.
    for y in range(0,4):
        for x in range(w):
            if px[x,y][3]>0 and px[x,y][:3]!=OUTLINE: px[x,y]=(0,0,0,0)
    hx0, hx1 = 2, w-3
    # top edge (row 1) is inset one pixel each side -> clipped corners
    for x in range(hx0+1, hx1):
        px[x,0]=OL                                   # thin outline over the flat top
    px[hx0,1]=OL; px[hx1,1]=OL                       # corner outline pixels (rounded feel)
    for y in range(1,4):
        if hx0-1>=0: px[hx0-1,y]=OL
        if hx1+1<w:  px[hx1+1,y]=OL
    # fill: row 1 inset by 1 (clipped corners), rows 2-3 full width; highlight band row 1
    for x in range(hx0+1, hx1): px[x,1]=HHI
    for y in (2,3):
        for x in range(hx0,hx1+1): px[x,y]=HAIR
    # straight-ish sideburn to the brow
    px[hx0,4]=HAIR; px[hx1,4]=HAIR

    st=v["style"]
    if st=="bald":
        for x in range(w):
            for y in (1,2):
                if px[x,y][3]>0 and px[x,y][:3]!=OUTLINE: px[x,y]=SKIN
        px[hx0,4]=SKIN; px[hx1,4]=SKIN
    elif st=="long":
        # square hair also drapes straight down the sides past the jaw
        for y in range(4,9):
            px[hx0,y]=HAIR; px[hx1,y]=HAIR
    elif st=="bun":
        cx=w//2
        for dx in range(-1,2): px[cx+dx,0]=HAIR
        px[cx,0]=HHI
    elif st=="cap":
        band=v["shirt"]+(255,)
        for x in range(hx0,hx1+1): px[x,2]=band; px[x,3]=band   # cap band over the flat hair
        for x in range(w//2, hx1+1): px[x,4]=band                # brim to one side
    # glasses: dark bar across the eyes (row 4-5)
    if v.get("glasses"):
        for x in range(3,w-3):
            if px[x,4][3]>0 and px[x,4][:3]!=OUTLINE: px[x,4]=OL
        px[w//2,4]=(210,230,255,255)

def age_transform(im,v):
    # older: slight downward squash (stooped); younger: overall smaller
    if v["age"]=="o":
        return im  # (grey hair already conveys age; keep height)
    if v["age"]=="c":
        # child: strong feet-aligned downscale so kids read clearly smaller than adults
        w,h=im.size
        small=im.resize((max(1,round(w*0.62)), max(1,round(h*0.62))), Image.NEAREST)
        canvas=Image.new("RGBA",(w,h),(0,0,0,0))
        canvas.paste(small,( (w-small.width)//2, h-small.height))  # feet-aligned
        return canvas
    if v["age"]=="y":
        w,h=im.size
        small=im.resize((max(1,round(w*0.82)), max(1,round(h*0.82))), Image.NEAREST)
        canvas=Image.new("RGBA",(w,h),(0,0,0,0))
        canvas.paste(small,( (w-small.width)//2, h-small.height))  # feet-aligned
        return canvas
    return im

def child_details(px,w,h,v):
    # kid-clothing extras painted over the recolored base (before downscale):
    OL=OUTLINE+(255,)
    if v.get("overalls"):
        # denim overalls: a bib panel on the torso + two shoulder straps
        DENIM=v["shirt"]+(255,); DEN_SH=v["shirtShade"]+(255,)
        # straps up over the shoulders (rows 8-9), then bib panel (rows 10-13)
        for y in range(8,10):
            px[3,y]=DENIM; px[w-4,y]=DENIM
        for y in range(10,14):
            for x in range(3,w-3):
                if px[x,y][3]>0: px[x,y]=DENIM
        # a couple of button dots on the bib
        px[4,11]=DEN_SH; px[w-5,11]=DEN_SH
    if v.get("hood"):
        # hoodie hood: a soft collar of hair-adjacent grey behind the neck (row 8-9)
        HOOD=v["shirtShade"]+(255,)
        for x in range(2,w-2):
            if px[x,8][3]>0: px[x,8]=HOOD
        px[2,7]=HOOD; px[w-3,7]=HOOD    # hood peaks at the shoulders

def uniform_details(px,w,h,v):
    # flight-attendant extras painted over the recolored base:
    WHITE=(238,242,248,255); RED=(196,40,52,255); NAVY=(30,42,74,255); NAVY_HI=(52,66,104,255)
    HAIR=v["hair"]+(255,)
    # white collar across the top of the torso (row 9)
    for x in range(2,w-2):
        if px[x,9][3]>0: px[x,9]=WHITE
    # little red neck scarf just under the collar, center (rows 9-10)
    cx=w//2
    px[cx,9]=RED; px[cx,10]=RED; px[cx-1,10]=RED
    # navy pillbox cap sitting on the hair (rows 0-1), slightly inset
    for x in range(3,w-3):
        px[x,0]=NAVY; px[x,1]=NAVY
    px[w//2,0]=NAVY_HI                     # small cap highlight
    # a hint of hair showing below the cap front (row 2 edges)
    px[3,2]=HAIR; px[w-4,2]=HAIR

def make_walk(v,i):
    src=os.path.join(CHARS,v["base"],"casual",f"walk_{i}.png")
    im=Image.open(src).convert("RGBA"); px=im.load(); w,h=im.size
    paint(px,w,h,v); hair_and_features(px,w,h,v)
    if v.get("uniform"): uniform_details(px,w,h,v)
    if v.get("overalls") or v.get("hood"): child_details(px,w,h,v)
    return age_transform(im,v)

def make_sit(v):
    # start from a neutral standing frame, then fold the legs into a seated L-shape
    im=make_walk(v,0).copy(); px=im.load(); w,h=im.size
    OL=OUTLINE+(255,); PANTS=(57,64,106,255)
    # clear existing legs (bottom 3 rows)
    for y in range(h-3,h):
        for x in range(w): 
            if px[x,y][3]>0: px[x,y]=(0,0,0,0)
    # thighs: horizontal block forward (to the left, facing left by default)
    ty=h-4
    for x in range(1,w-1): px[x,ty]=PANTS; px[x,ty+1]=PANTS
    # shins dropping down at the front
    for y in range(ty+1,h):
        px[2,y]=PANTS; px[3,y]=PANTS
        px[w-4,y]=PANTS; px[w-3,y]=PANTS
    # feet
    for x in (2,3,w-4,w-3): px[x,h-1]=(255,255,235,255)
    # thin outline under the seat
    for x in range(1,w-1): px[x,h-1]=px[x,h-1] if px[x,h-1][3] else (0,0,0,0)
    return im

for vid,v in VARIANTS.items():
    outdir=os.path.join(CHARS,"npc",vid); os.makedirs(outdir,exist_ok=True)
    for i in range(8): make_walk(v,i).save(os.path.join(outdir,f"walk_{i}.png"))
    make_sit(v).save(os.path.join(outdir,"sit.png"))
    print("generated",vid,"(",v["style"],"glasses" if v["glasses"] else "-",v["age"],")")
print("done")
