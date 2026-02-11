import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const resolved = theme === 'system' ? getSystemTheme() : theme;

  if (resolved === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }

  return resolved;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'dark',
      resolvedTheme: 'dark',

      setTheme: (theme: Theme) => {
        const resolved = applyTheme(theme);
        set({ theme, resolvedTheme: resolved });
      },
    }),
    {
      name: 'cryptoviz-theme',
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyTheme(state.theme);
        }
      },
    }
  )
);

// Initialize theme on first load
if (typeof window !== 'undefined') {
  const stored = localStorage.getItem('cryptoviz-theme');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      applyTheme(parsed.state?.theme || 'dark');
    } catch {
      applyTheme('dark');
    }
  } else {
    applyTheme('dark');
  }

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const { theme, setTheme } = useThemeStore.getState();
    if (theme === 'system') {
      setTheme('system');
    }
  });
}
