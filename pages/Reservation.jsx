import { useState } from 'react';
import emailjs from '@emailjs/browser';
import Reveal from '../components/Reveal';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const creneaux = ['12:00', '12:30', '13:00', '13:30', '19:00', '19:30', '20:00', '20:30', '21:00'];
const today = new Date().toISOString().split('T')[0];

// Hash déterministe : même date + créneau donnent toujours le même statut (simulation stable, pas de vrai stock).
const seededRatio = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return (Math.abs(hash) % 100) / 100;
};

const isSlotBusy = (date, heure) => seededRatio(`${date}-${heure}`) < 0.38;

const Field = ({ label, error, children }) => (
  <div>
    <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--gold)' }}>
      {label}
    </label>
    {children}
    {error && <p className="text-xs mt-1" style={{ color: '#e05c5c' }}>{error}</p>}
  </div>
);

const AvailabilityGrid = ({ date, heure, onSelect }) => {
  if (!date) {
    return (
      <p className="text-xs" style={{ color: 'var(--muted)' }}>
        Choisissez une date pour voir les disponibilités en direct.
      </p>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        {creneaux.map((h) => {
          const busy = isSlotBusy(date, h);
          const selected = heure === h;
          return (
            <button
              type="button"
              key={h}
              disabled={busy}
              onClick={() => onSelect(h)}
              className="relative py-2.5 text-xs tracking-wide transition-all duration-200"
              style={{
                borderRadius: '1px',
                border: `1px solid ${selected ? 'var(--gold)' : busy ? 'rgba(201,168,76,0.08)' : 'rgba(201,168,76,0.3)'}`,
                background: selected ? 'var(--gold)' : 'transparent',
                color: selected ? '#0c0904' : busy ? 'var(--muted)' : 'var(--text)',
                opacity: busy ? 0.45 : 1,
                cursor: busy ? 'not-allowed' : 'pointer',
                textDecoration: busy ? 'line-through' : 'none',
              }}
            >
              {h}
            </button>
          );
        })}
      </div>
      <div className="flex items-center gap-5 mt-4 text-xs" style={{ color: 'var(--muted)' }}>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ background: 'var(--gold)' }} /> Disponible
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ background: 'var(--muted)' }} /> Complet
        </span>
      </div>
    </div>
  );
};

export default function Reservation() {
  const [type, setType] = useState('restaurant');
  const [form, setForm] = useState({
    nom: '', prenom: '', tel: '', email: '',
    date: '', heure: '', personnes: '2',
    eventType: 'Mariage / Réception', message: '',
  });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');

  const set = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }));
  const setDate = (e) => setForm((p) => ({ ...p, date: e.target.value, heure: '' }));

  const validate = () => {
    const e = {};
    if (!form.nom) e.nom = 'Requis';
    if (!form.tel && !form.email) e.contact = 'Téléphone ou email requis';
    if (!form.date) e.date = 'Requis';
    if (type === 'restaurant' && !form.heure) e.heure = 'Requis';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setSendError('');
    setSending(true);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          type: type === 'restaurant' ? 'Table Restaurant' : 'Événement Traiteur',
          nom: form.nom,
          prenom: form.prenom,
          tel: form.tel,
          email: form.email,
          date: form.date,
          heure: form.heure || '—',
          personnes: form.personnes,
          eventType: type === 'traiteur' ? form.eventType : '—',
          message: form.message,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setSent(true);
    } catch (err) {
      setSendError("Une erreur est survenue lors de l'envoi. Merci de réessayer ou de nous appeler directement.");
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-8" style={{ background: 'var(--dark)' }}>
        <div className="text-center max-w-md">
          <div
            className="font-display text-8xl font-light mb-2 text-gold-gradient animate-shimmer"
            style={{ lineHeight: 1 }}
          >
            ✦
          </div>
          <h2 className="font-display text-5xl font-light mb-6" style={{ color: 'var(--text)' }}>
            Demande<br /><span className="italic text-gold-gradient">Envoyée</span>
          </h2>
          <div className="gold-line mb-6" />
          <p className="text-sm leading-relaxed mb-8" style={{ color: 'var(--muted)' }}>
            Merci <strong style={{ color: 'var(--text)' }}>{form.prenom} {form.nom}</strong>.
            Votre demande pour le{' '}
            <strong style={{ color: 'var(--text)' }}>{form.date}</strong>
            {form.heure ? ` à ${form.heure}` : ''} a bien été reçue.
            <br /><br />
            Nous vous confirmons par téléphone ou email dans les 24h.
          </p>
          <button
            onClick={() => { setSent(false); setForm({ nom:'',prenom:'',tel:'',email:'',date:'',heure:'',personnes:'2',eventType:'Mariage / Réception',message:'' }); }}
            className="text-xs tracking-widest uppercase px-8 py-3 transition-all duration-200 hover:opacity-80"
            style={{ border: '1px solid var(--gold)', color: 'var(--gold)' }}
          >
            Nouvelle Réservation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--dark)', minHeight: '100vh' }}>
      {/* HEADER SPLIT */}
      <div
        className="relative overflow-hidden pt-32 pb-24 px-8 clip-diagonal-bottom"
        style={{ background: 'var(--surface)' }}
      >
        <div
          className="absolute right-0 top-0 bottom-0 font-display font-light pointer-events-none select-none flex items-center"
          style={{ fontSize: 'clamp(80px, 14vw, 200px)', color: 'rgba(201,168,76,0.05)', lineHeight: 1, paddingRight: '1rem' }}
        >
          RÉSERVER
        </div>
        <Reveal className="max-w-3xl relative z-10">
          <p className="text-xs tracking-widest uppercase mb-4" style={{ color: 'var(--gold)' }}>Réservation</p>
          <h1 className="font-display text-6xl md:text-7xl font-light leading-none mb-6">
            Une Table,<br />
            <span className="italic text-gold-gradient">Un Moment</span>
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
            Réservez votre table au restaurant ou planifiez votre événement traiteur. Confirmation sous 24h.
          </p>
        </Reveal>
      </div>

      <div className="max-w-2xl mx-auto px-8 pt-20 pb-32">
        {/* TYPE SWITCH */}
        <div
          className="grid grid-cols-2 mb-12"
          style={{ border: '1px solid rgba(201,168,76,0.2)' }}
        >
          {[
            { val: 'restaurant', label: 'Table Restaurant' },
            { val: 'traiteur', label: 'Événement Traiteur' },
          ].map(({ val, label }) => (
            <button
              key={val}
              onClick={() => setType(val)}
              className="py-4 text-xs tracking-widest uppercase transition-all duration-200"
              style={{
                background: type === val ? 'var(--gold)' : 'transparent',
                color: type === val ? '#0c0904' : 'var(--muted)',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-7">
          {/* NOM / PRÉNOM */}
          <div className="grid grid-cols-2 gap-5">
            <Field label="Prénom">
              <input type="text" value={form.prenom} onChange={set('prenom')} placeholder="Yasmine" className="input-dark" />
            </Field>
            <Field label="Nom *" error={errors.nom}>
              <input type="text" value={form.nom} onChange={set('nom')} placeholder="Khalil" className="input-dark" />
            </Field>
          </div>

          {/* CONTACT */}
          <div className="grid grid-cols-2 gap-5">
            <Field label="Téléphone">
              <input type="tel" value={form.tel} onChange={set('tel')} placeholder="06 12 34 56 78" className="input-dark" />
            </Field>
            <Field label="Email">
              <input type="email" value={form.email} onChange={set('email')} placeholder="email@exemple.fr" className="input-dark" />
            </Field>
          </div>
          {errors.contact && <p className="text-xs -mt-5" style={{ color: '#e05c5c' }}>{errors.contact}</p>}

          {/* DATE / HEURE OU EVENT */}
          <div className="grid grid-cols-2 gap-5">
            <Field label="Date souhaitée *" error={errors.date}>
              <input type="date" value={form.date} min={today} onChange={setDate} className="input-dark" />
            </Field>
            {type === 'restaurant' ? (
              <Field label="Créneau choisi *" error={errors.heure}>
                <div className="input-dark flex items-center" style={{ color: form.heure ? 'var(--gold)' : 'var(--muted)' }}>
                  {form.heure || 'À sélectionner ci-dessous'}
                </div>
              </Field>
            ) : (
              <Field label="Type d'événement">
                <select value={form.eventType} onChange={set('eventType')} className="input-dark">
                  {['Mariage / Réception','Fiançailles','Anniversaire','Événement d\'entreprise','Autre'].map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </Field>
            )}
          </div>

          {type === 'restaurant' && (
            <div>
              <label className="text-xs tracking-widest uppercase block mb-3" style={{ color: 'var(--gold)' }}>
                Disponibilité en direct
              </label>
              <AvailabilityGrid
                date={form.date}
                heure={form.heure}
                onSelect={(h) => setForm((p) => ({ ...p, heure: h }))}
              />
            </div>
          )}

          {/* CONVIVES */}
          <Field label="Nombre de personnes">
            <select value={form.personnes} onChange={set('personnes')} className="input-dark">
              {type === 'restaurant'
                ? ['1','2','3','4','5','6','7','8','9','10+'].map((n) => (
                    <option key={n} value={n}>{n} {n === '1' ? 'personne' : 'personnes'}</option>
                  ))
                : ['20–30','30–50','50–100','100–150','150–200','200+'].map((n) => (
                    <option key={n} value={n}>{n} personnes</option>
                  ))
              }
            </select>
          </Field>

          {/* MESSAGE */}
          <Field label="Message & demandes spéciales">
            <textarea
              value={form.message}
              onChange={set('message')}
              rows={4}
              placeholder={type === 'restaurant'
                ? 'Allergie, table en terrasse, occasion spéciale...'
                : 'Décrivez votre événement, vos préférences, le lieu...'
              }
              className="input-dark resize-none"
            />
          </Field>

          {/* SUBMIT */}
          {sendError && (
            <p className="text-xs text-center" style={{ color: '#e05c5c' }}>{sendError}</p>
          )}
          <button
            type="submit"
            disabled={sending}
            className="w-full py-4 text-sm tracking-widest uppercase font-medium transition-all duration-300 hover:opacity-85 disabled:opacity-50"
            style={{ background: 'var(--gold)', color: '#0c0904' }}
          >
            {sending ? 'Envoi en cours...' : type === 'restaurant' ? 'Confirmer ma réservation' : 'Envoyer ma demande'}
          </button>

          <p className="text-center text-xs" style={{ color: 'var(--muted)' }}>
            Confirmation par téléphone ou email sous 24h. Urgence :{' '}
            <a href="tel:0123456789" style={{ color: 'var(--gold)' }}>01 23 45 67 89</a>
          </p>
        </form>
      </div>
    </div>
  );
}
