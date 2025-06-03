import React from 'react';

interface SkeletonProps {
  type?: 'text' | 'circle' | 'rect';
  width?: string | number;
  height?: string | number;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  type = 'text',
  width,
  height,
  className = '',
}) => {
  const getTypeClasses = () => {
    switch (type) {
      case 'circle':
        return 'rounded-full';
      case 'rect':
        return 'rounded';
      default:
        return 'rounded';
    }
  };

  const getDefaultDimensions = () => {
    switch (type) {
      case 'circle':
        return { width: '40px', height: '40px' };
      case 'rect':
        return { width: '100%', height: '100px' };
      default:
        return { width: '100%', height: '1em' };
    }
  };

  const defaultDimensions = getDefaultDimensions();
  const style = {
    width: width || defaultDimensions.width,
    height: height || defaultDimensions.height,
  };

  return (
    <div
      className={`animate-pulse bg-gray-200 ${getTypeClasses()} ${className}`}
      style={style}
    />
  );
};

interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

export const SkeletonText: React.FC<SkeletonTextProps> = ({
  lines = 3,
  className = '',
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          type="text"
          width={index === lines - 1 ? '60%' : '100%'}
        />
      ))}
    </div>
  );
};

interface SkeletonAvatarProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const SkeletonAvatar: React.FC<SkeletonAvatarProps> = ({
  size = 'md',
  className = '',
}) => {
  const getSize = () => {
    switch (size) {
      case 'sm':
        return '32px';
      case 'lg':
        return '64px';
      default:
        return '48px';
    }
  };

  return (
    <Skeleton
      type="circle"
      width={getSize()}
      height={getSize()}
      className={className}
    />
  );
};

interface SkeletonCardProps {
  className?: string;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({ className = '' }) => {
  return (
    <div className={`rounded-lg border border-gray-200 p-4 ${className}`}>
      <div className="flex items-center space-x-4">
        <SkeletonAvatar size="md" />
        <div className="flex-1 space-y-2">
          <Skeleton width="40%" />
          <SkeletonText lines={2} />
        </div>
      </div>
    </div>
  );
}; 