# Migration plan: HTML to React

The original site is in `legacy/index.html` (CSS, markup and JavaScript in one file). Use it as the
reference when porting: search it for the names given below.

## Session 1: done

- [x] Vite + React project, Bootstrap, CSS Modules, folder structure
- [x] `data/` (config, copy, nav), `utils/` (progress, stats, format, scroll) with 14 unit tests
- [x] `PlayerContext` (XP, level snapshot, activity, stats, persistence)
- [x] Hooks: `useLocalStorage`, `useCountUp`, `useScrollSpy`, `useMediaQuery`, `useReducedMotion`
- [x] Layout shell: demo banner, header + nav (short labels on phones), sticky bar, footer, back-to-top
- [x] `LevelHero` (`CurrentLevel`, `XPProgress`, `NextLevelReward`, `LevelPath`) and `StatsStrip`
- [x] `LevelRoadmap` (`RewardTower`, `LevelRewardCard`, `LevelInfo`)
- [x] Dev panel to add XP and reset

## Session 2: done

- [x] `data/iconMap.js` (string key to React Icon, plus activity tone colours)
- [x] `EarnMoreXP/` + `EarnCard`: remaining-XP line, coins illustration, tiers (low <= 30, medium <= 99, high >= 100), one Best Value ribbon (first highest-XP card), locked cards, Play Games unlocks at level 2 and jumps to Lucky Box, hover / focus / tap "What's involved" preview
- [x] `PlayAndEarn/` framework: `GameContainer`, `GameStart`, `GamePlay`, `GameResult`, `GameInfoPanel`, `Game.module.css`; hooks `useGameFlow`, `useCountdown`
- [x] `LuckyBox/`: 60/30/10 rarity, XP range in thirds, 3D flip, rarity glow and sparks, 24 h cooldown that survives a reload, game score
- [x] `XPActivity/`: session total, two-column list, tone colours, glow on new entries, "x ago" labels
- [x] `LevelUpModal/`: react-bootstrap Modal, badge, reward XP, confetti (skipped for reduced motion)
- [x] `ToastHost` (`useToast()`), wired in `main.jsx`
- [x] Tests for Lucky Box odds and earn-card rules (21 tests in total)
- [x] Fixed: App no longer re-renders the whole page on every scroll event

## Session 3: done

- [x] `DailyPuzzle/` on the shared framework: `useDailyPuzzle` (2 attempts, 1 reward per day, practice), `PuzzlePlay` (timer, moves, live score, progress, arrow keys), `PuzzleBoard`, `RewardReveal` (medal, ring, sparks, count-up, stars), `PuzzleInfo` (seven panels)
- [x] `Achievements/` with six badges; progress for locked badges; silent save on load, pop-in and toast when earned later
- [x] `GameResult` gained `actions` (buttons), used by Try Again / Practice / Play Again
- [x] Placeholders removed; page now renders every section
- [x] 11 more unit tests (32 in total): puzzle shuffle solvability, moves, score, tiers, arrow keys, daily reset, badges
- [x] Responsive check at 320, 360, 414, 768, 1024 and 1440 px (no sideways overflow)

## Theme work: done (after the conversion)

- [x] Additive palette (electric cyan, neon green, night black/navy, off-white, slate) in `tokens.css`
- [x] Role tokens (interactive, cta, reward, success, title, label, nav, text) mapped per theme; all components use roles
- [x] `ThemeContext`, `ThemeToggle` (header + sticky bar), early script in `index.html`, `utils/theme.js` + tests
- [x] Shared micro-label style (`micro.module.css`)
- [x] Checked both themes at 320 to 1440 px (no overflow) and measured text contrast (all WCAG AA)

## Mobile menu: done

- [x] Hamburger button + slide-in `MobileMenu` (phones only), also in the sticky bar
- [x] Focus trap, Escape, outside tap, scroll lock, focus return, auto-close on resize
- [x] Header is shorter on phones (74px instead of 103px); title kept on one line
- [x] Fixed a doubled scroll offset that left sections 170px below the top after a jump (now one offset, 72px)

## Ideas for next steps (not required)

- Replace `data/rewardsConfig.js` with a call to `GET /api/rewards/me` (keep the same shape) and move XP granting to the server.
- Optional: follow the system setting with `prefers-color-scheme` or `prefers-contrast` when the user has not chosen a theme.
- Level 6 to 9 XP targets in `rewardsConfig.js` are placeholders from the original page; set the real numbers.
- Add Vitest + React Testing Library for component tests, and Playwright for end-to-end tests.
- Add ESLint and Prettier, and TypeScript if the team prefers.
- Code-split the games with `React.lazy` if the bundle grows.
- Real actions behind the earn-card buttons (ads, referrals, daily tasks); today they show a toast.

## Porting notes

- Replace `window.storage`-style helpers with `useLocalStorage`; keep JSON values.
- Never call `addXP` from render. Call it from event handlers or effects.
- Level rewards are granted inside `grantXP` (already done). Games must not add level rewards themselves.
- Keep `id`s on the sections: the nav, the scroll-spy and the "jump to" buttons use them.
- Do not use gradient-clipped text (`background-clip: text`) for headings; use solid colours with a glow.
- Do not move or scale items sideways on hover or in animations inside a box that scrolls (`overflow: auto`): the shift makes the box scroll sideways. Use background, glow or vertical effects instead. (Fixed once in `XPActivity`.)
- Do not name a CSS class `reveal` on anything the Lucky Box also uses; the old page had a clash.
