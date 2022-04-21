import { Robot, Runner, makeRunner } from './Robot'
import { Stage, getCell, getBounds, easy, medium, hard } from './Stage'
import * as Vector from './Vector'

import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup"
import { javascript } from "@codemirror/lang-javascript"
import { CompletionContext, autocompletion } from "@codemirror/autocomplete"

// @ts-ignore
import { githubDark } from '@ddietr/codemirror-themes/dist/theme/github-dark'

const getElementById = (id: string) => {
    const el = document.getElementById(id)
    if (el == null) {
        throw new Error(`Can't find element with id ${id}`)
    }
    return el
}

type program = (_: Runner) => void

type state = {
    turn: number,
    robot: Robot | null,
    stage: Stage | null,
    program: program,
    running: boolean,
    canvas: HTMLCanvasElement | null,
    context: CanvasRenderingContext2D | null
}

const state: state = {
    turn: 0,
    robot: null,
    stage: null,
    program: (_: Runner) => { },
    running: false,
    canvas: null,
    context: null,
}

let CELL_WIDTH = 20

const getOffset = (stage: Stage) => {
    const bounds = getBounds(stage)
    const stageWidth = (bounds.right - bounds.left + 1) * CELL_WIDTH
    return ((state.canvas?.width || 0) - stageWidth) / 2
}

const renderStage = (context: CanvasRenderingContext2D, stage: Stage) => {
    const offset = getOffset(stage)

    for (let i = 0; i < stage.length; i++) {
        for (let j = 0; j < stage[0].length; j++) {
            const x = j * CELL_WIDTH + offset
            const y = i * CELL_WIDTH
            const grey = 255 - getCell(stage, { x: j, y: i }) * 255
            context.fillStyle = `rgb(${grey}, ${grey}, ${grey})`
            context.fillRect(x, y, CELL_WIDTH, CELL_WIDTH)

            context.beginPath()
            context.rect(x, y, CELL_WIDTH, CELL_WIDTH)
            context.strokeStyle = 'black'
            context.stroke()
        }
    }
}

const renderRobot = (context: CanvasRenderingContext2D, robot: Robot) => {
    context.beginPath()
    const x = robot.position.x * CELL_WIDTH + CELL_WIDTH / 2 + getOffset(robot.stage)
    const y = robot.position.y * CELL_WIDTH + CELL_WIDTH / 2
    const radius = CELL_WIDTH / 2 * 0.8
    context.arc(x, y, radius, 0, 2 * Math.PI)
    context.fillStyle = '#ff3b69'
    context.fill()
    context.strokeStyle = '#690c22'
    context.stroke()
}

const turnEl = getElementById('turn')
const positionEl = getElementById('position')
const oilEl = getElementById('oil')

const renderHUD = (robot: Robot) => {
    turnEl.textContent = state.turn.toString()
    positionEl.textContent = Vector.toString(robot.position)
    oilEl.textContent = robot.oil.toString()
}

const render = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, robot: Robot) => {
    context.clearRect(0, 0, canvas.width, canvas.height)
    renderStage(context, robot.stage)
    renderRobot(context, robot)
    renderHUD(robot)
}

const loop = () => {
    const { robot, program, canvas, context } = state
    if (robot == null || program == null || canvas == null || context == null) {
        throw new Error("Invalid state")
    }

    robot.acted = false
    render(canvas, context, robot)

    if (!state.running) return;
    state.turn++
    program(makeRunner(robot))
}

const MAX_SPEED = 1000

const bindSpeedControl = (control: HTMLInputElement, display: HTMLElement, callback: (_: number) => void) => {
    const listener = () => {
        display.textContent = `${control.value}x`
        callback(Number(control.value))
    }
    control.addEventListener('change', listener)
    listener()
}

const randomInt = (max: number) => Math.floor(Math.random() * max)

const makeRandomPosition = (stage: Stage): Vector.Vector => {
    const bounds = getBounds(stage)

    return {
        x: randomInt(bounds.right - bounds.left),
        y: randomInt(bounds.bottom - bounds.top),
    }
}

const setCellWidth = (stage: Stage) => {
    const canvasWidth = state.canvas?.width || 1
    const canvasHeight = state.canvas?.height || 1
    const bounds = getBounds(stage)

    const width = canvasWidth / (bounds.right - bounds.left + 1)
    const height = canvasHeight / (bounds.bottom - bounds.top + 1)

    CELL_WIDTH = Math.min(width, height)
}

const reset = (stage: Stage) => {
    state.stage = stage
    state.turn = 0
    state.robot = {
        position: makeRandomPosition(stage),
        oil: 0,
        stage: stage,
        acted: false,
    }

    setCellWidth(stage)
}

export const start = (id: string) => {
    const canvas = getElementById(id) as HTMLCanvasElement

    const context = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (context == null) {
        throw new Error("Element isn't a canvas")
    }

    state.canvas = canvas
    state.context = context
    reset(easy)

    let intervalId: number | undefined
    const callback = () => {
        try {
            loop()
        } catch (e) {
            console.error(e)
            clearInterval(intervalId)
        }
    }

    const startLoop = (speed: number) => {
        intervalId = setInterval(callback, 1000 / speed)
    }
    startLoop(1)

    bindSpeedControl(getElementById('speed') as HTMLInputElement, getElementById('speed-display'), speed => {
        clearInterval(intervalId)
        startLoop(speed)
    })
}

const difficulties: Record<string, Stage> = {
    easy: easy,
    medium: medium,
    hard: hard,
}

const stageSelect = getElementById('stage') as HTMLSelectElement
stageSelect.addEventListener('change', () => {
    const stageKey = stageSelect.value
    const stage = difficulties[stageKey]
    if (stage == null) {
        throw new Error(`Invalid stage: ${stageKey}`)
    }
    reset(stage)
})

const saveProgram = (program: string) => {
    localStorage.setItem('program', program)
}

const defaultProgram = "const program = (robot) => {\n\t/* WRITE YOUR PROGRAM HERE */\n}"

const loadProgram = () => {
    return localStorage.getItem('program') || defaultProgram
}

const throttle = (f: (...args: any) => void, timeFrame: number) => {
    var lastTime = 0;
    return function (...args: any) {
        var now = Date.now();
        if (now - lastTime >= timeFrame) {
            f(...args);
            lastTime = now;
        }
    };
}

const saveOnUpdate = throttle(saveProgram, 1000)

const robotCompletions = (context: CompletionContext) => {
    let word = context.matchBefore(/\w*/)
    if (!word || word.from == word.to && !context.explicit) {
        return null
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
    }
}

let editor = new EditorView({
    state: EditorState.create({
        extensions: [
            basicSetup,
            javascript(),
            githubDark,
            autocompletion({ override: [robotCompletions] }),
            EditorView.updateListener.of(update => {
                if (update.docChanged) {
                    saveOnUpdate(update.state.doc.toString())
                }
            }),
        ],
        doc: loadProgram()
    }),
    parent: document.getElementById('program') as Element,

})

const startButton = getElementById('start') as HTMLButtonElement
const stopButton = getElementById('stop') as HTMLButtonElement
stopButton.disabled = true

startButton.addEventListener('click', () => {
    if (state.running) return;

    startButton.disabled = true
    stopButton.disabled = false

    state.program = Function(editor.state.doc.toString() + '; return program;')()
    state.running = true
    loop()
})

stopButton.addEventListener('click', () => {
    if (!state.running) return;

    stopButton.disabled = true
    startButton.disabled = false

    reset(state.stage as Stage)

    state.running = false
    loop()
})

const modal = getElementById('modal')

getElementById('help-button').addEventListener('click', () => {
    modal.classList.remove('disabled')
})

getElementById('modal-close').addEventListener('click', () => {
    modal.classList.add('disabled')
})