import "../styles/game.css";

export default function generateDoublePlayerTemplate(name1, name2) {
  const body = document.querySelector("body");
  const h1 = body.querySelector("h1");
  const turnsDiv = document.querySelector(".turns");
  const boardsDiv = document.createElement("div");

  const template = `<div class="player1Display">
            <h3>${name1}</h3>
            <div class="player1 board"></div>
          </div>
          <div class="player2Display">
            <h3>${name2}</h3>
            <div class="player2 board"></div>
          </div>`;

  boardsDiv.classList.add("boards");
  boardsDiv.innerHTML = template;

  turnsDiv.insertAdjacentElement("afterend", boardsDiv);
}
