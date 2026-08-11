let points = 0;
const clickButton = document.getElementById('clickButton');
const pointsDisplay = document.getElementById('points');
let autoClick = false;

clickButton.addEventListener('click', () => {
    points++;
    pointsDisplay.textContent = points;
});

function goBack() {
    confirm("Tem certeza que deseja resetar os pontos?") ? resetGame() : null;

}
function resetGame() {
    points = 0;
    pointsDisplay.textContent = points;
}

function doublePoints() {
    if (points < 50) {
        alert("Consiga 50 pontos para dobrar seus pontos!");
        return;
    }
    
    points += 2;
    pointsDisplay.textContent = points;
}

function startAutoClick() {
    if (points < 100) {
        alert("Consiga 100 pontos para ativar o clique automático!");
        return;
    }

    points -= 100
    autoClick = true;

    if (autoClick === true) {
        setInterval(() => {
            points++;
            pointsDisplay.textContent = points;
        }, 500);
    }
}