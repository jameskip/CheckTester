import { test, expect } from '../../fixtures'
import * as Actions from '../actions/board.actions'
import * as Locators from '../locators/board.locators'
import { boardScenarios } from '../data/board.data'
import { gameMessages, PIECE_COLORS, GAME_STATUS, INITIAL_PIECE_COUNT, QUICK_STATUS_CHECK_TIMEOUT, DIRECTION_OFFSETS } from '../../shared/types'
import { calculatePosition } from '../../shared/utils'

const scenario = boardScenarios.initial
const [firstMove, secondMove] = scenario.moves
const firstBluePosition = scenario.boardState.bluePieces[0].position
const secondOrangePosition = scenario.boardState.orangePieces[1].position

test.describe('TC1: Basic Piece Selection and Movement', () => {
  test.describe('Initial Board State', () => {
    test('TC1.1: should display initial board with 12 pieces per player', async ({ checkersPage: page }) => {
      await Actions.verifyGameMessage(page, gameMessages.selectPiece)
      await Actions.verifyPieceCounts(page, INITIAL_PIECE_COUNT, INITIAL_PIECE_COUNT)
      await Actions.verifyBoardState(page, scenario.boardState)
    })
  })

  test.describe('Piece Selection', () => {
    test('TC1.2: should allow selecting and deselecting orange pieces', async ({ checkersPage: page }) => {
      await Actions.selectPiece(page, firstMove.from)
      await Actions.verifyPieceSelection(page, firstMove.from, true)

      await Actions.deselectPiece(page, firstMove.from)
      await Actions.verifyPieceSelection(page, firstMove.from, false)
    })

    test('TC1.3: should show visual feedback when switching piece selection', async ({ checkersPage: page }) => {
      await Actions.selectPiece(page, firstMove.from)
      await expect(Locators.selectedPiece(page, firstMove.from)).toBeVisible()

      await Actions.selectPiece(page, secondMove.from)
      await expect(Locators.selectedPiece(page, firstMove.from)).toBeHidden()
      await expect(Locators.selectedPiece(page, secondMove.from)).toBeVisible()
    })

    test('TC1.4: should prevent selecting opponent blue pieces', async ({ checkersPage: page }) => {
      await Actions.attemptInvalidPieceSelection(page, firstBluePosition, gameMessages.opponentPieceError)
      await expect(Locators.piece(page, firstBluePosition, PIECE_COLORS.BLUE)).toBeVisible()
    })
  })

  test.describe('Valid Movements', () => {
    test('TC1.5: should allow valid forward diagonal moves', async ({ checkersPage: page }) => {
      await Actions.selectPiece(page, firstMove.from)
      await Locators.clickableSquare(page, firstMove.to).click()

      await Actions.verifyPieceAtPosition(page, firstMove.to, PIECE_COLORS.ORANGE)
      await Actions.verifyEmptySquare(page, firstMove.from)
    })

    test('TC1.6: should execute all valid moves in sequence', async ({ checkersPage: page }) => {
      for (const move of scenario.moves) {
        await expect(Locators.piece(page, move.from, PIECE_COLORS.ORANGE)).toBeVisible()
        await Actions.performPlayerTurn(page, move)
        await Actions.verifyPieceAtPosition(page, move.to, PIECE_COLORS.ORANGE)

        const gameResult = await Actions.checkGameOver(page, QUICK_STATUS_CHECK_TIMEOUT)
        if (gameResult !== GAME_STATUS.IN_PROGRESS) {
          break
        }
      }
    })
  })

  test.describe('Invalid Movements', () => {
    test('TC1.7: should reject invalid backward diagonal moves', async ({ checkersPage: page }) => {
      const invalidBackwardMove = calculatePosition(firstMove.from, DIRECTION_OFFSETS.BACKWARD_RIGHT)

      await Actions.selectPiece(page, firstMove.from)
      await Locators.clickableSquare(page, invalidBackwardMove).click()

      await Actions.verifyPieceAtPosition(page, firstMove.from, PIECE_COLORS.ORANGE)
    })

    test('TC1.8: should reject moves to occupied squares', async ({ checkersPage: page }) => {
      await Actions.selectPiece(page, firstMove.from)
      await Locators.clickableSquare(page, secondOrangePosition).click()

      await Actions.verifyPieceAtPosition(page, firstMove.from, PIECE_COLORS.ORANGE)
    })
  })

  test.describe('Game State Management', () => {
    test('TC1.9: should keep game in progress after valid move', async ({ checkersPage: page }) => {
      await Actions.performPlayerTurn(page, firstMove)

      await Actions.verifyGameStateAfterMove(page, INITIAL_PIECE_COUNT, INITIAL_PIECE_COUNT)
    })

    test('TC1.10: should maintain blue pieces count after orange moves', async ({ checkersPage: page }) => {
      await Actions.movePiece(page, firstMove.from, firstMove.to)

      const blueCount = await Actions.countPieces(page, PIECE_COLORS.BLUE)
      expect(blueCount).toBe(INITIAL_PIECE_COUNT)

      await Actions.verifyGameInProgress(page)
    })
  })
})
