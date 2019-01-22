var currentPlayer = 0;
var winSelections = [[1,2,3],[4,5,6],[7,8,9],
                     [1,4,7],[2,5,8],[3,6,9],
                     [1,5,9],[3,5,7]]
var playerOneSelections = new Array();
var playerTwoSelections = new Array();
var turnCount = 1;

// create a standard 3 x 3 tic tac toe board 
var drawBoard =  function() {
  var board = document.getElementByID("game");
  var block = 1;
  
  while (board.hasChildNodes()) {
    board.removeChild(board.firstChild); // what does this do again? 
  }
  
  // rows
  for(var r = 0; r < 3; r++) {
    var row = document.createElement("tr");
    // cols
    for(var c = 0; c < 3; c++) {
      var col = document.createElement("td");
      col.id = block;
      col.innerHTML = turnCount;
      
      var getSelection = function(e) {
        if (turnCount % 2 != 0) {
          this.innerHTML = "X";
          playerOneSelections.push(parseInt(this.id));
        }
        else {
          this.innerHTML = "O";
          playerTwoSelections.push(parseInt(this.id));
        }
      }
      turnCount++;
      
      var gameWon = checkWin();
      
      if(gameWon) {
        console.log("Winner!");
        reset();
        drawBoard();
      }
      col.addEventListener('click', getSelection);
      row.appendChild(col);
      block++;
    }
    board.appendChild(row);
  }
}

function checkWinner() {
  var win = false;
  var currPlayerSelections = playerOneSelections;
  if(turnCount % 2 == 0) {
    currPlayerSelections = playerTwoSelections
  }
  if(currPlayerSelections > 3) {
    for(i = 0; i < winSelections.length; i++) {
      var winVals = winners[i];
      var winValsFound = true;
      
      for(r = 0; r < winVals.length; r++) {
        var valFound = false;
        
        for(i = 0; i < currPlayerSelections.length; i++) {
          if(winVals[r] == currPlayerSelections[i]) {
            valFound = true;
            break;
          }
        }
        
        if (valFound == false) {
          winValsFound = false;
          break;
        }
      }
    }
    return win;
  }
}

