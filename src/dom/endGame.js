export default function endGame(player) {
  const body = document.querySelector("body");

  body.innerHTML = `<h1>${player.name} won!</h1>`;
}
