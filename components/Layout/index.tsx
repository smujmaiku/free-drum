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
					<STitle variant="h6" component="h1">
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