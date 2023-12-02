import { useEffect, useRef } from "react";

export interface DrumPropsI {
  name?: string;
  button: number;
  src: string;
  type?: string;
}

export function Drum(props: DrumPropsI) {
  const { button, src, type } = props;
  const ref = useRef<HTMLAudioElement>(null!);

  useEffect(() => {
    let active = false;

    const upkeep = () => {
      const gamepads = navigator.getGamepads();
      for (const gamepad of Object.values(gamepads)) {
        const { id, buttons } = gamepad || {};
        if (!id || !buttons) return;

        const { value } = gamepad?.buttons[button] || {};
        const el = ref.current;

        if (value && !active && el) {
          el.currentTime = 0;
          el.play();
        }
        active = Boolean(value);
      }
    }

    const timer = setInterval(upkeep, 10);

    return () => {
      clearInterval(timer)
    }
  }, [button]);

  return (
    <audio ref={ref}>
      <source src={src} type={type} />
    </audio>
  );
}
