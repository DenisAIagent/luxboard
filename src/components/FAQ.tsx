import React, { useState } from 'react';

const faqs = [
  {
    question: 'Comment garantissez-vous la qualité des prestataires ?',
    answer: 'Notre processus de validation est inspiré du Guide Michelin : enquêtes mystère, vérification terrain, et validation par un comité d\'experts. Chaque prestataire est minutieusement évalué sur plus de 50 critères d\'excellence.',
    icon: '⭐'
  },
  {
    question: 'Mes informations client restent-elles confidentielles ?',
    answer: 'Absolument. Nous utilisons un chiffrement de niveau bancaire, une certification ISO 27001, et nous ne revendons jamais vos données. La confidentialité est au cœur de notre ADN.',
    icon: '🔒'
  },
  {
    question: 'Quelle différence avec un carnet d\'adresses classique ?',
    answer: 'LuxBoard va bien au-delà d\'un simple carnet d\'adresses. Notre plateforme offre une mise à jour en temps réel, des privilèges négociés exclusivement pour nos membres, une IA qui anticipe vos besoins, et une interface collaborative.',
    icon: '💎'
  },
  {
    question: 'Est-ce adapté à ma clientèle internationale ?',
    answer: 'Oui, nous couvrons progressivement le monde entier, en commençant par Paris, Londres et New York. Chaque ville est validée par des partenaires locaux de confiance.',
    icon: '🌍'
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-gradient-to-b from-black to-luxboard-gris relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6 luxe-animate-in">
              Questions Fréquentes
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto luxe-animate-up">
              Tout ce que vous devez savoir sur LuxBoard
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="luxe-card overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full p-6 flex items-center justify-between text-left luxe-animate-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-4">{faq.icon}</span>
                    <h3 className="text-xl font-playfair font-semibold">
                      {faq.question}
                    </h3>
                  </div>
                  <span className="text-luxboard-or text-2xl transform transition-transform duration-300">
                    {openIndex === index ? '−' : '+'}
                  </span>
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="p-6 pt-0 text-gray-300 border-t border-white/10">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-400 mb-4">
              Vous avez d'autres questions ?
            </p>
            <a
              href="#contact"
              className="luxe-button text-lg px-8 py-4 font-semibold border-2 border-luxboard-or text-luxboard-or hover:bg-luxboard-or/10"
            >
              Contactez notre équipe
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}; 