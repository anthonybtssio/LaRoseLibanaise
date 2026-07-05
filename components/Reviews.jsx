import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import StarRating from './StarRating';
import Tilt from './Tilt';
import Reveal from './Reveal';

const timeAgo = (dateStr) => {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days <= 0) return "Aujourd'hui";
  if (days === 1) return 'Hier';
  if (days < 30) return `Il y a ${days} jours`;
  const months = Math.floor(days / 30);
  if (months < 12) return `Il y a ${months} mois`;
  return `Il y a ${Math.floor(months / 12)} an(s)`;
};

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ nom: '', note: 5, commentaire: '' });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .order('created_at', { ascending: false });
        if (cancelled) return;
        if (error) {
          console.error('Supabase reviews fetch error:', error);
          setLoadError(true);
        } else {
          setReviews(data);
        }
      } catch (err) {
        if (cancelled) return;
        console.error('Supabase reviews fetch exception:', err);
        setLoadError(true);
      }
      if (cancelled) return;
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, []);

  const average = reviews.length
    ? reviews.reduce((sum, r) => sum + r.note, 0) / reviews.length
    : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.nom.trim()) errs.nom = 'Requis';
    if (!form.commentaire.trim()) errs.commentaire = 'Requis';
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setSendError('');
    setSending(true);

    const { data, error } = await supabase
      .from('reviews')
      .insert({ nom: form.nom.trim(), note: form.note, commentaire: form.commentaire.trim() })
      .select()
      .single();

    setSending(false);

    if (error) {
      setSendError("Une erreur est survenue lors de l'envoi de votre avis. Merci de réessayer.");
      return;
    }

    setReviews((prev) => [data, ...prev]);
    setForm({ nom: '', note: 5, commentaire: '' });
    setShowForm(false);
  };

  return (
    <section className="py-32 px-8 max-w-7xl mx-auto">
      <Reveal className="text-center mb-16">
        <p className="text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--gold)' }}>Ce qu'ils disent</p>
        <h2 className="font-display text-5xl font-light mb-6">Nos Clients</h2>

        {!loading && !loadError && reviews.length > 0 && (
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-3">
              <span className="font-display text-5xl font-light" style={{ color: 'var(--gold)' }}>
                {average.toFixed(1)}
              </span>
              <StarRating value={average} size={22} />
            </div>
            <p className="text-xs" style={{ color: 'var(--muted)' }}>
              Basé sur {reviews.length} avis{reviews.length > 1 ? '' : ''}
            </p>
          </div>
        )}

        <div className="gold-line mt-6" />

        <button
          onClick={() => setShowForm((s) => !s)}
          className="btn-corners mt-8 text-xs tracking-widest uppercase transition-colors duration-300 hover:text-gold"
          style={{ color: 'var(--gold)' }}
        >
          {showForm ? 'Annuler' : 'Laisser un avis'}
        </button>
      </Reveal>

      {showForm && (
        <Reveal className="max-w-lg mx-auto mb-16">
          <form onSubmit={handleSubmit} className="glass p-8 space-y-5" style={{ borderRadius: '2px' }}>
            <div>
              <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--gold)' }}>
                Votre note
              </label>
              <StarRating value={form.note} size={28} interactive onChange={(n) => setForm((p) => ({ ...p, note: n }))} />
            </div>

            <div>
              <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--gold)' }}>
                Votre nom
              </label>
              <input
                type="text"
                value={form.nom}
                onChange={(e) => setForm((p) => ({ ...p, nom: e.target.value }))}
                placeholder="Yasmine K."
                className="input-dark"
              />
              {errors.nom && <p className="text-xs mt-1" style={{ color: '#e05c5c' }}>{errors.nom}</p>}
            </div>

            <div>
              <label className="text-xs tracking-widest uppercase block mb-2" style={{ color: 'var(--gold)' }}>
                Votre commentaire
              </label>
              <textarea
                value={form.commentaire}
                onChange={(e) => setForm((p) => ({ ...p, commentaire: e.target.value }))}
                rows={4}
                placeholder="Partagez votre expérience..."
                className="input-dark resize-none"
              />
              {errors.commentaire && <p className="text-xs mt-1" style={{ color: '#e05c5c' }}>{errors.commentaire}</p>}
            </div>

            {sendError && <p className="text-xs" style={{ color: '#e05c5c' }}>{sendError}</p>}

            <button
              type="submit"
              disabled={sending}
              className="w-full py-3.5 text-xs tracking-widest uppercase font-medium transition-all duration-300 hover:opacity-85 disabled:opacity-50"
              style={{ background: 'var(--gold)', color: '#0c0904' }}
            >
              {sending ? 'Envoi en cours...' : 'Publier mon avis'}
            </button>
          </form>
        </Reveal>
      )}

      {loading && (
        <p className="text-center text-sm" style={{ color: 'var(--muted)' }}>Chargement des avis...</p>
      )}

      {!loading && loadError && (
        <p className="text-center text-sm" style={{ color: 'var(--muted)' }}>
          Les avis ne sont pas disponibles pour le moment.
        </p>
      )}

      {!loading && !loadError && reviews.length === 0 && (
        <p className="text-center text-sm" style={{ color: 'var(--muted)' }}>
          Soyez le premier à partager votre expérience !
        </p>
      )}

      {!loading && !loadError && reviews.length > 0 && (
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.slice(0, 6).map((r, i) => (
            <Reveal key={r.id} delay={Math.min(i * 0.08, 0.3)}>
              <Tilt max={5} className="glass p-8 relative overflow-hidden" style={{ borderRadius: '2px' }}>
                <div
                  className="font-display text-8xl font-light absolute top-2 left-5 leading-none pointer-events-none select-none"
                  style={{ color: 'rgba(201,168,76,0.1)' }}
                >
                  "
                </div>
                <div className="relative z-10 mt-6">
                  <StarRating value={r.note} size={16} />
                  <p className="text-stone-300 text-sm leading-relaxed mb-6 mt-4">
                    {r.commentaire}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm" style={{ color: 'var(--gold)' }}>{r.nom}</span>
                  <span className="text-xs text-stone-600 tracking-widest">{timeAgo(r.created_at)}</span>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
