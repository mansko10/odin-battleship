import htmlTemplate from "../htmlTemplate.js";
import "../style.css";

export default function createGame(document, player, computer) {
  player.gameboard.placeShip(5, "0,0", "horizontal");
  player.gameboard.placeShip(4, "3,2", "vertical");
  player.gameboard.placeShip(3, "7,6", "horizontal");
  player.gameboard.placeShip(3, "1,8", "vertical");
  player.gameboard.placeShip(2, "9,2", "horizontal");

  computer.gameboard.placeShip(5, "0,0", "horizontal");
  computer.gameboard.placeShip(4, "3,2", "vertical");
  computer.gameboard.placeShip(3, "7,6", "horizontal");
  computer.gameboard.placeShip(3, "1,8", "vertical");
  computer.gameboard.placeShip(2, "9,2", "horizontal");

  const body = document.querySelector("body");
  body.innerHTML = htmlTemplate;

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
