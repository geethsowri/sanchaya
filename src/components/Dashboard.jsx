import React, { useContext } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { ExpenseContext } from '../contexts/ExpenseContext';
import { StatsCard } from './StatsCard';
import { CATEGORIES, COLORS } from '../constants/index.js';

const Dashboard = () => {
  const { expenses } = useContext(ExpenseContext);

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
  });

  const totalThisMonth = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalThisYear = expenses
    .filter(expense => new Date(expense.date).getFullYear() === currentYear)
    .reduce((sum, expense) => sum + expense.amount, 0);

  const categoryData = CATEGORIES.map(category => {
    const categoryExpenses = monthlyExpenses.filter(expense => expense.category === category);
    const total = categoryExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    return { name: category, value: total };
  }).filter(item => item.value > 0);

  const monthlyData = Array.from({ length: 12 }, (_, i) => {
    const month = new Date(currentYear, i).toLocaleString('default', { month: 'short' });
    const monthExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === i && expenseDate.getFullYear() === currentYear;
    });
    const total = monthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    return { month, amount: total };
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Expenses"
          value={`$${expenses.reduce((sum, e) => sum + e.amount, 0).toFixed(2)}`}
          icon={IndianRupee}
          color="blue"
        />
        <StatsCard
          title="This Month"
          value={`$${totalThisMonth.toFixed(2)}`}
          icon={Calendar}
          color="green"
        />
        <StatsCard
          title="This Year"
          value={`$${totalThisYear.toFixed(2)}`}
          icon={TrendingUp}
          color="purple"
        />
        <StatsCard
          title="Categories"
          value={categoryData.length}
          icon={Tag}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Monthly Spending Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']} />
              <Bar dataKey="amount" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Spending by Category
          </h3>
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
              No expenses this month
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;