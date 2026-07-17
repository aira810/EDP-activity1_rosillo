/*
 * events.js — Event handlers for the Socorro mini map
 *
 * ENABLE IN ORDER: uncomment STEP 1 → 2 → 3 → … → 7
 * Also uncomment the matching lines in main.js for each step.
 *
 * Pattern (same as 2D events-lab):
 *   1. EVENT FIRES  — user clicks, moves mouse, resizes window
 *   2. LISTEN       — addEventListener in main.js
 *   3. HANDLE       — functions below run your response code
 */

let selected = null;
let hovered = null;

/* ================================================================== STEP 1
 * Helper: change a building's color
 *
 * Three.js stores color on mesh.material.color.
 * Needed before STEP 4 (click) and STEP 6 (hover).
 *
 * Uncomment this block, then save and refresh.
 * ================================================================== */
/*
function paintBuilding(mesh, color) {
  mesh.material.color.setHex(color);
}
*/

/* ================================================================== STEP 2
 * Helper: reset the HUD panel to default text
 *
 * Called when user clicks empty space or presses R (STEP 7).
 *
 * Uncomment this block, then save and refresh.
 * ================================================================== */
/*
function resetHud() {
  edpHud.innerHTML =
    '<strong>Socorro Mini Map — EDP Lab</strong>' +
    'Click a building to select it.<br>' +
    'Hover to preview — same events as your 2D lab.';
}
*/

/* ================================================================== STEP 3
 * mousemove handler
 *
 * WHEN: user moves the mouse anywhere on the page
 * JOB:  convert pixel position → normalized coords for the raycaster
 *
 * Also uncomment in main.js:
 *   window.addEventListener('mousemove', onMouseMove);
 * ================================================================== */
/*
function onMouseMove(event) {
  edpMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  edpMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

globalThis.onMouseMove = onMouseMove;
*/

/* ================================================================== STEP 4
 * click handler
 *
 * WHEN: user clicks the 3D canvas
 * JOB:
 *   1. Cast a ray from camera through mouse position
 *   2. See which building (if any) was hit
 *   3. Highlight selected building and update HUD
 *
 * Requires STEP 1, 2, and 3 uncommented first.
 *
 * Also uncomment in main.js:
 *   edpRenderer.domElement.addEventListener('click', onClick);
 * ================================================================== */
/*
function onClick() {
  edpRaycaster.setFromCamera(edpMouse, edpCamera);
  const hits = edpRaycaster.intersectObjects(edpBuildings, false);

  if (selected) {
    paintBuilding(selected, selected.userData.baseColor);
  }

  selected = hits.length ? hits[0].object : null;

  if (selected) {
    paintBuilding(selected, 0xf472b6);
    edpHud.innerHTML =
      '<strong>Selected: ' + selected.userData.name + '</strong>' +
      '<em>click → addEventListener → handler → 3D response</em>';
  } else {
    resetHud();
  }
}

globalThis.onClick = onClick;
*/

/* ================================================================== STEP 5
 * resize handler
 *
 * WHEN: user resizes the browser window
 * JOB:  update camera aspect ratio and renderer size
 *
 * Also uncomment in main.js:
 *   window.addEventListener('resize', onResize);
 * ================================================================== */
/*
function onResize() {
  edpCamera.aspect = window.innerWidth / window.innerHeight;
  edpCamera.updateProjectionMatrix();
  edpRenderer.setSize(window.innerWidth, window.innerHeight);
}

globalThis.onResize = onResize;
*/

/* ================================================================== STEP 6
 * hover check (runs every frame — not a DOM event)
 *
 * WHEN: called from animate() in main.js each frame
 * JOB:  light-blue highlight + pointer cursor when over a building
 *
 * Requires STEP 1 and 3 uncommented first.
 *
 * Also uncomment in main.js (inside animate):
 *   updateHover();
 * ================================================================== */
/*
function updateHover() {
  edpRaycaster.setFromCamera(edpMouse, edpCamera);
  const hoverHits = edpRaycaster.intersectObjects(edpBuildings, false);
  const nextHovered = hoverHits.length ? hoverHits[0].object : null;

  if (hovered && hovered !== selected) {
    paintBuilding(hovered, hovered.userData.baseColor);
  }

  hovered = nextHovered;

  if (hovered && hovered !== selected) {
    paintBuilding(hovered, 0x7dd3fc);
  }

  edpRenderer.domElement.style.cursor = hovered ? 'pointer' : 'default';
}

globalThis.updateHover = updateHover;
*/

/* ================================================================== STEP 7
 * BONUS: keyboard handler
 *
 * WHEN: user presses a key
 * JOB:  press R to clear selection and reset building colors
 *
 * Requires STEP 1 and 2 uncommented first.
 *
 * Also uncomment in main.js:
 *   window.addEventListener('keydown', onKeyDown);
 * ================================================================== */
/*
function onKeyDown(event) {
  if (event.code !== 'KeyR') return;

  if (selected) {
    paintBuilding(selected, selected.userData.baseColor);
    selected = null;
  }

  if (hovered) {
    paintBuilding(hovered, hovered.userData.baseColor);
    hovered = null;
  }

  resetHud();
  edpRenderer.domElement.style.cursor = 'default';
}

globalThis.onKeyDown = onKeyDown;
*/
