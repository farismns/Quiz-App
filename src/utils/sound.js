import { useCallback, useEffect, useRef } from "react";

const SOUND_PREF_KEY = "quizSoundEnabled";

export const getSoundPreference = () => {
  const stored = localStorage.getItem(SOUND_PREF_KEY);
  return stored === null ? true : stored === "true";
};

export const setSoundPreference = (enabled) => {
  localStorage.setItem(SOUND_PREF_KEY, enabled ? "true" : "false");
};

const createAudio = (src) => {
  const audio = new Audio(src);
  audio.preload = "auto";
  return audio;
};

export const useSoundEffects = (enabled, sources) => {
  const correctRef = useRef(null);
  const wrongRef = useRef(null);
  const resultRef = useRef(null);

  useEffect(() => {
    if (!sources?.correct || !sources?.wrong || !sources?.result) return;
    if (!correctRef.current) correctRef.current = createAudio(sources.correct);
    if (!wrongRef.current) wrongRef.current = createAudio(sources.wrong);
    if (!resultRef.current) resultRef.current = createAudio(sources.result);
  }, [sources]);

  const resetAndPlay = useCallback(
    (ref) => {
      if (!enabled || !ref.current) return;
      ref.current.pause();
      ref.current.currentTime = 0;
      ref.current.play().catch(() => {
        // Ignore autoplay warnings and silent failures.
      });
    },
    [enabled],
  );

  const playCorrectSound = useCallback(() => resetAndPlay(correctRef), [resetAndPlay]);
  const playWrongSound = useCallback(() => resetAndPlay(wrongRef), [resetAndPlay]);
  const playResultSound = useCallback(() => resetAndPlay(resultRef), [resetAndPlay]);

  return {
    playCorrectSound,
    playWrongSound,
    playResultSound,
  };
};
