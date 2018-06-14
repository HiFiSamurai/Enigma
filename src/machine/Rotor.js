const CHAR_MAP = Array.apply(null, Array('z'.charCodeAt(0)))
  .map((val, i) => String.fromCharCode(i))
  .filter((char) => char.match(/[\w]+/g))
  .concat([' ']);

class Rotor {
  constructor({ ratio, start = 0 }) {
    this.ratio = ratio;
    this.start = start;
  }

  reset() {
    this.position = this.start;
  }

  encode(char) {
    const pos = (this.getIndex(char) + this.offset) % CHAR_MAP.length;
    this.position++;
    return CHAR_MAP[pos];
  }

  decode(char) {
    const pos = (this.getIndex(char) + CHAR_MAP.length - this.offset) % CHAR_MAP.length;
    this.position++;
    return CHAR_MAP[pos];
  }

  getIndex(char) {
    const index = CHAR_MAP.indexOf(char);
    if (index === -1) throw new Error(`Invalid character detected: ${char}`);
    return index;
  }

  get offset() {
    return parseInt(this.position * this.ratio);
  }
}

export default Rotor;
