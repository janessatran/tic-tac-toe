// module to set up board for game
let gameBoard = (() => {
  const board = [["", "", ""],
                 ["", "", ""],
                 ["", "", ""]];
  
  let winValues = [[1, 2, 3], [4, 5, 6], [7, 8, 9],
                 [1, 4, 7], [2, 5, 8], [3, 6, 9],
                 [1, 5, 9], [3, 5, 7]];
  
  let lastTurn = "";
  
  let updateBoard = (currentPlayer) => {
    [].forEach.call(document.querySelectorAll(".cell"), function(e) {
      console.log(e);
      e.addEventListener('click', () => {
        if (e.innerText != "") {
          alert('Pick another block!');
        } else {
          e.innerText = currentPlayer.marker;
          currentPlayer.selections.push(parseInt(e.id));
          // sort selection values by ascending order
          currentPlayer.selections.sort(function (a, b) { return a - b });
          lastTurn = currentPlayer.marker;
        }
      });
    });
  }

  let resetBoard = () => {
    [].forEach.call(document.querySelectorAll(".cell"), function(e) {
        e.innerText = "";
    });
  };

  return { board, updateBoard, resetBoard, lastTurn, winValues }
})();

// factory function to create Player object
const Player = (marker) => {
  score: 0;
  selections: [];
  resetScore = () => { score: 0 };
  getScore = () => { return this.score };
  return { getScore, marker, resetScore, selections }
};

const playerOne = Player('X');
const playerTwo = Player('O');

// controller for game flow
let gameController = (() => {

  playerOne.resetScore();
  playerTwo.resetScore();



  getCurrentPlayer = () => { 
    return ((lastTurn == "" || lastTurn == "X") ? playerOne : playerTwo); 
  };

  getMove = () => {
    gameBoard.updateBoard(getCurrentPlayer());
  };

  checkWinner = () => {
    let win = false;
    let playerSelections = (lastTurn == "O") ? playerTwo.selections : playerOne.selections;

    // only check if user selections array contains at least 3 choices
    if(selections.length >= 3) {
      for(i = 0; i < gameBoard.winValues.length; i++) {
        let vals = gameBoard.winValues[i].sort();
        let valsFound = playerSelections.includes(vals) ? true : false;
        
        if (valsFound == true) {
          win = true;
          alert("Winner! Yay!");
          break;
        }
      }
    }
    return win;
  }

  gameOver = () => {
    return (turnCount == 4 ? true : false)
  }

  while(!gameOver()) {
    getMove();
  }


  return { getMove, turnCount };
});

window.onload = gameController;




