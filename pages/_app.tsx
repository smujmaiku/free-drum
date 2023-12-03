import React from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Layout from '@/components/Layout';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	layout?: (children: React.ReactElement) => JSX.Element;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

export function App({ Component, pageProps }: AppPropsWithLayout) {
	const {
		layout = ((children) => <Layout>{children}</Layout>)
	} = Component

	return layout(<Component {...pageProps} />);
}

export default App;