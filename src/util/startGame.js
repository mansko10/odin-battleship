import Player from "../classes/Player";
import placeComputerShips from "./placeComputerShips";
import displayPlayerBoard from "../dom/displayPlayerBoard";
import displayComputerBoard from "../dom/displayComputerBoard";
import playwithDelays from "../dom/playwithDelays";
import playWithoutDelay from "../dom/playWithoutDelays";
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
