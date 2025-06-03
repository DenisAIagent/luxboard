import React from 'react';

const valueProps = [
  {
    icon: '🏆',
    title: 'Excellence validée',
    description: 'Prestataires sélectionnés avec l\'exigence du Guide Michelin'
  },
  {
    icon: '⚡',
    title: 'Efficacité premium',
    description: 'Trouvez le meilleur prestataire en 30 secondes au lieu de 30 minutes'
  },
  {
    icon: '🔐',
    title: 'Accès exclusif',
    description: 'Privilèges confidentiels : tarifs négociés, fast-pass, invitations privées'
  },
  {
    icon: '🤖',
    title: 'Intelligence augmentée',
    description: 'IA connectée qui vous suggère les contacts pertinents en temps réel'
  }
];

export const ValueProps: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-black to-luxboard-gris">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueProps.map((prop, index) => (
              <div
                key={prop.title}
                className="luxe-card p-8 text-center luxe-animate-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl mb-4">{prop.icon}</div>
                <h3 className="text-xl font-playfair font-semibold mb-3 text-white">
                  {prop.title}
                </h3>
                <p className="text-gray-300">
                  {prop.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}; 