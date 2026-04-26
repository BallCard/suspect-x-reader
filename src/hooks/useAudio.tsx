/**
 * useAudio - Audio effects hook for Suspect X
 * Provides sound effect functions with global mute control
 */
import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from 'react';
import {
  playHoverSound,
  playClickSound,
  playOpenSound,
  playCloseSound,
  playRevealSound,
  playClueFoundSound,
  playCriticalClueSound,
  playChapterCompleteSound,
  playChapterUnlockedSound,
  playLockedClickSound,
  playErrorSound,
} from '../lib/audio';

interface AudioContextValue {
  soundEnabled: boolean;
  toggleSound: () => void;
  setSoundEnabled: (enabled: boolean) => void;
  // Basic
  hover: () => void;
  click: () => void;
  open: () => void;
  close: () => void;
  // Reading
  reveal: () => void;
  clueFound: () => void;
  criticalClue: () => void;
  chapterComplete: () => void;
  chapterUnlocked: () => void;
  lockedClick: () => void;
  error: () => void;
}

const AudioContext = createContext<AudioContextValue | null>(null);

const STORAGE_KEY = 'suspectx-sound-enabled';

export function AudioProvider({ children }: { children: ReactNode }) {
  // Initialize from localStorage
  const [soundEnabled, setSoundEnabledState] = useState(() => {
    if (typeof window === 'undefined') return true;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) return stored === 'true';
    return true; // Default enabled
  });

  // Debounce rapid toggles
  const toggleTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setSoundEnabled = useCallback((enabled: boolean) => {
    setSoundEnabledState(enabled);
    localStorage.setItem(STORAGE_KEY, String(enabled));
  }, []);

  const toggleSound = useCallback(() => {
    // Debounce toggle to prevent rapid clicking issues
    if (toggleTimeout.current) return;
    toggleTimeout.current = setTimeout(() => {
      toggleTimeout.current = null;
    }, 200);
    setSoundEnabled(!soundEnabled);
  }, [soundEnabled, setSoundEnabled]);

  // Wrapper functions that check soundEnabled
  const hover = useCallback(() => {
    if (soundEnabled) playHoverSound();
  }, [soundEnabled]);

  const click = useCallback(() => {
    if (soundEnabled) playClickSound();
  }, [soundEnabled]);

  const open = useCallback(() => {
    if (soundEnabled) playOpenSound();
  }, [soundEnabled]);

  const close = useCallback(() => {
    if (soundEnabled) playCloseSound();
  }, [soundEnabled]);

  const reveal = useCallback(() => {
    if (soundEnabled) playRevealSound();
  }, [soundEnabled]);

  const clueFound = useCallback(() => {
    if (soundEnabled) playClueFoundSound();
  }, [soundEnabled]);

  const criticalClue = useCallback(() => {
    if (soundEnabled) playCriticalClueSound();
  }, [soundEnabled]);

  const chapterComplete = useCallback(() => {
    if (soundEnabled) playChapterCompleteSound();
  }, [soundEnabled]);

  const chapterUnlocked = useCallback(() => {
    if (soundEnabled) playChapterUnlockedSound();
  }, [soundEnabled]);

  const lockedClick = useCallback(() => {
    if (soundEnabled) playLockedClickSound();
  }, [soundEnabled]);

  const error = useCallback(() => {
    if (soundEnabled) playErrorSound();
  }, [soundEnabled]);

  return (
    <AudioContext.Provider
      value={{
        soundEnabled,
        toggleSound,
        setSoundEnabled,
        hover,
        click,
        open,
        close,
        reveal,
        clueFound,
        criticalClue,
        chapterComplete,
        chapterUnlocked,
        lockedClick,
        error,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio(): AudioContextValue {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
}
