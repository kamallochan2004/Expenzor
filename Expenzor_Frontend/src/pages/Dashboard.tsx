import React from 'react';
import TotalMoney from '../components/Dashboard/TotalMoney';
import Calendar from '../components/Dashboard/Calendar';
import MonthlyExpenditure from '../components/Dashboard/MonthlyExpenditure';

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <TotalMoney />
        </div>
        
        <div className="lg:col-span-1">
          <Calendar />
        </div>
        
        <div className="lg:col-span-1">
          <MonthlyExpenditure />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;