import React from 'react';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
  onNavigate?: (page: 'home' | 'aes' | 'rsa' | 'hashing' | 'glossary') => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, onNavigate }) => {
  return (
    <div className="min-h-screen">
      <Header onNavigate={onNavigate} />

      <main className="pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-12">
        {children}
      </main>
    </div>
  );
};
