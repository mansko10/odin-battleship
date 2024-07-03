import "../styles/game.css";
import Player from "../classes/Player";
import placePlayerShips from "./placePlayerShips";
import placeComputerShips from "../util/placeComputerShips";
import displayComputerBoard from "./displayComputerBoard";
import displayPlayerBoard from "./displayPlayerBoard";
import playWithoutDelay from "./playWithoutDelays";
import playWithDelay from "./playwithDelays";
import generateSinglePlayerTemplate from "../templates/singlePlayerTemplate";

export default async function playAgainstComputer(name) {
  generateSinglePlayerTemplate(name);
  const player = new Player(name);
  const computer = new Player();

  const playerShipPlacements = await placePlayerShips(name);

  player.placeAllShips(playerShipPlacements);
  placeComputerShips(computer);

  displayPlayerBoard(player);
  displayComputerBoard(computer);

  playWithoutDelay(player, computer);
  // playWithDelay(player, computer);
}
