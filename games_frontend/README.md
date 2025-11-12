# Games Frontend (React) — Ocean Professional UI

This frontend implements the “games” UI with a modern, lightweight React stack, Ocean Professional theme, client-side routing, and a minimal test suite.

## Project setup and run

This project uses Create React App with React Router.

- Prerequisites:
  - Node.js 18+ and npm
- Install:
  - npm install
- Start (development):
  - npm start
  - The app runs at http://localhost:3000 by default (can be overridden via REACT_APP_PORT, see Environment variables).
- Build (production):
  - npm run build
- Test:
  - npm test
  - JUnit output is configured via jest-junit if set up in CI; locally this opens Jest watch mode.

## Ocean Professional theme

The design system is implemented with CSS variables in src/theme.css. The “Ocean Professional” palette uses blue and amber accents and supports light and dark modes.

Key tokens (light mode):
- --color-primary: #2563EB
- --color-secondary: #F59E0B
- --color-success: #F59E0B
- --color-error: #EF4444
- --color-background: #f9fafb
- --color-surface: #ffffff
- --color-text: #111827
- --color-text-muted: #6B7280
- --color-border: #E5E7EB
- --color-hover: #F3F4F6
- --gradient-subtle: linear-gradient(180deg, rgba(59,130,246,0.06), rgba(249,250,251,1))

There are radius, shadow, spacing, and typography tokens as well. Dark mode overrides are applied under :root[data-theme='dark'].

How theme is toggled:
- The ThemeProvider in src/hooks/useTheme.js manages a “light”/“dark” state, persists it to localStorage under key ui-theme, and applies data-theme on the <html> element.
- The Navbar renders a ThemeToggle button that calls useTheme().toggleTheme(), updating the attribute and re-resolving CSS tokens.
- The default theme follows the saved preference if present; otherwise it uses the system preference via matchMedia.

Steps to integrate tokens in components:
- Use CSS classes and the provided variables in src/App.css and src/theme.css (for example, background: var(--color-surface); color: var(--color-text)).
- Avoid hardcoding colors; prefer the tokens for consistent theming.

## Routes, pages, and key components

Routing is declared in src/App.js (with a central listing also in src/routes.js):

- Layout: src/components/Layout.jsx
  - Wraps pages with Navbar and Footer and provides the main container.
- Pages:
  - / → Home (src/pages/Home.jsx)
    - Lists games from src/data/games.json.
    - Includes SearchBar and category filter “pills”.
  - /games/:id → GameDetails (src/pages/GameDetails.jsx)
    - Shows a details header with badges and placeholder tab section.
  - * → NotFound (src/pages/NotFound.jsx)
    - 404 page with a link back home.
- Shared components:
  - Navbar (src/components/Navbar.jsx) — brand, navigation links, and ThemeToggle.
  - Footer (src/components/Footer.jsx)
  - Tile (src/components/Tile.jsx) — base card container.
  - Badge (src/components/Badge.jsx) — small status chips using theme tokens.
  - GameCard (src/components/GameCard.jsx) — tile for each game in grid.
  - SearchBar (src/components/SearchBar.jsx) — accessible search input.

App entry:
- src/index.js initializes BrowserRouter and renders App.
- src/App.js wraps the app with ThemeProvider, sets up Routes and code-splits GameDetails with React.lazy/Suspense.

## Figma-exported assets

Place exported assets from Figma under src/assets. For example, replacing the placeholder logo:

1) Copy your logo file into src/assets, e.g., src/assets/logo.svg or logo.png.
2) Update the import in the relevant component:
   - In src/components/Navbar.jsx, replace:
     import logo from '../assets/logo.svg';
   with your asset path:
     import logo from '../assets/your_logo.svg';
3) Reference the asset in <img src={logo} alt="" /> or as a background in CSS.
4) Commit the asset to the repository so the build can resolve it. Avoid extremely large files; optimize SVG/PNG when possible.

Other components that may reference assets:
- GameCard can show game cover images. You can add image URLs into src/data/games.json or import local images under src/assets and assign them per game.

## Environment variables (REACT_APP_*)

Configuration is read via src/config/env.js. Create React App exposes only variables prefixed with REACT_APP_. This project uses the following keys:

- REACT_APP_API_BASE
- REACT_APP_BACKEND_URL
- REACT_APP_FRONTEND_URL
- REACT_APP_WS_URL
- REACT_APP_NODE_ENV
- REACT_APP_NEXT_TELEMETRY_DISABLED
- REACT_APP_ENABLE_SOURCE_MAPS
- REACT_APP_PORT
- REACT_APP_TRUST_PROXY
- REACT_APP_LOG_LEVEL
- REACT_APP_HEALTHCHECK_PATH
- REACT_APP_FEATURE_FLAGS
- REACT_APP_EXPERIMENTS_ENABLED

Behavior details:
- getConfig() safely reads values, logs a warning in development for missing keys, and parses booleans and feature flags.
- FEATURE_FLAGS parsing:
  - Accepts JSON objects like {"newNav": true, "beta": false}
  - Accepts JSON arrays like ["newNav","beta"] → becomes { newNav: true, beta: true }
  - Accepts comma-separated strings like newNav,beta → becomes { newNav: true, beta: true }
- The useFeatureFlags() hook returns { flags, has } for feature gating in components.
- LOG_LEVEL controls the console logger in src/utils/logger.js.

Setting variables:
- You can create a .env file at the project root (games_frontend) with:
  REACT_APP_API_BASE=https://api.example.com
  REACT_APP_LOG_LEVEL=info
  REACT_APP_FEATURE_FLAGS=newNav,beta
- Restart the dev server after changing .env.

Ports:
- CRA dev server binds to port 3000 by default. The REACT_APP_PORT value is for app-level config and display; changing the actual dev server port requires setting PORT env var when starting, for example:
  PORT=3001 npm start
  Note: REACT_APP_PORT is read in code for consistency but does not change the CRA dev server port on its own.

## Tests and how to run

Test framework:
- Jest and React Testing Library configured via CRA. Setup file src/setupTests.js includes @testing-library/jest-dom.

Where tests live:
- src/App.test.js — app smoke test validating the Home title is rendered.
- src/__tests__/test_home.jsx — validates loading skeletons, search, and category filters.
- src/__tests__/test_routing.jsx — validates route rendering for /, /games/:id, and 404.
- src/__tests__/test_theme.jsx — validates theme toggling and persistence.

Run locally:
- npm test
- Press a to run all tests in watch mode. In CI, Jest can be run in non-interactive mode via CI=true npm test.

Notes:
- Some tests rely on timers (Home simulates 300ms loading). They use Jest fake timers and advance time to complete loading.
- Theme tests assert the data-theme attribute on <html> and localStorage persistence (key: ui-theme).

## Folder structure (selected)

- src/index.js — App bootstrap and router.
- src/App.js — Routes and providers.
- src/theme.css — Ocean Professional tokens (light + dark).
- src/App.css — Component styles using the tokens.
- src/components/ — Reusable UI pieces (Navbar, Tile, etc.).
- src/pages/ — Page-level components (Home, GameDetails, NotFound).
- src/data/games.json — Sample data for Home and GameDetails grids.
- src/config/env.js — Environment handling and feature flag parsing.
- src/hooks/useTheme.js — Theme context and persistence.
- src/hooks/useFeatureFlags.js — Feature flags hook.
- src/__tests__/ — Tests.

## Troubleshooting

- If environment variables are not picked up, ensure they are prefixed with REACT_APP_ and the dev server is restarted.
- If assets do not load, verify correct import paths and that files exist under src/assets.
- To adjust the theme or create custom variants, change tokens in src/theme.css and use them in your component styles.

