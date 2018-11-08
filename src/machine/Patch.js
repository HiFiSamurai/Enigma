class Patch {
  constructor({ entry, exit }) {
    this.entry = entry;
    this.exit = exit;
  }

  route(char) {
    switch (char) {
    case this.entry:
      return this.exit;
    case this.exit:
      return this.entry;
    default:
      return char;
    }
  }
}

export default Patch;
