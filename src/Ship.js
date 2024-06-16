export default class Ship {
  constructor(length) {
    this.length = length;
    this.timesHit = 0;
    this.hasBeenSunk = false;
  }

  hit() {
    this.timesHit += 1;
  }
}
