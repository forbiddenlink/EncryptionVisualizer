# Technical Specification - Encryption Visualizer

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │                   React Application                    │ │
│  │                                                         │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐ │ │
│  │  │              │  │              │  │             │ │ │
│  │  │   UI Layer   │◄─┤  Viz Layer   │◄─┤ Crypto Lib  │ │ │
│  │  │  (Controls)  │  │  (D3/Canvas) │  │  (Engines)  │ │ │
│  │  │              │  │              │  │             │ │ │
│  │  └──────┬───────┘  └──────┬───────┘  └─────┬───────┘ │ │
│  │         │                 │                 │         │ │
│  │         └─────────────────┴─────────────────┘         │ │
│  │                           │                           │ │
│  │                    ┌──────▼──────┐                    │ │
│  │                    │             │                    │ │
│  │                    │ State Store │                    │ │
│  │                    │  (Zustand)  │                    │ │
│  │                    │             │                    │ │
│  │                    └─────────────┘                    │ │
│  └───────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Component Architecture

```
App
├── Layout
│   ├── Header
│   │   ├── Logo
│   │   ├── Navigation
│   │   └── ThemeToggle
│   └── Footer
│
├── AlgorithmSelector
│   ├── AESCard
│   ├── RSACard
│   └── HashCard
│
├── VisualizationContainer
│   ├── AESVisualizer
│   │   ├── InputPanel
│   │   ├── KeyExpansionView
│   │   ├── StateMatrixView
│   │   ├── RoundVisualization
│   │   │   ├── SubBytesStep
│   │   │   ├── ShiftRowsStep
│   │   │   ├── MixColumnsStep
│   │   │   └── AddRoundKeyStep
│   │   └── OutputPanel
│   │
│   ├── RSAVisualizer
│   │   ├── InputPanel
│   │   ├── KeyGenerationView
│   │   │   ├── PrimeSelection
│   │   │   ├── ModulusCalculation
│   │   │   └── KeyPairDisplay
│   │   ├── EncryptionView
│   │   │   ├── MessageEncoding
│   │   │   ├── ModularExponentiation
│   │   │   └── CiphertextOutput
│   │   └── DecryptionView
│   │
│   └── HashVisualizer
│       ├── InputPanel
│       ├── ProcessingView
│       │   ├── MessageSchedule
│       │   ├── CompressionFunction
│       │   └── RoundVisualization
│       ├── OutputPanel
│       └── ComparisonTool
│
├── ControlPanel
│   ├── PlaybackControls
│   │   ├── PlayButton
│   │   ├── PauseButton
│   │   ├── StepForwardButton
│   │   ├── StepBackButton
│   │   └── ResetButton
│   ├── SpeedControl
│   └── ProgressBar
│
├── InfoPanel
│   ├── StepDescription
│   ├── CodeSnippet
│   ├── MathNotation
│   └── RelatedConcepts
│
└── EducationalContent
    ├── GuidedTour
    ├── QuizSystem
    ├── Glossary
    └── Resources
```

---

## Data Models

### Visualization State

```typescript
interface VisualizationState {
  // Current algorithm
  algorithm: Algorithm;
  
  // Playback state
  playback: PlaybackState;
  
  // Algorithm-specific data
  aes: AESState | null;
  rsa: RSAState | null;
  hash: HashState | null;
  
  // UI state
  ui: UIState;
}

type Algorithm = 'aes' | 'rsa' | 'sha256' | 'md5';

interface PlaybackState {
  isPlaying: boolean;
  currentStep: number;
  totalSteps: number;
  speed: number; // milliseconds per step
  history: Step[];
}

interface Step {
  id: string;
  name: string;
  description: string;
  code?: string;
  math?: string;
  data: any; // Algorithm-specific data
  timestamp: number;
}

interface UIState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  infoPanelOpen: boolean;
  activeTab: 'description' | 'code' | 'math';
}
```

### AES State

```typescript
interface AESState {
  // Input
  plaintext: Uint8Array;
  key: Uint8Array;
  keySize: 128 | 192 | 256;
  
  // Processing
  state: Uint8Array; // 4x4 matrix (16 bytes)
  roundKeys: Uint8Array[]; // Expanded keys
  currentRound: number;
  totalRounds: number;
  
  // Output
  ciphertext: Uint8Array | null;
  
  // Visualization data
  steps: AESStep[];
  highlights: CellHighlight[];
}

interface AESStep {
  round: number;
  operation: 'subBytes' | 'shiftRows' | 'mixColumns' | 'addRoundKey';
  stateBefore: Uint8Array;
  stateAfter: Uint8Array;
  description: string;
}

interface CellHighlight {
  row: number;
  col: number;
  color: string;
  intensity: number;
}
```

### RSA State

```typescript
interface RSAState {
  // Key generation
  p: bigint | null;
  q: bigint | null;
  n: bigint | null;
  phi: bigint | null;
  e: bigint | null;
  d: bigint | null;
  
  // Public/Private keys
  publicKey: { n: bigint; e: bigint } | null;
  privateKey: { n: bigint; d: bigint } | null;
  
  // Encryption
  plaintext: string;
  plaintextNumber: bigint | null;
  ciphertext: bigint | null;
  
  // Decryption
  decryptedNumber: bigint | null;
  decryptedText: string | null;
  
  // Visualization
  steps: RSAStep[];
  currentPhase: 'keyGen' | 'encrypt' | 'decrypt';
}

interface RSAStep {
  phase: 'keyGen' | 'encrypt' | 'decrypt';
  operation: string;
  values: Record<string, bigint | string>;
  description: string;
  calculation?: string;
}
```

### Hash State

```typescript
interface HashState {
  // Input
  message: string;
  messageBytes: Uint8Array;
  
  // Processing
  algorithm: 'sha256' | 'md5' | 'sha1';
  blocks: Uint8Array[];
  currentBlock: number;
  currentRound: number;
  
  // SHA-256 specific
  workingVariables: {
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;
    g: number;
    h: number;
  };
  messageSchedule: number[];
  
  // Output
  hash: string | null;
  hashBytes: Uint8Array | null;
  
  // Comparison
  compareWith: HashComparison | null;
}

interface HashComparison {
  message1: string;
  hash1: string;
  message2: string;
  hash2: string;
  differences: number; // Bit differences
}
```

---

## Cryptographic Implementation

### AES Implementation Strategy

```typescript
/**
 * Educational AES implementation
 * Optimized for visualization, not performance
 */
class EducationalAES {
  private keySize: 128 | 192 | 256;
  private rounds: number;
  private roundKeys: Uint8Array[];
  private onStep: (step: AESStep) => void;
  
  constructor(keySize: 128 | 192 | 256, onStep: (step: AESStep) => void) {
    this.keySize = keySize;
    this.rounds = keySize === 128 ? 10 : keySize === 192 ? 12 : 14;
    this.onStep = onStep;
  }
  
  /**
   * Encrypt with step-by-step callbacks
   */
  encrypt(plaintext: Uint8Array, key: Uint8Array): Uint8Array {
    // Key expansion
    this.roundKeys = this.expandKey(key);
    
    // Initialize state
    let state = new Uint8Array(plaintext);
    
    // Initial round
    state = this.addRoundKey(state, this.roundKeys[0], 0);
    
    // Main rounds
    for (let round = 1; round < this.rounds; round++) {
      state = this.subBytes(state, round);
      state = this.shiftRows(state, round);
      state = this.mixColumns(state, round);
      state = this.addRoundKey(state, this.roundKeys[round], round);
    }
    
    // Final round (no MixColumns)
    state = this.subBytes(state, this.rounds);
    state = this.shiftRows(state, this.rounds);
    state = this.addRoundKey(state, this.roundKeys[this.rounds], this.rounds);
    
    return state;
  }
  
  private subBytes(state: Uint8Array, round: number): Uint8Array {
    const stateBefore = new Uint8Array(state);
    const stateAfter = new Uint8Array(16);
    
    for (let i = 0; i < 16; i++) {
      stateAfter[i] = SBOX[state[i]];
    }
    
    this.onStep({
      round,
      operation: 'subBytes',
      stateBefore,
      stateAfter,
      description: 'Each byte in the state is replaced with its value from the S-box'
    });
    
    return stateAfter;
  }
  
  // ... other methods
}
```

### RSA Implementation Strategy

```typescript
/**
 * Educational RSA implementation
 * Uses BigInt for large number support
 */
class EducationalRSA {
  private onStep: (step: RSAStep) => void;
  
  constructor(onStep: (step: RSAStep) => void) {
    this.onStep = onStep;
  }
  
  /**
   * Generate RSA key pair with visualization
   */
  generateKeyPair(bitSize: number = 2048): RSAKeyPair {
    // 1. Generate two large primes
    const p = this.generatePrime(bitSize / 2);
    this.onStep({
      phase: 'keyGen',
      operation: 'generateP',
      values: { p },
      description: 'Generated large prime number p'
    });
    
    const q = this.generatePrime(bitSize / 2);
    this.onStep({
      phase: 'keyGen',
      operation: 'generateQ',
      values: { q },
      description: 'Generated large prime number q'
    });
    
    // 2. Calculate n = p * q
    const n = p * q;
    this.onStep({
      phase: 'keyGen',
      operation: 'calculateN',
      values: { n, p, q },
      description: 'Calculated modulus n = p × q',
      calculation: `${p} × ${q} = ${n}`
    });
    
    // 3. Calculate φ(n) = (p-1)(q-1)
    const phi = (p - 1n) * (q - 1n);
    this.onStep({
      phase: 'keyGen',
      operation: 'calculatePhi',
      values: { phi },
      description: 'Calculated φ(n) = (p-1)(q-1)'
    });
    
    // 4. Choose e (commonly 65537)
    const e = 65537n;
    this.onStep({
      phase: 'keyGen',
      operation: 'chooseE',
      values: { e },
      description: 'Chose public exponent e = 65537'
    });
    
    // 5. Calculate d (modular multiplicative inverse)
    const d = this.modInverse(e, phi);
    this.onStep({
      phase: 'keyGen',
      operation: 'calculateD',
      values: { d },
      description: 'Calculated private exponent d = e⁻¹ mod φ(n)'
    });
    
    return {
      publicKey: { n, e },
      privateKey: { n, d }
    };
  }
  
  /**
   * Encrypt message
   */
  encrypt(message: bigint, publicKey: RSAPublicKey): bigint {
    const { n, e } = publicKey;
    
    // c = m^e mod n
    const ciphertext = this.modPow(message, e, n);
    
    this.onStep({
      phase: 'encrypt',
      operation: 'modularExponentiation',
      values: { message, e, n, ciphertext },
      description: 'Encrypted: c = m^e mod n',
      calculation: `${message}^${e} mod ${n} = ${ciphertext}`
    });
    
    return ciphertext;
  }
  
  // ... helper methods
}
```

### SHA-256 Implementation

```typescript
/**
 * Educational SHA-256 implementation
 * With step-by-step visualization
 */
class EducationalSHA256 {
  private onStep: (step: HashStep) => void;
  
  // SHA-256 constants
  private readonly K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
    // ... 64 constants
  ];
  
  constructor(onStep: (step: HashStep) => void) {
    this.onStep = onStep;
  }
  
  hash(message: Uint8Array): Uint8Array {
    // 1. Preprocessing
    const paddedMessage = this.padMessage(message);
    this.onStep({
      operation: 'padding',
      description: 'Added padding to make message multiple of 512 bits',
      data: { paddedMessage }
    });
    
    // 2. Initialize hash values
    let [a, b, c, d, e, f, g, h] = this.initialHashValues();
    
    // 3. Process each 512-bit block
    const blocks = this.splitIntoBlocks(paddedMessage);
    
    for (let blockIndex = 0; blockIndex < blocks.length; blockIndex++) {
      const block = blocks[blockIndex];
      
      // Create message schedule
      const W = this.createMessageSchedule(block);
      this.onStep({
        operation: 'messageSchedule',
        description: 'Created 64-word message schedule',
        data: { W, blockIndex }
      });
      
      // 64 rounds
      for (let round = 0; round < 64; round++) {
        const T1 = this.calculateT1(e, f, g, h, W[round], this.K[round]);
        const T2 = this.calculateT2(a, b, c);
        
        h = g;
        g = f;
        f = e;
        e = (d + T1) >>> 0;
        d = c;
        c = b;
        b = a;
        a = (T1 + T2) >>> 0;
        
        this.onStep({
          operation: 'round',
          description: `Round ${round + 1}/64`,
          data: { round, a, b, c, d, e, f, g, h, T1, T2 }
        });
      }
    }
    
    // 4. Produce final hash
    const hash = this.finalizeHash(a, b, c, d, e, f, g, h);
    return hash;
  }
  
  // ... helper methods
}
```

---

## Animation Strategy

### D3.js Integration

```typescript
/**
 * AES State Matrix Visualization
 */
class StateMatrixVisualization {
  private svg: d3.Selection<SVGSVGElement>;
  private cellSize = 60;
  private padding = 10;
  
  constructor(container: HTMLElement) {
    this.svg = d3.select(container)
      .append('svg')
      .attr('width', 4 * this.cellSize + 5 * this.padding)
      .attr('height', 4 * this.cellSize + 5 * this.padding);
  }
  
  updateState(state: Uint8Array, highlights: CellHighlight[] = []) {
    const data = Array.from(state).map((value, index) => ({
      value,
      row: Math.floor(index / 4),
      col: index % 4,
      highlight: highlights.find(h => 
        h.row === Math.floor(index / 4) && h.col === index % 4
      )
    }));
    
    // Bind data
    const cells = this.svg.selectAll('g.cell')
      .data(data, (d: any) => `${d.row}-${d.col}`);
    
    // Enter
    const cellsEnter = cells.enter()
      .append('g')
      .attr('class', 'cell')
      .attr('transform', d => 
        `translate(${d.col * (this.cellSize + this.padding)}, 
                    ${d.row * (this.cellSize + this.padding)})`
      );
    
    cellsEnter.append('rect')
      .attr('width', this.cellSize)
      .attr('height', this.cellSize)
      .attr('rx', 5);
    
    cellsEnter.append('text')
      .attr('x', this.cellSize / 2)
      .attr('y', this.cellSize / 2)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle');
    
    // Update (with transition)
    const cellsUpdate = cells.merge(cellsEnter);
    
    cellsUpdate.select('rect')
      .transition()
      .duration(500)
      .attr('fill', d => d.highlight ? d.highlight.color : '#2c3e50')
      .attr('opacity', d => d.highlight ? d.highlight.intensity : 1);
    
    cellsUpdate.select('text')
      .transition()
      .duration(500)
      .text(d => d.value.toString(16).padStart(2, '0').toUpperCase())
      .attr('fill', '#ecf0f1');
    
    // Exit
    cells.exit()
      .transition()
      .duration(300)
      .style('opacity', 0)
      .remove();
  }
  
  animateTransformation(
    fromState: Uint8Array,
    toState: Uint8Array,
    duration: number = 1000
  ) {
    // Create intermediate animation frames
    // Implementation depends on transformation type
  }
}
```

### Framer Motion Integration

```typescript
/**
 * Animated control panel
 */
const ControlPanel: React.FC = () => {
  const { isPlaying, play, pause, step } = useVisualization();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="control-panel"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={isPlaying ? pause : play}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={step}
      >
        <StepIcon />
      </motion.button>
    </motion.div>
  );
};
```

---

## Performance Optimizations

### Core Strategies

1. **Virtual Scrolling** for long step lists
2. **Memoization** of expensive calculations
3. **Web Workers** for crypto operations
4. **requestAnimationFrame** for smooth animations
5. **Code Splitting** for different algorithms
6. **Lazy Loading** of educational content

### Advanced Performance Techniques (2026 Best Practices)

#### 1. WebAssembly for Cryptography Performance

**Why WebAssembly:**
- 10-50x faster than JavaScript for computational cryptography
- Near-native performance for heavy mathematical operations
- Perfect for large key sizes (RSA 4096-bit, etc.)

```typescript
// wasm-crypto.ts
interface WasmCrypto {
  aes_encrypt(plaintext: Uint8Array, key: Uint8Array): Uint8Array;
  rsa_encrypt(message: Uint8Array, publicKey: Uint8Array): Uint8Array;
  sha256(data: Uint8Array): Uint8Array;
}

// Load WASM module
const loadWasmCrypto = async (): Promise<WasmCrypto> => {
  const wasm = await import('./crypto_wasm.wasm');
  return wasm.default();
};

// Usage in component
const useCryptoWasm = () => {
  const [wasmModule, setWasmModule] = useState<WasmCrypto | null>(null);
  
  useEffect(() => {
    loadWasmCrypto().then(setWasmModule);
  }, []);
  
  const encryptFast = (plaintext: string, key: string) => {
    if (!wasmModule) {
      // Fallback to JavaScript
      return encryptJS(plaintext, key);
    }
    
    const plaintextBytes = new TextEncoder().encode(plaintext);
    const keyBytes = new TextEncoder().encode(key);
    return wasmModule.aes_encrypt(plaintextBytes, keyBytes);
  };
  
  return { encryptFast, isWasmReady: !!wasmModule };
};
```

**When to Use:**
- ✅ Production crypto operations (actual encryption)
- ✅ Large key sizes (RSA 2048-bit+)
- ✅ Bulk operations
- ❌ Educational step-by-step (keep in JS for visibility)

#### 2. OffscreenCanvas for Animation Performance

**Benefits:**
- Move rendering off main thread
- 60fps animations even during heavy computation
- Parallel rendering + computation

```typescript
// animation.worker.ts
const canvas = new OffscreenCanvas(800, 600);
const ctx = canvas.getContext('2d')!;

self.onmessage = (e: MessageEvent) => {
  const { type, data } = e.data;
  
  if (type === 'render') {
    renderAESState(ctx, data);
    
    // Transfer bitmap back to main thread
    const bitmap = canvas.transferToImageBitmap();
    self.postMessage({ type: 'frame', bitmap }, [bitmap]);
  }
};

// Main thread component
const AESVisualization: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const workerRef = useRef<Worker>();
  
  useEffect(() => {
    const canvas = canvasRef.current!;
    const offscreen = canvas.transferControlToOffscreen();
    
    workerRef.current = new Worker(
      new URL('./animation.worker.ts', import.meta.url)
    );
    
    workerRef.current.postMessage(
      { type: 'init', canvas: offscreen },
      [offscreen]
    );
    
    workerRef.current.onmessage = (e) => {
      if (e.data.type === 'frame') {
        const ctx = canvas.getContext('bitmaprenderer')!;
        ctx.transferFromImageBitmap(e.data.bitmap);
      }
    };
  }, []);
  
  return <canvas ref={canvasRef} width={800} height={600} />;
};
```

#### 3. React 19 Performance Features

**Server Components (for static content):**
```typescript
// LessonContent.server.tsx
async function LessonContent({ lessonId }: { lessonId: string }) {
  // Runs on server, zero client JS
  const lesson = await db.lessons.findById(lessonId);
  
  return (
    <article>
      <h1>{lesson.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
    </article>
  );
}
```

**Transitions API (smooth state updates):**
```typescript
import { useTransition } from 'react';

const useVisualization = () => {
  const [isPending, startTransition] = useTransition();
  const [step, setStep] = useState(0);
  
  const nextStep = () => {
    startTransition(() => {
      // Heavy computation, but UI stays responsive
      setStep(prev => prev + 1);
      recalculateVisualization();
    });
  };
  
  return { step, nextStep, isPending };
};
```

#### 4. Performance Budgets

**Strict Limits:**
```javascript
const performanceBudgets = {
  // Bundle sizes (gzipped)
  javascript: {
    initial: '150KB',  // First load
    route: '50KB',     // Per route
    component: '25KB'  // Per lazy component
  },
  
  // Runtime performance
  metrics: {
    FCP: '1.0s',   // First Contentful Paint
    LCP: '2.0s',   // Largest Contentful Paint
    FID: '50ms',   // First Input Delay
    CLS: '0.05',   // Cumulative Layout Shift
    TTI: '3.0s',   // Time to Interactive
    TBT: '150ms'   // Total Blocking Time
  },
  
  // Animation performance
  fps: {
    target: 60,
    minimum: 30,
    budget: '16.67ms/frame'
  }
};
```

**Automated Monitoring:**
```yaml
# .github/workflows/performance.yml
- name: Lighthouse CI
  run: |
    lhci autorun --config=lighthouserc.json
    
- name: Bundle Size Check
  run: |
    npx bundlewatch
    
- name: Performance Budget
  run: |
    if [ $LIGHTHOUSE_SCORE -lt 90 ]; then
      echo "Performance budget exceeded!"
      exit 1
    fi
```

#### 5. Code Splitting Strategy

**Route-based Splitting:**
```typescript
// App.tsx
import { lazy, Suspense } from 'react';

const AESPage = lazy(() => import('./pages/AES'));
const RSAPage = lazy(() => import('./pages/RSA'));
const HashingPage = lazy(() => import('./pages/Hashing'));

const App = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <Routes>
      <Route path="/aes" element={<AESPage />} />
      <Route path="/rsa" element={<RSAPage />} />
      <Route path="/hashing" element={<HashingPage />} />
    </Routes>
  </Suspense>
);
```

**Component-based Splitting:**
```typescript
// Heavy 3D visualization loaded on-demand
const ThreeDVisualization = lazy(() => 
  import('./components/ThreeDVisualization')
);

const useConditional3D = () => {
  const [enable3D, setEnable3D] = useState(false);
  
  return {
    enable3D,
    toggle: () => setEnable3D(prev => !prev),
    component: enable3D ? <ThreeDVisualization /> : null
  };
};
```

#### 6. Image & Asset Optimization

**Modern Image Formats:**
```html
<picture>
  <!-- Modern browsers -->
  <source srcset="/images/hero.avif" type="image/avif" />
  <source srcset="/images/hero.webp" type="image/webp" />
  
  <!-- Fallback -->
  <img 
    src="/images/hero.jpg" 
    alt="Encryption Visualizer"
    loading="lazy"
    decoding="async"
  />
</picture>
```

**Responsive Images:**
```typescript
const ResponsiveImage: React.FC<{ src: string }> = ({ src }) => (
  <img
    src={src}
    srcSet={`
      ${src}-320.webp 320w,
      ${src}-640.webp 640w,
      ${src}-960.webp 960w,
      ${src}-1280.webp 1280w
    `}
    sizes="(max-width: 600px) 320px, (max-width: 1200px) 640px, 1280px"
    loading="lazy"
  />
);
```

#### 7. Memory Management

**Cleanup Pattern:**
```typescript
const useVisualization = () => {
  const [state, setState] = useState<VisualizationState>();
  const animationFrameRef = useRef<number>();
  const workerRef = useRef<Worker>();
  
  useEffect(() => {
    // Setup
    workerRef.current = new Worker(/* ... */);
    
    // Cleanup to prevent memory leaks
    return () => {
      // Cancel pending animations
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      // Terminate workers
      workerRef.current?.terminate();
      
      // Clear state
      setState(undefined);
    };
  }, []);
};
```

#### 8. Performance Monitoring

**Real User Monitoring (RUM):**
```typescript
// performance-monitor.ts
import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals';

const sendToAnalytics = (metric: Metric) => {
  const body = JSON.stringify(metric);
  
  // Use sendBeacon for reliable delivery
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/analytics', body);
  } else {
    fetch('/analytics', { body, method: 'POST', keepalive: true });
  }
};

// Track all Core Web Vitals
onCLS(sendToAnalytics);
onFID(sendToAnalytics);
onFCP(sendToAnalytics);
onLCP(sendToAnalytics);
onTTFB(sendToAnalytics);
```

**Performance API:**
```typescript
// Track custom metrics
const measureVisualizationPerformance = () => {
  performance.mark('visualization-start');
  
  // ... render visualization ...
  
  performance.mark('visualization-end');
  performance.measure(
    'visualization-duration',
    'visualization-start',
    'visualization-end'
  );
  
  const measure = performance.getEntriesByName('visualization-duration')[0];
  console.log(`Visualization took ${measure.duration}ms`);
  
  // Send to analytics
  if (measure.duration > 1000) {
    reportSlowVisualization(measure.duration);
  }
};
```

### Example: Web Worker for AES

```typescript
// aes.worker.ts
self.onmessage = (e: MessageEvent) => {
  const { plaintext, key, keySize } = e.data;
  
  const aes = new EducationalAES(keySize, (step) => {
    self.postMessage({ type: 'step', step });
  });
  
  const ciphertext = aes.encrypt(plaintext, key);
  
  self.postMessage({ type: 'complete', ciphertext });
};

// Usage in React
const useAESWorker = () => {
  const workerRef = useRef<Worker>();
  
  useEffect(() => {
    workerRef.current = new Worker(
      new URL('./aes.worker.ts', import.meta.url)
    );
    
    workerRef.current.onmessage = (e) => {
      if (e.data.type === 'step') {
        handleStep(e.data.step);
      } else if (e.data.type === 'complete') {
        handleComplete(e.data.ciphertext);
      }
    };
    
    return () => workerRef.current?.terminate();
  }, []);
  
  const encrypt = (plaintext, key, keySize) => {
    workerRef.current?.postMessage({ plaintext, key, keySize });
  };
  
  return { encrypt };
};
```

---

## Accessibility Features

### Requirements

1. **Keyboard Navigation**
   - Tab through all interactive elements
   - Space/Enter to activate buttons
   - Arrow keys for step navigation

2. **Screen Reader Support**
   - ARIA labels for all controls
   - Live regions for step updates
   - Descriptive alt text

3. **Visual Accessibility**
   - High contrast mode
   - Adjustable text size
   - Color-blind friendly palette

4. **Cognitive Accessibility**
   - Clear, simple language
   - Progress indicators
   - Ability to pause/resume

### Implementation Example

```typescript
const VisualizationContainer: React.FC = () => {
  const { currentStep, totalSteps } = useVisualization();
  
  return (
    <div
      role="region"
      aria-label="Encryption visualization"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="sr-only">
        Step {currentStep} of {totalSteps}: {stepDescription}
      </div>
      
      {/* Visual content */}
    </div>
  );
};
```

---

## Testing Strategy

### Unit Tests (Vitest)

```typescript
describe('EducationalAES', () => {
  it('should correctly perform SubBytes operation', () => {
    const aes = new EducationalAES(128, jest.fn());
    const input = new Uint8Array([0x00, 0x10, 0x20, ...]);
    const output = aes.subBytes(input, 1);
    
    expect(output[0]).toBe(SBOX[0x00]);
    expect(output[1]).toBe(SBOX[0x10]);
  });
  
  it('should match official AES test vectors', () => {
    const plaintext = hexToBytes('00112233445566778899aabbccddeeff');
    const key = hexToBytes('000102030405060708090a0b0c0d0e0f');
    
    const aes = new EducationalAES(128, jest.fn());
    const ciphertext = aes.encrypt(plaintext, key);
    
    expect(bytesToHex(ciphertext)).toBe(
      '69c4e0d86a7b0430d8cdb78070b4c55a'
    );
  });
});
```

### Integration Tests (Playwright)

```typescript
test('AES visualization completes successfully', async ({ page }) => {
  await page.goto('/');
  
  // Select AES algorithm
  await page.click('[data-testid="aes-card"]');
  
  // Enter input
  await page.fill('[data-testid="plaintext-input"]', 'Hello World!');
  await page.fill('[data-testid="key-input"]', 'SecretKey123456');
  
  // Start visualization
  await page.click('[data-testid="play-button"]');
  
  // Wait for completion
  await page.waitForSelector('[data-testid="output-panel"]', {
    state: 'visible',
    timeout: 30000
  });
  
  // Verify output exists
  const output = await page.textContent('[data-testid="ciphertext-output"]');
  expect(output).not.toBe('');
});
```

---

## Security Considerations

### Input Validation

```typescript
function validatePlaintext(input: string): ValidationResult {
  if (input.length === 0) {
    return { valid: false, error: 'Input cannot be empty' };
  }
  
  if (input.length > 1024) {
    return { valid: false, error: 'Input too long (max 1024 characters)' };
  }
  
  // Check for injection attempts
  if (/<script|javascript:|onerror=/i.test(input)) {
    return { valid: false, error: 'Invalid characters detected' };
  }
  
  return { valid: true };
}
```

### Content Security Policy

```html
<meta http-equiv="Content-Security-Policy" 
      content="
        default-src 'self';
        script-src 'self' 'wasm-unsafe-eval';
        style-src 'self' 'unsafe-inline';
        img-src 'self' data: https:;
        font-src 'self';
        connect-src 'self';
      ">
```

---

## Deployment Configuration

### Vite Build Config

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'viz-vendor': ['d3', 'framer-motion'],
          'crypto-lib': ['./src/lib/crypto']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'd3']
  }
});
```

### Vercel Configuration

```json
{
  "framework": "vite",
  "buildCommand": "pnpm build",
  "outputDirectory": "dist",
  "installCommand": "pnpm install",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

---

This technical specification provides the foundation for building a robust, performant, and educational encryption visualization platform.
