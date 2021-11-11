"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Param {
    constructor(data = {}) {
        this.name = data.name;
        this.args = data.args;
        this.enabled = typeof data.enabled === 'boolean' ? data.enabled : true;
    }
    static parse(row) {
        const [name, ...args] = row.match(/\S+/g);
        return new Param({
            name, args, enabled: name.indexOf('#') !== 0
        });
    }
    serialize() {
        const ds = this.enabled ? '' : '#';
        return `${ds}${this.name} ${this.args.join(' ')}`;
    }
}
exports.default = Param;
//# sourceMappingURL=Param.js.map