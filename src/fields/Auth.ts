import {IncomingUser, OutgoingUser, IUser} from './Users';

enum TYPE {
  NONE,
  CHAP,
  TWO_WAY,
}

export interface IAuth {
  type: TYPE;
  incomingUser: IncomingUser | {};
  outgoingUser: OutgoingUser | {};
}

export class Auth implements IAuth{
  static readonly TYPE = TYPE;
  incomingUser: IncomingUser;
  outgoingUser: OutgoingUser;
  type = TYPE.NONE;

  constructor(incoming?: IUser, outgoing?: IUser) {
    if (incoming) {
      this.incomingUser = new IncomingUser(incoming.username, incoming.password);
      this.type = TYPE.CHAP;

      if (outgoing) {
        this.outgoingUser = new OutgoingUser(outgoing.username, outgoing.password);
        this.type = TYPE.TWO_WAY;
      }
    }
  }

  toJson(): IAuth {
    return {
      type: this.type,
      incomingUser: this.incomingUser ? this.incomingUser.toJson() : {},
      outgoingUser: this.outgoingUser ? this.outgoingUser.toJson() : {},
    };
  }

  serialize(): string {
    let text = '';

    if (this.incomingUser) {
      text += this.incomingUser.serialize();
    }

    if (this.outgoingUser) {
      text += this.outgoingUser.serialize();
    }

    return text;
  }
}
