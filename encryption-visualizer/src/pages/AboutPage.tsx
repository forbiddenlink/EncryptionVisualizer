import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Shield, GraduationCap, Code, Github, Mail } from 'lucide-react';

interface AboutPageProps {
  onNavigate?: (page: 'home' | 'aes' | 'rsa' | 'hashing' | 'glossary' | 'about') => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <Layout onNavigate={onNavigate}>
      <div className="space-y-8 max-w-3xl mx-auto">
        {/* Header */}
        <div className="glass-card p-6 sm:p-8 text-center">
          <div className="inline-flex p-4 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-6">
            <Shield className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-4">
            About CryptoViz
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            An open-source educational tool for understanding cryptographic algorithms through interactive visualization.
          </p>
        </div>

        {/* Mission */}
        <section className="glass-card p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Our Mission</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Cryptography can feel abstract and intimidating. CryptoViz was created to make these concepts accessible by showing you exactly what happens at each step of encryption, decryption, and hashing operations.
          </p>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mt-4">
            Whether you're a student learning about security fundamentals, a developer implementing encryption, or simply curious about how your data stays safe, we aim to provide clear, accurate visualizations of real-world algorithms.
          </p>
        </section>

        {/* What We Cover */}
        <section className="glass-card p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <Code className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">What We Cover</h2>
          </div>
          <ul className="space-y-3 text-slate-600 dark:text-slate-400">
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
              <span><strong className="text-slate-900 dark:text-white">AES (Advanced Encryption Standard)</strong> - The most widely used symmetric encryption algorithm, visualized round-by-round including SubBytes, ShiftRows, MixColumns, and AddRoundKey operations.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-violet-500 rounded-full mt-2 flex-shrink-0"></span>
              <span><strong className="text-slate-900 dark:text-white">RSA</strong> - Public-key cryptography explained through prime number generation, key derivation, and modular arithmetic.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span>
              <span><strong className="text-slate-900 dark:text-white">Hash Functions</strong> - See the avalanche effect in action and understand why hash functions are one-way.</span>
            </li>
          </ul>
        </section>

        {/* Accuracy Note */}
        <section className="glass-card p-6 sm:p-8 border-l-4 border-l-amber-500">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Educational Purpose</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            This tool is designed for learning, not for production cryptographic operations. The implementations prioritize clarity and visualization over performance. For real-world applications, always use established cryptographic libraries.
          </p>
        </section>

        {/* Contact & Contribute */}
        <section className="glass-card p-6 sm:p-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Get Involved</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-medium hover:opacity-90 transition-opacity"
            >
              <Github className="w-5 h-5" />
              View on GitHub
            </a>
            <a
              href="mailto:contact@example.com"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
            >
              <Mail className="w-5 h-5" />
              Contact Us
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
};
