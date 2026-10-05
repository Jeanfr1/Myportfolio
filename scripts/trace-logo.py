#!/usr/bin/env python3
"""Trace the JA monogram (a single flat white on transparency) into an SVG path.

The alpha is upsampled, thresholded and traced (outer shapes and holes, even-odd fill), so
the mark stays sharp at any size; the kit's PNG remains the reference.

Output: src/assets/brand/ja.svg
Usage: python3 scripts/trace-logo.py   (needs opencv-python, numpy, Pillow)
"""
from pathlib import Path

import cv2
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "josean-portfolio-ultrapremium/03-camadas/logo-ja-transparente.png"
OUT = ROOT / "src/assets/brand/ja.svg"
UP = 4
BOX = (291, 165, 1438, 730)  # alpha box of the mark


def main():
    a = np.array(Image.open(SRC).convert("RGBA"))[..., 3]
    x0, y0, x1, y1 = BOX
    a = np.pad(a[y0:y1, x0:x1], 4)
    big = cv2.resize(a, None, fx=UP, fy=UP, interpolation=cv2.INTER_CUBIC)
    _, bw = cv2.threshold(big, 127, 255, cv2.THRESH_BINARY)
    contours, _ = cv2.findContours(bw, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_NONE)
    d = ""
    for c in contours:
        if cv2.contourArea(c) < 40 * UP * UP:
            continue
        c = cv2.approxPolyDP(c, 0.9, True)[:, 0, :].astype(float) / UP - 4
        d += "M" + " ".join(f"{x:.1f} {y:.1f}" for x, y in c) + "Z"
    w, h = x1 - x0, y1 - y0
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" fill="#F7F9FB"><path fill-rule="evenodd" d="{d}"/></svg>\n')
    print(f"ja.svg {w}x{h} {OUT.stat().st_size / 1024:.1f} KB")


if __name__ == "__main__":
    main()
