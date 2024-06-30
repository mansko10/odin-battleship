import displayComputerBoard from "./displayComputerBoard.js";
import displayPlayerBoard from "./displayPlayerBoard.js";
import generateCoordinate from "./generateCoordinate.js";
import endGame from "./endGame.js";
import cannonFire from "../sounds/cannonFire.mp3";
import waterSplash from "../sounds/waterSplash.mp3";
import explosion from "../sounds/explosion.mp3";

export default function play(player, computer) {
  let turn = "player";

  const computerBoard = document.querySelector(".board.computer");

  function attackPlayer() {
    setTimeout(() => {
      if (turn === "computer") {
        const cannonFireSound = new Audio(cannonFire);
        cannonFireSound.play();
        const coordinates = generateCoordinate(player);

        setTimeout(() => {
          const splitCoordinates = coordinates.split(",");
          player.gameboard.receiveAttack(coordinates);

          if (
            player.gameboard.board[splitCoordinates[0]][splitCoordinates[1]]
              .isOccupied
          ) {
            const explosionSound = new Audio(explosion);
            explosionSound.play();
          } else {
            const waterSplashSound = new Audio(waterSplash);
            waterSplashSound.play();
          }
          displayPlayerBoard(player);

          if (player.gameboard.checkAllSunk()) {
            endGame(computer);
            return;
          }

          turn = "player";
          computerBoard.addEventListener("click", attackComputerEvent);
        }, 3000);
      }
    }, 3000);
  }

  function attackComputerEvent(e) {
    if (turn === "player") {
      const cannonFireSound = new Audio(cannonFire);
      computerBoard.removeEventListener("click", attackComputerEvent);
      cannonFireSound.play();
      setTimeout(() => {
        const coordinates = e.target.dataset.coordinates;
        const splitCoordinates = coordinates.split(",");
        if (computer.gameboard.cellsHit.includes(coordinates)) return;
        computer.gameboard.receiveAttack(coordinates);

        if (
          computer.gameboard.board[splitCoordinates[0]][splitCoordinates[1]]
            .isOccupied
        ) {
          const explosionSound = new Audio(explosion);
          explosionSound.play();
        } else {
          const waterSplashSound = new Audio(waterSplash);
          waterSplashSound.play();
        }

        displayComputerBoard(computer);

        if (computer.gameboard.checkAllSunk()) {
          endGame(player);
          return;
        }

        turn = "computer";
        // computerBoard.addEventListener("click", attackComputerEvent);
        attackPlayer();
      }, 2000);
    }
  }

  computerBoard.addEventListener("click", attackComputerEvent);
}
