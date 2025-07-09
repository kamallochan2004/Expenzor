import React from 'react';
import { useExpenses } from '../../contexts/ExpenseContext';
import { ListOrdered } from 'lucide-react';

const TotalMoney: React.FC = () => {
  const { totalMoney, recentTransactions } = useExpenses();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6 transition-all hover:shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Total Money</h2>
        <p className="text-3xl font-bold text-teal-600">
          Rs. {totalMoney.toLocaleString()}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6 transition-all hover:shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Recent Transactions</h2>
          <ListOrdered className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="space-y-4">
          {recentTransactions.length > 0 ? (
            recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-medium text-gray-800">{transaction.name}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <p className="font-medium text-gray-900">
                  Rs. {transaction.amount.toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No recent transactions</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TotalMoney;