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

  canBePlacedHorizontally(row, startingColumn, length) {
    let result = true;

    for (let i = startingColumn; i < startingColumn + length; i++) {
      if (this.board[row][i] === undefined || this.board[row][i].isOccupied) {
        result = false;
        break;
      }
    }

    return result;
  }

  placeShipHorizontally(
    length,
    startingCoordinate,
    identifier = this.ships.length,
  ) {
    const ship = new Ship(length, startingCoordinate, identifier);

    startingCoordinate = startingCoordinate.split(",");

    const row = +startingCoordinate[0];
    const startingColumn = +startingCoordinate[1];

    const canBePlaced = this.canBePlacedHorizontally(
      row,
      startingColumn,
      length,
    );

    if (!canBePlaced) return;

    for (let i = startingColumn; i < startingColumn + length; i++) {
      /*^^^^^^^^^^^^^^ LENGTH*/
      this.board[row][i].isOccupied = true;
      this.board[row][i].occupier = ship.identifier;
    }

    this.ships.push(ship);
  }

  canBePlacedVertically(startingRow, column, length) {
    let result = true;

    for (let i = startingRow; i < startingRow + length; i++) {
      if (this.board[i] === undefined || this.board[i][column].isOccupied) {
        result = false;
        break;
      }
    }

    return result;
  }

  placeShipVertically(
    length,
    startingCoordinate,
    identifier = this.ships.length,
  ) {
    const ship = new Ship(length, startingCoordinate, identifier);

    startingCoordinate = startingCoordinate.split(",");

    const startingRow = +startingCoordinate[0];
    const column = +startingCoordinate[1];

    const canBePlaced = this.canBePlacedVertically(startingRow, column, length);

    if (!canBePlaced) return;

    for (let i = startingRow; i < startingRow + length; i++) {
      /*^^^^^^^^^^^^^^ LENGTH*/
      this.board[i][column].isOccupied = true;
      this.board[i][column].occupier = ship.identifier;
    }

    this.ships.push(ship);
  }

  placeShip(length, startingCoordinate, axis) {
    if (axis === "horizontal") {
      this.placeShipHorizontally(length, startingCoordinate);
    } else if (axis === "vertical") {
      this.placeShipVertically(length, startingCoordinate);
    }
  }
}
