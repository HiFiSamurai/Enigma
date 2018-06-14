import Rotor from './Rotor';

class Enigma {
  constructor() {
    this.rotors = [
      new Rotor({ ratio: 2.25, start: 4 }),
      new Rotor({ ratio: 3.1, start: 6 }),
      new Rotor({ ratio: 4, start: 7 }),
    ];
  }

  reset() {
    this.rotors.forEach((rotor) => { rotor.reset(); });
  }

  encode(str) {
    this.reset();
    return Array.from(str).map((char) => {
      return this.rotors.reduce((result, rotor) => rotor.encode(result), char);
    }).join('');
  }

  decode(str) {
    this.reset();
    return Array.from(str).map((char) => {
      return this.rotors.reduce((result, rotor) => rotor.decode(result), char);
    }).join('');
  }
}

export default Enigma;
