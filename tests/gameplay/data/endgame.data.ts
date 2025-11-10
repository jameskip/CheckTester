import type { BoardTestScenario } from '../../shared/types'
import { PIECE_COLORS, GAME_STATUS } from '../../shared/types'

export const endgameScenarios: Record<string, BoardTestScenario> = {
  kingVsKing: {
    name: 'TC4.1: King vs King Duel',
    description: 'Single king vs single king - should result in strategic maneuvering',
    boardState: {
      orangePieces: [
        { position: { x: 0, y: 2 }, isKing: true, color: PIECE_COLORS.ORANGE }
      ],
      bluePieces: [
        { position: { x: 6, y: 4 }, isKing: true, color: PIECE_COLORS.BLUE }
      ],
      currentTurn: PIECE_COLORS.ORANGE,
      gameOver: false
    },
    moves: [
      { from: { x: 0, y: 2 }, to: { x: 1, y: 1 } }
    ],
    expectedBoardState: {
      orangePieces: [
        { position: { x: 1, y: 1 }, isKing: true, color: PIECE_COLORS.ORANGE }
      ],
      bluePieces: [
        { position: { x: 6, y: 4 }, isKing: true, color: PIECE_COLORS.BLUE }
      ],
      currentTurn: PIECE_COLORS.BLUE,
      gameOver: false
    },
    expectedResult: GAME_STATUS.IN_PROGRESS
  },
  kingHunt: {
    name: 'TC4.2: King Hunt',
    description: 'Orange has multiple pieces including a king to corner and capture the last blue piece',
    boardState: {
      orangePieces: [
        { position: { x: 3, y: 5 }, isKing: true, color: PIECE_COLORS.ORANGE },
        { position: { x: 0, y: 4 }, isKing: false, color: PIECE_COLORS.ORANGE }
      ],
      bluePieces: [
        { position: { x: 4, y: 6 }, isKing: false, color: PIECE_COLORS.BLUE }
      ],
      currentTurn: PIECE_COLORS.ORANGE,
      gameOver: false
    },
    moves: [
      { from: { x: 3, y: 5 }, to: { x: 5, y: 7 }, isJump: true, capturedPiece: { x: 4, y: 6 } }
    ],
    expectedBoardState: {
      orangePieces: [
        { position: { x: 5, y: 7 }, isKing: true, color: PIECE_COLORS.ORANGE },
        { position: { x: 0, y: 4 }, isKing: false, color: PIECE_COLORS.ORANGE }
      ],
      bluePieces: [],
      currentTurn: PIECE_COLORS.BLUE,
      gameOver: true
    },
    expectedResult: GAME_STATUS.ORANGE_WINS
  },
  finalPieces: {
    name: 'TC4.3: Final Pieces',
    description: 'Simple endgame with few pieces spread apart to avoid forced jumps',
    boardState: {
      orangePieces: [
        { position: { x: 0, y: 2 }, isKing: false, color: PIECE_COLORS.ORANGE },
        { position: { x: 4, y: 2 }, isKing: false, color: PIECE_COLORS.ORANGE }
      ],
      bluePieces: [
        { position: { x: 2, y: 4 }, isKing: false, color: PIECE_COLORS.BLUE },
        { position: { x: 6, y: 6 }, isKing: false, color: PIECE_COLORS.BLUE }
      ],
      currentTurn: PIECE_COLORS.ORANGE,
      gameOver: false
    },
    moves: [],
    expectedBoardState: {
      orangePieces: [
        { position: { x: 0, y: 2 }, isKing: false, color: PIECE_COLORS.ORANGE },
        { position: { x: 4, y: 2 }, isKing: false, color: PIECE_COLORS.ORANGE }
      ],
      bluePieces: [
        { position: { x: 2, y: 4 }, isKing: false, color: PIECE_COLORS.BLUE },
        { position: { x: 6, y: 6 }, isKing: false, color: PIECE_COLORS.BLUE }
      ],
      currentTurn: PIECE_COLORS.ORANGE,
      gameOver: false
    },
    expectedResult: GAME_STATUS.IN_PROGRESS
  },
  orangeWin: {
    name: 'TC4.4: Orange Victory',
    description: 'Orange king can capture the last blue piece to win',
    boardState: {
      orangePieces: [
        { position: { x: 3, y: 3 }, isKing: true, color: PIECE_COLORS.ORANGE }
      ],
      bluePieces: [
        { position: { x: 4, y: 4 }, isKing: false, color: PIECE_COLORS.BLUE }
      ],
      currentTurn: PIECE_COLORS.ORANGE,
      gameOver: false
    },
    moves: [
      { from: { x: 3, y: 3 }, to: { x: 5, y: 5 }, isJump: true, capturedPiece: { x: 4, y: 4 } }
    ],
    expectedBoardState: {
      orangePieces: [
        { position: { x: 5, y: 5 }, isKing: true, color: PIECE_COLORS.ORANGE }
      ],
      bluePieces: [],
      currentTurn: PIECE_COLORS.BLUE,
      gameOver: true
    },
    expectedResult: GAME_STATUS.ORANGE_WINS
  },
  blueWin: {
    name: 'TC4.5: Blue Victory',
    description: 'Orange moves into capture position, blue AI automatically captures to win',
    boardState: {
      orangePieces: [
        { position: { x: 4, y: 4 }, isKing: false, color: PIECE_COLORS.ORANGE }
      ],
      bluePieces: [
        { position: { x: 2, y: 6 }, isKing: true, color: PIECE_COLORS.BLUE }
      ],
      currentTurn: PIECE_COLORS.ORANGE,
      gameOver: false
    },
    moves: [
      { from: { x: 4, y: 4 }, to: { x: 3, y: 5 } }
    ],
    expectedBoardState: {
      orangePieces: [
        { position: { x: 3, y: 5 }, isKing: false, color: PIECE_COLORS.ORANGE }
      ],
      bluePieces: [
        { position: { x: 2, y: 6 }, isKing: true, color: PIECE_COLORS.BLUE }
      ],
      currentTurn: PIECE_COLORS.BLUE,
      gameOver: false
    },
    expectedResult: GAME_STATUS.BLUE_WINS
  }
}
