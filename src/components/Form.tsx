import React from 'react';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  className?: string;
}

interface FormGroupProps {
  children: React.ReactNode;
  className?: string;
}

interface FormLabelProps {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}

interface FormErrorProps {
  children: React.ReactNode;
  className?: string;
}

interface FormHelperTextProps {
  children: React.ReactNode;
  className?: string;
}

export const Form: React.FC<FormProps> & {
  Group: React.FC<FormGroupProps>;
  Label: React.FC<FormLabelProps>;
  Error: React.FC<FormErrorProps>;
  HelperText: React.FC<FormHelperTextProps>;
} = ({ onSubmit, children, className = '', ...props }) => {
  return (
    <form
      onSubmit={onSubmit}
      className={`space-y-6 ${className}`}
      {...props}
    >
      {children}
    </form>
  );
};

Form.Group = ({ children, className = '' }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {children}
    </div>
  );
};

Form.Label = ({ htmlFor, children, required = false, className = '' }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-sm font-medium text-gray-700 ${className}`}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
};

Form.Error = ({ children, className = '' }) => {
  return (
    <p className={`mt-1 text-sm text-red-600 ${className}`}>
      {children}
    </p>
  );
};

Form.HelperText = ({ children, className = '' }) => {
  return (
    <p className={`mt-1 text-sm text-gray-500 ${className}`}>
      {children}
    </p>
  );
}; 