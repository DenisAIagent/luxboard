import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  color = '#1a1a1a',
  className = '',
}) => {
  const getSize = () => {
    switch (size) {
      case 'small':
        return 'h-4 w-4';
      case 'medium':
        return 'h-8 w-8';
      case 'large':
        return 'h-12 w-12';
      default:
        return 'h-8 w-8';
    }
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`${getSize()} animate-spin rounded-full border-2 border-t-transparent`}
        style={{ borderColor: `${color} transparent ${color} ${color}` }}
      />
    </div>
  );
}; 