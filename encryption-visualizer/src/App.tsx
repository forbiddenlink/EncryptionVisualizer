import { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { PlaybackControls } from './components/controls/PlaybackControls';
import { AESPage } from './pages/AESPage';
import { RSAPage } from './pages/RSAPage';
import { HashingPage } from './pages/HashingPage';
import { GlossaryPage } from './pages/GlossaryPage';
import { Cpu, Key, Hash, Lock, Sparkles, Zap, Shield, ArrowRight } from 'lucide-react';

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
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 glass-card border-white/20 mb-2 sm:mb-4">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold text-cyan-400">
              Interactive Cryptography Education
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black leading-tight px-4">
            <span className="block gradient-text">Master Cryptography</span>
            <span className="block text-white/90 mt-2">Through Visualization</span>
          </h2>

          <p className="text-base sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed px-4">
            Explore the inner workings of <span className="text-blue-400 font-semibold">AES</span>,{' '}
            <span className="text-cyan-400 font-semibold">RSA</span>, and{' '}
            <span className="text-teal-400 font-semibold">hashing</span> with interactive,
            step-by-step visualizations
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 px-4">
            <button
              onClick={() => setCurrentPage('aes')}
              className="btn-primary w-auto px-6 sm:px-8 py-3 sm:py-4"
            >
              <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
              Start Learning
            </button>
            <button className="btn-secondary w-auto px-6 sm:px-8 py-3 sm:py-4">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
              View Demo
            </button>
          </div>
        </div>

        {/* Algorithm Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-0">
          {/* AES Card - Active */}
          <div
            onClick={() => setCurrentPage('aes')}
            className="glass-card-hover p-6 sm:p-8 space-y-4 sm:space-y-6 cursor-pointer relative group border-blue-500/20"
          >
            <div className="absolute top-4 right-4">
              <div className="px-3 py-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full text-xs font-bold text-white shadow-lg">
                ACTIVE
              </div>
            </div>

            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 animate-glow" />
              <div className="relative p-3 sm:p-4 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl">
                <Cpu className="w-6 h-6 sm:w-8 sm:h-8 text-white" strokeWidth={2} />
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                AES Encryption
                <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
              </h3>
              <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                Advanced Encryption Standard - The gold standard for symmetric encryption used
                worldwide
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-lg text-xs font-semibold text-blue-300">
                Symmetric
              </span>
              <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-lg text-xs font-semibold text-cyan-300">
                128/192/256-bit
              </span>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="text-sm text-white/50">
                <span className="font-semibold text-cyan-400">8 lessons</span> • 45 min
              </div>
              <ArrowRight className="w-5 h-5 text-cyan-400 group-hover:translate-x-2 transition-transform" />
            </div>
          </div>

          {/* RSA Card - NOW AVAILABLE! */}
          <div
            onClick={() => setCurrentPage('rsa')}
            className="glass-card-hover p-8 space-y-6 cursor-pointer relative group"
          >
            <div className="absolute top-4 right-4">
              <div className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full text-xs font-bold text-white animate-pulse">
                NEW!
              </div>
            </div>

            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl blur-xl opacity-30" />
              <div className="relative p-4 bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl">
                <Key className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                RSA Encryption
                <Lock className="w-5 h-5 text-purple-400" />
              </h3>
              <p className="text-white/60 leading-relaxed">
                Public-key cryptography - Secure key exchange and digital signatures explained
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-lg text-xs font-semibold text-purple-300">
                Asymmetric
              </span>
              <span className="px-3 py-1 bg-pink-500/20 border border-pink-500/30 rounded-lg text-xs font-semibold text-pink-300">
                2048/4096-bit
              </span>
            </div>

            <div className="pt-4 border-t border-white/10">
              <div className="text-sm text-white/50">
                <span className="font-semibold text-purple-400">12 lessons</span> • 60 min
              </div>
            </div>
          </div>

          {/* Hashing Card - NOW AVAILABLE! */}
          <div
            onClick={() => setCurrentPage('hashing')}
            className="glass-card-hover p-8 space-y-6 cursor-pointer relative group"
          >
            <div className="absolute top-4 right-4">
              <div className="px-3 py-1 bg-gradient-to-r from-emerald-600 to-teal-500 rounded-full text-xs font-bold text-white animate-pulse">
                NEW!
              </div>
            </div>

            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-500 rounded-2xl blur-xl opacity-30" />
              <div className="relative p-4 bg-gradient-to-br from-emerald-600 to-teal-500 rounded-2xl">
                <Hash className="w-8 h-8 text-white" strokeWidth={2} />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                Hash Functions
                <Lock className="w-5 h-5 text-emerald-400" />
              </h3>
              <p className="text-white/60 leading-relaxed">
                SHA-256 and avalanche effect - One-way functions that secure passwords and data
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-xs font-semibold text-emerald-300">
                One-way
              </span>
              <span className="px-3 py-1 bg-teal-500/20 border border-teal-500/30 rounded-lg text-xs font-semibold text-teal-300">
                256-bit output
              </span>
            </div>

            <div className="pt-4 border-t border-white/10">
              <div className="text-sm text-white/50">
                <span className="font-semibold text-emerald-400">6 lessons</span> • 30 min
              </div>
            </div>
          </div>
        </div>

        {/* Playback Controls Demo */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white text-center">
            Professional Playback Controls
          </h3>
          <PlaybackControls />
        </div>

        {/* Visualization Area */}
        <div className="glass-card p-12 space-y-6 relative overflow-hidden group">
          {/* Animated background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-500 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-bold text-white flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl">
                  <Cpu className="w-6 h-6 text-white" />
                </div>
                Visualization Canvas
              </h3>
              <div className="flex items-center gap-2 glass-card px-4 py-2 border-white/10">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-white/70">Ready</span>
              </div>
            </div>

            <div className="glass-card bg-black/20 border-white/5 rounded-2xl h-96 flex flex-col items-center justify-center space-y-6 relative overflow-hidden group/canvas">
              {/* Grid pattern */}
              <div className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)',
                  backgroundSize: '30px 30px'
                }}
              />

              <div className="relative z-10 text-center space-y-4">
                <div className="inline-flex p-6 glass-card border-blue-500/30 rounded-2xl mb-4 animate-float">
                  <Sparkles className="w-12 h-12 text-blue-400" />
                </div>
                <p className="text-xl font-semibold text-white/70">
                  Select an algorithm to begin visualization
                </p>
                <p className="text-sm text-white/40">
                  Start with AES to see step-by-step encryption in action
                </p>
                <button
                  onClick={() => setCurrentPage('aes')}
                  className="btn-primary mt-4"
                >
                  <Cpu className="w-5 h-5" />
                  Explore AES Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default App;
