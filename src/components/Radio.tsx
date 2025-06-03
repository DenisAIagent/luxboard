import React, { forwardRef } from 'react';

interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    const baseClasses = 'h-4 w-4 border-gray-300 text-[#1a1a1a] focus:ring-[#1a1a1a]';
    const errorClasses = error
      ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500'
      : '';
    const radioClasses = `${baseClasses} ${errorClasses} ${className}`;

    return (
      <div className="relative flex items-start">
        <div className="flex h-5 items-center">
          <input
            ref={ref}
            type="radio"
            className={radioClasses}
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