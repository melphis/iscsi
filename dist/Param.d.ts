export interface IParam {
    name?: string;
    args?: string[];
    enabled?: boolean;
}
export declare class Param implements IParam {
    name: string;
    args: string[];
    enabled: boolean;
    constructor(data?: IParam);
    static parse(row: string): Param;
    serialize(): string;
}
