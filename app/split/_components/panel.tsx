import Link from 'next/link'
import { Wordmark } from '@/components/wordmark'
import { site } from '@/lib/site'

export const focusRing =
	'rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current'

const nav = [
	{ id: 'projects', label: 'Projects' },
	{ id: 'about', label: 'About' },
	{ id: 'services', label: 'Services' },
	{ id: 'contact', label: 'Contact' },
]

// One screen of the split layout: an oxblood panel that sticks while its
// photos scroll past, then hands off to the next section's panel.
export function SplitSection({
	id,
	current,
	first = false,
	panel,
	children,
}: {
	id?: string
	current?: string
	// The first section carries the header on mobile. Later sections only
	// repeat it on desktop, where it has to stay on screen.
	first?: boolean
	panel: React.ReactNode
	children: React.ReactNode
}) {
	return (
		<section id={id} className="lg:grid lg:grid-cols-[5fr_8fr]">
			<div className="bg-[#6A1A1B] text-[#F6F3EF]">
				<div className="flex flex-col gap-10 px-6 py-8 sm:px-10 lg:sticky lg:top-0 lg:h-dvh lg:py-10 xl:px-14">
					<header className={first ? '' : 'hidden lg:block'}>
						<div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5">
							<Link href="/split" className={focusRing}>
								<Wordmark className="w-28 xl:w-32" />
							</Link>
							<nav aria-label="Main">
								<ul className="flex gap-5 text-sm">
									{nav.map((item) => (
										<li key={item.id}>
											<Link
												href={`/split#${item.id}`}
												aria-current={
													current === item.id
														? 'location'
														: undefined
												}
												className={`${focusRing} underline-offset-[6px] hover:underline aria-[current]:underline`}
											>
												{item.label}
											</Link>
										</li>
									))}
								</ul>
							</nav>
						</div>
					</header>
					<div className="flex flex-1 flex-col justify-center">
						{panel}
					</div>
					<p className="hidden text-sm text-[#F6F3EF]/75 lg:block">
						Based in {site.location}, working across{' '}
						{site.serviceArea}.
					</p>
				</div>
			</div>
			<div className="flex flex-col gap-1.5">{children}</div>
		</section>
	)
}
