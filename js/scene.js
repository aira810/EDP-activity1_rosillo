
/*
 * scene.js — 3D world setup (PROVIDED)
 *
 * You do not need to edit this file for the basic lab.
 * It creates: scene, camera, renderer, island, water, and building meshes.
 *
 * buildings[] is exported on globalThis so events.js can use it for raycasting.
 * edpIsland, edpWater, edpSun are exported for the customization activity.
 */

const hud = document.getElementById('hud');

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a1628);
scene.fog = new THREE.Fog(0x0a1628, 110, 300);

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.5,
  300
);

camera.position.set(28, 45, 40);
camera.lookAt(0, 2, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const sun = new THREE.DirectionalLight(0xfff0d0, 1.5);

function makeSkySprite(innerColor, outerColor, size) {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, innerColor);
  grad.addColorStop(0.35, outerColor);
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);
  const texture = new THREE.CanvasTexture(canvas);
  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      fog: false,
      depthTest: false,
      depthWrite: false,
    })
  );
  sprite.scale.set(size, size, 1);
  sprite.renderOrder = 999;
  return sprite;
}

const sunSprite = makeSkySprite('#fff4c2', '#ffb347', 10);
scene.add(sunSprite);

const moonSprite = makeSkySprite('#ffffff', '#cbd5e1', 8);
moonSprite.visible = false;
scene.add(moonSprite);

const skyBodyOffset = new THREE.Vector3();

function placeSkyBodies() {

    // Fixed position in the world
    // Left side, a little higher
    sunSprite.position.set(-35, 20, -25); 
    moonSprite.position.copy(sunSprite.position);
}

const stars = new THREE.Group();

for (let i = 0; i < 300; i++) {
    const star = new THREE.Mesh(
    new THREE.SphereGeometry(0.05, 8, 8),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
);


    star.position.set( 
      (Math.random() - 0.5) * 100, 35 + Math.random() * 80,
      (Math.random() - 0.5) * 100
);
    stars.add(star);
}
stars.visible = false;
scene.add(stars);

globalThis.edpStars = stars;

globalThis.edpSunSprite = sunSprite;
globalThis.edpMoonSprite = moonSprite;
globalThis.edpPlaceSkyBodies = placeSkyBodies;

sun.position.set(24, 40, 20);
sun.castShadow = true;

scene.add(sun);
scene.add(new THREE.AmbientLight(0x406080, 0.55));

/* Island size: CylinderGeometry(topRadius, bottomRadius, height, segments)
 * Bigger numbers = more room for buildings / trees / paths.
 * Safe building range is roughly ±(topRadius - 8), currently about -28 to 28.
 */
const island = new THREE.Mesh(
  new THREE.CylinderGeometry(72, 80, 1.2, 96),
  new THREE.MeshStandardMaterial({ color: 0x2d6a3e, roughness: 0.92 })
);
island.position.y = -0.6;
island.receiveShadow = true;
scene.add(island);

const water = new THREE.Mesh(
  new THREE.PlaneGeometry(300, 300),
  new THREE.MeshStandardMaterial({ color: 0x143d5c, roughness: 0.35, metalness: 0.15 })
);
water.rotation.x = -Math.PI / 2;
water.position.y = -0.8;
scene.add(water);

const buildings = [];

const grid = new THREE.GridHelper(144, 72, 0x7dd3fc, 0x1e3a5f);
grid.position.y = 0.02;
scene.add(grid);

const axes = new THREE.AxesHelper(24);
axes.position.y = 0.05;
scene.add(axes);

function makeAxisLabel(text, colorHex) {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#' + colorHex.toString(16).padStart(6, '0');
  ctx.font = 'bold 36px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 64, 32);
  const texture = new THREE.CanvasTexture(canvas);
  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false })
  );
  sprite.scale.set(4, 2, 1);
  sprite.position.y = 1.2;
  return sprite;
}

const labelPX = makeAxisLabel('+X', 0xff6b6b);
labelPX.position.set(56, 1.2, 0);
scene.add(labelPX);

const labelNX = makeAxisLabel('-X', 0xff6b6b);
labelNX.position.set(-56, 1.2, 0);
scene.add(labelNX);

const labelPZ = makeAxisLabel('+Z', 0x60a5fa);
labelPZ.position.set(0, 1.2, 56);
scene.add(labelPZ);

const labelNZ = makeAxisLabel('-Z', 0x60a5fa);
labelNZ.position.set(0, 1.2, -56);
scene.add(labelNZ);

/*
 * MAP LEGEND — also shown in the UI (#map-legend) and as grid / axis labels.
 * Building positions use x and z (not y). y is automatic (height / 2).
 * Keep x/z about -28 to 28. Colors: CSS #4ade80 → JS 0x4ade80
 * See EXAMPLE-add-building-walkthrough.md
 */
const spots = [
{ name: 'TECHVOC', color: 0xA6F51D, x: -17, z: 15, w: 12, h: 4.5, d: 4 },
{ name: 'SHS ROOM', color: 0xC6EB13, x: -3, z: 15, w: 13, h: 5, d: 5 },
{ name: 'AUDITORIUM', color: 0x2D20AB, x: -17, z: 5, w: 20, h: 4.5, d: 13 },
{ name: 'NSTP', color: 0xFAFADE, x: -25, z: -6, w: 5, h: 3, d: 5 },
{ name: 'COCONUT ROOM', color: 0xE8E8DA, x: -20, z: -11, w: 15, h: 4, d: 6 },
{ name: 'CTE NEW BUILDING', color: 0xE0E077, x: -2, z: -11, w: 20, h: 4, d: 8 },
{ name: 'SHS OFFICE', color: 0xFFFFDB, x: 12, z: 3, w: 5, h: 3, d: 4 },
{ name: 'COMPUTER LAB', color: 0x3FF707, x: 12, z: -7, w: 7, h: 4, d: 12 },
{ name: 'CBE ROOM', color: 0xCFD130, x: 18, z: 9, w: 6, h: 4, d: 20 },
{ name: 'CBE ROOM', color: 0xCFD130, x: 9, z: 15, w: 10, h: 5, d: 5 },
];

spots.forEach((spot) => {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(spot.w, spot.h, spot.d),
    new THREE.MeshStandardMaterial({ color: spot.color, roughness: 0.88 })
  );
  mesh.position.set(spot.x, spot.h / 2, spot.z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.userData = { isBuilding: true, name: spot.name, baseColor: spot.color };
  scene.add(mesh);
  buildings.push(mesh);
});

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(-9999, -9999);

globalThis.edpScene = scene;
globalThis.edpCamera = camera;
globalThis.edpRenderer = renderer;
globalThis.edpBuildings = buildings;
globalThis.edpRaycaster = raycaster;
globalThis.edpMouse = mouse;
globalThis.edpHud = hud;
globalThis.edpIsland = island;
globalThis.edpWater = water;
globalThis.edpSun = sun;

/* ================================================================== EXAMPLE PROPS
 * Trees, birds, paths — same Mesh recipe as buildings, different shapes.
 * Follow EXAMPLE-add-props-walkthrough.md
 *
 * HOW TO ENABLE:
 *   1. Uncomment the helpers block below (the section wrapped in a block comment)
 *   2. Uncomment the example makeTree / makePath / makeBird calls at the bottom
 *   3. In main.js animate(): uncomment the edpBirds.forEach motion loop
 *   4. Save → refresh → then change positions / colors to make it yours
 * ================================================================== */


const edpBirds = [];

function makeMangoTree(x, z) { const tree = new THREE.Group();

  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(1, 2.5, 4, 15),
    new THREE.MeshStandardMaterial({ color: 0x6b4423 })
  );
  trunk.position.y = 3.5;
  tree.add(trunk);

const leaves = new THREE.Group();
for (let i = 0; i < 30; i++) {
    const ball = new THREE.Mesh(
        new THREE.SphereGeometry(2,16,16),
        new THREE.MeshStandardMaterial({
            color:0x2e8b57
        })
    );
    ball.position.set(
        Math.random() * 6 - 3,   // x
        Math.random() * 3,       // y
        Math.random() * 6 - 3    // z
    );
    leaves.add(ball);
}
leaves.position.y = 8.5;
tree.add(leaves);

  for (let i = 0; i < 8; i++) {

    const mango = new THREE.Mesh(
        new THREE.SphereGeometry(0.25,8,8),
        new THREE.MeshStandardMaterial({
            color:0xffcc33
        })
    );

    mango.position.set(
        Math.random()*5-2,
        7 + Math.random()*2,
        Math.random()*5-2
    );

    tree.add(mango);
}
  tree.position.set(x, 0, z);
  scene.add(tree);

}

function makePath(x, z, w, d) {
  const path = new THREE.Mesh(
    new THREE.PlaneGeometry(w, d),
    new THREE.MeshStandardMaterial({ color: 0x8a7858, roughness: 1 })
  );
  path.rotation.x = -Math.PI / 2;
  path.position.set(x, 0.05, z);
  path.receiveShadow = true;
  scene.add(path);
  return path;
}

// =========================
// Big Hill
// =========================
function makeHill(x, z, radius, height, color = 0x3f6b2f) {
  const hill = new THREE.Mesh(
    new THREE.SphereGeometry(radius, 32, 24),
    new THREE.MeshStandardMaterial({
      color: color,
      roughness: 1
    })
  );

  // Sink the sphere so only the upper half is visible
  hill.scale.y = height;
  hill.position.set(x, -(radius * height) + 4, z);

  hill.castShadow = true;
  hill.receiveShadow = true;

  scene.add(hill);
  return hill;
}

function makeBird(x, y, z) {
  const feather = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.75 });
  const beakMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.7 });

  const body = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 8), feather);
  body.scale.set(1.2, 0.85, 1);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 8), feather);
  head.position.set(0.28, 0.06, 0);

  const beak = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.18, 6), beakMat);
  beak.rotation.z = -Math.PI / 2;
  beak.position.set(0.42, 0.04, 0);

  const leftWing = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.04, 0.28), feather);
  leftWing.position.set(0, 0.05, 0.32);
  leftWing.rotation.x = 0.15;
  leftWing.rotation.z = 0.35;

  const rightWing = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.04, 0.28), feather);
  rightWing.position.set(0, 0.05, -0.32);
  rightWing.rotation.x = -0.15;
  rightWing.rotation.z = -0.35;

  const tail = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.28, 6), feather);
  tail.rotation.z = Math.PI / 2;
  tail.position.set(-0.32, 0, 0);

  const bird = new THREE.Group();
  bird.add(body, head, beak, leftWing, rightWing, tail);
  bird.position.set(x, y, z);
  bird.userData.startY = y;
  bird.userData.angle = Math.random() * Math.PI * 5;
  bird.userData.radius = 10;

// Choose which tree to circle
if (x < 0) {
    bird.userData.treeX = -8;
    bird.userData.treeZ = 25;
} else {
    bird.userData.treeX = 8;
    bird.userData.treeZ = 25;
}

  bird.userData.leftWing = leftWing;
  bird.userData.rightWing = rightWing;

  bird.userData.isNight = false;
  bird.userData.flyY = y;
  bird.userData.sitY = y - 3; // lower position for sitting on tree

  scene.add(bird);
  edpBirds.push(bird);
  return bird;
}

globalThis.edpBirds = edpBirds;

// Example placements — change x/z (and bird y) after you enable the block
// Bird placement
makeBird(-8, 13, 25);
makeBird(-6, 14, 23);
makeBird(8, 13, 25);
makeBird(10, 14, 27);
makeMangoTree(-8, 25);
makeMangoTree(8, 25);
makePath(0, -2, 15, 25);
makePath(9, 8, 10, 4); 
makePath(-0, -21, -70, -8);
makePath(-6, -29, 8, 10); 
makeHill(-28, 40, 22, 1.0);
makeHill(-12, 42, 35, 1.1);
makeHill(8, 40, 24, 1.0);