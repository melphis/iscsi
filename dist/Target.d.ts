import { Auth, BackingStore, IpFilter, IAuth } from './fields';
import { IParam, Param } from './Param';
interface IData {
    name?: string;
    lun?: string;
    params?: Param[];
}
export interface ITarget {
    name: string;
    lun: string;
    auth: IAuth;
    backingStore: string;
    ipFilter: string;
}
export declare class Target {
    static readonly REGEXP: RegExp;
    name: string;
    lun: string;
    params: Param[];
    auth: Auth;
    backingStore: BackingStore;
    ipFilter: IpFilter;
    constructor(data?: IData);
    static parse(config: string): Target;
    static fromJson(data: ITarget): Target;
    serialize(serializeRawParams?: boolean): string;
    toJson(): ITarget;
    findParam(name: any): Param;
    setParams(params: IParam[]): void;
    private _mapParams;
    private _setAuth;
    private _getUserData;
    private _setBackingStore;
    private _setIpFilter;
    private _serializeFields;
    private _serializeRawParams;
}
export {};
