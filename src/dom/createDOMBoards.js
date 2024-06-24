export default function createDOMBoards(player, computer) {
  const playerBoard = document.querySelector(".player.board");
  const computerBoard = document.querySelector(".computer.board");

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

  computer.gameboard.board.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.style.height = "40px";
      cell.dataset.coordinates = `${rowIndex},${columnIndex}`;

      if (column.isOccupied && column.isHit) {
        cell.style.backgroundColor = "midnightBlue";
      }

      computerBoard.appendChild(cell);
    });
  });
}
