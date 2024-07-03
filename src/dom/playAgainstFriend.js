import "../styles/game.css";
import Player from "../classes/Player";
import placePlayerShips from "./placePlayerShips";
import displayBoard from "./displayBoard";
import generateDoublePlayerTemplate from "../templates/doublePlayerTemplate";
import playFriend from "./playFriend";

export default async function playerAgainstFriend(name1, name2) {
  generateDoublePlayerTemplate(name1, name2);
  const player1 = new Player(name1);
  const player2 = new Player(name2);

  const player1ShipPlacements = await placePlayerShips(name1);
  const player2ShipPlacements = await placePlayerShips(name2);

  player1.placeAllShips(player1ShipPlacements);
  player2.placeAllShips(player2ShipPlacements);

  displayBoard(player1, player2);

  playFriend(player1, player2);
}
