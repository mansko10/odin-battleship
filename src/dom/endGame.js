export default function endGame(player) {
  const body = document.querySelector("body");

  body.innerHTML = `<h1>${player.name[0].toUpperCase() + player.name.slice(1)} won!</h1>`;
}
