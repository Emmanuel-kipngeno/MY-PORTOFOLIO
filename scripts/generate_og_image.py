"""Generate the Open Graph share image (1200x630) for the portfolio.

Run:  python scripts/generate_og_image.py
Writes: public/og-image.png
"""

import os

from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H = 1200, 630
OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "og-image.png")

FONT_DIR = r"C:\Windows\Fonts"
F_DISPLAY = os.path.join(FONT_DIR, "seguibl.ttf")   # Segoe UI Black
F_SEMI = os.path.join(FONT_DIR, "seguisb.ttf")      # Segoe UI Semibold
F_REG = os.path.join(FONT_DIR, "segoeui.ttf")       # Segoe UI
F_MONO = os.path.join(FONT_DIR, "consolab.ttf")     # Consolas Bold

INK = (5, 8, 15)
GRID = (26, 39, 64)
ACCENT_200 = (153, 246, 228)
ACCENT_400 = (45, 212, 191)
AQUA_400 = (34, 211, 238)
BODY = (219, 228, 243)
MUTED = (147, 163, 192)
FAINT = (102, 121, 155)


def font(path, size):
    return ImageFont.truetype(path, size)


def tracked(draw, xy, text, fnt, fill, tracking=0, anchor_left=True):
    """Draw text with manual letter-spacing (Pillow has no tracking support)."""
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=fnt, fill=fill)
        x += draw.textlength(ch, font=fnt) + tracking
    return x


def tracked_width(draw, text, fnt, tracking=0):
    if not text:
        return 0
    return sum(draw.textlength(c, font=fnt) for c in text) + tracking * (len(text) - 1)


def gradient_text(base, xy, text, fnt, c0, c1, tracking=0):
    """Render text filled with a horizontal linear gradient."""
    x, y = xy
    pad = 8
    probe = Image.new("L", (1, 1))
    pd = ImageDraw.Draw(probe)

    width = int(tracked_width(pd, text, fnt, tracking)) + pad * 2
    height = int(fnt.size * 1.45) + pad * 2

    mask = Image.new("L", (width, height), 0)
    md = ImageDraw.Draw(mask)
    cx = pad
    for ch in text:
        md.text((cx, pad), ch, font=fnt, fill=255)
        cx += md.textlength(ch, font=fnt) + tracking

    grad = Image.new("RGB", (width, height))
    span = max(width - 1, 1)
    row = [
        tuple(int(c0[k] + (c1[k] - c0[k]) * (i / span)) for k in range(3))
        for i in range(width)
    ]
    grad.putdata(row * height)

    base.paste(grad, (int(x) - pad, int(y) - pad), mask)


def rounded_rect(draw, box, radius, fill=None, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def radial_mask(size, center, radius, feather=1.0):
    """Grayscale radial falloff used to fade the grid and glow layers."""
    w, h = size
    m = Image.new("L", (w, h), 0)
    px = m.load()
    cx, cy = center
    for yy in range(h):
        for xx in range(w):
            d = ((xx - cx) ** 2 + (yy - cy) ** 2) ** 0.5 / radius
            if d >= 1:
                v = 0
            else:
                v = int(255 * ((1 - d) ** feather))
            px[xx, yy] = v
    return m


def main():
    img = Image.new("RGB", (W, H), INK)

    # ── Grid, faded out toward the edges ──────────────────────────────
    grid = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(grid)
    step = 40
    for x in range(0, W + 1, step):
        gd.line([(x, 0), (x, H)], fill=GRID + (150,), width=1)
    for y in range(0, H + 1, step):
        gd.line([(0, y), (W, y)], fill=GRID + (150,), width=1)

    grid.putalpha(Image.eval(radial_mask((W, H), (W * 0.5, H * 0.32), W * 0.78, 1.4), lambda v: int(v * 0.55)))
    img = Image.alpha_composite(img.convert("RGBA"), grid).convert("RGB")

    # ── Ambient teal glow ─────────────────────────────────────────────
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gl = ImageDraw.Draw(glow)
    gl.ellipse([-220, -420, 900, 260], fill=ACCENT_400 + (46,))
    gl.ellipse([820, 300, 1520, 900], fill=AQUA_400 + (34,))
    glow = glow.filter(ImageFilter.GaussianBlur(150))
    img = Image.alpha_composite(img.convert("RGBA"), glow).convert("RGB")

    d = ImageDraw.Draw(img)

    # ── Badge ─────────────────────────────────────────────────────────
    bx, by, bs = 72, 62, 78
    rounded_rect(d, (bx, by, bx + bs, by + bs), 18, fill=(11, 18, 32), outline=ACCENT_400, width=2)
    f_badge = font(F_DISPLAY, 34)
    d.text((bx + bs / 2, by + bs / 2 + 2), "EK", font=f_badge, fill=ACCENT_400, anchor="mm")

    # ── Availability eyebrow ──────────────────────────────────────────
    f_eye = font(F_MONO, 16)
    ex = bx + bs + 24
    d.ellipse((ex, by + 26, ex + 10, by + 36), fill=ACCENT_400)
    tracked(d, (ex + 22, by + 22), "AVAILABLE FOR WORK", f_eye, ACCENT_400, tracking=3)

    # ── Name (gradient) ───────────────────────────────────────────────
    f_name = font(F_DISPLAY, 88)
    gradient_text(img, (70, 178), "Emmanuel", f_name, ACCENT_200, ACCENT_400, tracking=-1)
    gradient_text(img, (70, 272), "Kipngeno", f_name, ACCENT_400, AQUA_400, tracking=-1)

    # Re-derive the draw context after pasting gradient text
    d = ImageDraw.Draw(img)

    # ── Role ──────────────────────────────────────────────────────────
    f_role = font(F_SEMI, 32)
    d.text((72, 396), "System Administrator", font=f_role, fill=ACCENT_400)
    f_role2 = font(F_REG, 32)
    d.text((72 + d.textlength("System Administrator", font=f_role) + 16, 396), "/ Cloud & Full-Stack", font=f_role2, fill=MUTED)

    # ── Accent rule ───────────────────────────────────────────────────
    rounded_rect(d, (72, 456, 232, 460), 2, fill=ACCENT_400)

    # ── Supporting line ───────────────────────────────────────────────
    f_body = font(F_REG, 23)
    d.text((72, 482), "Cloud infrastructure  ·  server administration  ·  secure deployment", font=f_body, fill=BODY)

    # ── Stat strip ────────────────────────────────────────────────────
    f_stat_key = font(F_MONO, 13)
    f_stat_val = font(F_SEMI, 20)

    stats = [
        ("EXPERIENCE", "3+ years"),
        ("HUAWEI ICT 2024", "2nd globally"),
        ("EDUCATION", "BSc IT, JKUAT"),
    ]

    sy = 556
    x = 72
    for i, (key, val) in enumerate(stats):
        if i:
            d.line([(x - 26, sy + 4), (x - 26, sy + 34)], fill=GRID, width=2)
        tracked(d, (x, sy - 4), key, f_stat_key, FAINT, tracking=2)
        d.text((x, sy + 16), val, font=f_stat_val, fill=BODY)
        x += int(max(d.textlength(val, font=f_stat_val), 190)) + 52

    # ── Frame ─────────────────────────────────────────────────────────
    rounded_rect(d, (0, 0, W - 1, H - 1), 0, outline=GRID, width=2)

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    img.save(OUT, "PNG", optimize=True)
    print(f"Wrote {OUT} ({W}x{H})")


if __name__ == "__main__":
    main()
