import React from 'react';

const Footer = () => {
  return (
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
  );
};

export default Footer; 