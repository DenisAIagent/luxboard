import React from 'react';

const privileges = [
  {
    title: 'Tarifs Négociés',
    description: 'Accédez à des tarifs exclusifs négociés avec les meilleurs prestataires du luxe',
    icon: '💎',
    features: [
      'Réductions jusqu\'à 40% sur les services premium',
      'Tarifs fixes garantis toute l\'année',
      'Pas de frais cachés ni de commissions'
    ]
  },
  {
    title: 'Fast-Pass VIP',
    description: 'Bénéficiez d\'un accès prioritaire dans les établissements partenaires',
    icon: '🎫',
    features: [
      'Entrée prioritaire sans file d\'attente',
      'Réservations en dernière minute',
      'Accès aux espaces VIP'
    ]
  },
  {
    title: 'Invitations Privées',
    description: 'Soyez les premiers informés des événements exclusifs',
    icon: '✨',
    features: [
      'Pré-accès aux nouvelles ouvertures',
      'Invitations aux soirées privées',
      'Accès aux événements fermés au public'
    ]
  },
  {
    title: 'Service Dédié',
    description: 'Un concierge personnel pour répondre à vos demandes spécifiques',
    icon: '👑',
    features: [
      'Support 24/7 en français et anglais',
      'Gestion des demandes urgentes',
      'Accompagnement personnalisé'
    ]
  }
];

export const Privileges: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-luxboard-gris to-black relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6 luxe-animate-in">
              Privilèges Exclusifs
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto luxe-animate-up">
              Des avantages uniques réservés aux membres de la communauté LuxBoard
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {privileges.map((privilege, index) => (
              <div
                key={privilege.title}
                className="luxe-card p-8 luxe-animate-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start mb-6">
                  <div className="text-4xl mr-4">{privilege.icon}</div>
                  <div>
                    <h3 className="text-2xl font-playfair font-semibold mb-2">
                      {privilege.title}
                    </h3>
                    <p className="text-gray-300">
                      {privilege.description}
                    </p>
                  </div>
                </div>

                <ul className="space-y-3">
                  {privilege.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <span className="text-luxboard-or mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <a
              href="#demander-invitation"
              className="luxe-button text-lg px-8 py-4 font-semibold shadow-luxe-gold bg-luxboard-or hover:bg-luxboard-or/90"
            >
              Rejoindre la communauté
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}; 