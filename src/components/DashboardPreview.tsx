import React from 'react';

export const DashboardPreview: React.FC = () => {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6 luxe-animate-in">
              Découvrez LuxBoard en action
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto luxe-animate-up">
              Une interface intuitive et puissante, conçue pour les professionnels du luxe
            </p>
          </div>

          <div className="relative luxe-animate-in">
            {/* Mockup du dashboard */}
            <div className="luxe-card p-4 md:p-8 bg-luxboard-gris/20 backdrop-blur-sm border border-white/10 rounded-2xl">
              {/* Barre de recherche */}
              <div className="mb-8">
                <div className="flex items-center bg-white/5 rounded-lg p-4">
                  <div className="w-6 h-6 text-luxboard-or mr-3">🔍</div>
                  <div className="flex-1">
                    <div className="h-4 bg-white/10 rounded w-3/4 animate-pulse"></div>
                  </div>
                  <div className="w-8 h-8 bg-luxboard-or/20 rounded-full"></div>
                </div>
              </div>

              {/* Grille de prestataires */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="luxe-card p-6 bg-white/5 border border-white/10 rounded-xl luxe-animate-in"
                    style={{ animationDelay: `${i * 200}ms` }}>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-luxboard-or/20 rounded-full mr-4"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-white/10 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-white/10 rounded w-1/2"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-white/10 rounded w-full"></div>
                      <div className="h-3 bg-white/10 rounded w-5/6"></div>
                    </div>
                    <div className="mt-4 flex items-center">
                      <div className="flex-1">
                        <div className="h-4 bg-luxboard-or/20 rounded w-1/4"></div>
                      </div>
                      <div className="w-8 h-8 bg-luxboard-or/20 rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Timeline des événements */}
              <div className="mt-8 p-4 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-4 bg-white/10 rounded w-1/4"></div>
                  <div className="h-4 bg-luxboard-or/20 rounded w-1/6"></div>
                </div>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center">
                      <div className="w-2 h-2 bg-luxboard-or rounded-full mr-3"></div>
                      <div className="flex-1">
                        <div className="h-3 bg-white/10 rounded w-3/4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Effet de brillance */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shine"></div>
          </div>

          <div className="mt-16 text-center">
            <a
              href="#demander-invitation"
              className="luxe-button text-lg px-8 py-4 font-semibold shadow-luxe-gold bg-luxboard-or hover:bg-luxboard-or/90"
            >
              Réserver une démonstration personnalisée
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}; 