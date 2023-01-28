'use strict';

const X_CLASS = 'x';
const CIRCLE_CLASS = 'o';
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winning-msg');
const restartButton = document.getElementById('restartBtn');
const winningMessageTextElement = document.getElementById(
  'winning-message-text'
);
let circleTurn;

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove('show');
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!';
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? 'O' : 'X'} Wins!`;
  }
  winningMessageElement.classList.add('show');
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

// // Tic Tac Toe Game in JavaScript

// // Board Module
// const Board = (() => {
//   let board = ['', '', '', '', '', '', '', '', ''];

//   const reset = () => {
//     board = ['', '', '', '', '', '', '', '', ''];
//   }

//   const update = (index, symbol) => {
//     board[index] = symbol;
//   }

//   const checkWinner = () => {
//     // check rows, columns, and diagonals for a win
//     // return the symbol of the winner or 'Tie' if it's a draw
//     // return '' if the game is not over yet
//   }

//   return {
//     reset,
//     update,
//     checkWinner
//   }
// })();

// // Player Module
// const Player = (name, symbol) => {
//   const getName = () => name;
//   const getSymbol = () => symbol;
//   return {
//     getName,
//     getSymbol
//   }
// };

// // Game Module
// const Game = (() => {
//   let player1;
//   let player2;
//   let currentPlayer;
//   let gameOver = false;

//   const start = (p1Name, p1Symbol, p2Name, p2Symbol) => {
//     player1 = Player(p1Name, p1Symbol);
//     player2 = Player(p2Name, p2Symbol);
//     currentPlayer = player1;
//     Board.reset();
//     gameOver = false;
//   }

//   const play = (index) => {
//     if (!gameOver) {
//       if (Board.board[index] === '') {
//         Board.update(index, currentPlayer.getSymbol());
//         const winner = Board.checkWinner();
//         if (winner) {
//           gameOver = true;
//           console.log(`${winner} wins!`);
//         } else {
//           currentPlayer = (currentPlayer === player1) ? player2 : player1;
//         }
//       } else {
//         console.log('Invalid move');
//       }
//     } else {
//       console.log('Game over. Please start a new game.');
//     }
//   }

//   return {
//     start,
//     play
//   }
// })();

// // Example usage:
// Game.start('Player 1', 'X', 'Player 2', 'O');
// Game.play(0); // places an X on the top-left corner of the board
// Game.play(4); // places an O in the center of the board
// // continue playing until the game is over
