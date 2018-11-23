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
    return this.rotors.reduce((result, rotor) => rotor.encode(result), this.patchboard(char));
  }

  decode(str) {
    this.reset();
    return Array.from(str).map((char) => this.decodeChar(char)).join('');
  }

  decodeChar(char) {
    return this.patchboard(this.rotors.reduce((result, rotor) => rotor.decode(result), char));
  }

  patchboard(char) {
    const patch = this.patches.find((patch) => [patch.entry, patch.exit].includes(char));
    return patch ? patch.route(char) : char;
  }
}

export default Enigma;
