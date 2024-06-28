import genAdjacent from "./genAdjacent.js";

let adjacents = [];
let ship = [];

export default function generateCoordinate(player) {
  if (adjacents.length > 0) {
    //pick from adjacents
    const lastAdjacent = adjacents[adjacents.length - 1];
    const lastAdjacentSplit = lastAdjacent.split(",");
    const lastAdjacentSplitRow = +lastAdjacentSplit[0];
    const lastAdjacentSplitColumn = +lastAdjacentSplit[1];

    //prettier-ignore
    if (player.gameboard.board[lastAdjacentSplitRow][lastAdjacentSplitColumn].isOccupied) {
      //Handles case where adjacent itself is occupied. The adjacent's adjacents will also be concatenated after adjacent is popped
      let additionalAdjacent = genAdjacent(lastAdjacentSplitRow, lastAdjacentSplitColumn, player);
      adjacents.pop();
      adjacents = adjacents.concat(additionalAdjacent);
      console.log(adjacents);
      return lastAdjacent;
    } else {
      //Handles case where adjacent is not occupied. The adjacent is simply popped off
      adjacents.pop();
      console.log(adjacents);
      return lastAdjacent;
    }
  } else {
    //Generate randomly and do not pick from adjacents
    let row;
    let column;
    let result;

    while (!result || player.gameboard.cellsHit.includes(result)) {
      row = Math.round(Math.random() * 9);
      column = Math.round(Math.random() * 9);

      result = `${row},${column}`;
    }

    if (player.gameboard.board[row][column].isOccupied) {
      //Checks if coordinates randomly generated is occupied. If it is, then its adjacents are concatenated to adjacents array
      let additionalAdjacent = genAdjacent(row, column, player);

      adjacents = adjacents.concat(additionalAdjacent);
      console.log(adjacents);
    }

    return result;
  }
}
