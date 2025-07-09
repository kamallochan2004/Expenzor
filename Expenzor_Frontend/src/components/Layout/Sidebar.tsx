import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, ListOrdered, LogOut } from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-slate-800 text-white w-full md:w-64 flex flex-col h-full">
      <div className="p-4 flex items-center justify-center md:justify-start">
        <h1 className="text-xl font-bold">Expenzor</h1>
      </div>
      
      <nav className="flex-1 px-2 py-4">
        <ul className="space-y-2">
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `flex items-center p-3 text-base font-normal rounded-lg hover:bg-slate-700 transition-all ${
                  isActive ? 'bg-slate-700' : ''
                }`
              }
            >
              <LayoutDashboard className="w-5 h-5 mr-3" />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/add-expense" 
              className={({ isActive }) => 
                `flex items-center p-3 text-base font-normal rounded-lg hover:bg-slate-700 transition-all ${
                  isActive ? 'bg-slate-700' : ''
                }`
              }
            >
              <PlusCircle className="w-5 h-5 mr-3" />
              <span>Add Expense</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/transactions" 
              className={({ isActive }) => 
                `flex items-center p-3 text-base font-normal rounded-lg hover:bg-slate-700 transition-all ${
                  isActive ? 'bg-slate-700' : ''
                }`
              }
            >
              <ListOrdered className="w-5 h-5 mr-3" />
              <span>Transactions</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      
      <div className="p-4">
        <button className="w-full flex items-center justify-center p-3 text-base font-normal rounded-lg hover:bg-slate-700 transition-all">
          <LogOut className="w-5 h-5 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;