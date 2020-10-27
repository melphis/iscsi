const Param = require('./Param');
const regexp = /<target\s(.+?)>([\s\S]+)?<\/target>/;

class Target {
  constructor(data = {}) {
    this.name = data.name;
    this.params = data.params;
  }

  static parse(config) {
    const [, name, content] = config.match(regexp);
    let params;

    if (content) {
      params = content
        .split(/\n/)
        // Фильтрация текстового комментария вида '# comment' где # с самого начала строки
        .filter((row) => row.length && !/^#\s/.test(row))
        .map((row) => Param.parse(row));
    }

    return new Target({ name, params });
  }

  serialize() {
    let content = `<target ${this.name}>\n`;
    content += this.params
      .map((param) => param.serialize())
      .join("\n");

    return content + "\n</target>\n";
  }

  setParams(params) {
    this.params = params.map((param) => new Param(param));
  }
}

module.exports = Target;
