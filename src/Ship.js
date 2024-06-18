export default class Ship {
  constructor(length, startingCoordinate, identifier) {
    this.length = length;
    this.timesHit = 0;
    this.hasBeenSunk = false;
    this.startingCoordinate = startingCoordinate;
    this.identifier = identifier;
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
