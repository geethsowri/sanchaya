import React, { useContext } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { ExpenseContext } from '../contexts/ExpenseContext';
import { CATEGORIES, COLORS } from '../constants'; // Assuming you have a constants file for categories and colors

const Reports = () => {
  const { expenses } = useContext(ExpenseContext);
  const currentYear = new Date().getFullYear();

  // Monthly breakdown for current year
  const monthlyBreakdown = Array.from({ length: 12 }, (_, i) => {
    const month = new Date(currentYear, i).toLocaleString('default', { month: 'long' });
    const monthExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === i && expenseDate.getFullYear() === currentYear;
    });
    const total = monthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    return { month, total, count: monthExpenses.length };
  });

  // Category breakdown
  const categoryBreakdown = CATEGORIES.map(category => {
    const categoryExpenses = expenses.filter(expense => expense.category === category);
    const total = categoryExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const percentage = expenses.length > 0 ? (total / expenses.reduce((sum, e) => sum + e.amount, 0)) * 100 : 0;
    return { 
      category, 
      total, 
      count: categoryExpenses.length,
      percentage: percentage.toFixed(1)
    };
  }).filter(item => item.total > 0).sort((a, b) => b.total - a.total);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Monthly Breakdown ({currentYear})
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyBreakdown}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" angle={-45} textAnchor="end" height={80} />
            <YAxis />
            <Tooltip formatter={(value) => [`${value.toFixed(2)}`, 'Amount']} />
            <Bar dataKey="total" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Category Breakdown
        </h3>
        {categoryBreakdown.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, percentage }) => `${category} ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="total"
              >
                {categoryBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value.toFixed(2)}`, 'Amount']} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
            No expense data available
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;