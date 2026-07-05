import { useState } from 'react';
import { Link } from 'react-router-dom';
import Tilt from '../components/Tilt';
import Reveal from '../components/Reveal';

const formules = [
  {
    n: '01',
    nom: 'Mezzés',
    prix: 22,
    unite: '€ / pers.',
    desc: 'Assortiment de 8 mezzés froids et chauds. Idéal pour cocktails et apéritifs.',
    items: ['Houmous, Moutabal, Tabboulé', 'Falafel, Sambousek, Kebbé', 'Pains pita maison', 'Service buffet inclus'],
    mini: 20,
  },
  {
    n: '02',
    nom: 'Complète',
    prix: 45,
    unite: '€ / pers.',
    desc: 'Mezzés + plats chauds + desserts. La formule la plus populaire pour mariages et fêtes.',
    items: ['Tous les mezzés', 'Grillades (kafta, chawarma)', 'Riz libanais et accompagnements', 'Plateau de desserts orientaux', 'Service & installation inclus'],
    mini: 30,
    highlight: true,
  },
  {
    n: '03',
    nom: 'Premium',
    prix: 65,
    unite: '€ / pers.',
    desc: 'Expérience complète avec maître d\'hôtel, décoration de table et menu sur mesure.',
    items: ['Menu entièrement personnalisé', 'Grillades au charbon en direct', 'Desserts et pâtisseries orientales', 'Maître d\'hôtel & service à table', 'Décoration florale incluse'],
    mini: 50,
  },
];

export default function Traiteur() {
  const [guests, setGuests] = useState(50);
  const [selectedFormule, setSelectedFormule] = useState(formules[1]);

  const total = guests * selectedFormule.prix;

  return (
    <div style={{ background: 'var(--dark)', minHeight: '100vh' }}>
      {/* HEADER */}
      <div
        className="relative overflow-hidden pt-32 pb-24 px-8 clip-diagonal-bottom"
        style={{ background: 'var(--surface)' }}
      >
        <div
          className="absolute right-0 top-0 bottom-0 font-display font-light pointer-events-none select-none flex items-center"
          style={{ fontSize: 'clamp(120px, 18vw, 260px)', color: 'rgba(201,168,76,0.05)', lineHeight: 1, paddingRight: '2rem' }}
        >
          TRAITEUR
        </div>
        <Reveal className="max-w-7xl mx-auto relative z-10">
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: 'var(--gold)' }}>Service Traiteur</p>
          <h1 className="font-display text-6xl md:text-7xl font-light mb-6">
            Votre Événement,<br />
            <span className="italic text-gold-gradient">Notre Passion</span>
          </h1>
          <p className="text-stone-400 max-w-xl text-sm leading-relaxed">
            Mariages, fiançailles, anniversaires, événements d'entreprise. Nous prenons en charge tout — de la préparation à la vaisselle — pour que vous profitiez de chaque instant.
          </p>
        </Reveal>
      </div>

      {/* FORMULES */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <Reveal className="flex items-end justify-between mb-16">
          <h2 className="font-display text-4xl font-light">Nos Formules</h2>
          <div className="gold-line" style={{ margin: 0, width: '80px' }} />
        </Reveal>

        <div className="grid md:grid-cols-3 gap-4">
          {formules.map((f, i) => (
            <Reveal key={f.n} delay={i * 0.1}>
              <Tilt
                max={5}
                onClick={() => setSelectedFormule(f)}
                className="relative overflow-hidden p-8 cursor-pointer"
                style={{
                  border: `1px solid ${f.highlight || selectedFormule.n === f.n ? 'var(--gold)' : 'rgba(201,168,76,0.15)'}`,
                  background: selectedFormule.n === f.n ? 'rgba(201,168,76,0.06)' : 'var(--surface)',
                  borderRadius: '2px',
                }}
              >
                {f.highlight && (
                  <div
                    className="absolute top-0 right-0 text-xs tracking-widest uppercase px-3 py-1"
                    style={{ background: 'var(--gold)', color: '#0c0904' }}
                  >
                    Populaire
                  </div>
                )}
                <div
                  className="font-display text-6xl font-light mb-4"
                  style={{ color: 'rgba(201,168,76,0.25)' }}
                >
                  {f.n}
                </div>
                <h3 className="font-display text-2xl font-light mb-1" style={{ color: 'var(--text)' }}>
                  Formule {f.nom}
                </h3>
                <p className="font-display text-4xl mb-4" style={{ color: 'var(--gold)' }}>
                  {f.prix}<span className="text-sm font-sans" style={{ color: 'var(--muted)' }}>{f.unite}</span>
                </p>
                <p className="text-xs leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>{f.desc}</p>
                <ul className="space-y-2">
                  {f.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs" style={{ color: 'var(--text)', opacity: 0.7 }}>
                      <span style={{ color: 'var(--gold)' }}>—</span> {item}
                    </li>
                  ))}
                </ul>
                <p className="text-xs mt-5" style={{ color: 'var(--muted)' }}>Min. {f.mini} personnes</p>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ESTIMATEUR */}
      <section
        className="py-24 px-8 clip-diagonal-top"
        style={{ background: 'var(--surface)' }}
      >
        <Reveal className="max-w-4xl mx-auto">
          <p className="text-xs tracking-widest uppercase mb-3 text-center" style={{ color: 'var(--gold)' }}>Outil de budget</p>
          <h2 className="font-display text-4xl font-light text-center mb-16">Estimez en temps réel</h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {/* Sélection formule */}
              <div>
                <label className="text-xs tracking-widest uppercase block mb-3" style={{ color: 'var(--gold)' }}>
                  Formule
                </label>
                <select
                  className="input-dark"
                  value={selectedFormule.n}
                  onChange={(e) => setSelectedFormule(formules.find((f) => f.n === e.target.value))}
                >
                  {formules.map((f) => (
                    <option key={f.n} value={f.n}>Formule {f.nom} — {f.prix}€ / pers.</option>
                  ))}
                </select>
              </div>

              {/* Slider */}
              <div>
                <label className="text-xs tracking-widest uppercase block mb-3" style={{ color: 'var(--gold)' }}>
                  Convives
                </label>
                <div
                  className="text-center font-display text-5xl font-light mb-4"
                  style={{ color: 'var(--text)' }}
                >
                  {guests}
                  <span className="text-lg ml-2" style={{ color: 'var(--muted)' }}>pers.</span>
                </div>
                <input
                  type="range"
                  min="20" max="400" step="5"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full"
                  style={{ accentColor: 'var(--gold)' }}
                />
                <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--muted)' }}>
                  <span>20</span><span>400</span>
                </div>
              </div>

              <Link
                to="/reservation"
                className="block text-center py-4 text-xs tracking-widest uppercase transition-all duration-300 hover:opacity-90"
                style={{ background: 'var(--gold)', color: '#0c0904' }}
              >
                Demander un devis détaillé →
              </Link>
            </div>

            {/* Résultat */}
            <div
              className="relative flex flex-col items-center justify-center text-center p-12"
              style={{ border: '1px solid rgba(201,168,76,0.2)', background: 'rgba(201,168,76,0.03)' }}
            >
              <p className="text-xs tracking-widest uppercase mb-6" style={{ color: 'var(--muted)' }}>
                Estimation — Formule {selectedFormule.nom}
              </p>
              <div
                className="font-display font-light leading-none mb-2"
                style={{ fontSize: 'clamp(48px, 8vw, 80px)', color: 'var(--gold)' }}
              >
                ~{total.toLocaleString('fr-FR')}
                <span className="text-4xl">€</span>
              </div>
              <p className="text-xs mt-4 leading-relaxed" style={{ color: 'var(--muted)' }}>
                {selectedFormule.prix}€ × {guests} personnes<br />
                Préparation, service & installation inclus.<br />
                Contactez-nous pour affiner votre menu.
              </p>
              <div className="gold-line mt-8" />
            </div>
          </div>
        </Reveal>
      </section>

      {/* GALERIE EVENTS */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <Reveal className="text-center mb-16">
          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--gold)' }}>Ils nous ont fait confiance</p>
          <h2 className="font-display text-4xl font-light">+500 Événements Réussis</h2>
        </Reveal>
        <div className="grid grid-cols-3 gap-3">
          {[
            'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80',
          ].map((src, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <Tilt max={5} className="overflow-hidden" style={{ height: '250px', borderRadius: '2px' }}>
                <img
                  src={src}
                  alt="Événement"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  style={{ filter: 'brightness(0.6) saturate(0.8)' }}
                />
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
