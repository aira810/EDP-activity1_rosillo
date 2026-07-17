/*
 * main.js — Wire events to handlers + run the animation loop
 *
 * ENABLE IN ORDER with events.js — uncomment matching STEP in each file.
 */

/* ================================================================== STEP 0
 * Camera motion (disabled by default)
 *
 * A) Slight move on load — camera drifts once when the page opens
 * B) Continuous orbit — camera keeps moving every frame (inside animate)
 *
 * Uncomment A and/or B during discussion when you are ready.
 * ================================================================== */

/* --- STEP 0A: slight move once on load --- */

window.addEventListener('load', function () {
  edpCamera.position.x = 15;
  edpCamera.position.z = 19;
  edpCamera.lookAt(0, 2, 0);
  edpRenderer.render(edpScene, edpCamera);
});


/* --- STEP 0B: continuous orbit every frame (uncomment inside animate below) --- */

  const t = Date.now() * 0.00025;
  edpCamera.position.x = 14 + Math.sin(t) * 3;
  edpCamera.position.z = 20 + Math.cos(t) * 2;
  edpCamera.lookAt(0, 2, 0);


/* ================================================================== STEP 3
 * Listen: mousemove → onMouseMove
 * ================================================================== */
window.addEventListener('mousemove', onMouseMove);

/* ================================================================== STEP 4
 * Listen: click on canvas → onClick
 * ================================================================== */
edpRenderer.domElement.addEventListener('click', onClick);

/* ================================================================== STEP 5
 * Listen: resize → onResize
 * ================================================================== */
window.addEventListener('resize', onResize);

/* ================================================================== STEP 7
 * Listen: keydown → onKeyDown (bonus — press R to reset)
 * ================================================================== */
window.addEventListener('keydown', onKeyDown);

/*
 * Animation loop — always runs so the scene stays drawn.
 * Camera stays still until you enable STEP 0B below.
 * STEP 6: uncomment updateHover() when ready.
 */
function animate() {
  requestAnimationFrame(animate);

  // updateHover();  /* STEP 6 — uncomment when updateHover is enabled in events.js */

  /* STEP 0B — continuous camera orbit (uncomment the 4 lines below) */
  const t = Date.now() * 0.00025;
  edpCamera.position.x = 14 + Math.sin(t) * 3;
  edpCamera.position.z = 20 + Math.cos(t) * 2;
  edpCamera.lookAt(0, 2, 0);

  edpRenderer.render(edpScene, edpCamera);
}

animate();
