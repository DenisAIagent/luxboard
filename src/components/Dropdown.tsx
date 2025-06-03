import React, { Fragment } from 'react';
import { Menu as HeadlessMenu, Transition } from '@headlessui/react';

interface DropdownItem {
  label: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  divider?: boolean;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right';
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  align = 'right',
  className = '',
}) => {
  const alignClasses = {
    left: 'left-0',
    right: 'right-0',
  };

  return (
    <HeadlessMenu as="div" className={`relative inline-block text-left ${className}`}>
      <HeadlessMenu.Button as={Fragment}>{trigger}</HeadlessMenu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <HeadlessMenu.Items
          className={`absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${alignClasses[align]}`}
        >
          <div className="py-1">
            {items.map((item, index) => (
              <Fragment key={index}>
                {item.divider && <div className="my-1 border-t border-gray-100" />}
                <HeadlessMenu.Item disabled={item.disabled}>
                  {({ active }) => (
                    <button
                      onClick={item.onClick}
                      className={`${
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } ${
                        item.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                      } group flex w-full items-center px-4 py-2 text-sm`}
                    >
                      {item.icon && (
                        <span className="mr-3 h-5 w-5" aria-hidden="true">
                          {item.icon}
                        </span>
                      )}
                      {item.label}
                    </button>
                  )}
                </HeadlessMenu.Item>
              </Fragment>
            ))}
          </div>
        </HeadlessMenu.Items>
      </Transition>
    </HeadlessMenu>
  );
}; 