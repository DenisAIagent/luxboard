import React from 'react';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  MinusIcon,
} from '@heroicons/react/24/solid';

interface StatItem {
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon?: React.ReactNode;
  description?: string;
}

interface StatsProps {
  items: StatItem[];
  columns?: number;
  className?: string;
}

export const Stats: React.FC<StatsProps> = ({
  items,
  columns = 4,
  className = '',
}) => {
  const getChangeIcon = (type?: StatItem['changeType']) => {
    switch (type) {
      case 'increase':
        return <ArrowUpIcon className="h-4 w-4 text-green-500" />;
      case 'decrease':
        return <ArrowDownIcon className="h-4 w-4 text-red-500" />;
      default:
        return <MinusIcon className="h-4 w-4 text-gray-400" />;
    }
  };

  const getChangeColor = (type?: StatItem['changeType']) => {
    switch (type) {
      case 'increase':
        return 'text-green-500';
      case 'decrease':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div
      className={`grid ${className}`}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6"
        >
          <dt>
            <div className="absolute rounded-md bg-[#1a1a1a] p-3">
              {item.icon}
            </div>
            <p className="ml-16 truncate text-sm font-medium text-gray-500">
              {item.title}
            </p>
          </dt>
          <dd className="ml-16 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
            {item.change !== undefined && (
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${getChangeColor(
                  item.changeType
                )}`}
              >
                {getChangeIcon(item.changeType)}
                <span className="ml-1">{Math.abs(item.change)}%</span>
              </p>
            )}
          </dd>
          {item.description && (
            <p className="mt-1 ml-16 text-sm text-gray-500">
              {item.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}; 