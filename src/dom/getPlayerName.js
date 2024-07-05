import "../styles/singlePlayerName.css";

export default function getPlayerName() {
  const promise = new Promise((resolve) => {
    const body = document.querySelector("body");

    const dialog = document.createElement("dialog");
    dialog.classList.add("singlePlayerName");
    dialog.innerHTML = `<form>
      <div class="input-container">
        <label for="name">Enter your name</label>
        <input type="text" id="name" required />
      </div>
      <button>SUBMIT</button>
    </form>`;

    const form = dialog.querySelector("form");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      resolve(e.target.name.value);
      dialog.close();
      dialog.remove();
    });

    body.prepend(dialog);
    dialog.showModal();
  });

  return promise;
}
