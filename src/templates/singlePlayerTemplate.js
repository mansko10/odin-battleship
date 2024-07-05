export default function generateSinglePlayerTemplate(name) {
  const turnsDiv = document.querySelector(".turns");
  const boardsDiv = document.createElement("div");

  const template = `<div class="playerDisplay">
            <h3>${name}</h3>
            <div class="player board"></div>
          </div>
          <div class="computer">
            <h3>Computer</h3>
            <div class="computer board"></div>
          </div>`;

  boardsDiv.classList.add("boards");
  boardsDiv.innerHTML = template;

  turnsDiv.insertAdjacentElement("afterend", boardsDiv);
}
