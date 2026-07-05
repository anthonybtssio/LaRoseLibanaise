import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Traiteur from './pages/Traiteur';
import Reservation from './pages/Reservation';

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkClass = ({ isActive }) =>
    `hover-underline text-sm tracking-widest uppercase transition-colors duration-200 ${
      isActive ? 'text-gold' : 'text-stone-300 hover:text-stone-100'
    }`;

  return (
    <Router>
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
          <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">
            <NavLink to="/" className="font-display text-xl font-light tracking-[0.15em] text-gold-gradient">
              La Rose Libanaise
            </NavLink>

            {/* Desktop */}
            <div className="hidden md:flex items-center gap-10">
              <NavLink to="/" className={linkClass} end>Accueil</NavLink>
              <NavLink to="/menu" className={linkClass}>Carte</NavLink>
              <NavLink to="/traiteur" className={linkClass}>Traiteur</NavLink>
              <NavLink
                to="/reservation"
                className="text-sm tracking-widest uppercase px-6 py-2.5 border transition-all duration-300 hover:bg-gold hover:text-black"
                style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}
              >
                Réserver
              </NavLink>
            </div>

            {/* Mobile burger */}
            <button
              className="md:hidden text-gold text-xl"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div
              className="md:hidden flex flex-col items-center py-8 gap-8 text-sm tracking-widest uppercase"
              style={{ background: 'rgba(12,9,4,0.97)' }}
            >
              <NavLink to="/" onClick={() => setMenuOpen(false)} className={linkClass} end>Accueil</NavLink>
              <NavLink to="/menu" onClick={() => setMenuOpen(false)} className={linkClass}>Carte</NavLink>
              <NavLink to="/traiteur" onClick={() => setMenuOpen(false)} className={linkClass}>Traiteur</NavLink>
              <NavLink
                to="/reservation"
                onClick={() => setMenuOpen(false)}
                className="px-6 py-2.5 border"
                style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}
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
          <div className="text-center py-4 text-xs text-stone-700 border-t" style={{ borderColor: 'rgba(201,168,76,0.08)' }}>
            © 2026 La Rose Libanaise — Tous droits réservés
          </div>
        </footer>
      </div>
    </Router>
  );
}
