const Auth = require('./fields/Auth');
const BackingStore = require('./fields/BackingStore');
const IpFilter = require('./fields/IpFilter');
const users = require('./fields/Users');
const Param = require('./Param');

const regexp = /<target\s(.+?):(.+?)>([\s\S]+)?<\/target>/;

class Target {
  auth = undefined;
  backingStore = undefined;
  ipFilter = undefined;

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
        .filter((row) => row.trim().length && !/^#\s/.test(row))
        .map((row) => Param.parse(row));
    }

    return new Target({ name, lun, params });
  }

  static fromJson(data) {
    const target = new Target(data);
    target.backingStore = new BackingStore(data.backingStore);
    target.ipFilter = new IpFilter(data.ipFilter);
    target.auth = new Auth(data.auth.incomingUser, data.auth.outgoingUser);

    return target;
  }

  _mapParams() {
    if (!this.params) {
      return;
    }

    this._setAuth();
    this._setBackingStore();
    this._setIpFilter();
  }

  _setAuth() {
    this.auth = new Auth(
      this._getUserData(users.IncomingUser.Name),
      this._getUserData(users.OutgoingUser.Name)
    );
  }

  _getUserData(userType) {
    const param = this.findParam(userType);

    if (!param) {
      return;
    }

    return {
      username: param.args[0],
      password: param.args[1],
    };
  }

  _setBackingStore() {
    const param = this.findParam(BackingStore.Name);
    const path = param ? param.args[0] : undefined;

    this.backingStore = new BackingStore(path);
  }

  _setIpFilter() {
    const param = this.findParam(IpFilter.Name);
    const ip = param ? param.args[0] : undefined;

    this.ipFilter = new IpFilter(ip);
  }

  _serializeFields() {
    let content = this.auth.serialize();
    content += this.backingStore.serialize();
    content += this.ipFilter.serialize();

    return content;
  }

  _serializeRawParams() {
    return this.params
      .map((param) => param.serialize())
      .join("\n");
  }

  serialize(serializeRawParams = false) {
    let content = `<target ${this.name}:${this.lun}>\n`;
    content += serializeRawParams ? this._serializeRawParams() : this._serializeFields();

    return content + `</target>\n`;
  }

  /**
   * Форматирование в объект без params
   * @returns {{lun: string, auth: object, backingStore: string, name: string}}
   */
  toJson() {
    return {
      name: this.name,
      lun: this.lun,
      auth: this.auth.toJson(),
      backingStore: this.backingStore.arg,
      ipFilter: this.ipFilter.arg,
    };
  }

  findParam(name) {
    return this.params.find((p) => p.enabled && p.name === name);
  }

  /**
   * Внимание! Все ссылки на поля класса будут обновлены.
   * @param params
   */
  setParams(params) {
    this.params = params.map((param) => new Param(param));
    this._mapParams();
  }
}

module.exports = Target;
