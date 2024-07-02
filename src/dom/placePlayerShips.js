import "../styles/placeShipModal.css";
import updateShipPlaceName from "../util/updateShipName.js";

export default async function placePlayerShips(name = "Player") {
  const promise = new Promise((resolve, reject) => {
    const body = document.querySelector("body");

    const dialog = document.createElement("dialog");

    dialog.innerHTML = `<button>Change to vertical</button><div>
        <h3>${name}</h3>
        <h3>Please place your <span id="shipName"></span></h3>
        <div class="placeShip board"></div>
      </div>`;

    body.prepend(dialog);

    let axis = "horizontal";

    console.log(axis);

    const button = document.querySelector("dialog button");
    button.addEventListener("click", (e) => {
      if (axis === "horizontal") {
        button.textContent = "Change to horizontal";
        axis = "vertical";
      } else if (axis === "vertical") {
        button.textContent = "Change to vertical";
        axis = "horizontal";
      }
    });

    const placeShipBoard = document.querySelector(".placeShip.board");

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.coordinates = `${i},${j}`;

        placeShipBoard.appendChild(cell);
      }
    }

    const cells = document.querySelectorAll(".placeShip.board .cell");

    const shipsToBePlaced = [
      {
        type: "Carrier",
        length: 5,
      },
      {
        type: "Battleship",
        length: 4,
      },
      {
        type: "Cruiser",
        length: 3,
      },
      {
        type: "Submarine",
        length: 3,
      },
      {
        type: "Destroyer",
        length: 2,
      },
    ];

    updateShipPlaceName(shipsToBePlaced);
    const playerShipPlacements = [];

    cells.forEach((cell) => {
      cell.addEventListener("mouseover", () => {
        const nextCoordinates = [];
        const split = cell.dataset.coordinates.split(",");
        const row = Number(split[0]);
        const column = Number(split[1]);

        if (axis === "horizontal") {
          for (let i = column; i < column + shipsToBePlaced[0].length; i++) {
            if (i > 9) break;
            nextCoordinates.push(`${row},${i}`);
          }
        } else if (axis === "vertical") {
          for (let i = row; i < row + shipsToBePlaced[0].length; i++) {
            if (i > 9) break;
            nextCoordinates.push(`${i},${column}`);
          }
        }

        nextCoordinates.forEach((coordinates) => {
          const theCell = document.querySelector(
            `[data-coordinates="${coordinates}"]`,
          );
          theCell.classList.add("greenColor");
        });
      });

      cell.addEventListener("mouseout", (e) => {
        const nextCoordinates = [];
        const split = cell.dataset.coordinates.split(",");
        const row = Number(split[0]);
        const column = Number(split[1]);

        if (axis === "horizontal") {
          for (let i = column; i < column + shipsToBePlaced[0].length; i++) {
            if (i > 9) break;
            nextCoordinates.push(`${row},${i}`);
          }
        } else if (axis === "vertical") {
          for (let i = row; i < row + shipsToBePlaced[0].length; i++) {
            if (i > 9) break;
            nextCoordinates.push(`${i},${column}`);
          }
        }

        nextCoordinates.forEach((coordinates) => {
          const theCell = document.querySelector(
            `[data-coordinates="${coordinates}"]`,
          );
          theCell.classList.remove("greenColor");
        });
      });

      cell.addEventListener("click", (e) => {
        const nextCoordinates = [];
        const split = cell.dataset.coordinates.split(",");
        const row = Number(split[0]);
        const column = Number(split[1]);

        if (axis === "horizontal") {
          for (let i = column; i < column + shipsToBePlaced[0].length; i++) {
            if (i > 9) return;
            nextCoordinates.push(`${row},${i}`);
          }
        } else if (axis === "vertical") {
          for (let i = row; i < row + shipsToBePlaced[0].length; i++) {
            if (i > 9) return;
            nextCoordinates.push(`${i},${column}`);
          }
        }

        let canBePlaced = true;
        nextCoordinates.forEach((coordinates) => {
          const theCell = document.querySelector(
            `[data-coordinates="${coordinates}"]`,
          );
          if (theCell.classList.contains("definitelyPlaced"))
            canBePlaced = false;
        });

        if (!canBePlaced) return;

        nextCoordinates.forEach((coordinates) => {
          const theCell = document.querySelector(
            `[data-coordinates="${coordinates}"]`,
          );
          theCell.classList.add("definitelyPlaced");
        });

        const playerShipPlacement = {
          length: shipsToBePlaced[0].length,
          startingCoordinate: cell.dataset.coordinates,
          axis: axis,
          type: shipsToBePlaced[0].type,
        };

        playerShipPlacements.push(playerShipPlacement);

        shipsToBePlaced.shift();
        updateShipPlaceName(shipsToBePlaced);

        if (shipsToBePlaced.length === 0) {
          dialog.close();
          dialog.remove();

          resolve(playerShipPlacements);
        }
      });
    });

    dialog.showModal();
  });

  return promise;
}
