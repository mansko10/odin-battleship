export default function genAdjacent(row, column, player) {
  const first = [row - 1, column];
  const second = [row + 1, column];
  const third = [row, column - 1];
  const fourth = [row, column + 1];
  let adjacents = [];

  if (!(first[0] < 0) && !(first[0] > 9) && !(first[1] < 0) && !(first[1] > 9))
    adjacents.push(first.join(","));

  if (
    !(second[0] < 0) &&
    !(second[0] > 9) &&
    !(second[1] < 0) &&
    !(second[1] > 9)
  )
    adjacents.push(second.join(","));

  if (!(third[0] < 0) && !(third[0] > 9) && !(third[1] < 0) && !(third[1] > 9))
    adjacents.push(third.join(","));

  if (
    !(fourth[0] < 0) &&
    !(fourth[0] > 9) &&
    !(fourth[1] < 0) &&
    !(fourth[1] > 9)
  )
    adjacents.push(fourth.join(","));

  adjacents = adjacents.filter(
    (adjacent) => !player.gameboard.cellsHit.includes(adjacent),
  );

  return adjacents;
}
