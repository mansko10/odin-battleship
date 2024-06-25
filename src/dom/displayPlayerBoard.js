export default function displayPlayerBoard(player) {
  const playerBoard = document.querySelector(".player.board");

  playerBoard.innerHTML = "";

  player.gameboard.board.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.style.height = "40px";
      cell.dataset.coordinates = `${rowIndex},${columnIndex}`;

      if (column.isOccupied) {
        cell.style.backgroundColor = "midnightBlue";
      }

      playerBoard.appendChild(cell);
    });
  });
}
