export default function generateSinglePlayerTemplate(name) {
  const body = document.querySelector("body");
  body.innerHTML += `<div class="boards">
        <div class="player">
          <h3>${name}</h3>
          <div class="player board"></div>
        </div>
        <div class="computer">
          <h3>Computer</h3>
          <div class="computer board"></div>
        </div>
      </div>`;
}
