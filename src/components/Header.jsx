import React, { useContext } from "react";
import { IndianRupee, Moon, Sun } from "lucide-react";
import { ThemeContext } from "../contexts/ThemeContext";
import { ExpenseContext } from "../contexts/ExpenseContext";

const Header = ({ currentView, setCurrentView }) => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { expenses } = useContext(ExpenseContext);

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <header className="bg-white dark:bg-gray-800 shadow-lg transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <IndianRupee className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <h1 className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
              Sanchaya
            </h1>
          </div>

          <nav className="hidden md:flex space-x-8">
            {["dashboard", "expenses", "reports"].map((view) => (
              <button
                key={view}
                onClick={() => setCurrentView(view)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  currentView === view
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                    : "text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white"
                }`}
              >
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Spent
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                ₹{totalExpenses.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
