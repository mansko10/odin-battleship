//For double player only

export default function displayBoard(player1, player2) {
  const player1Board = document.querySelector(".player1.board");
  const player2Board = document.querySelector(".player2.board");

  player1Board.innerHTML = "";
  player2Board.innerHTML = "";

  player1.gameboard.board.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.style.height = "40px";
      cell.dataset.coordinates = `${rowIndex},${columnIndex}`;

      if (
        column.isOccupied &&
        player1.gameboard.ships[column.occupier].isSunk()
      ) {
        cell.style.backgroundColor = "yellow";
      } else if (column.isOccupied && column.isHit) {
        cell.style.backgroundColor = "midnightBlue";
        cell.style.color = "yellow";
        cell.textContent = "HIT";
      } else if (!column.isOccupied && column.isHit) {
        cell.style.backgroundColor = "gray";
      }

      player1Board.appendChild(cell);
    });
  });

  player2.gameboard.board.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.style.height = "40px";
      cell.dataset.coordinates = `${rowIndex},${columnIndex}`;

      if (
        column.isOccupied &&
        player2.gameboard.ships[column.occupier].isSunk()
      ) {
        cell.style.backgroundColor = "yellow";
      } else if (column.isOccupied && column.isHit) {
        cell.style.backgroundColor = "midnightBlue";
        cell.style.color = "yellow";
        cell.textContent = "HIT";
      } else if (!column.isOccupied && column.isHit) {
        cell.style.backgroundColor = "gray";
      }

      player2Board.appendChild(cell);
    });
  });
}
