import type { Metadata } from 'next'
import { Hanken_Grotesk, Noto_Serif_Display } from 'next/font/google'
import './bold.css'

const display = Noto_Serif_Display({
	subsets: ['latin'],
	axes: ['wdth'],
	variable: '--font-bold-display',
})

const sans = Hanken_Grotesk({
	subsets: ['latin'],
	variable: '--font-bold-sans',
})

export const metadata: Metadata = {
	title: 'Edit Design Co | Bold',
}

export default function BoldLayout({ children }: LayoutProps<'/bold'>) {
	return (
		<div
			className={`bold-root ${display.variable} ${sans.variable} min-h-svh text-[0.9375rem] leading-relaxed`}
		>
			{children}
		</div>
	)
}
