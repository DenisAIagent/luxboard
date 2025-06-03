import React from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

interface SortOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface SortProps {
  options: SortOption[];
  value: string;
  direction: 'asc' | 'desc';
  onChange: (value: string, direction: 'asc' | 'desc') => void;
  className?: string;
}

export const Sort: React.FC<SortProps> = ({
  options,
  value,
  direction,
  onChange,
  className = '',
}) => {
  const handleOptionClick = (optionValue: string) => {
    if (optionValue === value) {
      onChange(optionValue, direction === 'asc' ? 'desc' : 'asc');
    } else {
      onChange(optionValue, 'asc');
    }
  };

  return (
    <div className={`relative inline-block text-left ${className}`}>
      <div>
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:ring-offset-2"
        >
          Trier par
          {direction === 'asc' ? (
            <ChevronUpIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
          ) : (
            <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
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
                value === option.value
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-700'
              } ${
                option.disabled
                  ? 'cursor-not-allowed opacity-50'
                  : 'hover:bg-gray-50 hover:text-gray-900'
              } block w-full px-4 py-2 text-left text-sm`}
            >
              {option.label}
              {value === option.value && (
                <span className="ml-2">
                  {direction === 'asc' ? (
                    <ChevronUpIcon className="inline-block h-4 w-4" />
                  ) : (
                    <ChevronDownIcon className="inline-block h-4 w-4" />
                  )}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}; 