export default abstract class Field {

  get name(): string {
    throw new Error('Field `name` must be defined');
  }

  static get Name(): string {
    throw new Error('Static field `Name` must be defined');
  }

  constructor(protected arg?: string) {}

  serialize(): string {
    return !this.arg ? '' : `${this.name} ${this.arg}\n`;
  }
}
