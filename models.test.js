'use strict';

const gbVertWinState = new Gameboard();
gbVertWinState.spots = [
  [null,null,null,null,null,null,null],
  [null,null,null,null,null,null,new Piece('green')],
  [null,null,null,null,null,null,new Piece('green')],
  [null,null,null,null,null,null,new Piece('green')],
  [null,null,null,null,null,null,new Piece('green')],
  [null,null,null,null,null,null,new Piece('green')]
]

it('should identify this vertical win postion', function() {
  expect(gbVertWinState.checkWinVert('green')).toBe(true);
});

const gbHorizWinState = new Gameboard();
gbHorizWinState.spots = [
  [null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null],
  [null, new Piece('green'),
          new Piece('green'),
           new Piece('green'),
            new Piece('green'),
             new Piece('green'), null],
  [null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null],
  [null,null,null,null,null,null,null]
]

it('should identify this horizontal win postion', function() {
  expect(gbHorizWinState.checkWinHoriz('green')).toBe(true);
});

const gbDRWinState = new Gameboard();
gbDRWinState.spots = [
  [new Piece('green'),null,null,null,null,null,null],
  [null,new Piece('green'),null,null,null,null,null],
  [null,null,new Piece('green'),null,null,null,null],
  [null,null,null,new Piece('green'),null,null,null],
  [null,null,null,null,new Piece('green'),null,null],
  [null,null,null,null,null,null,null]
]

it('should identify this DR win postion', function() {
  expect(gbDRWinState.checkWinDR('green')).toBe(true);
});

const gbURWinState = new Gameboard();
gbURWinState.spots = [
  [null,null,null,null,null,null,null],
  [null,null,null,null,null,null,new Piece('green')],
  [null,null,null,null,null,new Piece('green'),null],
  [null,null,null,null,new Piece('green'),null,null],
  [null,null,null,new Piece('green'),null,null,null],
  [null,null,new Piece('green'),null,null,null,null]
]

it('should identify this UR win postion', function() {
  expect(gbURWinState.checkWinUR('green')).toBe(true);
});

const gbURNearWinState = new Gameboard();
gbURNearWinState.spots = [
  [null,null,null,null,null,null,null],
  [null,null,null,null,null,null,new Piece('green')],
  [null,null,null,null,null,new Piece('green'),null],
  [null,null,null,null,new Piece('NOT GREEN'),null,null],
  [null,null,null,new Piece('green'),null,null,null],
  [null,null,new Piece('green'),null,null,null,null]
]

it('should identify winning and not winning positions', function() {
  expect(gbHorizWinState.checkWin('green')).toBe(true);
  expect(gbVertWinState.checkWin('green')).toBe(true);
  expect(gbDRWinState.checkWin('green')).toBe(true);
  expect(gbURWinState.checkWin('green')).toBe(true);
  expect(gbURNearWinState.checkWin('green')).toBe(false);
});



