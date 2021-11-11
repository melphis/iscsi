interface IData {
    name?: string;
    args?: string[];
    enabled?: boolean;
}
export default class Param {
    name: string;
    args: string[];
    enabled: boolean;
    constructor(data?: IData);
    static parse(row: string): Param;
    serialize(): string;
}
export {};
