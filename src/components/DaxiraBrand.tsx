import React from 'react';

interface DaxiraMarkProps {
  size?: number | string;
  className?: string;
  glow?: boolean;
}

export const DaxiraMark: React.FC<DaxiraMarkProps> = ({
  size = 36,
  className = '',
  glow = false,
}) => {
  const idPrefix = React.useId().replace(/:/g, '');

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${glow ? 'drop-shadow-[0_4px_12px_rgba(0,119,255,0.35)]' : ''} ${className}`}
    >
      <defs>
        {/* Outer Ribbon 3D Gradient */}
        <linearGradient id={`${idPrefix}-outer`} x1="15%" y1="5%" x2="90%" y2="85%">
          <stop offset="0%" stopColor="#0052cc" />
          <stop offset="35%" stopColor="#0077ff" />
          <stop offset="70%" stopColor="#00c8ff" />
          <stop offset="100%" stopColor="#005ce6" />
        </linearGradient>

        {/* Inner 3D Shadow Fold Gradient */}
        <linearGradient id={`${idPrefix}-inner`} x1="5%" y1="5%" x2="95%" y2="95%">
          <stop offset="0%" stopColor="#03163b" />
          <stop offset="45%" stopColor="#062b70" />
          <stop offset="100%" stopColor="#0058e6" />
        </linearGradient>

        {/* Digital Tech Pixel Block Gradient */}
        <linearGradient id={`${idPrefix}-pixel`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0080ff" />
          <stop offset="100%" stopColor="#00d9ff" />
        </linearGradient>

        {/* Dark Vertical Spine Pillar */}
        <linearGradient id={`${idPrefix}-spine`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#07235c" />
          <stop offset="100%" stopColor="#02112e" />
        </linearGradient>
      </defs>

      {/* Digital Tech Pixel Cascade */}
      <rect x="24" y="24" width="16" height="16" rx="2" fill="#0052cc" />
      <rect x="46" y="34" width="18" height="18" rx="2" fill="#0077ff" />
      <rect x="26" y="56" width="18" height="18" rx="2" fill="#0066e0" />
      <rect x="50" y="64" width="20" height="20" rx="2.5" fill={`url(#${idPrefix}-pixel)`} />
      <rect x="70" y="42" width="20" height="20" rx="2.5" fill={`url(#${idPrefix}-pixel)`} />

      {/* Lower Left Digital Spine Pillar */}
      <path d="M68 86 L100 118 L100 166 L68 166 Z" fill={`url(#${idPrefix}-spine)`} />

      {/* Inner 3D Shadow Fold of the D */}
      <path
        d="M72 24 C98 14 134 32 150 64 C132 72 114 90 100 118 L72 24 Z"
        fill={`url(#${idPrefix}-inner)`}
      />

      {/* Main Sweeping Outer D Ribbon */}
      <path
        d="M72 24 C108 12 174 46 176 106 C178 152 140 170 100 166 L100 142 C126 142 152 132 150 102 C148 74 116 52 92 50 L72 24 Z"
        fill={`url(#${idPrefix}-outer)`}
      />

      {/* Lower Inward Ribbon Crease */}
      <path
        d="M100 166 C130 166 170 148 168 102 C160 134 132 148 100 142 Z"
        fill="#0046b8"
        opacity="0.85"
      />
    </svg>
  );
};

interface DaxiraLogoProps {
  layout?: 'horizontal' | 'vertical';
  markSize?: number;
  className?: string;
  subtitle?: boolean;
}

export const DaxiraLogo: React.FC<DaxiraLogoProps> = ({
  layout = 'horizontal',
  markSize = 34,
  className = '',
  subtitle = true,
}) => {
  if (layout === 'vertical') {
    return (
      <div className={`flex flex-col items-center text-center group ${className}`}>
        <DaxiraMark size={markSize} glow className="transition-transform group-hover:scale-105" />
        <div className="mt-3 flex flex-col items-center">
          <div className="relative font-heading font-extrabold text-[22px] tracking-tight text-[#041b44] flex items-center">
            <span>Dax</span>
            {/* The signature cyan accent on the 'i' / 'x' connection */}
            <span className="text-[#0084ff]">i</span>
            <span>ra</span>
          </div>
          {subtitle && (
            <span className="text-[10px] font-heading font-semibold uppercase tracking-[0.28em] text-[#041b44]/75 mt-0.5">
              InfoTech
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 group ${className}`}>
      <DaxiraMark size={markSize} glow className="transition-transform group-hover:scale-105" />
      <div className="flex flex-col justify-center">
        <div className="flex items-baseline">
          <span className="font-heading font-extrabold text-[17px] tracking-tight text-[#041b44] group-hover:text-[#0052cc] transition-colors">
            Dax<span className="text-[#0084ff]">i</span>ra
          </span>
          <span className="font-heading font-bold text-[17px] tracking-tight text-[#041b44] ml-1">
            InfoTech
          </span>
        </div>
        {subtitle && (
          <span className="text-[9.5px] font-mono uppercase tracking-[0.22em] text-[#777587]">
            Software Studio
          </span>
        )}
      </div>
    </div>
  );
};

export type DaxiraIconVariant =
  | 'default'
  | 'saas'
  | 'web'
  | 'ecommerce'
  | 'optimization'
  | 'security'
  | 'speed'
  | 'terminal';

interface DaxiraIconProps {
  variant?: DaxiraIconVariant;
  size?: number;
  className?: string;
}

/**
 * Minimalist, simplified icon variations derived strictly from the Daxira logo symbol:
 * - Maintains the signature 3D dynamic D-curve and pixel cube grid.
 * - Enriched with contextual elements (modular grid, viewport frame, transaction node, pulse ring).
 */
export const DaxiraIcon: React.FC<DaxiraIconProps> = ({
  variant = 'default',
  size = 24,
  className = '',
}) => {
  const idPrefix = React.useId().replace(/:/g, '');

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
    >
      <defs>
        <linearGradient id={`${idPrefix}-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0052cc" />
          <stop offset="50%" stopColor="#0077ff" />
          <stop offset="100%" stopColor="#00c8ff" />
        </linearGradient>

        <linearGradient id={`${idPrefix}-cyan`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0080ff" />
          <stop offset="100%" stopColor="#00d9ff" />
        </linearGradient>

        <linearGradient id={`${idPrefix}-dark`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#07235c" />
          <stop offset="100%" stopColor="#02112e" />
        </linearGradient>
      </defs>

      {/* VARIANT 1: DEFAULT MINIMAL D-MARK */}
      {variant === 'default' && (
        <g>
          {/* Digital cubes */}
          <rect x="14" y="16" width="10" height="10" rx="1.5" fill="#0052cc" />
          <rect x="28" y="22" width="10" height="10" rx="1.5" fill="#0077ff" />
          <rect x="16" y="34" width="10" height="10" rx="1.5" fill="#0066e0" />
          <rect x="30" y="40" width="12" height="12" rx="2" fill={`url(#${idPrefix}-cyan)`} />
          {/* Spine */}
          <path d="M40 52 L56 68 L56 86 L40 86 Z" fill={`url(#${idPrefix}-dark)`} />
          {/* Outer D Ribbon */}
          <path
            d="M42 14 C62 8 92 28 92 56 C92 78 72 88 56 86 L56 74 C68 74 80 68 80 54 C80 40 64 26 52 26 L42 14 Z"
            fill={`url(#${idPrefix}-grad)`}
          />
        </g>
      )}

      {/* VARIANT 2: SAAS / PLATFORM (D-Symbol with multi-tenant modular matrix blocks) */}
      {variant === 'saas' && (
        <g>
          {/* Multi-layered SaaS system blocks */}
          <rect x="10" y="14" width="9" height="9" rx="1.5" fill="#0052cc" />
          <rect x="22" y="14" width="9" height="9" rx="1.5" fill="#0077ff" />
          <rect x="10" y="26" width="9" height="9" rx="1.5" fill={`url(#${idPrefix}-cyan)`} />
          <rect x="22" y="26" width="9" height="9" rx="1.5" fill={`url(#${idPrefix}-cyan)`} />
          <rect x="10" y="38" width="9" height="9" rx="1.5" fill="#0077ff" />
          <rect x="22" y="38" width="9" height="9" rx="1.5" fill="#0052cc" />

          {/* Database / Container shelf base */}
          <rect x="10" y="52" width="21" height="6" rx="1.5" fill={`url(#${idPrefix}-dark)`} />
          <rect x="10" y="62" width="21" height="6" rx="1.5" fill={`url(#${idPrefix}-dark)`} />
          <rect x="10" y="72" width="21" height="14" rx="2" fill={`url(#${idPrefix}-dark)`} />

          {/* Interlocking D Curve */}
          <path
            d="M38 14 C60 8 90 28 90 54 C90 78 72 88 42 86 L42 74 C60 74 78 68 78 52 C78 38 60 26 48 26 L38 14 Z"
            fill={`url(#${idPrefix}-grad)`}
          />
          <circle cx="27" cy="79" r="1.5" fill="#00d9ff" />
        </g>
      )}

      {/* VARIANT 3: WEB / COMMERCIAL (D-Symbol with browser / viewport terminal framing) */}
      {variant === 'web' && (
        <g>
          {/* Subtle browser frame outline */}
          <rect
            x="6"
            y="8"
            width="88"
            height="84"
            rx="8"
            stroke="#0052cc"
            strokeWidth="2.5"
            strokeOpacity="0.25"
          />
          {/* Browser header dots */}
          <circle cx="16" cy="18" r="2.5" fill="#0077ff" />
          <circle cx="24" cy="18" r="2.5" fill="#00c8ff" />
          <circle cx="32" cy="18" r="2.5" fill="#02112e" />

          {/* Daxira D Symbol centered within the viewport */}
          <g transform="translate(10, 4)">
            <rect x="16" y="24" width="8" height="8" rx="1.5" fill="#0077ff" />
            <rect x="26" y="32" width="8" height="8" rx="1.5" fill={`url(#${idPrefix}-cyan)`} />
            <path d="M26 44 L36 54 L36 74 L26 74 Z" fill={`url(#${idPrefix}-dark)`} />
            <path
              d="M32 20 C50 14 74 28 74 50 C74 70 58 76 36 74 L36 64 C50 64 64 60 64 48 C64 36 50 26 40 26 L32 20 Z"
              fill={`url(#${idPrefix}-grad)`}
            />
          </g>
        </g>
      )}

      {/* VARIANT 4: ECOMMERCE / TRANSACTION (D-Symbol with checkout node & cart flow) */}
      {variant === 'ecommerce' && (
        <g>
          {/* Dynamic transaction blocks */}
          <rect x="12" y="16" width="10" height="10" rx="2" fill="#0052cc" />
          <rect x="25" y="24" width="10" height="10" rx="2" fill={`url(#${idPrefix}-cyan)`} />
          <rect x="14" y="36" width="10" height="10" rx="2" fill="#0077ff" />

          {/* D Ribbon */}
          <path
            d="M38 14 C58 8 88 28 88 54 C88 76 70 86 46 86 L46 74 C62 74 76 68 76 52 C76 38 60 26 48 26 L38 14 Z"
            fill={`url(#${idPrefix}-grad)`}
          />

          {/* Transactional payload pill at bottom */}
          <rect x="14" y="60" width="30" height="24" rx="4" fill={`url(#${idPrefix}-dark)`} />
          {/* Card / UPI chip accent */}
          <rect x="20" y="66" width="8" height="6" rx="1" fill={`url(#${idPrefix}-cyan)`} />
          <line x1="20" y1="78" x2="38" y2="78" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        </g>
      )}

      {/* VARIANT 5: OPTIMIZATION / SLA (D-Symbol with orbital uptime pulse ring) */}
      {variant === 'optimization' && (
        <g>
          {/* Outer SLA Orbit Ring */}
          <circle
            cx="50"
            cy="50"
            r="42"
            stroke="#0077ff"
            strokeWidth="2"
            strokeDasharray="4 4"
            strokeOpacity="0.4"
          />
          {/* Orbiting Satellite Node */}
          <circle cx="86" cy="30" r="4" fill="#10b981" />

          {/* Core Daxira D Symbol */}
          <g transform="translate(6, 6) scale(0.88)">
            <rect x="18" y="20" width="10" height="10" rx="2" fill="#0052cc" />
            <rect x="32" y="26" width="10" height="10" rx="2" fill={`url(#${idPrefix}-cyan)`} />
            <path d="M34 46 L48 60 L48 80 L34 80 Z" fill={`url(#${idPrefix}-dark)`} />
            <path
              d="M38 16 C58 10 86 28 86 54 C86 76 68 84 48 80 L48 68 C62 68 74 64 74 50 C74 38 60 26 46 26 L38 16 Z"
              fill={`url(#${idPrefix}-grad)`}
            />
          </g>

          {/* Active pulse tick indicator */}
          <path
            d="M34 50 L42 58 L62 38"
            stroke="#10b981"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )}

      {/* VARIANT 6: SECURITY / CRYPTO */}
      {variant === 'security' && (
        <g>
          {/* Shield outline */}
          <path
            d="M50 8 L84 20 V48 C84 70 50 88 50 88 C50 88 16 70 16 48 V20 L50 8 Z"
            stroke="#0052cc"
            strokeWidth="2.5"
            strokeOpacity="0.3"
            fill="none"
          />
          {/* Daxira D Mark within the shield */}
          <g transform="translate(10, 4) scale(0.8)">
            <rect x="22" y="24" width="10" height="10" rx="2" fill={`url(#${idPrefix}-cyan)`} />
            <path d="M30 46 L44 60 L44 80 L30 80 Z" fill={`url(#${idPrefix}-dark)`} />
            <path
              d="M36 18 C56 12 80 28 80 52 C80 72 64 80 44 80 L44 68 C58 68 68 64 68 50 C68 38 56 28 44 28 L36 18 Z"
              fill={`url(#${idPrefix}-grad)`}
            />
          </g>
        </g>
      )}

      {/* VARIANT 7: SPEED / LATENCY (Sub-second pixel trail) */}
      {variant === 'speed' && (
        <g>
          {/* Speed streaking cubes */}
          <rect x="6" y="20" width="8" height="6" rx="1" fill="#00c8ff" opacity="0.6" />
          <rect x="18" y="20" width="10" height="8" rx="1.5" fill="#0080ff" />
          <rect x="8" y="38" width="12" height="6" rx="1" fill="#0052cc" opacity="0.8" />
          <rect x="24" y="38" width="12" height="10" rx="2" fill={`url(#${idPrefix}-cyan)`} />
          <rect x="10" y="56" width="16" height="8" rx="1.5" fill="#0052cc" />

          {/* Forward Leaning D Ribbon */}
          <path
            d="M40 14 C62 8 92 28 92 56 C92 78 72 88 50 86 L50 74 C66 74 78 68 78 52 C78 38 62 26 50 26 L40 14 Z"
            fill={`url(#${idPrefix}-grad)`}
          />
        </g>
      )}

      {/* VARIANT 8: TERMINAL / SPEC */}
      {variant === 'terminal' && (
        <g>
          <rect x="8" y="12" width="84" height="76" rx="6" fill={`url(#${idPrefix}-dark)`} />
          {/* Terminal prompt symbol */}
          <path
            d="M20 32 L34 44 L20 56"
            stroke="#00c8ff"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line x1="38" y1="56" x2="52" y2="56" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" />
          {/* Integrated Daxira D accent */}
          <path
            d="M62 30 C74 26 84 34 84 46 C84 56 74 62 62 62 L62 54 C68 54 74 52 74 46 C74 40 68 36 62 36 Z"
            fill={`url(#${idPrefix}-cyan)`}
          />
        </g>
      )}
    </svg>
  );
};
