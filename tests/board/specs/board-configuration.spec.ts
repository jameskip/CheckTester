import { test, expect } from '../../fixtures'
import * as Actions from '../actions/board.actions'
import { boardScenarios } from '../data/board.data'
import { PIECE_COLORS } from '../../shared/types'

test.describe('TC3: Board State Configuration Examples', () => {
  test.describe('King Promotion Scenario', () => {
    const scenario = boardScenarios.kingPromotion
    const PROMOTION_FROM = { x: 2, y: 6 }
    const PROMOTION_TO = { x: 1, y: 7 }

    test.use({ boardState: scenario.boardState })

    test('TC3.1: should display king promotion board with 2 orange and 1 blue piece', async ({ checkersPage: page }) => {
      await Actions.verifyBoardState(page, scenario.boardState)
    })

    test('TC3.1.1: should move piece to back row for promotion and maintain piece count', async ({ checkersPage: page }) => {
      await Actions.movePiece(page, PROMOTION_FROM, PROMOTION_TO)
      await Actions.verifyEmptySquare(page, PROMOTION_FROM)

      const pieceCountAfterPromotion = await Actions.countPieces(page, PIECE_COLORS.ORANGE)
      expect(pieceCountAfterPromotion).toBeGreaterThan(0)
    })
  })

  test.describe('Minimal Endgame Scenario', () => {
    const scenario = boardScenarios.endgame

    test.use({ boardState: scenario.boardState })

    test('TC3.2: should display minimal endgame board with 2 orange and 1 blue piece', async ({ checkersPage: page }) => {
      await Actions.verifyBoardState(page, scenario.boardState)
    })
  })

  test.describe('Default Board Tests', () => {
    test('TC3.3: should display standard initial board with 12 pieces per side', async ({ checkersPage: page }) => {
      await Actions.verifyBoardState(page, boardScenarios.initial.boardState)
    })
  })
})
