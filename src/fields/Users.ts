import Field from './Field';

const incomingName = 'incominguser';
const outgoingName = 'outgoinguser';

export interface IUser {
  username: string;
  password: string;
}

export class IncomingUser extends Field implements IUser {

  static get Name() {
    return incomingName;
  };

  get name() {
    return incomingName;
  };

  constructor(public username: string, public password: string) {
    super();
  }

  toJson(): IUser {
    return {
      username: this.username,
      password: this.password,
    };
  }

  serialize() {
    return `${this.name} ${this.username} ${this.password}\n`;
  }
}

export class OutgoingUser extends IncomingUser {
  static get Name() {
    return outgoingName;
  };
  get name() {
    return outgoingName;
  };
}
