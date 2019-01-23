var winValues =   [[1, 2, 3], [4, 5, 6], [7, 8, 9], 
                   [1, 4, 7], [2, 5, 8], [3, 6, 9], 
                   [1, 5, 9], [3, 5, 7]];
var playerOneSelections = new Array();
var playerTwoSelections = new Array();
var turnCount = 1;
var playerOnePoints = 0;    // player 1 points
var playerTwoPoints = 0;    // player 2 points

function drawBoard() {
    var board = document.getElementById("board");
    var blockNum = 1;
    
    // removes previous boards
    while (board.hasChildNodes()) {
        board.removeChild(board.firstChild);
    }

    // create 3 row elements 
    for (s = 0; s < 3; s++) {
        var row = document.createElement("tr");
        
        // create 3 col elements for each row
        // set id of each element to block number
        for (r = 0; r < 3; r++) {
            var col = document.createElement("td");
            col.id = blockNum;
            col.innerHTML = blockNum;

            // create listener function for what happens when element/block is clicked
            // if Player 1, X
            // if Player 2, O 
            var onClick = function(e) {
                if (turnCount % 2 != 0) {
                    this.innerHTML = "X";
                    playerOneSelections.push(parseInt(this.id));
                    // sort the selection values by ascending order
                    playerOneSelections.sort(function(a, b) { return a - b });
                }

                else {
                    this.innerHTML = "O";
                    playerTwoSelections.push(parseInt(this.id));
                    // sort the selection values by ascending order
                    playerTwoSelections.sort(function(a, b) { return a - b });
                }

                turnCount++;
                var gameOver = checkWinner();

                if (gameOver)
                {
                    if(turnCount % 2 != 0)
                        playerOnePoints++;
                    else
                        playerTwoPoints++;

                    // update scores 
                    document.getElementById("player1").innerHTML = playerOnePoints;
                    document.getElementById("player2").innerHTML = playerTwoPoints;

                    newGame();
                    drawBoard();
                }
                // tied game
                else if (playerTwoSelections.length + playerOneSelections.length == 9)
                {
                    newGame();
                    drawBoard();
                }
            };

            col.addEventListener('click', onClick);

            row.appendChild(col);
            blockNum++;
        }

        board.appendChild(row);
    }
}

function newGame()
{
    turnCount = 0;
    playerOneSelections = new Array();
    playerTwoSelections = new Array();
}


function checkWinner() {
    // check if current player has a winning hand
    // only stsrt checking when player x has size number of selections
    var win = false;
    var playerSelections = new Array();

    if (turnCount % 2 != 0)
        playerSelections = playerOneSelections;
    else
  playerSelections = playerTwoSelections;
    
    if (playerSelections.length >= 3) {
        // check if any 'winValues' are also in your selections
        
        for (i = 0; i < winValues.length; i++) {
            var checkValues = winValues[i];  
            var valuesFound = true;
            
            for (r = 0; r < checkValues.length; r++) {
                // iterate through each value in winValues set
                // check if value is in playerSelections
                // if not, break, not winner
                var found = false;
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
                break;
            }
        }
    }
    return win;
} 

window.onload = drawBoard;