import Rotor from './Rotor';
import Patch from './Patch';

class Enigma {
  constructor() {
    this.rotors = [
      new Rotor({ ratio: 2.25, start: 4 }),
      new Rotor({ ratio: 3.1, start: 6 }),
      new Rotor({ ratio: 4.737, start: 7 }),
    ];

    this.patches = [
      new Patch({ entry: 'a', exit: 'f' }),
      new Patch({ entry: 'j', exit: 'd' }),
      new Patch({ entry: 'g', exit: 's' }),
      new Patch({ entry: 'w', exit: 'q' }),
    ];
  }

  reset() {
    this.rotors.forEach((rotor) => { rotor.reset(); });
  }

  encode(str) {
    this.reset();
    return Array.from(str).map((char) => {
      return this.rotors.reduce((result, rotor) => rotor.encode(result), this.patchboard(char));
    }).join('');
  }

  decode(str) {
    this.reset();
    return Array.from(str).map((char) => {
      return this.patchboard(this.rotors.reduce((result, rotor) => rotor.decode(result), char));
    }).join('');
  }

  patchboard(char) {
    const patch = this.patches.find((patch) => [patch.entry, patch.exit].includes(char));
    return patch ? patch.route(char) : char;
  }
}

export default Enigma;
