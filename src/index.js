import createDOMBoards from "./dom/createDOMBoards.js";
import Player from "./classes/Player.js";
import "./style.css";

const player = new Player("mannan");
const computer = new Player();

player.gameboard.placeShip(5, "0,0", "horizontal");
player.gameboard.placeShip(4, "3,2", "vertical");
player.gameboard.placeShip(3, "7,6", "horizontal");
player.gameboard.placeShip(3, "1,8", "vertical");
player.gameboard.placeShip(2, "9,2", "horizontal");

computer.gameboard.placeShip(5, "0,0", "horizontal");
computer.gameboard.placeShip(4, "3,2", "vertical");
computer.gameboard.placeShip(3, "7,6", "horizontal");
computer.gameboard.placeShip(3, "1,8", "vertical");
computer.gameboard.placeShip(2, "9,2", "horizontal");

createDOMBoards(player, computer);
