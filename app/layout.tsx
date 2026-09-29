import type { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
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
			{process.env.NODE_ENV === 'production' && (
				<GoogleAnalytics gaId="G-PTQSVMJHKM" />
			)}
		</html>
	)
}
