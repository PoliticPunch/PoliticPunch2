const keys = {};
document.addEventListener('keydown', (e) => keys[e.code] = true);
document.addEventListener('keyup', (e) => keys[e.code] = false);

function updatePlayerControls(player1, player2, gameState) {
    // Player 1 Controls
    if (keys['KeyW']) player1.position.z -= 0.1;
    if (keys['KeyS']) player1.position.z += 0.1;
    if (keys['KeyA']) player1.position.x -= 0.1;
    if (keys['KeyD']) player1.position.x += 0.1;
    if (keys['Space'] && !gameState.player1.punching) {
        gameState.player1.punching = true;
        player1.rotation.z = 0.5; // Punch animation
        setTimeout(() => {
            gameState.player1.punching = false;
            player1.rotation.z = 0;
        }, 300);
    }
    if (keys['KeyQ'] && !gameState.player1.kicking) {
        gameState.player1.kicking = true;
        player1.position.y = 1.5; // Kick animation
        setTimeout(() => {
            gameState.player1.kicking = false;
            player1.position.y = 1;
        }, 400);
    }

    // Player 2 Controls
    if (keys['ArrowUp']) player2.position.z -= 0.1;
    if (keys['ArrowDown']) player2.position.z += 0.1;
    if (keys['ArrowLeft']) player2.position.x -= 0.1;
    if (keys['ArrowRight']) player2.position.x += 0.1;
    if (keys['Enter'] && !gameState.player2.punching) {
        gameState.player2.punching = true;
        player2.rotation.z = -0.5; // Punch animation
        setTimeout(() => {
            gameState.player2.punching = false;
            player2.rotation.z = 0;
        }, 300);
    }
    if (keys['ShiftRight'] && !gameState.player2.kicking) {
        gameState.player2.kicking = true;
        player2.position.y = 1.5; // Kick animation
        setTimeout(() => {
            gameState.player2.kicking = false;
            player2.position.y = 1;
        }, 400);
    }

    // Collision and damage
    const distance = player1.position.distanceTo(player2.position);
    if (gameState.player1.punching && distance < 2 && gameState.player2.health > 0) {
        gameState.player2.health -= 5;
    }
    if (gameState.player1.kicking && distance < 2.5 && gameState.player2.health > 0) {
        gameState.player2.health -= 10;
    }
    if (gameState.player2.punching && distance < 2 && gameState.player1.health > 0) {
        gameState.player1.health -= 5;
    }
    if (gameState.player2.kicking && distance < 2.5 && gameState.player1.health > 0) {
        gameState.player1.health -= 10;
    }

    // Clamp health
    gameState.player1.health = Math.max(0, gameState.player1.health);
    gameState.player2.health = Math.max(0, gameState.player2.health);

    // Keep players in arena
    player1.position.clamp(new THREE.Vector3(-9, 1, -9), new THREE.Vector3(9, 1, 9));
    player2.position.clamp(new THREE.Vector3(-9, 1, -9), new THREE.Vector3(9, 1, 9));
}
