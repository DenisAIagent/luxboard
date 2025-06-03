import React from 'react';

interface GridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: 4 | 6 | 8;
}

export const Grid: React.FC<GridProps> = ({ children, columns = 3, gap = 6 }) => {
  const getGridCols = () => {
    switch (columns) {
      case 1:
        return 'grid-cols-1';
      case 2:
        return 'grid-cols-1 md:grid-cols-2';
      case 3:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case 4:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  const getGap = () => {
    switch (gap) {
      case 4:
        return 'gap-4';
      case 6:
        return 'gap-6';
      case 8:
        return 'gap-8';
      default:
        return 'gap-6';
    }
  };

  return (
    <div className={`grid ${getGridCols()} ${getGap()}`}>
      {children}
    </div>
  );
}; 