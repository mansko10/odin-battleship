import { experiments } from "webpack";
import Gameboard from "../src/Gameboard.js";

describe("Check placeShipHorizontally", () => {
  test("Check placeShipHorizontally (5, 0,0)", () => {
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

  test("Check placeShipHorizontally (5, 0,5)", () => {
    const board = new Gameboard();
    board.placeShipHorizontally(5, "0,5");

    expect(board.board[0][5].isOccupied).toBe(true);
    expect(board.board[0][6].isOccupied).toBe(true);
    expect(board.board[0][7].isOccupied).toBe(true);
    expect(board.board[0][8].isOccupied).toBe(true);
    expect(board.board[0][9].isOccupied).toBe(true);

    expect(board.board[0][5].occupier).toBe(0);
    expect(board.board[0][6].occupier).toBe(0);
    expect(board.board[0][7].occupier).toBe(0);
    expect(board.board[0][8].occupier).toBe(0);
    expect(board.board[0][9].occupier).toBe(0);

    expect(board.ships[0]).toEqual({
      length: 5,
      timesHit: 0,
      hasBeenSunk: false,
      startingCoordinate: "0,5",
      identifier: 0,
    });
  });

  test("Check placeShipHorizontally (3, 8,5)", () => {
    const board = new Gameboard();
    board.placeShipHorizontally(3, "8,5");

    expect(board.board[8][5].isOccupied).toBe(true);
    expect(board.board[8][6].isOccupied).toBe(true);
    expect(board.board[8][7].isOccupied).toBe(true);

    expect(board.board[8][5].occupier).toBe(0);
    expect(board.board[8][6].occupier).toBe(0);
    expect(board.board[8][7].occupier).toBe(0);

    expect(board.ships[0]).toEqual({
      length: 3,
      timesHit: 0,
      hasBeenSunk: false,
      startingCoordinate: "8,5",
      identifier: 0,
    });
  });

  test("Check if denies out of board placement (5, 3,6)", () => {
    const board = new Gameboard();
    board.placeShipHorizontally(5, "3,6");

    expect(board.board[3][6].isOccupied).toBe(false);
    expect(board.board[3][7].isOccupied).toBe(false);
    expect(board.board[3][8].isOccupied).toBe(false);
    expect(board.board[3][9].isOccupied).toBe(false);
  });

  test("Check if denies placing over other ships", () => {
    const board = new Gameboard();

    board.placeShipHorizontally(4, "4,5");
    board.placeShipHorizontally(4, "4,4");

    expect(board.board[4][5].isOccupied).toBe(true);
    expect(board.board[4][6].isOccupied).toBe(true);
    expect(board.board[4][7].isOccupied).toBe(true);
    expect(board.board[4][8].isOccupied).toBe(true);

    expect(board.board[4][5].occupier).toBe(0);
    expect(board.board[4][6].occupier).toBe(0);
    expect(board.board[4][7].occupier).toBe(0);
    expect(board.board[4][8].occupier).toBe(0);

    expect(board.board[4][4].isOccupied).toBe(false);
  });

  test("Check if can place more than 1 ship", () => {
    const board = new Gameboard();

    board.placeShipHorizontally(4, "0,4");
    board.placeShipHorizontally(3, "3,4");
    board.placeShipHorizontally(5, "5,4");
    board.placeShipHorizontally(5, "3,2");

    expect(board.ships.length).toBe(3);
  });
});
