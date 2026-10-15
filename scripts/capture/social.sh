#!/usr/bin/env bash
# Social media wall: a light muted preview (360x640) for the wall, the full piece with sound
# (720x1280) for the player, and a poster frame. Sources are Josean's own exports.
#   bash scripts/capture/social.sh <folder with the exports> <output folder>
set -euo pipefail
SRC=${1:?exports folder}
OUT=${2:?output folder}
FF=${FFMPEG:-/usr/local/opt/ffmpeg@5/bin/ffmpeg}
mkdir -p "$OUT"

# file  id  preview-start  preview-length  poster-time  full-crf
enc() {
  "$FF" -v error -y -ss "$3" -t "$4" -i "$SRC/$1" -vf "scale=360:640:flags=lanczos,fps=25" \
    -c:v libx264 -preset slow -crf 29 -pix_fmt yuv420p -movflags +faststart -an "$OUT/$2-preview.mp4"
  "$FF" -v error -y -i "$SRC/$1" -vf "scale=720:1280:flags=lanczos" \
    -c:v libx264 -preset slow -crf "$6" -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 112k "$OUT/$2-full.mp4"
  "$FF" -v error -y -ss "$5" -i "$SRC/$1" -frames:v 1 -vf "scale=540:960:flags=lanczos" -q:v 2 "$OUT/$2-poster.jpg"
}

enc modelomysteryreels.mp4 reel-mystery 33 12 42.3 28
enc modelographicmotion1.mp4 motion-mindset 0 15.38 1.2 25
enc graphicmotion2.mp4 motion-menu 0 15.27 2.4 25
enc graphicmotion3.mp4 motion-cafe 0 12.79 4.2 25
enc graphicmotion4.mp4 motion-burger 0 12.05 2.2 25
enc graphicmotion.mp5.mp4 motion-drink 0 12.05 3.6 25
echo "social: $(ls "$OUT" | wc -l | tr -d ' ') files in $OUT"
