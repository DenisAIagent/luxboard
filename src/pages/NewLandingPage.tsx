import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Gift, Calendar, Zap, CheckCircle, Palette, Star } from 'lucide-react';

const NewLandingPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Add custom styles for the new landing page
    const style = document.createElement('style');
    style.textContent = `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      :root {
        --primary-gold: #D4AF37;
        --dark-luxury: #0A0A0A;
        --white-pearl: #FEFEFE;
        --gray-elegant: #2A2A2A;
        --accent-gold: #F4E8C1;
        --shadow-luxury: rgba(212, 175, 55, 0.3);
      }

      .new-landing-body {
        font-family: 'Inter', sans-serif;
        line-height: 1.6;
        color: var(--white-pearl);
        background: var(--dark-luxury);
        overflow-x: hidden;
      }

      .gradient-bg {
        background: linear-gradient(135deg, 
          var(--dark-luxury) 0%, 
          #1a1a1a 50%, 
          var(--dark-luxury) 100%);
        position: relative;
      }

      .gradient-bg::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(ellipse at top, 
          rgba(212, 175, 55, 0.1) 0%, 
          transparent 50%);
        pointer-events: none;
      }

      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
      }

      /* Navigation */
      .nav {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 1000;
        background: rgba(10, 10, 10, 0.95);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid rgba(212, 175, 55, 0.2);
        transition: all 0.3s ease;
      }

      .nav-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 0;
      }

      .logo {
        font-family: 'Playfair Display', serif;
        font-size: 28px;
        font-weight: 700;
        color: var(--primary-gold);
        text-decoration: none;
      }

      .nav-links {
        display: flex;
        list-style: none;
        gap: 30px;
      }

      .nav-links a {
        color: var(--white-pearl);
        text-decoration: none;
        font-weight: 500;
        transition: color 0.3s ease;
      }

      .nav-links a:hover {
        color: var(--primary-gold);
      }

      .cta-nav {
        background: linear-gradient(135deg, var(--primary-gold), #B8941F);
        padding: 12px 24px;
        border-radius: 8px;
        text-decoration: none;
        color: var(--dark-luxury);
        font-weight: 600;
        transition: all 0.3s ease;
        box-shadow: 0 4px 20px var(--shadow-luxury);
        border: none;
        cursor: pointer;
      }

      .cta-nav:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 30px var(--shadow-luxury);
      }

      /* Hero Section */
      .hero {
        min-height: 100vh;
        display: flex;
        align-items: center;
        position: relative;
        padding-top: 80px;
      }

      .hero-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 60px;
        align-items: center;
      }

      .hero-text h1 {
        font-family: 'Playfair Display', serif;
        font-size: 4.5rem;
        font-weight: 700;
        line-height: 1.1;
        margin-bottom: 20px;
        background: linear-gradient(135deg, var(--white-pearl), var(--primary-gold));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .hero-subtitle {
        font-size: 1.3rem;
        color: #B0B0B0;
        margin-bottom: 30px;
        font-weight: 300;
      }

      .luxury-badge {
        display: inline-flex;
        align-items: center;
        background: rgba(212, 175, 55, 0.1);
        border: 1px solid var(--primary-gold);
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 0.9rem;
        margin-bottom: 30px;
        color: var(--primary-gold);
      }

      .stats {
        display: flex;
        gap: 40px;
        margin: 40px 0;
      }

      .stat {
        text-align: center;
      }

      .stat-number {
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--primary-gold);
        display: block;
      }

      .stat-label {
        font-size: 0.9rem;
        color: #888;
      }

      .hero-cta {
        display: flex;
        gap: 20px;
        margin-top: 40px;
      }

      .btn-primary {
        background: linear-gradient(135deg, var(--primary-gold), #B8941F);
        color: var(--dark-luxury);
        padding: 16px 32px;
        border-radius: 12px;
        text-decoration: none;
        font-weight: 600;
        font-size: 1.1rem;
        transition: all 0.3s ease;
        box-shadow: 0 8px 30px var(--shadow-luxury);
        border: none;
        cursor: pointer;
      }

      .btn-primary:hover {
        transform: translateY(-3px);
        box-shadow: 0 15px 40px var(--shadow-luxury);
      }

      .btn-secondary {
        background: transparent;
        color: var(--white-pearl);
        padding: 16px 32px;
        border: 2px solid var(--primary-gold);
        border-radius: 12px;
        text-decoration: none;
        font-weight: 600;
        transition: all 0.3s ease;
      }

      .btn-secondary:hover {
        background: var(--primary-gold);
        color: var(--dark-luxury);
      }

      .hero-visual {
        position: relative;
      }

      .platform-preview {
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(212, 175, 55, 0.3);
        border-radius: 20px;
        padding: 30px;
        transform: perspective(1000px) rotateY(-5deg) rotateX(5deg);
        transition: transform 0.3s ease;
      }

      .platform-preview:hover {
        transform: perspective(1000px) rotateY(0deg) rotateX(0deg);
      }

      .preview-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 20px;
      }

      .preview-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: var(--primary-gold);
      }

      .preview-content {
        height: 300px;
        background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
        border-radius: 12px;
        position: relative;
        overflow: hidden;
      }

      /* Features Section */
      .features {
        padding: 100px 0;
        position: relative;
      }

      .section-title {
        text-align: center;
        margin-bottom: 80px;
      }

      .section-title h2 {
        font-family: 'Playfair Display', serif;
        font-size: 3rem;
        margin-bottom: 20px;
        color: var(--white-pearl);
      }

      .section-subtitle {
        font-size: 1.2rem;
        color: #888;
        max-width: 600px;
        margin: 0 auto;
      }

      .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 40px;
      }

      .feature-card {
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(212, 175, 55, 0.2);
        border-radius: 20px;
        padding: 40px;
        transition: all 0.3s ease;
        cursor: pointer;
      }

      .feature-card:hover {
        transform: translateY(-10px);
        border-color: var(--primary-gold);
        box-shadow: 0 20px 60px rgba(212, 175, 55, 0.2);
      }

      .feature-icon {
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, var(--primary-gold), #B8941F);
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
        font-size: 24px;
      }

      .feature-icon svg {
        color: var(--dark-luxury);
      }

      .feature-title {
        font-size: 1.4rem;
        font-weight: 600;
        margin-bottom: 15px;
        color: var(--white-pearl);
      }

      .feature-description {
        color: #B0B0B0;
        line-height: 1.6;
      }

      /* Social Proof */
      .social-proof {
        padding: 80px 0;
        background: rgba(212, 175, 55, 0.05);
      }
<h1>LUXBOARD TEST DÉPLOIEMENT - RAILWAY DEBUG</h1>
      .logos-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 40px;
        margin-top: 50px;
        opacity: 0.7;
      }

      .logo-item {
        height: 60px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--primary-gold);
        font-weight: 600;
      }

      /* Testimonials */
      .testimonials {
        padding: 100px 0;
      }

      .testimonial-card {
        background: rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(212, 175, 55, 0.2);
        border-radius: 20px;
        padding: 40px;
        text-align: center;
        max-width: 800px;
        margin: 0 auto;
      }

      .testimonial-text {
        font-size: 1.3rem;
        font-style: italic;
        margin-bottom: 30px;
        color: var(--white-pearl);
      }

      .testimonial-author {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 15px;
      }

      .author-avatar {
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--primary-gold), #B8941F);
        border-radius: 50%;
      }

      .author-info h4 {
        color: var(--white-pearl);
        margin-bottom: 5px;
      }

      .author-info p {
        color: #888;
        font-size: 0.9rem;
      }

      /* Final CTA */
      .final-cta {
        padding: 100px 0;
        text-align: center;
        background: linear-gradient(135deg, 
          rgba(212, 175, 55, 0.1) 0%, 
          transparent 50%);
      }

      .cta-content h2 {
        font-family: 'Playfair Display', serif;
        font-size: 3rem;
        margin-bottom: 20px;
        color: var(--white-pearl);
      }

      .cta-content p {
        font-size: 1.2rem;
        color: #B0B0B0;
        margin-bottom: 40px;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
      }

      /* Footer */
      .footer {
        padding: 60px 0 30px;
        border-top: 1px solid rgba(212, 175, 55, 0.2);
        text-align: center;
      }

      .footer-content {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 40px;
        margin-bottom: 40px;
      }

      .footer-section h3 {
        color: var(--primary-gold);
        margin-bottom: 20px;
      }

      .footer-section p, .footer-section a {
        color: #888;
        text-decoration: none;
        transition: color 0.3s ease;
      }

      .footer-section a:hover {
        color: var(--primary-gold);
      }

      .footer-bottom {
        padding-top: 30px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        color: #666;
      }

      /* Animations */
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
      }

      .floating {
        animation: float 6s ease-in-out infinite;
      }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(50px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .fade-in-up {
        animation: fadeInUp 0.8s ease-out;
      }

      /* Responsive */
      @media (max-width: 768px) {
        .hero-content {
          grid-template-columns: 1fr;
          text-align: center;
        }

        .hero-text h1 {
          font-size: 3rem;
        }

        .nav-links {
          display: none;
        }

        .hero-cta {
          flex-direction: column;
          align-items: center;
        }

        .stats {
          justify-content: center;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleConnectClick = () => {
    navigate('/login');
  };

  return (
    <div className="new-landing-body">
      {/* Navigation */}
      <nav className="nav">
        <div className="container">
          <div className="nav-content">
            <a href="#" className="logo">LuxBoard</a>
            <ul className="nav-links">
              <li><a href="#features">Fonctionnalités</a></li>
              <li><a href="#pricing">Tarifs</a></li>
              <li><a href="#about">À propos</a></li>
            </ul>
            <button onClick={handleConnectClick} className="cta-nav">Se connecter</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero gradient-bg">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text fade-in-up">
              <div className="luxury-badge">
                <Star className="w-4 h-4 mr-2" />
                Inspiré du Guide Michelin
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
                <button onClick={handleConnectClick} className="btn-primary">Accéder à LuxBoard</button>
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
                  <div style={{padding: '20px', color: 'var(--primary-gold)'}}>
                    <h3>Hôtels 5 Étoiles</h3>
                    <div style={{margin: '15px 0', padding: '10px', background: 'rgba(212,175,55,0.1)', borderRadius: '8px'}}>
                      <strong>Le Bristol Paris</strong> - Suite Présidentielle<br />
                      <span style={{color: '#888'}}>Privilège: -30% + Surclassement</span>
                    </div>
                    <div style={{margin: '15px 0', padding: '10px', background: 'rgba(212,175,55,0.1)', borderRadius: '8px'}}>
                      <strong>The Ritz London</strong> - Royal Suite<br />
                      <span style={{color: '#888'}}>Privilège: Petit-déjeuner offert</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <div className="section-title">
            <h2>L'Excellence à Portée de Clic</h2>
            <p className="section-subtitle">
              Découvrez comment LuxBoard révolutionne la conciergerie de luxe avec une technologie d'avant-garde
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Search className="w-6 h-6 text-gray-900" />
              </div>
              <h3 className="feature-title">Recherche Instantanée</h3>
              <p className="feature-description">
                Trouvez les meilleurs prestataires triés sur le volet en quelques secondes. 
                Hôtels, restaurants, artisans d'exception - tout est centralisé.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Gift className="w-6 h-6 text-gray-900" />
              </div>
              <h3 className="feature-title">Privilèges Exclusifs</h3>
              <p className="feature-description">
                Accédez à des tarifs négociés, fast-pass et invitations privées 
                réservés uniquement aux membres LuxBoard.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Calendar className="w-6 h-6 text-gray-900" />
              </div>
              <h3 className="feature-title">Événements VIP</h3>
              <p className="feature-description">
                Découvrez les galas, dîners privés, vernissages et soirées partenaires 
                dans un dashboard élégant mis à jour en temps réel.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Zap className="w-6 h-6 text-gray-900" />
              </div>
              <h3 className="feature-title">IA Intégrée</h3>
              <p className="feature-description">
                Notre intelligence artificielle connectée à Perplexity suggère 
                automatiquement des contacts pertinents pour enrichir votre réseau.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <CheckCircle className="w-6 h-6 text-gray-900" />
              </div>
              <h3 className="feature-title">Validation Éditoriale</h3>
              <p className="feature-description">
                Chaque prestataire est validé par notre équipe d'experts, 
                garantissant un niveau d'excellence constant.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Palette className="w-6 h-6 text-gray-900" />
              </div>
              <h3 className="feature-title">Interface Premium</h3>
              <p className="feature-description">
                Design épuré et responsive inspiré de Notion, Airbnb et du Guide Michelin 
                pour une expérience utilisateur exceptionnelle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="social-proof">
        <div className="container">
          <div className="section-title">
            <h2>Ils Nous Font Confiance</h2>
            <p className="section-subtitle">
              Les plus prestigieuses conciergeries et agences haut de gamme utilisent déjà LuxBoard
            </p>
          </div>
          
          <div className="logos-grid">
            <div className="logo-item">Concierge Royal</div>
            <div className="logo-item">VIP Services</div>
            <div className="logo-item">Luxury Care</div>
            <div className="logo-item">Elite Assistance</div>
            <div className="logo-item">Premium Partners</div>
            <div className="logo-item">Exclusive Access</div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
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
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Rejoignez l'Elite de la Conciergerie</h2>
            <p>
              Accédez dès maintenant à la plateforme qui révolutionne le service de luxe. 
              Réservé aux professionnels exigeants.
            </p>
            <div style={{display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap'}}>
              <button onClick={handleConnectClick} className="btn-primary">Se connecter</button>
              <a href="#contact" className="btn-secondary">Planifier une Démo</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>LuxBoard</h3>
              <p>La première plateforme de conciergerie augmentée pour les professionnels du luxe.</p>
            </div>
            <div className="footer-section">
              <h3>Contact</h3>
              <p>hello@luxboard.com</p>
              <p>+33 1 42 00 00 00</p>
            </div>
            <div className="footer-section">
              <h3>Suivez-nous</h3>
              <a href="#">LinkedIn</a><br />
              <a href="#">Twitter</a><br />
              <a href="#">Instagram</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 LuxBoard. Tous droits réservés. | Mentions légales | Confidentialité</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NewLandingPage;

