export const numberWithCommas = (n) => Number(n).toLocaleString('en-US');

export const pad2 = (n) => (n < 10 ? `0${n}` : String(n));

// fillTemplate('Hi {name}', { name: 'Sam' }) -> 'Hi Sam'
export function fillTemplate(template, tokens) {
  return template.replace(/\{(\w+)\}/g, (match, key) => (key in tokens ? String(tokens[key]) : match));
}

export function timeAgo(timestamp, now = Date.now()) {
  const minutes = Math.max(0, Math.round((now - timestamp) / 60000));
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}
