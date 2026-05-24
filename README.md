# Altus — Hero Sequence

A premium scroll-controlled image sequence animation hero. Built with React + Vite + TypeScript + Tailwind CSS + GSAP ScrollTrigger.

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Add your frames

Place the 180 frames inside the `/public/frames/` directory, named like:

```
public/
  frames/
    frame_0001.jpg
    frame_0002.jpg
    ...
    frame_0180.jpg
```

> ⚠️ Make sure filenames are **zero-padded to 4 digits**: `frame_0001.jpg`, not `frame_001.jpg`

If your current frames are named `frame_001.jpg` (3 digits), rename them first:

```bash
# Bash rename script (run inside the frames folder)
for f in frame_0*.jpg; do
  num="${f#frame_}"
  num="${num%.jpg}"
  new=$(printf "frame_%04d.jpg" "$((10#$num))")
  mv "$f" "$new"
done
```

### 3. Run dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### 4. Build for production

```bash
npm run build
```

## Architecture

```
src/
  components/
    HeroSequence.tsx   — Main canvas + GSAP ScrollTrigger animation
    Navbar.tsx         — Minimal fixed navigation bar
    ScrollIndicator.tsx — Animated scroll prompt
  App.tsx
  main.tsx
  index.css
public/
  frames/              — Place your 180 frames here
```

## How It Works

- All 180 frames are preloaded into `Image` objects on mount
- A loading screen shows progress (0–100%)
- GSAP `ScrollTrigger` pins the hero via `sticky` positioning (250vh scroll height)
- On scroll, `progress` (0→1) maps to frame index (0→179)
- Each frame is drawn to a `<canvas>` using `object-cover` math
- A subtle zoom effect (1.0→1.06 scale) adds depth
- Hero text fades and lifts up during the first 25% of scroll
- Cinematic vignette overlay + grain texture add atmosphere

## Customization

| What | Where |
|------|-------|
| Copy / text | `HeroSequence.tsx` text block |
| Scroll height | `style={{ height: '250vh' }}` on section |
| Zoom amount | `1 + progress * 0.06` in `onUpdate` |
| Text fade end point | `end: '25% top'` in second ScrollTrigger |
| Overlay darkness | gradient in `overlayRef` div |
