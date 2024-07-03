import Ship from "./Ship";

function createBoard() {
  const rows = 10;
  const columns = 10;
  const board = [];
  for (let i = 0; i < rows; i += 1) {
    board[i] = [];

    for (let j = 0; j < columns; j += 1) {
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
    this.cellsHit = [];
  }

  canBePlacedHorizontally(row, startingColumn, length) {
    let result = true;

    for (let i = startingColumn; i < startingColumn + length; i += 1) {
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
    type,
    identifier = this.ships.length,
  ) {
    const ship = new Ship(length, startingCoordinate, identifier, type);

    const splitStartingCoordinate = startingCoordinate.split(",");

    const row = +splitStartingCoordinate[0];
    const startingColumn = +splitStartingCoordinate[1];

    const canBePlaced = this.canBePlacedHorizontally(
      row,
      startingColumn,
      length,
    );

    if (!canBePlaced) return;

    for (let i = startingColumn; i < startingColumn + length; i += 1) {
      /* ^^^^^^^^^^^^^^ LENGTH */
      this.board[row][i].isOccupied = true;
      this.board[row][i].occupier = ship.identifier;
    }

    this.ships.push(ship);
  }

  canBePlacedVertically(startingRow, column, length) {
    let result = true;

    for (let i = startingRow; i < startingRow + length; i += 1) {
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
    type,
    identifier = this.ships.length,
  ) {
    const ship = new Ship(length, startingCoordinate, identifier, type);

    const splitStartingCoordinate = startingCoordinate.split(",");

    const startingRow = +splitStartingCoordinate[0];
    const column = +splitStartingCoordinate[1];

    const canBePlaced = this.canBePlacedVertically(startingRow, column, length);

    if (!canBePlaced) return;

    for (let i = startingRow; i < startingRow + length; i += 1) {
      /* ^^^^^^^^^^^^^^ LENGTH */
      this.board[i][column].isOccupied = true;
      this.board[i][column].occupier = ship.identifier;
    }

    this.ships.push(ship);
  }

  placeShip(length, startingCoordinate, axis, type) {
    if (axis === "horizontal") {
      this.placeShipHorizontally(length, startingCoordinate, type);
    } else if (axis === "vertical") {
      this.placeShipVertically(length, startingCoordinate, type);
    }
  }

  updateCellsHit() {
    const rows = 10;
    const columns = 10;

    this.cellsHit = [];

    for (let i = 0; i < rows; i += 1) {
      for (let j = 0; j < columns; j += 1) {
        if (this.board[i][j].isHit === true) {
          this.cellsHit.push(this.board[i][j].coordinates);
        }
      }
    }
  }

  receiveAttack(coordinates) {
    const splitCoordinates = coordinates.split(",");
    const row = splitCoordinates[0];
    const column = splitCoordinates[1];

    if (this.board[row][column].isHit === true) return;

    this.board[row][column].isHit = true;
    // this.updateCellsHit();
    this.cellsHit.push(splitCoordinates.join(","));

    if (this.board[row][column].isOccupied === true) {
      const { occupier } = this.board[row][column];

      const indexOfOccupier = this.ships.findIndex(
        (ship) => ship.identifier === occupier,
      );

      this.ships[indexOfOccupier].hit();
    }
  }

  checkAllSunk() {
    let shipsSunk = 0;
    const totalShips = this.ships.length;

    this.ships.forEach((ship) => {
      if (ship.hasBeenSunk === true) {
        shipsSunk += 1;
      }
    });

    if (shipsSunk === totalShips) {
      return true;
    }

    return false;
  }
}
