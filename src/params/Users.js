class IncomingUser {
  name = 'incominguser';

  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  serialize() {
    return `${this.name} ${this.username} ${this.password}\n`;
  }
}

class OutgoingUser extends IncomingUser {
  name = 'outgoinguser';
}

module.exports = {IncomingUser, OutgoingUser};
