import { makeUnorderedProvider } from "make-list-provider";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export interface GamePadEvent {
	onDown?: (button: number) => void;
}

const [GamePadEventProvider, useGamePadEvent] = makeUnorderedProvider<GamePadEvent>()

export function useButton(button: number, callback: () => void) {
	const onDownRef = useRef<GamePadEvent['onDown']>();
	onDownRef.current = (evButton: number) => {
		if (evButton !== button) return;
		callback();
	};

	const event = useMemo<GamePadEvent>(() => ({
		onDown: (...args) => onDownRef.current?.(...args),
	}), [])

	useGamePadEvent(event);
}

interface GamePadProviderPropsI {
	polling?: number;
	children: React.ReactNode;
}

export function GamePadProvider(props: GamePadProviderPropsI) {
	const { polling, children } = props;

	const [events, setEvents] = useState<GamePadEvent[]>([]);
	const eventsRef = useRef<typeof events>([]);
	eventsRef.current = events;

	const triggerDown = useCallback((button: number) => {
		for (const event of eventsRef.current) {
			event.onDown?.(button);
		}
	}, [])

	useEffect(() => {
		const buttonStates: Record<number, number> = {};

		const upkeep = () => {
			const gamepads = navigator.getGamepads();
			for (const gamepad of Object.values(gamepads)) {
				if (!gamepad) continue;
				const { id, buttons } = gamepad;

				for (let index = 0; index < buttons.length; index += 1) {
					const config = buttons[index];
					const { value } = config;

					if (value && !buttonStates[index]) {
						triggerDown(index);
					}
					buttonStates[index] = value;
				}
			}
		}

		const timer = setInterval(upkeep, polling);
		upkeep();

		return () => {
			clearInterval(timer)
		}
	}, [polling, triggerDown])

	return (
		<GamePadEventProvider onChange={setEvents}>
			{children}
		</GamePadEventProvider>
	)
}