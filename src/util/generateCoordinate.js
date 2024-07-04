import genAdjacent from "./genAdjacent";

let adjacents = [];
let lastOccupied = [];

export default function generateCoordinate(player) {
  if (adjacents.length > 0) {
    if (lastOccupied.length >= 2) {
      let first = lastOccupied[0]; // format is 'a,b'
      let second = lastOccupied[1]; // format is 'c,d'

      first = first.split(","); // format is ['a', 'b']
      second = second.split(","); // format is ['c', 'd']

      const rowOfFirst = first[0]; // format is 'a'
      const rowOfSecond = second[0]; // format is 'b'
      const colOfFirst = first[1]; // format is 'c'
      const colOfSecond = second[1]; // format is 'd'

      if (rowOfFirst === rowOfSecond) {
        for (let i = 0; i < adjacents.length; i += 1) {
          let adjacent = adjacents[i];
          adjacent = adjacent.split(",");

          if (adjacent[0] !== rowOfFirst) {
            adjacents.splice(i, 1);
            i -= 1;
          }
        }
      } else if (colOfFirst === colOfSecond) {
        for (let i = 0; i < adjacents.length; i += 1) {
          let adjacent = adjacents[i];
          adjacent = adjacent.split(",");

          if (adjacent[1] !== colOfFirst) {
            adjacents.splice(i, 1);
            i -= 1;
          }
        }
      }
    }

    // pick from adjacents
    const lastAdjacent = adjacents[adjacents.length - 1];
    const lastAdjacentSplit = lastAdjacent.split(",");
    const lastAdjacentSplitRow = +lastAdjacentSplit[0];
    const lastAdjacentSplitColumn = +lastAdjacentSplit[1];

    // prettier-ignore
    if (player.gameboard.board[lastAdjacentSplitRow][lastAdjacentSplitColumn].isOccupied) {
      // Handles case where adjacent itself is occupied. The adjacent's adjacents will also be concatenated after adjacent is popped
      adjacents.pop();
      lastOccupied.push(`${lastAdjacentSplitRow},${lastAdjacentSplitColumn}`);
      const additionalAdjacent = genAdjacent(lastAdjacentSplitRow, lastAdjacentSplitColumn, player);
      adjacents = adjacents.concat(additionalAdjacent);

      const targettedShipIdentifier = player.gameboard.board[lastAdjacentSplitRow][lastAdjacentSplitColumn].occupier;
      const shipInBoard = player.gameboard.ships[targettedShipIdentifier];
  
      // IsSunk won't work (due to return being later) so came up with this way. The goal is to prevent hitting adjacent cells of already sunk ship.
      if (shipInBoard.length - shipInBoard.timesHit === 1) {
        adjacents = [];
        lastOccupied = [];
      };

      return lastAdjacent;
    }
    // Handles case where adjacent is not occupied. The adjacent is simply popped off
    adjacents.pop();
    return lastAdjacent;
  }
  // Generate randomly and do not pick from adjacents
  let row;
  let column;
  let result;

  while (!result || player.gameboard.cellsHit.includes(result)) {
    row = Math.round(Math.random() * 9);
    column = Math.round(Math.random() * 9);

    result = `${row},${column}`;
  }

  if (player.gameboard.board[row][column].isOccupied) {
    // Checks if coordinates randomly generated is occupied. If it is, then the cell is pushed to lastOccupied and its adjacents are concatenated to adjacents array
    lastOccupied.push(`${row},${column}`);
    const additionalAdjacent = genAdjacent(row, column, player);

    adjacents = adjacents.concat(additionalAdjacent);
  }

  return result;
}
