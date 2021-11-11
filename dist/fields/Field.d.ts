export default abstract class Field {
    protected arg?: string;
    get name(): string;
    static get Name(): string;
    constructor(arg?: string);
    serialize(): string;
}
