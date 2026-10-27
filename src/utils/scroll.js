// Smooth-scroll to a section and flash it so the eye can find it.
export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  el.removeAttribute('data-flash');
  // restart the animation even if it is already running
  void el.offsetWidth;
  el.setAttribute('data-flash', 'true');
  window.setTimeout(() => el.removeAttribute('data-flash'), 1800);
}
