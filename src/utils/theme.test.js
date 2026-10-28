import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeTheme, THEMES, DEFAULT_THEME, themeColor } from './theme.js';

test('known themes are kept', () => {
  assert.equal(normalizeTheme('classic'), 'classic');
  assert.equal(normalizeTheme('neon'), 'neon');
});

test('unknown or missing values fall back to the default theme', () => {
  assert.equal(DEFAULT_THEME, 'classic');
  for (const bad of [undefined, null, '', 'dark', 'NEON', 42, {}]) assert.equal(normalizeTheme(bad), DEFAULT_THEME);
});

test('every theme has a browser theme colour', () => {
  for (const t of THEMES) assert.match(themeColor[t], /^#[0-9a-f]{6}$/i);
});
