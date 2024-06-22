import Ship from "../src/classes/Ship";

describe("Ship", () => {
  test("Check hit", () => {
    const ship = new Ship(5);

    ship.hit();
    ship.hit();
    ship.hit();

    expect(ship.timesHit).toBe(3);
  });

  test("Check if sunk", () => {
    const ship = new Ship(3);

    ship.hit();
    ship.hit();
    ship.hit();

    expect(ship.isSunk()).toBe(true);
  });

  test("Check if not sunk", () => {
    const ship = new Ship(3);

    expect(ship.isSunk()).toBe(false);
  });
});
