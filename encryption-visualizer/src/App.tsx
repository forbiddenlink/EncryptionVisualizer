import { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { AESPage } from './pages/AESPage';
import { RSAPage } from './pages/RSAPage';
import { HashingPage } from './pages/HashingPage';
import { SignaturesPage } from './pages/SignaturesPage';
import { GlossaryPage } from './pages/GlossaryPage';
import { AboutPage } from './pages/AboutPage';
import { Cpu, Key, Hash, ArrowRight, Shield, Lock, Fingerprint, FileSignature } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'aes' | 'rsa' | 'hashing' | 'signatures' | 'glossary' | 'about'>('home');

  if (currentPage === 'aes') {
    return <AESPage onNavigate={setCurrentPage} />;
  }

  if (currentPage === 'rsa') {
    return <RSAPage onNavigate={setCurrentPage} />;
  }

  if (currentPage === 'hashing') {
    return <HashingPage onNavigate={setCurrentPage} />;
  }

  if (currentPage === 'signatures') {
    return <SignaturesPage onNavigate={setCurrentPage} />;
  }

  if (currentPage === 'glossary') {
    return <GlossaryPage onNavigate={setCurrentPage} />;
  }

  if (currentPage === 'about') {
    return <AboutPage onNavigate={setCurrentPage} />;
  }

  return (
    <Layout onNavigate={setCurrentPage}>
      <article className="space-y-16 sm:space-y-24">
        {/* Hero Section */}
        <header className="py-16 sm:py-24">
          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyber-blue/10 border border-cyber-blue/20 rounded-full">
              <Shield className="w-4 h-4 text-cyber-cyan" />
              <span className="text-xs font-semibold tracking-wide uppercase text-cyber-blue">
                Interactive Cryptography Education
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter">
              <span className="block text-slate-900 dark:text-white mb-2">
                See How Encryption
              </span>
              <span className="block bg-gradient-to-br from-cyber-cyan to-cyber-blue bg-clip-text text-transparent">
                Actually Works
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
              Don&apos;t just read about cryptography. <em>Experience</em> it.
              Watch bytes transform, witness key generation, and observe the avalanche effect.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => setCurrentPage('aes')}
                className="btn-primary"
              >
                Start with AES
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentPage('glossary')}
                className="btn-secondary"
              >
                Browse Glossary
              </button>
            </div>
          </div>
        </header>

        {/* Algorithm Cards */}
        <section aria-labelledby="algorithms-heading">
          <div className="text-center mb-10">
            <h2 id="algorithms-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Choose Your Learning Path
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              Each algorithm is broken down into visual, digestible steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* AES Card */}
            <button
              onClick={() => setCurrentPage('aes')}
              className="group relative glass-card-hover p-6 cursor-pointer overflow-hidden text-left block w-full"
              aria-label="Learn AES Encryption - Symmetric, 128/192/256-bit, 10 rounds"
            >
              <div className="space-y-5">
                <div className="flex items-start justify-between">
                  <div className="p-2.5 bg-cyber-dark border border-white/5 rounded-lg group-hover:border-cyber-blue/30 transition-colors duration-300">
                    <Cpu className="w-6 h-6 text-cyber-blue group-hover:text-cyber-cyan transition-colors" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs font-mono text-slate-500 bg-cyber-dark px-2 py-1 rounded border border-white/5">
                    10 rounds
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyber-cyan transition-colors duration-150 tracking-tight">
                    AES Encryption
                  </h3>
                  <p className="text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    The worldwide standard for symmetric encryption. Watch SubBytes, ShiftRows,
                    MixColumns, and AddRoundKey transform your data.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                   <span className="text-[11px] font-mono text-slate-400 bg-cyber-dark px-2 py-1 rounded border border-white/5">
                    128/192/256-bit
                  </span>
                </div>
              </div>
            </button>

            {/* RSA Card */}
            <button
              onClick={() => setCurrentPage('rsa')}
              className="group relative glass-card-hover p-6 cursor-pointer overflow-hidden text-left block w-full"
              aria-label="Learn RSA Encryption - Asymmetric, Public/Private keys"
            >
              <div className="space-y-5">
                <div className="flex items-start justify-between">
                   <div className="p-2.5 bg-cyber-dark border border-white/5 rounded-lg group-hover:border-cyber-blue/30 transition-colors duration-300">
                    <Key className="w-6 h-6 text-cyber-blue group-hover:text-cyber-cyan transition-colors" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs font-mono text-slate-500 bg-cyber-dark px-2 py-1 rounded border border-white/5">
                    pub/priv keys
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyber-cyan transition-colors duration-150 tracking-tight">
                    RSA Encryption
                  </h3>
                  <p className="text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    Public-key cryptography demystified. See how prime numbers create
                    the mathematical foundation for secure communication.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                 <span className="text-[11px] font-mono text-slate-400 bg-cyber-dark px-2 py-1 rounded border border-white/5">
                    2048/4096-bit
                  </span>
                </div>
              </div>
            </button>

            {/* Hashing Card */}
            <button
              onClick={() => setCurrentPage('hashing')}
              className="group relative glass-card-hover p-6 cursor-pointer overflow-hidden text-left block w-full"
              aria-label="Learn Hash Functions - One-way, SHA-256, Avalanche effect"
            >
               <div className="space-y-5">
                <div className="flex items-start justify-between">
                   <div className="p-2.5 bg-cyber-dark border border-white/5 rounded-lg group-hover:border-cyber-blue/30 transition-colors duration-300">
                    <Fingerprint className="w-6 h-6 text-cyber-blue group-hover:text-cyber-cyan transition-colors" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs font-mono text-slate-500 bg-cyber-dark px-2 py-1 rounded border border-white/5">
                    one-way
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyber-cyan transition-colors duration-150 tracking-tight">
                    Hash Functions
                  </h3>
                  <p className="text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    Experience the avalanche effect firsthand. See how changing
                    one bit cascades into a completely different hash output.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                   <span className="text-[11px] font-mono text-slate-400 bg-cyber-dark px-2 py-1 rounded border border-white/5">
                    SHA-256
                  </span>
                </div>
              </div>
            </button>

            {/* Signatures Card */}
            <button
              onClick={() => setCurrentPage('signatures')}
              className="group relative glass-card-hover p-6 cursor-pointer overflow-hidden text-left block w-full"
              aria-label="Learn Digital Signatures - Authentication, Integrity, Non-repudiation"
            >
               <div className="space-y-5">
                <div className="flex items-start justify-between">
                   <div className="p-2.5 bg-cyber-dark border border-white/5 rounded-lg group-hover:border-cyber-blue/30 transition-colors duration-300">
                    <FileSignature className="w-6 h-6 text-cyber-blue group-hover:text-cyber-cyan transition-colors" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs font-mono text-slate-500 bg-cyber-dark px-2 py-1 rounded border border-white/5">
                    sign/verify
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyber-cyan transition-colors duration-150 tracking-tight">
                    Digital Signatures
                  </h3>
                  <p className="text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    See how cryptographic signatures prove authenticity and
                    detect tampering without hiding the message.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="text-[11px] font-mono text-slate-400 bg-cyber-dark px-2 py-1 rounded border border-white/5">
                    RSA-based
                  </span>
                </div>
              </div>
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section className="glass-card p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="inline-flex p-2.5 bg-slate-100 dark:bg-slate-800 rounded-lg shadow-sm">
                <Lock className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Step-by-Step
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Every transformation is visualized. Pause, rewind, and examine each operation at your own pace.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="inline-flex p-2.5 bg-slate-100 dark:bg-slate-800 rounded-lg shadow-sm">
                <Cpu className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Real Algorithms
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Not simplified versions. See the actual S-boxes, permutations, and mathematical operations.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="inline-flex p-2.5 bg-slate-100 dark:bg-slate-800 rounded-lg shadow-sm">
                <Hash className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Interactive Quizzes
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Test your understanding with built-in knowledge checks after each section.
              </p>
            </div>
          </div>
        </section>
      </article>
    </Layout>
  );
}

export default App;
