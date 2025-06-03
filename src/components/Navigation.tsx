import React from 'react';
import { Link } from 'react-router-dom';

interface NavigationItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  children?: NavigationItem[];
}

interface NavigationProps {
  items: NavigationItem[];
  className?: string;
  onItemClick?: (item: NavigationItem) => void;
}

const Navigation: React.FC = () => {
  return (
    <nav className="nav">
      <div className="container">
        <div className="nav-content">
          <a href="#" className="logo">LuxBoard</a>
          <ul className="nav-links">
            <li><a href="#features">Fonctionnalités</a></li>
            <li><a href="#pricing">Tarifs</a></li>
            <li><a href="#about">À propos</a></li>
          </ul>
          <div className="flex items-center gap-4">
            <a href="/login" className="text-white hover:text-primary-gold transition-colors">
              Connexion
            </a>
            <a href="#demo" className="cta-nav">Demander l'accès</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 