import Ship from "../src/Ship.js";

describe("Ship", () => {
  test("Check hit", () => {
    const ship = new Ship(5);

    ship.hit();
    ship.hit();
    ship.hit();

    expect(ship.timesHit).toBe(3);
  });
});
