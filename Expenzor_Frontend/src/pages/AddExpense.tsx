import React from 'react';
import ExpenseForm from '../components/AddExpense/ExpenseForm';

const AddExpense: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Expense</h1>
      <ExpenseForm />
    </div>
  );
};

export default AddExpense;