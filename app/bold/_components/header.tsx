import Link from 'next/link'
import { Wordmark } from '@/components/wordmark'

const links = [
	{ href: '/bold#projects', label: 'Projects' },
	{ href: '/bold#services', label: 'Services' },
	{ href: '/bold#about', label: 'About' },
	{ href: '/bold#contact', label: 'Contact' },
]

// Sits on a dark colour block and inherits its light text colour
export function Header() {
	return (
		<header className="flex items-center justify-between gap-6 px-5 py-5 md:px-10">
			<Link
				href="/bold"
				className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
			>
				<Wordmark className="w-24 md:w-28" />
			</Link>
			<nav aria-label="Main">
				<ul className="flex flex-wrap justify-end gap-x-5 gap-y-1 text-sm md:gap-x-8">
					{links.map((link) => (
						<li key={link.href}>
							<Link
								href={link.href}
								className="underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none"
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
