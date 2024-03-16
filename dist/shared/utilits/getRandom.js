"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandom = void 0;
const getRandom = (length) => {
    return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)).toString();
};
exports.getRandom = getRandom;
//# sourceMappingURL=getRandom.js.map