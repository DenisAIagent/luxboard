import React from 'react';

interface ListProps {
  children: React.ReactNode;
  className?: string;
}

interface ListItemProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const List: React.FC<ListProps> & {
  Item: React.FC<ListItemProps>;
} = ({ children, className = '' }) => {
  return (
    <ul className={`divide-y divide-gray-200 ${className}`}>
      {children}
    </ul>
  );
};

List.Item = ({ children, className = '', onClick }) => {
  const baseClasses = 'px-4 py-4 sm:px-6';
  const interactiveClasses = onClick ? 'cursor-pointer hover:bg-gray-50' : '';
  const itemClasses = `${baseClasses} ${interactiveClasses} ${className}`;

  return (
    <li className={itemClasses} onClick={onClick}>
      {children}
    </li>
  );
}; 