import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
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

// Create a Plane
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);

plane.rotation.x = Math.PI / 2; // Rotate the plane to be horizontal
plane.position.set(0, -1, 0); 

scene.add(plane);

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