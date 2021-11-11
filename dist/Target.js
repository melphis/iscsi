"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Target = void 0;
const fields_1 = require("./fields");
const Param_1 = require("./Param");
class Target {
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
                // Фильтрация текстового комментария вида '# comment' где # с самого начала строки
                .filter((row) => row.trim().length && !/^#\s/.test(row))
                .map((row) => Param_1.default.parse(row));
        }
        return new Target({ name, lun, params });
    }
    static fromJson(data) {
        const target = new Target(data);
        target.backingStore = new fields_1.BackingStore(data.backingStore);
        target.ipFilter = new fields_1.IpFilter(data.ipFilter);
        target.auth = new fields_1.Auth(data.auth.incomingUser, data.auth.outgoingUser);
        return target;
    }
    serialize(serializeRawParams = false) {
        let content = `<target ${this.name}:${this.lun}>\n`;
        content += serializeRawParams ? this._serializeRawParams() : this._serializeFields();
        return content + `</target>\n`;
    }
    /**
     * Форматирование в объект без params
     */
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
    /**
     * Внимание! Все ссылки на поля класса будут обновлены.
     * @param params
     */
    setParams(params) {
        this.params = params.map((param) => new Param_1.default(param));
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
        this.auth = new fields_1.Auth(this._getUserData(fields_1.IncomingUser.Name), this._getUserData(fields_1.OutgoingUser.Name));
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
        const param = this.findParam(fields_1.BackingStore.Name);
        const path = param ? param.args[0] : undefined;
        this.backingStore = new fields_1.BackingStore(path);
    }
    _setIpFilter() {
        const param = this.findParam(fields_1.IpFilter.Name);
        const ip = param ? param.args[0] : undefined;
        this.ipFilter = new fields_1.IpFilter(ip);
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
exports.Target = Target;
Target.REGEXP = /<target\s(.+?):(.+?)>([\s\S]+)?<\/target>/;
//# sourceMappingURL=Target.js.map