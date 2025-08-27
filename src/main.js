import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ImprovedNoise } from 'three/addons/math/ImprovedNoise.js';
import { setupSky } from './sky'
import { createSnow, updateParticles } from './snow';

// TODO: Fix Snow Generation
// TODO: Create terrain generator
// TODO: Fix camera

// Initialize scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 100);

scene.fog = new THREE.FogExp2( 0xcccccc, 0.02);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Initialize orbit controls
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableZoom = false;

setupSky(scene)

createSnow(scene, camera)

camera.position.set(0, 5, 15);
controls.update();

function animate() {
  requestAnimationFrame(animate);
  controls.update()
  // updateParticles();
  renderer.render(scene, camera);
}

animate();
