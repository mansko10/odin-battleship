import Gameboard from "../src/Gameboard.js";

describe("Check placeShip", () => {
  test("placeShip", () => {
    const board = new Gameboard();

    board.placeShip(5, "1,6", "vertical");
    board.placeShip(4, "8,1", "horizontal");
    board.placeShip(3, "5,1", "horizontal");
    board.placeShip(2, "2,1", "horizontal");
    board.placeShip(2, "7,9", "vertical");
    board.placeShip(3, "3,5", "horizontal"); //<<< will not place due to collision with ship being present
    board.placeShip(4, "3,8", "horizontal"); //<<< will not place due to getting out of board

    expect(board.ships.length).toBe(5);

    expect(board.board[1][6].occupier).toBe(0);
    expect(board.board[5][6].occupier).toBe(0);

    expect(board.board[8][1].occupier).toBe(1);
    expect(board.board[8][4].occupier).toBe(1);

    expect(board.board[5][1].occupier).toBe(2);
    expect(board.board[5][3].occupier).toBe(2);

    expect(board.board[2][1].occupier).toBe(3);
    expect(board.board[2][2].occupier).toBe(3);

    expect(board.board[7][9].occupier).toBe(4);
    expect(board.board[8][9].occupier).toBe(4);
  });
});
