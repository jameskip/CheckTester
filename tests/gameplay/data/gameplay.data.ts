import type { BoardTestScenario } from '../../shared/types'
import { PIECE_COLORS, GAME_STATUS } from '../../shared/types'
import { commonBoardStates } from '../../board/data/board.data'

export const gameplayScenarios: Record<string, BoardTestScenario> = {
  basicMovement: {
    name: 'TC2.1: Basic Movement',
    description: 'Execute basic piece movement successfully',
    boardState: commonBoardStates.initial,
    moves: [
      {
        from: { x: 0, y: 2 },
        to: { x: 1, y: 3 }
      }
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
      currentTurn: PIECE_COLORS.BLUE,
      gameOver: false
    },
    expectedResult: GAME_STATUS.IN_PROGRESS
  },

  gameStateConsistency: {
    name: 'TC2.2: State Consistency',
    description: 'Maintain game state consistency throughout play',
    boardState: commonBoardStates.initial,
    moves: [
      {
        from: { x: 0, y: 2 },
        to: { x: 1, y: 3 }
      }
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
      currentTurn: PIECE_COLORS.BLUE,
      gameOver: false
    },
    expectedResult: GAME_STATUS.IN_PROGRESS
  },

  kingPromotion: {
    name: 'TC2.3: King Promotion',
    description: 'Orange piece should be promoted to king when reaching the opposite end',
    boardState: commonBoardStates.kingPromotion,
    moves: [
      {
        from: { x: 2, y: 6 },
        to: { x: 1, y: 7 }
      }
    ],
    expectedBoardState: {
      orangePieces: [
        { position: { x: 1, y: 7 }, isKing: true, color: PIECE_COLORS.ORANGE },
        { position: { x: 0, y: 0 }, isKing: false, color: PIECE_COLORS.ORANGE }
      ],
      bluePieces: [
        { position: { x: 7, y: 7 }, isKing: false, color: PIECE_COLORS.BLUE }
      ],
      currentTurn: PIECE_COLORS.BLUE,
      gameOver: false
    },
    expectedResult: GAME_STATUS.IN_PROGRESS
  },

  jumpCapture: {
    name: 'TC2.4: Jump Capture',
    description: 'Orange piece should capture blue piece when jumping over it',
    boardState: commonBoardStates.jumpCapture,
    moves: [
      {
        from: { x: 0, y: 2 },
        to: { x: 2, y: 4 },
        isJump: true,
        capturedPiece: { x: 1, y: 3 }
      }
    ],
    expectedBoardState: {
      orangePieces: [
        { position: { x: 2, y: 4 }, isKing: false, color: PIECE_COLORS.ORANGE },
        { position: { x: 4, y: 2 }, isKing: false, color: PIECE_COLORS.ORANGE }
      ],
      bluePieces: [
        { position: { x: 6, y: 6 }, isKing: false, color: PIECE_COLORS.BLUE }
      ],
      currentTurn: PIECE_COLORS.BLUE,
      gameOver: false
    },
    expectedResult: GAME_STATUS.IN_PROGRESS
  },

  multipleMoves: {
    name: 'TC2.5: Sequential Moves',
    description: 'Execute multiple moves in sequence to test game flow',
    boardState: {
      orangePieces: [
        { position: { x: 0, y: 2 }, isKing: false, color: PIECE_COLORS.ORANGE },
        { position: { x: 2, y: 2 }, isKing: false, color: PIECE_COLORS.ORANGE },
        { position: { x: 4, y: 2 }, isKing: false, color: PIECE_COLORS.ORANGE }
      ],
      bluePieces: [
        { position: { x: 1, y: 5 }, isKing: false, color: PIECE_COLORS.BLUE },
        { position: { x: 3, y: 5 }, isKing: false, color: PIECE_COLORS.BLUE }
      ],
      currentTurn: PIECE_COLORS.ORANGE,
      gameOver: false
    },
    moves: [
      {
        from: { x: 0, y: 2 },
        to: { x: 1, y: 3 }
      }
    ],
    expectedBoardState: {
      orangePieces: [
        { position: { x: 1, y: 3 }, isKing: false, color: PIECE_COLORS.ORANGE },
        { position: { x: 2, y: 2 }, isKing: false, color: PIECE_COLORS.ORANGE },
        { position: { x: 4, y: 2 }, isKing: false, color: PIECE_COLORS.ORANGE }
      ],
      bluePieces: [
        { position: { x: 1, y: 5 }, isKing: false, color: PIECE_COLORS.BLUE },
        { position: { x: 3, y: 5 }, isKing: false, color: PIECE_COLORS.BLUE }
      ],
      currentTurn: PIECE_COLORS.BLUE,
      gameOver: false
    },
    expectedResult: GAME_STATUS.IN_PROGRESS
  }
}
