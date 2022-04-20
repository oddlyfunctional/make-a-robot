import { Robot, Runner, makeRunner } from './Robot'
import { Stage, getCell, getBounds, easy, medium, hard } from './Stage'
import * as Vector from './Vector'

import {EditorState, EditorView, basicSetup} from "@codemirror/basic-setup"
import {javascript} from "@codemirror/lang-javascript"


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
    program: (_: Runner) => {},
    running: false,
    canvas: null,
    context: null,
}

const SIZE = 10

const renderStage = (context: CanvasRenderingContext2D, stage: Stage) => {
    for(let i = 0; i < stage.length; i++) {
        for (let j = 0; j < stage[0].length; j++) {
            const x = j * SIZE
            const y = i * SIZE
            const grey = 255 - getCell(stage, {x: j, y: i}) * 255
            context.fillStyle = `rgb(${grey}, ${grey}, ${grey})`
            context.fillRect(x, y, SIZE, SIZE)

            context.beginPath()
            context.rect(x, y, SIZE, SIZE)
            context.strokeStyle = 'black'
            context.stroke()
        }
    }
}

const renderRobot = (context: CanvasRenderingContext2D, robot: Robot) => {
    context.beginPath()
    context.arc(robot.position.x * SIZE + SIZE / 2, robot.position.y * SIZE + SIZE / 2, SIZE / 2, 0, 2 * Math.PI)
    context.fillStyle = 'red'
    context.fill()
}

const renderHUD = (context: CanvasRenderingContext2D, robot: Robot) => {
    const bounds = getBounds(robot.stage)
    const offset = bounds.right * SIZE + 50
    const rowHeight = 20

    context.fillStyle = 'black'
    context.font = '16px Arial'

    let rows = [
        `turn: ${state.turn}`,
        `pos: ${Vector.toString(robot.position)}`,
        `oil: ${robot.oil}`,
    ]
    rows.forEach((row, index) => {
        context.fillText(row, offset, rowHeight * (index + 1))
    })
}

const render = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, robot: Robot) => {
    context.clearRect(0, 0, canvas.width, canvas.height)
    renderStage(context, robot.stage)
    renderRobot(context, robot)
    renderHUD(context, robot)
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

const getElementById = (id: string) => {
    const el = document.getElementById(id)
    if (el == null) {
        throw new Error(`Can't find element with id ${id}`)
    }
    return el
}

const randomInt = (max: number) => Math.floor(Math.random() * max)

const makeRandomPosition = (stage: Stage): Vector.Vector => {
    const bounds = getBounds(stage)

    return {
        x: randomInt(bounds.right - bounds.left),
        y: randomInt(bounds.bottom - bounds.top),
    }
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

let editor = new EditorView({
    state: EditorState.create({
      extensions: [basicSetup, javascript()],
      doc: "const program = (robot) => {\n\t/* WRITE YOUR PROGRAM HERE */\n}"
    }),
    parent: document.getElementById('program') as Element
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
