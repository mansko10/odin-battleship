export default class Ship {
  constructor(length, coordinates) {
    this.length = length;
    this.timesHit = 0;
    this.hasBeenSunk = false;
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
