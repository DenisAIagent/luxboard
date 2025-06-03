import React, { useState } from 'react';

export const ROICalculator: React.FC = () => {
  const [values, setValues] = useState({
    searchesPerDay: 10,
    averageSearchTime: 30,
    hourlyRate: 100,
  });

  const calculateROI = () => {
    const monthlySearches = values.searchesPerDay * 22; // Jours ouvrés
    const timeSavedPerMonth = (values.averageSearchTime - 0.5) * monthlySearches; // 30 secondes avec LuxBoard
    const monthlySavings = (timeSavedPerMonth / 60) * values.hourlyRate;
    return {
      timeSaved: Math.round(timeSavedPerMonth),
      monthlySavings: Math.round(monthlySavings),
      yearlySavings: Math.round(monthlySavings * 12),
    };
  };

  const roi = calculateROI();

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6 luxe-animate-in">
              Calculez votre gain de temps
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto luxe-animate-up">
              Découvrez l'impact de LuxBoard sur votre productivité
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Formulaire */}
            <div className="luxe-card p-8 luxe-animate-in">
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-medium mb-2">
                    Nombre de recherches par jour
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={values.searchesPerDay}
                    onChange={(e) => setValues({ ...values, searchesPerDay: Number(e.target.value) })}
                    className="w-full h-2 bg-luxboard-gris rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="text-center mt-2 text-luxboard-or font-medium">
                    {values.searchesPerDay} recherches
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-medium mb-2">
                    Temps moyen de recherche (minutes)
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="60"
                    value={values.averageSearchTime}
                    onChange={(e) => setValues({ ...values, averageSearchTime: Number(e.target.value) })}
                    className="w-full h-2 bg-luxboard-gris rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="text-center mt-2 text-luxboard-or font-medium">
                    {values.averageSearchTime} minutes
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-medium mb-2">
                    Tarif horaire (€)
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="500"
                    step="10"
                    value={values.hourlyRate}
                    onChange={(e) => setValues({ ...values, hourlyRate: Number(e.target.value) })}
                    className="w-full h-2 bg-luxboard-gris rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="text-center mt-2 text-luxboard-or font-medium">
                    {values.hourlyRate}€ / heure
                  </div>
                </div>
              </div>
            </div>

            {/* Résultats */}
            <div className="luxe-card p-8 luxe-animate-in" style={{ animationDelay: '200ms' }}>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-playfair font-semibold mb-2">
                  Votre gain mensuel
                </h3>
                <div className="text-5xl font-bold text-luxboard-or mb-2">
                  {roi.monthlySavings}€
                </div>
                <p className="text-gray-400">
                  soit {roi.yearlySavings}€ par an
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <span className="text-gray-300">Temps économisé par mois</span>
                  <span className="text-xl font-semibold text-luxboard-or">
                    {roi.timeSaved} minutes
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <span className="text-gray-300">Gain de productivité</span>
                  <span className="text-xl font-semibold text-luxboard-or">
                    {Math.round((roi.timeSaved / (values.searchesPerDay * 22 * values.averageSearchTime)) * 100)}%
                  </span>
                </div>
              </div>

              <div className="mt-8 text-center">
                <a
                  href="#demander-invitation"
                  className="luxe-button text-lg px-8 py-4 font-semibold shadow-luxe-gold bg-luxboard-or hover:bg-luxboard-or/90"
                >
                  Réserver une démonstration
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 