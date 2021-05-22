// @flow
import Rotor, { type RotorSettings } from './Rotor';
import Patch, { type PatchSettings } from './Patch';

export type EnigmaSettings = {
  rotors: Rotor[],
  patches: Patch[],
};

class Enigma {
  rotors: Rotor[];
  patches: Patch[];

  constructor({ rotors = [], patches = [] }: EnigmaSettings) {
    this.rotors = rotors;
    this.patches = patches;
  }

  reset() {
    this.rotors.forEach(rotor => {
      rotor.reset();
    });
  }

  get settings(): { rotors: RotorSettings[], patches: PatchSettings[] } {
    return {
      rotors: this.rotors.map(rotor => rotor.settings),
      patches: this.patches.map(patch => patch.settings),
    };
  }

  encode(str: string) {
    this.reset();
    return Array.from(str)
      .map(char => this.encodeChar(char))
      .join('');
  }

  encodeChar(char: string): string {
    let value = this.rotors.reduce(
      (result, rotor) => rotor.encode(result),
      char
    );
    value = this.patchboard(value);
    return this.rotors
      .reverse()
      .reduce((result, rotor) => rotor.encode(result), value);
  }

  decode(str: string): string {
    this.reset();
    return Array.from(str)
      .map(char => this.decodeChar(char))
      .join('');
  }

  decodeChar(char: string): string {
    let value = this.rotors.reduce(
      (result, rotor) => rotor.decode(result),
      char
    );
    value = this.patchboard(value);
    return this.rotors
      .reverse()
      .reduce((result, rotor) => rotor.decode(result), value);
  }

  patchboard(char: string): string {
    const patch = this.patches.find(patch =>
      [patch.entry, patch.exit].includes(char)
    );
    return patch ? patch.route(char) : char;
  }
}

export default Enigma;
