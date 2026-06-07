export default function FilterDefs() {
  return (
    <defs>
      <filter id="default">
        <feColorMatrix
          type="matrix"
          values="0.33 0 0 0 0 0 0.33 0 0 0 0 0 0.33 0 0 0 0 0 1 0"
        />
        <feComponentTransfer>
          <feFuncR type="linear" slope="0.5" />
          <feFuncG type="linear" slope="0.5" />
          <feFuncB type="linear" slope="0.5" />
        </feComponentTransfer>
      </filter>

      <filter id="selected" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
        <feFlood
          floodColor="rgb(var(--primary))"
          floodOpacity="0.8"
          result="color"
        />
        <feComposite in="color" in2="blur" operator="in" result="glow" />
        <feMerge>
          <feMergeNode in="glow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <filter id="unlocked" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" result="blur" />
        <feFlood floodColor="white" floodOpacity="0.3" result="color" />
        <feComposite in="color" in2="blur" operator="in" result="glow" />
        <feMerge>
          <feMergeNode in="glow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <linearGradient id="unlockedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgb(var(--primary))" stopOpacity="0.2" />
        <stop
          offset="100%"
          stopColor="rgb(var(--primary))"
          stopOpacity="0.05"
        />
      </linearGradient>
    </defs>
  );
}
