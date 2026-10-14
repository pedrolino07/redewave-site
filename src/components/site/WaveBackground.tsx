export function WaveBackground() {
  const paths = Array.from({ length: 9 }, (_, i) => {
    const y = 300 + i * 26;
    const amp = 70 + i * 12;
    return `M-100 ${y} C 300 ${y - amp}, 600 ${y + amp}, 900 ${y} S 1500 ${y - amp}, 1700 ${y}`;
  });
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="grid-lines absolute inset-0 opacity-60" />
      <div className="absolute left-1/2 top-1/3 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
        {paths.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="var(--primary)"
            strokeOpacity={0.12 + i * 0.05}
            strokeWidth={i === 5 ? 1.6 : 1}
            className="wave-line"
            style={{ animationDuration: `${50 + i * 8}s` }}
          />
        ))}
        {[220, 640, 1080, 1420].map((x, i) => (
          <circle key={x} cx={x} cy={360 + (i % 2) * 120} r="3" fill="var(--primary-glow)">
            <animate attributeName="opacity" values="0.2;1;0.2" dur={`${3 + i}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
