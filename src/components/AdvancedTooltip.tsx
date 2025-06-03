import React, { useState } from 'react';
import { Transition } from '@headlessui/react';

interface AdvancedTooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
  delay?: number;
  className?: string;
  maxWidth?: string;
}

export const AdvancedTooltip: React.FC<AdvancedTooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 200,
  className = '',
  maxWidth = 'max-w-xs',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const id = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setIsVisible(false);
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'right':
        return 'left-full ml-2 top-1/2 -translate-y-1/2';
      case 'bottom':
        return 'top-full mt-2 left-1/2 -translate-x-1/2';
      case 'left':
        return 'right-full mr-2 top-1/2 -translate-y-1/2';
      default:
        return 'bottom-full mb-2 left-1/2 -translate-x-1/2';
    }
  };

  const getArrowClasses = () => {
    switch (position) {
      case 'right':
        return 'left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rotate-45';
      case 'bottom':
        return 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45';
      case 'left':
        return 'right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45';
      default:
        return 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45';
    }
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <Transition
        show={isVisible}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <div
          className={`absolute z-50 ${getPositionClasses()} ${maxWidth} ${className}`}
          role="tooltip"
        >
          <div className="relative rounded-md bg-gray-900 px-3 py-2 text-sm text-white shadow-lg">
            <div
              className={`absolute h-2 w-2 bg-gray-900 ${getArrowClasses()}`}
            />
            {content}
          </div>
        </div>
      </Transition>
    </div>
  );
}; 