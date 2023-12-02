import { useEffect } from "react";

export interface GameButtonPropsI {
	button: number;
	onDown: () => void;
	polling?: number;
}

export function GameButton(props: GameButtonPropsI) {
	const { button, onDown, polling = 10 } = props;

	useEffect(() => {
		let buttonDown = false;

		const upkeep = () => {
			const gamepads = navigator.getGamepads();
			for (const gamepad of Object.values(gamepads)) {
				const { id, buttons } = gamepad || {};
				if (!id || !buttons) return;

				const { value } = gamepad?.buttons[button] || {};

				if (value && !buttonDown) {
					onDown();
				}
				buttonDown = Boolean(value);
			}
		}

		const timer = setInterval(upkeep, polling);

		return () => {
			clearInterval(timer)
		}

	}, [button, onDown, polling])

	return null;
}

export default GameButton