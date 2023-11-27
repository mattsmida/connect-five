'use strict';

const DEFAULT_WIDTH = 9;
const DEFAULT_HEIGHT = 6;

class Gameboard {
/*
  What does this have?
  ✓ Spots for all of the pieces
    - (Don't go outside the board!)
  - Information about whose turn it is

  What should this do?
  ✓ A way to check whether someone has won
  - Move validation (e.g., can't place a piece in a filled column)
  - Display properties for the game board

*/

  constructor(boardWidth = DEFAULT_WIDTH, boardHeight = DEFAULT_HEIGHT) {
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.spots = this.setupBoard(boardWidth, boardHeight);
    this.gameOver = false;
    this.quickBreak = false;  // Enforce a brief pause between turns
  }

  /** Called during the construction of a game board. Inputs: height and width.
   *  This function returns an array to track where each player has moved.
   */
  setupBoard(boardWidth, boardHeight) {
    const board = [];
    for (let i = 0; i < boardHeight; i++) {
      board.push([]);
      for (let j = 0; j < boardWidth; j++) {
        board[i].push(null);
      }
    }
    return board;
  }

  /** Put a piece on the board. Input is the column and the current player.
   *  (Row is not needed because of the gravity of the situation.) Modifies
   *  the gameboard's spots property, and returns the y-coord on successful
   *  placement or false if a piece cannot be placed in that column.
   */
  placePiece(col, player) {
    // For the given column (i.e., postions[y][col]), find the lowest spot.
    // Put a piece belonging to the current player there, and return y.
    // If the whole column is full, return false.
    for (let y = this.boardHeight - 1; y >= 0; y--) {
      if (this.spots[y][col] === null) {
        this.spots[y][col] = new Piece(player.color);
        return y;
      }
    }
    return false;
  }

  /** Given player 1 and player 2, pass the turn to the next.
   *  This is done by setting the myTurn property of the current turn-taker
   *  to false and that of the next player to true. Nothing is returned.
   */
  alternateTurn(p1, p2) {
    if (p1.myTurn) {
      p1.myTurn = false;
      p2.myTurn = true;
    } else {
      p1.myTurn = true;
      p2.myTurn = false;
    }
  }

  /** Check for a win horizontally. Takes a color to check for,
   *  and returns true if that color has won or false if not.
   */
  checkWinHoriz(color) {
    for (let i = 0; i < this.boardWidth - 4; i++) {
      for (let j = 0; j < this.boardHeight; j++) {
        const x = i;
        const y = j;
        const checks = [[x, y], [x+1, y], [x+2, y], [x+3, y], [x+4, y]];
        let checkCount = 0;
        for (let [posX, posY] of checks) {
          if (this.spots[posY][posX] === null
              || this.spots[posY][posX].color !== color) {
            break;
          }
          checkCount++;
          if (checkCount === checks.length) return true;
        }
      }
    }
    return false;
  }

  /** Check for a win vertically. Takes a color to check for,
   *  and returns true if that color has won or false if not.
   */
  checkWinVert(color) {
    for (let i = 0; i < this.boardWidth; i++) {
      for (let j = 0; j < this.boardHeight - 4; j++) {
        const x = i;
        const y = j;
        const checks = [[x, y], [x, y+1], [x, y+2], [x, y+3], [x, y+4]];
        let checkCount = 0;
        for (let [posX, posY] of checks) {
          if (this.spots[posY][posX] === null
              || this.spots[posY][posX].color !== color) {
            break;
          }
          checkCount++;
          if (checkCount === checks.length) return true;
        }
      }
    }
    return false;
  }

  /** Check for a win diagonally down and right. Takes a color to check for,
   *  and returns true if that color has won or false if not.
   */
  checkWinDR(color){
    for (let i = 0; i < this.boardWidth - 4; i++) {
      for (let j = 0; j < this.boardHeight - 4; j++) {
        const x = i;
        const y = j;
        const checks = [[x, y], [x+1, y+1], [x+2, y+2], [x+3, y+3], [x+4, y+4]];
        let checkCount = 0;
        for (let [posX, posY] of checks) {
          if (this.spots[posY][posX] === null
              || this.spots[posY][posX].color !== color) {
            break;
          }
          checkCount++;
          if (checkCount === checks.length) return true;
        }
      }
    }
    return false;
  }

  /** Check for a win diagonally up and right. Takes a color to check for,
   *  and returns true if that color has won or false if not.
   */
  checkWinUR(color) {
    for (let i = 0; i < this.boardWidth - 4; i++) {
      for (let j = this.boardHeight - 1; j >= 4; j--) {
        const x = i;
        const y = j;
        const checks = [[x, y], [x+1, y-1], [x+2, y-2], [x+3, y-3], [x+4, y-4]];
        let checkCount = 0;
        for (let [posX, posY] of checks) {
          if (this.spots[posY][posX] === null
              || this.spots[posY][posX].color !== color) {
            break;
          }
          checkCount++;
          if (checkCount === checks.length) return true;
        }
      }
    }
    return false;
  }

  /** Check for wins in each of the four possible orientations: h, v, ur, dr.
   *  Input: color to check for. Output: true or false to signify win or not.
   */
  checkWin(color) {
    return (this.checkWinHoriz(color) || this.checkWinVert(color)
            || this.checkWinUR(color) || this.checkWinDR(color));
  }

  /** Checks for stalemate via full board. No input.
   *  Returns true if stalemate, false if not.
   */
  checkStalemate() {
    return this.spots.every(row => !row.includes(null));
  }

  /** This method represents one turn. It anticipates the placement of a piece,
   *  then validates the move, checks for game-ends, and switches the turn
   *  of the players. Input: both player objects. Output: none.
   */
  oneTurn(p1, p2, columnChoice) {
    console.log(`p1's turn? `, p1.myTurn);
    const currentPlayer = p1.myTurn ? p1 : p2;

    if (this.checkWin(currentPlayer.color)) {
      this.gameOver = true;
      setTimeout(() => {
        alert(`${currentPlayer.color} is victorious.`);
        $newGame.show();
        return undefined;
      }, 1000);
    }

    if (this.checkStalemate()) {
      this.gameOver = true;
      setTimeout(() => {
        alert(`Welcome to this stalemate.`);
        $newGame.show();
        return undefined;
      }, 1000);
    }

    this.alternateTurn(p1, p2);
  }

}

class Player {
  /*
  What does this have?
  - Piece color (does a player have a Piece? Is piece even a class then?)
  - It can either be your turn or not your turn (in gameboard?)
  */

  constructor(color, myTurn) {
    this.color = color;
    this.myTurn = myTurn;
  }
}

class Piece {
  /*
  What does this have?
  - Color
  */

  constructor(color) {
    this.color = color;
  }

}




/*

Notes zone

What happens in a game of connect five?

Let the players choose their colors (using a small form)
On form submission, the game board is displayed
Make a game board
  Include a top row that allows for clicking to drop a piece
  The rest of the rows can contain pieces (1 or 2) or be null
Display the game board on the DOM
Listen for clicks, and fill the board (or refuse to fill it) appropriately
Alternate the players' turns
Keep checking for a win every time a piece is placed
(Also watch for the stalemate case)
If a win or stalemate happens, shut off the game
  - Display a congratulatory or confused message
  - Offer a restart button

*/