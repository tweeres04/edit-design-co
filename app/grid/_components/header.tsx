import Link from 'next/link'
import { Wordmark } from '@/components/wordmark'
import { site } from '@/lib/site'

const links = [
	{ href: '/grid#projects', label: 'Projects' },
	{ href: '/grid#about', label: 'About' },
	{ href: '/grid#services', label: 'Services' },
	{ href: '/grid#contact', label: 'Contact' },
]

export const focusRing =
	'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--oxblood)'

export function Header() {
	return (
		<header className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 bg-(--paper)/95 px-3 py-4 backdrop-blur-sm lg:px-4">
			<Link href="/grid" className={`text-(--oxblood) ${focusRing}`}>
				<Wordmark className="w-20 lg:w-24" />
			</Link>
			<nav
				aria-label="Main"
				className="order-last w-full sm:order-none sm:w-auto"
			>
				<ul className="flex gap-6 text-[13px]">
					{links.map((link) => (
						<li key={link.href}>
							<Link
								href={link.href}
								className={`hover:text-(--oxblood) ${focusRing}`}
							>
								{link.label}
							</Link>
						</li>
					))}
				</ul>
			</nav>
			<ul className="flex gap-5 text-[13px]">
				<li>
					<a
						href={site.instagram}
						className={`hover:text-(--oxblood) ${focusRing}`}
					>
						Instagram
					</a>
				</li>
				<li>
					<a
						href={`mailto:${site.email}`}
						className={`hover:text-(--oxblood) ${focusRing}`}
					>
						Email
					</a>
				</li>
			</ul>
		</header>
	)
}
