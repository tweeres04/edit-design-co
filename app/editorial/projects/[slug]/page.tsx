import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProject, projects, type Photo } from '@/lib/projects'
import { Diptych, Figure } from '../../_components/figure'

export function generateStaticParams() {
	return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata(
	props: PageProps<'/editorial/projects/[slug]'>,
): Promise<Metadata> {
	const { slug } = await props.params
	const project = getProject(slug)
	return { title: project ? `${project.name} | Edit Design Co` : undefined }
}

const ROOMS: Record<string, string> = {
	'downstairs-bathroom': 'Downstairs bathroom',
	'front-entrance': 'Front entrance',
	'kitchen-pantry': 'Kitchen and pantry',
	'laundry-room': 'Laundry room',
	'living-room': 'Living room',
	'master-bath': 'Primary bath',
	'master-closet': 'Primary closet',
	'upstairs-bathroom': 'Upstairs bathroom',
}

// Hampshire keys name the room; Beaverbrooke's don't, so fall back to the alt
function caption(photo: Photo) {
	const room = Object.keys(ROOMS).find((r) => photo.key.includes(`-${r}-`))
	return room ? ROOMS[room] : photo.alt
}

type Block =
	| { type: 'single'; photo: Photo; index: number }
	| { type: 'pair'; pair: [Photo, Photo] }

// Singles and pairs interleaved: two singles, then a pair, until both run out
function toBlocks(photos: Photo[], pairs: [Photo, Photo][]): Block[] {
	const paired = new Set(pairs.flat().map((p) => p.key))
	const singles = photos.filter((p) => !paired.has(p.key))
	const blocks: Block[] = []
	let s = 0
	let p = 0
	while (s < singles.length || p < pairs.length) {
		for (let i = 0; i < 2 && s < singles.length; i++, s++) {
			blocks.push({ type: 'single', photo: singles[s], index: s })
		}
		if (p < pairs.length) blocks.push({ type: 'pair', pair: pairs[p++] })
	}
	return blocks
}

// Placements cycle so no two neighbouring spreads sit in the same spot
const PORTRAIT_PLACEMENTS = [
	'col-span-11 md:col-span-5 md:col-start-2',
	'col-span-9 col-start-4 md:col-span-4 md:col-start-8',
	'col-span-10 col-start-2 md:col-span-4 md:col-start-5',
]
const LANDSCAPE_PLACEMENTS = [
	'col-span-12 md:col-span-8 md:col-start-5',
	'col-span-12 md:col-span-9',
]
const PAIR_PLACEMENTS = [
	'col-span-12 md:col-span-7 md:col-start-2',
	'col-span-12 md:col-span-7 md:col-start-5',
]

export default async function EditorialProject(
	props: PageProps<'/editorial/projects/[slug]'>,
) {
	const { slug } = await props.params
	const project = getProject(slug)
	if (!project) notFound()

	const rest = project.photos.filter((p) => p.key !== project.cover.key)
	const blocks = toBlocks(rest, project.pairs)
	const next = projects[(projects.indexOf(project) + 1) % projects.length]
	let pairCount = 0

	return (
		<main>
			<article>
				<header className="mx-auto max-w-[1400px] px-5 pt-10 md:px-10 md:pt-20">
					<p className="text-[13px] text-[#72635A]">
						{project.kind} in {project.location}
					</p>
					<h1 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(3.5rem,14vw,12rem)] leading-[0.9] tracking-[-0.02em] text-[#6A1A1B]">
						{project.name}
					</h1>
					<p className="mt-8 max-w-2xl font-[family-name:var(--font-display)] text-2xl leading-snug italic md:ml-[25%] md:text-3xl">
						{project.summary}
					</p>
				</header>

				<div className="mx-auto mt-16 max-w-[1400px] px-5 md:mt-24 md:px-10">
					<Figure
						photo={project.cover}
						caption={caption(project.cover)}
						sizes="(min-width: 1400px) 1320px, 100vw"
						priority
					/>
				</div>

				<div className="mx-auto mt-20 grid max-w-[1400px] grid-cols-12 gap-x-4 gap-y-20 px-5 md:mt-32 md:gap-y-32 md:px-10">
					{blocks.map((block) => {
						if (block.type === 'pair') {
							const placement =
								PAIR_PLACEMENTS[
									pairCount++ % PAIR_PLACEMENTS.length
								]
							return (
								<Diptych
									key={block.pair[0].key}
									pair={block.pair}
									caption={caption(block.pair[0])}
									className={placement}
								/>
							)
						}
						const { photo, index } = block
						const landscape = photo.orientation === 'landscape'
						const placements = landscape
							? LANDSCAPE_PLACEMENTS
							: PORTRAIT_PLACEMENTS
						return (
							<Figure
								key={photo.key}
								photo={photo}
								caption={caption(photo)}
								sizes={
									landscape
										? '(min-width: 768px) 70vw, 100vw'
										: '(min-width: 768px) 40vw, 90vw'
								}
								className={
									placements[index % placements.length]
								}
							/>
						)
					})}
				</div>
			</article>

			<nav
				aria-label="More projects"
				className="mx-auto mt-32 max-w-[1400px] px-5 md:mt-48 md:px-10"
			>
				<p className="text-[13px] text-[#72635A]">Next project</p>
				<Link
					href={`/editorial/projects/${next.slug}`}
					className="mt-2 inline-block font-[family-name:var(--font-display)] text-[clamp(3rem,10vw,8rem)] leading-none tracking-[-0.02em] text-[#6A1A1B] hover:italic focus-visible:italic"
				>
					{next.name}
				</Link>
			</nav>
		</main>
	)
}
