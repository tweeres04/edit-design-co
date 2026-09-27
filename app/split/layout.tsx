import type { Metadata } from 'next'
import { Hanken_Grotesk } from 'next/font/google'

const hanken = Hanken_Grotesk({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Edit Design Co | Interior design in Greater Victoria',
}

export default function SplitLayout({ children }: LayoutProps<'/split'>) {
	return (
		<div
			className={`${hanken.className} min-h-dvh bg-[#F6F3EF] text-[15px] leading-relaxed text-[#3A3738]`}
		>
			{children}
		</div>
	)
}
