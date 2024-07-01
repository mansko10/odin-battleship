export default function placeComputerShips(computer) {
  const shipsToBePlaced = [
    {
      type: "Carrier",
      length: 5,
    },
    {
      type: "Battleship",
      length: 4,
    },
    {
      type: "Cruiser",
      length: 3,
    },
    {
      type: "Submarine",
      length: 3,
    },
    {
      type: "Destroyer",
      length: 2,
    },
  ];

  for (let i = 0; i < shipsToBePlaced.length; i++) {
    const trueFalse = Math.round(Math.random()) ? "vertical" : "horizontal";

    const row = Math.round(Math.random() * 9);
    const column = Math.round(Math.random() * 9);
    const coordinates = `${row},${column}`;

    computer.gameboard.placeShip(
      shipsToBePlaced[i].length,
      coordinates,
      trueFalse,
      shipsToBePlaced[i].type,
    );

    if (computer.gameboard.ships.length !== i + 1) {
      i--; //If ship was NOT placed then the current instance of loop will keep re-running until ship is placed
    }
  }

  console.log(computer.gameboard.ships);
}
