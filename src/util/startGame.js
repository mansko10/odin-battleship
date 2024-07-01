import Player from "../classes/Player.js";
import placeComputerShips from "./placeComputerShips.js";
import displayPlayerBoard from "../dom/displayPlayerBoard.js";
import displayComputerBoard from "../dom/displayComputerBoard.js";
import playwithDelays from "../dom/playwithDelays.js";
import playWithoutDelay from "../dom/playWithoutDelays.js";
import "../styles/game.css";

const player = new Player("player");
const computer = new Player();

export default function startGame(obj) {
  obj.forEach((o) => {
    player.gameboard.placeShip(o.length, o.startingCoordinate, o.axis, o.type);
  });

  placeComputerShips(computer);
  displayPlayerBoard(player);
  displayComputerBoard(computer);
  playwithDelays(player, computer);
  // playWithoutDelay(player, computer);
}
