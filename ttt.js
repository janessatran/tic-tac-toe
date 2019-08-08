
const gameBoard = (() => {
  'use strict'
  const board = () => [1, 2, 3, 4, 5, 6, 7, 8, 9];

  renderBoard = () => {
    let domBoard = document.getElementById('board');
    for(p = 0; p < board.length; p++) {
      for(r = 0; r < 3; r++) {
        let row = table.insertRow(r);
        for(i = 0; i < 3; i++) {
          let block = row.insertCell(i);
          block.id = board[p];
        }
      }
    }
  }

  updateBoard = (position, turn) => board[position] = turn;

  resetBoard = () => board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  
  return { updateBoard }
})();

const Player = (marker) => {
  const score = (score) => 
}


const Game = {
  

}