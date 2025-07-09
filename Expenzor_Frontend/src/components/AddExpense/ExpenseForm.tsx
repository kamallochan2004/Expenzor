import React, { useState } from 'react';
import { useExpenses } from '../../contexts/ExpenseContext';
import { Category } from '../../types';
import { ChevronDown, Save } from 'lucide-react';

const ExpenseForm: React.FC = () => {
  const { addExpense } = useExpenses();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category | ''>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const categories: Category[] = ['Food', 'Home Rent', 'Studies', 'Miscellaneous'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name.trim()) {
      setError('Please enter a name for the expense');
      return;
    }

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (!category) {
      setError('Please select a category');
      return;
    }

    addExpense({
      name: name.trim(),
      amount: Number(amount),
      category,
    });

    setSuccess('Expense added successfully!');
    
    // Reset form
    setName('');
    setAmount('');
    setCategory('');

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccess('');
    }, 3000);
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Expense</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-200 text-green-700 rounded-md">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Expense Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            placeholder="Enter expense name"
          />
        </div>
        
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              Rs.
            </span>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="Enter amount"
              min="0"
              step="0.01"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full bg-white px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 flex justify-between items-center"
            >
              <span className={category ? 'text-gray-900' : 'text-gray-500'}>
                {category || 'Select Category'}
              </span>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200">
                <ul className="py-1 max-h-60 overflow-auto">
                  {categories.map((cat) => (
                    <li key={cat}>
                      <button
                        type="button"
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100"
                        onClick={() => {
                          setCategory(cat);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-teal-700 transition-colors flex items-center justify-center"
        >
          <Save className="w-5 h-5 mr-2" />
          Save Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;