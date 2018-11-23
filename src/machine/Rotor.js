const CHAR_MAP = Array.apply(null, Array('z'.charCodeAt(0)))
  .map((val, i) => String.fromCharCode(i))
  .filter((char) => char.match(/[\w]+/g))
  .concat([' ']);

class Rotor {
  constructor({ ratio = 1, start = 0 }) {
    this.ratio = ratio;
    this.start = start;
  }

  reset() {
    this.position = this.start;
  }

  get settings() {
    return { ratio: this.ratio, start: this.start };
  }

  encode(char) {
    this.step();
    const pos = this.getIndex(char) + Math.round(this.position);
    return this.getCharacter(pos);
  }

  decode(char) {
    this.step();
    const pos = this.getIndex(char) - Math.round(this.position);
    return this.getCharacter(pos);
  }

  step() {
    this.position += this.ratio;
  }

  getIndex(char) {
    const index = CHAR_MAP.indexOf(char);
    if (index === -1) throw new Error(`Invalid character detected: ${char}`);
    return index;
  }

  getCharacter(pos) {
    return CHAR_MAP[(pos + CHAR_MAP.length) % CHAR_MAP.length];
  }
}

export default Rotor;
