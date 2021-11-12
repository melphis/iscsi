"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = exports.TYPE = void 0;
const Users_1 = require("./Users");
var TYPE;
(function (TYPE) {
    TYPE[TYPE["NONE"] = 0] = "NONE";
    TYPE[TYPE["CHAP"] = 1] = "CHAP";
    TYPE[TYPE["TWO_WAY"] = 2] = "TWO_WAY";
})(TYPE = exports.TYPE || (exports.TYPE = {}));
class Auth {
    constructor(incoming, outgoing) {
        this.type = TYPE.NONE;
        if (incoming) {
            this.incomingUser = new Users_1.IncomingUser(incoming.username, incoming.password);
            this.type = TYPE.CHAP;
            if (outgoing) {
                this.outgoingUser = new Users_1.OutgoingUser(outgoing.username, outgoing.password);
                this.type = TYPE.TWO_WAY;
            }
        }
    }
    toJson() {
        var _a, _b;
        return {
            type: this.type,
            incomingUser: (_a = this.incomingUser) === null || _a === void 0 ? void 0 : _a.toJson(),
            outgoingUser: (_b = this.outgoingUser) === null || _b === void 0 ? void 0 : _b.toJson(),
        };
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
exports.Auth = Auth;
//# sourceMappingURL=Auth.js.map