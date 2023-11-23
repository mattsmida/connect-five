'use strict';

const $gameboard = $('#game-board');
const $spotSelectionZone = $('#spot-selection-zone');

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
function placePieceOnDom(row, col, player){
  console.log(`x, y = ${col}, ${row}`);
  $(`#x${col}-y${row}`).append(`<div class='piece ${player.color}'></div>`);
}

// Event listener to run placePiece on the appropriate column.
$($spotSelectionZone).on('click', function(e) {
  const col = e.target.id.slice(-1);
  const row = gb.placePiece(col, p1);
  placePieceOnDom(row, col, p1);
})

let gb = new Gameboard();
let p1 = new Player('red', true);
let p2 = new Player('blue', false);
populateDomBoard(gb);


/*
Notes zone

*/