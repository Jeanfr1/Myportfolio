#!/usr/bin/env python3
"""Find where the hero's transparent layers sit on the finished hero art.

The kit's layers (Josean, the monumental portrait) were directed to match hero-desktop.png
but are not pixel-registered (README: "não são frames registrados pixel a pixel"). The page
paints the finished art first and then hands over to the live layers, so each layer is
located on the art: SIFT keypoints inside the layer's alpha, ratio-tested matches and a
RANSAC similarity (scale, angle, offset).

Also written: the inner opening of portal-vidro-transparente.png, measured on a zoomed grid
(the frame is drawn in perspective, so the opening is a quad, not a rectangle).

Output: src/data/hero.json
Usage: python3 scripts/register-hero.py   (needs opencv-python, numpy, Pillow)
"""
import json
from pathlib import Path

import cv2
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
KIT = ROOT / "josean-portfolio-ultrapremium"
OUT = ROOT / "src/data/hero.json"

LAYERS = {
    "josean": "03-camadas/josean-corpo-transparente.png",
    "portrait": "03-camadas/retrato-monumental-transparente.png",
}


def load(path):
    return np.array(Image.open(path).convert("RGBA"))


def alpha_box(img, threshold=8):
    ys, xs = np.nonzero(img[..., 3] > threshold)
    return [int(xs.min()), int(ys.min()), int(xs.max()) + 1, int(ys.max()) + 1]


def main():
    art = load(KIT / "02-hero/hero-desktop.png")
    sift = cv2.SIFT_create(nfeatures=8000)
    ka, da = sift.detectAndCompute(cv2.cvtColor(art[..., :3], cv2.COLOR_RGB2GRAY), None)
    out = {"art": {"width": int(art.shape[1]), "height": int(art.shape[0])}, "layers": {}}
    for name, file in LAYERS.items():
        layer = load(KIT / file)
        mask = cv2.erode((layer[..., 3] > 200).astype(np.uint8) * 255, np.ones((9, 9), np.uint8))
        kl, dl = sift.detectAndCompute(cv2.cvtColor(layer[..., :3], cv2.COLOR_RGB2GRAY), mask)
        pairs = cv2.BFMatcher().knnMatch(dl, da, k=2)
        good = [a for a, b in pairs if a.distance < 0.75 * b.distance]
        src = np.float32([kl[m.queryIdx].pt for m in good])
        dst = np.float32([ka[m.trainIdx].pt for m in good])
        M, inliers = cv2.estimateAffinePartial2D(src, dst, method=cv2.RANSAC, ransacReprojThreshold=4)
        s = float(np.hypot(M[0, 0], M[1, 0]))
        rot = float(np.degrees(np.arctan2(M[1, 0], M[0, 0])))
        # the layer's own pixels -> art pixels: p' = (x, y) + s·R(rot)·p
        out["layers"][name] = {
            "box": alpha_box(layer), "size": [int(layer.shape[1]), int(layer.shape[0])],
            "scale": round(s, 4), "rot": round(rot, 2), "x": round(float(M[0, 2]), 1), "y": round(float(M[1, 2]), 1),
            "inliers": int(inliers.sum()),
        }
        print(name, out["layers"][name])
    out["portal"] = {"size": [1448, 1086], "inner": [[296, 112], [1218, 240], [1218, 892], [296, 976]]}
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(out, indent=2) + "\n")


if __name__ == "__main__":
    main()
