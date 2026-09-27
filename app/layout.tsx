import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
	title: 'Edit Design Co | Interior design in Greater Victoria',
	description:
		'Full-service interior design for renovations and new builds in Greater Victoria, BC.',
	// Concept round only; remove once a direction goes live
	robots: { index: false, follow: false },
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
	return (
		<html lang="en" className="antialiased">
			<body>{children}</body>
		</html>
	)
}
