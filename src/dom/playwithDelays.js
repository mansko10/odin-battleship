import displayComputerBoard from "./displayComputerBoard";
import displayPlayerBoard from "./displayPlayerBoard";
import generateCoordinate from "../util/generateCoordinate";
import endGame from "./endGame";
import cannonFire from "../sounds/cannonFire.mp3";
import waterSplash from "../sounds/waterSplash.mp3";
import explosion from "../sounds/explosion.mp3";

const cannonFireSound = new Audio(cannonFire);
const explosionSound = new Audio(explosion);
const waterSplashSound = new Audio(waterSplash);

export default function play(player, computer) {
  const soundButton = document.querySelector(".sound-button");

  let turn = "player";

  const computerBoard = document.querySelector(".board.computer");

  function attackPlayer() {
    setTimeout(() => {
      if (turn === "computer") {
        cannonFireSound.play();
        const coordinates = generateCoordinate(player);

        setTimeout(() => {
          const splitCoordinates = coordinates.split(",");
          player.gameboard.receiveAttack(coordinates);

          if (
            player.gameboard.board[splitCoordinates[0]][splitCoordinates[1]]
              .isOccupied
          ) {
            explosionSound.play();
          } else {
            waterSplashSound.play();
          }
          displayPlayerBoard(player);

          if (player.gameboard.checkAllSunk()) {
            endGame(computer, soundButton.textContent);
            return;
          }

          turn = "player";
          computerBoard.addEventListener("click", attackComputerEvent);
        }, 2000);
      }
    }, 2400);
  }

  function attackComputerEvent(e) {
    if (turn === "player") {
      const { coordinates } = e.target.dataset;
      const splitCoordinates = coordinates.split(",");
      if (computer.gameboard.cellsHit.includes(coordinates)) return;

      computerBoard.removeEventListener("click", attackComputerEvent);
      cannonFireSound.play();
      setTimeout(() => {
        computer.gameboard.receiveAttack(coordinates);

        if (
          computer.gameboard.board[splitCoordinates[0]][splitCoordinates[1]]
            .isOccupied
        ) {
          explosionSound.play();
        } else {
          waterSplashSound.play();
        }

        displayComputerBoard(computer);

        if (computer.gameboard.checkAllSunk()) {
          endGame(player, soundButton.textContent);
          return;
        }

        turn = "computer";
        // computerBoard.addEventListener("click", attackComputerEvent);
        attackPlayer();
      }, 2000);
    }
  }

  function toggleSound() {
    soundButton.addEventListener("click", () => {
      if (soundButton.textContent === "Mute") {
        soundButton.textContent = "Unmute";

        cannonFireSound.muted = true;
        explosionSound.muted = true;
        waterSplashSound.muted = true;
      } else {
        soundButton.textContent = "Mute";

        cannonFireSound.muted = false;
        explosionSound.muted = false;
        waterSplashSound.muted = false;
      }
    });
  }

  computerBoard.addEventListener("click", attackComputerEvent);

  toggleSound();
}
