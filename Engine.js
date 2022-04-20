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
exports.start = void 0;
const Robot_1 = require("./Robot");
const Stage_1 = require("./Stage");
const Vector = __importStar(require("./Vector"));
const basic_setup_1 = require("@codemirror/basic-setup");
const lang_javascript_1 = require("@codemirror/lang-javascript");
const state = {
    turn: 0,
    robot: null,
    stage: null,
    program: (_) => { },
    running: false,
    canvas: null,
    context: null,
};
const SIZE = 10;
const renderStage = (context, stage) => {
    for (let i = 0; i < stage.length; i++) {
        for (let j = 0; j < stage[0].length; j++) {
            const x = j * SIZE;
            const y = i * SIZE;
            const grey = 255 - (0, Stage_1.getCell)(stage, { x: j, y: i }) * 255;
            context.fillStyle = `rgb(${grey}, ${grey}, ${grey})`;
            context.fillRect(x, y, SIZE, SIZE);
            context.beginPath();
            context.rect(x, y, SIZE, SIZE);
            context.strokeStyle = 'black';
            context.stroke();
        }
    }
};
const renderRobot = (context, robot) => {
    context.beginPath();
    context.arc(robot.position.x * SIZE + SIZE / 2, robot.position.y * SIZE + SIZE / 2, SIZE / 2, 0, 2 * Math.PI);
    context.fillStyle = 'red';
    context.fill();
};
const renderHUD = (context, robot) => {
    const bounds = (0, Stage_1.getBounds)(robot.stage);
    const offset = bounds.right * SIZE + 50;
    const rowHeight = 20;
    context.fillStyle = 'black';
    context.font = '16px Arial';
    let rows = [
        `turn: ${state.turn}`,
        `pos: ${Vector.toString(robot.position)}`,
        `oil: ${robot.oil}`,
    ];
    rows.forEach((row, index) => {
        context.fillText(row, offset, rowHeight * (index + 1));
    });
};
const render = (canvas, context, robot) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    renderStage(context, robot.stage);
    renderRobot(context, robot);
    renderHUD(context, robot);
};
const loop = () => {
    const { robot, program, canvas, context } = state;
    if (robot == null || program == null || canvas == null || context == null) {
        throw new Error("Invalid state");
    }
    robot.acted = false;
    render(canvas, context, robot);
    if (!state.running)
        return;
    state.turn++;
    program((0, Robot_1.makeRunner)(robot));
};
const MAX_SPEED = 1000;
const bindSpeedControl = (control, display, callback) => {
    const listener = () => {
        display.textContent = `${control.value}x`;
        callback(Number(control.value));
    };
    control.addEventListener('change', listener);
    listener();
};
const getElementById = (id) => {
    const el = document.getElementById(id);
    if (el == null) {
        throw new Error(`Can't find element with id ${id}`);
    }
    return el;
};
const reset = (stage) => {
    state.stage = stage;
    state.turn = 0;
    state.robot = {
        position: { x: 0, y: 0 },
        oil: 0,
        stage: stage,
        acted: false,
    };
};
const start = (id) => {
    const canvas = getElementById(id);
    const context = canvas.getContext("2d");
    if (context == null) {
        throw new Error("Element isn't a canvas");
    }
    state.canvas = canvas;
    state.context = context;
    reset(Stage_1.easy);
    let intervalId;
    const callback = () => {
        try {
            loop();
        }
        catch (e) {
            console.error(e);
            clearInterval(intervalId);
        }
    };
    const startLoop = (speed) => {
        intervalId = setInterval(callback, 1000 / speed);
    };
    startLoop(1);
    bindSpeedControl(getElementById('speed'), getElementById('speed-display'), speed => {
        clearInterval(intervalId);
        startLoop(speed);
    });
};
exports.start = start;
const difficulties = {
    easy: Stage_1.easy,
    medium: Stage_1.medium,
    hard: Stage_1.hard,
};
const stageSelect = getElementById('stage');
stageSelect.addEventListener('change', () => {
    const stageKey = stageSelect.value;
    const stage = difficulties[stageKey];
    if (stage == null) {
        throw new Error(`Invalid stage: ${stageKey}`);
    }
    reset(stage);
});
let editor = new basic_setup_1.EditorView({
    state: basic_setup_1.EditorState.create({
        extensions: [basic_setup_1.basicSetup, (0, lang_javascript_1.javascript)()],
        doc: "const program = (robot) => {\n\t/* WRITE YOUR PROGRAM HERE */\n}"
    }),
    parent: document.getElementById('program')
});
const startButton = getElementById('start');
const stopButton = getElementById('stop');
stopButton.disabled = true;
startButton.addEventListener('click', () => {
    if (state.running)
        return;
    startButton.disabled = true;
    stopButton.disabled = false;
    state.program = Function(editor.state.doc.toString() + '; return program;')();
    state.running = true;
    loop();
});
stopButton.addEventListener('click', () => {
    if (!state.running)
        return;
    stopButton.disabled = true;
    startButton.disabled = false;
    reset(state.stage);
    state.running = false;
    loop();
});
