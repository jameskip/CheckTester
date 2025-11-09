export const PIECE_COLORS = {
  ORANGE: 'orange',
  BLUE: 'blue'
} as const

export const PIECE_STATES = {
  NORMAL: 'normal',
  KING: 'king',
  SELECTED: 'selected'
} as const

export const SQUARE_STATES = {
  EMPTY: 'empty'
} as const

export const GAME_STATUS = {
  IN_PROGRESS: 'in-progress',
  ORANGE_WINS: 'orange',
  BLUE_WINS: 'blue'
} as const

export const PIECE_SRC_PATTERNS = {
  [PIECE_COLORS.ORANGE]: {
    [PIECE_STATES.NORMAL]: 'you1',
    [PIECE_STATES.KING]: 'you1k',
    [PIECE_STATES.SELECTED]: 'you2'
  },
  [PIECE_COLORS.BLUE]: {
    [PIECE_STATES.NORMAL]: 'me1',
    [PIECE_STATES.KING]: 'me1k',
    [PIECE_STATES.SELECTED]: 'me2'
  }
} as const

export const SQUARE_SRC_PATTERNS = {
  [SQUARE_STATES.EMPTY]: 'gray'
} as const

export const INITIAL_PIECE_COUNT = 12

export const BOARD_SIZE = 64
export const BOARD_DIMENSION = 8

export const DEFAULT_GAME_OVER_TIMEOUT = 5000
export const QUICK_STATUS_CHECK_TIMEOUT = 500

export const SQUARE_NAME_PREFIX = 'space'

export const PIECE_VALUES = {
  orange: { normal: 1, king: 1.1 },
  blue: { normal: -1, king: -1.1 }
} as const

export const SRC_PATTERN_MAP = new Map([
  ['you2k', 1.1],
  ['me2k', -1.1],
  ['you1k', 1.1],
  ['me1k', -1.1],
  ['you2', 1],
  ['me2', -1],
  ['you1', 1],
  ['me1', -1]
])

export const gameMessages = {
  selectPiece: 'Select an orange piece',
  gameOver: /(You won|You lose|Game over)/i,
  playerWin: /you\s+won/i,
  playerLose: /you\s+lose/i,
  opponentPieceError: /Click on your orange piece|Select an orange piece/i
}
