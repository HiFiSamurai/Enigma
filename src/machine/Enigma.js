class Enigma {
  constructor({rotors = [], patches = []}) {
    this.rotors = rotors;
    this.patches = patches;
  }

  reset() {
    this.rotors.forEach((rotor) => { rotor.reset(); });
  }

  get settings() {
    return {
      rotors: this.rotors.map((rotor) => rotor.settings),
      patches: this.patches.map((patch) => patch.settings),
    };
  }

  encode(str) {
    this.reset();
    return Array.from(str).map((char) => this.encodeChar(char)).join('');
  }

  encodeChar(char) {
    let value = this.rotors.reduce((result, rotor) => rotor.encode(result), char);
    value = this.patchboard(value);
    return this.rotors.reverse().reduce((result, rotor) => rotor.encode(result), value);
  }

  decode(str) {
    this.reset();
    return Array.from(str).map((char) => this.decodeChar(char)).join('');
  }

  decodeChar(char) {
    let value = this.rotors.reduce((result, rotor) => rotor.decode(result), char);
    value = this.patchboard(value);
    return this.rotors.reverse().reduce((result, rotor) => rotor.decode(result), value);
  }

  patchboard(char) {
    const patch = this.patches.find((patch) => [patch.entry, patch.exit].includes(char));
    return patch ? patch.route(char) : char;
  }
}

export default Enigma;
