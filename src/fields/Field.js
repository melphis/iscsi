class Field {

  get name() {
    throw new Error('Field `name` must be defined');
  }

  static get Name() {
    throw new Error('Static field `Name` must be defined');
  }

  constructor(arg) {
    this.arg = arg;
  }

  serialize() {
    return !this.arg ? '' : `${this.name} ${this.arg}\n`;
  }
}

module.exports = Field;
