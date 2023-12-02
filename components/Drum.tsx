import { useEffect, useRef, useState } from "react";

const GAMEPAD_TIMER = 10;

export interface DrumPropsI {
  name?: string;
  button: number;
  src: string;
  type?: string;
  start?: number;
  end?: number;
}

export function Drum(props: DrumPropsI) {
  const { button, src, type, start = 0, end = Infinity } = props;
  const ref = useRef<HTMLAudioElement>(null!);
  const [playing, setPlaying] = useState(false);

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

    let buttonDown = false;
    const upkeep = () => {
      const gamepads = navigator.getGamepads();
      for (const gamepad of Object.values(gamepads)) {
        const { id, buttons } = gamepad || {};
        if (!id || !buttons) return;

        const { value } = gamepad?.buttons[button] || {};

        if (value && !buttonDown && el) {
          el.pause();
          el.play();
        }
        buttonDown = Boolean(value);
      }
    }

    el.addEventListener('play', handlePlay)
    el.addEventListener('pause', handlePause)
    const timer = setInterval(upkeep, GAMEPAD_TIMER);

    return () => {
      el.removeEventListener('play', handlePlay)
      el.removeEventListener('pause', handlePause)
      clearInterval(timer)
    }
  }, [button, start, end]);

  return (
    <audio ref={ref} controls={playing}>
      <source src={src} type={type} />
    </audio>
  );
}
