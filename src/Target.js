const Param = require('./Param');
const regexp = /<target\s(.+?)>([\s\S]+)?<\/target>/;

class Target {
  constructor(config) {
    this.name = undefined;
    this.params = [];

    const [, name, content] = config.match(regexp);

    if (name) {
      this.name = name;
    }

    if (content) {
      this.params = content
        .split(/\n/)
        // Фильтрация текстового комментария вида '# comment'
        .filter((row) => row.length && !/^#\s/.test(row))
        .map((row) => new Param(row));
    }
  }

  serialize() {
    let content = `<target ${this.name}>\n`;
    content += this.params
      .map((param) => param.serialize())
      .join("\n");

    return content + "\n</target>\n";
  }
}

module.exports = Target;
