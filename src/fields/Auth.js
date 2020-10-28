const {IncomingUser, OutgoingUser} = require('./Users');

class Auth {
  static TYPE = {
    NONE: 0,
    CHAP: 1,
    TWO_WAY: 2,
  };

  incomingUser = undefined;
  outgoingUser = undefined;
  type = Auth.TYPE.NONE;

  constructor(incoming, outgoing) {
    if (incoming) {
      this.incomingUser = new IncomingUser(incoming.username, incoming.password);
      this.type = Auth.TYPE.CHAP;

      if (outgoing) {
        this.outgoingUser = new OutgoingUser(outgoing.username, outgoing.password);
        this.type = Auth.TYPE.TWO_WAY;
      }
    }
  }

  toJson() {
    return {
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
