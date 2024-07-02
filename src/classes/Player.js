import Gameboard from "./Gameboard.js";

export default class Player {
  constructor(name = "computer") {
    this.name = name;
    this.gameboard = new Gameboard();
  }

  placeAllShips(shipPlacements) {
    shipPlacements.forEach((shipPlacement) => {
      this.gameboard.placeShip(
        shipPlacement.length,
        shipPlacement.startingCoordinate,
        shipPlacement.axis,
        shipPlacement.type,
      );
    });
  }
}
