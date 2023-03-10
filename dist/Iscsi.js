import { readFile, writeFile } from 'fs';
import { Target } from './Target';
export class Iscsi {
    _targets;
    _pathToFile;
    get targets() {
        return this._targets;
    }
    constructor(path, targets = []) {
        this._pathToFile = path;
        this._targets = targets;
    }
    static readFile(pathToFile) {
        return new Promise((resolve, reject) => {
            readFile(pathToFile, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                const targetsRaw = data.match(/<target(.|\s)*?\/target>/g) || [];
                const targets = targetsRaw.map((t) => Target.parse(t));
                resolve(new this(pathToFile, targets));
            });
        });
    }
    static fromJson(path, targets) {
        return new this(path, targets.map(target => Target.fromJson(target)));
    }
    findTarget(name) {
        return this.targets.find((target) => target.name === name);
    }
    addRawTarget(name, lun, params, autoSave = false) {
        if (this.findTarget(name)) {
            throw new Error(`Target with name ${name} already exist`);
        }
        const target = new Target({ name, lun });
        target.setParams(params);
        this.targets.push(target);
        autoSave && this.save();
    }
    removeTarget(name) {
        let target = name;
        if (typeof (name) === 'string') {
            target = this.findTarget(name);
        }
        const index = this.targets.indexOf(target);
        this.targets.splice(index, 1);
    }
    toJson() {
        return {
            pathToFile: this._pathToFile,
            targets: this.targets.map((target) => target.toJson()),
        };
    }
    saveTo(pathToFile) {
        let content = '';
        this.targets.forEach((target) => {
            content += target.serialize() + "\n";
        });
        return new Promise((resolve, reject) => {
            writeFile(pathToFile, content, (err) => {
                err ? reject(err) : resolve();
            });
        });
    }
    save() {
        if (!this._pathToFile) {
            throw new Error('Set configuration path before save or use `saveTo`');
        }
        return this.saveTo(this._pathToFile);
    }
}
//# sourceMappingURL=Iscsi.js.map