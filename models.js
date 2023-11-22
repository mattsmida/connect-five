class Gameboard {
/*
  What does this have?
  - Spots for all of the pieces
    - (Don't go outside the board!)
  - Information about whose turn it is

  What should this do?
  - A way to check whether someone has won
  - Move validation (e.g., can't place a piece in a filled column)
  - Display properties for the game board

*/

  constructor(boardWidth, boardHeight) {
    this.boardWidth = boardWidth;     // Generally 7
    this.boardHeight = boardHeight;   // Generally 6
    this.spots = this.setupBoard(boardWidth, boardHeight);
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
   *  the gameboard's spots property, and returns true on successful
   *  placement or false if a piece cannot be placed in that column.
   */
  placePiece(col, player) {
    // For the given column (i.e., postions[y][col]), find the lowest spot.
    // Put a piece belonging to the current player there, and return true.
    // If the whole column is full, return false.
    for (let y = this.boardHeight - 1; y >= 0; y--) {
      if (this.spots[y][col] === null) {
        // this.spots[y][col] = new Piece(player);
        this.spots[y][col] = new Piece(player.color);
        return true;
      }
    }
    return false;
  }


  /** Given an array of all (two or more) players, pass the turn to the next.
   *  This is done by setting the myTurn property of the current turn-taker
   *  to false and that of the next player to true. Nothing is returned.
   */
  alternateTurn(allPlayers) {
    for (let i = 0; i < allPlayers.length; i++) {
      if (allPlayers[i].myTurn) {
        allPlayers[i].myTurn = false;
        if (i === allPlayers.length - 1) {
          allPlayers[0].myTurn = true;
        } else {
          allPlayers[i+1].myTurn = true;
        }
      }

    }
  }


  // TODO: Ideal, not yet implemented:
  /** Check for a win diagonally down and right. Takes no arguments, and
   *  returns the winning color as a string or false if no winner.
   */

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
          console.log(posX, posY);
          if (this.spots[posY][posX] === null
              || this.spots[posY][posX].color !== color) {
            console.log(`Breaking out of checks at postion ${posX}, ${posY}.`);
            break;
          }
          checkCount++;
          if (checkCount === checks.length) return true;
        }
      }
    }
    return false;

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
  - (There seems to be little to do in this class)
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