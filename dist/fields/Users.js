import Field from './Field';
const incomingName = 'incominguser';
const outgoingName = 'outgoinguser';
export class IncomingUser extends Field {
    username;
    password;
    static get Name() {
        return incomingName;
    }
    ;
    get name() {
        return incomingName;
    }
    ;
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
export class OutgoingUser extends IncomingUser {
    static get Name() {
        return outgoingName;
    }
    ;
    get name() {
        return outgoingName;
    }
    ;
}
//# sourceMappingURL=Users.js.map