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
const autocomplete_1 = require("@codemirror/autocomplete");
// @ts-ignore
const github_dark_1 = require("@ddietr/codemirror-themes/dist/theme/github-dark");
const getElementById = (id) => {
    const el = document.getElementById(id);
    if (el == null) {
        throw new Error(`Can't find element with id ${id}`);
    }
    return el;
};
const state = {
    turn: 0,
    robot: null,
    stage: null,
    program: (_) => { },
    running: false,
    canvas: null,
    context: null,
};
let CELL_WIDTH = 20;
const getOffset = (stage) => {
    var _a;
    const bounds = (0, Stage_1.getBounds)(stage);
    const stageWidth = (bounds.right - bounds.left + 1) * CELL_WIDTH;
    return ((((_a = state.canvas) === null || _a === void 0 ? void 0 : _a.width) || 0) - stageWidth) / 2;
};
const renderStage = (context, stage) => {
    const offset = getOffset(stage);
    for (let i = 0; i < stage.length; i++) {
        for (let j = 0; j < stage[0].length; j++) {
            const x = j * CELL_WIDTH + offset;
            const y = i * CELL_WIDTH;
            const grey = 255 - (0, Stage_1.getCell)(stage, { x: j, y: i }) * 255;
            context.fillStyle = `rgb(${grey}, ${grey}, ${grey})`;
            context.fillRect(x, y, CELL_WIDTH, CELL_WIDTH);
            context.beginPath();
            context.rect(x, y, CELL_WIDTH, CELL_WIDTH);
            context.strokeStyle = 'black';
            context.stroke();
        }
    }
};
const renderRobot = (context, robot) => {
    context.beginPath();
    const x = robot.position.x * CELL_WIDTH + CELL_WIDTH / 2 + getOffset(robot.stage);
    const y = robot.position.y * CELL_WIDTH + CELL_WIDTH / 2;
    const radius = CELL_WIDTH / 2 * 0.8;
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fillStyle = '#ff3b69';
    context.fill();
    context.strokeStyle = '#690c22';
    context.stroke();
};
const turnEl = getElementById('turn');
const positionEl = getElementById('position');
const oilEl = getElementById('oil');
const renderHUD = (robot) => {
    turnEl.textContent = state.turn.toString();
    positionEl.textContent = Vector.toString(robot.position);
    oilEl.textContent = robot.oil.toString();
};
const render = (canvas, context, robot) => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    renderStage(context, robot.stage);
    renderRobot(context, robot);
    renderHUD(robot);
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
const randomInt = (max) => Math.floor(Math.random() * max);
const makeRandomPosition = (stage) => {
    const bounds = (0, Stage_1.getBounds)(stage);
    return {
        x: randomInt(bounds.right - bounds.left),
        y: randomInt(bounds.bottom - bounds.top),
    };
};
const setCellWidth = (stage) => {
    var _a, _b;
    const canvasWidth = ((_a = state.canvas) === null || _a === void 0 ? void 0 : _a.width) || 1;
    const canvasHeight = ((_b = state.canvas) === null || _b === void 0 ? void 0 : _b.height) || 1;
    const bounds = (0, Stage_1.getBounds)(stage);
    const width = canvasWidth / (bounds.right - bounds.left + 1);
    const height = canvasHeight / (bounds.bottom - bounds.top + 1);
    CELL_WIDTH = Math.min(width, height);
};
const reset = (stage) => {
    state.stage = stage;
    state.turn = 0;
    state.robot = {
        position: makeRandomPosition(stage),
        oil: 0,
        stage: stage,
        acted: false,
    };
    setCellWidth(stage);
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
const saveProgram = (program) => {
    localStorage.setItem('program', program);
};
const defaultProgram = "const program = (robot) => {\n\t/* WRITE YOUR PROGRAM HERE */\n}";
const loadProgram = () => {
    return localStorage.getItem('program') || defaultProgram;
};
const throttle = (f, timeFrame) => {
    var lastTime = 0;
    return function (...args) {
        var now = Date.now();
        if (now - lastTime >= timeFrame) {
            f(...args);
            lastTime = now;
        }
    };
};
const saveOnUpdate = throttle(saveProgram, 1000);
const robotCompletions = (context) => {
    let word = context.matchBefore(/\w*/);
    if (!word || word.from == word.to && !context.explicit) {
        return null;
    }
    return {
        from: word.from,
        options: [
            { label: "robot.moveUp()", type: "function", info: "Moves up 1 square. Uses action." },
            { label: "robot.moveRight()", type: "function", info: "Moves right 1 square. Uses action." },
            { label: "robot.moveDown()", type: "function", info: "Moves down 1 square. Uses action." },
            { label: "robot.moveLeft()", type: "function", info: "Moves left 1 square. Uses action." },
            { label: "robot.drill()", type: "function", info: "Drills under the current position to get oil. Uses action." },
            { label: "robot.useSensor()", type: "function", info: "Returns a measurement of how much oil there is in the surroundings. Doesn't use action." },
            { label: "robot.getPosition()", type: "function", info: "Returns the robot's position. Doesn't use action." },
        ]
    };
};
let editor = new basic_setup_1.EditorView({
    state: basic_setup_1.EditorState.create({
        extensions: [
            basic_setup_1.basicSetup,
            (0, lang_javascript_1.javascript)(),
            github_dark_1.githubDark,
            (0, autocomplete_1.autocompletion)({ override: [robotCompletions] }),
            basic_setup_1.EditorView.updateListener.of(update => {
                if (update.docChanged) {
                    saveOnUpdate(update.state.doc.toString());
                }
            }),
        ],
        doc: loadProgram()
    }),
    parent: document.getElementById('program'),
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
const modal = getElementById('modal');
getElementById('help-button').addEventListener('click', () => {
    modal.classList.remove('disabled');
});
getElementById('modal-close').addEventListener('click', () => {
    modal.classList.add('disabled');
});
