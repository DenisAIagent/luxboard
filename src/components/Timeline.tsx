import React from 'react';

interface TimelineItem {
  title: string;
  description?: string;
  date?: string;
  icon?: React.ReactNode;
  status?: 'completed' | 'current' | 'upcoming';
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({ items, className = '' }) => {
  const getStatusClasses = (status?: TimelineItem['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'current':
        return 'bg-[#1a1a1a]';
      case 'upcoming':
        return 'bg-gray-300';
      default:
        return 'bg-gray-300';
    }
  };

  const getLineClasses = (index: number, status?: TimelineItem['status']) => {
    if (index === items.length - 1) return 'hidden';
    if (status === 'completed') return 'bg-green-500';
    if (status === 'current') return 'bg-[#1a1a1a]';
    return 'bg-gray-300';
  };

  return (
    <div className={`relative ${className}`}>
      {items.map((item, index) => (
        <div key={index} className="relative flex items-start">
          <div className="flex items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${getStatusClasses(
                item.status
              )}`}
            >
              {item.icon || (
                <div className="h-4 w-4 rounded-full bg-white" />
              )}
            </div>
            {index < items.length - 1 && (
              <div
                className={`absolute left-4 top-8 h-full w-0.5 ${getLineClasses(
                  index,
                  item.status
                )}`}
              />
            )}
          </div>
          <div className="ml-4 flex-1 pb-8">
            <div className="flex items-center justify-between">
              <h3
                className={`text-sm font-medium ${
                  item.status === 'current'
                    ? 'text-[#1a1a1a]'
                    : 'text-gray-900'
                }`}
              >
                {item.title}
              </h3>
              {item.date && (
                <span className="text-sm text-gray-500">{item.date}</span>
              )}
            </div>
            {item.description && (
              <p className="mt-1 text-sm text-gray-500">{item.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}; 