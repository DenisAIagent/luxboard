import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <img
      src="/assets/logo.png"
      alt="LuxBoard Logo"
      className={`h-8 w-auto ${className}`}
    />
  );
}; 