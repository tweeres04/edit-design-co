import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProject, projects, type Photo } from '@/lib/projects'
import { Framed } from '../../_components/framed'

type Step =
	| { kind: 'single'; photo: Photo; side: 'left' | 'right' }
	| { kind: 'pair'; photos: [Photo, Photo] }

// Two single photos, then a diptych, repeated, so the page has a slow rhythm
function sequence(photos: Photo[], pairs: [Photo, Photo][]): Step[] {
	const paired = new Set(pairs.flat().map((photo) => photo.key))
	const singles = photos.filter((photo) => !paired.has(photo.key))
	const steps: Step[] = []
	let pairIndex = 0
	let portraitCount = 0
	singles.forEach((photo, index) => {
		// Portraits alternate sides, like prints hung down a hallway
		const side =
			photo.orientation === 'portrait' && portraitCount++ % 2 === 1
				? 'right'
				: 'left'
		steps.push({ kind: 'single', photo, side })
		if (index % 2 === 1 && pairIndex < pairs.length) {
			steps.push({ kind: 'pair', photos: pairs[pairIndex++] })
		}
	})
	for (const pair of pairs.slice(pairIndex)) {
		steps.push({ kind: 'pair', photos: pair })
	}
	return steps
}

export function generateStaticParams() {
	return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
	params,
}: PageProps<'/gallery/projects/[slug]'>) {
	const project = getProject((await params).slug)
	return { title: project ? `${project.name} | Edit Design Co` : undefined }
}

export default async function GalleryProject({
	params,
}: PageProps<'/gallery/projects/[slug]'>) {
	const project = getProject((await params).slug)
	if (!project) notFound()

	const next = projects[(projects.indexOf(project) + 1) % projects.length]

	return (
		<main className="mx-auto max-w-7xl px-5 sm:px-10">
			<div className="max-w-2xl pt-10 sm:pt-16">
				<h1 className="text-4xl sm:text-5xl">{project.name}</h1>
				<p className="mt-3 text-[#6E6A67]">
					{project.kind} in {project.location}
				</p>
				<p className="mt-8 text-lg leading-relaxed">
					{project.summary}
				</p>
			</div>

			<div className="mt-20 space-y-24 sm:mt-28 sm:space-y-36">
				{sequence(project.photos, project.pairs).map((step) => {
					if (step.kind === 'pair') {
						return (
							<div
								key={step.photos[0].key}
								className="grid grid-cols-2 gap-[clamp(12px,3.5vw,48px)] bg-[#FAFAF8] p-[clamp(12px,3.5vw,48px)] md:mx-[8%]"
							>
								{step.photos.map((photo) => (
									<Image
										key={photo.key}
										src={photo.src}
										width={photo.width}
										height={photo.height}
										alt={photo.alt}
										sizes="(min-width: 1280px) 420px, 42vw"
										className="h-auto w-full"
									/>
								))}
							</div>
						)
					}
					const { photo } = step
					if (photo.orientation === 'landscape') {
						return (
							<Framed
								key={photo.key}
								photo={photo}
								sizes="(min-width: 1280px) 1100px, 90vw"
								caption={photo.alt}
							/>
						)
					}
					const side =
						step.side === 'left'
							? 'md:ml-[14%]'
							: 'md:ml-auto md:mr-[14%]'
					return (
						<Framed
							key={photo.key}
							photo={photo}
							sizes="(min-width: 768px) 480px, 90vw"
							caption={photo.alt}
							className={`max-w-lg ${side}`}
						/>
					)
				})}
			</div>

			<nav
				aria-label="More projects"
				className="mt-28 flex flex-col gap-4 border-t border-[#CFC9C2] pt-8 sm:mt-40 sm:flex-row sm:justify-between"
			>
				<Link
					href="/gallery#projects"
					className="transition-colors hover:text-[#6A1A1B]"
				>
					All projects
				</Link>
				<Link
					href={`/gallery/projects/${next.slug}`}
					className="text-lg transition-colors hover:text-[#6A1A1B]"
				>
					Next project: {next.name}
				</Link>
			</nav>
		</main>
	)
}
