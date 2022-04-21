import { Vector } from './Vector'

export type Stage = Array<Array<number>>
type Rectangle = {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

export const getBounds = (stage: Stage): Rectangle => {
    return {
        top: 0,
        left: 0,
        right: stage[0].length - 1,
        bottom: stage.length - 1,
    }
}

export const getCell = (stage: Stage, position: Vector): number => {
    const row = stage[position.y]
    let cell = -1
    if (row !== undefined) {
        cell = row[position.x]
    }
    return cell
}

export const easy: Stage = [
    [0.1, 0.2, 0.2, 0.2, 0.1],
    [0.2, 0.3, 0.5, 0.3, 0.2],
    [0.2, 0.5, 1.0, 0.5, 0.2],
    [0.2, 0.3, 0.5, 0.3, 0.2],
    [0.1, 0.2, 0.2, 0.2, 0.1],
]

export const medium: Stage = [
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,],
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,],
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,],
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.2, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,],
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.3, 0.5, 0.3, 0.0, 0.0, 0.0, 0.0, 0.0,],
    [0.0, 0.0, 0.0, 0.0, 0.2, 0.5, 1.0, 0.5, 0.2, 0.0, 0.0, 0.0, 0.0,],
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.3, 0.5, 0.3, 0.0, 0.0, 0.0, 0.0, 0.0,],
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.2, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,],
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,],
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,],
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,],
]

export const hard: Stage = [
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.3, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    [0.0, 0.0, 0.0, 0.0, 0.3, 0.4, 0.3, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    [0.0, 0.0, 0.0, 0.3, 0.4, 0.5, 0.4, 0.3, 0.0, 0.0, 0.0, 0.0, 0.0, 0.3, 0.0, 0.0, 0.0],
    [0.0, 0.0, 0.2, 0.3, 0.5, 0.6, 0.5, 0.3, 0.2, 0.0, 0.0, 0.0, 0.3, 0.7, 0.3, 0.0, 0.0],
    [0.0, 0.2, 0.3, 0.3, 0.5, 0.6, 0.5, 0.3, 0.3, 0.2, 0.0, 0.3, 0.7, 1.0, 0.7, 0.3, 0.0],
    [0.0, 0.0, 0.2, 0.3, 0.5, 0.6, 0.5, 0.3, 0.2, 0.0, 0.0, 0.0, 0.3, 0.7, 0.3, 0.0, 0.0],
    [0.0, 0.0, 0.0, 0.3, 0.4, 0.5, 0.4, 0.3, 0.0, 0.0, 0.0, 0.0, 0.0, 0.3, 0.0, 0.0, 0.0],
    [0.0, 0.0, 0.0, 0.0, 0.3, 0.4, 0.3, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.3, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
]