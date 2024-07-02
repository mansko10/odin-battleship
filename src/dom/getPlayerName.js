export default function getPlayerName() {
  const promise = new Promise((resolve, reject) => {
    const body = document.querySelector("body");

    const dialog = document.createElement("dialog");
    dialog.innerHTML = `<form>
      <label for="name">Name: </label>
      <input type="text" id="name" required />
      <button>Submit</button>
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
