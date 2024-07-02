import "../styles/game.css";
import Player from "../classes/Player.js";
import placePlayerShips from "./placePlayerShips.js";
import placeComputerShips from "../util/placeComputerShips.js";
import displayComputerBoard from "./displayComputerBoard.js";
import displayPlayerBoard from "./displayPlayerBoard.js";
import playWithoutDelay from "./playWithoutDelays.js";
import playWithDelay from "./playwithDelays.js";
import generateSinglePlayerTemplate from "../templates/singlePlayerTemplate.js";

export default async function playAgainstComputer(name) {
  generateSinglePlayerTemplate(name);
  const player = new Player(name);
  const computer = new Player();

  const playerShipPlacements = await placePlayerShips(name);

  player.placeAllShips(playerShipPlacements);
  placeComputerShips(computer);

  displayPlayerBoard(player);
  displayComputerBoard(computer);

  console.log(player);
  console.log(computer);

  playWithoutDelay(player, computer);
  // playWithDelay(player, computer);
}
