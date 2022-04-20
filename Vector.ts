export type Vector = {
    x: number;
    y: number;
}

export const UP: Vector = { x: 0, y: -1 }
export const RIGHT: Vector = { x: 1, y: 0 }
export const DOWN: Vector = { x: 0, y: 1 }
export const LEFT: Vector = { x: -1, y: 0 }

export const add = (v1: Vector, v2: Vector) => {
    return {
        x: v1.x + v2.x,
        y: v1.y + v2.y,
    }
}

export const toString = (position: Vector) => `(${position.x}, ${position.y})`