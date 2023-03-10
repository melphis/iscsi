import Field from './Field';
const name = 'initiator-address';
export default class IpFilter extends Field {
    static get Name() {
        return name;
    }
    ;
    get name() {
        return name;
    }
    ;
    toJson() {
        return this.arg;
    }
}
//# sourceMappingURL=IpFilter.js.map