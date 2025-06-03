import React, { forwardRef } from 'react';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    const baseClasses = 'h-4 w-4 rounded border-gray-300 text-[#1a1a1a] focus:ring-[#1a1a1a]';
    const errorClasses = error
      ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500'
      : '';
    const checkboxClasses = `${baseClasses} ${errorClasses} ${className}`;

    return (
      <div className="relative flex items-start">
        <div className="flex h-5 items-center">
          <input
            ref={ref}
            type="checkbox"
            className={checkboxClasses}
            {...props}
          />
        </div>
        <div className="ml-3 text-sm">
          {label && (
            <label
              htmlFor={props.id}
              className={`font-medium ${
                error ? 'text-red-600' : 'text-gray-700'
              }`}
            >
              {label}
            </label>
          )}
          {(error || helperText) && (
            <p
              className={`mt-1 ${
                error ? 'text-red-600' : 'text-gray-500'
              }`}
            >
              {error || helperText}
            </p>
          )}
        </div>
      </div>
    );
  }
); 