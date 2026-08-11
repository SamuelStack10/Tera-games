const casas = document.querySelectorAll(".casa");
const status = document.getElementById("status");
const botao = document.getElementById("reiniciar");

let tabuleiro = ["", "", "", "", "", "", "", "", ""];
let jogador = "X";
let jogoAtivo = true;

const combinacoes = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

casas.forEach(casa => {
    casa.addEventListener("click", jogar);
});

botao.addEventListener("click", reiniciar);

function jogar() {
    const indice = this.dataset.index;

    if (tabuleiro[indice] !== "" || !jogoAtivo) {
        return;
    }

    tabuleiro[indice] = jogador;
    this.textContent = jogador;

    verificarVencedor();

    if (jogoAtivo) {
        jogador = jogador === "X" ? "O" : "X";
        status.textContent = "Vez do jogador " + jogador;
    }
}

function verificarVencedor() {

    for (let combinacao of combinacoes) {

        const [a, b, c] = combinacao;

        if (
            tabuleiro[a] &&
            tabuleiro[a] === tabuleiro[b] &&
            tabuleiro[a] === tabuleiro[c]
        ) {
            status.textContent = "Jogador " + jogador + " venceu!";
            jogoAtivo = false;
            return;
        }
    }

    if (!tabuleiro.includes("")) {
        status.textContent = "Empate!";
        jogoAtivo = false;
    }
}

function reiniciar() {
    tabuleiro = ["", "", "", "", "", "", "", "", ""];
    jogador = "X";
    jogoAtivo = true;

    status.textContent = "Vez do jogador X";

    casas.forEach(casa => {
        casa.textContent = "";
    });
}