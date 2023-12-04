import Providers from "@/context/Providers";
import Head from "next/head";
import { AppBar, Toolbar, Typography, styled } from "@mui/material";
import { Global, css } from "@emotion/react";
import GamepadNav from "./GamepadNav";

const globalStyles = css`
body {
	display: flex;
	min-height: 100vh;
	margin: 0;
}

main {
	margin-top: 16px;
	margin-bottom: 48px;
}

main > * {
	margin-left: auto;
	margin-right: auto;
	max-width: 800px;
}

main > .break-out {
	max-width: 1024px;
}

main > .full-width {
	max-width: 100vw;
}

#__next {
	flex: 1 1 auto;
}
`;

const STitle = styled(Typography)`
	flex: 0% 1 1;
`;

export interface LayoutProps {
	title?: string;
	children: React.ReactNode;
}

export function Layout(props: LayoutProps): JSX.Element {
	const { title, children } = props;

	return (
		<Providers>
			<Global styles={globalStyles} />
			<Head>
				<title>Free Drum{title ? ` | ${title}` : ''}</title>
			</Head>
			<AppBar position="static">
				<Toolbar>
					<STitle variant="h6">
						Free Drum
					</STitle>
					<GamepadNav />
				</Toolbar>
			</AppBar>
			<main>
				{children}
			</main>
		</Providers>
	)
}
export default Layout