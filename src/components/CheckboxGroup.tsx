import React from 'react';
import { Checkbox } from './Checkbox';

interface Option {
  value: string;
  label: string;
}

interface CheckboxGroupProps {
  name: string;
  label?: string;
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  name,
  label,
  options,
  value,
  onChange,
  error,
  helperText,
  fullWidth = false,
}) => {
  const handleChange = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="mt-2 space-y-2">
        {options.map((option) => (
          <Checkbox
            key={option.value}
            name={name}
            value={option.value}
            checked={value.includes(option.value)}
            onChange={() => handleChange(option.value)}
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