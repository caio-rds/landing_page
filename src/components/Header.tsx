import { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header({ darkMode, setDarkMode, onUserClick }: { darkMode: boolean; setDarkMode: (mode: boolean) => void; onUserClick?: () => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Cursos', href: '#cursos' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Diferenciais', href: '#diferenciais' },
    { label: 'Contato', href: '#contato' }
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? darkMode
            ? 'bg-slate-900/95 backdrop-blur-xl border-b border-slate-800'
            : 'bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              darkMode ? 'bg-emerald-500/20' : 'bg-emerald-100'
            }`}>
              <svg className={`w-6 h-6 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className={`text-xl font-bold tracking-tight ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              VetAcademy
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className={`text-sm font-medium transition-colors hover:scale-105 duration-300 ${
                  darkMode
                    ? 'text-gray-300 hover:text-emerald-400'
                    : 'text-gray-600 hover:text-emerald-600'
                }`}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          {/* Right Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3"
          >
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`rounded-full transition-all duration-300 px-4 py-2 flex items-center justify-center ${
                darkMode
                  ? 'hover:bg-slate-800 text-gray-300'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <button
              className={`hidden md:inline-flex font-medium px-4 py-2 transition-all duration-300 rounded-lg items-center justify-center ${
                darkMode
                  ? 'text-gray-300 hover:bg-slate-800'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Entrar
            </button>

            <button
              onClick={onUserClick}
              className={`hidden md:inline-flex font-medium px-4 py-2 transition-all duration-300 rounded-lg items-center justify-center ${
                darkMode
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              Área do Aluno
            </button>

            {/* Mobile Menu button */}
            <button                            
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden rounded-full px-4 py-2 flex items-center justify-center ${
                darkMode ? 'hover:bg-slate-800' : 'hover:bg-gray-100'
              }`}
            >
              {mobileMenuOpen ? (
                <X className={`h-5 w-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
              ) : (
                <Menu className={`h-5 w-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
              )}
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden border-t ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'
            }`}
          >
            <div className="px-6 py-6 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-base font-medium transition-colors ${
                    darkMode
                      ? 'text-gray-300 hover:text-emerald-400'
                      : 'text-gray-600 hover:text-emerald-600'
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <button className={`w-full px-4 py-2 rounded flex items-center justify-center ${darkMode ? 'text-gray-300 hover:bg-slate-800' : 'text-gray-600 hover:bg-gray-100'}`}>
                  Entrar
                </button>
                <button onClick={onUserClick} className="w-full bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded flex items-center justify-center text-white font-medium">
                  Área do Aluno
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}