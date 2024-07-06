import victory from "../sounds/victory.mp3";
import defeat from "../sounds/defeat.mp3";

export default function endGame(player, soundStatus) {
  const body = document.querySelector("body");

  const victorySound = new Audio(victory);
  const defeatSound = new Audio(defeat);

  if (soundStatus === "Unmute") {
    victorySound.muted = true;
    defeatSound.muted = true;
  }

  if (player.name !== "computer") {
    victorySound.play();
  } else {
    defeatSound.play();
  }

  body.innerHTML = `<h1>${player.name[0].toUpperCase() + player.name.slice(1)} won!</h1>`;
}
