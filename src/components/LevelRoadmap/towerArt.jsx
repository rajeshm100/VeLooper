// Artwork for the reward tower. Generated from the original drawing code; edit with care.
// Ids are prefixed "tw" so they never clash with other inline SVGs on the page.

export function TowerDefs() {
  return (
    <defs>
      <filter id="twbl" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="8" /></filter>
      <linearGradient id="twgd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f4e98c" /><stop offset="1" stopColor="#d2af26" /></linearGradient>
      <linearGradient id="twmb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#93caed" /><stop offset="1" stopColor="#805b87" /></linearGradient>
      <radialGradient id="twmg"><stop offset="0" stopColor="#fff7c2" /><stop offset=".5" stopColor="#f4e98c" /><stop offset="1" stopColor="#f4e98c" stopOpacity="0" /></radialGradient>
      <linearGradient id="twtGrn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#b7e9c1" /><stop offset="1" stopColor="#6fb383" /></linearGradient>
      <linearGradient id="twtPur" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6a4f73" /><stop offset="1" stopColor="#3b2a4d" /></linearGradient>
    </defs>
  );
}

export function TowerBackdrop() {
  return (
    <>
      <ellipse cx="120" cy="70" rx="90" ry="64" fill="#f4e98c" opacity=".3" filter="url(#twbl)" />
      <ellipse cx="120" cy="308" rx="100" ry="9" fill="#000" opacity=".3" />
    </>
  );
}

export function TowerTopChest() {
  return (
    <>
      <g transform="translate(94 4) scale(.38)"><ellipse cx="70" cy="66" rx="58" ry="40" fill="#f4e98c" opacity=".7" filter="url(#twbl)"/>
<rect x="20" y="56" width="100" height="52" rx="8" fill="#6a4f73" stroke="#161827" strokeWidth="4"/>
<path d="M20 60 Q20 18 70 18 Q120 18 120 60Z" fill="#a47bad" stroke="#161827" strokeWidth="4"/>
<rect x="34" y="20" width="11" height="88" fill="url(#twgd)"/><rect x="95" y="20" width="11" height="88" fill="url(#twgd)"/><rect x="18" y="52" width="104" height="10" rx="4" fill="url(#twgd)"/>
<rect x="58" y="58" width="24" height="30" rx="6" fill="url(#twgd)" stroke="#161827" strokeWidth="3"/></g>
      <path d="M70 16L71.76 22.24L78 24L71.76 25.76L70 32L68.24 25.76L62 24L68.24 22.24Z" fill="#f4e98c" opacity="1"/><path d="M176 24L177.32 28.68L182 30L177.32 31.32L176 36L174.68 31.32L170 30L174.68 28.68Z" fill="#93caed" opacity="1"/><path d="M200 85L201.1 88.9L205 90L201.1 91.1L200 95L198.9 91.1L195 90L198.9 88.9Z" fill="#b7e9c1" opacity="1"/><path d="M40 76L40.88 79.12L44 80L40.88 80.88L40 84L39.12 80.88L36 80L39.12 79.12Z" fill="#f4e98c" opacity="1"/>
    </>
  );
}

// The little character. Its parent <g> decides where it stands.
export function Mascot() {
  return (
    <g className="bob" transform="scale(0.62)">
<ellipse cx="0" cy="2" rx="30" ry="6" fill="#000" opacity=".25"/>
<ellipse cx="-12" cy="-2" rx="10" ry="6" fill="#805b87"/><ellipse cx="12" cy="-2" rx="10" ry="6" fill="#805b87"/>
<path d="M-24 -24 Q-25.0 -44.0 -26 -52" stroke="#805b87" strokeWidth="9" strokeLinecap="round" fill="none"/><circle cx="-26" cy="-52" r="6" fill="#93caed" stroke="#805b87" strokeWidth="2"/><path d="M24 -24 Q26.0 -33.0 28 -30" stroke="#805b87" strokeWidth="9" strokeLinecap="round" fill="none"/><circle cx="28" cy="-30" r="6" fill="#93caed" stroke="#805b87" strokeWidth="2"/>
<ellipse cx="0" cy="-30" rx="27" ry="29" fill="url(#twmb)" stroke="#000052" strokeOpacity=".5" strokeWidth="2"/>
<ellipse cx="0" cy="-20" rx="16" ry="14" fill="#fff" opacity=".22"/>
<circle cx="-10" cy="-37" r="8" fill="#fff"/><circle cx="10" cy="-37" r="8" fill="#fff"/>
<circle cx="-9" cy="-36" r="3.6" fill="#161827"/><circle cx="11" cy="-36" r="3.6" fill="#161827"/>
<circle cx="-10" cy="-38" r="1.2" fill="#fff"/><circle cx="10" cy="-38" r="1.2" fill="#fff"/>
<path d="M-8 -24 Q0 -15 8 -24" stroke="#161827" strokeWidth="3" fill="none" strokeLinecap="round"/>
<circle cx="-18" cy="-27" r="4" fill="#f4e98c" opacity=".5"/><circle cx="18" cy="-27" r="4" fill="#f4e98c" opacity=".5"/>
<line x1="0" y1="-59" x2="0" y2="-70" stroke="#c0c0c0" strokeWidth="3" strokeLinecap="round"/>
<circle cx="0" cy="-73" r="11" fill="url(#twmg)"/><circle cx="0" cy="-73" r="4.5" fill="#f4e98c"/>
</g>
  );
}
