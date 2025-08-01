import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 2, 0.1, 100);


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a Plane
const planeGeometry = new THREE.PlaneGeometry(5, 5);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x50C878, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);

camera.position.z = 5;

function animate() {
  plane.rotation.x += 0.01;
  plane.rotation.y += 0.01;
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);