// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

// Arena
const arenaGeometry = new THREE.CircleGeometry(10, 32);
const arenaMaterial = new THREE.MeshPhongMaterial({ color: 0x666666 });
const arena = new THREE.Mesh(arenaGeometry, arenaMaterial);
arena.rotation.x = -Math.PI / 2;
scene.add(arena);

// Player 1 (Red Politician)
const player1Geometry = new THREE.BoxGeometry(1, 2, 1);
const player1Material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
const player1 = new THREE.Mesh(player1Geometry, player1Material);
player1.position.set(-3, 1, 0);
scene.add(player1);

// Player 2 (Blue Politician)
const player2Geometry = new THREE.BoxGeometry(1, 2, 1);
const player2Material = new THREE.MeshPhongMaterial({ color: 0x0000ff });
const player2 = new THREE.Mesh(player2Geometry, player2Material);
player2.position.set(3, 1, 0);
scene.add(player2);

// Camera setup
camera.position.set(0, 8, 12);
camera.lookAt(0, 0, 0);

// Game state
let gameState = {
    player1: { health: 100, punching: false, kicking: false },
    player2: { health: 100, punching: false, kicking: false }
};

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Update controls from controls.js
    updatePlayerControls(player1, player2, gameState);

    // Update health bars
    document.getElementById('p1-health').style.width = `${gameState.player1.health}%`;
    document.getElementById('p2-health').style.width = `${gameState.player2.health}%`;

    renderer.render(scene, camera);
}
animate();

// Resize handler
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
