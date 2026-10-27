# VeLooper – Rewards & Level-Up Dashboard

A single-page rewards dashboard where users earn XP, climb nine levels, and play a daily **Lucky Box** mini game. Built with plain HTML, CSS and JavaScript. No framework and no build step.

---

## Project Overview

VeLooper shows a user's reward progress at a glance:

- A **hero section** with the current level, XP total, an animated progress bar and the next level reward.
- A **level progression** panel with all nine levels, their state (completed, current, next, locked) and the XP reward for each.
- **Earning feature cards** that show how to earn more XP.
- A **Lucky Box** mini game that awards random XP once every 24 hours.
- A **Daily Puzzle** mini game (sliding tiles) that awards XP once per day with a premium reward reveal.
- A **Recent XP Activity** feed with a running Session Total.

Custom **illustrations** explain each feature: a glowing XP orb, a reward chest, a character climbing a reward tower that follows the player's level, a character with each mini game, and XP coins flowing into a wallet.

**Interactions:**

- **Earn XP to level up** button (end of the Level Progression text) smoothly scrolls to the *Earn more XP* card and flashes it.
- **Level details:** tap or press Enter on any level to see its name, XP target, reward and how many XP are still needed. It starts on the current level.
- **Nav links** (Home, Level Progression, Earn, Lucky Box, Puzzle, Activity) scroll smoothly to their section, and the link for the section in view is highlighted as you scroll. On phones "Level Progression" shortens to "Levels" so all six fit on one row. On very narrow screens (about 320px) the row scrolls sideways and keeps the active link in view.
- **Play Games** card (unlocked at Level 2) jumps to the Lucky Box.
- **Daily Puzzle:** tap a tile, or use the arrow keys, to slide it into the gap.
- **Play & earn XP** hero button jumps to the Lucky Box.
- **Earning card previews:** hover a card (or focus it, or tap on touch screens) to see a short "What's involved" list. Tap or hover away to return.
- **Next Level Reward** ⓘ opens an explanation on hover, focus or tap.

The page runs in **demo mode** by default. It uses built-in dummy data, and a banner reads "Development Mode: Showing dummy data". It can also load live data from `/api/rewards/me` (see [Installation](#installation)).

---

## Level System

There are **9 levels**. The level is always worked out from the player's total XP, so it can never get out of step with it.

| Level | Name | Cumulative XP needed | Level reward |
|---|---|---|---|
| 1 | Newcomer | 0 | +10 XP |
| 2 | Explorer | 1,500 | +20 XP |
| 3 | Trailblazer | 3,500 | +30 XP |
| 4 | Challenger | 6,420 | +40 XP |
| 5 | Champion | 8,000 | +50 XP |
| 6 | Elite | 10,000 | +60 XP |
| 7 | Master | 12,500 | +70 XP |
| 8 | Legend | 15,500 | +80 XP |
| 9 | Mythic | 19,000 | +90 XP |

> The XP targets for Levels 6–9 are placeholders. Edit them in `levelRoadmap` inside the config.

Each level in the progression panel has one of four visual states:

| State | Label | Look |
|---|---|---|
| Completed | Completed | Green border, check mark |
| Current | You Are Here | Gold border and glow |
| Next | Next Goal | Dashed gold border, gentle pulse |
| Locked | Locked | Dimmed, blurred icon, lock |

At **Level 9** the hero shows a "Max Level reached" message instead of a next target.

---

## XP System

- XP is **cumulative**. The progress bar shows `currentXP / next level's target`, for example `6,420 / 8,000 XP (80%)`.
- The hero, the "Just N XP to reach Level N!" lines, the progress bar and the XP counters all update immediately when XP is earned.
- XP changes are animated: the numbers count up and the progress bar fills smoothly. Three milestone dots on the bar (25%, 50%, 75%) light up as they are passed.
- Everything is **saved in the browser** (`localStorage`) so it survives a reload:

| Key | What it stores |
|---|---|
| `luckyBoxLastPlay` | Time of the last Lucky Box play (for the 24-hour cooldown) |
| `luckyBoxXPBonus` | Total XP earned in Lucky Box plus level rewards |
| `luckyBoxScore` | The Lucky Box Game Score |
| `luckyBoxActivity` | The 25 most recent activity feed entries |
| `dailyPuzzleState` | Today's Daily Puzzle: date, reward attempts used and today's result |

To reset the demo, clear these keys in your browser's developer tools (Application → Local Storage).

---

## Next-Level Rewards

- Every level has an XP reward, set in `levelRoadmap`.
- The **Next Level Reward** card in the hero shows the reward for the next level, for example `+50 XP` for reaching Level 5. It is displayed *partially locked* with a frosted lock over the amount.
- The ⓘ icon next to the label explains: *"The displayed reward is associated with the next level according to the current reward configuration."*
- When a level is reached, its reward XP is **added to the player's XP automatically**. This can trigger further level-ups, and each reward also appears in the activity feed.
- Levels are celebrated with confetti, a hero glow and a toast message.

---

## Game Concept

**Lucky Box** is a one-tap luck game. Three mystery boxes are shown, the player picks one, it shakes, and it opens to reveal a random XP prize. The prize is added to the player's XP at once, may cause a level-up, and then the game goes on a 24-hour cooldown.

The panel also shows a **Current Game Score**. It starts at 0 and grows with every win.

### Daily Puzzle

**Daily Puzzle** is a 3×3 sliding-tile puzzle. The player slides tiles 1–8 into order against a 90-second timer. The faster and more efficiently they solve it, the higher the score and the bigger the XP reward. The card explains the game in seven info panels: How to Play, Objective, Time & Attempts, Reward, Score, Eligibility and How Often.

The game moves through these states:

| State | What the player sees |
|---|---|
| Start | Overlay with the offer, the attempts left today and a **Start Puzzle** button |
| Gameplay | Live Time, Moves and Score, a "tiles in place" progress bar, and tappable tiles (those next to the gap glow) |
| Completion | The board locks as soon as the last tile lands |
| Reward result | A premium reveal: spinning ring, medal pop, spark burst, counting XP and 1–3 stars |
| Time's up | Message with attempts left, and **Try Again** if one remains |
| Locked / replay | Today's result and a countdown to the next reward, plus **Practice (no XP)** |

---

## Game Rules

1. Pick **one** of the three boxes.
2. Each box hides a random XP amount between **50 and 200 XP**.
3. The winnings are credited to your XP immediately.
4. The game can be played **once every 24 hours**. A countdown ("Next play in: …") shows when it is available again.
5. Game Score is the total XP won in Lucky Box.

The prize range and cooldown are set in the config (`luckyBox.minXP`, `luckyBox.maxXP`, `luckyBox.cooldownHours`).

### Daily Puzzle rules

| Rule | Detail |
|---|---|
| Objective | Order tiles 1–8, with the empty space in the bottom-right corner |
| Time limit | 90 seconds per attempt |
| Attempts | 2 reward attempts per day |
| Score | Starts at 1,000, minus 6 per move and 2 per second (minimum 100) |
| Reward | Gold (750+) = **+100 XP**, Silver (500+) = **+60 XP**, Bronze (under 500) = **+30 XP** |
| Eligibility | Every player at any level. Only a solved puzzle earns XP. |
| Frequency | One reward per day, resetting at local midnight |
| Practice | Unlimited, but earns no XP and doesn't use a reward attempt |

Every shuffle is made by playing legal moves backwards from the solved board, so each puzzle can always be solved. The values are constants near the top of the Daily Puzzle code (`PZ_TIME`, `PZ_ATTEMPTS`, `pzTier()`, `pzScoreNow()`).

The reward goes through the same path as Lucky Box wins: it is added to the player's XP, can trigger a level-up and its level reward, and appears in the activity feed as "Daily Puzzle". It is prototype logic that runs entirely in the browser with local state. No backend is involved.

---

## Earning Features

Daily Puzzle and Lucky Box are the two playable games (see above). Six earning cards sit below the progression panel. Each shows the XP you can earn, a one-line description and a call-to-action button.

| Feature | Earn up to | Status |
|---|---|---|
| Watch Ads | +50 XP | Available |
| Refer Friends | +100 XP | Available |
| Daily Tasks | +25 XP | Available |
| Play Games | +200 XP | Unlocks at Level 2 (marked **Best Value**) |
| Bonus Missions | +200 XP | Coming soon |
| Streak XP | +30 XP | Locked |

Cards are colored by value: **blue** for low XP, **green** for medium and **yellow** for high. The **Best Value** ribbon goes to the first card with the highest XP. Available cards lift on hover. Locked cards are dimmed with a disabled button. For now the buttons show a toast message only. Connect them to real actions in your own app.

---

## Technology Stack

- **HTML5**: one file, `index.html`.
- **CSS3**: custom properties, Grid, Flexbox, media queries and keyframe animations.
- **Vanilla JavaScript (ES5 style)**: no framework or bundler.
- **Font Awesome 4.7**: icons, loaded from the cdnjs CDN.
- **Browser `localStorage`**: persistence.
- **Animated WebP** logo (converted from the original 800 KB GIF to about 68 KB).
- **SVG illustrations** drawn for this project (`illustrations/`), using the page palette and a shared mascot character.
- **AVIF** card backgrounds (`images/AB1.avif` to `AB6.avif`) and **SVG** level badges. AVIF is supported by current Chrome, Edge, Firefox and Safari (16.4+).

---

## Installation

No installation or build is needed.

1. Keep `index.html` together with the `images/` folder and the `.svg` files, as shown in [Folder Structure](#folder-structure).
2. Open `index.html` in a modern browser, **or** serve the folder with a local web server (see below).
3. An internet connection is needed once to load the Font Awesome icons.

**Demo mode vs live mode.** In the script, `USE_DUMMY_DATA = true` uses the built-in demo data. Set it to `false` to fetch the config from `GET /api/rewards/me`. If the response is invalid, the page falls back to the local config.

---

## Development Commands

```bash
# Serve the project locally (Python 3)
python3 -m http.server 8000
# then open http://localhost:8000

# Or with Node
npx serve .

# Quick syntax check of the page's JavaScript (extract it first)
node --check script.js
```

Handy while developing:

- Edit `currentXP` in the config to test any level.
- Clear the `luckyBox*` keys in local storage to reset the cooldown, score and activity.

---

## Folder Structure

The background images are small (about 10–30 KB each) and use the page's own color palette. Each card lays a semi-transparent dark overlay over its image so text stays readable. To swap an image, replace the file and keep the same name, or change the `url("images/…")` in the CSS.

```text
VELOOP/
├── index.html      # The whole app: markup, styles and script
├── README.md
├── images/         # Card background images (AVIF)
│   ├── AB1.avif    # Header: aurora ribbons and a star network
│   ├── AB2.avif    # Level display (hero): sunrise horizon with rays
│   ├── AB3.avif    # Level progression card: glowing hex grid
│   ├── AB4.avif    # Earn more XP card: confetti and coin bokeh
│   ├── AB5.avif    # Lucky Box card: golden sparkle burst
│   ├── AB6.avif    # Recent XP Activity card: data streams
│   └── Animation-VELoop.webp   # Animated VELoop logo in the header (about 68 KB, links to velooprewards.in)
├── illustrations/  # Feature illustrations (SVG)
│   ├── xp-orb.svg          # Glowing XP orb: hero, next to the level badge
│   ├── reward-chest.svg    # Locked premium chest: Next Level Reward card
│   ├── lucky-box-game.svg  # Character inviting you to pick a box: Lucky Box
│   ├── puzzle-game.svg     # Character sliding a puzzle tile: Daily Puzzle
│   └── coins-wallet.svg    # XP coins flowing into a wallet: Earn more XP
│                           # (the level tower is drawn inline in index.html, see below)
├── 1.svg … 9.svg   # Level badges (Level 1 to Level 9)
└── 10.svg          # Extra badge (not used by the page)
```

---

## Component Architecture

Everything lives in `index.html`. The script is organized into numbered sections:

1. **Feature flag**: `USE_DUMMY_DATA` switches between demo and live data.
2. **Dummy data / config**: `player`, `levelRoadmap`, `levels`, `luckyBox`, `gameStats`, `earningOpportunities`, `xpHistory` and all page `copy`.
3. **Validation**: `validateConfig()` checks the config before it is rendered.
4. **Render layer**: `syncLevelToXP()` works out the level from XP, and `renderRewards()` draws the hero, level path, level grid, earning cards and counters.
5. **Interactions**: `scrollToCard()`, `showLevelDetail()` and `initInteractions()` (smooth scroll, level details, nav highlight, puzzle arrow keys).
6. **Game logic & activity**: opening a box, the **Daily Puzzle** (`pz*` functions: shuffle, move, score, tier, finish, reward reveal),  `applyLevelUps()` (promotion and reward XP), `logActivity()`, the activity feed, the toast and the level-up celebration.
7. **Init & bootstrap**: restores saved data, starts the cooldown timer and loads the config.

Page sections, top to bottom: demo banner → compact header (animated logo, title, nav) → **Level display (hero)** → **Level progression** → **Earn more XP** → **Lucky Box** → **Daily Puzzle** → **Recent XP Activity** → footer and back-to-top button.

---

## Responsive Behavior

| Screen | Layout |
|---|---|
| Phones (up to 480px, tuned for 360px) | Single column. Hero stacks with the level badge below the text. Earning cards are one per row. Smaller type, Lucky Box and spacing. |
| Tablets (769px and up) | Every section is one full-width column. Hero and progression are two-column inside their cards; earning cards are two per row. |
| Desktop (900px and up) | Content is centered in a column up to 1,180px wide. Every section is a single full-width column: earning cards are three per row, Lucky Box puts the game on the left and its rules on the right, the Daily Puzzle board sits beside its seven info panels, and the activity feed uses two columns. |

The header is kept compact: the animated logo and title share one line, with the subtitle and nav below. The page never scrolls sideways. This was checked at 320, 360, 375, 414, 768, 820, 1024 and 1440px.

---

## Animation Details

**Reward tower (dynamic):** the Level Progression tower is an inline SVG that updates with the player's level. Floors below the current level turn green (completed), the current floor turns gold, and higher floors stay locked and purple. The mascot climbs to the current floor when the page loads and climbs again whenever a level-up happens. The dotted trail behind it marks the path already climbed.

| Animation | Where | Details |
|---|---|---|
| Progress bar fill | Hero | Fills from 0 over about 1.4 seconds when the page loads, with a soft sheen |
| XP count-up | Hero | Numbers count from the old value to the new one |
| Milestone dots | Progress bar | Light up as the bar passes 25%, 50% and 75% |
| Illustration float | Hero | The XP orb and the reward chest bob gently up and down |
| Reward card glow | Hero | Slow pulsing glow on the Next Level Reward card |
| Level path arrow | Hero | Arrow nudges gently between Current and Next |
| Level-up celebration | Whole page | Confetti and a hero glow when a level is reached |
| Card entrance | Earning cards | Fade and rise one after another on load |
| Section flash | Target card | A yellow glow pulses on the section you were scrolled to |
| Card preview swap | Earning cards | The description fades out and the "What's involved" list slides in, with no change in card size |
| Hover effects | Cards and buttons | Lift, glow and icon tilt |
| Puzzle tile hints | Daily Puzzle | Tiles next to the gap glow and grow on hover |
| Puzzle reward reveal | Daily Puzzle | Medal spins in, a gradient ring rotates, sparks burst, the XP counts up with a gold shimmer and stars pop in one by one |
| Low-time warning | Daily Puzzle | The timer pulses during the last 15 seconds |
| Lucky Box idle | Lucky Box | Closed boxes wobble with a twinkling star |
| Lucky Box open | Lucky Box | Shake, flip open, prize pop and a spark burst |
| New activity entry | Activity feed | Slides in with a brief highlight |

All animations switch off for visitors who prefer reduced motion (`prefers-reduced-motion`).

---

## Author

**Name:** _Rajesh Manyar_
 
