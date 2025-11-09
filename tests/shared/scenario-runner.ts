/* eslint-disable playwright/valid-title */
import { test } from '../fixtures'
import type { GameState, BoardTestScenario } from './types'
import * as Actions from '../board/actions/board.actions'

export const runScenarioTests = (
  scenarios: Record<string, BoardTestScenario>,
  suiteName: string
): void => {
  test.describe(suiteName, () => {
    for (const [_scenarioKey, scenario] of Object.entries(scenarios)) {
      test.describe(scenario.name, () => {
        if (scenario.boardState) {
          test.use({ boardState: scenario.boardState as GameState })
        }

        test(scenario.description || scenario.name, async ({ checkersPage: page }) => {
          if (scenario.expectedOrangePieces !== undefined && scenario.expectedBluePieces !== undefined) {
            await Actions.verifyPieceCounts(page, scenario.expectedOrangePieces, scenario.expectedBluePieces)
          }

          if (scenario.moves) {
            for (const move of scenario.moves) {
              await Actions.movePiece(page, move.from, move.to)
            }
          }

          if (scenario.expectedResult !== undefined) {
            await Actions.verifyGameEndResult(page, scenario.expectedResult)
          }
        })
      })
    }
  })
}
