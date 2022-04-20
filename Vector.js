"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toString = exports.add = exports.LEFT = exports.DOWN = exports.RIGHT = exports.UP = void 0;
exports.UP = { x: 0, y: -1 };
exports.RIGHT = { x: 1, y: 0 };
exports.DOWN = { x: 0, y: 1 };
exports.LEFT = { x: -1, y: 0 };
const add = (v1, v2) => {
    return {
        x: v1.x + v2.x,
        y: v1.y + v2.y,
    };
};
exports.add = add;
const toString = (position) => `(${position.x}, ${position.y})`;
exports.toString = toString;
