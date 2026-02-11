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

  // Enable keyboard shortcuts
  useKeyboardShortcuts();

  const progress = totalSteps > 0 ? ((currentStep + 1) / totalSteps) * 100 : 0;

  return (
    <div className="glass-card p-4 sm:p-6 space-y-4 sm:space-y-6 relative overflow-hidden group">
      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      
      <div className="relative z-10">
        {/* Main controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center sm:justify-start">
            {/* Reset Button */}
            <button
              onClick={reset}
              className="p-2 sm:p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 group/btn focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              title="Reset (R)"
              aria-label="Reset visualization"
            >
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 group-hover/btn:rotate-180 transition-transform duration-500" />
            </button>
            
            {/* Previous Button */}
            <button
              onClick={previousStep}
              className="p-2 sm:p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              disabled={currentStep === 0}
              title="Previous Step (\u2190)"
              aria-label="Go to previous step"
            >
              <SkipBack className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
            </button>
            
            {/* Play/Pause Button - Hero */}
            <button
              onClick={isPlaying ? pause : play}
              className="relative group/play focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-2xl"
              title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
              aria-label={isPlaying ? 'Pause visualization' : 'Play visualization'}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur-lg opacity-50 group-hover/play:opacity-75 animate-glow" />
              <div className="relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 sm:gap-3">
                {isPlaying ? (
                  <Pause className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white" />
                ) : (
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 text-white fill-white" />
                )}
                <span className="font-bold text-white text-sm sm:text-base">
                  {isPlaying ? 'Pause' : 'Play'}
                </span>
              </div>
            </button>
            
            {/* Next Button */}
            <button
              onClick={nextStep}
              className="p-2 sm:p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              disabled={currentStep >= totalSteps - 1}
              title="Next Step (\u2192)"
              aria-label="Go to next step"
            >
              <SkipForward className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
            </button>
          </div>

          {/* Speed Control */}
          <div className="flex items-center gap-3 sm:gap-4 glass-card px-3 sm:px-4 py-2 sm:py-3 border-white/10 w-full sm:w-auto justify-center">
            <div className="flex items-center gap-2">
              <Gauge className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
              <span className="text-xs sm:text-sm font-semibold text-white/70">Speed</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              {[0.5, 1, 2, 4].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${
                    speed === s
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/50'
                      : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>

            {/* Keyboard shortcuts button */}
            <button
              onClick={() => setShowShortcuts(!showShortcuts)}
              className={`p-2 sm:p-3 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${
                showShortcuts
                  ? 'bg-gradient-to-r from-blue-600/30 to-cyan-500/30 border border-blue-500/50'
                  : 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20'
              }`}
              title="Keyboard Shortcuts (?)"
              aria-label="Show keyboard shortcuts"
              aria-expanded={showShortcuts}
            >
              <Keyboard className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
            </button>
          </div>
        </div>

        {/* Keyboard Shortcuts Panel */}
        {showShortcuts && (
          <div className="mt-4 p-4 glass-card bg-blue-500/5 border-blue-500/20 rounded-xl">
            <h4 className="text-sm font-bold text-white/90 mb-3 flex items-center gap-2">
              <Keyboard className="w-4 h-4 text-blue-400" />
              Keyboard Shortcuts
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {KEYBOARD_SHORTCUTS.map(({ key, action }) => (
                <div key={key} className="flex items-center gap-2">
                  <kbd className="px-2 py-1 bg-white/10 border border-white/20 rounded text-white/90 font-mono min-w-[2.5rem] text-center">
                    {key}
                  </kbd>
                  <span className="text-white/60">{action}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Progress Section */}
        <div className="space-y-2 sm:space-y-3">
          <div className="flex justify-between items-center text-xs sm:text-sm">
            <span className="font-semibold text-white/70">
              Step <span className="text-cyan-400 font-bold">{currentStep + 1}</span> of{' '}
              <span className="text-blue-400 font-bold">{totalSteps || 1}</span>
            </span>
            <span className="font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent text-base sm:text-lg">
              {Math.round(progress)}%
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="relative h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
            {/* Background glow */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-sm"
              style={{ width: `${progress}%` }}
            />
            {/* Actual progress */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 rounded-full transition-all duration-500 ease-out shadow-lg shadow-blue-500/50"
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent shimmer" />
            </div>
            {/* Glow dot at the end */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg shadow-cyan-500/50 border-2 border-cyan-400 transition-all duration-500"
              style={{ left: `calc(${progress}% - 8px)` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
