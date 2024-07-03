import displayComputerBoard from "./displayComputerBoard";
import displayPlayerBoard from "./displayPlayerBoard";
import generateCoordinate from "../util/generateCoordinate";
import endGame from "./endGame";

export default function playWithoutDelay(player, computer) {
  let turn = "player";

  const computerBoard = document.querySelector(".board.computer");

  function attackPlayer() {
    if (turn === "computer") {
      const coordinates = generateCoordinate(player);
      player.gameboard.receiveAttack(coordinates);
      displayPlayerBoard(player);

      if (player.gameboard.checkAllSunk()) {
        endGame(computer);
        return;
      }

      turn = "player";
      computerBoard.addEventListener("click", attackComputerEvent);
    }
  }

  function attackComputerEvent(e) {
    if (turn === "player") {
      const { coordinates } = e.target.dataset;
      if (computer.gameboard.cellsHit.includes(coordinates)) return;
      computer.gameboard.receiveAttack(coordinates);
      displayComputerBoard(computer);

      if (computer.gameboard.checkAllSunk()) {
        endGame(player);
        return;
      }

      turn = "computer";
      computerBoard.removeEventListener("click", attackComputerEvent);
      attackPlayer();
    }
  }

  computerBoard.addEventListener("click", attackComputerEvent);
}
