import type { GameState, BoardTestScenario, MoveData } from '../../shared/types'
import { PIECE_COLORS } from '../../shared/types'

const initialGameState: GameState = {
  orangePieces: [
    { position: { x: 0, y: 0 }, isKing: false, color: PIECE_COLORS.ORANGE },
    { position: { x: 2, y: 0 }, isKing: false, color: PIECE_COLORS.ORANGE },
    { position: { x: 4, y: 0 }, isKing: false, color: PIECE_COLORS.ORANGE },
    { position: { x: 6, y: 0 }, isKing: false, color: PIECE_COLORS.ORANGE },
    { position: { x: 1, y: 1 }, isKing: false, color: PIECE_COLORS.ORANGE },
    { position: { x: 3, y: 1 }, isKing: false, color: PIECE_COLORS.ORANGE },
    { position: { x: 5, y: 1 }, isKing: false, color: PIECE_COLORS.ORANGE },
    { position: { x: 7, y: 1 }, isKing: false, color: PIECE_COLORS.ORANGE },
    { position: { x: 0, y: 2 }, isKing: false, color: PIECE_COLORS.ORANGE },
    { position: { x: 2, y: 2 }, isKing: false, color: PIECE_COLORS.ORANGE },
    { position: { x: 4, y: 2 }, isKing: false, color: PIECE_COLORS.ORANGE },
    { position: { x: 6, y: 2 }, isKing: false, color: PIECE_COLORS.ORANGE }
  ],
  bluePieces: [
    { position: { x: 1, y: 5 }, isKing: false, color: PIECE_COLORS.BLUE },
    { position: { x: 3, y: 5 }, isKing: false, color: PIECE_COLORS.BLUE },
    { position: { x: 5, y: 5 }, isKing: false, color: PIECE_COLORS.BLUE },
    { position: { x: 7, y: 5 }, isKing: false, color: PIECE_COLORS.BLUE },
    { position: { x: 0, y: 6 }, isKing: false, color: PIECE_COLORS.BLUE },
    { position: { x: 2, y: 6 }, isKing: false, color: PIECE_COLORS.BLUE },
    { position: { x: 4, y: 6 }, isKing: false, color: PIECE_COLORS.BLUE },
    { position: { x: 6, y: 6 }, isKing: false, color: PIECE_COLORS.BLUE },
    { position: { x: 1, y: 7 }, isKing: false, color: PIECE_COLORS.BLUE },
    { position: { x: 3, y: 7 }, isKing: false, color: PIECE_COLORS.BLUE },
    { position: { x: 5, y: 7 }, isKing: false, color: PIECE_COLORS.BLUE },
    { position: { x: 7, y: 7 }, isKing: false, color: PIECE_COLORS.BLUE }
  ],
  currentTurn: PIECE_COLORS.ORANGE,
  gameOver: false
}

const boardStateAfterFirstMove: GameState = {
  orangePieces: [
    { position: { x: 0, y: 0 }, isKing: false, color: PIECE_COLORS.ORANGE },
    { position: { x: 2, y: 0 }, isKing: false, color: PIECE_COLORS.ORANGE },
    { position: { x: 4, y: 0 }, isKing: false, color: PIECE_COLORS.ORANGE },
    { position: { x: 6, y: 0 }, isKing: false, color: PIECE_COLORS.ORANGE },
    { position: { x: 1, y: 1 }, isKing: false, color: PIECE_COLORS.ORANGE },
    { position: { x: 3, y: 1 }, isKing: false, color: PIECE_COLORS.ORANGE },
    { position: { x: 5, y: 1 }, isKing: false, color: PIECE_COLORS.ORANGE },
    { position: { x: 7, y: 1 }, isKing: false, color: PIECE_COLORS.ORANGE },
    { position: { x: 2, y: 2 }, isKing: false, color: PIECE_COLORS.ORANGE },
    { position: { x: 4, y: 2 }, isKing: false, color: PIECE_COLORS.ORANGE },
    { position: { x: 6, y: 2 }, isKing: false, color: PIECE_COLORS.ORANGE },
    { position: { x: 1, y: 3 }, isKing: false, color: PIECE_COLORS.ORANGE }
  ],
  bluePieces: [
    { position: { x: 1, y: 5 }, isKing: false, color: PIECE_COLORS.BLUE },
    { position: { x: 3, y: 5 }, isKing: false, color: PIECE_COLORS.BLUE },
    { position: { x: 5, y: 5 }, isKing: false, color: PIECE_COLORS.BLUE },
    { position: { x: 7, y: 5 }, isKing: false, color: PIECE_COLORS.BLUE },
    { position: { x: 0, y: 6 }, isKing: false, color: PIECE_COLORS.BLUE },
    { position: { x: 2, y: 6 }, isKing: false, color: PIECE_COLORS.BLUE },
    { position: { x: 4, y: 6 }, isKing: false, color: PIECE_COLORS.BLUE },
    { position: { x: 6, y: 6 }, isKing: false, color: PIECE_COLORS.BLUE },
    { position: { x: 1, y: 7 }, isKing: false, color: PIECE_COLORS.BLUE },
    { position: { x: 3, y: 7 }, isKing: false, color: PIECE_COLORS.BLUE },
    { position: { x: 5, y: 7 }, isKing: false, color: PIECE_COLORS.BLUE },
    { position: { x: 7, y: 7 }, isKing: false, color: PIECE_COLORS.BLUE }
  ],
  currentTurn: PIECE_COLORS.BLUE,
  gameOver: false
}

const kingPromotionBoardState: GameState = {
  orangePieces: [
    { position: { x: 2, y: 6 }, isKing: false, color: PIECE_COLORS.ORANGE },
    { position: { x: 0, y: 0 }, isKing: false, color: PIECE_COLORS.ORANGE }
  ],
  bluePieces: [
    { position: { x: 7, y: 7 }, isKing: false, color: PIECE_COLORS.BLUE }
  ],
  currentTurn: PIECE_COLORS.ORANGE,
  gameOver: false
}

const endgameBoardState: GameState = {
  orangePieces: [
    { position: { x: 0, y: 0 }, isKing: true, color: PIECE_COLORS.ORANGE },
    { position: { x: 2, y: 2 }, isKing: false, color: PIECE_COLORS.ORANGE }
  ],
  bluePieces: [
    { position: { x: 7, y: 7 }, isKing: true, color: PIECE_COLORS.BLUE }
  ],
  currentTurn: PIECE_COLORS.ORANGE,
  gameOver: false
}

const jumpCaptureBoardState: GameState = {
  orangePieces: [
    { position: { x: 0, y: 2 }, isKing: false, color: PIECE_COLORS.ORANGE },
    { position: { x: 4, y: 2 }, isKing: false, color: PIECE_COLORS.ORANGE }
  ],
  bluePieces: [
    { position: { x: 1, y: 3 }, isKing: false, color: PIECE_COLORS.BLUE },
    { position: { x: 6, y: 6 }, isKing: false, color: PIECE_COLORS.BLUE }
  ],
  currentTurn: PIECE_COLORS.ORANGE,
  gameOver: false
}

export const commonBoardStates = {
  initial: initialGameState,
  afterFirstMove: boardStateAfterFirstMove,
  kingPromotion: kingPromotionBoardState,
  endgame: endgameBoardState,
  jumpCapture: jumpCaptureBoardState
}

export const boardScenarios: {
  initial: BoardTestScenario & { moves: MoveData[], expectedStateAfterMove: GameState }
  kingPromotion: BoardTestScenario
  endgame: BoardTestScenario
} = {
  initial: {
    name: 'TC3.3: Initial State',
    description: 'Standard checkers starting position with 12 pieces per side',
    boardState: commonBoardStates.initial,
    moves: [
      { from: { x: 0, y: 2 }, to: { x: 1, y: 3 }, isJump: false },
      { from: { x: 2, y: 2 }, to: { x: 3, y: 3 }, isJump: false },
      { from: { x: 4, y: 2 }, to: { x: 5, y: 3 }, isJump: false }
    ],
    expectedStateAfterMove: commonBoardStates.afterFirstMove,
    expectedOrangePieces: 12,
    expectedBluePieces: 12
  },
  kingPromotion: {
    name: 'TC3.1: King Promotion Setup',
    description: 'Board state configured for testing piece promotion to king',
    boardState: commonBoardStates.kingPromotion,
    expectedOrangePieces: 2,
    expectedBluePieces: 1
  },
  endgame: {
    name: 'TC3.2: Minimal Endgame',
    description: 'Endgame scenario with few pieces including kings',
    boardState: commonBoardStates.endgame,
    expectedOrangePieces: 2,
    expectedBluePieces: 1
  }
}
