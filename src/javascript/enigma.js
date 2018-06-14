import Rotor from './Rotor';

class Enigma {
  constructor() {
    this.rotors = [
      new Rotor({ ratio: 2.25, start: 4 }),
      new Rotor({ ratio: 3.1, start: 6 }),
      new Rotor({ ratio: 4, start: 7 }),
    ];
  }

  reset(offset = 0) {
    this.rotors.forEach((rotor) => { rotor.reset(offset); });
  }

  encode(str) {
    this.reset();
    return Array.from(str).map((char) => {
      return this.rotors.reduce((result, rotor) => rotor.encode(result), char);
    }).join('');
  }

  decode(str) {
    this.reset(str.length - 1);
    return Array.from(str).reverse().map((char) => {
      return this.rotors.reverse().reduce((result, rotor) => rotor.decode(result), char);
    }).reverse().join('');
  }
}

export default Enigma;
