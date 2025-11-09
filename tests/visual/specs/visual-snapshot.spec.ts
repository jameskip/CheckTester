import { test, expect } from '../../fixtures'
import * as Locators from '../../board/locators/board.locators'
import * as VisualData from '../data/visual.data'

test.describe('TC5: Visual Snapshot Tests', () => {
  for (const scenario of VisualData.visualTestScenarios) {
    test.describe(`${scenario.name}`, () => {
      test.use({ boardState: scenario.boardState })

      test('should capture snapshot', async ({ checkersPage: page }) => {
        const target = scenario.useFullPage ? page : Locators.gameWrapper(page)
        await expect(target).toHaveScreenshot(scenario.screenshotName)
      })
    })
  }
})
