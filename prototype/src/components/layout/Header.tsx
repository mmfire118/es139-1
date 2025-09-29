import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-reddit-orange rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              HighlightHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-600 dark:text-gray-300 hover:text-reddit-orange transition-colors"
            >
              Hot
            </Link>
            <Link
              to="/?sort=top"
              className="text-gray-600 dark:text-gray-300 hover:text-reddit-orange transition-colors"
            >
              Top
            </Link>
            <Link
              to="/?sort=new"
              className="text-gray-600 dark:text-gray-300 hover:text-reddit-orange transition-colors"
            >
              New
            </Link>
            <Link
              to="/customize"
              className="text-gray-600 dark:text-gray-300 hover:text-reddit-orange transition-colors font-medium"
            >
              Customize
            </Link>
          </nav>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <nav className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-gray-600 dark:text-gray-300 hover:text-reddit-orange transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Hot
              </Link>
              <Link
                to="/?sort=top"
                className="text-gray-600 dark:text-gray-300 hover:text-reddit-orange transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Top
              </Link>
              <Link
                to="/?sort=new"
                className="text-gray-600 dark:text-gray-300 hover:text-reddit-orange transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                New
              </Link>
              <Link
                to="/customize"
                className="text-gray-600 dark:text-gray-300 hover:text-reddit-orange transition-colors py-2 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Customize
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 