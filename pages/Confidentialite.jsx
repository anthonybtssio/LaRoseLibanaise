import { LegalLayout, LegalSection, Placeholder } from '../components/LegalLayout';

export default function Confidentialite() {
  return (
    <LegalLayout title="Politique de Confidentialité" subtitle="Traitement des données personnelles & RGPD">
      <LegalSection title="1. Responsable du traitement">
        <p>
          Le responsable du traitement des données collectées sur ce site est <Placeholder>Nom de l'entreprise à compléter</Placeholder>,
          dont les coordonnées figurent dans les <a href="/mentions-legales" style={{ color: 'var(--gold)', textDecoration: 'underline' }}>Mentions Légales</a>.
          Pour toute question relative à vos données personnelles, vous pouvez nous contacter à l'adresse
          contact@laroselibanaise.fr.
        </p>
      </LegalSection>

      <LegalSection title="2. Données collectées et finalités">
        <p><strong style={{ color: 'var(--text)' }}>Formulaire de réservation</strong> (page Réservation) : nom, prénom, téléphone, email,
          date, heure souhaitée, nombre de personnes, type d'événement et message.</p>
        <p>
          Ces données sont transmises par email à l'équipe du restaurant via le service tiers EmailJS, afin de traiter
          votre demande de réservation ou de devis traiteur. Elles ne sont pas stockées dans une base de données par
          le site lui-même.
        </p>
        <p><strong style={{ color: 'var(--text)' }}>Avis clients</strong> (section « Nos Clients ») : nom (ou pseudonyme choisi), note sur 5,
          commentaire et date de publication.</p>
        <p>
          Ces données sont enregistrées dans une base de données (Supabase) et affichées publiquement sur le site,
          car il s'agit d'avis destinés à être partagés avec les autres visiteurs, à l'image d'un service d'avis en
          ligne classique.
        </p>
        <p><strong style={{ color: 'var(--text)' }}>Données techniques de navigation</strong> : ce site charge des polices de caractères
          depuis Google Fonts, ce qui entraîne la transmission de votre adresse IP aux serveurs de Google LLC lors du
          chargement de la page. Aucun cookie de mesure d'audience ni cookie publicitaire n'est utilisé à ce jour sur
          ce site.
        </p>
      </LegalSection>

      <LegalSection title="3. Base légale des traitements">
        <ul className="list-disc pl-5 space-y-1">
          <li>Réservations : exécution de mesures précontractuelles prises à votre demande (art. 6.1.b du RGPD).</li>
          <li>Avis clients : votre consentement, exprimé par la publication volontaire de votre avis (art. 6.1.a du RGPD).</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Destinataires des données">
        <p>
          Vos données sont destinées à l'équipe de La Rose Libanaise et sont transmises aux sous-traitants techniques
          suivants, nécessaires au fonctionnement du site :
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong style={{ color: 'var(--text)' }}>EmailJS</strong> — service d'envoi d'emails utilisé pour transmettre les demandes de
            réservation ; ce prestataire peut traiter des données en dehors de l'Union européenne, dans le cadre de
            garanties appropriées prévues par sa politique de confidentialité.
          </li>
          <li>
            <strong style={{ color: 'var(--text)' }}>Supabase</strong> — base de données utilisée pour stocker et afficher les avis clients,
            hébergée dans la région choisie lors de la configuration du projet.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Durée de conservation">
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Données de réservation : conservées <Placeholder>12 mois</Placeholder> à compter de la demande, sauf
            suppression anticipée sur demande ou obligation légale de conservation plus longue (ex. comptabilité).
          </li>
          <li>
            Avis clients : conservés tant qu'ils restent publiés sur le site, jusqu'à suppression demandée par leur
            auteur ou décision du responsable du site (ex. contenu inapproprié).
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="6. Vos droits">
        <p>Conformément au RGPD, vous disposez des droits suivants sur vos données personnelles :</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Droit d'accès, de rectification et d'effacement</li>
          <li>Droit à la limitation du traitement</li>
          <li>Droit d'opposition</li>
          <li>Droit à la portabilité de vos données</li>
        </ul>
        <p>
          Vous pouvez exercer ces droits en nous contactant à contact@laroselibanaise.fr. Une réponse vous sera
          apportée dans un délai maximum d'un mois.
        </p>
        <p>
          Vous disposez également du droit d'introduire une réclamation auprès de la Commission Nationale de
          l'Informatique et des Libertés (CNIL) — 3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07,{' '}
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold)', textDecoration: 'underline' }}>
            www.cnil.fr
          </a>.
        </p>
      </LegalSection>

      <LegalSection title="7. Sécurité">
        <p>
          Le site est servi en HTTPS et l'accès à la base de données des avis clients est protégé par des règles de
          sécurité au niveau des lignes (Row Level Security), limitant les opérations autorisées à la lecture publique
          et à l'ajout de nouveaux avis. Aucune donnée bancaire n'est collectée ou stockée par ce site.
        </p>
      </LegalSection>

      <LegalSection title="8. Cookies">
        <p>
          Ce site n'utilise pas de cookies de mesure d'audience ni de cookies publicitaires. Aucune bannière de
          consentement n'est donc requise à ce jour. Cette politique sera mise à jour si des outils de suivi ou de
          mesure d'audience venaient à être ajoutés.
        </p>
      </LegalSection>

      <LegalSection title="9. Modification de la présente politique">
        <p>
          Cette politique de confidentialité peut être mise à jour à tout moment, notamment pour se conformer à toute
          évolution réglementaire, technique ou jurisprudentielle. La version en vigueur est celle publiée sur cette
          page.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
