import { Page } from '@playwright/test'
import {
  PIECE_COLORS,
  PIECE_STATES,
  SQUARE_STATES,
  GAME_STATUS,
  PIECE_SRC_PATTERNS,
  SQUARE_SRC_PATTERNS,
  INITIAL_PIECE_COUNT,
  BOARD_SIZE,
  BOARD_DIMENSION,
  DEFAULT_GAME_OVER_TIMEOUT,
  QUICK_STATUS_CHECK_TIMEOUT,
  SQUARE_NAME_PREFIX,
  PIECE_VALUES,
  SRC_PATTERN_MAP,
  gameMessages
} from './constants'

export {
  PIECE_COLORS,
  PIECE_STATES,
  SQUARE_STATES,
  GAME_STATUS,
  PIECE_SRC_PATTERNS,
  SQUARE_SRC_PATTERNS,
  INITIAL_PIECE_COUNT,
  BOARD_SIZE,
  BOARD_DIMENSION,
  DEFAULT_GAME_OVER_TIMEOUT,
  QUICK_STATUS_CHECK_TIMEOUT,
  SQUARE_NAME_PREFIX,
  PIECE_VALUES,
  SRC_PATTERN_MAP,
  gameMessages
}

export type PieceColor = typeof PIECE_COLORS[keyof typeof PIECE_COLORS]
export type PieceState = typeof PIECE_STATES[keyof typeof PIECE_STATES]
export type SquareState = typeof SQUARE_STATES[keyof typeof SQUARE_STATES]
export type GameStatus = typeof GAME_STATUS[keyof typeof GAME_STATUS]

export interface GamePosition {
  x: number
  y: number
}

export interface PieceData {
  position: GamePosition
  isKing: boolean
  color: PieceColor
}

export interface MoveData {
  from: GamePosition
  to: GamePosition
  isJump?: boolean
  capturedPiece?: GamePosition
}

export interface GameState {
  orangePieces: PieceData[]
  bluePieces: PieceData[]
  currentTurn: PieceColor
  gameOver: boolean
}

export interface BoardTestScenario {
  name: string
  description?: string
  boardState: GameState
  moves?: MoveData[]
  expectedStateAfterMove?: GameState
  expectedOrangePieces: number
  expectedBluePieces: number
  expectedResult?: PieceColor
}

export interface VisualTestScenario {
  name: string
  screenshotName: string
  useFullPage: boolean
  boardState: GameState
}

export type CheckersOptions = {
  boardState: GameState
}

export type CheckersFixtures = {
  checkersPage: Page
}

export interface ScenarioTestData {
  firstMove: MoveData
  secondMove: MoveData
  firstMoveFrom: GamePosition
  firstMoveTo: GamePosition
  secondMoveFrom: GamePosition
  secondMoveTo: GamePosition
  firstBluePosition: GamePosition
  secondOrangePosition: GamePosition
  boardState: BoardTestScenario['boardState']
  allMoves: MoveData[]
}

export const DIRECTION_OFFSETS = {
  FORWARD_LEFT: { dx: -1, dy: 1 },
  FORWARD_RIGHT: { dx: 1, dy: 1 },
  BACKWARD_LEFT: { dx: -1, dy: -1 },
  BACKWARD_RIGHT: { dx: 1, dy: -1 }
} as const
