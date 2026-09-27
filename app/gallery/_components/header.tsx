import Link from 'next/link'
import { Wordmark } from '@/components/wordmark'

const links = [
	{ href: '/gallery#projects', label: 'Projects' },
	{ href: '/gallery#about', label: 'About' },
	{ href: '/gallery#services', label: 'Services' },
	{ href: '/gallery#contact', label: 'Contact' },
]

export function Header() {
	return (
		<header className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-6 sm:px-10 sm:py-8">
			<Link href="/gallery" className="text-[#6A1A1B]">
				<Wordmark className="w-24 sm:w-28" />
			</Link>
			<nav aria-label="Main">
				<ul className="flex gap-4 text-sm sm:gap-8">
					{links.map((link) => (
						<li key={link.href}>
							<Link
								href={link.href}
								className="transition-colors hover:text-[#6A1A1B]"
							>
								{link.label}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</header>
	)
}
