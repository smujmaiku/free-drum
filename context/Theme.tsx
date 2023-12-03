import * as React from 'react';
import { pink, green } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: pink[200],
		},
		secondary: {
			main: green[300],
		}
	},
});

interface ThemePropsI {
	children: React.ReactNode;
}

export function Theme(props: ThemePropsI) {
	const { children } = props;

	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default Theme