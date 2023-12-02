import { useCallback, useEffect, useRef, useState } from "react";
import GameButton from "./GameButton";


export interface DrumPropsI {
  name?: string;
  button: number;
  src: string;
  type?: string;
  volume?: number;
  start?: number;
  end?: number;
}

export function Drum(props: DrumPropsI) {
  const { button, src, type, volume = 1, start = 0, end = Infinity } = props;
  const ref = useRef<HTMLAudioElement>(null!);
  const [playing, setPlaying] = useState(false);

  const handleStart = useCallback(() => {
    const el = ref.current;
    el.volume = volume;
    el.pause();
    el.play();
  }, [volume])

  useEffect(() => {
    const el = ref.current;

    let endTimer: NodeJS.Timeout | undefined;
    const handlePlay = () => {
      setPlaying(true);
      clearTimeout(endTimer);
      el.currentTime = start;

      const endTime = Math.floor((end - start) * 1000);
      if (endTime <= 0) {
        el.pause();
        return;
      } else if (endTime === Infinity) {
        return;
      }

      endTimer = setTimeout(() => {
        el.pause();
      }, endTime);
    }

    const handlePause = () => {
      setPlaying(false);
    }

    el.addEventListener('play', handlePlay)
    el.addEventListener('pause', handlePause)

    return () => {
      el.removeEventListener('play', handlePlay)
      el.removeEventListener('pause', handlePause)
    }
  }, [start, end]);

  return (
    <audio ref={ref} controls={playing}>
      <GameButton button={button} onDown={handleStart} />
      <source src={src} type={type} />
    </audio>
  );
}
