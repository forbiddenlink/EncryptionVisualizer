import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Cpu, Hash, Menu, X, Book, Key, Info, FileSignature, Users, Layers } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { ROUTES } from '@/router/routes';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
      isActive
        ? 'bg-slate-100 dark:bg-slate-800 text-cyber-cyan'
        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
    }`;

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      isActive
        ? 'bg-slate-100 dark:bg-slate-800 text-cyber-cyan'
        : 'hover:bg-slate-100 dark:hover:bg-slate-800'
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to={ROUTES.HOME}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyber-blue focus:ring-offset-2 focus:ring-offset-slate-900 rounded-lg group"
            aria-label="Go to home page"
          >
            <div className="bg-cyber-blue group-hover:bg-cyan-500 p-2 border border-cyber-cyan/30 rounded-lg shadow-inner transition-colors duration-150">
              <img src="/logo.png" alt="CryptoViz" className="w-5 h-5 object-contain" />
            </div>
            <div className="text-left">
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-cyber-cyan transition-colors duration-150">
                CryptoViz
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider hidden sm:block">Interactive Learning</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink to={ROUTES.AES} className={navLinkClass}>
              <Cpu className="w-4 h-4" />
              <span className="text-sm font-medium">AES</span>
            </NavLink>

            <NavLink to={ROUTES.RSA} className={navLinkClass}>
              <Key className="w-4 h-4" />
              <span className="text-sm font-medium">RSA</span>
            </NavLink>

            <NavLink to={ROUTES.BLOCK_MODES} className={navLinkClass}>
              <Layers className="w-4 h-4" />
              <span className="text-sm font-medium">Block Modes</span>
            </NavLink>

            <NavLink to={ROUTES.DIFFIE_HELLMAN} className={navLinkClass}>
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">Diffie-Hellman</span>
            </NavLink>

            <NavLink to={ROUTES.HASHING} className={navLinkClass}>
              <Hash className="w-4 h-4" />
              <span className="text-sm font-medium">Hashing</span>
            </NavLink>

            <NavLink to={ROUTES.SIGNATURES} className={navLinkClass}>
              <FileSignature className="w-4 h-4" />
              <span className="text-sm font-medium">Signatures</span>
            </NavLink>

            <NavLink to={ROUTES.GLOSSARY} className={navLinkClass}>
              <Book className="w-4 h-4" />
              <span className="text-sm font-medium">Glossary</span>
            </NavLink>

            <NavLink to={ROUTES.ABOUT} className={navLinkClass}>
              <Info className="w-4 h-4" />
              <span className="text-sm font-medium">About</span>
            </NavLink>

            <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-2" />

            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              ) : (
                <Menu className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-1 border-t border-slate-200 dark:border-slate-800">
            <NavLink
              to={ROUTES.AES}
              className={mobileNavLinkClass}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Cpu className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">AES Encryption</span>
            </NavLink>

            <NavLink
              to={ROUTES.RSA}
              className={mobileNavLinkClass}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Key className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">RSA Encryption</span>
            </NavLink>

            <NavLink
              to={ROUTES.BLOCK_MODES}
              className={mobileNavLinkClass}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Layers className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Block Modes</span>
            </NavLink>

            <NavLink
              to={ROUTES.DIFFIE_HELLMAN}
              className={mobileNavLinkClass}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Users className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Diffie-Hellman</span>
            </NavLink>

            <NavLink
              to={ROUTES.HASHING}
              className={mobileNavLinkClass}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Hash className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Hash Functions</span>
            </NavLink>

            <NavLink
              to={ROUTES.SIGNATURES}
              className={mobileNavLinkClass}
              onClick={() => setMobileMenuOpen(false)}
            >
              <FileSignature className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Digital Signatures</span>
            </NavLink>

            <NavLink
              to={ROUTES.GLOSSARY}
              className={mobileNavLinkClass}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Book className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Glossary</span>
            </NavLink>

            <NavLink
              to={ROUTES.ABOUT}
              className={mobileNavLinkClass}
              onClick={() => setMobileMenuOpen(false)}
            >
              <Info className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">About</span>
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
};
