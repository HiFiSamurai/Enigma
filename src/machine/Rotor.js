// @flow
const CHAR_MAP = Array.apply(null, Array('z'.charCodeAt(0)))
  .map((val, i) => String.fromCharCode(i))
  .filter(char => char.match(/[\w]+/g))
  .concat([' ']);

export type RotorSettings = {
  ratio: number,
  start: number,
};

class Rotor {
  ratio: number;
  start: number;
  position: number;

  constructor({ ratio = 1, start = 0 }: RotorSettings) {
    this.ratio = ratio;
    this.start = start;
  }

  reset() {
    this.position = this.start;
  }

  get settings(): RotorSettings {
    return { ratio: this.ratio, start: this.start };
  }

  encode(char: string): string {
    this.step();
    const pos = this.getIndex(char) + Math.round(this.position);
    return this.getCharacter(pos);
  }

  decode(char: string): string {
    this.step();
    const pos = this.getIndex(char) - Math.round(this.position);
    return this.getCharacter(pos);
  }

  step() {
    this.position = (this.position + this.ratio) % CHAR_MAP.length;
  }

  getIndex(char: string): number {
    const index = CHAR_MAP.indexOf(char);
    if (index === -1) throw new Error(`Invalid character detected: ${char}`);
    return index;
  }

  getCharacter(pos: number): string {
    return CHAR_MAP[(pos + CHAR_MAP.length) % CHAR_MAP.length];
  }
}

export default Rotor;
