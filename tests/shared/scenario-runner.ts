/* eslint-disable playwright/valid-title */
import { test } from '../fixtures'
import type { BoardTestScenario } from './types'
import * as Actions from '../board/actions/board.actions'

export const runScenarioTests = (
  scenarios: Record<string, BoardTestScenario>,
  suiteName: string
): void => {
  test.describe(suiteName, () => {
    for (const scenario of Object.values(scenarios)) {
      test.describe(scenario.name, () => {
        test.use({ boardState: scenario.boardState })

        test(scenario.description || scenario.name, async ({ checkersPage: page }) => {
          await Actions.verifyPieceCounts(page, scenario.expectedOrangePieces, scenario.expectedBluePieces)

          for (const move of scenario.moves) {
            await Actions.performPlayerTurn(page, move)
          }

          await Actions.verifyGameEndResult(page, scenario.expectedResult)
        })
      })
    }
  })
}
