import React from 'react';

const FinalCTA = () => {
  return (
    <section className="final-cta">
      <div className="container">
        <div className="cta-content">
          <h2>Rejoignez l'Elite de la Conciergerie</h2>
          <p>
            Accédez dès maintenant à la plateforme qui révolutionne le service de luxe. 
            Réservé aux professionnels exigeants.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#demo" className="btn-primary">Demander l'Accès Premium</a>
            <a href="#contact" className="btn-secondary">Planifier une Démo</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA; 