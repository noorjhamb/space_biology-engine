
import React from 'react';
import { NavLink } from 'react-router-dom';
import { DashboardIcon, SearchIcon, DataVizIcon, SettingsIcon, HelpIcon, SavedItemsIcon } from '../ui/Icons';

const mainNavigation = [
  { path: '/dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
  { path: '/saved-items', label: 'Saved Items', icon: <SavedItemsIcon /> },
];

const toolsNavigation = [
    { path: '/semantic-search', label: 'Semantic Search', icon: <SearchIcon /> },
    { path: '/reporting', label: 'Reporting/Analytics', icon: <DataVizIcon /> }
];

const NavItem: React.FC<{path: string, label: string, icon: React.ReactNode}> = ({ path, label, icon }) => (
    <NavLink
        to={path}
        className={({ isActive }) =>
          `flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${
            isActive
              ? 'bg-nasa-blue text-white'
              : 'text-nasa-medium-gray hover:bg-nasa-dark hover:text-white'
          }`
        }
      >
        {icon}
        <span className="ml-3">{label}</span>
      </NavLink>
);

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-nasa-dark-soft border-r border-nasa-border flex flex-col">
      <div className="h-16 flex items-center px-4 border-b border-nasa-border">
        <img src="https://www.nasa.gov/wp-content/themes/nasa/assets/images/nasa-logo.svg" alt="NASA Logo" className="h-10 w-10 mr-3" />
        <h1 className="text-lg font-semibold text-white">Space Bio Engine</h1>
      </div>
      <div className="flex-1 flex flex-col overflow-y-auto">
        <nav className="flex-1 px-2 py-4 space-y-1">
          {mainNavigation.map(item => <NavItem key={item.path} {...item} />)}
        </nav>
        <div className="px-2">
            <div className="border-t border-nasa-border" />
        </div>
        <nav className="px-2 py-4 space-y-1">
            {toolsNavigation.map(item => <NavItem key={item.path} {...item} />)}
        </nav>
      </div>
      <div className="px-2 py-4 border-t border-nasa-border space-y-1">
         <NavItem path="/settings" label="Settings" icon={<SettingsIcon />} />
         <NavItem path="/help" label="Help & Support" icon={<HelpIcon />} />
      </div>
    </aside>
  );
};

export default Sidebar;
