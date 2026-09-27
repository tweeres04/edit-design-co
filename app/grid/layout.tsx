import { Hanken_Grotesk, Newsreader } from 'next/font/google'
import { Header } from './_components/header'
import { site } from '@/lib/site'

const sans = Hanken_Grotesk({
	subsets: ['latin'],
	weight: ['300', '400', '500'],
	variable: '--font-grid-sans',
})

const serif = Newsreader({
	subsets: ['latin'],
	style: ['normal', 'italic'],
	variable: '--font-grid-serif',
})

export default function GridLayout({ children }: LayoutProps<'/grid'>) {
	return (
		<div
			className={`${sans.variable} ${serif.variable} min-h-screen bg-(--paper) font-(family-name:--font-grid-sans) text-[15px] font-light tracking-[0.02em] text-(--walnut) [--line:#E9E4DD] [--muted:#8A7462] [--oxblood:#6A1A1B] [--paper:#FBFAF7] [--walnut:#56402F]`}
		>
			<Header />
			{children}
			<footer className="flex flex-wrap justify-between gap-2 px-3 py-8 text-[13px] text-(--muted) lg:px-4">
				<p>
					© {new Date().getFullYear()} {site.name}
				</p>
				<p>
					{site.location}, serving {site.serviceArea}
				</p>
			</footer>
		</div>
	)
}
