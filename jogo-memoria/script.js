const game = document.getElementById("game");
const timerElement = document.getElementById("timer");
const movesElement = document.getElementById("moves");
const restartButton = document.getElementById("restart");
const message = document.getElementById("message");

const symbols = ["🍎", "🍌", "🍇", "🍉", "🍓", "🍒", "🥝", "🍍"];

let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;

let moves = 0;
let matchedPairs = 0;

let seconds = 0;
let timer = null;
let gameStarted = false;


// Embaralha o array
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}


// Cria o tabuleiro
function createBoard() {
  game.innerHTML = "";

  const duplicatedSymbols = [...symbols, ...symbols];
  cards = shuffle(duplicatedSymbols);

  cards.forEach((symbol, index) => {
    const card = document.createElement("div");

    card.classList.add("card");
    card.dataset.symbol = symbol;
    card.dataset.index = index;

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">?</div>
        <div class="card-back">${symbol}</div>
      </div>
    `;

    card.addEventListener("click", flipCard);

    game.appendChild(card);
  });
}


// Inicia o temporizador
function startTimer() {
  if (gameStarted) return;

  gameStarted = true;

  timer = setInterval(() => {
    seconds++;

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    timerElement.textContent =
      `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  }, 1000);
}


// Vira uma carta
function flipCard() {
  if (lockBoard) return;

  if (this === firstCard) return;

  if (this.classList.contains("matched")) return;

  startTimer();

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  moves++;

  movesElement.textContent = moves;

  checkMatch();
}


// Compara as duas cartas
function checkMatch() {
  const isMatch =
    firstCard.dataset.symbol === secondCard.dataset.symbol;

  if (isMatch) {
    disableCards();
  } else {
    unflipCards();
  }
}


// Mantém as cartas iguais viradas
function disableCards() {
  firstCard.classList.add("matched");
  secondCard.classList.add("matched");

  matchedPairs++;

  resetBoard();

  if (matchedPairs === symbols.length) {
    finishGame();
  }
}


// Desvira as cartas diferentes
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");

    resetBoard();
  }, 1000);
}


// Reseta as cartas selecionadas
function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}


// Finaliza o jogo
function finishGame() {
  clearInterval(timer);

  message.textContent =
    `🎉 Parabéns! Você encontrou todos os pares em ${moves} jogadas e ${timerElement.textContent}.`;
}


// Reinicia o jogo
function restartGame() {
  clearInterval(timer);

  firstCard = null;
  secondCard = null;
  lockBoard = false;

  moves = 0;
  matchedPairs = 0;

  seconds = 0;
  gameStarted = false;

  movesElement.textContent = "0";
  timerElement.textContent = "00:00";
  message.textContent = "";

  createBoard();
}


// Botão de reiniciar
restartButton.addEventListener("click", restartGame);


// Inicia o jogo
createBoard();
