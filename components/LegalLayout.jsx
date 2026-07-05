import Reveal from './Reveal';

export function LegalLayout({ title, subtitle, children }) {
  return (
    <div style={{ background: 'var(--dark)', minHeight: '100vh' }}>
      <div
        className="relative overflow-hidden pt-32 pb-20 px-8 text-center clip-diagonal-bottom"
        style={{ background: 'var(--surface)' }}
      >
        <Reveal className="relative z-10">
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: 'var(--gold)' }}>
            La Rose Libanaise
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-light">{title}</h1>
          {subtitle && <p className="text-stone-500 mt-4 text-sm">{subtitle}</p>}
        </Reveal>
      </div>

      <div className="max-w-3xl mx-auto px-8 py-20">
        {children}
      </div>
    </div>
  );
}

export function LegalSection({ title, children }) {
  return (
    <section className="mb-12">
      <h2 className="font-display text-2xl font-light mb-4" style={{ color: 'var(--gold)' }}>{title}</h2>
      <div className="space-y-3 text-sm leading-relaxed" style={{ color: '#b3a893' }}>
        {children}
      </div>
    </section>
  );
}

export function Placeholder({ children }) {
  return <span style={{ color: '#e0a95c', fontStyle: 'italic' }}>[{children}]</span>;
}
