// factory function to create Player object
const Player = (marker) => {
    let score = 0;
    let selections = new Array();
    return { score, marker, selections }
};

const playerOne = Player('X');
const playerTwo = Player('O');

drawBoard = () => {
    let board = document.getElementById("game-board");
    let blocks = document.querySelectorAll(".cell");
    let init = () => {
        [].forEach.call(blocks, function (e) {
            e.textContent = "";
            e.addEventListener('click', onClick);
        });
    };

    let onClick = function (e) {
        console.log(this.textContent);

        if (newGame.lastTurn == "O" || newGame.lastTurn == "") {
            if (this.textContent == "O" || this.textContent == "X") {
                alert('pick another block! - 1')
            }
            else {
                this.textContent = "X";
                playerOne.selections.push(parseInt(this.id));
                // sort the selection values by ascending order
                playerOne.selections.sort(function (a, b) { return a - b });
                newGame.lastTurn = "X";

            }
        } else {
            if (this.textContent == "O" || this.textContent == "X") {
                alert('pick another block! - 2')
            }
            else {
                this.textContent = "O";
                playerTwo.selections.push(parseInt(this.id));
                // sort the selection values by ascending order
                playerTwo.selections.sort(function (a, b) { return a - b });
                newGame.lastTurn = "O";
            }
        }

        newGame.turnCount++;
        let gameOver = checkWinner();

        if (gameOver) {
            if (newGame.lastTurn == "O")
                playerOne.score++;
            else
                playerTwo.score++;
            // update scores 
            document.getElementById("player1").textContent = playerOne.score;
            document.getElementById("player2").textContent = playerTwo.score;
            newGame();
            blocks.forEach(cell => cell.removeEventListener("click", onClick));

        } else if (playerTwo.selections.length + playerOne.selections.length == 9) {
            alert('Draw!')
            newGame();
            blocks.forEach(cell => cell.removeEventListener("click", onClick));
        }

    };

    init();
};

function checkWinner() {

    let winValues = [[1, 2, 3], [4, 5, 6], [7, 8, 9],
    [1, 4, 7], [2, 5, 8], [3, 6, 9],
    [1, 5, 9], [3, 5, 7]];
    // check if current player has a winning hand
    // only stsrt checking when player x has size number of selections
    let win = false;
    let playerSelections = new Array();

    if (newGame.lastTurn == "O") {
        playerSelections = playerOne.selections;
    }
    else if (newGame.lastTurn == "X") {
        playerSelections = playerTwo.selections;
    }
    if (playerSelections.length >= 3) {
        // check if any 'winValues' are also in your selections
        for (i = 0; i < winValues.length; i++) {
            let checkValues = winValues[i];
            let valuesFound = true;
            // iterate through each value in winValues set
            // check if value is in playerSelections
            // if not, break, not winner
            for (r = 0; r < checkValues.length; r++) {
                let found = false;
                for (s = 0; s < playerSelections.length; s++) {
                    if (checkValues[r] == playerSelections[s]) {
                        found = true;
                        break;
                    }
                }

                // value not found in players hand
                if (found == false) {
                    valuesFound = false;
                    break;
                }
            }

            if (valuesFound == true) {
                win = true;
                alert('Winner!');
                break;
            }
        }
    }
    return win;
}

newGame = () => {
    
    let turnCount = 0;
    let lastTurn = "";

    playerOne.selections = new Array();
    playerTwo.selections = new Array();

    // playerOne.score = 0;
    // playerTwo.score = 0;
    drawBoard();

    return { turnCount, lastTurn }
}

window.onload = newGame;