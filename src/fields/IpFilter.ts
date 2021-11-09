import Field from './Field';
const name = 'initiator-address'

export default class IpFilter extends Field {
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
