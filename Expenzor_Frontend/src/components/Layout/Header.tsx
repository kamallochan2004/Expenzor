import React from 'react';
import { Menu } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 py-3 px-4 flex items-center justify-between">
      <button 
        onClick={toggleSidebar}
        className="block md:hidden text-gray-600 hover:text-gray-900"
      >
        <Menu className="w-6 h-6" />
      </button>
      
      <div className="md:hidden flex-1 text-center">
        <h1 className="text-lg font-bold text-teal-600">Expenzor</h1>
      </div>
      
      <div className="hidden md:block">
        <h2 className="text-lg font-semibold text-gray-800">Welcome to Expenzor</h2>
      </div>
      
      <div className="relative">
        <button className="flex items-center text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors">
          <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center">
            <span className="font-medium">JD</span>
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;