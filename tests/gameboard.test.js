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

describe("Check receiveAttack", () => {
  test("Check if board cell and ship are hit (1)", () => {
    const board = new Gameboard();

    board.placeShip(5, "0,0", "horizontal");

    board.receiveAttack("0,0");
    board.receiveAttack("0,1");
    board.receiveAttack("0,2");
    board.receiveAttack("0,3");
    board.receiveAttack("0,4");

    //Checks if board cells are hit
    expect(board.board[0][0].isHit).toBe(true);
    expect(board.board[0][1].isHit).toBe(true);
    expect(board.board[0][2].isHit).toBe(true);
    expect(board.board[0][2].isHit).toBe(true);
    expect(board.board[0][4].isHit).toBe(true);

    //Check if the cell that is hit is recorded and saved in an array
    expect(board.cellsHit[0]).toBe("0,0");
    expect(board.cellsHit[1]).toBe("0,1");
    expect(board.cellsHit[2]).toBe("0,2");
    expect(board.cellsHit[3]).toBe("0,3");
    expect(board.cellsHit[4]).toBe("0,4");

    //Check if the any ship in the cell is hit
    expect(board.ships[0].timesHit).toBe(5);

    //Check if ship is sunk
    expect(board.ships[0].hasBeenSunk).toBe(true);
  });

  test("Check if prevents more than 1 hit", () => {
    const board = new Gameboard();

    board.placeShip(5, "0,0", "horizontal");

    board.receiveAttack("0,0");
    board.receiveAttack("0,0"); //Won't count

    expect(board.cellsHit.length).toBe(1);
  });
});

describe("Check checkAllSunk", () => {
  test("Check checkAllsunk", () => {
    const gameboard = new Gameboard();

    gameboard.placeShip(3, "3,3", "horizontal");
    gameboard.placeShip(2, "6,7", "vertical");
    gameboard.placeShip(5, "8,1", "horizontal");
    gameboard.placeShip(4, "2,1", "vertical");

    gameboard.receiveAttack("2,1");
    gameboard.receiveAttack("3,1");
    gameboard.receiveAttack("4,1");
    gameboard.receiveAttack("5,1");

    gameboard.receiveAttack("8,1");
    gameboard.receiveAttack("8,2");
    gameboard.receiveAttack("8,3");
    gameboard.receiveAttack("8,4");
    gameboard.receiveAttack("8,5");

    gameboard.receiveAttack("6,7");
    gameboard.receiveAttack("7,7");

    expect(gameboard.checkAllSunk()).toBe(false);
    gameboard.receiveAttack("3,3");
    gameboard.receiveAttack("3,4");
    gameboard.receiveAttack("3,5");

    expect(gameboard.checkAllSunk()).toBe(true);
  });
});
