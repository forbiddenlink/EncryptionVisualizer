import { useState, useEffect } from 'react';
import { useAccessibilityStore } from '@/store/accessibilityStore';

const QUERY = '(prefers-reduced-motion: reduce)';

function getInitialState(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(QUERY).matches;
}

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(getInitialState);
  const userOverride = useAccessibilityStore((state) => state.reduceMotion);

  useEffect(() => {
    const mediaQuery = window.matchMedia(QUERY);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // User override takes precedence if explicitly set
  if (userOverride !== null) {
    return userOverride;
  }

  return prefersReducedMotion;
}
