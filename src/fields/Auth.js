const {IncomingUser, OutgoingUser} = require('./Users');

const TYPE = {
  NONE: 0,
  CHAP: 1,
  TWO_WAY: 2,
};

class Auth {
  static get TYPE() {
    return TYPE;
  }

  constructor(incoming, outgoing) {
    this.incomingUser = undefined;
    this.outgoingUser = undefined;
    this.type = TYPE.NONE;
    
    if (incoming) {
      this.incomingUser = new IncomingUser(incoming.username, incoming.password);
      this.type = TYPE.CHAP;

      if (outgoing) {
        this.outgoingUser = new OutgoingUser(outgoing.username, outgoing.password);
        this.type = TYPE.TWO_WAY;
      }
    }
  }

  toJson() {
    return {
      type: this.type,
      incomingUser: this.incomingUser ? this.incomingUser.toJson() : {},
      outgoingUser: this.outgoingUser ? this.outgoingUser.toJson() : {},
    }
  }

  serialize() {
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

module.exports = Auth;
