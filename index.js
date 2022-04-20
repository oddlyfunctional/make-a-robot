"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Engine_1 = require("./Engine");
// let measurement = null
// let max = -1
// const program = (robot) => {
//     if (measurement == null) {
//         measurement = robot.useSensor()
//     } else {
//         const directions = [measurement.top, measurement.right, measurement.bottom, measurement.left]
//         measurement = null
//         let maxIndex = 0
//         directions.forEach((direction, index) => {
//             if (direction > directions[maxIndex]) {
//                 maxIndex = index
//             }
//         })
//         if (directions[maxIndex] >= max) {
//             max = directions[maxIndex]
//             const movements = [robot.moveUp, robot.moveRight, robot.moveDown, robot.moveLeft]
//             movements[maxIndex]()
//         } else {
//             robot.drill()
//         }
//     }
// }
(0, Engine_1.start)('canvas');
