import React from 'react';

const features = [
  {
    icon: "🔍",
    title: "Recherche Instantanée",
    description: "Trouvez les meilleurs prestataires triés sur le volet en quelques secondes. Hôtels, restaurants, artisans d'exception - tout est centralisé."
  },
  {
    icon: "🎫",
    title: "Privilèges Exclusifs",
    description: "Accédez à des tarifs négociés, fast-pass et invitations privées réservés uniquement aux membres LuxBoard."
  },
  {
    icon: "🎭",
    title: "Événements VIP",
    description: "Découvrez les galas, dîners privés, vernissages et soirées partenaires dans un dashboard élégant mis à jour en temps réel."
  },
  {
    icon: "🤖",
    title: "IA Intégrée",
    description: "Notre intelligence artificielle connectée à Perplexity suggère automatiquement des contacts pertinents pour enrichir votre réseau."
  },
  {
    icon: "👥",
    title: "Validation Éditoriale",
    description: "Chaque prestataire est validé par notre équipe d'experts, garantissant un niveau d'excellence constant."
  },
  {
    icon: "📱",
    title: "Interface Premium",
    description: "Design épuré et responsive inspiré de Notion, Airbnb et du Guide Michelin pour une expérience utilisateur exceptionnelle."
  }
];

const Features = () => {
  return (
    <section id="features" className="features">
      <div className="container">
        <div className="section-title">
          <h2>L'Excellence à Portée de Clic</h2>
          <p className="section-subtitle">
            Découvrez comment LuxBoard révolutionne la conciergerie de luxe avec une technologie d'avant-garde
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 