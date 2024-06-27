export default function displayPlayerBoard(player) {
  const playerBoard = document.querySelector(".player.board");

  playerBoard.innerHTML = "";

  player.gameboard.board.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.style.height = "40px";
      cell.dataset.coordinates = `${rowIndex},${columnIndex}`;

      if (
        column.isOccupied &&
        player.gameboard.ships[column.occupier].isSunk()
      ) {
        cell.style.backgroundColor = "yellow";
      } else if (column.isOccupied && column.isHit) {
        cell.style.backgroundColor = "midnightBlue";
        cell.style.color = "yellow";
        cell.textContent = "HIT";
      } else if (!column.isOccupied && column.isHit) {
        cell.style.backgroundColor = "gray";
      } else if (column.isOccupied) {
        cell.style.backgroundColor = "midnightBlue";
      }

      playerBoard.appendChild(cell);
    });
  });
}
