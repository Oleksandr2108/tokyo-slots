import { useCallback, useEffect, useRef } from "react";

interface UseSoundOptions {
  volume?: number;
  loop?: boolean;
  preload?: "none" | "metadata" | "auto";
}

export const useSound = (src: string, options: UseSoundOptions = {}) => {
  const { volume = 1, loop = false, preload = "auto" } = options;
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(src);
    audio.preload = preload;
    audio.loop = loop;
    audio.volume = volume;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.currentTime = 0;
      audioRef.current = null;
    };
  }, [src, preload, loop, volume]);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.currentTime = 0;
    void audio.play().catch(() => {});
  }, []);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.pause();
    audio.currentTime = 0;
  }, []);

  return {
    play,
    stop,
  };
};
