export default function generateCoordinate(player) {
  let row;
  let column;
  let result;

  while (!result || player.gameboard.cellsHit.includes(result)) {
    row = Math.round(Math.random() * 9);
    column = Math.round(Math.random() * 9);

    result = `${row},${column}`;
  }

  return result;
}
