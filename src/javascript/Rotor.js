const CHAR_MAP = Array.from(new Array('z'.charCodeAt(0)), (val, i) => String.fromCharCode(i))
  .filter((char) => char.match(/[\w]+/g)).concat([' ']);
const MAP_LENGTH = CHAR_MAP.length;

class Rotor {
  constructor({ ratio, start = 0 }) {
    this.ratio = ratio;
    this._start = start;
    this.reset();
  }

  reset(offset = 0) {
    this.position = this._start + offset;
  }

  encode(char) {
    const pos = (this.getIndex(char) + parseInt(this.position * this.ratio)) % MAP_LENGTH;
    this.position++;
    return CHAR_MAP[pos];
  }

  decode(char) {
    const pos = (this.getIndex(char) + MAP_LENGTH - parseInt(this.position * this.ratio)) % MAP_LENGTH;
    this.position--;
    return CHAR_MAP[pos];
  }

  getIndex(char) {
    const index = CHAR_MAP.indexOf(char);
    if (index === -1) throw new Error(`Invalid character detected: ${char}`);
    return index;
  }
}

export default Rotor;
