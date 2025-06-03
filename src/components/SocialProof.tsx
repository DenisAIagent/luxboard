import React from 'react';

const partners = [
  "Concierge Royal",
  "VIP Services",
  "Luxury Care",
  "Elite Assistance",
  "Premium Partners",
  "Exclusive Access"
];

const SocialProof = () => {
  return (
    <section className="social-proof">
      <div className="container">
        <div className="section-title">
          <h2>Ils Nous Font Confiance</h2>
          <p className="section-subtitle">
            Les plus prestigieuses conciergeries et agences haut de gamme utilisent déjà LuxBoard
          </p>
        </div>
        
        <div className="logos-grid">
          {partners.map((partner, index) => (
            <div key={index} className="logo-item">
              {partner}
            </div>
          ))}
        </div>

        <div className="testimonials">
          <div className="section-title">
            <h2>Ce Qu'en Disent Nos Utilisateurs</h2>
          </div>
          
          <div className="testimonial-card">
            <p className="testimonial-text">
              "LuxBoard a transformé notre service de conciergerie. Nous accédons instantanément 
              aux meilleurs prestataires avec des privilèges que nous n'aurions jamais pu négocier seuls. 
              Nos clients VIP sont ravis de la qualité exceptionnelle."
            </p>
            <div className="testimonial-author">
              <div className="author-avatar"></div>
              <div className="author-info">
                <h4>Marie-Claire Dubois</h4>
                <p>Directrice, Conciergerie Prestige Paris</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof; 