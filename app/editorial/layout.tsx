import { Bodoni_Moda, Hanken_Grotesk } from 'next/font/google'
import Link from 'next/link'
import { Wordmark } from '@/components/wordmark'
import { site } from '@/lib/site'

const display = Bodoni_Moda({
	subsets: ['latin'],
	style: ['normal', 'italic'],
	variable: '--font-display',
})

const text = Hanken_Grotesk({
	subsets: ['latin'],
	variable: '--font-text',
})

const nav = [
	{ href: '/editorial#projects', label: 'Projects' },
	{ href: '/editorial#about', label: 'About' },
	{ href: '/editorial#services', label: 'Services' },
	{ href: '/editorial#contact', label: 'Contact' },
]

export default function EditorialLayout({
	children,
}: LayoutProps<'/editorial'>) {
	return (
		<div
			className={`${display.variable} ${text.variable} min-h-screen bg-[#FBF9F6] font-[family-name:var(--font-text)] text-[15px] leading-relaxed text-[#3A3738] selection:bg-[#6A1A1B] selection:text-[#FBF9F6] [&_:focus-visible]:outline-2 [&_:focus-visible]:outline-offset-4 [&_:focus-visible]:outline-[#6A1A1B]`}
		>
			<header className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 py-6 md:px-10">
				<Link href="/editorial" className="text-[#6A1A1B]">
					<Wordmark className="w-24 md:w-28" />
				</Link>
				<nav aria-label="Main">
					<ul className="flex gap-4 text-[13px] tracking-wide md:gap-8 md:text-sm">
						{nav.map((item) => (
							<li key={item.href}>
								<Link
									href={item.href}
									className="underline-offset-4 hover:underline"
								>
									{item.label}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</header>
			{children}
			<footer className="mx-auto flex max-w-[1400px] flex-col gap-2 px-5 pt-24 pb-10 text-[13px] text-[#72635A] md:flex-row md:justify-between md:px-10">
				<p>
					{site.name}, {site.location}
				</p>
				<p>
					<a
						href={site.instagram}
						className="underline underline-offset-4"
					>
						Instagram
					</a>
				</p>
			</footer>
		</div>
	)
}
