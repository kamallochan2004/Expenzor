import React from 'react';
import { useExpenses } from '../../contexts/ExpenseContext';

const MonthlyExpenditure: React.FC = () => {
  const { expenses } = useExpenses();
  
  const categories = [
    { name: 'Food', color: 'bg-amber-500' },
    { name: 'Home Rent', color: 'bg-blue-500' },
    { name: 'Studies', color: 'bg-green-500' },
    { name: 'Miscellaneous', color: 'bg-purple-500' }
  ];

  const calculateMonthlyTotal = (monthsAgo: number) => {
    const targetDate = new Date();
    targetDate.setMonth(targetDate.getMonth() - monthsAgo);
    const targetMonth = targetDate.getMonth();
    const targetYear = targetDate.getFullYear();

    return expenses
      .filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() === targetMonth && 
               expenseDate.getFullYear() === targetYear;
      })
      .reduce((total, expense) => total + expense.amount, 0);
  };

  const currentMonthTotal = calculateMonthlyTotal(0);
  const lastMonthTotal = calculateMonthlyTotal(1);
  const twoMonthsAgoTotal = calculateMonthlyTotal(2);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getMonthName = (monthsAgo: number) => {
    const date = new Date();
    date.setMonth(date.getMonth() - monthsAgo);
    return monthNames[date.getMonth()];
  };

  const currentMonthExpenditure = categories.reduce((acc, category) => {
    acc[category.name] = expenses
      .filter(expense => {
        const expenseDate = new Date(expense.date);
        const now = new Date();
        return expenseDate.getMonth() === now.getMonth() &&
               expenseDate.getFullYear() === now.getFullYear() &&
               expense.category === category.name;
      })
      .reduce((total, expense) => total + expense.amount, 0);
    return acc;
  }, {} as Record<string, number>);

  const totalExpenditure = Object.values(currentMonthExpenditure).reduce(
    (total, amount) => total + amount,
    0
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6 transition-all hover:shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Current Month Expenditure</h2>
        
        <div className="space-y-4">
          {categories.map(category => {
            const amount = currentMonthExpenditure[category.name];
            const percentage = totalExpenditure ? Math.round((amount / totalExpenditure) * 100) : 0;
            
            return (
              <div key={category.name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{category.name}</span>
                  <span>Rs. {amount.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`${category.color} h-2 rounded-full`} 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 transition-all hover:shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Previous Months Comparison</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">{getMonthName(0)}</span>
            <span className="text-teal-600 font-semibold">Rs. {currentMonthTotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">{getMonthName(1)}</span>
            <span className="text-gray-600 font-semibold">Rs. {lastMonthTotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">{getMonthName(2)}</span>
            <span className="text-gray-600 font-semibold">Rs. {twoMonthsAgoTotal.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlyExpenditure;