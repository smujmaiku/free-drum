import { Drum } from '@/components/Drum'
import { useGamepads } from '@/context/GamePad'

export default function Home() {
	const { gamepads } = useGamepads();

	return (
		<main>
			<div>
				Free Drum
				{gamepads.filter(Boolean).map(gamepad => (
					<p key={gamepad?.id}>{gamepad?.id}</p>
				))}
			</div>
			<Drum
				name="tom"
				button={0}
				src="https://freewavesamples.com/files/Floor-Tom-1.wav"
				type="audio/wav"
				start={0.1}
			/>
			<Drum
				name="snare"
				button={1}
				src="https://freewavesamples.com/files/Ensoniq-ESQ-1-Snare.wav"
				type="audio/wav"
				start={0.1}
			/>
			<Drum
				name="ride"
				button={2}
				src="https://freewavesamples.com/files/Ensoniq-SQ-1-Ride-Cymbal.wav"
				type="audio/wav"
				start={0.1}
			/>
			<Drum
				name="crash"
				button={3}
				src="https://freewavesamples.com/files/Crash-Cymbal-1.wav"
				type="audio/wav"
				start={0.1}
			/>
			<Drum
				name="kick"
				button={4}
				src="https://freewavesamples.com/files/Bass-Drum-3.wav"
				type="audio/wav"
				start={0.1}
			/>
		</main>
	)
}
