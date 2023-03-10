import { Auth, BackingStore, IpFilter, IncomingUser, OutgoingUser } from './fields';
import { Param } from './Param';
export class Target {
    static REGEXP = /<target\s(.+?):(.+?)>([\s\S]+)?<\/target>/;
    name;
    lun;
    params;
    auth;
    backingStore;
    ipFilter;
    constructor(data = {}) {
        this.name = data.name;
        this.lun = data.lun;
        this.params = data.params;
        this._mapParams();
    }
    static parse(config) {
        const [, name, lun, content] = config.match(this.REGEXP);
        let params;
        if (content) {
            params = content
                .split(/\n/)
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
    serialize(serializeRawParams = false) {
        let content = `<target ${this.name}:${this.lun}>\n`;
        content += serializeRawParams ? this._serializeRawParams() : this._serializeFields();
        return content + `</target>\n`;
    }
    toJson() {
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
    setParams(params) {
        this.params = params.map((param) => new Param(param));
        this._mapParams();
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
        this.auth = new Auth(this._getUserData(IncomingUser.Name), this._getUserData(OutgoingUser.Name));
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
}
//# sourceMappingURL=Target.js.map