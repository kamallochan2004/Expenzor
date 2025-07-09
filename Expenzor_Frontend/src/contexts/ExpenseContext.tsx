import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Expense, Category, MonthlyExpenditure } from '../types';

interface ExpenseContextType {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id' | 'date'>) => void;
  deleteExpense: (id: string) => void;
  totalMoney: number;
  monthlyExpenditure: MonthlyExpenditure;
  recentTransactions: Expense[];
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
};

interface ExpenseProviderProps {
  children: ReactNode;
}

export const ExpenseProvider: React.FC<ExpenseProviderProps> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const savedExpenses = localStorage.getItem('expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const [totalMoney, setTotalMoney] = useState<number>(0);
  const [monthlyExpenditure, setMonthlyExpenditure] = useState<MonthlyExpenditure>({
    Food: 0,
    'Home Rent': 0,
    Studies: 0,
    Miscellaneous: 0,
  });
  const [recentTransactions, setRecentTransactions] = useState<Expense[]>([]);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    
    // Calculate total money spent
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    setTotalMoney(total);
    
    // Calculate monthly expenditure by category
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    const monthlyExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth && 
             expenseDate.getFullYear() === currentYear;
    });
    
    const categoryTotals: MonthlyExpenditure = {
      Food: 0,
      'Home Rent': 0,
      Studies: 0,
      Miscellaneous: 0,
    };
    
    monthlyExpenses.forEach(expense => {
      categoryTotals[expense.category] += expense.amount;
    });
    
    setMonthlyExpenditure(categoryTotals);

    // Get transactions from past 2 months
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
    
    const recentTransactions = expenses
      .filter(expense => new Date(expense.date) >= twoMonthsAgo)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
    
    setRecentTransactions(recentTransactions);
  }, [expenses]);

  const addExpense = (expense: Omit<Expense, 'id' | 'date'>) => {
    const newExpense: Expense = {
      ...expense,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
    };
    
    setExpenses(prevExpenses => [...prevExpenses, newExpense]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        addExpense,
        deleteExpense,
        totalMoney,
        monthlyExpenditure,
        recentTransactions,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};