import { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';
import { m, AnimatePresence } from 'framer-motion';

export const OfflineIndicator: React.FC = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const goOffline = () => setIsOffline(true);
    const goOnline = () => setIsOffline(false);

    window.addEventListener('offline', goOffline);
    window.addEventListener('online', goOnline);

    return () => {
      window.removeEventListener('offline', goOffline);
      window.removeEventListener('online', goOnline);
    };
  }, []);

  return (
    <AnimatePresence>
      {isOffline && (
        <m.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 glass-card px-4 py-2 flex items-center gap-3 shadow-lg border border-yellow-300 dark:border-yellow-500/30 bg-yellow-50/90 dark:bg-yellow-500/10"
        >
          <WifiOff className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
          <p className="text-sm text-yellow-700 dark:text-yellow-300 font-medium">
            You're offline -- cached content available
          </p>
        </m.div>
      )}
    </AnimatePresence>
  );
};
