import { useState, useEffect, createContext, useContext } from 'react';

const ExpenseContext = createContext();

const CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Healthcare',
  'Travel',
  'Education',
  'Other'
];

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useLocalStorage('expenses', []);
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);

  const addExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    setFilteredExpenses(updatedExpenses);
  };

  const updateExpense = (id, updatedExpense) => {
    const updatedExpenses = expenses.map(expense =>
      expense.id === id ? { ...expense, ...updatedExpense } : expense
    );
    setExpenses(updatedExpenses);
    setFilteredExpenses(updatedExpenses);
  };

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(updatedExpenses);
    setFilteredExpenses(updatedExpenses);
  };

  const filterExpenses = (filters) => {
    let filtered = [...expenses];

    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(expense => expense.category === filters.category);
    }

    if (filters.startDate) {
      filtered = filtered.filter(expense => new Date(expense.date) >= new Date(filters.startDate));
    }

    if (filters.endDate) {
      filtered = filtered.filter(expense => new Date(expense.date) <= new Date(filters.endDate));
    }

    if (filters.sortBy) {
      filtered.sort((a, b) => {
        switch (filters.sortBy) {
          case 'amount-desc':
            return b.amount - a.amount;
          case 'amount-asc':
            return a.amount - b.amount;
          case 'date-desc':
            return new Date(b.date) - new Date(a.date);
          case 'date-asc':
            return new Date(a.date) - new Date(b.date);
          default:
            return 0;
        }
      });
    }

    setFilteredExpenses(filtered);
  };

  useEffect(() => {
    setFilteredExpenses(expenses);
  }, [expenses]);

  return (
    <ExpenseContext.Provider value={{
      expenses,
      filteredExpenses,
      addExpense,
      updateExpense,
      deleteExpense,
      filterExpenses
    }}>
      {children}
    </ExpenseContext.Provider>
  );
};

const useExpenseContext = () => {
  return useContext(ExpenseContext);
};

export { ExpenseProvider, useExpenseContext };