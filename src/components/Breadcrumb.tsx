import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/solid';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  showHome = true,
  className = '',
}) => {
  return (
    <nav className={`flex ${className}`} aria-label="Fil d'Ariane">
      <ol className="flex items-center space-x-2">
        {showHome && (
          <li>
            <Link
              to="/"
              className="text-gray-400 hover:text-gray-500"
              aria-label="Accueil"
            >
              <HomeIcon className="h-5 w-5" aria-hidden="true" />
            </Link>
          </li>
        )}
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRightIcon
              className="h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            {item.href ? (
              <Link
                to={item.href}
                className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className="ml-2 text-sm font-medium text-gray-900"
                aria-current="page"
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}; 