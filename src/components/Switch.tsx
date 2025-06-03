import React from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  size = 'md',
  className = '',
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-4 w-7';
      case 'md':
        return 'h-5 w-9';
      case 'lg':
        return 'h-6 w-11';
      default:
        return 'h-5 w-9';
    }
  };

  const getDotSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-3 w-3';
      case 'md':
        return 'h-4 w-4';
      case 'lg':
        return 'h-5 w-5';
      default:
        return 'h-4 w-4';
    }
  };

  const getDotTranslateClasses = () => {
    switch (size) {
      case 'sm':
        return checked ? 'translate-x-3' : 'translate-x-0';
      case 'md':
        return checked ? 'translate-x-4' : 'translate-x-0';
      case 'lg':
        return checked ? 'translate-x-5' : 'translate-x-0';
      default:
        return checked ? 'translate-x-4' : 'translate-x-0';
    }
  };

  return (
    <label className={`inline-flex items-center ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
        />
        <div
          className={`${getSizeClasses()} rounded-full transition-colors duration-200 ease-in-out ${
            checked ? 'bg-[#1a1a1a]' : 'bg-gray-200'
          }`}
        />
        <div
          className={`${getDotSizeClasses()} ${getDotTranslateClasses()} absolute left-0.5 top-0.5 rounded-full bg-white transition-transform duration-200 ease-in-out`}
        />
      </div>
      {label && (
        <span className="ml-3 text-sm font-medium text-gray-700">
          {label}
        </span>
      )}
    </label>
  );
}; 