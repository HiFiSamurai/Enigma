// @flow
export type PatchSettings = {
  entry: string,
  exit: string,
};

class Patch {
  entry: string;
  exit: string;

  constructor({ entry, exit }: PatchSettings) {
    this.entry = entry;
    this.exit = exit;
  }

  route(char: string): string {
    switch (char) {
    case this.entry:
      return this.exit;
    case this.exit:
      return this.entry;
    default:
      return char;
    }
  }

  get settings(): PatchSettings {
    return { entry: this.entry, exit: this.exit };
  }
}

export default Patch;
