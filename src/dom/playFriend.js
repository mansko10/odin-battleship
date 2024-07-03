import displayBoard from "./displayBoard.js";
import endGame from "./endGame.js";
import displayTurn from "./displayTurn.js";

export default function playFriend(player1, player2) {
  let turn = player1.name;
  displayTurn(player1.name);
  const player1Board = document.querySelector(".board.player1");
  const player2Board = document.querySelector(".board.player2");

  function attackPlayer1(e) {
    if (turn === player2.name) {
      const coordinates = e.target.dataset.coordinates;

      if (player1.gameboard.cellsHit.includes(coordinates)) return;

      player1.gameboard.receiveAttack(coordinates);

      if (player1.gameboard.checkAllSunk()) {
        endGame(player2);
        return;
      }

      turn = player1.name;
      displayTurn(player1.name);
      player1Board.removeEventListener("click", attackPlayer1);
      player2Board.addEventListener("click", attackPlayer2);
      displayBoard(player1, player2);
    }
  }

  function attackPlayer2(e) {
    if (turn === player1.name) {
      const coordinates = e.target.dataset.coordinates;

      if (player2.gameboard.cellsHit.includes(coordinates)) return;

      player2.gameboard.receiveAttack(coordinates);

      if (player2.gameboard.checkAllSunk()) {
        endGame(player1);
        return;
      }

      turn = player2.name;
      displayTurn(player2.name);
      player2Board.removeEventListener("click", attackPlayer2);
      player1Board.addEventListener("click", attackPlayer1);
      displayBoard(player1, player2);
    }
  }

  player2Board.addEventListener("click", attackPlayer2);
}
