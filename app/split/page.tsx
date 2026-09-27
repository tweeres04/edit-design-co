import Link from 'next/link'
import { projects } from '@/lib/projects'
import { site } from '@/lib/site'
import { focusRing, SplitSection } from './_components/panel'
import { type Frame, Frames, photoByKey, TallFrame } from './_components/photos'

const pair = (a: string, b: string): Frame => ({
	kind: 'pair',
	photos: [photoByKey(a), photoByKey(b)],
})
const wide = (key: string): Frame => ({ kind: 'wide', photo: photoByKey(key) })

// Hand-picked frames for each project's preview on the homepage
const previews: Record<string, Frame[]> = {
	beaverbrooke: [
		wide('beaverbrooke-10'),
		pair('beaverbrooke-07', 'beaverbrooke-06'),
		pair('beaverbrooke-13', 'beaverbrooke-14'),
	],
	hampshire: [
		wide('hampshire-kitchen-pantry-052'),
		pair('hampshire-front-entrance-011', 'hampshire-front-entrance-016'),
		pair('hampshire-master-bath-101', 'hampshire-master-bath-100'),
	],
}

const services = [
	'Full-service design for renovations and new builds',
	'Architectural drawings in Vectorworks',
	'Spec packages for materials, finishes and hardware',
	'New builds with developers, from single homes to sixplexes',
]

export default function SplitHome() {
	return (
		<main>
			<SplitSection
				first
				panel={
					<h1 className="max-w-md text-2xl leading-snug font-light text-balance xl:text-[1.75rem]">
						Interior design for renovations and new builds across
						Greater Victoria, drawn and specified down to the last
						cabinet pull.
					</h1>
				}
			>
				<Frames
					preloadFirst
					frames={[
						wide('hampshire-living-room-077'),
						pair('beaverbrooke-03', 'beaverbrooke-02'),
					]}
				/>
			</SplitSection>

			<div id="projects">
				{projects.map((project) => (
					<SplitSection
						key={project.slug}
						current="projects"
						panel={
							<div className="max-w-sm">
								<h2 className="text-4xl font-light tracking-tight xl:text-5xl">
									{project.name}
								</h2>
								<p className="mt-4 text-sm text-[#F6F3EF]/75">
									{project.kind} in {project.location}
								</p>
								<p className="mt-6">{project.summary}</p>
								<Link
									href={`/split/projects/${project.slug}`}
									className={`${focusRing} mt-8 inline-block underline underline-offset-[6px] hover:decoration-2`}
								>
									See the whole project
								</Link>
							</div>
						}
					>
						<Link
							href={`/split/projects/${project.slug}`}
							aria-label={`See the whole ${project.name} project`}
							className="flex flex-col gap-1.5 focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-[#6A1A1B]"
						>
							<Frames frames={previews[project.slug]} />
						</Link>
					</SplitSection>
				))}
			</div>

			<SplitSection
				id="about"
				current="about"
				panel={
					<div className="max-w-sm">
						<h2 className="text-4xl font-light tracking-tight xl:text-5xl">
							Hi, I&rsquo;m Melissa
						</h2>
						<p className="mt-6">
							Most of my clients are taking on a big renovation or
							building new. I spend time up front learning how you
							live and what you&rsquo;ll love, then turn it into a
							plan your builder can follow.
						</p>
						<p className="mt-4">
							I&rsquo;m with you from the first walkthrough to the
							day the last fixture goes in.
						</p>
					</div>
				}
			>
				<TallFrame
					photo={{
						src: '/melissa.jpg',
						width: 890,
						height: 1182,
						alt: 'Melissa Orton',
					}}
					caption={`${site.founder}, ${site.founderRole.toLowerCase()} at ${site.name}`}
				/>
			</SplitSection>

			<SplitSection
				id="services"
				current="services"
				panel={
					<div className="max-w-sm">
						<h2 className="text-4xl font-light tracking-tight xl:text-5xl">
							What I do
						</h2>
						<ul className="mt-6 space-y-3 border-t border-[#F6F3EF]/30 pt-6">
							{services.map((service) => (
								<li key={service}>{service}</li>
							))}
						</ul>
						<p className="mt-6 text-[#F6F3EF]/75">
							Contractors like working from my drawings and specs
							because everything they need is already on the page.
							That means fewer questions on site and fewer
							surprises in your budget.
						</p>
					</div>
				}
			>
				<Frames
					frames={[
						pair(
							'hampshire-kitchen-pantry-064',
							'hampshire-kitchen-pantry-073',
						),
						wide('beaverbrooke-09'),
					]}
				/>
			</SplitSection>

			<SplitSection
				id="contact"
				current="contact"
				panel={
					<div className="max-w-sm">
						<h2 className="text-4xl font-light tracking-tight xl:text-5xl">
							Tell me about your project
						</h2>
						<p className="mt-6">
							Planning a renovation or a new build? Send me a note
							with where you are and what you have in mind.
						</p>
						<ul className="mt-8 space-y-2">
							<li>
								<a
									href={`mailto:${site.email}`}
									className={`${focusRing} text-lg underline underline-offset-[6px] hover:decoration-2`}
								>
									{site.email}
								</a>
							</li>
							<li>
								<a
									href={site.phoneHref}
									className={`${focusRing} underline-offset-[6px] hover:underline`}
								>
									{site.phone}
								</a>
							</li>
							<li>
								<a
									href={site.instagram}
									className={`${focusRing} underline-offset-[6px] hover:underline`}
								>
									{site.instagramHandle} on Instagram
								</a>
							</li>
						</ul>
						<p className="mt-8 text-sm text-[#F6F3EF]/75 lg:hidden">
							Based in {site.location}, working across{' '}
							{site.serviceArea}.
						</p>
					</div>
				}
			>
				<Frames frames={[wide('beaverbrooke-21')]} />
				<p className="px-6 py-6 text-sm text-[#3A3738]/80 sm:px-10 lg:px-8">
					&copy; {new Date().getFullYear()} {site.name}
				</p>
			</SplitSection>
		</main>
	)
}
