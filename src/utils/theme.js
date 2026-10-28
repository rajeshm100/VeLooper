// Colour themes. "classic" is the original look; "neon" follows the VELoop Rewards site.
export const THEMES = ['classic', 'neon'];
export const DEFAULT_THEME = 'classic';

// Anything unknown (old value, typo, tampered storage) falls back to the default.
export const normalizeTheme = (value) => (THEMES.includes(value) ? value : DEFAULT_THEME);

export const themeColor = { classic: '#161827', neon: '#0b0f19' }; // for the browser UI bar on phones
