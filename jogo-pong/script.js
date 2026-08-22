const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// =========================
// CONFIGURAÇÕES
// =========================

const paddleWidth = 12;
const paddleHeight = 90;
const paddleSpeed = 7;
const ballSize = 12;
const winningScore = 7;

// =========================
// BOTÃO
// =========================

const startButton = document.getElementById("startButton");

// =========================
// JOGADORES
// =========================

const player1 = {
x: 20,
y: canvas.height / 2 - paddleHeight / 2,
width: paddleWidth,
height: paddleHeight,
score: 0
};

const player2 = {
x: canvas.width - 20 - paddleWidth,
y: canvas.height / 2 - paddleHeight / 2,
width: paddleWidth,
height: paddleHeight,
score: 0
};

// =========================
// BOLA
// =========================

const ball = {
x: canvas.width / 2,
y: canvas.height / 2,
size: ballSize,
speedX: 5,
speedY: 4
};

// =========================
// ESTADO DO JOGO
// =========================

let gameStarted = false;
let gameOver = false;
let winner = "";

// =========================
// TECLADO
// =========================

const keys = {};

document.addEventListener("keydown", (event) => {
keys[event.key] = true;

// Evita a página de rolar ao usar as setas
if (
    event.key === "ArrowUp" ||
    event.key === "ArrowDown" ||
    event.key === " "
) {
    event.preventDefault();
}
});

document.addEventListener("keyup", (event) => {
keys[event.key] = false;
});

// =========================
// BOTÃO INICIAR
// =========================

startButton.addEventListener("click", () => {
if (gameOver) {
    restartGame();
} else {
    startGame();
}
});

// =========================
// INICIAR PARTIDA
// =========================

function startGame() {
gameStarted = true;
gameOver = false;
winner = "";

player1.score = 0;
player2.score = 0;

player1.y =
    canvas.height / 2 - paddleHeight / 2;

player2.y =
    canvas.height / 2 - paddleHeight / 2;

resetBall(
    Math.random() > 0.5 ? 1 : -1
);

startButton.style.display = "none";
}

// =========================
// REINICIAR PARTIDA
// =========================

function restartGame() {
gameStarted = false;
gameOver = false;
winner = "";

player1.score = 0;
player2.score = 0;

player1.y =
    canvas.height / 2 - paddleHeight / 2;

player2.y =
    canvas.height / 2 - paddleHeight / 2;

resetBall(1);

startButton.textContent = "Iniciar partida";
startButton.style.display = "inline-block";
}

// =========================
// RESET DA BOLA
// =========================

function resetBall(direction) {
ball.x =
    canvas.width / 2 - ball.size / 2;

ball.y =
    canvas.height / 2 - ball.size / 2;

ball.speedX = 5 * direction;

ball.speedY =
    (Math.random() > 0.5 ? 1 : -1) * 4;
}

// =========================
// VERIFICAR VENCEDOR
// =========================

function checkWinner() {
if (player1.score >= winningScore) {
    gameOver = true;
    gameStarted = false;
    winner = "Jogador 1";

    startButton.textContent =
    "Jogar novamente";

    startButton.style.display =
    "inline-block";
}

if (player2.score >= winningScore) {
    gameOver = true;
    gameStarted = false;
    winner = "Jogador 2";

    startButton.textContent =
    "Jogar novamente";

    startButton.style.display =
    "inline-block";
}
}

// =========================
// ATUALIZAR JOGO
// =========================

function update() {
// Não atualiza enquanto não começou
// ou depois que alguém venceu
if (!gameStarted || gameOver) {
    return;
}

// -------------------------
// Jogador 1 - W / S
// -------------------------

if (keys["w"] || keys["W"]) {
    player1.y -= paddleSpeed;
}

if (keys["s"] || keys["S"]) {
    player1.y += paddleSpeed;
}

// -------------------------
// Jogador 2 - Setas
// -------------------------

if (keys["ArrowUp"]) {
    player2.y -= paddleSpeed;
}

if (keys["ArrowDown"]) {
    player2.y += paddleSpeed;
}

// -------------------------
// Limita as barras
// -------------------------

player1.y = Math.max(
    0,
    Math.min(
    canvas.height - player1.height,
    player1.y
    )
);

player2.y = Math.max(
    0,
    Math.min(
    canvas.height - player2.height,
    player2.y
    )
);

// -------------------------
// Movimento da bola
// -------------------------

ball.x += ball.speedX;
ball.y += ball.speedY;

// -------------------------
// Colisão com teto/chão
// -------------------------

if (
    ball.y <= 0 ||
    ball.y + ball.size >= canvas.height
) {
    ball.speedY *= -1;
}

// -------------------------
// Colisão com Jogador 1
// -------------------------

if (
    ball.x <= player1.x + player1.width &&
    ball.x + ball.size >= player1.x &&
    ball.y + ball.size >= player1.y &&
    ball.y <= player1.y + player1.height &&
    ball.speedX < 0
) {
    ball.speedX *= -1;

    const hitPosition =
    (ball.y + ball.size / 2) -
    (player1.y + player1.height / 2);

    ball.speedY =
    hitPosition * 0.12;
}

// -------------------------
// Colisão com Jogador 2
// -------------------------

if (
    ball.x + ball.size >= player2.x &&
    ball.x <= player2.x + player2.width &&
    ball.y + ball.size >= player2.y &&
    ball.y <= player2.y + player2.height &&
    ball.speedX > 0
) {
    ball.speedX *= -1;

    const hitPosition =
    (ball.y + ball.size / 2) -
    (player2.y + player2.height / 2);

    ball.speedY =
    hitPosition * 0.12;
}

// -------------------------
// Ponto do Jogador 2
// -------------------------

if (ball.x + ball.size < 0) {
    player2.score++;

    checkWinner();

    if (!gameOver) {
    resetBall(1);
    }
}

// -------------------------
// Ponto do Jogador 1
// -------------------------

if (ball.x > canvas.width) {
    player1.score++;

    checkWinner();

    if (!gameOver) {
    resetBall(-1);
    }
}
}

// =========================
// DESENHAR
// =========================

function draw() {
// Fundo
ctx.fillStyle = "#000";

ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
);

// -------------------------
// Linha central
// -------------------------

ctx.strokeStyle = "#555";
ctx.lineWidth = 3;
ctx.setLineDash([10, 10]);

ctx.beginPath();

ctx.moveTo(
    canvas.width / 2,
    0
);

ctx.lineTo(
    canvas.width / 2,
    canvas.height
);

ctx.stroke();

ctx.setLineDash([]);

// -------------------------
// Barras
// -------------------------

ctx.fillStyle = "#fff";

ctx.fillRect(
    player1.x,
    player1.y,
    player1.width,
    player1.height
);

ctx.fillRect(
    player2.x,
    player2.y,
    player2.width,
    player2.height
);

// -------------------------
// Bola
// -------------------------

ctx.fillRect(
    ball.x,
    ball.y,
    ball.size,
    ball.size
);

// -------------------------
// Placar
// -------------------------

ctx.font = "60px Arial";
ctx.textAlign = "center";
ctx.fillStyle = "#fff";

ctx.fillText(
    player1.score,
    canvas.width / 2 - 70,
    70
);

ctx.fillText(
    player2.score,
    canvas.width / 2 + 70,
    70
);

// -------------------------
// Tela de vitória
// -------------------------

if (gameOver) {
    ctx.fillStyle =
    "rgba(0, 0, 0, 0.85)";

    ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
    );

    ctx.fillStyle = "#00ff88";
    ctx.font = "48px Arial";
    ctx.textAlign = "center";

    ctx.fillText(
    winner + " venceu!",
    canvas.width / 2,
    canvas.height / 2 - 30
    );

    ctx.fillStyle = "#fff";
    ctx.font = "22px Arial";

    ctx.fillText(
    "Clique em 'Jogar novamente'",
    canvas.width / 2,
    canvas.height / 2 + 30
    );
}
}

// =========================
// LOOP PRINCIPAL
// =========================

function gameLoop() {
update();
draw();

requestAnimationFrame(gameLoop);
}

// Inicia o loop, mas a partida
// só começa quando o botão for clicado.
gameLoop();

