export default function placeComputerShips(computer) {
  const shipLengths = [5, 4, 3, 3, 2];

  for (let i = 0; i < shipLengths.length; i++) {
    const trueFalse = Math.round(Math.random()) ? "vertical" : "horizontal";

    const row = Math.round(Math.random() * 9);
    const column = Math.round(Math.random() * 9);
    const coordinates = `${row},${column}`;

    computer.gameboard.placeShip(shipLengths[i], coordinates, trueFalse);

    if (computer.gameboard.ships.length !== i + 1) {
      i--; //If ship was NOT placed then the current instance of loop will keep re-running until ship is placed
    }
  }

  console.log(computer.gameboard.ships.length);
}
