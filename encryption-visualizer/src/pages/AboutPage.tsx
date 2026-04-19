import { Shield, GraduationCap, Code, Github, Mail } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="glass-card p-6 sm:p-8 text-center">
        <div className="inline-flex p-4 bg-cyber-blue/10 dark:bg-cyber-blue/20 border border-cyber-blue/20 rounded-2xl mb-6 shadow-inner">
          <Shield className="w-10 h-10 text-cyber-blue dark:text-cyber-cyan" />
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
          <GraduationCap className="w-6 h-6 text-cyber-blue dark:text-cyber-cyan" />
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
          <Code className="w-6 h-6 text-cyber-blue dark:text-cyber-cyan" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">What We Cover</h2>
        </div>
        <ul className="space-y-3 text-slate-600 dark:text-slate-400">
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-cyber-blue rounded-full mt-2 flex-shrink-0"></span>
            <span><strong className="text-slate-900 dark:text-white">AES (Advanced Encryption Standard)</strong> - The most widely used symmetric encryption algorithm, visualized round-by-round including SubBytes, ShiftRows, MixColumns, and AddRoundKey operations.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-cyber-cyan rounded-full mt-2 flex-shrink-0"></span>
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
            href="https://github.com/forbiddenlink/encryption-visualizer"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <Github className="w-5 h-5" />
            View on GitHub
          </a>
          <a
            href="https://github.com/forbiddenlink/encryption-visualizer/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <Mail className="w-5 h-5" />
            Report an Issue
          </a>
        </div>
      </section>
    </div>
  );
};
