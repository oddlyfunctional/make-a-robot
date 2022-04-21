import * as Stage from './Stage'
import * as Vector from './Vector'

export type Robot = {
  position: Vector.Vector;
  oil: number;
  stage: Stage.Stage;
  acted: boolean;
}

export type Measurement = {
  center: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
}

const act = (fn: (robot: Robot) => any) => {
  return (robot: Robot) => {
    if (robot.acted) {
      throw new Error("Already acted this turn.")
    }
    robot.acted = true
    return fn(robot)
  }
}

const move = (robot: Robot, movement: Vector.Vector) => {
  const newPosition = Vector.add(robot.position, movement)
  const bounds = Stage.getBounds(robot.stage)
  if (newPosition.x < bounds.left || newPosition.x > bounds.right || newPosition.y < bounds.top || newPosition.y > bounds.bottom) {
    throw new Error(`Invalid position: ${Vector.toString(newPosition)}`)
  }
  robot.position = newPosition
}

export const moveUp = act(robot => move(robot, Vector.UP))
export const moveRight = act(robot => move(robot, Vector.RIGHT))
export const moveDown = act(robot => move(robot, Vector.DOWN))
export const moveLeft = act(robot => move(robot, Vector.LEFT))
export const drill = act((robot: Robot) => {
  robot.oil += Stage.getCell(robot.stage, robot.position)
})
export const useSensor = (robot: Robot): Measurement => {
  return {
    center: Stage.getCell(robot.stage, robot.position),
    top: Stage.getCell(robot.stage, Vector.add(robot.position, Vector.UP)),
    right: Stage.getCell(robot.stage, Vector.add(robot.position, Vector.RIGHT)),
    bottom: Stage.getCell(robot.stage, Vector.add(robot.position, Vector.DOWN)),
    left: Stage.getCell(robot.stage, Vector.add(robot.position, Vector.LEFT)),
  }
}


export type Runner = {
  moveUp: (_: void) => void,
  moveRight: (_: void) => void,
  moveDown: (_: void) => void,
  moveLeft: (_: void) => void,
  drill: (_: void) => void,
  useSensor: (_: void) => Measurement,
  getPosition: (_: void) => Vector.Vector,
}

export const makeRunner = (robot: Robot): Runner => {
  return {
    moveUp: () => moveUp(robot),
    moveRight: () => moveRight(robot),
    moveDown: () => moveDown(robot),
    moveLeft: () => moveLeft(robot),
    drill: () => drill(robot),
    useSensor: () => useSensor(robot),
    getPosition: () => ({...robot.position}),
  }
}