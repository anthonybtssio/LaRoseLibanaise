import { Link } from 'react-router-dom';

const marqueeWords = ['Mezzés · ', 'Grillades · ', 'Mariage · ', 'Authenticité · ', 'Liban · ', 'Traiteur · ', 'Saveurs · '];

export default function Home() {
  return (
    <div>
      {/* ══════════ HERO ══════════ */}
      <section className="relative h-screen flex items-end overflow-hidden grain">
        <img
          src="https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=80&w=1800"
          alt="Cuisine libanaise"
          className="absolute inset-0 w-full h-full object-cover scale-105"
          style={{ filter: 'brightness(0.35)' }}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(12,9,4,1) 0%, rgba(12,9,4,0.4) 50%, transparent 100%)',
          }}
        />

        {/* Big background text */}
        <div
          className="absolute top-1/2 left-0 right-0 -translate-y-1/2 text-center pointer-events-none select-none"
          style={{
            fontSize: 'clamp(80px, 18vw, 240px)',
            fontFamily: 'Cormorant Garamond, serif',
            fontWeight: 300,
            color: 'rgba(201,168,76,0.07)',
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          LIBAN
        </div>

        {/* Content */}
        <div className="relative z-10 px-8 md:px-16 pb-20 max-w-7xl mx-auto w-full animate-fadeUp">
          <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: 'var(--gold)' }}>
            Restaurant & Traiteur · Paris
          </p>
          <h1
            className="font-display font-light leading-[0.9] mb-8"
            style={{
              fontSize: 'clamp(60px, 9vw, 130px)',
              color: 'var(--text)',
            }}
          >
            La Rose<br />
            <span className="italic" style={{ color: 'var(--gold)' }}>Libanaise</span>
          </h1>
          <p className="text-stone-400 text-lg mb-10 max-w-md font-light">
            Les saveurs authentiques du Liban. Une cuisine vivante, généreuse, transmise de génération en génération.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/menu"
              className="group flex items-center gap-3 text-sm tracking-widest uppercase px-8 py-4 transition-all duration-300"
              style={{ background: 'var(--gold)', color: '#0c0904' }}
            >
              Notre Carte
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link
              to="/reservation"
              className="flex items-center gap-3 text-sm tracking-widest uppercase px-8 py-4 border transition-all duration-300 hover:bg-white/5"
              style={{ borderColor: 'rgba(201,168,76,0.4)', color: 'var(--text)' }}
            >
              Réserver
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-16" style={{ background: 'linear-gradient(to bottom, transparent, var(--gold))' }} />
          <span className="text-xs tracking-widest uppercase" style={{ writingMode: 'vertical-rl', color: 'var(--gold)' }}>Scroll</span>
        </div>
      </section>

      {/* ══════════ MARQUEE ══════════ */}
      <div
        className="overflow-hidden py-4 border-y"
        style={{ borderColor: 'rgba(201,168,76,0.15)', background: 'var(--surface)' }}
      >
        <div className="marquee-inner flex whitespace-nowrap">
          {[...marqueeWords, ...marqueeWords, ...marqueeWords, ...marqueeWords].map((w, i) => (
            <span key={i} className="font-display italic text-xl px-2" style={{ color: 'var(--gold)', opacity: 0.7 }}>
              {w}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════ CONCEPT (numéroté) ══════════ */}
      <section className="py-28 px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-20">
          <h2 className="font-display text-5xl md:text-6xl font-light" style={{ color: 'var(--text)' }}>
            Notre<br /><span className="italic text-gold-gradient">Savoir-Faire</span>
          </h2>
          <p className="text-stone-500 max-w-xs text-sm leading-relaxed md:text-right mt-4">
            De la table d'à côté à votre grand événement — nous mettons tout notre cœur dans chaque plat, chaque service.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              n: '01', title: 'Le Restaurant',
              desc: 'Mezzés généreux, grillades au charbon, plats mijotés. Une expérience authentique à partager en famille.',
              img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
            },
            {
              n: '02', title: 'Le Traiteur',
              desc: 'Mariages, fiançailles, anniversaires. Nous gérons tout : buffet, livraison, installation, service.',
              img: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80',
            },
            {
              n: '03', title: 'Fait Maison',
              desc: 'Tout est préparé chaque jour avec des ingrédients frais. Recettes transmises de génération en génération.',
              img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
            },
          ].map((item) => (
            <div key={item.n} className="group relative overflow-hidden" style={{ borderRadius: '2px' }}>
              <div className="relative h-72 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ filter: 'brightness(0.5)' }}
                />
                <div
                  className="absolute top-4 left-4 font-display text-7xl font-light leading-none"
                  style={{ color: 'rgba(201,168,76,0.4)' }}
                >
                  {item.n}
                </div>
              </div>
              <div className="glass p-6 mt-0.5">
                <h3 className="font-display text-2xl font-light mb-2" style={{ color: 'var(--gold)' }}>{item.title}</h3>
                <p className="text-stone-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ SPÉCIALITÉS (full bleed dark) ══════════ */}
      <section
        className="clip-diagonal-bottom py-28 px-8 relative overflow-hidden"
        style={{ background: 'var(--surface)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <h2 className="font-display text-5xl font-light">
              <span className="italic text-gold-gradient">Nos</span><br />
              Spécialités
            </h2>
            <Link
              to="/menu"
              className="text-xs tracking-widest uppercase hover-underline pb-1"
              style={{ color: 'var(--gold)' }}
            >
              Voir la carte complète →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Mezzés & Entrées', sub: 'Houmous · Tabboulé · Fattoush', img: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=500&q=80' },
              { label: 'Grillades', sub: 'Kafta · Chawarma · Côtelettes', img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=500&q=80', tall: true },
              { label: 'Buffets Traiteur', sub: 'Plateaux · Cocktails · Réceptions', img: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=500&q=80' },
              { label: 'Pâtisseries', sub: 'Baklava · Knafeh · Maamoul', img: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=500&q=80', tall: true },
            ].map((s, i) => (
              <div
                key={i}
                className="relative overflow-hidden group"
                style={{ height: s.tall ? '360px' : '220px', borderRadius: '2px' }}
              >
                <img
                  src={s.img}
                  alt={s.label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ filter: 'brightness(0.45)' }}
                />
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(to top, rgba(12,9,4,0.9) 0%, transparent 60%)' }}
                />
                <div className="absolute bottom-0 left-0 p-5">
                  <p className="font-display text-lg font-light text-white">{s.label}</p>
                  <p className="text-xs text-stone-400 mt-1">{s.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ TÉMOIGNAGES ══════════ */}
      <section className="py-32 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--gold)' }}>Ce qu'ils disent</p>
          <h2 className="font-display text-5xl font-light">Nos Clients</h2>
          <div className="gold-line mt-6" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { nom: 'Fatima B.', note: '5/5', texte: 'Le houmous le plus crémeux que j\'aie mangé. Le service traiteur pour notre mariage était absolument parfait.' },
            { nom: 'Marc D.', note: '5/5', texte: 'Un dépaysement total. Les grillades au charbon sont incroyables. Je reviens chaque semaine !' },
            { nom: 'Leila K.', note: '5/5', texte: 'Comme à Beyrouth ! On se sent vraiment chez soi. La famille fait un travail remarquable, avec le cœur.' },
          ].map((t, i) => (
            <div
              key={i}
              className="glass p-8 relative"
              style={{ borderRadius: '2px' }}
            >
              <div
                className="font-display text-8xl font-light absolute top-2 left-5 leading-none pointer-events-none select-none"
                style={{ color: 'rgba(201,168,76,0.1)' }}
              >
                "
              </div>
              <p className="text-stone-300 text-sm leading-relaxed mb-6 relative z-10 mt-6">
                {t.texte}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm" style={{ color: 'var(--gold)' }}>{t.nom}</span>
                <span className="text-xs text-stone-600 tracking-widest">{t.note}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════ CTA FINAL ══════════ */}
      <section className="relative overflow-hidden py-40 px-8 text-center">
        <img
          src="https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=1600&q=80"
          alt="Ambiance"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.2) saturate(0.5)' }}
        />
        <div className="absolute inset-0" style={{ background: 'rgba(12,9,4,0.6)' }} />
        <div className="relative z-10">
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: 'var(--gold)' }}>Prêt à vivre l'expérience ?</p>
          <h2 className="font-display text-6xl md:text-8xl font-light mb-10">
            Réservez<br />
            <span className="italic text-gold-gradient">Votre Table</span>
          </h2>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              to="/reservation"
              className="px-10 py-4 text-sm tracking-widest uppercase font-medium transition-all duration-300 hover:opacity-90"
              style={{ background: 'var(--gold)', color: '#0c0904' }}
            >
              Réserver maintenant
            </Link>
            <Link
              to="/traiteur"
              className="px-10 py-4 text-sm tracking-widest uppercase border transition-all duration-300 hover:bg-white/5"
              style={{ borderColor: 'rgba(201,168,76,0.4)', color: 'var(--text)' }}
            >
              Service Traiteur
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
