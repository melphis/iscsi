"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Field_1 = require("./Field");
const name = 'initiator-address';
class IpFilter extends Field_1.default {
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
exports.default = IpFilter;
//# sourceMappingURL=IpFilter.js.map