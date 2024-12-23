'use client';

interface BadgeIconProps {
  type: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  size?: number;
  className?: string;
}

const COLORS = {
  bronze: {
    primary: '#CD7F32',
    secondary: '#A05A2C',
    highlight: '#E8A66D',
  },
  silver: {
    primary: '#C0C0C0',
    secondary: '#A8A8A8',
    highlight: '#E8E8E8',
  },
  gold: {
    primary: '#FFD700',
    secondary: '#DAA520',
    highlight: '#FFF1AA',
  },
  platinum: {
    primary: '#E5E4E2',
    secondary: '#B4B4B4',
    highlight: '#FFFFFF',
  },
  diamond: {
    primary: '#B9F2FF',
    secondary: '#89CFF0',
    highlight: '#E6FFFF',
  },
};

const ICONS = {
  bronze: (
    <path
      d="M12 2L9 9H2L7 14L5 21L12 17L19 21L17 14L22 9H15L12 2Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  silver: (
    <path
      d="M12 2L9 9H2L7 14L5 21L12 17L19 21L17 14L22 9H15L12 2Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  gold: (
    <path
      d="M12 2L9 9H2L7 14L5 21L12 17L19 21L17 14L22 9H15L12 2Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  platinum: (
    <path
      d="M12 2C13.3132 2 14.6136 2.25866 15.8268 2.76121C17.0401 3.26375 18.1425 4.00035 19.0711 4.92893C19.9997 5.85752 20.7362 6.95991 21.2388 8.17317C21.7413 9.38642 22 10.6868 22 12C22 14.6522 20.9464 17.1957 19.0711 19.0711C17.1957 20.9464 14.6522 22 12 22C10.6868 22 9.38642 21.7413 8.17317 21.2388C6.95991 20.7362 5.85752 19.9997 4.92893 19.0711C3.05357 17.1957 2 14.6522 2 12C2 9.34784 3.05357 6.8043 4.92893 4.92893C6.8043 3.05357 9.34784 2 12 2Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  diamond: (
    <>
      <path
        d="M12 2L22 12L12 22L2 12L12 2Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 2L17 12L12 22L7 12L12 2Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
};

export default function BadgeIcon({ type, size = 48, className = '' }: BadgeIconProps) {
  const colors = COLORS[type];
  const gradientId = `badge-gradient-${type}`;

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.highlight} />
            <stop offset="50%" stopColor={colors.primary} />
            <stop offset="100%" stopColor={colors.secondary} />
          </linearGradient>
        </defs>
        
        {type === 'diamond' ? (
          <>
            <path
              d="M12 2L22 12L12 22L2 12L12 2Z"
              fill={`url(#${gradientId})`}
              stroke={colors.secondary}
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 2L17 12L12 22L7 12L12 2Z"
              fill={`url(#${gradientId})`}
              fillOpacity="0.7"
              stroke={colors.secondary}
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        ) : type === 'platinum' ? (
          <path
            d="M12 2C13.3132 2 14.6136 2.25866 15.8268 2.76121C17.0401 3.26375 18.1425 4.00035 19.0711 4.92893C19.9997 5.85752 20.7362 6.95991 21.2388 8.17317C21.7413 9.38642 22 10.6868 22 12C22 14.6522 20.9464 17.1957 19.0711 19.0711C17.1957 20.9464 14.6522 22 12 22C10.6868 22 9.38642 21.7413 8.17317 21.2388C6.95991 20.7362 5.85752 19.9997 4.92893 19.0711C3.05357 17.1957 2 14.6522 2 12C2 9.34784 3.05357 6.8043 4.92893 4.92893C6.8043 3.05357 9.34784 2 12 2Z"
            fill={`url(#${gradientId})`}
            stroke={colors.secondary}
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M12 2L9 9H2L7 14L5 21L12 17L19 21L17 14L22 9H15L12 2Z"
            fill={`url(#${gradientId})`}
            stroke={colors.secondary}
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </div>
  );
}
