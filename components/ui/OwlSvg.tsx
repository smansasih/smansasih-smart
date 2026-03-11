export function OwlSvg({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        height: '100%',
        maxHeight: 280,
        width: 'auto',
        filter: 'drop-shadow(0 12px 28px rgba(0,0,0,.18))',
        animation: 'floatOwl 3s ease-in-out infinite',
      }}
    >
      <rect x="62" y="28" width="76" height="8" rx="4" fill="#1A1A2E"/>
      <polygon points="100,10 140,32 100,38 60,32" fill="#1A1A2E"/>
      <line x1="140" y1="32" x2="148" y2="56" stroke="#1A1A2E" strokeWidth="2"/>
      <circle cx="148" cy="58" r="5" fill="#F5A800"/>
      <ellipse cx="100" cy="170" rx="50" ry="65" fill="#FFFFFF"/>
      <ellipse cx="100" cy="90"  rx="42" ry="44" fill="#F5A800"/>
      <path d="M68 58 L60 42 L76 52 Z" fill="#F5A800"/>
      <path d="M132 58 L140 42 L124 52 Z" fill="#F5A800"/>
      <circle cx="88"  cy="88" r="14" fill="white"/>
      <circle cx="112" cy="88" r="14" fill="white"/>
      <circle cx="88"  cy="89" r="8"  fill="#1A1A2E"/>
      <circle cx="112" cy="89" r="8"  fill="#1A1A2E"/>
      <circle cx="91"  cy="86" r="3"  fill="white"/>
      <circle cx="115" cy="86" r="3"  fill="white"/>
      <path d="M96 100 L100 110 L104 100 Z" fill="#E09500"/>
      <path d="M84 128 L100 142 L116 128 L100 118 Z" fill="#1A6B72"/>
      <rect x="97" y="142" width="6" height="24" rx="3" fill="#1A6B72"/>
      <path d="M50 155 Q30 150 28 165 Q26 180 50 178 Z" fill="#F5A800"/>
      <path d="M150 155 Q170 150 172 165 Q174 180 150 178 Z" fill="#F5A800"/>
      <rect x="155" y="155" width="20" height="14" rx="2" fill="#F5A800" stroke="#E09500" strokeWidth="1.5"/>
      <rect x="162" y="169" width="6"  height="8"  rx="1"   fill="#E09500"/>
      <rect x="158" y="177" width="14" height="3"  rx="1.5" fill="#E09500"/>
      <path d="M155 158 Q148 154 150 148 Q152 142 158 146" stroke="#E09500" strokeWidth="2" fill="none"/>
      <path d="M175 158 Q182 154 180 148 Q178 142 172 146" stroke="#E09500" strokeWidth="2" fill="none"/>
      <circle cx="165" cy="153" r="3" fill="#FFF8E7"/>
      <rect x="74"  y="225" width="22" height="50" rx="8" fill="#1A6B72"/>
      <rect x="104" y="225" width="22" height="50" rx="8" fill="#1A6B72"/>
      <ellipse cx="85"  cy="274" rx="14" ry="6" fill="#E09500"/>
      <ellipse cx="115" cy="274" rx="14" ry="6" fill="#E09500"/>
    </svg>
  );
}