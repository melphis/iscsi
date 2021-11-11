"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Field {
    constructor(arg) {
        this.arg = arg;
    }
    get name() {
        throw new Error('Field `name` must be defined');
    }
    static get Name() {
        throw new Error('Static field `Name` must be defined');
    }
    serialize() {
        return !this.arg ? '' : `${this.name} ${this.arg}\n`;
    }
}
exports.default = Field;
//# sourceMappingURL=Field.js.map