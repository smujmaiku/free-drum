import Providers from "@/context/Providers";

export interface LayoutProps {
	children: React.ReactNode;
}

export function Layout(props: LayoutProps): JSX.Element {
	const { children } = props;

	return (
		<Providers>
			{children}
		</Providers>
	)
}
export default Layout