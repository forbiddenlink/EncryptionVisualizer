import React from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { AnimatePresence, m } from 'framer-motion';
import { useToastStore } from '@/store/toastStore';
import type { ToastType } from '@/store/toastStore';

const iconMap: Record<ToastType, React.FC<{ className?: string }>> = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
};

const colorMap: Record<ToastType, string> = {
  success: 'text-emerald-500 dark:text-emerald-400',
  error: 'text-red-500 dark:text-red-400',
  info: 'text-cyber-blue dark:text-cyber-cyan',
};

const borderMap: Record<ToastType, string> = {
  success: 'border-emerald-200 dark:border-emerald-500/20',
  error: 'border-red-200 dark:border-red-500/20',
  info: 'border-blue-200 dark:border-cyber-blue/20',
};

export const ToastContainer: React.FC = () => {
  const toasts = useToastStore((s) => s.toasts);
  const removeToast = useToastStore((s) => s.removeToast);

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => {
          const Icon = iconMap[toast.type];
          return (
            <m.div
              key={toast.id}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 80, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border bg-white/90 dark:bg-cyber-surface/90 backdrop-blur-xl shadow-lg ${borderMap[toast.type]}`}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${colorMap[toast.type]}`} />
              <span className="text-sm font-medium text-slate-800 dark:text-slate-200 pr-2">
                {toast.message}
              </span>
              <button
                onClick={() => removeToast(toast.id)}
                className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex-shrink-0"
                aria-label="Dismiss notification"
              >
                <X className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </m.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
