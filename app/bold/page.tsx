import Image from 'next/image'
import Link from 'next/link'
import { projects, type Photo, type Project } from '@/lib/projects'
import { site } from '@/lib/site'
import { Contact } from './_components/contact'
import { Frame } from './_components/frame'
import { Header } from './_components/header'
import { projectColour } from './_components/project-colour'

function findPhoto(key: string) {
	for (const project of projects) {
		const photo = project.photos.find((p) => p.key === key)
		if (photo) return photo
	}
	throw new Error(`No photo with key ${key}`)
}

const services = [
	{
		title: 'Full-service design',
		body: 'From the first walkthrough to move-in day. Layouts, finishes, lighting, furniture and all the decisions in between, made with you and kept on track.',
	},
	{
		title: 'Spec packages',
		body: 'Every material, finish and piece of hardware listed with its source, so your contractor can price and order without guessing.',
	},
	{
		title: 'Architectural drawings',
		body: 'Plans, elevations and millwork details drawn in Vectorworks. Contractors tell me they’re the clearest set they get to build from.',
	},
	{
		title: 'New builds for developers',
		body: 'Single-family homes, fourplexes and sixplexes, with interiors that feel custom and a spec your trades can follow.',
	},
]

export default function BoldHome() {
	const heroPhoto = findPhoto('beaverbrooke-01')
	const detailPhoto = findPhoto('hampshire-master-bath-100')

	return (
		<main>
			<section className="bg-(--walnut) text-(--plaster)">
				<Header />
				<div className="grid gap-10 px-5 pb-10 md:min-h-[calc(100svh-5.5rem)] md:grid-cols-12 md:gap-0 md:px-10 md:pb-0">
					<Frame
						photo={heroPhoto}
						fill
						priority
						sizes="(min-width: 768px) 50vw, 100vw"
						className="md:col-span-5 md:col-start-8 md:row-start-1"
					/>
					<div className="relative z-10 order-first md:order-none md:col-span-8 md:col-start-1 md:row-start-1 md:self-end md:pb-14">
						<h1 className="bold-display text-[clamp(4rem,12.5vw,13rem)]">
							Designed down to the last hinge
						</h1>
						<p className="mt-8 max-w-sm md:mt-10">
							Full-service interior design for renovations and new
							builds across {site.serviceArea}, from the first
							conversation to the final walkthrough.
						</p>
					</div>
				</div>
			</section>

			<section
				id="projects"
				aria-labelledby="projects-heading"
				className="scroll-mt-4 px-5 py-20 md:px-10 md:py-32"
			>
				<h2 id="projects-heading" className="sr-only">
					Projects
				</h2>
				<div className="space-y-24 md:space-y-40">
					{projects.map((project, index) => (
						<ProjectFeature
							key={project.slug}
							project={project}
							flip={index % 2 === 1}
						/>
					))}
				</div>
			</section>

			<section
				id="services"
				className="scroll-mt-4 bg-(--oak) px-5 py-20 md:px-10 md:py-32"
			>
				<div className="grid gap-12 lg:grid-cols-12">
					<h2 className="bold-display text-[clamp(3.5rem,10vw,9.5rem)] lg:col-span-7">
						What I take care of
					</h2>
					<div className="hidden lg:col-span-3 lg:col-start-10 lg:block">
						<Frame
							photo={detailPhoto}
							sizes="25vw"
							className="lg:-mb-48"
						/>
					</div>
				</div>
				<dl className="mt-16 grid max-w-4xl gap-x-12 gap-y-10 sm:grid-cols-2 md:mt-24">
					{services.map((service) => (
						<div key={service.title}>
							<dt className="font-semibold">{service.title}</dt>
							<dd className="mt-2 max-w-sm">{service.body}</dd>
						</div>
					))}
				</dl>
			</section>

			<section
				id="about"
				className="scroll-mt-4 px-5 py-20 md:px-10 md:py-32"
			>
				<div className="grid items-end gap-12 md:grid-cols-12">
					<div className="relative aspect-[3/4] max-w-sm overflow-hidden rounded-t-full md:col-span-4 md:max-w-none">
						<Image
							src="/melissa.jpg"
							fill
							alt={`${site.founder}, founder of ${site.name}`}
							sizes="(min-width: 768px) 33vw, 100vw"
							className="object-cover"
						/>
					</div>
					<div className="md:col-span-7 md:col-start-6">
						<h2 className="bold-display text-[clamp(3.5rem,10vw,9.5rem)] text-(--oxblood)">
							Melissa Orton
						</h2>
						<div className="mt-10 max-w-md space-y-4">
							<p>
								I’m the designer behind {site.name}. I work from{' '}
								{site.location} with people taking on a big
								renovation or building new, and with developers
								on homes, fourplexes and sixplexes.
							</p>
							<p>
								We start by spending time on how you actually
								live and what you’ll love coming home to. Then I
								turn that into drawings and a spec package
								thorough enough that your builder isn’t left
								guessing on site.
							</p>
						</div>
					</div>
				</div>
			</section>

			<Contact />
		</main>
	)
}

function ProjectFeature({
	project,
	flip,
}: {
	project: Project
	flip: boolean
}) {
	const [pairA, pairB] = project.pairs[0]
	const paired = new Set([pairA.key, pairB.key, project.cover.key])
	const tall = project.photos.find(
		(p): p is Photo => p.orientation === 'portrait' && !paired.has(p.key),
	)
	const href = `/bold/projects/${project.slug}`

	return (
		<article>
			<h3
				className={`bold-display text-[clamp(4rem,17vw,16rem)] text-(--oxblood) ${flip ? 'md:text-right' : ''}`}
			>
				<Link
					href={href}
					className="hover:underline hover:decoration-2 hover:underline-offset-[0.1em] focus-visible:underline focus-visible:outline-none"
				>
					{project.name}
				</Link>
			</h3>

			<div className="mt-8 space-y-3 md:mt-10 md:space-y-4">
				<div className="grid gap-3 md:aspect-[9/4] md:grid-cols-12 md:grid-rows-1 md:gap-4">
					<Frame
						photo={project.cover}
						fill
						sizes="(min-width: 768px) 66vw, 100vw"
						className={`md:col-span-8 ${flip ? 'md:order-last' : ''}`}
					/>
					{tall && (
						<Frame
							photo={tall}
							fill
							sizes="(min-width: 768px) 33vw, 100vw"
							className="md:col-span-4"
						/>
					)}
				</div>

				<div className="grid gap-3 md:aspect-[8/3] md:grid-cols-12 md:grid-rows-1 md:gap-4">
					<div
						className={`flex flex-col justify-between gap-10 p-6 text-(--plaster) md:col-span-6 md:p-10 ${projectColour(project.slug)} ${flip ? '' : 'md:order-last'}`}
					>
						<p className="text-sm">
							{project.kind} in {project.location}
						</p>
						<div>
							<p className="max-w-sm text-lg leading-snug md:text-xl">
								{project.summary}
							</p>
							<Link
								href={href}
								className="mt-6 inline-block underline underline-offset-4 hover:decoration-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
							>
								See all of {project.name}
							</Link>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-3 md:col-span-6 md:gap-4">
						<Frame
							photo={pairA}
							fill
							sizes="(min-width: 768px) 25vw, 50vw"
						/>
						<Frame
							photo={pairB}
							fill
							sizes="(min-width: 768px) 25vw, 50vw"
						/>
					</div>
				</div>
			</div>
		</article>
	)
}
