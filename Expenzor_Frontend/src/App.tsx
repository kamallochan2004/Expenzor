import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ExpenseProvider } from './contexts/ExpenseContext';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import AddExpense from './pages/AddExpense';
import Transactions from './pages/Transactions';

function App() {
  return (
    <ExpenseProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="add-expense" element={<AddExpense />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="*" element={<Navigate to="/\" replace />} />
          </Route>
        </Routes>
      </Router>
    </ExpenseProvider>
  );
}

export default App;