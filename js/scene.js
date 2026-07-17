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
scene.fog = new THREE.Fog(0x0a1628, 35, 100);

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.5,
  200
);
camera.position.set(14, 16, 20);
camera.lookAt(0, 2, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const sun = new THREE.DirectionalLight(0xfff0d0, 1.5);
sun.position.set(12, 22, 10);
sun.castShadow = true;
scene.add(sun);
scene.add(new THREE.AmbientLight(0x406080, 0.55));

const island = new THREE.Mesh(
  new THREE.CylinderGeometry(18, 20, 1.2, 32),
  new THREE.MeshStandardMaterial({ color: 0x2d6a3e, roughness: 0.92 })
);
island.position.y = -0.6;
island.receiveShadow = true;
scene.add(island);

const water = new THREE.Mesh(
  new THREE.PlaneGeometry(80, 80),
  new THREE.MeshStandardMaterial({ color: 0x143d5c, roughness: 0.35, metalness: 0.15 })
);
water.rotation.x = -Math.PI / 2;
water.position.y = -0.8;
scene.add(water);

const buildings = [];
const spots = [
  { name: 'Town Hall', color: 0xe8dcc8, x: -5, z: 3, w: 4, h: 4, d: 3 },
  { name: 'Church', color: 0xd4c4a8, x: 2, z: 1, w: 3.5, h: 6, d: 3.5 },
  { name: 'Market', color: 0xc8b090, x: 6, z: 4, w: 3, h: 3, d: 4 },
  { name: 'Pier', color: 0x8a7858, x: -3, z: -5, w: 5, h: 1.5, d: 2 },
  { name: 'School', color: 0xf0e8d8, x: -1, z: 6, w: 4, h: 3.5, d: 3 },
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
