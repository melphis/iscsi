const Field = require('./Field');
const incomingName = 'incominguser';
const outgoingName = 'outgoinguser';

class IncomingUser extends Field {
  static Name = incomingName;
  name = incomingName;

  constructor(username, password) {
    super();

    this.username = username;
    this.password = password;
  }

  toJson() {
    return {
      username: this.username,
      password: this.password,
    };
  }

  serialize() {
    return `${this.name} ${this.username} ${this.password}\n`;
  }
}

class OutgoingUser extends IncomingUser {
  static Name = outgoingName;
  name = outgoingName;
}

module.exports = {IncomingUser, OutgoingUser};
