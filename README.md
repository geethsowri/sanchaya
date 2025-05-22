# Sanchaya — ReactJS Expense Tracker

A modern expense tracking application built with React.js featuring data visualization, dark mode, and CSV export functionality.

![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react) ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.3.0-blue?logo=tailwindcss)

## Features

- **CRUD Operations** - Add, edit, delete expenses with form validation
- **Data Visualization** - Interactive charts showing spending patterns
- **Smart Filtering** - Filter by category, date range, and amount
- **Dark Mode** - Toggle between light and dark themes
- **CSV Export** - Export expense data and reports
- **Responsive Design** - Works on desktop and mobile
- **Local Storage** - Data persists without backend

## Tech Stack

- React.js with Context API and Hooks
- Tailwind CSS for styling
- Recharts for data visualization
- Lucide React for icons
- Local Storage for data persistence

## Installation

```bash
# Clone repository
git clone https://github.com/yourusername/reactjs-expense-tracker.git
cd reactjs-expense-tracker

# Install dependencies
npm install

# Start development server
npm start
```

## Dependencies

```bash
npm install recharts lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## Usage

1. **Add Expenses** - Click "Add Expense" and fill out the form
2. **Filter Data** - Use filters to view specific categories or date ranges
3. **View Analytics** - Check dashboard for spending insights and charts
4. **Export Data** - Download CSV reports from the Reports section
5. **Toggle Theme** - Switch between light/dark mode using the header button

## Project Structure

```
src/
├── components/     # React components
├── contexts/       # Context providers
├── hooks/          # Custom hooks
└── utils/          # Constants and utilities
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details.