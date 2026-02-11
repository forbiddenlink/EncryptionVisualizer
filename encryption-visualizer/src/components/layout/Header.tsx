import React, { useState } from 'react';
import { Lock, Cpu, Hash, Sparkles, Menu, X, Book } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

interface HeaderProps {
  onNavigate?: (page: 'home' | 'aes' | 'rsa' | 'hashing' | 'glossary') => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: 'home' | 'aes' | 'rsa' | 'hashing' | 'glossary') => {
    if (onNavigate) {
      onNavigate(page);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-0 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 sm:gap-3 group cursor-pointer"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative bg-gradient-to-r from-blue-600 to-cyan-500 p-2 sm:p-2.5 rounded-xl">
                <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold gradient-text">
                CryptoViz
              </h1>
              <p className="text-[10px] sm:text-xs text-blue-300/60 font-medium">Interactive Learning</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <button
              onClick={() => handleNavClick('aes')}
              className="group relative px-4 py-2 rounded-xl overflow-hidden transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-cyan-500/0 group-hover:from-blue-600/20 group-hover:to-cyan-500/20 transition-all duration-300" />
              <div className="relative flex items-center gap-2">
                <Cpu className="w-4 h-4 text-blue-400 group-hover:text-cyan-400 transition-colors" />
                <span className="text-sm font-semibold text-white/70 group-hover:text-white transition-colors">
                  AES
                </span>
              </div>
            </button>

            <button
              onClick={() => handleNavClick('rsa')}
              className="group relative px-4 py-2 rounded-xl overflow-hidden transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-cyan-500/0 group-hover:from-blue-600/20 group-hover:to-cyan-500/20 transition-all duration-300" />
              <div className="relative flex items-center gap-2">
                <Lock className="w-4 h-4 text-purple-400 group-hover:text-pink-400 transition-colors" />
                <span className="text-sm font-semibold text-white/70 group-hover:text-white transition-colors">
                  RSA
                </span>
              </div>
            </button>

            <button
              onClick={() => handleNavClick('hashing')}
              className="group relative px-4 py-2 rounded-xl overflow-hidden transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-cyan-500/0 group-hover:from-blue-600/20 group-hover:to-cyan-500/20 transition-all duration-300" />
              <div className="relative flex items-center gap-2">
                <Hash className="w-4 h-4 text-emerald-400 group-hover:text-teal-400 transition-colors" />
                <span className="text-sm font-semibold text-white/70 group-hover:text-white transition-colors">
                  Hashing
                </span>
              </div>
            </button>

            <button
              onClick={() => handleNavClick('glossary')}
              className="group relative px-4 py-2 rounded-xl overflow-hidden transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-cyan-500/0 group-hover:from-blue-600/20 group-hover:to-cyan-500/20 transition-all duration-300" />
              <div className="relative flex items-center gap-2">
                <Book className="w-4 h-4 text-yellow-400 group-hover:text-orange-400 transition-colors" />
                <span className="text-sm font-semibold text-white/70 group-hover:text-white transition-colors">
                  Glossary
                </span>
              </div>
            </button>

            <div className="w-px h-6 bg-white/10 mx-2" />

            <ThemeToggle />

            <button className="btn-secondary text-sm">
              <Sparkles className="w-4 h-4" />
              Get Started
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-white/10">
            <button
              onClick={() => handleNavClick('aes')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <Cpu className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-semibold text-white">AES Encryption</span>
            </button>

            <button
              onClick={() => handleNavClick('rsa')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <Lock className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-semibold text-white">RSA Encryption</span>
            </button>

            <button
              onClick={() => handleNavClick('hashing')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <Hash className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-semibold text-white">Hash Functions</span>
            </button>

            <button
              onClick={() => handleNavClick('glossary')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <Book className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-semibold text-white">Glossary</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
