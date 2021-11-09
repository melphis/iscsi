import {readFile, writeFile} from 'fs';
import {ITarget, Target} from './Target';

class Iscsi {

  private readonly _targets: Target[];
  private readonly _pathToFile: string;

  get targets(): Target[] {
    return this._targets;
  }

  constructor(path: string, targets: Target[] = []) {
    this._pathToFile = path;
    this._targets = targets;
  }

  static readFile(pathToFile: string): Promise<Iscsi> {
    return new Promise((resolve, reject) => {
      readFile(pathToFile, 'utf8', (err: Error|null, data: string) => {
        if (err) {
          reject(err);
          return;
        }

        const targetsRaw = data.match(/<target(.|\s)*?\/target>/g) || [];
        const targets = targetsRaw.map((t) => Target.parse(t));

        resolve( new this(pathToFile, targets) );
      });
    });
  }

  static fromJson(path: string, targets: Target[]) {
    return new this(
      path,
      targets.map(target => Target.fromJson(target))
    );
  }

  findTarget(name: string): Target|undefined {
    return this.targets.find((target) => target.name === name);
  }

  /**
   * Raw target adding
   * @param name
   * @param lun
   * @param {object[]} params raw objects
   * @param autoSave
   */
  addRawTarget(name, lun, params, autoSave = false) {
    if (this.findTarget(name)) {
      throw new Error(`Target with name ${name} already exist`);
    }

    const target = new Target({ name, lun });
    target.setParams(params);

    this.targets.push(target);

    autoSave && this.save();
  }

  /**
   * Removing target. Name or target.
   * @param {string|Target} name
   */
  removeTarget(name) {
    let target = name;

    if (typeof(name) === 'string') {
      target = this.findTarget(name);
    }

    const index = this.targets.indexOf(target);
    this.targets.splice(index, 1);
  }

  toJson(): {pathToFile: string, targets: ITarget[]} {
    return {
      pathToFile: this._pathToFile,
      targets: this.targets.map((target) => target.toJson()),
    };
  }

  saveTo(pathToFile): Promise<void> {
    let content = '';

    this.targets.forEach((target) => {
      content += target.serialize() + "\n";
    });

    return new Promise((resolve, reject) => {
      writeFile(pathToFile, content, (err) => {
        err ?  reject(err) : resolve();
      });
    });
  }

  save() {
    if (!this._pathToFile) {
      throw new Error('Set configuration path before save');
    }

    return this.saveTo(this._pathToFile);
  }
}

module.exports = Iscsi;
