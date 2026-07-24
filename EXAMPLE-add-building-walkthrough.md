# Example: Add a New Building

Follow this **exact example first**. When it works, change the name, color, size, or position to make it yours.

**Files you edit:** `js/scene.js` only (for this example)

**Prerequisite:** STEP 1–7 must already be working (you can click and select buildings).

---

## What you will build

| Action | Result |
|---|---|
| Add one new entry to `spots` | A new building appears on the island |
| Set **x** and **z** | Choose where it sits on the map |
| Refresh the browser | Click the new building — it selects like the others |

This counts as a **scene customization** (new mesh on the island).

---

## How coordinates work on this map

Three.js uses a 3D axis. On this island:

| Axis | Direction | Used for buildings? |
|---|---|---|
| **x** | Left ← → Right | Yes — you set this in `spots` |
| **y** | Down ← → Up | Automatic — code sets `y = height / 2` so the building sits on the ground |
| **z** | Back ← → Forward | Yes — you set this in `spots` (ground depth) |

So when people say “map coordinates,” here that means **x** and **z**, not x and y.

In the running app you will see:

- A **Map coordinates** panel (top-right) with the diagram and color codes
- A **grid** on the island plus **+X / -X / +Z / -Z** labels in the 3D view

Rough island layout (looking from above):

```
            +z (toward back of island)
                 ↑
                 |
    -x ←—————————●—————————→ +x
                 |
                 ↓
            -z (toward front / camera)
```

The island is roughly a circle about **radius 18**. Keep buildings near the center (about **-10 to 10** for both x and z) so they stay on the grass.

Existing buildings (for reference):

| Building | x | z |
|---|---|---|
| Town Hall | `-5` | `3` |
| Church | `2` | `1` |
| Market | `6` | `4` |
| Pier | `-3` | `-5` |
| School | `-1` | `6` |

---

## Step 1 — Open the spots list

Open `js/scene.js` and find the `spots` array.

While you edit, use the **Map coordinates** panel in the browser and the **+X / -X / +Z / -Z** labels on the island to choose a free spot.

```javascript
const spots = [
  { name: 'Town Hall', color: 0xe8dcc8, x: -5, z: 3, w: 4, h: 4, d: 3 },
  { name: 'Church', color: 0xd4c4a8, x: 2, z: 1, w: 3.5, h: 6, d: 3.5 },
  { name: 'Market', color: 0xc8b090, x: 6, z: 4, w: 3, h: 3, d: 4 },
  { name: 'Pier', color: 0x8a7858, x: -3, z: -5, w: 5, h: 1.5, d: 2 },
  { name: 'School', color: 0xf0e8d8, x: -1, z: 6, w: 4, h: 3.5, d: 3 },
];
```

Each object is one building. Properties:

| Property | Meaning | Example |
|---|---|---|
| `name` | Label shown in the HUD when selected | `'Library'` |
| `color` | Base paint color (hex) | `0xb8c4d8` |
| `x` | Left / right position on the island | `4` |
| `z` | Forward / back position on the island | `-2` |
| `w` | Width (size along x) | `3` |
| `h` | Height (size along y — also places the building on the ground) | `4` |
| `d` | Depth (size along z) | `3` |

You do **not** set `y` yourself. This line already does it:

```javascript
mesh.position.set(spot.x, spot.h / 2, spot.z);
```

---

## Step 2 — Add a Library (exact example)

Add a **new line** at the end of the `spots` array (keep the commas correct):

**Before:**

```javascript
const spots = [
  { name: 'Town Hall', color: 0xe8dcc8, x: -5, z: 3, w: 4, h: 4, d: 3 },
  { name: 'Church', color: 0xd4c4a8, x: 2, z: 1, w: 3.5, h: 6, d: 3.5 },
  { name: 'Market', color: 0xc8b090, x: 6, z: 4, w: 3, h: 3, d: 4 },
  { name: 'Pier', color: 0x8a7858, x: -3, z: -5, w: 5, h: 1.5, d: 2 },
  { name: 'School', color: 0xf0e8d8, x: -1, z: 6, w: 4, h: 3.5, d: 3 },
];
```

**After:**

```javascript
const spots = [
  { name: 'Town Hall', color: 0xe8dcc8, x: -5, z: 3, w: 4, h: 4, d: 3 },
  { name: 'Church', color: 0xd4c4a8, x: 2, z: 1, w: 3.5, h: 6, d: 3.5 },
  { name: 'Market', color: 0xc8b090, x: 6, z: 4, w: 3, h: 3, d: 4 },
  { name: 'Pier', color: 0x8a7858, x: -3, z: -5, w: 5, h: 1.5, d: 2 },
  { name: 'School', color: 0xf0e8d8, x: -1, z: 6, w: 4, h: 3.5, d: 3 },
  { name: 'Library', color: 0xb8c4d8, x: 4, z: -2, w: 3, h: 4, d: 3 },
];
```

What this example chooses:

- **x: `4`** → a bit to the right of center
- **z: `-2`** → slightly toward the front of the island (near the camera)
- **color: `0xb8c4d8`** → soft blue-gray
- **w / h / d** → medium box, taller than the Pier

Save → refresh the browser. You should see a new building. Click it — HUD should say **Selected: Library**.

---

## Step 3 — Move it with x and z

Want it somewhere else? Change only the coordinates:

| Goal | Try |
|---|---|
| Move left | Decrease `x` (e.g. `4` → `-6`) |
| Move right | Increase `x` (e.g. `4` → `7`) |
| Move toward camera (front) | Decrease `z` (e.g. `-2` → `-6`) |
| Move away from camera (back) | Increase `z` (e.g. `-2` → `5`) |

Example — park the Library near the School:

```javascript
{ name: 'Library', color: 0xb8c4d8, x: -4, z: 7, w: 3, h: 4, d: 3 },
```

Save → refresh after each change. Small number tweaks are easier to judge than big jumps.

---

## Step 4 — Test checklist

- [ ] New building is visible on the island  
- [ ] Click it → pink highlight (or your custom color) + HUD shows the name  
- [ ] Hover works on it like the other buildings  
- [ ] It is not floating in the water or overlapping another building badly  
- [ ] F12 Console → no red errors  

---

## Step 5 — Commit this example

```bash
git add js/scene.js
git commit -m "Add Library building to the island spots list"
git push
```

---

## Step 6 — Make it YOUR building

The Library is a **template**. Change at least **two** things, for example:

| Change | Where |
|---|---|
| Rename to your hometown landmark | `name: 'City Hall'` |
| Use coral `0xff6b6b` | `color` |
| Place it at `x: -7, z: -3` | `x` and `z` |
| Make a wide low shed | `w: 6, h: 2, d: 3` |
| Make a tall tower | `w: 2, h: 8, d: 2` |

Then mention it in `README.md`:

```markdown
## My Modifications

- Added a Cafe building at x: 5, z: -4
- Used coral color and a wider footprint
```

Commit again:

```bash
git add .
git commit -m "Customize new building: my landmark and position"
git push
```

---

## If something breaks

| Problem | Fix |
|---|---|
| Building missing after refresh | Check commas in the `spots` array — every line except the last needs a trailing `,` |
| Syntax error / blank page | Missing `{ }`, `name`, or a trailing comma after the last item inside `[ ]` |
| Building in the water | Bring `x` and `z` closer to `0` (try values between `-8` and `8`) |
| Building underground / floating | Do not add a `y` property — height is handled by `spot.h / 2` |
| Two buildings stacked | Change `x` or `z` so they do not share the same spot |
| Click does nothing on new building | Hard refresh (`Ctrl+Shift+R`) — `spots.forEach` already adds it to `buildings` for raycasting |

---

## Color ideas (hex)

| Color | Hex |
|---|---|
| Soft blue-gray (Library example) | `0xb8c4d8` |
| Warm stone | `0xe8dcc8` |
| Coral | `0xff6b6b` |
| Purple | `0xc084fc` |
| Green | `0x4ade80` |

---

## Instructor note

Students only edit the **data** in `spots`. The loop that builds meshes, shadows, `userData`, and raycast registration is already provided — so adding a building teaches **coordinates and scene data**, not boilerplate Three.js setup.

Related:

- Event / color homework: **[EXAMPLE-modification-walkthrough.md](./EXAMPLE-modification-walkthrough.md)**
- Full rubric: **[activity-island-modifications.md](./activity-island-modifications.md)**
