#!/usr/bin/env python3
"""Particle emblems for the category openers (Sorvine-style: a cloud of dots that forms an object).

Each emblem is one real object from a site in that category (design/emblems/<id>.png, transparent,
cropped to its alpha). Dots are sampled with a density that follows the object's light and edges, so
dark objects still read by their highlights and outline. Output: src/data/emblems/<id>.json with
N shuffled points (any prefix is an even subset, for phones) packed as base64:
  x, y: uint16 over the unit square (the object is centred, aspect kept), b: uint8 brightness.

    python3 scripts/emblems.py
"""
import base64, json, struct
from pathlib import Path
import numpy as np
from PIL import Image, ImageFilter

N = 4200
SRC = Path('design/emblems')
OUT = Path('src/data/emblems')
OUT.mkdir(parents=True, exist_ok=True)
rng = np.random.default_rng(7)

for png in sorted(SRC.glob('*.png')):
    im = Image.open(png).convert('RGBA')
    im.thumbnail((520, 520), Image.LANCZOS)
    a = np.asarray(im.getchannel('A'), dtype=np.float32) / 255
    rgb = np.asarray(im.convert('RGB'), dtype=np.float32) / 255
    lum = rgb @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
    g = Image.fromarray((lum * a * 255).astype(np.uint8)).filter(ImageFilter.FIND_EDGES)
    edge = np.asarray(g, dtype=np.float32) / 255
    aedge = np.asarray(Image.fromarray((a * 255).astype(np.uint8)).filter(ImageFilter.FIND_EDGES), dtype=np.float32) / 255
    e = np.clip(edge * 2.2 + aedge * 1.4, 0, 1)
    # local contrast: what makes the inside of an object read (a label, the waffle grid, the filling)
    blur = np.asarray(Image.fromarray((lum * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(5)), dtype=np.float32) / 255
    detail = np.clip(np.abs(lum - blur) * 6, 0, 1)
    mask = (a > 0.5).astype(np.float32)
    dens = mask * (0.1 + 0.42 * lum ** 1.6 + 1.25 * e + 0.9 * detail)
    p = dens.ravel() / dens.sum()
    idx = rng.choice(dens.size, size=N, replace=True, p=p)
    h, w = dens.shape
    ys, xs = np.divmod(idx, w)
    xs = xs + rng.random(N)
    ys = ys + rng.random(N)
    s = max(w, h)
    x = (xs + (s - w) / 2) / s
    y = (ys + (s - h) / 2) / s
    yi, xi = np.minimum(ys.astype(int), h - 1), np.minimum(xs.astype(int), w - 1)
    b = np.clip(0.3 + 0.7 * lum[yi, xi] ** 0.9 + 0.3 * e[yi, xi] + 0.25 * detail[yi, xi], 0, 1)
    order = rng.permutation(N)
    buf = bytearray()
    for i in order:
        buf += struct.pack('<HHB', int(x[i] * 65535), int(y[i] * 65535), int(b[i] * 255))
    data = {'id': png.stem, 'n': N, 'aspect': round(w / h, 4), 'points': base64.b64encode(bytes(buf)).decode()}
    (OUT / f'{png.stem}.json').write_text(json.dumps(data))
    print(f'{png.stem:22} {w}x{h}  {len(data["points"]) / 1024:.1f} KB')
