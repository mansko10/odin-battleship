import Ship from "./Ship.js";

function createBoard() {
  const rows = 10;
  const columns = 10;
  const board = [];
  for (let i = 0; i < rows; i++) {
    board[i] = [];

    for (let j = 0; j < columns; j++) {
      board[i][j] = {
        coordinates: `${i},${j}`,
        isOccupied: false,
        isHit: false,
        occupier: null,
      };
    }
  }

  return board;
}

export default class Gameboard {
  constructor() {
    this.board = createBoard();
    this.ships = [];
  }

  placeShipHorizontally(
    length,
    startingCoordinate,
    identifier = this.ships.length,
  ) {
    const ship = new Ship(length, startingCoordinate, identifier);

    startingCoordinate = startingCoordinate.split(",");

    const row = startingCoordinate[0];
    const startingColumn = startingCoordinate[1];

    for (let i = startingColumn; i < length; i++) {
      this.board[row][i].isOccupied = true;
      this.board[row][i].occupier = ship.identifier;
    }

    this.ships.push(ship);
  }
}
