export default class Ship {
  constructor(length, startingCoordinate) {
    this.length = length;
    this.timesHit = 0;
    this.hasBeenSunk = false;
    this.startingCoordinate = startingCoordinate;
  }

  hit() {
    this.timesHit += 1;
  }

  isSunk() {
    if (this.timesHit === this.length) {
      this.hasBeenSunk = true;
      return this.hasBeenSunk;
    }

    return this.hasBeenSunk;
  }
}
