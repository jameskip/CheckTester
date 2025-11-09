# CheckTester

> Comprehensive Playwright test suite for a browser-based Checkers Game (English Draughts)

A production-ready automated testing framework that validates game mechanics, UI behavior, and visual consistency using programmatic board state control and Playwright's end-to-end testing capabilities.

## Table of Contents

- [About](#about)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Quick Start](#quick-start)
- [Running Tests](#running-tests)
- [Project Structure](#project-structure)
- [Test Architecture](#test-architecture)
- [Test Coverage](#test-coverage)
- [Configuration](#configuration)
- [Test Reporting](#test-reporting)
- [CI/CD Integration](#cicd-integration)
- [Troubleshooting](#troubleshooting)
- [Documentation](#documentation)
- [Resources](#resources)

## About

CheckTester is an automated test suite for a checkers game application that validates:

- **Game Mechanics**: Piece movement, jump captures, king promotions, turn management
- **Game Rules**: English Draughts standard rules enforcement
- **Win/Lose Conditions**: Victory detection and endgame scenarios
- **UI Feedback**: Visual selection states, game messages, sprite rendering
- **Visual Consistency**: Screenshot-based regression testing

**Testing Strategy Highlight**: The application is self-hosted to enable **programmatic board state control** via sessionStorage injection. This approach allows testing specific scenarios (e.g., endgame positions, edge cases) without manually playing through dozens of moves, ensuring deterministic and fast test execution.

## Key Features

- **25+ Test Scenarios** covering all game mechanics and edge cases
- **Custom Board State Injection** for testing complex scenarios instantly
- **Page Object Model** architecture with centralized locators and actions
- **Visual Regression Testing** with baseline screenshot comparison
- **Data-Driven Tests** with reusable board configurations
- **TypeScript** for type safety and enhanced IDE support
- **HTML Reports** with screenshots and traces on failure
- **CI/CD Ready** with GitHub Actions workflow example

## Technology Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| Test Framework | [Playwright](https://playwright.dev) | ^1.56.1 |
| Language | TypeScript | ^5.9.3 |
| Runtime | Node.js (LTS) | 20.x or higher |
| Browser | Chromium (Desktop Chrome) | Latest |
| Linting | ESLint | ^9.39.1 |
| App Server | npx serve | Latest |

## Getting Started

### Prerequisites

- **Node.js** 20.x LTS or higher ([Download](https://nodejs.org/))
- **npm** 9.0.0 or higher (comes with Node.js)
- **Git** for version control

Verify your installation:

```bash
node --version  # Should be v20.0.0 or higher
npm --version   # Should be 9.0.0 or higher
```

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd CheckTester
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Install Playwright Chromium browser**

   ```bash
   npx playwright install chromium
   ```

   This downloads only the Chromium browser binary needed for test execution (~120MB).

   > **Note for Linux users:** Add `--with-deps` flag to install system dependencies:
   > ```bash
   > npx playwright install chromium --with-deps
   > ```

### Quick Start

Run all tests with a single command:

```bash
npm test
```

The test suite will:
1. Start the checkers game server on `http://localhost:3000`
2. Execute all test cases
3. Generate an HTML report
4. Display results in the terminal

## Running Tests

### Test Execution Commands

```bash
# Run all tests
npm test

# Run tests in headed mode (visible browser)
npm run test:headed

# Run tests with Playwright UI mode (interactive debugging)
npm run test:ui

# Run tests in debug mode (step-by-step execution)
npm run test:debug

# Run specific test file
npx playwright test tests/board/basic-movement.spec.ts

# Run specific test by name
npx playwright test -g "should select and deselect a piece"

# Run tests with specific reporter
npx playwright test --reporter=line

# Update visual snapshots (after intentional UI changes)
npx playwright test --update-snapshots
```

### Test Execution Options

| Command | Use Case |
|---------|----------|
| `npm test` | Standard test run (CI/CD, daily testing) |
| `npm run test:headed` | Visual debugging (see browser actions) |
| `npm run test:ui` | Interactive test development |
| `npm run test:debug` | Step-by-step debugging |
| `npx playwright test --update-snapshots` | Update visual regression baselines |

## Project Structure

```
CheckTester/
├── tests/                          # Test suites
│   ├── fixtures.ts                 # Custom test fixtures (board state injection)
│   ├── board/                      # Board interaction tests
│   │   ├── actions/                # Board action handlers
│   │   │   └── board.actions.ts    # High-level game actions
│   │   ├── data/                   # Board test data
│   │   │   └── board.data.ts       # Board states and constants
│   │   ├── locators/               # Element selectors
│   │   │   └── board.locators.ts   # Element selectors
│   │   └── specs/                  # Board test specifications
│   │       ├── basic-movement.spec.ts      # Core movement mechanics (9 tests)
│   │       └── board-configuration.spec.ts # Custom state tests (3 tests)
│   ├── gameplay/                   # Game scenarios
│   │   ├── data/                   # Gameplay test data
│   │   │   ├── endgame.data.ts     # Endgame configurations
│   │   │   └── gameplay.data.ts    # Gameplay test data
│   │   └── specs/                  # Gameplay test specifications
│   │       ├── endgame-scenarios.spec.ts   # Win/lose conditions (5 tests)
│   │       └── gameplay-scenarios.spec.ts  # Common scenarios (5 tests)
│   ├── shared/                     # Shared utilities and types
│   │   ├── constants.ts            # Test constants
│   │   ├── scenario-runner.ts      # Scenario execution utilities
│   │   ├── types.ts                # TypeScript type definitions
│   │   └── utils.ts                # Utility functions
│   └── visual/                     # Visual regression
│       ├── data/                   # Visual test data
│       │   └── visual.data.ts      # Visual test states
│       └── specs/                  # Visual test specifications
│           ├── visual-snapshot.spec.ts     # Screenshot tests (3 tests)
│           └── visual-snapshot.spec.ts-snapshots/  # Generated snapshots
├── public/                         # Checkers game application
│   ├── checkers.html               # Game HTML interface
│   ├── default.css                 # Game stylesheets
│   └── default.js                  # Game JavaScript logic
├── playwright-report/              # Generated test reports
│   └── index.html                  # HTML test report
├── test-results/                   # Test execution artifacts
├── eslint.config.js                # ESLint configuration
├── playwright.config.ts            # Playwright configuration
├── tsconfig.json                   # TypeScript configuration
├── package.json                    # Dependencies and scripts
├── TESTPLAN.md                     # Comprehensive test plan documentation
└── README.md                       # This file
```

## Test Architecture

### Architecture Overview

```
Test Specs
    ↓
Fixtures (Board State Injection)
    ↓
Locators (Element Selectors) ←→ Actions (Game Interactions) ←→ Test Data
    ↓
Checkers Application
    ↓
Assertions & Reports
```

### Architectural Components

| Component | File | Purpose |
|-----------|------|---------|
| **Fixtures** | [fixtures.ts](tests/fixtures.ts) | Custom board state injection, page setup/teardown |
| **Locators** | [board.locators.ts](tests/board/locators/board.locators.ts) | Centralized element selectors |
| **Actions** | [board.actions.ts](tests/board/actions/board.actions.ts) | High-level game interaction methods |
| **Data** | `*.data.ts` | Board configurations, expected states, test scenarios |

### Custom Board State Injection

The test suite uses a **custom fixture** that injects board states into the game's sessionStorage before page load. This enables:

- **Testing specific scenarios** without manual setup (e.g., "orange piece one move from king promotion")
- **Deterministic tests** by eliminating AI randomness
- **Fast execution** (~10 seconds per test vs. ~5 minutes to play manually)
- **Edge case coverage** for rare game situations

**Implementation**: [fixtures.ts:14-20](tests/fixtures.ts#L14-L20)

```typescript
// Example: Load game with custom board state
await use({
  ...page,
  async goto(url: string) {
    await page.addInitScript((state) => {
      sessionStorage.setItem('boardState', JSON.stringify(state));
    }, customBoardState);
    await page.goto(url);
  },
});
```

## Test Coverage

### Test Suites

| Test Suite | Test Count | Priority | Execution Time | Description |
|------------|-----------|----------|----------------|-------------|
| **TC1: Basic Movement** | 9 | P0 | ~30s | Core mechanics, selection, movement |
| **TC2: Gameplay Scenarios** | 5 | P0 | ~25s | Common game situations |
| **TC4: Board Configuration** | 3 | P1 | ~10s | Custom state validation |
| **TC5: Endgame Scenarios** | 5 | P1 | ~20s | Win conditions, king movements |
| **TC6: Visual Snapshots** | 3 | P2 | ~15s | Visual regression detection |
| **Total** | **25** | - | **~100s** | Full suite execution |

### Game Rule Coverage

| Checkers Rule | Coverage | Test Cases |
|--------------|----------|------------|
| Diagonal-only movement | 100% | TC1.3, TC1.5 |
| Forward movement (non-king) | 100% | TC1.5 |
| Jump to capture | 100% | TC2.4, TC5.2, TC5.4 |
| King promotion at row 7 | 100% | TC2.3, TC4.1 |
| King bidirectional movement | 80% | TC5.1, TC5.2 |
| Turn alternation | 100% | TC1.6, TC1.7 |
| Win by capturing all pieces | 100% | TC5.2, TC5.4, TC5.5 |

### Test Categories

- **Basic Movement**: Piece selection, deselection, valid/invalid moves
- **Game Mechanics**: Jump captures, king promotions, turn management
- **Win Conditions**: Player victory, computer victory, endgame scenarios
- **Visual Regression**: Screenshot comparison for UI consistency

## Configuration

### Playwright Configuration

The [playwright.config.ts](playwright.config.ts) file controls test execution behavior:

```typescript
export default defineConfig({
  testDir: './tests',              // Test location
  fullyParallel: true,             // Run tests in parallel
  retries: process.env.CI ? 2 : 0, // Retry on CI only
  reporter: [['list'], ['html']],  // Console + HTML reports
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',       // Trace on failures
    screenshot: 'only-on-failure', // Screenshots on failures
    video: 'off',                  // Videos disabled
  },
  webServer: {
    command: 'npx serve ./public -l 3000',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});
```

### TypeScript Configuration

TypeScript settings in [tsconfig.json](tsconfig.json) ensure type safety:

- **ES Modules** support (`"module": "ESNext"`)
- **Strict type checking** enabled
- **Playwright types** included
- **Node.js types** available

### ESLint Configuration

Linting rules in [eslint.config.js](eslint.config.js):

```bash
# Run linter
npm run lint

# Auto-fix linting issues
npm run lint:fix
```

## Test Reporting

### HTML Reports

After test execution, view the detailed HTML report:

```bash
npm run test:report
```

The report includes:
- Test execution summary
- Pass/fail status for each test
- Screenshots of failures
- Execution traces
- Timing information

Report location: `playwright-report/index.html`

### Test Artifacts

| Artifact | Location | When Generated |
|----------|----------|----------------|
| HTML Report | `playwright-report/` | After every test run |
| Screenshots | `test-results/` | On test failure |
| Traces | `test-results/` | On first retry |
| Visual Baselines | `tests/visual/*.png` | First run or `--update-snapshots` |

### Viewing Test Results

```bash
# View last test report
npm run test:report

# View specific test trace
npx playwright show-trace test-results/[test-name]/trace.zip

# View visual diff
npx playwright show-report
```

## CI/CD Integration

### GitHub Actions

Create `.github/workflows/playwright.yml`:

```yaml
name: Playwright Tests
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright Chromium Browser
        run: npx playwright install chromium --with-deps

      - name: Run Playwright tests
        run: npm test

      - name: Upload test report
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30

      - name: Upload test results
        uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: test-results
          path: test-results/
          retention-days: 7
```

### Environment Variables

Configure for different environments:

```bash
# Run tests in CI mode (with retries)
CI=true npm test

# Use specific base URL
BASE_URL=http://staging.example.com npm test
```

## Troubleshooting

### Common Issues

#### Tests fail with "Browser not found"

```bash
# Solution: Install Chromium browser
npx playwright install chromium

# Or install all browsers (if needed for other projects)
npx playwright install
```

#### Tests timeout waiting for localhost:3000

```bash
# Solution: Verify port 3000 is available
lsof -ti:3000 | xargs kill -9  # Kill process on port 3000
npm test                        # Retry
```

#### Visual snapshot tests failing after UI changes

```bash
# Solution: Update visual baselines (if changes are intentional)
npx playwright test --update-snapshots
```

#### Tests fail with "sessionStorage is not defined"

**Cause**: Tests may be running before page initialization

**Solution**: Ensure fixture is properly injecting state before page load

#### TypeScript errors in IDE

```bash
# Solution: Rebuild TypeScript definitions
npm install
npx tsc --noEmit
```

### Debug Mode

For step-by-step debugging:

```bash
# Debug specific test
npx playwright test --debug tests/board/basic-movement.spec.ts

# Debug with headed browser
npx playwright test --headed --debug

# Debug with Playwright Inspector
PWDEBUG=1 npm test
```

### Getting Help

- **Playwright Docs**: [playwright.dev/docs](https://playwright.dev/docs/intro)
- **GitHub Issues**: [microsoft/playwright/issues](https://github.com/microsoft/playwright/issues)
- **Discord**: [Playwright Discord Community](https://discord.gg/playwright-807756831384403968)

## Documentation

- **[TESTPLAN.md](TESTPLAN.md)**: Comprehensive test strategy, test cases, and architecture documentation
- **[Playwright Best Practices](https://playwright.dev/docs/best-practices)**: Official testing best practices
- **[Playwright API Reference](https://playwright.dev/docs/api/class-playwright)**: Complete API documentation

## Resources

### Playwright Documentation

- [Getting Started](https://playwright.dev/docs/intro)
- [Writing Tests](https://playwright.dev/docs/writing-tests)
- [Test Fixtures](https://playwright.dev/docs/test-fixtures)
- [Visual Comparisons](https://playwright.dev/docs/test-snapshots)
- [Debugging Tests](https://playwright.dev/docs/debug)

### Testing Best Practices

- [Page Object Model](https://playwright.dev/docs/pom)
- [Test Isolation](https://playwright.dev/docs/test-isolation)
- [Locator Best Practices](https://playwright.dev/docs/locators)
- [Auto-waiting](https://playwright.dev/docs/actionability)

### Project-Specific

- **Test Plan**: See [TESTPLAN.md](TESTPLAN.md) for detailed test strategy
- **Board Coordinate System**: Explained in [TESTPLAN.md#appendix-a](TESTPLAN.md#a-board-coordinate-system)
- **Piece Sprite Reference**: See [TESTPLAN.md#appendix-b](TESTPLAN.md#b-piece-sprite-reference)

---

**Project Status**: Active Development
**Last Updated**: 2025-11-07
**Maintained By**: QA Engineering Team
