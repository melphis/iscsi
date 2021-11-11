import Field from './Field';
export interface IUser {
    username: string;
    password: string;
}
export declare class IncomingUser extends Field implements IUser {
    username: string;
    password: string;
    static get Name(): string;
    get name(): string;
    constructor(username: string, password: string);
    toJson(): IUser;
    serialize(): string;
}
export declare class OutgoingUser extends IncomingUser {
    static get Name(): string;
    get name(): string;
}
