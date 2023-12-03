import { useGamepads } from "@/context/GamePad"
import VideogameAssetOffIcon from '@mui/icons-material/VideogameAssetOff';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import AlbumIcon from '@mui/icons-material/Album';

interface GamepadIconPropsI {
	gamepad: Gamepad | null;
}

function GamepadIcon(props: GamepadIconPropsI) {
	const { gamepad } = props;

	if (!gamepad?.connected) return <VideogameAssetOffIcon />

	switch (gamepad.id) {
		case '':
			return <AlbumIcon />
		default:
	}

	return <VideogameAssetIcon />
}

export function GamepadNav() {
	const { gamepads } = useGamepads();

	return <div>
		{gamepads.map((gamepad) => (
			<GamepadIcon key={gamepad?.id} gamepad={gamepad} />
		))}
	</div>
}

export default GamepadNav