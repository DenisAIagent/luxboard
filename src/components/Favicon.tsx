import React from 'react';

interface FaviconProps {
  className?: string;
}

export const Favicon: React.FC<FaviconProps> = ({ className = '' }) => {
  return (
    <img
      src="/assets/favicon.png"
      alt="LuxBoard Favicon"
      className={`h-6 w-auto ${className}`}
    />
  );
}; 