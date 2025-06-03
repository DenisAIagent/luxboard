import React from 'react';

const Hero = () => {
  return (
    <section className="hero gradient-bg">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text fade-in-up">
            <div className="luxury-badge">
              ⭐ Inspiré du Guide Michelin
            </div>
            <h1>Conciergerie Augmentée</h1>
            <p className="hero-subtitle">
              La première plateforme qui centralise l'excellence du luxe. 
              Prestataires premium, privilèges exclusifs, événements VIP.
            </p>
            
            <div className="stats">
              <div className="stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Prestataires Premium</span>
              </div>
              <div className="stat">
                <span className="stat-number">95%</span>
                <span className="stat-label">Satisfaction Client</span>
              </div>
              <div className="stat">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Accès Privilèges</span>
              </div>
            </div>

            <div className="hero-cta">
              <a href="#demo" className="btn-primary">Accéder à LuxBoard</a>
              <a href="#features" className="btn-secondary">Découvrir</a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="platform-preview floating">
              <div className="preview-header">
                <div className="preview-dot"></div>
                <div className="preview-dot"></div>
                <div className="preview-dot"></div>
              </div>
              <div className="preview-content">
                <div style={{ padding: '20px', color: 'var(--primary-gold)' }}>
                  <h3>🏨 Hôtels 5 Étoiles</h3>
                  <div style={{ margin: '15px 0', padding: '10px', background: 'rgba(212,175,55,0.1)', borderRadius: '8px' }}>
                    <strong>Le Bristol Paris</strong> - Suite Présidentielle<br />
                    <span style={{ color: '#888' }}>Privilège: -30% + Surclassement</span>
                  </div>
                  <div style={{ margin: '15px 0', padding: '10px', background: 'rgba(212,175,55,0.1)', borderRadius: '8px' }}>
                    <strong>The Ritz London</strong> - Royal Suite<br />
                    <span style={{ color: '#888' }}>Privilège: Petit-déjeuner offert</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 