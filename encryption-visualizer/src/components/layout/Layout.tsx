import React from 'react';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
  onNavigate?: (page: 'home' | 'aes' | 'rsa' | 'hashing' | 'glossary' | 'about') => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, onNavigate }) => {
  return (
    <div className="min-h-screen">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:outline-none"
      >
        Skip to main content
      </a>

      <Header onNavigate={onNavigate} />

      <main
        id="main-content"
        role="main"
        className="pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-12"
      >
        {children}
      </main>
    </div>
  );
};
