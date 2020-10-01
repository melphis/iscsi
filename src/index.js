const fs = require('fs');
const Target = require('./Target')

class Iscsi {
  constructor() {
    this.targets = [];
    this.pathToFile = undefined;
  }

  static readFile(pathToFile) {
    return new Promise((resolve, reject) => {
      const self = new Iscsi();
      self.pathToFile = pathToFile;

      fs.readFile(pathToFile, 'utf8', (err, data) => {
        if (err) {
          reject(err);
          return;
        }

        const targetsRaw = data.match(/<target(.|\s)*?\/target>/g);
        self.targets = targetsRaw.map((t) => new Target(t));

        resolve(self);
      });
    });
  }

  /**
   *
   * @param {string} [pathToFile=this.pathToFile]
   */
  writeTo(pathToFile) {
    let content = '';

    this.targets.forEach((target) => {
      content += target.serialize() + "\n";
    });

    fs.writeFile(pathToFile || this.pathToFile, content, err => console.error(err));
  }
}

module.exports = Iscsi;
