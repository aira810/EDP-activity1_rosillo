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
  edpCamera.position.x = 30;
  edpCamera.position.z = 38;
  edpCamera.lookAt(0, 2, 0);
  edpRenderer.render(edpScene, edpCamera);
});


/* --- STEP 0B: continuous orbit every frame (uncomment inside animate below) --- */

  const t = Date.now() * 0.00025;
  edpCamera.position.x = 28 + Math.sin(t) * 6;
  edpCamera.position.z = 40 + Math.cos(t) * 4;
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
  edpCamera.position.x = 28 + Math.sin(t) * 6;
  edpCamera.position.z = 40 + Math.cos(t) * 4;
  edpCamera.lookAt(0, 2, 0);

  // EXAMPLE PROPS — bird motion (uncomment after enabling makeBird in scene.js)
  if (globalThis.edpBirds) {
    edpBirds.forEach(function (bird, i) {
      const bt = Date.now() * 0.001;
      bird.position.x += Math.sin(bt + i) * 0.02;
      bird.position.y = 6 + Math.sin(bt * 2 + i) * 0.4;
      bird.rotation.y = Math.sin(bt * 0.5 + i) * 0.4;

      const flap = Math.sin(bt * 10 + i) * 0.45;
      if (bird.userData.leftWing) {
        bird.userData.leftWing.rotation.z = 0.35 + flap;
        bird.userData.rightWing.rotation.z = -0.35 - flap;
      }
    });
  }
  

  edpRenderer.render(edpScene, edpCamera);
}

animate();
