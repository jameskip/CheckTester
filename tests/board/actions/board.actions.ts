import { Page, expect } from '@playwright/test'
import * as Locators from '../locators/board.locators'
import {
  PIECE_COLORS,
  PIECE_STATES,
  GAME_STATUS,
  BOARD_SIZE,
  BOARD_DIMENSION,
  DEFAULT_GAME_OVER_TIMEOUT,
  SQUARE_NAME_PREFIX,
  PIECE_VALUES,
  SRC_PATTERN_MAP,
  gameMessages
} from '../../shared/types'
import type {
  GameState,
  GamePosition,
  MoveData,
  PieceColor,
  GameStatus
} from '../../shared/types'

const isValidPosition = (x: number, y: number): boolean => {
  return x >= 0 && x < BOARD_DIMENSION && y >= 0 && y < BOARD_DIMENSION
}

export const generateBoardArray = (gameState: GameState): number[] => {
  const boardValues = Array(BOARD_SIZE).fill(0)
  const allPieces = [...gameState.orangePieces, ...gameState.bluePieces]

  for (const piece of allPieces) {
    const { x, y } = piece.position

    if (!isValidPosition(x, y)) {
      throw new Error(`Invalid piece position: (${x}, ${y}). Must be within 0-${BOARD_DIMENSION - 1}`)
    }

    const values = PIECE_VALUES[piece.color]
    boardValues[BOARD_DIMENSION * y + x] = piece.isKing ? values.king : values.normal
  }

  return boardValues
}

export const captureBoardState = async (page: Page): Promise<number[]> => {
  const boardArray = new Array(BOARD_SIZE).fill(0)

  const queries = Array.from({ length: BOARD_SIZE }, (_, index) => {
    const x = index % BOARD_DIMENSION
    const y = Math.floor(index / BOARD_DIMENSION)
    return page.locator(`img[name="${SQUARE_NAME_PREFIX}${x}${y}"]`).getAttribute('src')
  })

  const srcResults = await Promise.all(queries)

  for (let index = 0; index < BOARD_SIZE; index++) {
    const src = srcResults[index]
    if (!src) continue

    for (const [pattern, value] of SRC_PATTERN_MAP) {
      if (src.includes(pattern)) {
        boardArray[index] = value
        break
      }
    }
  }

  return boardArray
}

export const formatBoardAs8x8 = (boardArray: number[]): number[][] => {
  const board8x8: number[][] = []
  for (let y = 0; y < BOARD_DIMENSION; y++) {
    board8x8.push(boardArray.slice(y * BOARD_DIMENSION, (y + 1) * BOARD_DIMENSION))
  }
  return board8x8
}

export const formatBoard8x8ToString = (board8x8: number[][]): string => {
  const rows = board8x8.map(row => `  ${JSON.stringify(row)}`)
  return `[\n${rows.join(',\n')}\n]`
}

export const navigateToGame = async (page: Page, gameUrl: string = '/checkers'): Promise<void> => {
  await page.goto(gameUrl)
}

export const selectPiece = async (page: Page, coordinates: GamePosition, color: PieceColor = PIECE_COLORS.ORANGE): Promise<void> => {
  await expect(Locators.piece(page, coordinates, color)).toBeVisible()
  await Locators.clickableSquare(page, coordinates).click()
  await expect(Locators.selectedPiece(page, coordinates)).toBeVisible()
}

export const movePiece = async (page: Page, from: GamePosition, to: GamePosition, color: PieceColor = PIECE_COLORS.ORANGE): Promise<void> => {
  await selectPiece(page, from, color)
  await Locators.clickableSquare(page, to).click()
}

const performJump = async (page: Page, jumpMove: MoveData): Promise<void> => {
  if (!jumpMove.isJump || !jumpMove.capturedPiece) {
    throw new Error('Invalid jump move data: isJump must be true and capturedPiece must be defined')
  }

  const playerColor = jumpMove.playerColor || PIECE_COLORS.ORANGE
  const capturedColor = playerColor === PIECE_COLORS.ORANGE ? PIECE_COLORS.BLUE : PIECE_COLORS.ORANGE
  const capturedPiece = jumpMove.capturedPiece
  await expect(Locators.piece(page, capturedPiece, capturedColor)).toBeVisible()
  await movePiece(page, jumpMove.from, jumpMove.to, playerColor)
  await expect(Locators.emptySquare(page, capturedPiece)).toBeVisible()
}

export const checkGameOver = async (page: Page, timeout = DEFAULT_GAME_OVER_TIMEOUT): Promise<GameStatus> => {
  try {
    const gameOverMessage = Locators.messageText(page, gameMessages.gameOver)
    await expect(gameOverMessage).toBeVisible({ timeout })

    const messageText = await gameOverMessage.textContent()

    if (!messageText) {
      return GAME_STATUS.IN_PROGRESS
    }

    if (gameMessages.playerWin.test(messageText)) {
      return GAME_STATUS.ORANGE_WINS
    }

    if (gameMessages.playerLose.test(messageText)) {
      return GAME_STATUS.BLUE_WINS
    }

    return GAME_STATUS.IN_PROGRESS
  }
  catch {
    return GAME_STATUS.IN_PROGRESS
  }
}

export const verifyPieceAtPosition = async (
  page: Page,
  coordinates: GamePosition,
  color: PieceColor,
  isKing = false
): Promise<void> => {
  const pieceState = isKing ? PIECE_STATES.KING : PIECE_STATES.NORMAL
  await expect(Locators.piece(page, coordinates, color, pieceState)).toBeVisible()
}

export const verifyEmptySquare = async (page: Page, coordinates: GamePosition): Promise<void> => {
  await expect(Locators.emptySquare(page, coordinates)).toBeVisible()
}

export const countPieces = async (page: Page, color: PieceColor): Promise<number> => {
  return await Locators.allPieces(page, color).count()
}

export const verifyGameMessage = async (page: Page, expectedMessage: string | RegExp): Promise<void> => {
  await expect(Locators.messageDisplay(page)).toContainText(expectedMessage)
}

export const performPlayerTurn = async (page: Page, move: MoveData): Promise<void> => {
  if (move.isJump) {
    await performJump(page, move)
  }
  else {
    const playerColor = move.playerColor || PIECE_COLORS.ORANGE
    await movePiece(page, move.from, move.to, playerColor)
  }
}

export const deselectPiece = async (page: Page, coordinates: GamePosition): Promise<void> => {
  await Locators.selectedPiece(page, coordinates).click()
  await expect(Locators.piece(page, coordinates, PIECE_COLORS.ORANGE)).toBeVisible()
  await expect(Locators.selectedPiece(page, coordinates)).toBeHidden()
}

export const verifyPieceCounts = async (
  page: Page,
  expectedOrange: number,
  expectedBlue: number
): Promise<void> => {
  const orangeCount = await countPieces(page, PIECE_COLORS.ORANGE)
  const blueCount = await countPieces(page, PIECE_COLORS.BLUE)
  expect(orangeCount).toBe(expectedOrange)
  expect(blueCount).toBe(expectedBlue)
}

const verifyWinnerPieceCount = async (page: Page, winner: PieceColor): Promise<void> => {
  const loserColor = winner === PIECE_COLORS.ORANGE ? PIECE_COLORS.BLUE : PIECE_COLORS.ORANGE
  const loserCount = await countPieces(page, loserColor)
  expect(loserCount).toBe(0)
}

export const verifyGameEndResult = async (
  page: Page,
  expectedResult: GameStatus
): Promise<void> => {
  const gameResult = await checkGameOver(page)

  expect(gameResult).toBe(expectedResult)

  if (expectedResult === GAME_STATUS.ORANGE_WINS) {
    await verifyWinnerPieceCount(page, PIECE_COLORS.ORANGE)
  }
  else if (expectedResult === GAME_STATUS.BLUE_WINS) {
    await verifyWinnerPieceCount(page, PIECE_COLORS.BLUE)
  }
}

export const verifyBoardState = async (page: Page, expectedGameState: GameState): Promise<void> => {
  const currentBoardArray = await captureBoardState(page)
  const expectedBoardArray = generateBoardArray(expectedGameState)
  expect(currentBoardArray).toEqual(expectedBoardArray)
}

export const verifyGameInProgress = async (page: Page, timeout?: number): Promise<void> => {
  const gameResult = await checkGameOver(page, timeout)
  expect(gameResult).toBe(GAME_STATUS.IN_PROGRESS)
}

export const verifyPieceSelection = async (
  page: Page,
  coordinates: GamePosition,
  isSelected: boolean,
  color: PieceColor = PIECE_COLORS.ORANGE
): Promise<void> => {
  if (isSelected) {
    await expect(Locators.selectedPiece(page, coordinates)).toBeVisible()
  }
  else {
    await expect(Locators.selectedPiece(page, coordinates)).toBeHidden()
    await expect(Locators.piece(page, coordinates, color)).toBeVisible()
  }
}

export const verifyGameStateAfterMove = async (
  page: Page,
  expectedOrangePieces: number,
  expectedBluePieces: number,
  shouldBeInProgress = true
): Promise<void> => {
  await verifyPieceCounts(page, expectedOrangePieces, expectedBluePieces)

  if (shouldBeInProgress) {
    await verifyGameInProgress(page)
  }
}

export const attemptInvalidPieceSelection = async (
  page: Page,
  coordinates: GamePosition,
  expectedError: string | RegExp
): Promise<void> => {
  await Locators.clickableSquare(page, coordinates).click()
  await expect(Locators.messageDisplay(page)).toContainText(expectedError)
}
