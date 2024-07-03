import "../styles/game.css";
import Player from "../classes/Player.js";
import placePlayerShips from "./placePlayerShips.js";
import displayBoard from "./displayBoard.js";
import generateDoublePlayerTemplate from "../templates/doublePlayerTemplate.js";
import playFriend from "./playFriend.js";

export default async function playerAgainstFriend(name1, name2) {
  generateDoublePlayerTemplate(name1, name2);
  const player1 = new Player(name1);
  const player2 = new Player(name2);
  console.log(player1);
  console.log(player2);

  const player1ShipPlacements = await placePlayerShips(name1);
  const player2ShipPlacements = await placePlayerShips(name2);

  player1.placeAllShips(player1ShipPlacements);
  player2.placeAllShips(player2ShipPlacements);

  console.log(player1.gameboard.ships);
  console.log(player2.gameboard.ships);

  displayBoard(player1, player2);

  playFriend(player1, player2);
}
