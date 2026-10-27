// One place that imports every asset, so components never hard-code file paths.
import ab1 from './images/AB1.avif';
import ab2 from './images/AB2.avif';
import ab3 from './images/AB3.avif';
import ab4 from './images/AB4.avif';
import ab5 from './images/AB5.avif';
import ab6 from './images/AB6.avif';
import logo from './images/Animation-VELoop.webp';
import xpOrb from './illustrations/xp-orb.svg';
import rewardChest from './illustrations/reward-chest.svg';
import luckyBoxGame from './illustrations/lucky-box-game.svg';
import puzzleGame from './illustrations/puzzle-game.svg';
import coinsWallet from './illustrations/coins-wallet.svg';
import level1 from './levels/level-1.svg';
import level2 from './levels/level-2.svg';
import level3 from './levels/level-3.svg';
import level4 from './levels/level-4.svg';
import level5 from './levels/level-5.svg';
import level6 from './levels/level-6.svg';
import level7 from './levels/level-7.svg';
import level8 from './levels/level-8.svg';
import level9 from './levels/level-9.svg';

export const backgrounds = { header: ab1, hero: ab2, progression: ab3, earn: ab4, lucky: ab5, activity: ab6 };
export const illustrations = { xpOrb, rewardChest, luckyBoxGame, puzzleGame, coinsWallet };
export const levelBadges = { 1: level1, 2: level2, 3: level3, 4: level4, 5: level5, 6: level6, 7: level7, 8: level8, 9: level9 };
export { logo };
