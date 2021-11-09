import Field from './Field';
const name = 'backing-store';

export default class BackingStore extends Field {
  static get Name() {
    return name;
  };

  get name() {
    return name;
  };

  toJson(): string {
    return this.arg;
  }
}
