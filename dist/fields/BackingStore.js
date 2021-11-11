"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Field_1 = require("./Field");
const name = 'backing-store';
class BackingStore extends Field_1.default {
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
exports.default = BackingStore;
//# sourceMappingURL=BackingStore.js.map