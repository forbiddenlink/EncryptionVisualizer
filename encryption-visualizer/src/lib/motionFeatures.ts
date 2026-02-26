// Lazy-loaded motion features for reduced bundle size
// This reduces Framer Motion from ~34KB to ~5KB initial load
// See: https://motion.dev/docs/react-reduce-bundle-size

import { domAnimation } from 'framer-motion';

// domAnimation includes:
// - animate, exit, initial props
// - AnimatePresence
// - Variants
// - Transitions
// - Layout animations (basic)

// For full features including drag, use domMax instead
export const motionFeatures = domAnimation;
