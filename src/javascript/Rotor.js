const CHAR_MAP = Array.from(new Array('z'.charCodeAt(0)), (val, i) => String.fromCharCode(i))
  .filter((char) => char.match(/[a-zA-Z]+/g));

class Rotor {
  constructor({ ratio, start }) {
    this.ratio = ratio;
    this._start = start;
    this.reset();
  }

  reset() {
    this.postion = this._start;
  }

  encode(char) {
    const pos = (CHAR_MAP.indexOf(char) + (this.position * this.ratio)) % CHAR_MAP;
    this.position++;
    return CHAR_MAP[pos];
  }

  decode(char) {
    this.position--;
  }
}

export default Rotor;
