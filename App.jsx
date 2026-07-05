import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Traiteur from './pages/Traiteur';
import Reservation from './pages/Reservation';
import MentionsLegales from './pages/MentionsLegales';
import Confidentialite from './pages/Confidentialite';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const tickLink = (to, index, label, end) => (
    <NavLink to={to} end={end}>
      {({ isActive }) => (
        <span
          className="nav-tick"
          data-active={isActive}
        >
          <span className={`nav-index ${isActive ? 'text-gold' : ''}`}>{index}</span>
          <span
            className={`text-sm tracking-widest uppercase transition-colors duration-200 ${
              isActive ? 'text-gold' : 'text-stone-300 hover:text-stone-100'
            }`}
          >
            {label}
          </span>
          <span className="nav-line"></span>
        </span>
      )}
    </NavLink>
  );

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen" style={{ background: 'var(--dark)', color: 'var(--text)' }}>

        {/* NAV */}
        <nav
          className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
          style={{
            background: scrolled
              ? 'rgba(12,9,4,0.92)'
              : 'transparent',
            backdropFilter: scrolled ? 'blur(16px)' : 'none',
            borderBottom: scrolled ? '1px solid rgba(201,168,76,0.12)' : 'none',
          }}
        >
          {/* Desktop: three-column layout, logo centered between the links */}
          <div className="hidden md:grid grid-cols-3 items-center max-w-7xl mx-auto px-8 py-5">
            <div className="flex items-center gap-10 justify-start">
              {tickLink('/', 'I', 'Accueil', true)}
              {tickLink('/menu', 'II', 'Carte')}
            </div>

            <NavLink to="/" className="relative flex justify-center items-center gap-3 group">
              <span className="logo-mark">
                <span className="logo-ornament"></span>
              </span>
              <span className="font-display text-xl font-light tracking-[0.15em] text-gold-gradient">
                La Rose Libanaise
              </span>
            </NavLink>

            <div className="flex items-center gap-10 justify-end">
              {tickLink('/traiteur', 'III', 'Traiteur')}
              <NavLink
                to="/reservation"
                className="btn-corners text-sm tracking-widest uppercase transition-colors duration-300 hover:text-gold"
                style={{ color: 'var(--gold)' }}
              >
                Réserver
              </NavLink>
            </div>
          </div>

          {/* Mobile bar */}
          <div className="flex md:hidden justify-between items-center px-8 py-5">
            <NavLink to="/" className="flex items-center gap-3">
              <span className="logo-mark">
                <span className="logo-ornament"></span>
              </span>
              <span className="font-display text-xl font-light tracking-[0.15em] text-gold-gradient">
                La Rose Libanaise
              </span>
            </NavLink>
            <button
              className="text-gold text-xl"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>

          {/* Mobile full-screen menu */}
          {menuOpen && (
            <div className="md:hidden mobile-nav-overlay">
              {[
                ['/', 'I', 'Accueil', true],
                ['/menu', 'II', 'Carte', false],
                ['/traiteur', 'III', 'Traiteur', false],
              ].map(([to, index, label, end], i) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  onClick={() => setMenuOpen(false)}
                  className="mobile-nav-item flex flex-col items-center gap-2"
                  style={{ animationDelay: `${0.1 + i * 0.08}s` }}
                >
                  <span className="nav-index text-xs">{index}</span>
                  <span className="font-display text-3xl font-light text-stone-200">{label}</span>
                </NavLink>
              ))}
              <div className="gold-line mobile-nav-item" style={{ animationDelay: '0.34s' }}></div>
              <NavLink
                to="/reservation"
                onClick={() => setMenuOpen(false)}
                className="btn-corners mobile-nav-item text-sm tracking-widest uppercase"
                style={{ color: 'var(--gold)', animationDelay: '0.42s' }}
              >
                Réserver
              </NavLink>
            </div>
          )}
        </nav>

        {/* PAGES */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/traiteur" element={<Traiteur />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/mentions-legales" element={<MentionsLegales />} />
            <Route path="/confidentialite" element={<Confidentialite />} />
          </Routes>
        </main>

        {/* FOOTER */}
        <footer style={{ background: 'var(--surface)', borderTop: '1px solid rgba(201,168,76,0.12)' }}>
          <div className="max-w-7xl mx-auto px-8 py-16 grid md:grid-cols-4 gap-10">
            <div className="md:col-span-2">
              <p className="font-display text-3xl font-light text-gold-gradient mb-4">La Rose Libanaise</p>
              <p className="text-stone-500 text-sm leading-relaxed max-w-xs">
                Restaurant & Traiteur libanais authentique. Des saveurs du Liban transmises de génération en génération.
              </p>
              <div className="gold-line mt-8 ml-0" style={{ margin: '2rem 0 0 0' }}></div>
            </div>
            <div>
              <h4 className="text-xs tracking-widest uppercase text-gold mb-5">Horaires</h4>
              <div className="space-y-2 text-sm text-stone-400">
                <p>Lun – Ven <span className="text-stone-200 float-right">11h – 22h</span></p>
                <p>Sam – Dim <span className="text-stone-200 float-right">10h – 23h</span></p>
              </div>
            </div>
            <div>
              <h4 className="text-xs tracking-widest uppercase text-gold mb-5">Contact</h4>
              <div className="space-y-2 text-sm text-stone-400">
                <p>📍 123 Rue de la Rose, Paris</p>
                <p>📞 01 23 45 67 89</p>
                <p>✉️ contact@laroselibanaise.fr</p>
              </div>
            </div>
          </div>
          <div
            className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 text-center py-4 text-xs text-stone-700 border-t"
            style={{ borderColor: 'rgba(201,168,76,0.08)' }}
          >
            <span>© 2026 La Rose Libanaise — Tous droits réservés</span>
            <span className="hidden md:inline">·</span>
            <NavLink to="/mentions-legales" className="hover:text-stone-400 transition-colors">Mentions Légales</NavLink>
            <span className="hidden md:inline">·</span>
            <NavLink to="/confidentialite" className="hover:text-stone-400 transition-colors">Politique de Confidentialité</NavLink>
          </div>
        </footer>
      </div>
    </Router>
  );
}
