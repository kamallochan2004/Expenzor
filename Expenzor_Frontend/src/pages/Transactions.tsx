import React from 'react';
import TransactionTable from '../components/Transactions/TransactionTable';

const Transactions: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Transactions</h1>
      <TransactionTable />
    </div>
  );
};

export default Transactions;