import {Auth, BackingStore, IpFilter, IncomingUser, OutgoingUser, IUser, IAuth} from './fields';
import {IParam, Param} from './Param';

interface IData {
  name?: string;
  lun?: string;
  params?: Param[];
}

export interface ITarget {
  name: string;
  lun: string;
  auth: IAuth;
  backingStore: string;
  ipFilter: string;
}

export class Target {
  static readonly REGEXP = /<target\s(.+?):(.+?)>([\s\S]+)?<\/target>/;

  name: string;
  lun: string;
  params: Param[];
  auth: Auth;
  backingStore: BackingStore;
  ipFilter: IpFilter;

  constructor(data: IData = {}) {
    this.name = data.name;
    this.lun = data.lun;
    this.params = data.params;

    this._mapParams();
  }

  static parse(config: string): Target {
    const [, name, lun, content] = config.match(this.REGEXP);
    let params: IParam[];

    if (content) {
      params = content
        .split(/\n/)
        // Фильтрация текстового комментария вида '# comment' где # с самого начала строки
        .filter((row) => row.trim().length && !/^#\s/.test(row))
        .map((row): Param => Param.parse(row));
    }

    return new Target({ name, lun, params } as IData);
  }

  static fromJson(data: ITarget): Target {
    const target = new Target(data);
    target.backingStore = new BackingStore(data.backingStore);
    target.ipFilter = new IpFilter(data.ipFilter);
    target.auth = new Auth(data.auth.incomingUser, data.auth.outgoingUser);

    return target;
  }

  serialize(serializeRawParams = false): string {
    let content = `<target ${this.name}:${this.lun}>\n`;
    content += serializeRawParams ? this._serializeRawParams() : this._serializeFields();

    return content + `</target>\n`;
  }

  /**
   * Форматирование в объект без params
   */
  toJson(): ITarget {
    return {
      name: this.name,
      lun: this.lun,
      auth: this.auth.toJson(),
      backingStore: this.backingStore.toJson(),
      ipFilter: this.ipFilter.toJson(),
    };
  }

  findParam(name) {
    return this.params.find((p) => p.enabled && p.name === name);
  }

  /**
   * Внимание! Все ссылки на поля класса будут обновлены.
   * @param params
   */
  setParams(params: IParam[]) {
    this.params = params.map((param) => new Param(param));
    this._mapParams();
  }

  private _mapParams() {
    if (!this.params) {
      return;
    }

    this._setAuth();
    this._setBackingStore();
    this._setIpFilter();
  }

  private _setAuth() {
    this.auth = new Auth(
      this._getUserData(IncomingUser.Name),
      this._getUserData(OutgoingUser.Name)
    );
  }

  private _getUserData(userType): IUser|undefined {
    const param = this.findParam(userType);

    if (!param) {
      return;
    }

    return {
      username: param.args[0],
      password: param.args[1],
    };
  }

  private _setBackingStore() {
    const param = this.findParam(BackingStore.Name);
    const path = param ? param.args[0] : undefined;

    this.backingStore = new BackingStore(path);
  }

  private _setIpFilter() {
    const param = this.findParam(IpFilter.Name);
    const ip = param ? param.args[0] : undefined;

    this.ipFilter = new IpFilter(ip);
  }

  private _serializeFields(): string {
    let content = this.auth.serialize();
    content += this.backingStore.serialize();
    content += this.ipFilter.serialize();

    return content;
  }

  private _serializeRawParams(): string {
    return this.params
      .map((param) => param.serialize())
      .join("\n");
  }
}
