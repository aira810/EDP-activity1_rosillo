
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

    // Camera orbit
    const t = Date.now() * 0.00025;

    edpCamera.position.x = 42 + Math.sin(t) * 55;
    edpCamera.position.y = 63;
    edpCamera.position.z = 60 + Math.cos(t) * 55;
    edpCamera.lookAt(0, 8, 0);

    // Update sun position
    if (globalThis.edpPlaceSkyBodies) {
        edpPlaceSkyBodies();
    }

    // Animate birds
if (globalThis.edpBirds) {

    edpBirds.forEach(function (bird, i) {

        const bt = Date.now() * 0.001;

        //  NIGHT MODE
        if (bird.userData.isNight) {

            // Stop the bird from flying
            bird.position.x = bird.userData.treeX;
            bird.position.z = bird.userData.treeZ;

            // Sit lower on the tree
            bird.position.y = bird.userData.sitY;

            // Stop wing flapping
            bird.userData.leftWing.rotation.z = 0.35;
            bird.userData.rightWing.rotation.z = -0.35;

            // Keep bird still
            bird.rotation.y = Math.PI;

            return;
        }

        //  DAY MODE
        // Rotate around the assigned tree
        bird.userData.angle += 0.02;

        bird.position.x =
            bird.userData.treeX +
            Math.cos(bird.userData.angle) * bird.userData.radius;

        bird.position.z =
            bird.userData.treeZ +
            Math.sin(bird.userData.angle) * bird.userData.radius;

        // Fly up and down
        bird.position.y =
            bird.userData.flyY +
            Math.sin(bt * 4 + i) * 0.4;

        // Face direction of movement
        bird.rotation.y =
            -bird.userData.angle + Math.PI / 2;

        // Flap wings
        const flap = Math.sin(bt * 12 + i) * 0.45;

        bird.userData.leftWing.rotation.z =
            0.35 + flap;

        bird.userData.rightWing.rotation.z =
            -0.35 - flap;
    });
}

    edpRenderer.render(edpScene, edpCamera);
}

animate();