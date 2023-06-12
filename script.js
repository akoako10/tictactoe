var states = ["", "", "", "", "", "", "", "", ""];
var winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
var currentPlayer = "X";
var statusText = document.getElementsByClassName('status-message')[0];
var activeGame = false;
var userChoice = "";
var choiceMade = false;


document.getElementById("startX").addEventListener("click", function () {
    startGame("X");
})

document.getElementById("startO").addEventListener("click", function () {
    startGame("O");
})

function startGame(choice) {
    if (choiceMade || activeGame) {
        return;
    }

    userChoice = choice;
    activeGame = true;
    currentPlayer = userChoice;
    choiceMade = true;



}

function onSquareClick(clickedSquareEvent) {
    console.log(clickedSquareEvent)
    const clickedSquare = clickedSquareEvent.target;
    const clickedSquareIndex = parseInt(
        clickedSquare.getAttribute('data-cell-index')
    )
    if (states[clickedSquareIndex] !== "" || !activeGame) {
        return;
    }
    onSquarePlay(clickedSquare, clickedSquareIndex);
    checkWinning()
}

function onSquarePlay(clickedSquare, clickedSquareIndex) {
    states[clickedSquareIndex] = currentPlayer;
    clickedSquare.innerHTML = currentPlayer;
    clickedSquare.style.color = (currentPlayer === userChoice) ? "red" : "black";
}


function checkWinning() {
    var won = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winningCondition = winningConditions[i];
        var first = states[winningCondition[0]];
        var second = states[winningCondition[1]];
        var third = states[winningCondition[2]];

        if (first == "" || second == "" || third == "") {
            continue;
        }

        if (first === second && first === third) {
            won = true;
            break;
        }
    }

    if (won) {
        statusText.innerHTML = currentPlayer + " is  Winner";
        activeGame = false;
    } else {
        var draw = !states.includes("");
        if (draw) {
            statusText.innerHTML = "The game end with  DRAW";
            activeGame = false;
        }
    }
    changePlayer();
}

function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function restart() {
    activeGame = false;
    currentPlayer = "";
    states = ["", "", "", "", "", "", "", "", ""];
    document.querySelectorAll(".square").forEach((item) => {
        item.innerHTML = "";
    });
    document.getElementById("startX").style.display = "block";
    document.getElementById("startO").style.display = "block";
    document.getElementById("gameBoard").style.display = "none";
}

document.querySelectorAll('.square').forEach(item => {
    item.addEventListener('click', onSquareClick)
})

document.querySelector('.restart').addEventListener('click', restart)