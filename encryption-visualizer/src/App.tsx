import { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { AESPage } from './pages/AESPage';
import { RSAPage } from './pages/RSAPage';
import { HashingPage } from './pages/HashingPage';
import { GlossaryPage } from './pages/GlossaryPage';
import { AboutPage } from './pages/AboutPage';
import { Cpu, Key, Hash, ArrowRight, Shield, Lock, Fingerprint } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'aes' | 'rsa' | 'hashing' | 'glossary' | 'about'>('home');

  if (currentPage === 'aes') {
    return <AESPage onNavigate={setCurrentPage} />;
  }

  if (currentPage === 'rsa') {
    return <RSAPage onNavigate={setCurrentPage} />;
  }

  if (currentPage === 'hashing') {
    return <HashingPage onNavigate={setCurrentPage} />;
  }

  if (currentPage === 'glossary') {
    return <GlossaryPage />;
  }

  if (currentPage === 'about') {
    return <AboutPage onNavigate={setCurrentPage} />;
  }

  return (
    <Layout onNavigate={setCurrentPage}>
      <article className="space-y-16 sm:space-y-24">
        {/* Hero Section */}
        <header className="py-12 sm:py-20">
          <div className="text-center space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-950/50 border border-blue-200/50 dark:border-blue-800/50 rounded-lg">
              <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                Interactive Cryptography Education
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
              <span className="block text-slate-900 dark:text-white">
                See How Encryption
              </span>
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Actually Works
              </span>
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
              Don&apos;t just read about cryptography. <em>Experience</em> it.
              Watch bytes transform, witness key generation, and observe the avalanche effect.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setCurrentPage('aes')}
                className="btn-primary px-6 py-3"
              >
                Start with AES
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentPage('glossary')}
                className="btn-secondary px-6 py-3"
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* AES Card */}
            <article
              onClick={() => setCurrentPage('aes')}
              className="group relative glass-card p-6 cursor-pointer overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm transition-all duration-200"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setCurrentPage('aes')}
              aria-label="Learn AES Encryption - Symmetric, 128/192/256-bit, 10 rounds"
            >
              <div className="space-y-5">
                <div className="flex items-start justify-between">
                  <div className="p-2.5 bg-blue-600 rounded-lg">
                    <Cpu className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                    10 rounds
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    AES Encryption
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    The worldwide standard for symmetric encryption. Watch SubBytes, ShiftRows,
                    MixColumns, and AddRoundKey transform your data.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 rounded text-xs font-medium text-blue-700 dark:text-blue-300">
                    Symmetric
                  </span>
                  <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-xs font-mono text-slate-600 dark:text-slate-400">
                    128/192/256-bit
                  </span>
                </div>

                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium text-sm">
                  <span>Explore AES</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>

            {/* RSA Card */}
            <article
              onClick={() => setCurrentPage('rsa')}
              className="group relative glass-card p-6 cursor-pointer overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm transition-all duration-200"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setCurrentPage('rsa')}
              aria-label="Learn RSA Encryption - Asymmetric, Public/Private keys"
            >
              <div className="space-y-5">
                <div className="flex items-start justify-between">
                  <div className="p-2.5 bg-violet-600 rounded-lg">
                    <Key className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                    pub/priv keys
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    RSA Encryption
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Public-key cryptography demystified. See how prime numbers create
                    the mathematical foundation for secure communication.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 bg-violet-500/10 border border-violet-500/20 rounded text-xs font-medium text-violet-700 dark:text-violet-300">
                    Asymmetric
                  </span>
                  <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-xs font-mono text-slate-600 dark:text-slate-400">
                    2048/4096-bit
                  </span>
                </div>

                <div className="flex items-center gap-2 text-violet-600 dark:text-violet-400 font-medium text-sm">
                  <span>Explore RSA</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>

            {/* Hashing Card */}
            <article
              onClick={() => setCurrentPage('hashing')}
              className="group relative glass-card p-6 cursor-pointer overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-sm transition-all duration-200"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setCurrentPage('hashing')}
              aria-label="Learn Hash Functions - One-way, SHA-256, Avalanche effect"
            >
              <div className="space-y-5">
                <div className="flex items-start justify-between">
                  <div className="p-2.5 bg-emerald-600 rounded-lg">
                    <Fingerprint className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                    one-way
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    Hash Functions
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Experience the avalanche effect firsthand. See how changing
                    one bit cascades into a completely different hash output.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded text-xs font-medium text-emerald-700 dark:text-emerald-300">
                    SHA-256
                  </span>
                  <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-xs font-mono text-slate-600 dark:text-slate-400">
                    256-bit output
                  </span>
                </div>

                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium text-sm">
                  <span>Explore Hashing</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
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
