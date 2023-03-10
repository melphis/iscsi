import { IncomingUser, OutgoingUser } from './Users';
export var TYPE;
(function (TYPE) {
    TYPE[TYPE["NONE"] = 0] = "NONE";
    TYPE[TYPE["CHAP"] = 1] = "CHAP";
    TYPE[TYPE["TWO_WAY"] = 2] = "TWO_WAY";
})(TYPE || (TYPE = {}));
export class Auth {
    incomingUser;
    outgoingUser;
    type = TYPE.NONE;
    constructor(incoming, outgoing) {
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
            incomingUser: this.incomingUser?.toJson(),
            outgoingUser: this.outgoingUser?.toJson(),
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
//# sourceMappingURL=Auth.js.map