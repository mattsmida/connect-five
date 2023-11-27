'use strict';

const $gameboard = $('#game-board');
const $spotSelectionZone = $('#spot-selection-zone');
const $colorSelection = $('#color-selection');
const $newGame = $('#new-game');

let p1Color;
let p2Color;

let gb;
let p1;
let p2;

/** This function populates a board on the DOM. Input: an instance
 *  of Gameboard. Output: none.
 */
function populateDomBoard(gb) {
  for (let i = 0; i < gb.boardWidth; i++) {
    $spotSelectionZone.children('tr').append($(`<th id='s${i}'>&nbsp;</th>`));
  }

  for (let i = 0; i < gb.boardHeight; i++) {
    $gameboard.children('tbody').append(
        `<tr id='r${i}' class='game-row'></tr>`);
    for (let j = 0; j < gb.boardWidth; j++) {
      $gameboard.find('.game-row').last().append(
          `<td id='x${j}-y${i}' class='game-spot'></td>`);
          // `<td id='x${j}-y${i}' class='game-spot'>
          // <div class='piece red'>&nbsp;</div></td>`);
          // The commented line can be used to populate the board with pieces.
    }
  }
}

/** This function is used to place a piece on the DOM gameboard.
 *  It accepts the row, column, and player as arguments, and returns nothing.
 */
function placePieceOnDom(row, col, player) {
  console.log(`x, y = ${col}, ${row}`);
  let $pieceToPlace = $(`<div class='piece'></div>`);
  $pieceToPlace.css('background-color', player.color);
  $(`#x${col}-y${row}`).append($pieceToPlace);
}

// Event listener to run placePiece on the appropriate column.
$spotSelectionZone.on('click', function(e) {
  if (gb.gameOver) return;
  const currentPlayer = p1.myTurn ? p1 : p2;
  const col = e.target.id.slice(-1);
  const row = gb.placePiece(col, currentPlayer);
  gb.oneTurn(p1, p2, col);
  placePieceOnDom(row, col, currentPlayer);
})

// Event listener to use the form to set the colors for the competitors
$colorSelection.on('submit', function(e) {
  e.preventDefault();
  p1Color = $('#p1-color-choice').val();
  p2Color = $('#p2-color-choice').val();
  gb = new Gameboard();
  p1 = new Player(p1Color, true);
  p2 = new Player(p2Color, false);
  populateDomBoard(gb);
  $colorSelection.css('visibility', 'hidden');
  $colorSelection.off('submit');
})

// Event listener to refresh the page for a new game
$newGame.children('button').on('click', () => window.location.reload());