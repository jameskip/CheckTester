import type { VisualTestScenario } from '../../shared/types'
import { PIECE_COLORS } from '../../shared/types'

export const visualTestScenarios: VisualTestScenario[] = [
  {
    name: 'TC5.1: Scattered Pieces',
    screenshotName: 'scattered-pieces-board.png',
    useFullPage: true,
    boardState: {
      orangePieces: [
        { position: { x: 0, y: 2 }, isKing: false, color: PIECE_COLORS.ORANGE },
        { position: { x: 4, y: 4 }, isKing: true, color: PIECE_COLORS.ORANGE },
        { position: { x: 6, y: 0 }, isKing: false, color: PIECE_COLORS.ORANGE },
        { position: { x: 2, y: 6 }, isKing: false, color: PIECE_COLORS.ORANGE }
      ],
      bluePieces: [
        { position: { x: 1, y: 1 }, isKing: false, color: PIECE_COLORS.BLUE },
        { position: { x: 3, y: 5 }, isKing: true, color: PIECE_COLORS.BLUE },
        { position: { x: 7, y: 3 }, isKing: false, color: PIECE_COLORS.BLUE },
        { position: { x: 5, y: 7 }, isKing: false, color: PIECE_COLORS.BLUE }
      ],
      currentTurn: PIECE_COLORS.ORANGE,
      gameOver: false
    }
  },
  {
    name: 'TC5.2: Mixed Pieces',
    screenshotName: 'mixed-pieces-board.png',
    useFullPage: false,
    boardState: {
      orangePieces: [
        { position: { x: 0, y: 6 }, isKing: false, color: PIECE_COLORS.ORANGE },
        { position: { x: 2, y: 4 }, isKing: true, color: PIECE_COLORS.ORANGE },
        { position: { x: 6, y: 2 }, isKing: false, color: PIECE_COLORS.ORANGE },
        { position: { x: 4, y: 0 }, isKing: false, color: PIECE_COLORS.ORANGE },
        { position: { x: 0, y: 0 }, isKing: true, color: PIECE_COLORS.ORANGE }
      ],
      bluePieces: [
        { position: { x: 7, y: 1 }, isKing: false, color: PIECE_COLORS.BLUE },
        { position: { x: 1, y: 3 }, isKing: false, color: PIECE_COLORS.BLUE },
        { position: { x: 5, y: 5 }, isKing: true, color: PIECE_COLORS.BLUE },
        { position: { x: 3, y: 7 }, isKing: false, color: PIECE_COLORS.BLUE }
      ],
      currentTurn: PIECE_COLORS.ORANGE,
      gameOver: false
    }
  },
  {
    name: 'TC5.3: Asymmetric Endgame',
    screenshotName: 'asymmetric-endgame.png',
    useFullPage: false,
    boardState: {
      orangePieces: [
        { position: { x: 2, y: 0 }, isKing: true, color: PIECE_COLORS.ORANGE },
        { position: { x: 6, y: 4 }, isKing: false, color: PIECE_COLORS.ORANGE },
        { position: { x: 0, y: 4 }, isKing: false, color: PIECE_COLORS.ORANGE }
      ],
      bluePieces: [
        { position: { x: 1, y: 7 }, isKing: true, color: PIECE_COLORS.BLUE },
        { position: { x: 5, y: 7 }, isKing: true, color: PIECE_COLORS.BLUE },
        { position: { x: 3, y: 5 }, isKing: false, color: PIECE_COLORS.BLUE },
        { position: { x: 7, y: 5 }, isKing: false, color: PIECE_COLORS.BLUE },
        { position: { x: 1, y: 3 }, isKing: false, color: PIECE_COLORS.BLUE },
        { position: { x: 5, y: 1 }, isKing: false, color: PIECE_COLORS.BLUE }
      ],
      currentTurn: PIECE_COLORS.ORANGE,
      gameOver: false
    }
  }
]
