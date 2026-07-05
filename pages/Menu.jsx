import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Tilt from '../components/Tilt';
import Reveal from '../components/Reveal';

const carte = {
  'Mezzés Froids': [
    { name: 'Houmous Maison', price: '8', desc: 'Crème de pois chiches, tahini, citron, huile d\'olive extra vierge.', tags: ['Pois chiches', 'Tahini', 'Citron'], img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=80' },
    { name: 'Moutabal', price: '8', desc: 'Purée d\'aubergine grillée, tahini, grenade et coriandre.', tags: ['Aubergine', 'Tahini', 'Grenade'], img: 'https://images.unsplash.com/photo-1625944230945-1b7dd3b949ab?auto=format&fit=crop&w=900&q=80' },
    { name: 'Tabboulé', price: '9', desc: 'Persil, tomates, boulgour fin, menthe fraîche et citron.', tags: ['Persil', 'Tomates', 'Boulgour'], img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80' },
    { name: 'Fattoush', price: '9', desc: 'Salade croquante, pain pita grillé, sumac et grenade.', tags: ['Sumac', 'Pita grillé', 'Grenade'], img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80' },
    { name: 'Labneh aux herbes', price: '7', desc: 'Fromage blanc égoutté, herbes du Liban, huile d\'olive.', tags: ['Labneh', 'Herbes', 'Huile d\'olive'], img: 'https://images.unsplash.com/photo-1631292784640-2b24be784d5d?auto=format&fit=crop&w=900&q=80' },
    { name: 'Feuilles de vigne farcies', price: '10', desc: 'Farcies au riz, tomates et épices, servies froides.', tags: ['Vigne', 'Riz', 'Épices'], img: 'https://images.unsplash.com/photo-1600335895229-6e75511892c8?auto=format&fit=crop&w=900&q=80' },
  ],
  'Mezzés Chauds': [
    { name: 'Falafel Maison', price: '10', desc: 'Croquettes de pois chiches et fèves, herbes fraîches, sauce tahini.', tags: ['Pois chiches', 'Fèves', 'Tahini'], img: 'https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?auto=format&fit=crop&w=900&q=80' },
    { name: 'Sambousek Fromage', price: '9', desc: 'Chaussons feuilletés au fromage blanc et menthe.', tags: ['Feuilleté', 'Fromage', 'Menthe'], img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80' },
    { name: 'Kebbé Frite', price: '11', desc: 'Boulettes d\'agneau et boulgour, pignons de pin.', tags: ['Agneau', 'Boulgour', 'Pignons'], img: 'https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=900&q=80' },
    { name: 'Fatayer Épinards', price: '9', desc: 'Petits chaussons aux épinards, oignons et sumac.', tags: ['Épinards', 'Oignons', 'Sumac'], img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80' },
    { name: 'Soujouk Grillé', price: '12', desc: 'Saucisses libanaises épicées, poivrons grillés.', tags: ['Soujouk', 'Poivrons', 'Épicé'], img: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=900&q=80' },
  ],
  'Plats Principaux': [
    { name: 'Chawarma Poulet', price: '16', desc: 'Poulet mariné aux épices, sauce à l\'ail, légumes grillés.', tags: ['Poulet', 'Ail', 'Légumes grillés'], img: 'https://images.unsplash.com/photo-1633436375153-d7045cb93e38?auto=format&fit=crop&w=900&q=80' },
    { name: 'Chawarma Viande', price: '17', desc: 'Agneau et bœuf marinés, tomates, oignons, sauce tahini.', tags: ['Agneau', 'Bœuf', 'Tahini'], img: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=900&q=80' },
    { name: 'Kafta Grillée', price: '17', desc: 'Brochettes d\'agneau haché aux herbes, grillées au charbon.', tags: ['Agneau haché', 'Herbes', 'Charbon'], img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80' },
    { name: 'Maqluba', price: '18', desc: 'Riz retourné aux légumes et poulet, sauce yaourt.', tags: ['Riz', 'Poulet', 'Yaourt'], img: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=900&q=80' },
    { name: 'Grillades Mixtes (2 pers.)', price: '36', desc: 'Assortiment de kafta, chawarma, côtelettes d\'agneau.', tags: ['Kafta', 'Chawarma', 'Côtelettes'], img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80' },
    { name: 'Poisson Grillé du Jour', price: '22', desc: 'Poisson frais, chermoula libanaise, légumes de saison.', tags: ['Poisson', 'Chermoula', 'Légumes'], img: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=80' },
  ],
  'Desserts': [
    { name: 'Baklava Maison', price: '6', desc: 'Feuilleté aux pistaches et noix, sirop à la fleur d\'oranger.', tags: ['Pistaches', 'Noix', 'Fleur d\'oranger'], img: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=900&q=80' },
    { name: 'Maamoul', price: '5', desc: 'Gâteaux sablés fourrés aux dattes ou pistaches.', tags: ['Dattes', 'Pistaches', 'Sablé'], img: 'https://images.unsplash.com/photo-1621236378699-8597faf6a176?auto=format&fit=crop&w=900&q=80' },
    { name: 'Mouhalabieh', price: '6', desc: 'Crème de lait à la fleur d\'oranger, pistaches, cannelle.', tags: ['Lait', 'Fleur d\'oranger', 'Cannelle'], img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80' },
    { name: 'Knafeh', price: '8', desc: 'Pâte de semoule, fromage fondu, sirop de rose, pistaches.', tags: ['Semoule', 'Fromage', 'Sirop de rose'], img: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=900&q=80' },
  ],
  'Boissons': [
    { name: 'Ayran', price: '3', desc: 'Yaourt salé battu, menthe fraîche.', tags: ['Yaourt', 'Menthe'], img: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=900&q=80' },
    { name: 'Jus de Grenade', price: '4', desc: 'Pressé à la commande, naturellement sucré.', tags: ['Grenade', 'Pressé'], img: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=900&q=80' },
    { name: 'Thé à la Menthe', price: '3', desc: 'Thé vert, menthe fraîche, sucre.', tags: ['Thé vert', 'Menthe'], img: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=900&q=80' },
    { name: 'Café Arabe', price: '3', desc: 'Café à la cardamome, servi avec dattes.', tags: ['Cardamome', 'Dattes'], img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=900&q=80' },
    { name: 'Limonade Libanaise', price: '4', desc: 'Citron, fleur d\'oranger, menthe, eau gazeuse.', tags: ['Citron', 'Fleur d\'oranger', 'Menthe'], img: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=900&q=80' },
  ],
};

const categories = Object.keys(carte);

const allDishes = categories.flatMap((cat) => carte[cat].map((item) => ({ ...item, cat })));

const findDish = (name) => allDishes.find((d) => d.name === name);

const signatureNames = ['Houmous Maison', 'Kafta Grillée', 'Poisson Grillé du Jour', 'Baklava Maison'];

function DishModal({ dish, onClose }) {
  useEffect(() => {
    if (!dish) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [dish, onClose]);

  if (!dish) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-8"
      style={{ background: 'rgba(10,7,3,0.9)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto grid md:grid-cols-2"
        style={{ background: 'var(--surface)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '2px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center text-lg"
          style={{ color: 'var(--gold)', background: 'rgba(12,9,4,0.6)', borderRadius: '50%' }}
          aria-label="Fermer"
        >
          ✕
        </button>

        <Tilt max={5} className="relative h-56 md:h-full overflow-hidden">
          <img
            src={dish.img}
            alt={dish.name}
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.75)' }}
          />
        </Tilt>

        <div className="p-8 md:p-10 flex flex-col justify-center">
          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--gold)' }}>La Rose Libanaise</p>
          <h3 className="font-display text-4xl font-light mb-3" style={{ color: 'var(--text)' }}>{dish.name}</h3>
          <p className="font-display text-3xl font-light mb-5" style={{ color: 'var(--gold)' }}>
            {dish.price}<span className="text-sm ml-0.5">€</span>
          </p>
          <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>{dish.desc}</p>

          <div className="flex flex-wrap gap-2 mb-8">
            {dish.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs tracking-wide px-3 py-1.5"
                style={{ border: '1px solid rgba(201,168,76,0.3)', color: 'var(--gold)', borderRadius: '1px' }}
              >
                {tag}
              </span>
            ))}
          </div>

          <Link
            to="/reservation"
            className="text-center py-3.5 text-xs tracking-widest uppercase font-medium transition-all duration-300 hover:opacity-85"
            style={{ background: 'var(--gold)', color: '#0c0904' }}
          >
            Réserver une table →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Menu() {
  const [active, setActive] = useState(categories[0]);
  const [selectedDish, setSelectedDish] = useState(null);
  const [search, setSearch] = useState('');
  const closeDish = useCallback(() => setSelectedDish(null), []);

  const signatureDishes = useMemo(
    () => signatureNames.map(findDish).filter(Boolean),
    []
  );

  const searching = search.trim().length > 0;
  const results = useMemo(() => {
    if (!searching) return carte[active];
    const q = search.trim().toLowerCase();
    return allDishes.filter((d) => d.name.toLowerCase().includes(q) || d.desc.toLowerCase().includes(q));
  }, [search, searching, active]);

  return (
    <div style={{ background: 'var(--dark)', minHeight: '100vh' }}>
      {/* HEADER */}
      <div
        className="relative overflow-hidden pt-32 pb-24 px-8 text-center clip-diagonal-bottom"
        style={{ background: 'var(--surface)' }}
      >
        <div
          className="absolute inset-0 font-display font-light text-center pointer-events-none select-none flex items-center justify-center"
          style={{ fontSize: 'clamp(120px, 20vw, 280px)', color: 'rgba(201,168,76,0.05)', lineHeight: 1 }}
        >
          MENU
        </div>
        <Reveal className="relative z-10">
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: 'var(--gold)' }}>
            La Rose Libanaise
          </p>
          <h1 className="font-display text-6xl md:text-7xl font-light">Notre Carte</h1>
          <p className="text-stone-500 mt-4 text-sm">Recettes authentiques · Produits frais · Fait maison</p>
          <p className="text-xs mt-3" style={{ color: 'var(--gold)', opacity: 0.7 }}>
            Cliquez sur un plat pour le découvrir en détail
          </p>
        </Reveal>
      </div>

      {/* PLATS SIGNATURE */}
      <section className="max-w-6xl mx-auto px-8 pt-20">
        <Reveal className="text-center mb-12">
          <p className="text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--gold)' }}>Nos Coups de Cœur</p>
          <h2 className="font-display text-4xl font-light">Plats Signature</h2>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {signatureDishes.map((dish, i) => (
            <Reveal key={dish.name} delay={i * 0.08}>
              <Tilt
                max={6}
                onClick={() => setSelectedDish(dish)}
                className="relative overflow-hidden cursor-pointer group"
                style={{ height: '220px', borderRadius: '2px' }}
              >
                <img
                  src={dish.img}
                  alt={dish.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ filter: 'brightness(0.5)' }}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(12,9,4,0.9) 0%, transparent 60%)' }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="font-display text-lg font-light text-white leading-tight">{dish.name}</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--gold)' }}>{dish.price}€</p>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-8 pt-24 pb-32">
        {/* RECHERCHE */}
        <div className="max-w-md mx-auto mb-10">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un plat (ex : houmous, agneau...)"
            className="input-dark"
          />
        </div>

        {/* TABS */}
        {!searching && (
          <div className="flex flex-wrap gap-2 justify-center mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className="px-5 py-2 text-xs tracking-widest uppercase transition-all duration-200"
                style={{
                  background: active === cat ? 'var(--gold)' : 'transparent',
                  color: active === cat ? '#0c0904' : 'var(--muted)',
                  border: `1px solid ${active === cat ? 'var(--gold)' : 'rgba(201,168,76,0.2)'}`,
                  borderRadius: '1px',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {searching && (
          <p className="text-center text-xs mb-10" style={{ color: 'var(--muted)' }}>
            {results.length > 0
              ? `${results.length} résultat${results.length > 1 ? 's' : ''} pour « ${search} »`
              : `Aucun plat ne correspond à « ${search} »`}
          </p>
        )}

        {/* PLATS */}
        <div className="space-y-0">
          {results.map((item, i) => (
            <Reveal key={`${item.cat || active}-${item.name}`} delay={Math.min(i * 0.04, 0.3)}>
              <button
                onClick={() => setSelectedDish(item)}
                className="group w-full flex justify-between items-start py-7 text-left transition-all duration-200 hover:pl-2"
                style={{
                  borderBottom: '1px solid rgba(201,168,76,0.08)',
                }}
              >
                <div className="flex items-start gap-6">
                  <span
                    className="font-display text-4xl font-light w-10 shrink-0 leading-none mt-1 transition-colors duration-200"
                    style={{ color: 'rgba(201,168,76,0.2)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3
                      className="dish-title font-display text-xl font-light transition-colors duration-200"
                      style={{ color: 'var(--text)' }}
                    >
                      {item.name}
                    </h3>
                    {searching && item.cat && (
                      <p className="text-xs mt-0.5" style={{ color: 'var(--gold)', opacity: 0.7 }}>{item.cat}</p>
                    )}
                    <p className="text-xs mt-1.5 leading-relaxed" style={{ color: 'var(--muted)' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
                <div className="shrink-0 ml-8 text-right flex items-center gap-3">
                  <span
                    className="font-display text-2xl font-light"
                    style={{ color: 'var(--gold)' }}
                  >
                    {item.price}<span className="text-sm ml-0.5">€</span>
                  </span>
                  <span
                    className="hidden md:inline-block text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ color: 'var(--gold)' }}
                  >
                    Voir →
                  </span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        <p className="text-center text-xs mt-12" style={{ color: 'var(--muted)' }}>
          Signalez vos allergies à notre équipe. Prix TTC, service non compris.
        </p>
      </div>

      {/* CTA FINAL */}
      <section className="relative overflow-hidden py-32 px-8 text-center">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80"
          alt="Ambiance"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.2) saturate(0.5)' }}
        />
        <div className="absolute inset-0" style={{ background: 'rgba(12,9,4,0.65)' }} />
        <Reveal className="relative z-10">
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: 'var(--gold)' }}>Envie de goûter ?</p>
          <h2 className="font-display text-5xl md:text-7xl font-light mb-10">
            Réservez<br />
            <span className="italic text-gold-gradient">Votre Table</span>
          </h2>
          <Link
            to="/reservation"
            className="inline-block px-10 py-4 text-sm tracking-widest uppercase font-medium transition-all duration-300 hover:opacity-90"
            style={{ background: 'var(--gold)', color: '#0c0904' }}
          >
            Réserver maintenant
          </Link>
        </Reveal>
      </section>

      <DishModal dish={selectedDish} onClose={closeDish} />
    </div>
  );
}
