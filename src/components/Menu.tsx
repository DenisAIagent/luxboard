import React, { Fragment } from 'react';
import { Menu as HeadlessMenu, Transition } from '@headlessui/react';

interface MenuItem {
  label: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  divider?: boolean;
}

interface MenuProps {
  trigger: React.ReactNode;
  items: MenuItem[];
  align?: 'left' | 'right';
  className?: string;
}

export const Menu: React.FC<MenuProps> = ({
  trigger,
  items,
  align = 'right',
  className = '',
}) => {
  return (
    <HeadlessMenu as="div" className={`relative inline-block text-left ${className}`}>
      <HeadlessMenu.Button className="flex items-center">
        {trigger}
      </HeadlessMenu.Button>
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
          className={`absolute ${
            align === 'right' ? 'right-0' : 'left-0'
          } mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
        >
          <div className="py-1">
            {items.map((item, index) => (
              <Fragment key={index}>
                {item.divider && index > 0 && (
                  <div className="my-1 border-t border-gray-100" />
                )}
                <HeadlessMenu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } ${
                        item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                      } flex w-full items-center px-4 py-2 text-sm`}
                      onClick={item.onClick}
                      disabled={item.disabled}
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