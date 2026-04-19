import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, Gauge, Keyboard } from 'lucide-react';
import { useVisualizationStore } from '@/store/visualizationStore';
import { useKeyboardShortcuts, KEYBOARD_SHORTCUTS } from '@/hooks/useKeyboardShortcuts';

export const PlaybackControls: React.FC = () => {
  const [showShortcuts, setShowShortcuts] = useState(false);

  const {
    isPlaying,
    currentStep,
    totalSteps,
    speed,
    play,
    pause,
    reset,
    nextStep,
    previousStep,
    setSpeed,
  } = useVisualizationStore();

  useKeyboardShortcuts();

  const progress = totalSteps > 0 ? ((currentStep + 1) / totalSteps) * 100 : 0;

  return (
    <div className="glass-card p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Main controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center sm:justify-start">
          {/* Reset Button */}
          <button
            onClick={reset}
            className="min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 p-2.5 sm:p-3 bg-slate-100 dark:bg-cyber-surface hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-white/5 rounded-lg transition-all duration-150 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-cyber-blue shadow-sm flex items-center justify-center"
            title="Reset (R)"
            aria-label="Reset visualization"
          >
            <RotateCcw className="w-5 h-5 sm:w-5 sm:h-5 text-slate-600 dark:text-slate-400" />
          </button>

          {/* Previous Button */}
          <button
            onClick={previousStep}
            className="min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 p-2.5 sm:p-3 bg-slate-100 dark:bg-cyber-surface hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-white/5 rounded-lg transition-all duration-150 active:scale-[0.98] disabled:opacity-40 disabled:active:scale-100 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-cyber-blue shadow-sm flex items-center justify-center"
            disabled={currentStep === 0}
            title="Previous Step (←)"
            aria-label="Go to previous step"
          >
            <SkipBack className="w-5 h-5 sm:w-5 sm:h-5 text-slate-600 dark:text-slate-400" />
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={isPlaying ? pause : play}
            className="min-h-[44px] px-6 sm:px-8 py-3 sm:py-4 bg-cyber-blue hover:bg-cyber-cyan hover:text-cyber-dark text-white rounded-lg transition-all duration-150 active:scale-[0.98] flex items-center gap-2 sm:gap-3 focus:outline-none focus:ring-2 focus:ring-cyber-cyan focus:ring-offset-2 focus:ring-offset-slate-950 shadow-[inset_0_1px_rgba(255,255,255,0.2)]"
            title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
            aria-label={isPlaying ? 'Pause visualization' : 'Play visualization'}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current" />
            )}
            <span className="font-semibold text-sm sm:text-base tracking-tight">
              {isPlaying ? 'Pause' : 'Play'}
            </span>
          </button>

          {/* Next Button */}
          <button
            onClick={nextStep}
            className="min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 p-2.5 sm:p-3 bg-slate-100 dark:bg-cyber-surface hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-white/5 rounded-lg transition-all duration-150 active:scale-[0.98] disabled:opacity-40 disabled:active:scale-100 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-cyber-blue shadow-sm flex items-center justify-center"
            disabled={currentStep >= totalSteps - 1}
            title="Next Step (→)"
            aria-label="Go to next step"
          >
            <SkipForward className="w-5 h-5 sm:w-5 sm:h-5 text-slate-600 dark:text-slate-400" />
          </button>
        </div>

        {/* Speed Control */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2 sm:py-3 bg-slate-100 dark:bg-cyber-surface border border-slate-200 dark:border-white/5 rounded-lg w-full sm:w-auto justify-center shadow-surface">
          <div className="flex items-center gap-2">
            <Gauge className="w-3 h-3 sm:w-4 sm:h-4 text-slate-500 dark:text-slate-400" />
            <span className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400">Speed</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            {[0.5, 1, 2, 4].map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs font-semibold transition-all duration-150 active:scale-95 ${
                  speed === s
                    ? 'bg-cyber-blue text-white shadow-[0_0_10px_rgba(59,130,246,0.3)]'
                    : 'bg-white dark:bg-cyber-dark text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:border-white/20 border border-slate-200 dark:border-white/5'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>

          {/* Keyboard shortcuts button */}
          <button
            onClick={() => setShowShortcuts(!showShortcuts)}
            className={`p-2 sm:p-2.5 rounded-lg transition-all duration-150 active:scale-95 focus:outline-none focus:ring-2 focus:ring-cyber-blue ${
              showShortcuts
                ? 'bg-cyber-blue text-white shadow-[0_0_10px_rgba(59,130,246,0.3)]'
                : 'bg-white dark:bg-cyber-dark text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:border-white/20 border border-slate-200 dark:border-white/5'
            }`}
            title="Keyboard Shortcuts (?)"
            aria-label="Show keyboard shortcuts"
            aria-expanded={showShortcuts}
          >
            <Keyboard className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Keyboard Shortcuts Panel */}
      {showShortcuts && (
        <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <Keyboard className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            Keyboard Shortcuts
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {KEYBOARD_SHORTCUTS.map(({ key, action }) => (
              <div key={key} className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded text-slate-700 dark:text-slate-300 font-mono min-w-[2.5rem] text-center">
                  {key}
                </kbd>
                <span className="text-slate-600 dark:text-slate-400">{action}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Progress Section */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs sm:text-sm">
          <span className="text-slate-600 dark:text-slate-400">
            Step <span className="font-medium text-slate-900 dark:text-white">{currentStep + 1}</span> of{' '}
            <span className="font-medium text-slate-900 dark:text-white">{totalSteps || 1}</span>
          </span>
          <span className="font-medium text-slate-900 dark:text-white">
            {Math.round(progress)}%
          </span>
        </div>

        {/* Progress Bar - larger touch target on mobile */}
        <div className="relative py-2 -my-2 cursor-pointer touch-none" aria-hidden="true">
          <div className="relative h-1.5 sm:h-1.5 bg-slate-200 dark:bg-cyber-dark/80 rounded-full overflow-hidden shadow-inner">
            <div
              className="absolute inset-y-0 left-0 bg-cyber-blue shadow-[0_0_8px_rgba(59,130,246,0.8)] rounded-full transition-all duration-200 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
