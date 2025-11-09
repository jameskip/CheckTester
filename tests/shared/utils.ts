import type { GamePosition } from './types'

export const calculatePosition = (
  base: GamePosition,
  offset: { dx: number, dy: number }
): GamePosition => ({
  x: base.x + offset.dx,
  y: base.y + offset.dy
})
