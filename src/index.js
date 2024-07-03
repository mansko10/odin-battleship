import playAgainstComputer from "./dom/playAgainstComputer.js";
import playerAgainstFriend from "./dom/playAgainstFriend.js";
import chooseGameType from "./dom/chooseGameType.js";
import getPlayerName from "./dom/getPlayerName.js";
import getPlayerNames from "./dom/getPlayerNames.js";

async function startGame() {
  const gameType = await chooseGameType();

  if (gameType === "computer") {
    const playerName = await getPlayerName();
    playAgainstComputer(playerName);
  } else if (gameType === "friend") {
    const playerNames = await getPlayerNames();
    playerAgainstFriend(playerNames.player1, playerNames.player2);
  }
}

startGame();
