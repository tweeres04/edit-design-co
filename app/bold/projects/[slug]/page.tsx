import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProject, projects } from '@/lib/projects'
import { Contact } from '../../_components/contact'
import { Header } from '../../_components/header'
import { Mosaic } from '../../_components/mosaic'
import { projectColour } from '../../_components/project-colour'

export function generateStaticParams() {
	return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata(
	props: PageProps<'/bold/projects/[slug]'>,
): Promise<Metadata> {
	const { slug } = await props.params
	const project = getProject(slug)
	return { title: project ? `${project.name} | Edit Design Co` : undefined }
}

export default async function BoldProject(
	props: PageProps<'/bold/projects/[slug]'>,
) {
	const { slug } = await props.params
	const project = getProject(slug)
	if (!project) notFound()

	const index = projects.indexOf(project)
	const next = projects[(index + 1) % projects.length]

	return (
		<main>
			<section
				className={`${projectColour(project.slug)} pb-16 text-(--plaster) md:pb-24`}
			>
				<Header />
				<div className="px-5 pt-16 md:px-10 md:pt-32">
					<h1 className="bold-display text-[clamp(4.5rem,19vw,18rem)]">
						{project.name}
					</h1>
					<div className="mt-10 grid gap-6 md:mt-16 md:grid-cols-12">
						<p className="text-sm md:col-span-3">
							{project.kind} in {project.location}
						</p>
						<p className="max-w-lg text-lg leading-snug md:col-span-6 md:col-start-7 md:text-xl">
							{project.summary}
						</p>
					</div>
				</div>
			</section>

			<section
				aria-label={`${project.name} photos`}
				className="px-5 py-5 md:px-10 md:py-10"
			>
				<Mosaic photos={project.photos} />
			</section>

			{next.slug !== project.slug && (
				<section className="px-5 py-20 md:px-10 md:py-32">
					<p className="text-sm">Next project</p>
					<Link
						href={`/bold/projects/${next.slug}`}
						className="bold-display mt-4 inline-block text-[clamp(4rem,15vw,14rem)] text-(--oxblood) hover:underline hover:decoration-2 hover:underline-offset-[0.1em] focus-visible:underline focus-visible:outline-none"
					>
						{next.name}
					</Link>
				</section>
			)}

			<Contact />
		</main>
	)
}
