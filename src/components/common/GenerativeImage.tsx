'use client';

interface GenerativeImageProps {
  seed: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function GenerativeImage({
  seed,
  width = 400,
  height = 300,
  className = '',
}: GenerativeImageProps) {
  // 使用 seed 生成一个稳定的颜色
  const generateColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
    return '#' + '00000'.substring(0, 6 - c.length) + c;
  };

  const mainColor = generateColor(seed);
  const secondaryColor = generateColor(seed + '1');

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`grad-${seed}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: mainColor, stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: secondaryColor, stopOpacity: 0.9 }} />
          </linearGradient>
          <pattern
            id={`pattern-${seed}`}
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="10" cy="10" r="2" fill="white" fillOpacity="0.1" />
          </pattern>
        </defs>

        {/* 背景 */}
        <rect
          width="100%"
          height="100%"
          fill={`url(#grad-${seed})`}
        />

        {/* 图案叠加 */}
        <rect
          width="100%"
          height="100%"
          fill={`url(#pattern-${seed})`}
        />

        {/* 装饰性元素 */}
        <circle
          cx={width * 0.8}
          cy={height * 0.2}
          r={width * 0.15}
          fill="white"
          fillOpacity="0.1"
        />
        <circle
          cx={width * 0.2}
          cy={height * 0.8}
          r={width * 0.1}
          fill="white"
          fillOpacity="0.1"
        />

        {/* 产品名称 */}
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="white"
          fontSize={width * 0.08}
          fontWeight="bold"
          style={{
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          }}
        >
          {seed.split('/').pop()?.replace('.jpg', '')}
        </text>
      </svg>
    </div>
  );
}
