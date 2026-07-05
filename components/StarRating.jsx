export default function StarRating({ value = 0, onChange, size = 20, interactive = false }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center gap-1" style={{ lineHeight: 1 }}>
      {stars.map((n) => {
        const filled = n <= Math.round(value);
        return (
          <span
            key={n}
            onClick={interactive ? () => onChange(n) : undefined}
            style={{
              fontSize: size,
              color: filled ? 'var(--gold)' : 'rgba(201,168,76,0.25)',
              cursor: interactive ? 'pointer' : 'default',
              transition: 'color 0.15s ease, transform 0.15s ease',
            }}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}
