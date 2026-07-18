
import React from 'react';
import { SearchIcon, BellIcon, HelpIcon } from '../ui/Icons';

const Header: React.FC = () => {
  return (
    <header className="h-16 bg-nasa-dark-soft border-b border-nasa-border flex items-center justify-between px-6">
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-nasa-medium-gray" />
          </div>
          <input
            type="text"
            placeholder="Search publications, experiments, genes..."
            className="block w-full bg-nasa-dark border border-nasa-border rounded-md py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-nasa-blue focus:border-transparent"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-1 rounded-full text-nasa-medium-gray hover:text-white hover:bg-gray-700 focus:outline-none">
          <BellIcon />
        </button>
        <button className="p-1 rounded-full text-nasa-medium-gray hover:text-white hover:bg-gray-700 focus:outline-none">
          <HelpIcon />
        </button>
        <div className="flex items-center space-x-3">
          <img
            className="h-8 w-8 rounded-full"
            src="https://picsum.photos/id/1027/200/200"
            alt="User avatar"
          />
          <div className="text-sm">
            <p className="font-medium text-white">Dr. Emily Carter</p>
            <p className="text-nasa-medium-gray">Lead Researcher</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
