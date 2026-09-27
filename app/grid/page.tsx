import Image from 'next/image'
import Link from 'next/link'
import { projects, type Photo, type Project } from '@/lib/projects'
import { site } from '@/lib/site'
import { focusRing } from './_components/header'
import { TileImage, tileClass } from './_components/tile'

// Hand-sequenced so each desktop row is three portraits or one landscape plus
// a portrait, alternating between the two projects.
const sequence = [
	'beaverbrooke-10',
	'hampshire-front-entrance-011',
	'beaverbrooke-04',
	'hampshire-kitchen-pantry-031',
	'beaverbrooke-01',
	'hampshire-living-room-083',
	'hampshire-living-room-077',
	'beaverbrooke-07',
	'beaverbrooke-06',
	'hampshire-kitchen-pantry-061',
	'hampshire-kitchen-pantry-052',
	'beaverbrooke-13',
	'hampshire-master-bath-101',
	'beaverbrooke-15',
	'hampshire-upstairs-bathroom-110',
	'beaverbrooke-03',
	'beaverbrooke-21',
	'hampshire-downstairs-bathroom-019',
	'beaverbrooke-17',
	'hampshire-laundry-room-005',
	'hampshire-kitchen-pantry-064',
	'beaverbrooke-05',
	'hampshire-kitchen-pantry-073',
	'beaverbrooke-22',
	'hampshire-living-room-085',
]

const byKey = new Map<string, { photo: Photo; project: Project }>(
	projects.flatMap((project) =>
		project.photos.map((photo) => [photo.key, { photo, project }] as const),
	),
)
const tiles = sequence.map((key) => byKey.get(key)!)

const services = [
	{
		name: 'Renovations',
		description:
			'Full-service design for kitchens, bathrooms and whole homes, from the first walkthrough to the final install.',
	},
	{
		name: 'New builds',
		description:
			'Interiors for custom homes, and for developers building single-family homes, fourplexes and sixplexes.',
	},
	{
		name: 'Drawings',
		description:
			'Architectural drawings in Vectorworks that your contractor can build from without guessing.',
	},
	{
		name: 'Spec packages',
		description:
			'Every material, finish and piece of hardware chosen, sourced and documented in one place.',
	},
]

export default function GridHome() {
	return (
		<main>
			<h1 className="px-3 pb-4 text-[13px] text-(--muted) lg:px-4">
				Interior design for renovations and new builds in{' '}
				{site.serviceArea}
			</h1>

			<section
				id="projects"
				aria-label="Projects"
				className="grid scroll-mt-24 grid-cols-2 gap-1.5 px-1.5 [grid-auto-flow:dense] lg:grid-cols-3 lg:gap-2 lg:px-2"
			>
				{tiles.map(({ photo, project }, index) => (
					<Link
						key={photo.key}
						href={`/grid/projects/${project.slug}`}
						className={`group relative block overflow-hidden bg-(--line) ${tileClass(photo)} ${focusRing}`}
					>
						<TileImage photo={photo} preload={index < 2} />
						<span className="absolute bottom-3 left-3 font-(family-name:--font-grid-serif) text-lg text-white italic opacity-0 [text-shadow:0_1px_12px_rgb(0_0_0/0.35)] group-hover:opacity-100 group-focus-visible:opacity-100 motion-safe:transition-opacity motion-safe:duration-300">
							{project.name}
						</span>
					</Link>
				))}
			</section>

			<div className="grid gap-x-8 gap-y-20 px-3 pt-28 pb-16 lg:grid-cols-3 lg:px-4">
				<section
					id="about"
					className="grid scroll-mt-24 grid-cols-[7rem_1fr] gap-5 lg:col-span-2 lg:grid-cols-[10rem_1fr] lg:gap-8"
				>
					<Image
						src="/melissa.jpg"
						alt={`${site.founder}, principal designer at ${site.name}`}
						width={890}
						height={1182}
						sizes="10rem"
						className="aspect-[3/4] w-full object-cover"
					/>
					<div className="max-w-[34rem] space-y-4 leading-relaxed">
						<h2 className="font-(family-name:--font-grid-serif) text-2xl tracking-normal">
							Hi, I&apos;m Melissa
						</h2>
						<p>
							I design homes for people renovating or building new
							across {site.serviceArea}. Most of my clients are
							taking on a big project, so I start by spending time
							with you to understand how you live and what
							you&apos;ll love coming home to.
						</p>
						<p>
							From there I draw it all up and spec every finish.
							Contractors tell me they like working from my
							packages because nothing is left to interpretation.
						</p>
					</div>
				</section>

				<section id="contact" className="scroll-mt-24 space-y-4">
					<h2 className="font-(family-name:--font-grid-serif) text-2xl tracking-normal">
						Start a project
					</h2>
					<p className="leading-relaxed">
						Tell me a bit about your home and what you&apos;re
						planning. I&apos;m based in {site.location} and work
						across {site.serviceArea}.
					</p>
					<ul className="space-y-1">
						<li>
							<a
								href={`mailto:${site.email}`}
								className={`underline decoration-(--line) underline-offset-4 hover:decoration-current ${focusRing}`}
							>
								{site.email}
							</a>
						</li>
						<li>
							<a
								href={site.phoneHref}
								className={`underline decoration-(--line) underline-offset-4 hover:decoration-current ${focusRing}`}
							>
								{site.phone}
							</a>
						</li>
						<li>
							<a
								href={site.instagram}
								className={`underline decoration-(--line) underline-offset-4 hover:decoration-current ${focusRing}`}
							>
								{site.instagramHandle}
							</a>
						</li>
					</ul>
				</section>

				<section
					id="services"
					className="scroll-mt-24 border-t border-(--line) pt-10 lg:col-span-3"
				>
					<h2 className="font-(family-name:--font-grid-serif) text-2xl tracking-normal">
						What I do
					</h2>
					<dl className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
						{services.map((service) => (
							<div key={service.name}>
								<dt className="font-normal">{service.name}</dt>
								<dd className="mt-2 max-w-[28ch] leading-relaxed text-(--muted)">
									{service.description}
								</dd>
							</div>
						))}
					</dl>
				</section>
			</div>
		</main>
	)
}
