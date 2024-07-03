import playAgainstComputer from "./dom/playAgainstComputer";
import playerAgainstFriend from "./dom/playAgainstFriend";
import chooseGameType from "./dom/chooseGameType";
import getPlayerName from "./dom/getPlayerName";
import getPlayerNames from "./dom/getPlayerNames";

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
