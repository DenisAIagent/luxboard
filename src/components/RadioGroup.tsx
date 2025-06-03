import React from 'react';
import { Radio } from './Radio';

interface Option {
  value: string;
  label: string;
}

interface RadioGroupProps {
  name: string;
  label?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  label,
  options,
  value,
  onChange,
  error,
  helperText,
  fullWidth = false,
}) => {
  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="mt-2 space-y-2">
        {options.map((option) => (
          <Radio
            key={option.value}
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
            label={option.label}
            error={error}
          />
        ))}
      </div>
      {(error || helperText) && (
        <p
          className={`mt-2 text-sm ${
            error ? 'text-red-600' : 'text-gray-500'
          }`}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
}; 