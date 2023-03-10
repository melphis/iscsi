export class Param {
    name;
    args;
    enabled;
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
//# sourceMappingURL=Param.js.map