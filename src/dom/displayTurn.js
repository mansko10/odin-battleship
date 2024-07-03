export default function displayTurn(name) {
  const turnsDiv = document.querySelector(".turns");

  turnsDiv.textContent = `${name}'s turn`;
}
