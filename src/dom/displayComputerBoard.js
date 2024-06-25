export default function displayComputerBoard(computer) {
  const computerBoard = document.querySelector(".computer.board");

  computerBoard.innerHTML = "";

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
