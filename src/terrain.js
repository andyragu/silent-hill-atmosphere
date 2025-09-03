import { ImprovedNoise } from 'three/addons/math/ImprovedNoise.js';

const worldWidth = 256, worldDepth = 256

const data = generateHeight( worldWidth, worldDepth );

function generateTerrain() {
    const geometry = new THREE.PlaneGeometry(10, 10, worldWidth - 1, worldDepth - 1);
    geometry.rotateX(- Math.PI / 2);

    const vertices = geometry.attributes.position.array;

    for ( let i = 0, j = 0, l = vertices.length; i < l; i++ , j += 3) {
        vertices[j + 1] = data[ i ] * 10;
    }

    const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(geometry, planeMaterial);
}


function generateHeight( width, height ) {
    
    const elevation = []
    const noise = new ImprovedNoise()

    for (let y = 0; y < height; y++) {
        elevation[y] = []
        const ny = y / height
        for (let x = 0; x < width; x++) {
            const nx = x / width;
            elevation[y][x] = noise.noise(nx, ny)
        }
    }

    return elevation

}