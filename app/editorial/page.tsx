import Image from 'next/image'
import Link from 'next/link'
import { projects } from '@/lib/projects'
import { site } from '@/lib/site'
import { Diptych, Figure } from './_components/figure'

const [beaverbrooke, hampshire] = projects

function find(key: string) {
	const photo = projects
		.flatMap((project) => project.photos)
		.find((p) => p.key === key)
	if (!photo) throw new Error(`Missing photo ${key}`)
	return photo
}

const services = [
	'Full-service design for renovations and new builds, from first walkthrough to final install',
	'Spec packages covering every material, finish and piece of hardware',
	'Architectural drawings in Vectorworks, ready for your contractor',
	'Design for developers building single-family homes, fourplexes and sixplexes',
]

export default function EditorialHome() {
	return (
		<main>
			<ProjectIndex />

			<section className="mx-auto max-w-[1400px] px-5 pt-16 md:px-10 md:pt-24">
				<p className="max-w-2xl font-[family-name:var(--font-display)] text-2xl leading-snug text-[#6A1A1B] md:text-[2rem]">
					Interior design for renovations and new builds across{' '}
					{site.serviceArea}. Every room drawn, specified and seen
					through to the last cabinet pull.
				</p>
			</section>

			<section className="mx-auto mt-20 grid max-w-[1400px] grid-cols-12 gap-x-4 gap-y-12 px-5 md:mt-28 md:px-10">
				<Figure
					photo={find('beaverbrooke-04')}
					caption="Great room, Beaverbrooke"
					sizes="(min-width: 768px) 45vw, 90vw"
					className="col-span-11 md:col-span-5 md:col-start-2"
				/>
				<Figure
					photo={find('hampshire-living-room-077')}
					caption="Living room, Hampshire"
					sizes="(min-width: 768px) 40vw, 80vw"
					className="col-span-10 col-start-3 md:col-span-5 md:col-start-8 md:mt-72"
				/>
			</section>

			<section className="mx-auto mt-20 grid max-w-[1400px] grid-cols-12 px-5 md:mt-32 md:px-10">
				<Diptych
					pair={hampshire.pairs[1]}
					caption="Kitchen and pantry, Hampshire"
					className="col-span-12 md:col-span-7 md:col-start-4"
				/>
			</section>

			<section
				id="about"
				className="mx-auto mt-24 grid max-w-[1400px] scroll-mt-8 grid-cols-12 gap-x-4 gap-y-10 px-5 md:mt-40 md:px-10"
			>
				<div className="col-span-8 md:col-span-3 md:col-start-2">
					<Image
						src="/melissa.jpg"
						width={890}
						height={1182}
						alt={`${site.founder}, founder of ${site.name}`}
						sizes="(min-width: 768px) 22vw, 60vw"
						className="h-auto w-full"
					/>
				</div>
				<div className="col-span-12 md:col-span-5 md:col-start-6 md:self-end">
					<h2 className="font-[family-name:var(--font-display)] text-4xl leading-tight text-[#6A1A1B] md:text-6xl">
						Hi, I&rsquo;m Melissa
					</h2>
					<div className="mt-6 max-w-prose space-y-4">
						<p>
							I started {site.name} to give homeowners in{' '}
							{site.serviceArea} one person who sees a renovation
							through, from the first conversation about how you
							live to the day the last fixture goes in.
						</p>
						<p>
							Most of my clients are taking on a big renovation or
							building new. We spend real time up front figuring
							out what you need and what you&rsquo;ll love, then I
							turn that into drawings and specs your builder can
							work from without guessing.
						</p>
						<p>
							Contractors tell me my packages are the most
							complete they see. That means fewer surprises on
							site, and a home that looks the way we drew it.
						</p>
					</div>
				</div>
			</section>

			<section className="mx-auto mt-24 grid max-w-[1400px] grid-cols-12 gap-x-4 px-5 md:mt-40 md:px-10">
				<Figure
					photo={find('beaverbrooke-21')}
					caption="Beaverbrooke at dusk"
					sizes="(min-width: 768px) 70vw, 100vw"
					className="col-span-12 md:col-span-8"
				/>
			</section>

			<section
				id="services"
				className="mx-auto mt-24 grid max-w-[1400px] scroll-mt-8 grid-cols-12 gap-x-4 gap-y-10 px-5 md:mt-40 md:px-10"
			>
				<h2 className="col-span-12 font-[family-name:var(--font-display)] text-4xl leading-tight text-[#6A1A1B] md:col-span-4 md:col-start-2 md:text-6xl">
					How I can help
				</h2>
				<div className="col-span-12 md:col-span-5 md:col-start-7">
					<p className="max-w-prose">
						I work on whole homes, start to finish. You get one
						designer who knows every decision and why it was made.
					</p>
					<ul className="mt-8 space-y-5">
						{services.map((service) => (
							<li
								key={service}
								className="font-[family-name:var(--font-display)] text-xl leading-snug md:text-2xl"
							>
								{service}
							</li>
						))}
					</ul>
				</div>
			</section>

			<section className="mx-auto mt-24 grid max-w-[1400px] grid-cols-12 gap-x-4 px-5 md:mt-40 md:px-10">
				<Diptych
					pair={beaverbrooke.pairs[1]}
					caption="Kitchen, Beaverbrooke"
					className="col-span-12 md:col-span-6 md:col-start-6"
				/>
			</section>

			<section
				id="contact"
				className="mx-auto mt-24 max-w-[1400px] scroll-mt-8 px-5 md:mt-40 md:px-10"
			>
				<h2 className="max-w-4xl font-[family-name:var(--font-display)] text-5xl leading-[1.05] text-[#6A1A1B] md:text-8xl">
					Planning a renovation or a new build?
				</h2>
				<div className="mt-10 grid gap-8 md:grid-cols-3">
					<p>
						Tell me about your project and we&rsquo;ll set up a time
						to talk it through.
					</p>
					<p className="space-y-1">
						<a
							href={`mailto:${site.email}`}
							className="block underline underline-offset-4"
						>
							{site.email}
						</a>
						<a href={site.phoneHref} className="block">
							{site.phone}
						</a>
						<a
							href={site.instagram}
							className="block underline underline-offset-4"
						>
							{site.instagramHandle}
						</a>
					</p>
					<p>
						Based in {site.location}, working across{' '}
						{site.serviceArea}.
					</p>
				</div>
			</section>
		</main>
	)
}

// The typographic hero. On wide screens, hovering or focusing a project name
// swaps the photo beside the index. On touch screens each name gets its
// cover inline.
function ProjectIndex() {
	const intro = find('hampshire-kitchen-pantry-057')
	return (
		<section
			id="projects"
			className="group/index relative mx-auto max-w-[1400px] scroll-mt-8 px-5 pt-10 md:min-h-[80vh] md:px-10 md:pt-20"
		>
			<ul className="relative z-10 space-y-10 md:space-y-2">
				{projects.map((project) => (
					<li key={project.slug}>
						<Link
							href={`/editorial/projects/${project.slug}`}
							className="peer group/name inline-block"
						>
							<span className="block font-[family-name:var(--font-display)] text-[clamp(2.75rem,12vw,4.5rem)] md:text-[clamp(4.5rem,8.5vw,8rem)] leading-[0.95] tracking-[-0.02em] text-[#6A1A1B] md:group-hover/name:italic md:group-focus-visible/name:italic">
								{project.name}
							</span>
							<span className="mt-2 block text-[13px] text-[#72635A] md:ml-2">
								{project.kind} in {project.location}
							</span>
						</Link>
						<Image
							src={project.cover.src}
							width={project.cover.width}
							height={project.cover.height}
							alt={project.cover.alt}
							sizes="(min-width: 768px) 38vw, 100vw"
							className="mt-5 h-auto w-full md:pointer-events-none md:absolute md:top-20 md:right-10 md:mt-0 md:w-[38%] md:opacity-0 md:peer-hover:opacity-100 md:peer-focus-visible:opacity-100 motion-safe:md:transition-opacity motion-safe:md:duration-500"
						/>
					</li>
				))}
			</ul>
			<Image
				src={intro.src}
				width={intro.width}
				height={intro.height}
				alt={intro.alt}
				sizes="38vw"
				priority
				className="pointer-events-none absolute top-20 right-10 hidden w-[26%] md:block group-has-[a:hover]/index:opacity-0 group-has-[a:focus-visible]/index:opacity-0 motion-safe:transition-opacity motion-safe:duration-500"
			/>
		</section>
	)
}
