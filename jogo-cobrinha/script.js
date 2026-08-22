const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreElement = document.getElementById("score");
const startButton = document.getElementById("startButton");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [];
let food = null;

let direction = { x: 1, y: 0 };
let nextDirection = { x: 1, y: 0 };

let score = 0;
let gameStarted = false;
let gameOver = false;

let gameLoopInterval;


// =========================
// INICIAR JOGO
// =========================
function startGame() {

    snake = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
    ];

    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };

    score = 0;
    gameOver = false;
    gameStarted = true;

    scoreElement.textContent = score;

    generateFood();

    startButton.textContent = "Reiniciar";

    clearInterval(gameLoopInterval);

    gameLoopInterval = setInterval(gameLoop, 150);

    draw();
}


// =========================
// CRIAR COMIDA
// =========================
function generateFood() {

    do {
    food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };

    } while (
    snake.some(segment =>
        segment.x === food.x &&
        segment.y === food.y
    )
    );
}


// =========================
// ATUALIZAR JOGO
// =========================
function update() {

    if (!gameStarted || gameOver) {
    return;
    }

    direction = nextDirection;

    const head = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y
    };


    // Colisão com as paredes
    if (
    head.x < 0 ||
    head.x >= tileCount ||
    head.y < 0 ||
    head.y >= tileCount
    ) {
    endGame();
    return;
    }


    // Colisão com o próprio corpo
    if (
    snake.some(segment =>
        segment.x === head.x &&
        segment.y === head.y
    )
    ) {
    endGame();
    return;
    }


    // Adiciona nova cabeça
    snake.unshift(head);


    // Comeu a comida
    if (
    head.x === food.x &&
    head.y === food.y
    ) {

    score++;

    scoreElement.textContent = score;

    generateFood();

    } else {

    // Remove a cauda
    snake.pop();
    }
}


// =========================
// DESENHAR
// =========================
function draw() {

    // Fundo
    ctx.fillStyle = "#0b1220";
    ctx.fillRect(
    0,
    0,
    canvas.width,
    canvas.height
    );


    // Cobra
    snake.forEach((segment, index) => {

    ctx.fillStyle =
        index === 0
        ? "#88eef1"
        : "#4ad9de";

    ctx.fillRect(
        segment.x * gridSize,
        segment.y * gridSize,
        gridSize - 1,
        gridSize - 1
    );
    });


    // Comida
    if (food) {

    ctx.fillStyle = "#ef4444";

    ctx.fillRect(
        food.x * gridSize,
        food.y * gridSize,
        gridSize - 1,
        gridSize - 1
    );
    }


    // Mensagem inicial
    if (!gameStarted) {

    ctx.fillStyle = "rgba(0, 0, 0, 0.6)";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.fillStyle = "#ffffff";

    ctx.font = "bold 30px Arial";
    ctx.textAlign = "center";

    ctx.fillText(
        "🐍 Snake",
        canvas.width / 2,
        canvas.height / 2 - 10
    );

    ctx.font = "17px Arial";

    ctx.fillText(
        "Clique em Iniciar Jogo",
        canvas.width / 2,
        canvas.height / 2 + 25
    );
    }


    // Game Over
    if (gameOver) {

    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.fillStyle = "#ffffff";

    ctx.font = "bold 36px Arial";
    ctx.textAlign = "center";

    ctx.fillText(
        "GAME OVER",
        canvas.width / 2,
        canvas.height / 2 - 10
    );

    ctx.font = "18px Arial";

    ctx.fillText(
        "Pontuação: " + score,
        canvas.width / 2,
        canvas.height / 2 + 25
    );
    }
}


// =========================
// GAME OVER
// =========================
function endGame() {

    gameOver = true;
    gameStarted = false;

    clearInterval(gameLoopInterval);

    startButton.textContent = "Jogar Novamente";

    draw();
}


// =========================
// CONTROLES
// =========================
document.addEventListener("keydown", function(event) {

    const key = event.key.toLowerCase();


    // Não permite controlar antes de iniciar
    if (!gameStarted) {
    return;
    }


    // Cima
    if (
    (key === "arrowup" || key === "w") &&
    direction.y !== 1
    ) {

    nextDirection = {
        x: 0,
        y: -1
    };
    }


    // Baixo
    if (
    (key === "arrowdown" || key === "s") &&
    direction.y !== -1
    ) {

    nextDirection = {
        x: 0,
        y: 1
    };
    }


    // Esquerda
    if (
    (key === "arrowleft" || key === "a") &&
    direction.x !== 1
    ) {

    nextDirection = {
        x: -1,
        y: 0
    };
    }


    // Direita
    if (
    (key === "arrowright" || key === "d") &&
    direction.x !== -1
    ) {

    nextDirection = {
        x: 1,
        y: 0
    };
    }
});


// =========================
// LOOP
// =========================
function gameLoop() {

    update();
    draw();
}


// =========================
// TELA INICIAL
// =========================
draw();