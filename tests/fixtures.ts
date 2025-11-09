import { test as base, Page } from '@playwright/test'
import * as Actions from './board/actions/board.actions'
import type { GameState, CheckersOptions, CheckersFixtures } from './shared/types'
import { commonBoardStates } from './board/data/board.data'

const setBoardState = async (page: Page, gameState: GameState): Promise<void> => {
  const boardArray = Actions.generateBoardArray(gameState)

  await page.addInitScript((customBoardArray) => {
    window.sessionStorage.setItem('checkersCustomBoardState', JSON.stringify(customBoardArray))
  }, boardArray)
}

export const test = base.extend<CheckersOptions & CheckersFixtures>({
  boardState: [commonBoardStates.initial, { option: true }],

  checkersPage: async ({ page, boardState }, use, testInfo) => {
    if (boardState) {
      await setBoardState(page, boardState)
    }

    await Actions.navigateToGame(page)

    await use(page)

    const boardArray = await Actions.captureBoardState(page)
    const board8x8 = Actions.formatBoardAs8x8(boardArray)
    const formattedBoard = Actions.formatBoard8x8ToString(board8x8)

    testInfo.annotations.push({
      type: 'Final Board State',
      description: formattedBoard
    })
  }
})

export { expect } from '@playwright/test'
export type { Page } from '@playwright/test'
