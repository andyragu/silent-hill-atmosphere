import * as THREE from 'three';
import { Sky } from 'three/addons/objects/Sky.js';

export function setupSky(
    scene,
    scale = 450000,
    turbidity = 2.5,
    rayleigh = 3.5,
    mieCoefficient = 0.005,
    mieDirectionalG = 0.5,
) {
    const sky = new Sky()
    sky.scale.setScalar(scale);

    const skyUniforms = sky.material.uniforms;
    skyUniforms['turbidity'].value = turbidity;
    skyUniforms['rayleigh'].value = rayleigh;
    skyUniforms['mieCoefficient'].value = mieCoefficient;
    skyUniforms['mieDirectionalG'].value = mieDirectionalG;

    const sun = new THREE.Vector3();
    const phi = THREE.MathUtils.degToRad(90 - 10);
    const theta = THREE.MathUtils.degToRad(180);
    sun.setFromSphericalCoords(1, phi, theta);
    skyUniforms['sunPosition'].value.set(1, 0, 0);

    scene.add(sky);
}