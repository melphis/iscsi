const fs = require('fs');
const Target = require('./Target');

class Iscsi {
  get targets() {
    return this._targets;
  }

  constructor(path, targets = []) {
    this.pathToFile = path;
    this._targets = targets;
  }

  static readFile(pathToFile) {
    return new Promise((resolve, reject) => {
      fs.readFile(pathToFile, 'utf8', (err, data) => {
        if (err) {
          reject(err);
          return;
        }

        const targetsRaw = data.match(/<target(.|\s)*?\/target>/g);
        const targets = targetsRaw.map((t) => Target.parse(t));

        resolve( new Iscsi(pathToFile, targets) );
      });
    });
  }

  findTarget(name) {
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

  toJson() {
    return {
      pathToFile: this.pathToFile,
      targets: this.targets.map((target) => target.toJson()),
    };
  }

  saveTo(pathToFile) {
    let content = '';

    this.targets.forEach((target) => {
      content += target.serialize() + "\n";
    });

    fs.writeFile(pathToFile, content, err => console.error(err));
  }

  save() {
    if (!this.pathToFile) {
      throw new Error('Set configuration path before save');
    }

    this.saveTo(this.pathToFile);
  }
}

module.exports = Iscsi;
