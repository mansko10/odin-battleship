import "../styles/doublePlayerNames.css";

export default function getPlayerName() {
  const promise = new Promise((resolve) => {
    const body = document.querySelector("body");

    const dialog = document.createElement("dialog");
    dialog.classList.add("doublePlayerName");
    dialog.innerHTML = `<form>
        <div class="input-container">
          <label for="name1">Player 1 Name: </label>
          <input type="text" id="name1" name="name1" required />
        </div>
        <div class="input-container">
          <label for="name2">Player 2 Name: </label>
          <input type="text" id="name2" name="name2" required />
        </div>
        <button>Submit</button>
      </form>`;

    const form = dialog.querySelector("form");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nameObj = {
        player1: e.target.name1.value,
        player2: e.target.name2.value,
      };
      resolve(nameObj);
      dialog.close();
      dialog.remove();
    });

    body.prepend(dialog);
    dialog.showModal();
  });

  return promise;
}
