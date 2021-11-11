import { ITarget, Target } from './Target';
import { IParam } from './Param';
export declare class Iscsi {
    private readonly _targets;
    private readonly _pathToFile;
    get targets(): Target[];
    constructor(path: string, targets?: Target[]);
    static readFile(pathToFile: string): Promise<Iscsi>;
    static fromJson(path: string, targets: ITarget[]): Iscsi;
    findTarget(name: string): Target | undefined;
    addRawTarget(name: string, lun: string, params: IParam[], autoSave?: boolean): void;
    removeTarget(name: any): void;
    toJson(): {
        pathToFile: string;
        targets: ITarget[];
    };
    saveTo(pathToFile: any): Promise<void>;
    save(): Promise<void>;
}
