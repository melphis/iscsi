const fs = require('fs');
const Target = require('./Target');
const Param = require('./Param');

class Iscsi {
  constructor() {
    this.targets = [];
    this.pathToFile = undefined;
  }

  async static readFile(pathToFile) {
    return new Promise((resolve, reject) => {
      const self = new Iscsi();
      self.pathToFile = pathToFile;

      fs.readFile(pathToFile, 'utf8', (err, data) => {
        if (err) {
          reject(err);
          return;
        }

        const targetsRaw = data.match(/<target(.|\s)*?\/target>/g);
        self.targets = targetsRaw.map((t) => Target.parse(t));

        resolve(self);
      });
    });
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

  findTarget(name) {
    return this.targets.find((target) => target.name === name);
  }

  /**
   * Raw target adding
   * @param name
   * @param {object[]} params raw objects
   * @param autoSave
   */
  addRawTarget(name, params, autoSave = false) {
    if (this.findTarget(name)) {
      throw new Error(`Target with name ${name} already exist`);
    }

    const target = new Target({ name });
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
}

module.exports = Iscsi;
