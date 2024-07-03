import "../styles/gameTypeModal.css";

export default function chooseGameType() {
  const promise = new Promise((resolve) => {
    const body = document.querySelector("body");

    const dialog = document.createElement("dialog");
    dialog.innerHTML = `
    <div class="choices">
      <div class="choice friend">Play with friend</div>
      <div class="choice computer">Play with computer</div>
    </div>
  `;

    body.prepend(dialog);

    const choices = document.querySelector(".choices");

    choices.addEventListener("click", (e) => {
      if (e.target.classList.contains("computer")) {
        dialog.close();
        dialog.remove();
        resolve("computer");
      } else if (e.target.classList.contains("friend")) {
        dialog.close();
        dialog.remove();
        resolve("friend");
      }
    });

    dialog.showModal();
  });

  return promise;
}
