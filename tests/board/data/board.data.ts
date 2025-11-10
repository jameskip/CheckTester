import type { GameState, BoardTestScenario } from '../../shared/types'
import { PIECE_COLORS, GAME_STATUS } from '../../shared/types'

// Exported for use in gameplay.data.ts
export const commonBoardStates = {
  initial: {
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
  } as GameState,
  kingPromotion: {
    orangePieces: [
      { position: { x: 2, y: 6 }, isKing: false, color: PIECE_COLORS.ORANGE },
      { position: { x: 0, y: 0 }, isKing: false, color: PIECE_COLORS.ORANGE }
    ],
    bluePieces: [
      { position: { x: 7, y: 7 }, isKing: false, color: PIECE_COLORS.BLUE }
    ],
    currentTurn: PIECE_COLORS.ORANGE,
    gameOver: false
  } as GameState,
  endgame: {
    orangePieces: [
      { position: { x: 0, y: 0 }, isKing: true, color: PIECE_COLORS.ORANGE },
      { position: { x: 2, y: 2 }, isKing: false, color: PIECE_COLORS.ORANGE }
    ],
    bluePieces: [
      { position: { x: 7, y: 7 }, isKing: true, color: PIECE_COLORS.BLUE }
    ],
    currentTurn: PIECE_COLORS.ORANGE,
    gameOver: false
  } as GameState,
  jumpCapture: {
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
  } as GameState
}

export const boardScenarios: Record<string, BoardTestScenario> = {
  initial: {
    name: 'TC3.3: Initial State',
    description: 'Standard checkers starting position with 12 pieces per side',
    boardState: commonBoardStates.initial,
    moves: [
      { from: { x: 0, y: 2 }, to: { x: 1, y: 3 } },
      { from: { x: 2, y: 2 }, to: { x: 3, y: 3 } },
      { from: { x: 4, y: 2 }, to: { x: 5, y: 3 } }
    ],
    expectedBoardState: {
      orangePieces: [
        { position: { x: 0, y: 0 }, isKing: false, color: PIECE_COLORS.ORANGE },
        { position: { x: 2, y: 0 }, isKing: false, color: PIECE_COLORS.ORANGE },
        { position: { x: 4, y: 0 }, isKing: false, color: PIECE_COLORS.ORANGE },
        { position: { x: 6, y: 0 }, isKing: false, color: PIECE_COLORS.ORANGE },
        { position: { x: 1, y: 1 }, isKing: false, color: PIECE_COLORS.ORANGE },
        { position: { x: 3, y: 1 }, isKing: false, color: PIECE_COLORS.ORANGE },
        { position: { x: 5, y: 1 }, isKing: false, color: PIECE_COLORS.ORANGE },
        { position: { x: 7, y: 1 }, isKing: false, color: PIECE_COLORS.ORANGE },
        { position: { x: 1, y: 3 }, isKing: false, color: PIECE_COLORS.ORANGE },
        { position: { x: 3, y: 3 }, isKing: false, color: PIECE_COLORS.ORANGE },
        { position: { x: 5, y: 3 }, isKing: false, color: PIECE_COLORS.ORANGE },
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
      currentTurn: PIECE_COLORS.BLUE,
      gameOver: false
    },
    expectedResult: GAME_STATUS.IN_PROGRESS
  },
  kingPromotion: {
    name: 'TC3.1: King Promotion Setup',
    description: 'Board state configured for testing piece promotion to king',
    boardState: commonBoardStates.kingPromotion,
    moves: [],
    expectedBoardState: commonBoardStates.kingPromotion,
    expectedResult: GAME_STATUS.IN_PROGRESS
  },
  endgame: {
    name: 'TC3.2: Minimal Endgame',
    description: 'Endgame scenario with few pieces including kings',
    boardState: commonBoardStates.endgame,
    moves: [],
    expectedBoardState: commonBoardStates.endgame,
    expectedResult: GAME_STATUS.IN_PROGRESS
  }
}
