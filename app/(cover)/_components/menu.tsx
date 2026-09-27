import { site } from '@/lib/site'

// Uses the browser's popover API, so opening, closing and Escape work
// without any client JavaScript
const linkClass =
	'text-[13px] tracking-[0.22em] uppercase underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-none'

const studioLinks = [
	{ href: '/inquire', label: 'Inquire' },
	{ href: site.instagram, label: 'Instagram' },
	{ href: `mailto:${site.email}`, label: 'Email' },
]

export function Menu() {
	return (
		<>
			<button
				type="button"
				popoverTarget="menu"
				aria-label="Open menu"
				className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[7px] focus-visible:outline-2 focus-visible:outline-current"
			>
				<span className="h-px w-7 bg-current" />
				<span className="h-px w-7 bg-current" />
				<span className="h-px w-7 bg-current" />
			</button>
			<nav
				id="menu"
				popover="auto"
				aria-label="Main"
				className="fixed inset-0 m-0 h-svh max-h-none w-full max-w-none flex-col border-0 bg-[#F6F3EF] px-9 pt-20 pb-12 text-[#6A1A1B] opacity-0 transition-[opacity,display,overlay] transition-discrete duration-300 open:flex open:opacity-100 motion-reduce:transition-none starting:open:opacity-0"
			>
				<button
					type="button"
					popoverTarget="menu"
					popoverTargetAction="hide"
					aria-label="Close menu"
					className="absolute top-6 right-4 flex h-11 w-11 items-center justify-center text-[#3A3738] focus-visible:outline-2 focus-visible:outline-[#6A1A1B]"
				>
					<span className="absolute h-px w-7 rotate-45 bg-current" />
					<span className="absolute h-px w-7 -rotate-45 bg-current" />
				</button>

				<h2 className="font-(family-name:--font-caslon-display) text-[44px] leading-none">
					Studio
				</h2>
				<ul className="mt-7 space-y-4">
					{studioLinks.map((link) => (
						<li key={link.href}>
							<a href={link.href} className={linkClass}>
								{link.label}
							</a>
						</li>
					))}
				</ul>
			</nav>
		</>
	)
}
