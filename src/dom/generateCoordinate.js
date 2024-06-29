import genAdjacent from "./genAdjacent.js";

let adjacents = [];
let lastOccupied = [];

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
      const targettedShipIdentifier = player.gameboard.board[lastAdjacentSplitRow][lastAdjacentSplitColumn].occupier;
      const shipInBoard = player.gameboard.ships[targettedShipIdentifier];
      
      lastOccupied.push(`${lastAdjacentSplitRow},${lastAdjacentSplitColumn}`);
      console.log(lastOccupied);
      let additionalAdjacent = genAdjacent(lastAdjacentSplitRow, lastAdjacentSplitColumn, player);
      adjacents.pop();
      adjacents = adjacents.concat(additionalAdjacent);
      
      //IsSunk won't work (due to return being later) so came up with this way. The goal is to prevent hitting adjacent cells of already sunk ship.
      if (shipInBoard.length - shipInBoard.timesHit === 1) adjacents = [];
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
      lastOccupied.push(`${row},${column}`);
      //Checks if coordinates randomly generated is occupied. If it is, then its adjacents are concatenated to adjacents array
      let additionalAdjacent = genAdjacent(row, column, player);

      adjacents = adjacents.concat(additionalAdjacent);
      console.log(adjacents);
    }

    return result;
  }
}
