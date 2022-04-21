"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeRunner = exports.useSensor = exports.drill = exports.moveLeft = exports.moveDown = exports.moveRight = exports.moveUp = void 0;
const Stage = __importStar(require("./Stage"));
const Vector = __importStar(require("./Vector"));
const act = (fn) => {
    return (robot) => {
        if (robot.acted) {
            throw new Error("Already acted this turn.");
        }
        robot.acted = true;
        return fn(robot);
    };
};
const move = (robot, movement) => {
    const newPosition = Vector.add(robot.position, movement);
    const bounds = Stage.getBounds(robot.stage);
    if (newPosition.x < bounds.left || newPosition.x > bounds.right || newPosition.y < bounds.top || newPosition.y > bounds.bottom) {
        throw new Error(`Invalid position: ${Vector.toString(newPosition)}`);
    }
    robot.position = newPosition;
};
exports.moveUp = act(robot => move(robot, Vector.UP));
exports.moveRight = act(robot => move(robot, Vector.RIGHT));
exports.moveDown = act(robot => move(robot, Vector.DOWN));
exports.moveLeft = act(robot => move(robot, Vector.LEFT));
exports.drill = act((robot) => {
    robot.oil += Stage.getCell(robot.stage, robot.position);
});
const useSensor = (robot) => {
    return {
        center: Stage.getCell(robot.stage, robot.position),
        top: Stage.getCell(robot.stage, Vector.add(robot.position, Vector.UP)),
        right: Stage.getCell(robot.stage, Vector.add(robot.position, Vector.RIGHT)),
        bottom: Stage.getCell(robot.stage, Vector.add(robot.position, Vector.DOWN)),
        left: Stage.getCell(robot.stage, Vector.add(robot.position, Vector.LEFT)),
    };
};
exports.useSensor = useSensor;
const makeRunner = (robot) => {
    return {
        moveUp: () => (0, exports.moveUp)(robot),
        moveRight: () => (0, exports.moveRight)(robot),
        moveDown: () => (0, exports.moveDown)(robot),
        moveLeft: () => (0, exports.moveLeft)(robot),
        drill: () => (0, exports.drill)(robot),
        useSensor: () => (0, exports.useSensor)(robot),
        getPosition: () => (Object.assign({}, robot.position)),
    };
};
exports.makeRunner = makeRunner;
