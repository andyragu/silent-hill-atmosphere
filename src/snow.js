import * as THREE from 'three';

let numSnowFlakes = 1500

let particles;
let positions = [], velocities = [];

const maxRange = 1000, minRange = maxRange/2;

const minHeight = 150;

const geometry = new THREE.BufferGeometry()

const textureLoader = new THREE.TextureLoader();

export function createSnow(scene) {

    for(let i = 0; i < numSnowFlakes; i++) {
        positions.push(
            Math.floor(Math.random() * maxRange - minRange),
            Math.floor(Math.random() * maxRange + minRange),
            Math.floor(Math.random() * maxRange - minRange),
        )

        velocities.push(
            Math.floor(Math.random() * 6 - 3) * 0.1,
            Math.floor(Math.random() * 5 + 0.12) * 0.18,
            Math.floor(Math.random() * 6 - 3) * 0.1,
        )
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    geometry.setAttribute('velocity', new THREE.Float32BufferAttribute(velocities, 3))

    const flakeMaterial = new THREE.PointsMaterial({
        size: 4,
        map: textureLoader.load("./sprites/snowflake2.png"),
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true,
        opacity: 0.7
    })

    particles = new THREE.Points(geometry, flakeMaterial);
    scene.add(particles)
}

export function updateParticles() {
    
    for (let i = 0; i < numSnowFlakes * 3; i += 3) {
        particles.geometry.attributes.position.array[i] -= particles.geometry.attributes.velocity.array[i];
        particles.geometry.attributes.position.array[i + 1] -= particles.geometry.attributes.velocity.array[i + 1];
        particles.geometry.attributes.position.array[i + 2] -= particles.geometry.attributes.velocity.array[i + 2];

        if(particles.geometry.attributes.position.array[i+1] < 0){
            particles.geometry.attributes.position.array[i] = Math.floor(Math.random() * maxRange - minRange);
            particles.geometry.attributes.position.array[i + 1] = Math.floor(Math.random() * maxRange + minHeight);
            particles.geometry.attributes.position.array[i + 2] = Math.floor(Math.random() * maxRange - minRange);
        }
    }
    particles.geometry.attributes.position.needsUpdate = true;
}