export default function updateShipPlaceName(obj) {
  if (!obj.length) return;
  const dialog = document.querySelector("dialog");
  const span = dialog.querySelector("#shipName");

  span.style.textDecoration = "underline";
  span.textContent = obj[0].type;
}
