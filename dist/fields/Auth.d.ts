import { IncomingUser, OutgoingUser, IUser } from './Users';
declare enum TYPE {
    NONE = 0,
    CHAP = 1,
    TWO_WAY = 2
}
export interface IAuth {
    type: TYPE;
    incomingUser?: IUser;
    outgoingUser?: IUser;
}
export declare class Auth implements IAuth {
    incomingUser: IncomingUser;
    outgoingUser: OutgoingUser;
    type: TYPE;
    constructor(incoming?: IUser, outgoing?: IUser);
    toJson(): IAuth;
    serialize(): string;
}
export {};
