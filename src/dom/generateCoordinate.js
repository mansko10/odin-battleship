import genAdjacent from "./genAdjacent.js";

let adjacents = [];

export default function generateCoordinate(player) {
  if (adjacents.length > 0) {
    const lastAdjacent = adjacents[adjacents.length - 1];
    const lastAdjacentSplit = lastAdjacent.split(",");
    const lastAdjacentSplitRow = +lastAdjacentSplit[0];
    const lastAdjacentSplitColumn = +lastAdjacentSplit[1];

    //prettier-ignore
    if (player.gameboard.board[lastAdjacentSplitRow][lastAdjacentSplitColumn].isOccupied) {
      let additionalAdjacent = genAdjacent(lastAdjacentSplitRow, lastAdjacentSplitColumn, player);
      adjacents.pop();
      adjacents = adjacents.concat(additionalAdjacent);
      console.log(adjacents);
      return lastAdjacent;
    } else {
      adjacents.pop();
      console.log(adjacents);
      return lastAdjacent;
    }
  } else {
    let row;
    let column;
    let result;

    while (!result || player.gameboard.cellsHit.includes(result)) {
      row = Math.round(Math.random() * 9);
      column = Math.round(Math.random() * 9);

      result = `${row},${column}`;
    }

    if (player.gameboard.board[row][column].isOccupied) {
      let additionalAdjacent = genAdjacent(row, column, player);

      adjacents = adjacents.concat(additionalAdjacent);
      console.log(adjacents);
    }

    return result;
  }
}
