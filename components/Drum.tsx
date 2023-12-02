import { useEffect, useRef } from "react";

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

  useEffect(() => {
    const el = ref.current;

    let endTimer: NodeJS.Timeout | undefined;
    const handlePlay = () => {
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

    let active = false;
    const upkeep = () => {
      const gamepads = navigator.getGamepads();
      for (const gamepad of Object.values(gamepads)) {
        const { id, buttons } = gamepad || {};
        if (!id || !buttons) return;

        const { value } = gamepad?.buttons[button] || {};

        if (value && !active && el) {
          el.pause();
          el.play();
        }
        active = Boolean(value);
      }
    }

    el.addEventListener('play', handlePlay)
    const timer = setInterval(upkeep, GAMEPAD_TIMER);

    return () => {
      el.removeEventListener('play', handlePlay)
      clearInterval(timer)
    }
  }, [button, start, end]);

  return (
    <audio ref={ref}>
      <source src={src} type={type} />
    </audio>
  );
}
