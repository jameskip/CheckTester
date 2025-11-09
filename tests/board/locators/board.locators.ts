import { Page, Locator } from '@playwright/test'
import {
  PIECE_STATES,
  SQUARE_STATES,
  PIECE_SRC_PATTERNS,
  SQUARE_SRC_PATTERNS,
  SQUARE_NAME_PREFIX
} from '../../shared/types'
import type {
  GamePosition,
  PieceColor,
  PieceState,
  SquareState
} from '../../shared/types'

export const piece = (
  page: Page,
  coordinates: GamePosition,
  color: PieceColor,
  state: PieceState = PIECE_STATES.NORMAL
): Locator => {
  const srcPattern = PIECE_SRC_PATTERNS[color][state]
  return page.locator(`img[name="${SQUARE_NAME_PREFIX}${coordinates.x}${coordinates.y}"][src*="${srcPattern}"]`)
}

const square = (
  page: Page,
  coordinates: GamePosition,
  state: SquareState
): Locator => {
  const srcPattern = SQUARE_SRC_PATTERNS[state]
  return page.locator(`img[name="${SQUARE_NAME_PREFIX}${coordinates.x}${coordinates.y}"][src*="${srcPattern}"]`)
}

export const selectedPiece = (page: Page, coordinates: GamePosition): Locator =>
  page.locator(`img[name="${SQUARE_NAME_PREFIX}${coordinates.x}${coordinates.y}"][src*="you2"], img[name="${SQUARE_NAME_PREFIX}${coordinates.x}${coordinates.y}"][src*="me2"]`)

export const emptySquare = (page: Page, coordinates: GamePosition): Locator =>
  square(page, coordinates, SQUARE_STATES.EMPTY)

export const messageDisplay = (page: Page): Locator =>
  page.locator('#message, p[align="center"]')

export const gameWrapper = (page: Page): Locator =>
  page.locator('.gameWrapper')

export const messageText = (page: Page, text: string | RegExp): Locator =>
  messageDisplay(page).filter({ hasText: text })

export const allPieces = (page: Page, color: PieceColor): Locator => {
  const normalPattern = PIECE_SRC_PATTERNS[color][PIECE_STATES.NORMAL]
  const kingPattern = PIECE_SRC_PATTERNS[color][PIECE_STATES.KING]
  const selectedPattern = PIECE_SRC_PATTERNS[color][PIECE_STATES.SELECTED]
  return page.locator(`img[src*="${normalPattern}"], img[src*="${kingPattern}"], img[src*="${selectedPattern}"]`)
}

export const clickableSquare = (page: Page, coordinates: GamePosition): Locator =>
  page.locator(`img[name="${SQUARE_NAME_PREFIX}${coordinates.x}${coordinates.y}"]`)
