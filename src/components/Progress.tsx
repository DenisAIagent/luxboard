import React from 'react';

interface ProgressProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'success' | 'warning' | 'danger';
  showLabel?: boolean;
  labelPosition?: 'top' | 'bottom';
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  size = 'md',
  color = 'primary',
  showLabel = false,
  labelPosition = 'top',
  className = '',
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-1';
      case 'md':
        return 'h-2';
      case 'lg':
        return 'h-4';
      default:
        return 'h-2';
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case 'primary':
        return 'bg-[#1a1a1a]';
      case 'success':
        return 'bg-green-600';
      case 'warning':
        return 'bg-yellow-600';
      case 'danger':
        return 'bg-red-600';
      default:
        return 'bg-[#1a1a1a]';
    }
  };

  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const label = (
    <div className="flex justify-between text-sm text-gray-600 mb-1">
      <span>{percentage.toFixed(0)}%</span>
      <span>{value} / {max}</span>
    </div>
  );

  return (
    <div className={className}>
      {showLabel && labelPosition === 'top' && label}
      <div className="relative">
        <div className="overflow-hidden rounded-full bg-gray-200">
          <div
            className={`${getSizeClasses()} ${getColorClasses()} rounded-full transition-all duration-300 ease-in-out`}
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={max}
          />
        </div>
      </div>
      {showLabel && labelPosition === 'bottom' && label}
    </div>
  );
}; 