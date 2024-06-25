import displayComputerBoard from "./displayComputerBoard.js";
import displayPlayerBoard from "./displayPlayerBoard.js";
import generateCoordinate from "./generateCoordinate.js";

export default function play(player, computer) {
  let turn = "player";

  const computerBoard = document.querySelector(".board.computer");

  function attackPlayer() {
    if (turn === "computer") {
      const coordinates = generateCoordinate(player);
      player.gameboard.receiveAttack(coordinates);
      displayPlayerBoard(player);

      turn = "player";
      computerBoard.addEventListener("click", attackComputerEvent);
    }
  }

  function attackComputerEvent(e) {
    if (turn === "player") {
      const coordinates = e.target.dataset.coordinates;
      if (computer.gameboard.cellsHit.includes(coordinates)) return;
      computer.gameboard.receiveAttack(coordinates);
      displayComputerBoard(computer);

      turn = "computer";
      computerBoard.removeEventListener("click", attackComputerEvent);
      attackPlayer();
    }
  }

  computerBoard.addEventListener("click", attackComputerEvent);
}
