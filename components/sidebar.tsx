import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  href: string;
}

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className, ...props }) => {
  const [activeMenuItem, setActiveMenuItem] = useState<string>('Dashboard');

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '/images/img_element_2.svg',
      href: '/dashboard'
    },
    {
      id: 'tickets',
      label: 'Tickets',
      icon: '/images/img_ticket.svg',
      href: '/tickets'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: '/images/img_setting_2.svg',
      href: '/settings'
    }
  ];

  const handleMenuClick = (menuItem: MenuItem) => {
    setActiveMenuItem(menuItem.label);
  };

  return (
    <aside
      className={twMerge(
        'w-full lg:w-[18%] h-auto bg-sidebar border-r border-sidebar-border',
        'flex flex-col gap-[30px] justify-start pt-4 pb-6 px-6',
        'hidden lg:flex',
        className
      )}
      role="navigation"
      aria-label="Main navigation"
      {...props}
    >
      {/* Logo Section */}
      <div className="flex flex-col gap-1 justify-start items-start w-full">
        <img
          src="/images/img_sidebar_logo.svg"
          alt="Support Ticket System Logo"
          className="w-[116px] h-[28px]"
          loading="lazy"
        />
        <div className="flex justify-start items-center w-full">
          <span
            className="text-xs font-bold leading-[15px] text-left"
            style={{
              fontFamily: 'Erode',
              color: '#656464'
            }}
          >
            Support Ticket System
          </span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex flex-col gap-1.5 justify-start items-center w-full">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleMenuClick(item)}
            className={twMerge(
              'flex justify-start items-center w-full p-1.5 rounded transition-all duration-200',
              'hover:bg-sidebar-accent focus:outline-none focus:ring-2 focus:ring-sidebar-ring focus:ring-offset-1',
              activeMenuItem === item.label
                ? 'bg-sidebar-accent text-sidebar-primary'
                : 'text-sidebar-foreground hover:text-sidebar-primary'
            )}
            role="menuitem"
            aria-current={activeMenuItem === item.label ? 'page' : undefined}
          >
            <img
              src={item.icon}
              alt=""
              className="w-6 h-6 flex-shrink-0"
              loading="lazy"
            />
            <span
              className="ml-2 text-lg font-medium leading-5 text-left"
              style={{
                fontFamily: 'Erode',
                color: activeMenuItem === item.label ? '#194fe5' : '#3c3c3c'
              }}
            >
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
