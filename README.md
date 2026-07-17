# EDP Lab — Socorro Mini Map

Event-driven programming lab: a small 3D island where **click**, **hover**, and **resize** events update the scene.

Inspired by the instructor's Socorro 3D map — simplified for PF 101.

## Setup (first time)

```bash
# 1. Clone YOUR copy (after forking on GitHub)
git clone https://github.com/YOUR_USERNAME/edp-lab.git
cd edp-lab

# 2. Open in VS Code
code .

# 3. Run — double-click index.html (needs internet for Three.js CDN)
```

## Project files

```
edp-lab/
├── index.html       ← page shell + HUD
├── css/style.css
└── js/
    ├── scene.js     ← 3D island & buildings (provided — read only)
    ├── events.js    ← event handlers (study the comments + methods)
    └── main.js      ← register listeners + animation loop
```

## What you will learn

| Event | Where | What happens |
|---|---|---|
| `mousemove` | `window` | Track mouse → hover highlight on buildings |
| `click` | canvas | Select a building → pink + HUD update |
| `resize` | `window` | Keep 3D view correct when window size changes |
| `load` (STEP 0A) | `window` | Optional slight camera nudge once on page load |
| `requestAnimationFrame` | loop | Draw scene; optional orbit (STEP 0B) + hover (STEP 6) |

Same pattern as your 2D `events-lab`: **Fire → Listen → Handle**.

## Class workflow

1. Clone repo and open `index.html` — **static island** (camera does not move yet).
2. **Uncomment STEP 0 → 7** one at a time (`events.js` + matching lines in `main.js`).
3. Save → refresh browser after each step.
4. Commit after each step works:

```bash
git add .
git commit -m "Enable STEP 3 mousemove handler"
git push
```

### Enable order

| Step | File | Uncomment |
|---|---|---|
| **0A** | `main.js` | slight camera move once on `load` |
| **0B** | `main.js` | continuous camera orbit inside `animate()` |
| 1 | `events.js` | `paintBuilding` |
| 2 | `events.js` | `resetHud` |
| 3 | `events.js` + `main.js` | `onMouseMove` + `addEventListener('mousemove', …)` |
| 4 | `events.js` + `main.js` | `onClick` + canvas `addEventListener('click', …)` |
| 5 | `events.js` + `main.js` | `onResize` + `addEventListener('resize', …)` |
| 6 | `events.js` + `main.js` | `updateHover` + `updateHover()` in `animate` |
| 7 | `events.js` + `main.js` | `onKeyDown` + `addEventListener('keydown', …)` |

## Troubleshooting

- **Blank page** — check internet (Three.js loads from CDN). Open DevTools (F12) → Console.
- **Nothing on click** — confirm `main.js` is loaded last in `index.html`.
- **Git push fails** — run `gh auth login` once, or use a Personal Access Token as password.

## Homework ideas

- Press **R** to reset selection (`keydown` event).
- Show building name on **double-click**.
- Add `mouseout` style reset when leaving the canvas.
