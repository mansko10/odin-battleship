import playAgainstComputer from "./dom/playAgainstComputer.js";
import chooseGameType from "./dom/chooseGameType.js";
import getPlayerName from "./dom/getPlayerName.js";

async function startGame() {
  const gameType = await chooseGameType();

  if (gameType === "computer") {
    const playerName = await getPlayerName();

    playAgainstComputer(playerName);
  }
}

startGame();
