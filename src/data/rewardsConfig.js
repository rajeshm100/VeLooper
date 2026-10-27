// Single source of truth for the demo data. In production this could be replaced by
// a call to GET /api/rewards/me with the same shape.

export const rewardsConfig = {
  // XP the demo player starts with (before anything earned in this browser)
  startingXP: 6420,

  // Cumulative XP needed to reach each level, plus the XP reward granted on reaching it
  levelRoadmap: [
    { level: 1, requiredXP: 0, reward: { type: 'XP', amount: 10 } },
    { level: 2, requiredXP: 1500, reward: { type: 'XP', amount: 20 } },
    { level: 3, requiredXP: 3500, reward: { type: 'XP', amount: 30 } },
    { level: 4, requiredXP: 6420, reward: { type: 'XP', amount: 40 } },
    { level: 5, requiredXP: 8000, reward: { type: 'XP', amount: 50 } },
    { level: 6, requiredXP: 10000, reward: { type: 'XP', amount: 60 } },
    { level: 7, requiredXP: 12500, reward: { type: 'XP', amount: 70 } },
    { level: 8, requiredXP: 15500, reward: { type: 'XP', amount: 80 } },
    { level: 9, requiredXP: 19000, reward: { type: 'XP', amount: 90 } },
  ],

  levels: [
    { level: 1, name: 'Newcomer' },
    { level: 2, name: 'Explorer' },
    { level: 3, name: 'Trailblazer' },
    { level: 4, name: 'Challenger' },
    { level: 5, name: 'Champion' },
    { level: 6, name: 'Elite' },
    { level: 7, name: 'Master' },
    { level: 8, name: 'Legend' },
    { level: 9, name: 'Mythic' },
  ],

  luckyBox: { minXP: 50, maxXP: 200, cooldownHours: 24 },

  // hoursAgo is turned into a timestamp when the page loads
  xpHistory: [
    { source: 'Lucky Box', xp: 120, hoursAgo: 2, iconKey: 'gift' },
    { source: 'Daily Task', xp: 25, hoursAgo: 5, iconKey: 'tasks' },
    { source: 'Referral', xp: 100, hoursAgo: 12, iconKey: 'users' },
    { source: 'Ad Watch', xp: 15, hoursAgo: 18, iconKey: 'tv' },
    { source: 'Bonus Mission', xp: 50, hoursAgo: 22, iconKey: 'star' },
  ],

  earningOpportunities: [
    {
      id: 'watch-ads', title: 'Watch Ads', iconKey: 'tv', xp: 50, status: 'available', label: 'Watch & Earn',
      description: 'Watch short video ads and earn quick XP.',
      details: ['Watch a short video ad (about 30 seconds).', 'Up to 5 ads a day.', 'Each ad adds XP, up to the card maximum.'],
    },
    {
      id: 'refer-friends', title: 'Refer Friends', iconKey: 'users', xp: 100, status: 'available', label: 'Invite Friends',
      description: 'Invite friends and earn XP when they join.',
      details: ['Share your personal invite link.', 'Your friend signs up and finishes onboarding.', 'You earn XP for every friend who joins.'],
    },
    {
      id: 'daily-tasks', title: 'Daily Tasks', iconKey: 'tasks', xp: 25, status: 'available', label: 'Start Tasks',
      description: 'Complete simple daily tasks for steady XP.',
      details: ['Pick from a few simple tasks each day.', 'For example: check in, read a tip, finish a profile step.', 'Each completed task adds a little XP.'],
    },
    {
      id: 'play-games', title: 'Play Games', iconKey: 'gamepad', xp: 200, status: 'locked', label: 'Unlock at Level 2',
      unlockLevel: 2, availableLabel: 'Play Now', target: 'lucky-box-card',
      description: 'Play mini games and win bonus XP.',
      details: ['Play the Lucky Box or the Daily Puzzle.', 'Each game can be played once a day.', 'Your reward depends on your luck or your score.'],
    },
    {
      id: 'bonus-missions', title: 'Bonus Missions', iconKey: 'star', xp: 200, status: 'locked', label: 'Coming Soon',
      description: 'Take on special missions for big XP rewards.',
      details: ['Special missions with bigger goals.', 'Finish the mission to claim the bonus XP.', 'Coming soon: keep an eye on this card.'],
    },
    {
      id: 'streak-xp', title: 'Streak XP', iconKey: 'fire', xp: 30, status: 'locked', label: 'Day 3',
      description: 'Log in every day to build a streak and boost XP.',
      details: ['Log in every day to build a streak.', 'The longer the streak, the bigger the bonus.', 'Miss a day and the streak starts over.'],
    },
  ],
};
