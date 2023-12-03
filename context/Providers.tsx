import React from 'react';
import { GamePadProvider } from './GamePad';

interface ProvidersProps {
	children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps): JSX.Element {
	return [
		(child: React.ReactNode) => <GamePadProvider>{child}</GamePadProvider>,
	]
		.reverse()
		.reduce((child, provider) => provider(child), children) as JSX.Element;
}
