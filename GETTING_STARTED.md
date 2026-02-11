# Getting Started - Encryption Visualizer

## Prerequisites

### Required Software
- **Node.js**: v20.x or later ([download](https://nodejs.org/))
- **pnpm**: v8.x or later (install: `npm install -g pnpm`)
- **Git**: Latest version
- **VS Code**: Recommended editor (with extensions below)

### Recommended VS Code Extensions
- ESLint
- Prettier
- TypeScript
- Tailwind CSS IntelliSense
- Error Lens
- GitLens
- Thunder Client (for API testing)

---

## Initial Setup

### 1. Create Project

```bash
# Create project with Vite + React + TypeScript
pnpm create vite encryption-visualizer --template react-ts

cd encryption-visualizer
```

### 2. Install Core Dependencies

```bash
# Core dependencies
pnpm add react react-dom
pnpm add -D @types/react @types/react-dom

# Routing
pnpm add react-router-dom
pnpm add -D @types/react-router-dom

# State management
pnpm add zustand immer

# Styling
pnpm add tailwindcss postcss autoprefixer
pnpm add -D @tailwindcss/forms @tailwindcss/typography

# UI components
pnpm add class-variance-authority clsx tailwind-merge
pnpm add @radix-ui/react-slot @radix-ui/react-dialog @radix-ui/react-tabs

# Animation
pnpm add framer-motion react-spring

# Visualization
pnpm add d3 @visx/visx
pnpm add -D @types/d3

# Utilities
pnpm add date-fns
pnpm add lucide-react
```

### 3. Install Dev Dependencies

```bash
# Testing
pnpm add -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom
pnpm add -D @playwright/test

# Linting
pnpm add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
pnpm add -D eslint-plugin-react eslint-plugin-react-hooks
pnpm add -D prettier eslint-config-prettier eslint-plugin-prettier

# Build tools
pnpm add -D vite @vitejs/plugin-react
pnpm add -D rollup-plugin-visualizer
```

### 4. Initialize Tailwind CSS

```bash
pnpx tailwindcss init -p
```

Update `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        accent: {
          500: '#06b6d4',
          600: '#0891b2',
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
```

### 5. Configure TypeScript

Update `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    /* Path mapping */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/store/*": ["./src/store/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### 6. Configure Vite

Update `vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'viz-vendor': ['d3', 'framer-motion'],
        },
      },
    },
  },
});
```

### 7. Set Up ESLint

Create `.eslintrc.cjs`:

```javascript
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
```

### 8. Set Up Prettier

Create `.prettierrc`:

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

### 9. Update package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,css}\"",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:e2e": "playwright test",
    "type-check": "tsc --noEmit"
  }
}
```

---

## Project Structure Setup

### Create Directory Structure

```bash
mkdir -p src/{components/{ui,visualizations/{AES,RSA,Hashing},controls,education,layout},lib/{crypto/{aes,rsa,hashing},utils,types},hooks,store,data,styles,pages}

mkdir -p public/assets
mkdir -p docs
mkdir -p tests/{unit,integration,e2e}
```

### Create Initial Files

```bash
# Components
touch src/components/ui/Button.tsx
touch src/components/ui/Card.tsx
touch src/components/layout/Header.tsx
touch src/components/layout/Footer.tsx

# Pages
touch src/pages/Home.tsx
touch src/pages/AESPage.tsx
touch src/pages/RSAPage.tsx
touch src/pages/HashingPage.tsx

# Store
touch src/store/useVisualizationStore.ts

# Lib
touch src/lib/types/index.ts
touch src/lib/utils/index.ts
touch src/lib/crypto/aes/core.ts
```

---

## Initial Code Templates

### 1. Create Store (src/store/useVisualizationStore.ts)

```typescript
import { create } from 'zustand';

interface VisualizationState {
  algorithm: 'aes' | 'rsa' | 'hash' | null;
  isPlaying: boolean;
  currentStep: number;
  totalSteps: number;
  speed: number;
  
  setAlgorithm: (algorithm: 'aes' | 'rsa' | 'hash') => void;
  play: () => void;
  pause: () => void;
  nextStep: () => void;
  prevStep: () => void;
  setSpeed: (speed: number) => void;
  reset: () => void;
}

export const useVisualizationStore = create<VisualizationState>((set) => ({
  algorithm: null,
  isPlaying: false,
  currentStep: 0,
  totalSteps: 0,
  speed: 1000,
  
  setAlgorithm: (algorithm) => set({ algorithm, currentStep: 0 }),
  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  nextStep: () => set((state) => ({
    currentStep: Math.min(state.currentStep + 1, state.totalSteps - 1)
  })),
  prevStep: () => set((state) => ({
    currentStep: Math.max(state.currentStep - 1, 0)
  })),
  setSpeed: (speed) => set({ speed }),
  reset: () => set({ currentStep: 0, isPlaying: false }),
}));
```

### 2. Create Basic UI Component (src/components/ui/Button.tsx)

```typescript
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary-600 text-white hover:bg-primary-700',
        outline: 'border border-gray-300 bg-transparent hover:bg-gray-100',
        ghost: 'hover:bg-gray-100',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
```

### 3. Create Utils (src/lib/utils/index.ts)

```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
  }
  return bytes;
}

export function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
```

### 4. Create App Entry (src/App.tsx)

```typescript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import Home from './pages/Home';
import AESPage from './pages/AESPage';
import RSAPage from './pages/RSAPage';
import HashingPage from './pages/HashingPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aes" element={<AESPage />} />
            <Route path="/rsa" element={<RSAPage />} />
            <Route path="/hashing" element={<HashingPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
```

### 5. Update Main Styles (src/index.css)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
  }
}

@layer base {
  * {
    @apply border-gray-200 dark:border-gray-700;
  }
  
  body {
    @apply bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50;
  }
}

@layer components {
  .container {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }
}
```

---

## Verify Installation

```bash
# Type check
pnpm type-check

# Lint
pnpm lint

# Run dev server
pnpm dev
```

Visit `http://localhost:3000` - you should see a blank app with routing working.

---

## Next Steps

Now you're ready to start implementing features! Follow the development phases in PROJECT_PLAN.md:

1. ✅ **Phase 1, Days 1-2**: Project setup (COMPLETE)
2. ⏭️ **Phase 1, Days 3-4**: Build core infrastructure
3. ⏭️ **Phase 1, Days 5-7**: Implement AES visualization

Refer to TECH_SPEC.md for detailed implementation guidance.

---

## Troubleshooting

### Common Issues

**Issue**: Module not found errors
- **Solution**: Ensure all dependencies are installed: `pnpm install`

**Issue**: TypeScript errors with path aliases
- **Solution**: Restart your TypeScript server in VS Code (Cmd+Shift+P > "TypeScript: Restart TS Server")

**Issue**: Tailwind classes not working
- **Solution**: Ensure `index.css` is imported in `main.tsx`

**Issue**: Hot reload not working
- **Solution**: Check that Vite server is running and restart if needed

---

## Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [D3.js Documentation](https://d3js.org/)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Zustand Documentation](https://docs.pmnd.rs/zustand)

---

Happy coding! 🚀
