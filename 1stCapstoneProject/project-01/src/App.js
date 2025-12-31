import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Dashboard from "./pages/Dashboard";

// A small internal component to handle the Layout
function Layout() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 transition-colors duration-300 p-8 font-sans">
      <nav className="flex justify-end mb-8 max-w-xl mx-auto">
        <button 
          onClick={toggleTheme} 
          className="bg-gray-200 dark:bg-slate-700 px-4 py-2 rounded-full font-medium text-sm shadow-sm hover:bg-gray-300 dark:hover:bg-slate-600 dark:text-white transition-colors"
        >
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </nav>
      <Dashboard />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Layout />
    </ThemeProvider>
  );
}