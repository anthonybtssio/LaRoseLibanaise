import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import Tilt from '../components/Tilt';
import Reveal from '../components/Reveal';
import Reviews from '../components/Reviews';

const marqueeWords = ['Mezzés · ', 'Grillades · ', 'Mariage · ', 'Authenticité · ', 'Liban · ', 'Traiteur · ', 'Saveurs · '];

export default function Home() {
  const bgRef = useRef(null);
  const textRef = useRef(null);

  const onHeroMove = (e) => {
    if (!window.matchMedia('(hover: hover)').matches) return;
    const px = (e.clientX / window.innerWidth - 0.5);
    const py = (e.clientY / window.innerHeight - 0.5);
    if (bgRef.current) {
      bgRef.current.style.transform = `scale(1.05) translate(${px * -14}px, ${py * -14}px)`;
    }
    if (textRef.current) {
      textRef.current.style.transform = `translate(${px * 22}px, calc(-50% + ${py * 22}px))`;
    }
  };

  return (
    <div>
      {/* ══════════ HERO ══════════ */}
      <section className="relative h-screen flex items-end overflow-hidden grain" onMouseMove={onHeroMove}>
        <img
          ref={bgRef}
          src="https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=80&w=1800"
          alt="Cuisine libanaise"
          className="absolute inset-0 w-full h-full object-cover scale-105"
          style={{ filter: 'brightness(0.35)', transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)' }}
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
          ref={textRef}
          className="absolute top-1/2 left-0 right-0 -translate-y-1/2 text-center pointer-events-none select-none"
          style={{
            fontSize: 'clamp(80px, 18vw, 240px)',
            fontFamily: 'Cormorant Garamond, serif',
            fontWeight: 300,
            color: 'rgba(201,168,76,0.07)',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            transition: 'transform 0.6s cubic-bezier(0.22,1,0.36,1)',
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
        <Reveal className="flex flex-col md:flex-row justify-between items-start gap-4 mb-20">
          <h2 className="font-display text-5xl md:text-6xl font-light" style={{ color: 'var(--text)' }}>
            Notre<br /><span className="italic text-gold-gradient">Savoir-Faire</span>
          </h2>
          <p className="text-stone-500 max-w-xs text-sm leading-relaxed md:text-right mt-4">
            De la table d'à côté à votre grand événement — nous mettons tout notre cœur dans chaque plat, chaque service.
          </p>
        </Reveal>

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
          ].map((item, i) => (
            <Reveal key={item.n} delay={i * 0.1}>
              <Tilt max={6} className="group relative overflow-hidden" style={{ borderRadius: '2px' }}>
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
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════ SPÉCIALITÉS (full bleed dark) ══════════ */}
      <section
        className="clip-diagonal-bottom py-28 px-8 relative overflow-hidden"
        style={{ background: 'var(--surface)' }}
      >
        <div className="max-w-7xl mx-auto">
          <Reveal className="flex items-end justify-between mb-16">
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
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Mezzés & Entrées', sub: 'Houmous · Tabboulé · Fattoush', img: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=500&q=80' },
              { label: 'Grillades', sub: 'Kafta · Chawarma · Côtelettes', img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=500&q=80', tall: true },
              { label: 'Buffets Traiteur', sub: 'Plateaux · Cocktails · Réceptions', img: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=500&q=80' },
              { label: 'Pâtisseries', sub: 'Baklava · Knafeh · Maamoul', img: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=500&q=80', tall: true },
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <Tilt max={5} className="relative overflow-hidden group" style={{ height: s.tall ? '360px' : '220px', borderRadius: '2px' }}>
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
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ STORY SCROLL — DU LIBAN À PARIS ══════════ */}
      <OriginStory />

      {/* ══════════ AVIS CLIENTS ══════════ */}
      <Reviews />

      {/* ══════════ CTA FINAL ══════════ */}
      <section className="relative overflow-hidden py-40 px-8 text-center">
        <img
          src="https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=1600&q=80"
          alt="Ambiance"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.2) saturate(0.5)' }}
        />
        <div className="absolute inset-0" style={{ background: 'rgba(12,9,4,0.6)' }} />
        <Reveal className="relative z-10">
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
        </Reveal>
      </section>
    </div>
  );
}

function OriginStory() {
  const [revealed, setRevealed] = useState(-1);

  const steps = [
    {
      n: '01', title: 'L\'Origine',
      desc: 'Huile d\'olive, sumac, zaatar, épices : nos ingrédients sont sélectionnés directement auprès de producteurs libanais, fidèles aux saveurs du pays.',
      img: 'https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=700&q=80',
    },
    {
      n: '02', title: 'Le Fait Maison',
      desc: 'Chaque matin dans notre cuisine parisienne, la famille prépare pains, mezzés et grillades, comme à Beyrouth, sans compromis.',
      img: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&w=700&q=80',
    },
    {
      n: '03', title: 'Votre Table',
      desc: 'De notre cuisine à votre assiette, ou installés chez vous pour votre événement — le voyage se termine avec vous.',
      img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=700&q=80',
    },
  ];

  const pct = revealed < 0 ? 0 : ((revealed + 1) / steps.length) * 100;

  return (
    <section className="py-28 px-8 max-w-5xl mx-auto">
      <Reveal className="text-center mb-20">
        <p className="text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--gold)' }}>Notre Histoire</p>
        <h2 className="font-display text-5xl font-light">
          Du Liban <span className="italic text-gold-gradient">à Paris</span>
        </h2>
      </Reveal>

      <div className="relative">
        <div
          className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
          style={{ background: 'rgba(201,168,76,0.15)' }}
        >
          <div
            className="absolute left-0 top-0 w-full"
            style={{
              height: `${pct}%`,
              background: 'linear-gradient(to bottom, var(--gold), var(--gold-light))',
              transition: 'height 0.8s cubic-bezier(0.22,1,0.36,1)',
            }}
          />
        </div>

        <div className="space-y-20 md:space-y-32">
          {steps.map((s, i) => (
            <Reveal key={s.n} className="relative" onReveal={() => setRevealed((r) => Math.max(r, i))}>
              <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                <Tilt max={6} style={{ order: i % 2 === 1 ? 2 : 1, borderRadius: '2px' }} className="relative h-64 md:h-72 overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.title}
                    className="w-full h-full object-cover"
                    style={{ filter: 'brightness(0.55)' }}
                  />
                </Tilt>
                <div style={{ order: i % 2 === 1 ? 1 : 2 }} className={i % 2 === 1 ? 'md:text-right' : ''}>
                  <p className="text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--gold)' }}>{s.n}</p>
                  <h3 className="font-display text-3xl font-light mb-3" style={{ color: 'var(--text)' }}>{s.title}</h3>
                  <p className="text-stone-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
              <span
                className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full z-10"
                style={{
                  background: revealed >= i ? 'var(--gold)' : 'var(--dark)',
                  border: '2px solid var(--gold)',
                  boxShadow: revealed >= i ? '0 0 14px rgba(201,168,76,0.7)' : 'none',
                  transition: 'all 0.5s ease',
                }}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
