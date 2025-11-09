import type { BoardTestScenario, GamePosition, ScenarioTestData } from './types'

export const calculatePosition = (
  base: GamePosition,
  offset: { dx: number, dy: number }
): GamePosition => ({
  x: base.x + offset.dx,
  y: base.y + offset.dy
})

export const extractScenarioTestData = (scenario: BoardTestScenario): ScenarioTestData => {
  if (!scenario.moves || scenario.moves.length < 2) {
    throw new Error(`Scenario must have at least 2 moves, found ${scenario.moves?.length ?? 0}`)
  }

  if (!scenario.boardState.bluePieces || scenario.boardState.bluePieces.length === 0) {
    throw new Error('Scenario must have at least one blue piece')
  }

  if (!scenario.boardState.orangePieces || scenario.boardState.orangePieces.length < 2) {
    throw new Error('Scenario must have at least two orange pieces')
  }

  const [firstMove, secondMove] = scenario.moves

  return {
    firstMove,
    secondMove,
    firstMoveFrom: firstMove.from,
    firstMoveTo: firstMove.to,
    secondMoveFrom: secondMove.from,
    secondMoveTo: secondMove.to,
    firstBluePosition: scenario.boardState.bluePieces[0].position,
    secondOrangePosition: scenario.boardState.orangePieces[1].position,
    boardState: scenario.boardState,
    allMoves: scenario.moves
  }
}
