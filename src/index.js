import createGame from "./createGame.js";
import Player from "./classes/Player.js";

const player = new Player("mannan");
const computer = new Player();

createGame(document, player, computer);

console.log(player);
