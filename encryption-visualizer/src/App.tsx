import { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { PlaybackControls } from './components/controls/PlaybackControls';
import { AESPage } from './pages/AESPage';
import { RSAPage } from './pages/RSAPage';
import { HashingPage } from './pages/HashingPage';
import { GlossaryPage } from './pages/GlossaryPage';
import { Cpu, Key, Hash, ArrowRight } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'aes' | 'rsa' | 'hashing' | 'glossary'>('home');

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

  return (
    <Layout onNavigate={setCurrentPage}>
      <div className="space-y-8 sm:space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4 sm:space-y-6 py-6 sm:py-12">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight px-4">
            <span className="block text-slate-900 dark:text-white">Master Cryptography</span>
            <span className="block text-slate-500 dark:text-slate-400 mt-2">Through Visualization</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed px-4">
            Explore the inner workings of <span className="text-blue-600 dark:text-blue-400 font-medium">AES</span>,{' '}
            <span className="text-blue-600 dark:text-blue-400 font-medium">RSA</span>, and{' '}
            <span className="text-blue-600 dark:text-blue-400 font-medium">hashing</span> with interactive,
            step-by-step visualizations
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 px-4">
            <button
              onClick={() => setCurrentPage('aes')}
              className="btn-primary"
            >
              Start Learning
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Algorithm Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-0">
          {/* AES Card */}
          <div
            onClick={() => setCurrentPage('aes')}
            className="glass-card-hover p-6 sm:p-8 space-y-4 sm:space-y-5 cursor-pointer group"
          >
            <div className="p-3 bg-blue-600 rounded-lg w-fit">
              <Cpu className="w-6 h-6 text-white" strokeWidth={2} />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                AES Encryption
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                Advanced Encryption Standard - The gold standard for symmetric encryption used worldwide
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs font-medium text-slate-600 dark:text-slate-400">
                Symmetric
              </span>
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs font-medium text-slate-600 dark:text-slate-400">
                128/192/256-bit
              </span>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="text-sm text-slate-500 dark:text-slate-500">
                <span className="font-medium text-slate-700 dark:text-slate-300">8 lessons</span>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* RSA Card */}
          <div
            onClick={() => setCurrentPage('rsa')}
            className="glass-card-hover p-6 sm:p-8 space-y-4 sm:space-y-5 cursor-pointer group"
          >
            <div className="p-3 bg-blue-600 rounded-lg w-fit">
              <Key className="w-6 h-6 text-white" strokeWidth={2} />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                RSA Encryption
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                Public-key cryptography - Secure key exchange and digital signatures explained
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs font-medium text-slate-600 dark:text-slate-400">
                Asymmetric
              </span>
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs font-medium text-slate-600 dark:text-slate-400">
                2048/4096-bit
              </span>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="text-sm text-slate-500 dark:text-slate-500">
                <span className="font-medium text-slate-700 dark:text-slate-300">12 lessons</span>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Hashing Card */}
          <div
            onClick={() => setCurrentPage('hashing')}
            className="glass-card-hover p-6 sm:p-8 space-y-4 sm:space-y-5 cursor-pointer group"
          >
            <div className="p-3 bg-blue-600 rounded-lg w-fit">
              <Hash className="w-6 h-6 text-white" strokeWidth={2} />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Hash Functions
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                SHA-256 and avalanche effect - One-way functions that secure passwords and data
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs font-medium text-slate-600 dark:text-slate-400">
                One-way
              </span>
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-xs font-medium text-slate-600 dark:text-slate-400">
                256-bit output
              </span>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="text-sm text-slate-500 dark:text-slate-500">
                <span className="font-medium text-slate-700 dark:text-slate-300">6 lessons</span>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Playback Controls Demo */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white text-center">
            Playback Controls
          </h3>
          <PlaybackControls />
        </div>

        {/* Visualization Area */}
        <div className="glass-card p-8 sm:p-12 space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              Visualization Canvas
            </h3>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="w-2 h-2 bg-emerald-500 rounded-full" />
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Ready</span>
            </div>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl h-80 flex flex-col items-center justify-center space-y-4">
            <p className="text-lg font-medium text-slate-600 dark:text-slate-400">
              Select an algorithm to begin visualization
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-500">
              Start with AES to see step-by-step encryption in action
            </p>
            <button
              onClick={() => setCurrentPage('aes')}
              className="btn-primary mt-4"
            >
              <Cpu className="w-4 h-4" />
              Explore AES
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;
