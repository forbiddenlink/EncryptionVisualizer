import { useEffect, useCallback } from 'react';
import { useVisualizationStore } from '@/store/visualizationStore';

interface ShortcutConfig {
  enabled?: boolean;
}

export function useKeyboardShortcuts(config: ShortcutConfig = {}) {
  const { enabled = true } = config;

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

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in input fields
      const target = event.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      switch (event.code) {
        case 'Space':
          event.preventDefault();
          if (isPlaying) {
            pause();
          } else {
            play();
          }
          break;

        case 'ArrowRight':
          event.preventDefault();
          if (currentStep < totalSteps - 1) {
            nextStep();
          }
          break;

        case 'ArrowLeft':
          event.preventDefault();
          if (currentStep > 0) {
            previousStep();
          }
          break;

        case 'KeyR':
          if (!event.metaKey && !event.ctrlKey) {
            event.preventDefault();
            reset();
          }
          break;

        case 'Home':
          event.preventDefault();
          reset();
          break;

        case 'End':
          event.preventDefault();
          // Go to last step
          if (totalSteps > 0) {
            useVisualizationStore.getState().goToStep(totalSteps - 1);
          }
          break;

        // Speed controls with number keys
        case 'Digit1':
          event.preventDefault();
          setSpeed(0.5);
          break;

        case 'Digit2':
          event.preventDefault();
          setSpeed(1);
          break;

        case 'Digit3':
          event.preventDefault();
          setSpeed(2);
          break;

        case 'Digit4':
          event.preventDefault();
          setSpeed(4);
          break;

        // Speed increase/decrease with +/-
        case 'Equal':
        case 'NumpadAdd':
          event.preventDefault();
          {
            const speeds = [0.5, 1, 2, 4];
            const currentIndex = speeds.indexOf(speed);
            if (currentIndex < speeds.length - 1) {
              setSpeed(speeds[currentIndex + 1]);
            }
          }
          break;

        case 'Minus':
        case 'NumpadSubtract':
          event.preventDefault();
          {
            const speeds = [0.5, 1, 2, 4];
            const currentIndex = speeds.indexOf(speed);
            if (currentIndex > 0) {
              setSpeed(speeds[currentIndex - 1]);
            }
          }
          break;
      }
    },
    [isPlaying, currentStep, totalSteps, speed, play, pause, reset, nextStep, previousStep, setSpeed]
  );

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled, handleKeyDown]);
}

export const KEYBOARD_SHORTCUTS = [
  { key: 'Space', action: 'Play / Pause' },
  { key: '\u2190', action: 'Previous step' },
  { key: '\u2192', action: 'Next step' },
  { key: 'R', action: 'Reset' },
  { key: 'Home', action: 'Go to first step' },
  { key: 'End', action: 'Go to last step' },
  { key: '1-4', action: 'Set speed (0.5x, 1x, 2x, 4x)' },
  { key: '+/-', action: 'Increase / Decrease speed' },
] as const;
