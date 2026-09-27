import { Wordmark } from '@/components/wordmark'
import { site } from '@/lib/site'

const linkClass =
	'underline decoration-1 underline-offset-[0.2em] hover:decoration-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current'

export function Contact() {
	return (
		<footer
			id="contact"
			className="scroll-mt-4 bg-(--oxblood) px-5 pt-20 pb-10 text-(--plaster) md:px-10 md:pt-32"
		>
			<h2 className="bold-display max-w-[14ch] text-[clamp(3.5rem,12vw,11rem)]">
				Tell me about your home
			</h2>
			<div className="mt-12 grid gap-10 md:mt-20 md:grid-cols-12">
				<p className="max-w-md md:col-span-5">
					Whether you’re planning a renovation or building new, I’d
					love to hear what you have in mind. I’m based in{' '}
					{site.location} and work with homeowners and builders across{' '}
					{site.serviceArea}.
				</p>
				<ul className="space-y-2 md:col-span-6 md:col-start-7">
					<li className="text-2xl md:text-3xl">
						<a href={`mailto:${site.email}`} className={linkClass}>
							{site.email}
						</a>
					</li>
					<li className="text-2xl md:text-3xl">
						<a href={site.phoneHref} className={linkClass}>
							{site.phone}
						</a>
					</li>
					<li className="pt-2">
						<a href={site.instagram} className={linkClass}>
							{site.instagramHandle} on Instagram
						</a>
					</li>
				</ul>
			</div>
			<div className="mt-24 flex flex-wrap items-end justify-between gap-6 md:mt-32">
				<Wordmark className="w-40 md:w-56" />
				<p className="text-sm">
					© {new Date().getFullYear()} {site.name}
				</p>
			</div>
		</footer>
	)
}
