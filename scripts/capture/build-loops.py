# Turns captured frames into seamless 25 fps loops (numbered JPEGs), then ffmpeg encodes them.
import sys, os, json, glob, subprocess, shutil
from PIL import Image
L, OUT = sys.argv[1], sys.argv[2]
FF = '/usr/local/opt/ffmpeg@5/bin/ffmpeg'
FPS = 25
W, H = 1280, 800
os.makedirs(OUT, exist_ok=True)

def load(p): return Image.open(p).convert('RGB').resize((W, H), Image.LANCZOS)
def fade(a, b, n): return [Image.blend(a, b, (k + 1) / (n + 1)) for k in range(n)]

def live_seq(slug, t0=0.0):
    meta = json.load(open(f'{L}/{slug}/live.json'))
    meta = [m for m in meta if m['t'] >= t0]
    t_end = meta[-1]['t']
    seq, j = [], 0
    t = meta[0]['t']
    while t <= t_end + 1e-6:
        while j + 1 < len(meta) and meta[j + 1]['t'] <= t: j += 1
        seq.append(f"{L}/{slug}/{meta[j]['file']}")
        t += 1 / FPS
    return seq

def scrub_files(slug): return sorted(glob.glob(f'{L}/{slug}/f_*.jpg'))

def write(slug, frames):
    d = f'{OUT}/{slug}_frames'
    shutil.rmtree(d, ignore_errors=True); os.makedirs(d)
    for i, im in enumerate(frames): im.save(f'{d}/{i:05d}.jpg', quality=93)
    mp4 = f'{OUT}/{slug}-loop.mp4'
    subprocess.run([FF, '-v', 'error', '-y', '-framerate', str(FPS), '-i', f'{d}/%05d.jpg', '-c:v', 'libx264', '-preset', 'slow', '-crf', '27', '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-movflags', '+faststart', '-an', mp4], check=True)
    frames[0].save(f'{OUT}/{slug}-poster.jpg', quality=88)
    print(f'{slug}: {len(frames)} frames, {len(frames)/FPS:.1f}s, {os.path.getsize(mp4)/1024:.0f} KB')

# scroll-driven heroes: forward, hold, back, hold (the scene runs backwards as cleanly as forwards)
for slug in ['sta', 'tonton', 'bayro', 'isola', 'getmoto']:
    fw = [load(p) for p in scrub_files(slug)]
    write(slug, [fw[0]] * 10 + fw + [fw[-1]] * 22 + fw[::-1] + [fw[0]] * 6)

# timed openings: the opening, a hold, then a soft dissolve back to the first frame
for slug, t0 in [('cabane', 0.0), ('rumi', 0.42)]:
    seq = [load(p) for p in live_seq(slug, t0)]
    write(slug, seq + [seq[-1]] * 30 + fade(seq[-1], seq[0], 12))

# Lovinspoon: the opening, then lunch comes together layer by layer
op = [load(p) for p in live_seq('lovinspoon')]
tail = [load(p) for p in scrub_files('lovinspoon')]
seq = op + [op[-1]] * 18 + fade(op[-1], tail[0], 8) + tail + [tail[-1]] * 25 + fade(tail[-1], op[0], 12)
write('lovinspoon', seq)
