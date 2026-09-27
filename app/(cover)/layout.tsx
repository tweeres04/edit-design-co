import { Libre_Caslon_Display, Libre_Caslon_Text } from 'next/font/google'

const caslonDisplay = Libre_Caslon_Display({
	subsets: ['latin'],
	weight: '400',
	variable: '--font-caslon-display',
})
const caslonText = Libre_Caslon_Text({
	subsets: ['latin'],
	weight: '400',
})

// Mobile-first direction (/cover and /inquire). Desktop gets the same layout
// for now.
export default function CoverLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div
			className={`${caslonDisplay.variable} ${caslonText.className} min-h-dvh bg-[#F6F3EF] text-[#3A3738]`}
		>
			{children}
		</div>
	)
}
