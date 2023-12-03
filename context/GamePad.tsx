import { makeUnorderedProvider } from "make-list-provider";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

export interface GamePadEvent {
	onDown?: (button: number) => void;
}

const [GamePadEventProvider, useGamePadEvent] = makeUnorderedProvider<GamePadEvent>()

export interface GamePadContextI {
	gamepads: ReturnType<typeof navigator.getGamepads>;
}

const context = createContext<GamePadContextI>(null!)

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

export function useGamepads() {
	return useContext(context)
}

interface GamePadProviderPropsI {
	polling?: number;
	children: React.ReactNode;
}

export function GamePadProvider(props: GamePadProviderPropsI) {
	const { polling, children } = props;

	const [eventsState, setEvents] = useState<GamePadEvent[]>([]);
	const eventsRef = useRef<typeof eventsState>([]);
	eventsRef.current = eventsState;

	const [gamepadsState, setGamepads] = useState<GamePadContextI['gamepads']>([])
	const gamepadsRef = useRef<typeof gamepadsState>([]);
	gamepadsRef.current = gamepadsState;

	const triggerDown = useCallback((button: number) => {
		for (const event of eventsRef.current) {
			event.onDown?.(button);
		}
	}, [])

	useEffect(() => {
		const buttonStates: Record<number, number> = {};

		const upkeep = () => {
			let needsUpdate = false;
			const gamepads = navigator.getGamepads();

			for (let gIndex = 0; gIndex < gamepads.length; gIndex += 1) {
				const gamepad = gamepads[gIndex];
				if (gamepad === gamepadsRef.current[gIndex]) continue;

				needsUpdate = true;
				if (!gamepad) continue;
				const { id, buttons } = gamepad;

				for (let bIndex = 0; bIndex < buttons.length; bIndex += 1) {
					const config = buttons[bIndex];
					const { value } = config;

					if (value && !buttonStates[bIndex]) {
						triggerDown(bIndex);
					}
					buttonStates[bIndex] = value;
				}
			}
			if (needsUpdate) {
				setGamepads(gamepads);
			}
		}

		const timer = setInterval(upkeep, polling);
		upkeep();

		return () => {
			clearInterval(timer)
		}
	}, [polling, triggerDown])

	const value = useMemo<GamePadContextI>(() => ({
		gamepads: gamepadsState,
	}), [gamepadsState])

	return (
		<GamePadEventProvider onChange={setEvents}>
			<context.Provider value={value}>
				{children}
			</context.Provider>
		</GamePadEventProvider>
	)
}