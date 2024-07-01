export default class Ship {
  constructor(length, startingCoordinate, identifier, type) {
    this.length = length;
    this.timesHit = 0;
    this.hasBeenSunk = false;
    this.startingCoordinate = startingCoordinate;
    this.identifier = identifier;
    this.type = type;
  }

  hit() {
    this.timesHit += 1;
    this.isSunk();
  }

  isSunk() {
    if (this.timesHit === this.length) {
      this.hasBeenSunk = true;
      return this.hasBeenSunk;
    }

    return this.hasBeenSunk;
  }
}
