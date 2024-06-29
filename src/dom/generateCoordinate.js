import genAdjacent from "./genAdjacent.js";

let adjacents = [];
let lastOccupied = [];
let axis;

export default function generateCoordinate(player) {
  if (adjacents.length > 0) {
    //pick from adjacents
    const lastAdjacent = adjacents[adjacents.length - 1];
    const lastAdjacentSplit = lastAdjacent.split(",");
    const lastAdjacentSplitRow = +lastAdjacentSplit[0];
    const lastAdjacentSplitColumn = +lastAdjacentSplit[1];

    if (lastOccupied.length >= 2) {
      let first = lastOccupied[0]; // format is 'a,b'
      let second = lastOccupied[1]; //format is 'c,d'

      first = first.split(","); //format is ['a', 'b']
      second = second.split(","); //format is ['a', 'b']

      let rowOfFirst = first[0]; //format is 'a'
      let rowOfSecond = second[0]; //format is 'b'
      let colOfFirst = first[1]; //format is 'c'
      let colOfSecond = second[1]; //format is 'd'

      if (rowOfFirst === rowOfSecond) {
        console.log("ITS HORIZONTAL", rowOfFirst, rowOfSecond);
        axis = ["horizontal", rowOfFirst];
      } else if (colOfFirst === colOfSecond) {
        console.log("ITS VERTICAL");
        axis = ["vertical", colOfFirst];
      }
    }

    //prettier-ignore
    if (player.gameboard.board[lastAdjacentSplitRow][lastAdjacentSplitColumn].isOccupied) {
      //Handles case where adjacent itself is occupied. The adjacent's adjacents will also be concatenated after adjacent is popped
      const targettedShipIdentifier = player.gameboard.board[lastAdjacentSplitRow][lastAdjacentSplitColumn].occupier;
      const shipInBoard = player.gameboard.ships[targettedShipIdentifier];
      
      lastOccupied.push(`${lastAdjacentSplitRow},${lastAdjacentSplitColumn}`);
      let additionalAdjacent = genAdjacent(lastAdjacentSplitRow, lastAdjacentSplitColumn, player);
      adjacents.pop();
      adjacents = adjacents.concat(additionalAdjacent);

      if (axis) {
        if (axis[0] === 'horizontal') {
          for (let i = 0; i < adjacents.length; i++) {
            let adjacent = adjacents[i];
            adjacent = adjacent.split(',');
            
            if (adjacent[0] !== axis[1]) {
              console.log('selective axis horizontal');
              adjacents.splice(i, 1);
              i--;
            }
          }
        } else if (axis[0] === 'vertical') {
          for (let i = 0; i < adjacents.length; i++) {
            let adjacent = adjacents[i];
            adjacent = adjacent.split(',');
            
            if (adjacent[1] !== axis[1]) {
              console.log('selective axis vertical');
              adjacents.splice(i, 1);
              i--;
            }
          }
        }
      }
      
      //IsSunk won't work (due to return being later) so came up with this way. The goal is to prevent hitting adjacent cells of already sunk ship.
      if (shipInBoard.length - shipInBoard.timesHit === 1) {
        adjacents = [];
        lastOccupied = [];
        axis = undefined;
      };
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
