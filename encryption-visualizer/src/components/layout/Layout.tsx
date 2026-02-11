import React from 'react';
import { Header } from './Header';

interface LayoutProps {
  children: React.ReactNode;
  onNavigate?: (page: 'home' | 'aes' | 'rsa' | 'hashing' | 'glossary') => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, onNavigate }) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <Header onNavigate={onNavigate} />
      
      <main className="relative pt-16 sm:pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 sm:py-12">
        {children}
      </main>

      {/* Grid overlay */}
      <div className="grid-overlay" />
    </div>
  );
};
