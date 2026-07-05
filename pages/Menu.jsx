import { useState } from 'react';

const carte = {
  'Mezzés Froids': [
    { name: 'Houmous Maison', price: '8', desc: 'Crème de pois chiches, tahini, citron, huile d\'olive extra vierge.' },
    { name: 'Moutabal', price: '8', desc: 'Purée d\'aubergine grillée, tahini, grenade et coriandre.' },
    { name: 'Tabboulé', price: '9', desc: 'Persil, tomates, boulgour fin, menthe fraîche et citron.' },
    { name: 'Fattoush', price: '9', desc: 'Salade croquante, pain pita grillé, sumac et grenade.' },
    { name: 'Labneh aux herbes', price: '7', desc: 'Fromage blanc égoutté, herbes du Liban, huile d\'olive.' },
    { name: 'Feuilles de vigne farcies', price: '10', desc: 'Farcies au riz, tomates et épices, servies froides.' },
  ],
  'Mezzés Chauds': [
    { name: 'Falafel Maison', price: '10', desc: 'Croquettes de pois chiches et fèves, herbes fraîches, sauce tahini.' },
    { name: 'Sambousek Fromage', price: '9', desc: 'Chaussons feuilletés au fromage blanc et menthe.' },
    { name: 'Kebbé Frite', price: '11', desc: 'Boulettes d\'agneau et boulgour, pignons de pin.' },
    { name: 'Fatayer Épinards', price: '9', desc: 'Petits chaussons aux épinards, oignons et sumac.' },
    { name: 'Soujouk Grillé', price: '12', desc: 'Saucisses libanaises épicées, poivrons grillés.' },
  ],
  'Plats Principaux': [
    { name: 'Chawarma Poulet', price: '16', desc: 'Poulet mariné aux épices, sauce à l\'ail, légumes grillés.' },
    { name: 'Chawarma Viande', price: '17', desc: 'Agneau et bœuf marinés, tomates, oignons, sauce tahini.' },
    { name: 'Kafta Grillée', price: '17', desc: 'Brochettes d\'agneau haché aux herbes, grillées au charbon.' },
    { name: 'Maqluba', price: '18', desc: 'Riz retourné aux légumes et poulet, sauce yaourt.' },
    { name: 'Grillades Mixtes (2 pers.)', price: '36', desc: 'Assortiment de kafta, chawarma, côtelettes d\'agneau.' },
    { name: 'Poisson Grillé du Jour', price: '22', desc: 'Poisson frais, chermoula libanaise, légumes de saison.' },
  ],
  'Desserts': [
    { name: 'Baklava Maison', price: '6', desc: 'Feuilleté aux pistaches et noix, sirop à la fleur d\'oranger.' },
    { name: 'Maamoul', price: '5', desc: 'Gâteaux sablés fourrés aux dattes ou pistaches.' },
    { name: 'Mouhalabieh', price: '6', desc: 'Crème de lait à la fleur d\'oranger, pistaches, cannelle.' },
    { name: 'Knafeh', price: '8', desc: 'Pâte de semoule, fromage fondu, sirop de rose, pistaches.' },
  ],
  'Boissons': [
    { name: 'Ayran', price: '3', desc: 'Yaourt salé battu, menthe fraîche.' },
    { name: 'Jus de Grenade', price: '4', desc: 'Pressé à la commande, naturellement sucré.' },
    { name: 'Thé à la Menthe', price: '3', desc: 'Thé vert, menthe fraîche, sucre.' },
    { name: 'Café Arabe', price: '3', desc: 'Café à la cardamome, servi avec dattes.' },
    { name: 'Limonade Libanaise', price: '4', desc: 'Citron, fleur d\'oranger, menthe, eau gazeuse.' },
  ],
};

const categories = Object.keys(carte);

export default function Menu() {
  const [active, setActive] = useState(categories[0]);

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
        <p className="text-xs tracking-widest uppercase mb-4 relative z-10" style={{ color: 'var(--gold)' }}>
          La Rose Libanaise
        </p>
        <h1 className="font-display text-6xl md:text-7xl font-light relative z-10">Notre Carte</h1>
        <p className="text-stone-500 mt-4 text-sm relative z-10">Recettes authentiques · Produits frais · Fait maison</p>
      </div>

      <div className="max-w-5xl mx-auto px-8 pt-20 pb-32">
        {/* TABS */}
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

        {/* PLATS */}
        <div className="space-y-0">
          {carte[active].map((item, i) => (
            <div
              key={i}
              className="group flex justify-between items-start py-7 transition-all duration-200"
              style={{
                borderBottom: '1px solid rgba(201,168,76,0.08)',
                cursor: 'default',
              }}
            >
              <div className="flex items-start gap-6">
                <span
                  className="font-display text-4xl font-light w-10 shrink-0 leading-none mt-1"
                  style={{ color: 'rgba(201,168,76,0.2)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3
                    className="font-display text-xl font-light transition-colors duration-200"
                    style={{ color: 'var(--text)' }}
                  >
                    {item.name}
                  </h3>
                  <p className="text-xs mt-1.5 leading-relaxed" style={{ color: 'var(--muted)' }}>
                    {item.desc}
                  </p>
                </div>
              </div>
              <div className="shrink-0 ml-8 text-right">
                <span
                  className="font-display text-2xl font-light"
                  style={{ color: 'var(--gold)' }}
                >
                  {item.price}<span className="text-sm ml-0.5">€</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs mt-12" style={{ color: 'var(--muted)' }}>
          Signalez vos allergies à notre équipe. Prix TTC, service non compris.
        </p>
      </div>
    </div>
  );
}
