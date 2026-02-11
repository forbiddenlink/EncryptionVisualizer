# 🔐 Encryption Visualizer

> **Interactive educational platform** for learning cryptographic algorithms through real-time visualizations

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript)
![Status](https://img.shields.io/badge/status-in_development-yellow)

## 🎯 Overview

**Encryption Visualizer** is an interactive web application that demystifies complex cryptographic algorithms through step-by-step visualizations. Perfect for students, educators, developers, and security enthusiasts who want to understand how encryption actually works under the hood.

### Why This Project?

Cryptography concepts are notoriously abstract and difficult to grasp. By visualizing each transformation, from plaintext to ciphertext, learners can:

- **See** how data transforms at each step
- **Understand** the mathematical operations involved
- **Compare** different algorithms side-by-side
- **Experiment** with custom inputs and keys
- **Learn** security best practices through interactive content

## ✨ Features

### 🎨 Interactive Visualizations

#### **AES (Advanced Encryption Standard)**
- Step-by-step encryption/decryption process
- Key expansion visualization
- State matrix transformations (SubBytes, ShiftRows, MixColumns, AddRoundKey)
- Support for 128, 192, and 256-bit keys
- Real-time byte-level color coding

#### **RSA (Public Key Cryptography)**
- Prime number generation visualization
- Modular arithmetic demonstrations
- Public/private key pair creation
- Encryption/decryption with mathematical notation
- Padding schemes explained

#### **Hashing Algorithms**
- SHA-256 round-by-round visualization
- Avalanche effect demonstration
- Hash comparison tool
- Multiple algorithms (SHA-256, SHA-1, MD5)
- Security warnings for deprecated methods

### 🎓 Educational Features

- **Guided Tours**: Structured learning paths for different skill levels
- **Interactive Quizzes**: Test your understanding after each module
- **Glossary**: Comprehensive cryptography terminology
- **Best Practices**: Industry-standard security recommendations
- **Real-World Examples**: HTTPS, E2EE, digital signatures, and more

### 🎮 User Experience

- **Playback Controls**: Play, pause, step forward/backward
- **Speed Control**: Adjust animation speed to your learning pace
- **Dark/Light Modes**: Eye-friendly viewing options
- **Fully Responsive**: Works on desktop, tablet, and mobile
- **Accessible**: WCAG 2.1 AA compliant

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18+ with TypeScript
- **State Management**: Zustand
- **Styling**: Tailwind CSS + Shadcn/ui components
- **Animation**: Framer Motion + React Spring
- **Visualization**: D3.js v7+, Visx
- **Routing**: React Router v6

### Cryptography
- **Browser**: Web Crypto API (SubtleCrypto)
- **Educational**: Custom step-by-step implementations
- **Libraries**: js-sha256, custom AES/RSA implementations

### Development
- **Build Tool**: Vite
- **Package Manager**: pnpm
- **Testing**: Vitest (unit), Playwright (e2e)
- **Linting**: ESLint + Prettier
- **Type Checking**: TypeScript strict mode

### Deployment
- **Hosting**: Vercel / Netlify
- **CI/CD**: GitHub Actions
- **Performance**: Lighthouse score > 90

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ ([download](https://nodejs.org/))
- pnpm 8+ (`npm install -g pnpm`)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/encryption-visualizer.git
cd encryption-visualizer

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Visit `http://localhost:3000` to see the app in action!

### Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm lint         # Lint code
pnpm lint:fix     # Fix linting errors
pnpm format       # Format code with Prettier
pnpm test         # Run unit tests
pnpm test:ui      # Run tests with UI
pnpm test:e2e     # Run end-to-end tests
pnpm type-check   # Check TypeScript types
```

## 📚 Documentation

### 🎯 Start Here
- **[START_HERE.md](./START_HERE.md)** ⭐ **Read This First!**
  - Complete project overview
  - Documentation guide
  - What we've covered (85+ areas)
  - Next steps

### 📋 Planning & Critical Documents
- **[GAP_ANALYSIS.md](./GAP_ANALYSIS.md)** 🔍 **What Could Go Wrong**
  - 10 critical failure points & solutions
  - Infrastructure, scalability, UX, security
  - Financial planning & business strategy
  - Launch & growth strategy
  
- **[PREFLIGHT_CHECKLIST.md](./PREFLIGHT_CHECKLIST.md)** ✅ **Are You Ready?**
  - 9-phase comprehensive checklist
  - 100+ readiness checkpoints
  - Red flags vs. green lights
  - 80/20 rule (essential 20%)

- **[PROJECT_PLAN.md](./PROJECT_PLAN.md)** 📅 **16-Week Roadmap**
  - Complete development timeline
  - 13 phases with milestones
  - MVP → Full Platform → Advanced Features
  - Resource allocation & scheduling

- **[FEATURES.md](./FEATURES.md)** 🎯 **Complete Feature Specification**
  - All 75+ features organized by priority
  - MVP (Weeks 1-4)
  - Core Platform (Weeks 5-8)
  - Advanced (Weeks 9-12)
  - Cutting-Edge (Weeks 13-16)
  - User stories & acceptance criteria

### 🔧 Technical Documentation
- **[TECH_SPEC.md](./TECH_SPEC.md)** ⚙️ **Implementation Blueprint**
  - Technical architecture
  - Data models & schemas
  - Crypto implementations
  - Animation strategies
  - Performance optimization

- **[ARCHITECTURE_DIAGRAM.md](./ARCHITECTURE_DIAGRAM.md)** 📊 **Visual Diagrams**
  - System architecture
  - Data flow diagrams
  - Component hierarchy
  - File organization

- **[GETTING_STARTED.md](./GETTING_STARTED.md)** 🛠️ **Setup Guide**
  - Environment setup
  - Installation steps
  - Initial code templates
  - Troubleshooting

---

### 📖 Documentation Guide by Role

**For Developers (Start Here):**
1. [START_HERE.md](./START_HERE.md) (15 min)
2. [TECH_SPEC.md](./TECH_SPEC.md) (45 min)
3. [GETTING_STARTED.md](./GETTING_STARTED.md) (2-3 hours)
4. Start building!

**For Project Managers:**
1. [START_HERE.md](./START_HERE.md) (15 min)
2. [PROJECT_PLAN.md](./PROJECT_PLAN.md) (30 min)
3. [GAP_ANALYSIS.md](./GAP_ANALYSIS.md) (60 min)
4. [PREFLIGHT_CHECKLIST.md](./PREFLIGHT_CHECKLIST.md) (40 min)

**For Stakeholders/Investors:**
1. [START_HERE.md](./START_HERE.md) (15 min)
2. [GAP_ANALYSIS.md](./GAP_ANALYSIS.md) - Business section (20 min)
3. [FEATURES.md](./FEATURES.md) - Skim highlights (15 min)

**For Learners/Users:**
1. README.md (this file)
2. Try the live demo (when available)
3. Explore visualizations

---

### 🔍 Quick Navigation

| I want to... | Go to... |
|--------------|----------|
| **Understand the project** | [START_HERE.md](./START_HERE.md) |
| **See what could go wrong** | [GAP_ANALYSIS.md](./GAP_ANALYSIS.md) |
| **Check if ready to build** | [PREFLIGHT_CHECKLIST.md](./PREFLIGHT_CHECKLIST.md) |
| **See the timeline** | [PROJECT_PLAN.md](./PROJECT_PLAN.md) |
| **Browse all features** | [FEATURES.md](./FEATURES.md) |
| **Understand architecture** | [TECH_SPEC.md](./TECH_SPEC.md) |
| **See visual diagrams** | [ARCHITECTURE_DIAGRAM.md](./ARCHITECTURE_DIAGRAM.md) |
| **Set up my environment** | [GETTING_STARTED.md](./GETTING_STARTED.md) |
| **Start coding** | Follow [GETTING_STARTED.md](./GETTING_STARTED.md), then [PROJECT_PLAN.md](./PROJECT_PLAN.md) Phase 1 |

## 🏗️ Project Structure

```
encryption-visualizer/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components
│   │   ├── visualizations/ # Algorithm visualizations
│   │   │   ├── AES/        # AES-specific components
│   │   │   ├── RSA/        # RSA-specific components
│   │   │   └── Hashing/    # Hashing visualizations
│   │   ├── controls/       # Playback controls
│   │   ├── education/      # Educational content
│   │   └── layout/         # Layout components
│   ├── lib/                # Core libraries
│   │   ├── crypto/         # Crypto implementations
│   │   ├── utils/          # Helper functions
│   │   └── types/          # TypeScript types
│   ├── hooks/              # Custom React hooks
│   ├── store/              # State management
│   ├── pages/              # Application pages
│   └── styles/             # Global styles
├── public/                 # Static assets
├── tests/                  # Test files
└── docs/                   # Documentation
```

## 🎯 Development Roadmap

### Phase 1: Foundation (Week 1) ✅
- [x] Project setup
- [x] Core infrastructure
- [ ] AES visualization Part 1

### Phase 2: Core Features (Week 2)
- [ ] Complete AES visualization
- [ ] RSA visualization
- [ ] Hashing visualization
- [ ] Testing & polish

### Phase 3: Educational Content (Days 8-10)
- [ ] Guided tours
- [ ] Quiz system
- [ ] Glossary
- [ ] Best practices guide

### Phase 4: Enhancement (Days 11-14)
- [ ] Comparison tools
- [ ] Theme toggle
- [ ] Share functionality
- [ ] Performance optimization

### Phase 5: Advanced Features (Weeks 3-4)
- [ ] Elliptic Curve Cryptography
- [ ] Diffie-Hellman key exchange
- [ ] TLS handshake simulation
- [ ] Digital signature demos

### Phases 6-13: Next-Gen Platform (Weeks 5-16) 🚀
**See [FEATURES.md](./FEATURES.md) for complete details on all 75+ features**

- [ ] 🎮 Gamification (achievements, challenges, XP system)
- [ ] 🤖 AI-powered learning assistant
- [ ] 🎨 3D visualizations (React Three Fiber)
- [ ] 📱 Progressive Web App (offline-first)
- [ ] 🎭 Role-playing scenarios
- [ ] 🔮 Post-quantum cryptography
- [ ] 🌐 Real-time collaboration
- [ ] 🌍 Multi-language support (8+ languages)
- [ ] 📊 Learning analytics dashboard
- [ ] 🎥 Export tools (video, GIF, slides)
- [ ] 🔐 Security best practices checker
- [ ] ♿ Enhanced accessibility (WCAG 2.2/3.0)
- [ ] 🥽 WebXR (AR/VR) integration
- [ ] 🎖️ Blockchain-verified certificates
- [ ] 🎯 CTF (Capture the Flag) platform

## 🧪 Testing

We maintain high code quality through comprehensive testing:

### Unit Tests
```bash
pnpm test
```
- Cryptographic algorithm accuracy
- State management logic
- Component rendering
- Utility functions

### Integration Tests
```bash
pnpm test:e2e
```
- Complete algorithm flows
- User interactions
- State transitions
- Cross-browser compatibility

### Code Coverage
Target: >80% code coverage

## 🔐 Security

This is an **educational platform** designed to teach cryptographic concepts. Important notes:

⚠️ **NOT FOR PRODUCTION USE**: The step-by-step implementations are designed for learning, not security.

✅ **For Production**: Always use:
- Web Crypto API (SubtleCrypto)
- Battle-tested libraries (libsodium, OpenSSL)
- Security audited code

### Security Features in This App
- Input sanitization
- XSS protection
- Content Security Policy
- No data collection
- Local-only processing

## 🤝 Contributing

Contributions are welcome! This project is perfect for:

- First-time open source contributors
- Students learning React/TypeScript
- Cryptography enthusiasts
- Educators creating learning materials

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`pnpm test`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Contribution Ideas

- [ ] Add new algorithms (ChaCha20, ECC)
- [ ] Improve visualizations
- [ ] Add more educational content
- [ ] Translate to other languages
- [ ] Improve accessibility
- [ ] Write more tests
- [ ] Fix bugs

## 📖 Learning Resources

### Cryptography
- [NIST Cryptographic Standards](https://csrc.nist.gov/)
- [Coursera: Cryptography I](https://www.coursera.org/learn/crypto)
- [The Code Book by Simon Singh](https://simonsingh.net/books/the-code-book/)
- [Serious Cryptography by Jean-Philippe Aumasson](https://nostarch.com/seriouscrypto)

### Development
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [D3.js Gallery](https://observablehq.com/@d3/gallery)
- [Tailwind CSS](https://tailwindcss.com/)

### Inspiration
- [CrypTool 2](https://www.cryptool.org/)
- [Crypto Exhibit](https://www.crypto-exhib.it/)
- [CipherFlow](https://powergr.github.io/cipherflow-visualizer/)

## 🎓 Educational Value

### Skills You'll Learn Building This

**Frontend Development:**
- Advanced React patterns (hooks, context, composition)
- TypeScript type system mastery
- Complex state management
- Performance optimization
- Animation techniques
- Responsive design

**Cryptography:**
- Symmetric encryption (AES)
- Asymmetric encryption (RSA, ECC)
- Hash functions and their properties
- Key management principles
- Digital signatures
- Cryptographic protocols

**Software Engineering:**
- Clean architecture
- Testing strategies
- Documentation practices
- Code review process
- Version control workflows

## 🏆 Project Goals

### Technical Goals
- ✅ Modern, maintainable codebase
- ✅ >90 Lighthouse score
- ✅ WCAG 2.1 AA accessibility
- ✅ >80% test coverage
- ✅ Comprehensive documentation

### Educational Goals
- ✅ Clear, accurate algorithm explanations
- ✅ Intuitive, engaging visualizations
- ✅ Progressive learning paths
- ✅ Real-world context and examples
- ✅ Security best practices emphasis

### Community Goals
- ✅ Open source contribution
- ✅ Educational resource sharing
- ✅ Cryptography awareness
- ✅ Developer learning platform

## 📊 Performance Targets

- **Initial Load**: < 2 seconds
- **Time to Interactive**: < 3 seconds
- **Lighthouse Performance**: > 90
- **Lighthouse Accessibility**: 100
- **Animation Frame Rate**: 60fps
- **Bundle Size**: < 500KB (gzipped)

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **NIST** for cryptographic standards
- **CrypTool** for inspiration
- **React community** for excellent tools
- **Open source contributors** everywhere

## 📧 Contact

- **Project Lead**: [Your Name](mailto:your.email@example.com)
- **GitHub**: [@yourusername](https://github.com/yourusername)
- **Website**: [encryption-visualizer.dev](https://encryption-visualizer.dev)

## 🌟 Show Your Support

If you find this project helpful:

- ⭐ Star this repository
- 🐛 Report bugs
- 💡 Suggest features
- 📝 Improve documentation
- 🔄 Share with others

---

<div align="center">

**Built with ❤️ for the security education community**

[Get Started](./GETTING_STARTED.md) • [Documentation](./PROJECT_PLAN.md) • [Contributing](#contributing)

</div>
