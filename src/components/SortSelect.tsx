import React from 'react';
import { ChevronUpDownIcon } from '@heroicons/react/24/solid';

export type SortOption = {
  label: string;
  value: string;
};

interface SortSelectProps {
  options: SortOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export const SortSelect: React.FC<SortSelectProps> = ({
  options,
  value,
  onChange,
  label = 'Trier par',
}) => {
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#1a1a1a] focus:border-[#1a1a1a] sm:text-sm rounded-md appearance-none bg-white"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <ChevronUpDownIcon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}; 