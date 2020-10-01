class Param {
  constructor(row) {
    const [name, ...params] = row.match(/\S+/g);

    this.name = name.replace(/^#/, '');
    this.arguments = params;
    this.enabled = name.indexOf('#') !== 0;
  }

  serialize() {
    const ds = this.enabled ? '' : '#';
    return `${ds}${this.name} ${this.arguments.join(' ')}`;
  }
}

module.exports = Param;
