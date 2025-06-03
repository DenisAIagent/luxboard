import React from 'react';
import { FunnelIcon } from '@heroicons/react/24/solid';

interface FilterOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface FilterProps {
  label: string;
  options: FilterOption[];
  value: string[];
  onChange: (values: string[]) => void;
  multiple?: boolean;
  className?: string;
}

export const Filter: React.FC<FilterProps> = ({
  label,
  options,
  value,
  onChange,
  multiple = false,
  className = '',
}) => {
  const handleOptionClick = (optionValue: string) => {
    if (multiple) {
      const newValue = value.includes(optionValue)
        ? value.filter((v) => v !== optionValue)
        : [...value, optionValue];
      onChange(newValue);
    } else {
      onChange([optionValue]);
    }
  };

  return (
    <div className={`relative inline-block text-left ${className}`}>
      <div>
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:ring-offset-2"
        >
          <FunnelIcon className="mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
          {label}
          {value.length > 0 && (
            <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
              {value.length}
            </span>
          )}
        </button>
      </div>

      <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => !option.disabled && handleOptionClick(option.value)}
              disabled={option.disabled}
              className={`${
                value.includes(option.value)
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-700'
              } ${
                option.disabled
                  ? 'cursor-not-allowed opacity-50'
                  : 'hover:bg-gray-50 hover:text-gray-900'
              } block w-full px-4 py-2 text-left text-sm`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}; 