import Gameboard from "../src/Gameboard.js";

describe("Gameboard", () => {
  test("Check placeShipHorizontally", () => {
    const board = new Gameboard();
    board.placeShipHorizontally(5, "0,0");

    expect(board.board[0][0].isOccupied).toBe(true);
    expect(board.board[0][1].isOccupied).toBe(true);
    expect(board.board[0][2].isOccupied).toBe(true);
    expect(board.board[0][3].isOccupied).toBe(true);
    expect(board.board[0][4].isOccupied).toBe(true);

    expect(board.board[0][0].occupier).toBe(0);
    expect(board.board[0][1].occupier).toBe(0);
    expect(board.board[0][2].occupier).toBe(0);
    expect(board.board[0][3].occupier).toBe(0);
    expect(board.board[0][4].occupier).toBe(0);

    expect(board.ships[0]).toEqual({
      length: 5,
      timesHit: 0,
      hasBeenSunk: false,
      startingCoordinate: "0,0",
      identifier: 0,
    });
  });
});
