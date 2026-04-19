import { useState, useCallback, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Cpu, Hash, Menu, X, Book, Key, Info, FileSignature, Users, Layers, ShieldAlert, Globe, Lock, KeyRound, Ellipsis, GraduationCap, GitCompare } from 'lucide-react';
import { AnimatePresence, m } from 'framer-motion';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { ROUTES } from '@/router/routes';

const algorithmLinks = [
  { to: ROUTES.AES, icon: Cpu, label: 'AES Encryption', category: 'Symmetric' },
  { to: ROUTES.BLOCK_MODES, icon: Layers, label: 'Block Modes', category: 'Symmetric' },
  { to: ROUTES.PADDING, icon: Ellipsis, label: 'Padding Schemes', category: 'Symmetric' },
  { to: ROUTES.RSA, icon: Key, label: 'RSA Encryption', category: 'Asymmetric' },
  { to: ROUTES.ECC, icon: GitCompare, label: 'Elliptic Curves', category: 'Asymmetric' },
  { to: ROUTES.DIFFIE_HELLMAN, icon: Users, label: 'Diffie-Hellman', category: 'Asymmetric' },
  { to: ROUTES.SIGNATURES, icon: FileSignature, label: 'Digital Signatures', category: 'Asymmetric' },
  { to: ROUTES.HASHING, icon: Hash, label: 'Hash Functions', category: 'Hashing' },
  { to: ROUTES.HMAC, icon: KeyRound, label: 'HMAC', category: 'Hashing' },
  { to: ROUTES.PASSWORD_HASHING, icon: Lock, label: 'Password Hashing', category: 'Hashing' },
  { to: ROUTES.TLS, icon: Globe, label: 'TLS Handshake', category: 'Protocols' },
  { to: ROUTES.CRYPTANALYSIS, icon: ShieldAlert, label: 'Cryptanalysis', category: 'Attacks' },
];

const otherLinks = [
  { to: ROUTES.LEARNING_PATHS, icon: GraduationCap, label: 'Learning Paths' },
  { to: ROUTES.COMPARE, icon: GitCompare, label: 'Compare' },
  { to: ROUTES.GLOSSARY, icon: Book, label: 'Glossary' },
  { to: ROUTES.ABOUT, icon: Info, label: 'About' },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

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

  // Group algorithm links by category for mobile
  const categories = ['Symmetric', 'Asymmetric', 'Hashing', 'Protocols', 'Attacks'] as const;
  const grouped = categories.map((cat) => ({
    category: cat,
    links: algorithmLinks.filter((l) => l.category === cat),
  }));

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
          <nav className="hidden lg:flex items-center gap-1">
            {grouped.map(({ category, links }) => (
              <div key={category} className="relative group/dropdown">
                <button className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  {category}
                </button>
                <div className="absolute top-full left-0 mt-1 py-2 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all z-50">
                  {links.map(({ to, icon: Icon, label }) => (
                    <NavLink
                      key={to}
                      to={to}
                      className={({ isActive }) =>
                        `flex items-center gap-2.5 px-4 py-2 text-sm transition-colors ${
                          isActive
                            ? 'text-cyber-cyan bg-slate-50 dark:bg-slate-800'
                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`
                      }
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}

            <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1" />

            {otherLinks.map(({ to, icon: Icon, label }) => (
              <NavLink key={to} to={to} className={navLinkClass}>
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{label}</span>
              </NavLink>
            ))}

            <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1" />

            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
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
        <AnimatePresence>
          {mobileMenuOpen && (
            <m.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="lg:hidden overflow-hidden border-t border-slate-200 dark:border-slate-800"
              aria-label="Mobile navigation"
            >
              <div className="py-4 space-y-4">
                {/* Grouped algorithm links */}
                {grouped.map(({ category, links }) => (
                  <div key={category}>
                    <p className="px-4 mb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      {category}
                    </p>
                    <div className="space-y-0.5">
                      {links.map(({ to, icon: Icon, label }) => (
                        <NavLink
                          key={to}
                          to={to}
                          className={mobileNavLinkClass}
                          onClick={closeMobileMenu}
                        >
                          <Icon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
                        </NavLink>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Divider */}
                <div className="border-t border-slate-200 dark:border-slate-800 mx-4" />

                {/* Other links */}
                <div className="space-y-0.5">
                  {otherLinks.map(({ to, icon: Icon, label }) => (
                    <NavLink
                      key={to}
                      to={to}
                      className={mobileNavLinkClass}
                      onClick={closeMobileMenu}
                    >
                      <Icon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
                    </NavLink>
                  ))}
                </div>
              </div>
            </m.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
