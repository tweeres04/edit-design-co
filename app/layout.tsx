import type { Metadata } from 'next'
import { Libre_Caslon_Display, Libre_Caslon_Text } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import { site } from '@/lib/site'
import './globals.css'

const caslonDisplay = Libre_Caslon_Display({
	subsets: ['latin'],
	weight: '400',
	variable: '--font-caslon-display',
})
const caslonText = Libre_Caslon_Text({
	subsets: ['latin'],
	weight: '400',
})

// The share image and home-screen icon are the opengraph-image.jpg and
// apple-icon.png files in this folder
export const metadata: Metadata = {
	metadataBase: new URL(site.url),
	title: {
		default: 'Edit Design Co | Interior design in Greater Victoria',
		template: '%s | Edit Design Co',
	},
	description: site.description,
	openGraph: {
		type: 'website',
		siteName: site.name,
		locale: 'en_CA',
		title: site.name,
		description: site.description,
	},
	twitter: { card: 'summary_large_image' },
}

// Mobile-first. Desktop gets the same layout for now.
export default function RootLayout({ children }: LayoutProps<'/'>) {
	return (
		<html lang="en" className="antialiased">
			<body
				className={`${caslonDisplay.variable} ${caslonText.className} min-h-dvh bg-[#F6F3EF] text-[#3A3738]`}
			>
				{children}
			</body>
			{process.env.NODE_ENV === 'production' && (
				<GoogleAnalytics gaId="G-PTQSVMJHKM" />
			)}
		</html>
	)
}
