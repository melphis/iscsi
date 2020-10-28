const Auth = require('./params/Auth');
const BackingStore = require('./params/BackingStore');
const Param = require('./Param');

const regexp = /<target\s(.+?):(.+?)>([\s\S]+)?<\/target>/;

class Target {
  auth = undefined;
  backingStore = undefined;

  constructor(data = {}) {
    this.name = data.name;
    this.lun = data.lun;
    this.params = data.params;

    this._mapParams();
  }

  static parse(config) {
    const [, name, lun, content] = config.match(regexp);
    let params;

    if (content) {
      params = content
        .split(/\n/)
        // Фильтрация текстового комментария вида '# comment' где # с самого начала строки
        .filter((row) => row.length && !/^#\s/.test(row))
        .map((row) => Param.parse(row));
    }

    return new Target({ name, lun, params });
  }

  _mapParams() {
    if (!this.params) {
      return;
    }

    this._setAuth();
    this._setBackingStore();
  }

  _setAuth() {
    this.auth = new Auth(
      this._getUserData('incominguser'),
      this._getUserData('outgoinguser')
    );
  }

  _getUserData(userType) {
    const param = this.params.find(
      (p) => p.enabled && p.name === userType
    );

    if (!param) {
      return;
    }

    return {
      username: param.args[0],
      password: param.args[1],
    };
  }

  _setBackingStore() {
    const param = this.params.find((p) => p.name === BackingStore.name);
    const path = param ? param.args[0] : undefined;

    this.backingStore = new BackingStore(path);
  }

  _serializeFields() {
    let content = this.auth.serialize();
    content += this.backingStore.serialize();

    return content;
  }

  _serializeRawParams() {
    return this.params
      .map((param) => param.serialize())
      .join("\n");
  }

  serialize(serializeRawParams = false) {
    let content = `<target ${this.name}>\n`;
    content += serializeRawParams ? this._serializeRawParams() : this._serializeFields();
    return content + `</target>\n`;
  }

  /**
   * Форматирование в объект без params
   * @returns {{lun: string, auth: Auth, backingStore: BackingStore, name: string}}
   */
  toJson() {
    return {
      auth: this.auth,
      backingStore: this.backingStore,
      name: this.name,
      lun: this.lun,
    };
  }

  setParams(params) {
    this.params = params.map((param) => new Param(param));
    this._mapParams();
  }
}

module.exports = Target;
