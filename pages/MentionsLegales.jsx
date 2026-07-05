import { LegalLayout, LegalSection, Placeholder } from '../components/LegalLayout';

export default function MentionsLegales() {
  return (
    <LegalLayout title="Mentions Légales" subtitle="Dernière mise à jour : à compléter lors de la mise en ligne">
      <LegalSection title="1. Éditeur du site">
        <p>Le présent site est édité par :</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Raison sociale : <Placeholder>Nom de l'entreprise à compléter</Placeholder></li>
          <li>Forme juridique : <Placeholder>EI, SASU, SARL... à compléter</Placeholder></li>
          <li>Capital social (le cas échéant) : <Placeholder>à compléter</Placeholder></li>
          <li>Siège social : <Placeholder>Adresse complète à compléter</Placeholder></li>
          <li>SIRET / RCS : <Placeholder>Numéro SIRET à compléter</Placeholder></li>
          <li>N° de TVA intracommunautaire (le cas échéant) : <Placeholder>à compléter</Placeholder></li>
          <li>Directeur de la publication : <Placeholder>Nom du responsable à compléter</Placeholder></li>
          <li>Téléphone : 01 23 45 67 89</li>
          <li>Email : contact@laroselibanaise.fr</li>
        </ul>
        <p className="text-xs mt-2" style={{ color: '#e0a95c' }}>
          Les coordonnées ci-dessus (téléphone, email, adresse) sont des exemples utilisés sur l'ensemble du site de démonstration ; elles doivent être remplacées par les vraies coordonnées de l'établissement avant mise en ligne.
        </p>
      </LegalSection>

      <LegalSection title="2. Hébergement">
        <p>Le site est hébergé par :</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Nom de l'hébergeur : <Placeholder>ex. OVHcloud SAS</Placeholder></li>
          <li>Adresse : <Placeholder>Adresse de l'hébergeur à compléter</Placeholder></li>
          <li>Téléphone / contact : <Placeholder>à compléter</Placeholder></li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Propriété intellectuelle">
        <p>
          L'ensemble des éléments de ce site (textes, logos, mise en page, structure) est protégé par le droit d'auteur
          et reste la propriété exclusive de l'éditeur, sauf mentions contraires. Toute reproduction, représentation,
          modification ou diffusion, totale ou partielle, sans autorisation préalable est interdite et pourrait
          constituer une contrefaçon.
        </p>
      </LegalSection>

      <LegalSection title="4. Crédits photographiques">
        <p>
          Les photographies présentées sur ce site proviennent de la plateforme Unsplash et sont utilisées
          conformément à la licence Unsplash, qui autorise leur usage y compris commercial sans attribution
          obligatoire.
        </p>
      </LegalSection>

      <LegalSection title="5. Liens hypertextes">
        <p>
          Ce site peut contenir des liens vers des sites tiers. L'éditeur n'exerce aucun contrôle sur ces sites et
          décline toute responsabilité quant à leur contenu.
        </p>
      </LegalSection>

      <LegalSection title="6. Droit applicable">
        <p>
          Les présentes mentions légales sont soumises au droit français. En cas de litige, et à défaut de résolution
          amiable, les tribunaux français seront seuls compétents.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
