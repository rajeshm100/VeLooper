# VELoop Rewards: React + Vite

The VELoop rewards and level-up dashboard, converted from a single `index.html` into a
component-based React app. Same design, same colours, same content.

> **Status: conversion complete (3 of 3 sessions).** Every section of the original page is now a
> React component: layout shell, hero, stats strip, level roadmap with the animated reward tower,
> Earn more XP, Lucky Box and Daily Puzzle on a shared game framework, achievements, the activity
> feed, the level-up modal and toasts. See [`docs/MIGRATION_PLAN.md`](docs/MIGRATION_PLAN.md) for the log and ideas for next steps.

## Technology stack

| Purpose | Library |
|---|---|
| UI | **React 18** + **React Hooks** |
| Build / dev server | **Vite 5** (`@vitejs/plugin-react`) |
| Layout and base styles | **Bootstrap 5** (grid + reboot) and **react-bootstrap** (tooltips now, modal in session 2) |
| Component styles | **CSS Modules** (`*.module.css`) |
| Icons | **Lucide React** (UI icons) and **React Icons** (stat and activity icons) |
| Animation | **Framer Motion** (scroll reveal, modal) and **canvas-confetti** (level-up, session 2) |
| Helpers | **clsx** (class names) |

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the production build
npm test           # 35 unit tests: levels, XP rewards, streaks, Lucky Box odds, earn tiers, puzzle, daily limits, badges, themes
```

In development a small orange **Dev panel** (bottom left) lets you add XP and reset the demo, so you
can watch level-ups before the games are converted. It is removed from production builds.

## Folder structure

```text
src/
├── main.jsx                 # entry: Bootstrap CSS, global styles, <PlayerProvider><App/>
├── App.jsx                  # shell: banner, header, sticky bar, page, footer, back-to-top
├── pages/
│   └── LevelDashboard/      # arranges the sections (no logic of its own)
├── components/
│   ├── common/              # SectionCard, SectionLabel (pill), GlowButton, Reveal, ComingSoon, DevTools
│   ├── layout/              # DemoBanner, SiteHeader, SiteNav, StickyBar, SiteFooter, BackToTop
│   ├── LevelHero/           # hero card + LevelPath (current -> next)
│   ├── CurrentLevel/        # label, headline, "Level 4 · Challenger", XP line
│   ├── XPProgress/          # bar with 25/50/75% milestone dots
│   ├── NextLevelReward/     # partly locked reward card + info tooltip
│   ├── StatsStrip/          # Total XP, streak, games, best score
│   ├── EarnMoreXP/          # EarnMoreXP + EarnCard (tiers, Best Value ribbon, hover preview)
│   ├── PlayAndEarn/         # game framework: GameContainer, GameStart, GamePlay, GameResult,
│   │   │                    #   GameInfoPanel, Game.module.css
│   │   ├── LuckyBox/        # first game: LuckyBox, LuckyBoxTile (3D flip, rarity glow)
│   └── DailyPuzzle/     # second game: DailyPuzzle, PuzzlePlay, PuzzleBoard, RewardReveal, PuzzleInfo
│   ├── Achievements/        # six badges (Achievements, BadgeTile)
│   ├── XPActivity/          # session total + activity list with tone colours
│   ├── LevelUpModal/        # react-bootstrap Modal + confetti
│   ├── LevelRoadmap/        # tower + level grid (RewardTower, towerArt)
│   ├── LevelRewardCard/     # one level in the grid
│   └── LevelInfo/           # details of the level you tapped
├── context/                 # PlayerContext (XP, level, activity, stats) and ThemeContext (Classic / Neon)
├── hooks/                   # useLocalStorage, useCountUp, useScrollSpy, useMediaQuery, useReducedMotion
├── utils/                   # progress.js (levels/XP), stats.js (streaks), format.js, scroll.js (+ tests)
├── data/                    # rewardsConfig.js, copy.js, navItems.js
├── assets/                  # images (AVIF), illustrations (SVG), level badges (SVG), index.js
└── styles/                  # tokens.css (palette, role tokens, Neon theme), base.css, animations.css, micro.module.css
legacy/index.html            # the original single-file site, for reference
docs/MIGRATION_PLAN.md       # what is done, what is next, porting notes
```

## How it fits together

- **One source of truth.** `data/rewardsConfig.js` holds the levels, XP thresholds, rewards and
  earning cards. `data/copy.js` holds the text. Swap the config for an API call later; nothing else changes.
- **Logic is pure and tested.** `utils/progress.js` works out the level from XP and hands out level
  rewards (including cascades); `utils/stats.js` handles streaks. Components only display results.
- **Games share one framework.** `useGameFlow(storageKey, cooldownMs)` is the state machine
  (`start -> play -> result`, or `locked` while the cooldown runs, saved in localStorage).
  `GameContainer` shows the right screen for the phase; a game only supplies its three screens, its
  info panel and what happens on a win (`addXP` + `recordGame`). Lucky Box uses `useGameFlow` as is;
  the Daily Puzzle uses `useDailyPuzzle`, a variant with 2 reward attempts, 1 reward per day and free practice rounds.
- **Shared state.** `PlayerProvider` keeps `bonusXP`, the activity list and the stats in
  `localStorage` (keys `veloop:bonusXP`, `veloop:activity`, `veloop:stats`; games add `veloop:luckyBox`, `veloop:luckyScore` and `veloop:puzzleDay`). `usePlayer()` gives any
  component the current `xp`, `snapshot` (level, next level, percent, next reward), and the actions
  `addXP()` / `recordGame()`. Games will call these two and nothing else.
- **Styling.** Each component owns a `*.module.css`. Colours are the original `:root` palette in
  `styles/tokens.css`; the `--glow` variable (default `1`) scales every glow at once.
- **Accessibility and motion.** Buttons are real buttons, the progress bar has ARIA values, and all
  animation respects `prefers-reduced-motion`.

## Colour themes: Classic and Neon

A switch in the header (and the sticky bar) flips between two themes. The choice is saved in `localStorage`
(`veloop:theme`) and applied before the first paint, so there is no flash. Classic is the default and keeps the
original `:root` colours exactly. Neon follows the VELoop Rewards site: near-black navy, electric cyan, neon
green, gold for rewards, slate neutrals.

Components never use raw colours. They use **role tokens**, and each theme maps the roles to colours:

| Role token | Used for | Classic | Neon |
|---|---|---|---|
| `--accent-interactive` | links, active nav, focus, info blue, low-value tier | soft blue | electric cyan |
| `--cta-from / --cta-to` | main action buttons | gold gradient | neon green gradient |
| `--reward` (gold) | XP numbers, rewards, level badges, chest | gold | gold |
| `--success` | completed, positive, "just N XP to go" | pastel green | neon green |
| `--title-color` | section titles | warm yellow | off-white |
| `--label-color` | numbered section pills | warm yellow | soft cyan |
| `--text-body / --text-muted` | body and small text | white 84% / 72% | slate 300 / slate 400 |
| `--bg-primary` | page background | `#161827` | `#0b0f19` |

To add a theme, add a `[data-theme='yourname']` block in `src/styles/tokens.css`, add the name to `THEMES` in
`src/utils/theme.js`, and add a button option in `ThemeToggle.jsx`. To change the default theme, edit
`DEFAULT_THEME` in `src/utils/theme.js` (and the early script in `index.html`).

Small labels (stat names, "LV 4", badge status, card hints, pills) share one tracked-uppercase style
(`styles/micro.module.css` and the `--micro-*` tokens).

Contrast (measured in the browser): every text colour clears WCAG AA (4.5:1) in both themes. Examples in Neon:
body text 12.9:1, muted text 7.5:1, titles 17.5:1, button text on green 10.0:1.

## Design system (unchanged from the HTML version)

Numbered gold pill labels, frosted-glass cards with gradient hairline borders, solid-colour headings
with a soft glow (no gradient-clipped text, which some browsers draw wrongly), glow buttons with a
shine sweep, and a sticky glass bar after scrolling (hidden on phones).

## Daily Puzzle and achievements at a glance

| | Rule |
|---|---|
| Puzzle | 3x3 sliding tiles, 90 seconds, 2 reward attempts and 1 reward per day, practice is free and gives no XP |
| Score | `max(100, 1000 - 6 x moves - 2 x seconds)` |
| Reward | Gold (750+) +100 XP, Silver (500+) +60 XP, Bronze +30 XP |
| Shuffle | random legal moves played backwards from the solved board, so it is always solvable (tested over 500 seeds) |
| Keyboard | arrow keys slide the matching tile while the puzzle is on screen |
| Badges | First Win, 3-Day Streak, Puzzle Master (750+), Epic Find, Level 5 Champion, Regular Player (10 games) |

## Testing

`npm test` runs 32 unit tests on the pure logic in `src/utils`. During the conversion the whole UI was also
bundled and driven in a real browser (level-ups, both games, cooldowns, reloads, 320 to 1440 px widths) with
stand-ins for Bootstrap, Lucide, Framer Motion, react-bootstrap and canvas-confetti, because those packages
could not be installed offline. After your first `npm install` it is worth a quick look at: the Bootstrap
tooltips (info icons), the Lucide icons, the Framer Motion scroll reveal, the level-up modal and its confetti.
