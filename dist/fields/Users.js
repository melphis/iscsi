"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutgoingUser = exports.IncomingUser = void 0;
const Field_1 = require("./Field");
const incomingName = 'incominguser';
const outgoingName = 'outgoinguser';
class IncomingUser extends Field_1.default {
    constructor(username, password) {
        super();
        this.username = username;
        this.password = password;
    }
    static get Name() {
        return incomingName;
    }
    ;
    get name() {
        return incomingName;
    }
    ;
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
exports.IncomingUser = IncomingUser;
class OutgoingUser extends IncomingUser {
    static get Name() {
        return outgoingName;
    }
    ;
    get name() {
        return outgoingName;
    }
    ;
}
exports.OutgoingUser = OutgoingUser;
//# sourceMappingURL=Users.js.map