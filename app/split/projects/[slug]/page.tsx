import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProject, projects } from '@/lib/projects'
import { focusRing, SplitSection } from '../../_components/panel'
import { Frames, framesForProject } from '../../_components/photos'

export function generateStaticParams() {
	return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata(
	props: PageProps<'/split/projects/[slug]'>,
): Promise<Metadata> {
	const { slug } = await props.params
	const project = getProject(slug)
	return { title: `${project?.name} | Edit Design Co` }
}

export default async function SplitProject(
	props: PageProps<'/split/projects/[slug]'>,
) {
	const { slug } = await props.params
	const project = getProject(slug)
	if (!project) notFound()

	const next = projects[(projects.indexOf(project) + 1) % projects.length]

	return (
		<main>
			<SplitSection
				first
				current="projects"
				panel={
					<div className="max-w-sm">
						<Link
							href="/split#projects"
							className={`${focusRing} text-sm text-[#F6F3EF]/75 underline-offset-[6px] hover:underline`}
						>
							All projects
						</Link>
						<h1 className="mt-6 text-4xl font-light tracking-tight xl:text-5xl">
							{project.name}
						</h1>
						<p className="mt-4 text-sm text-[#F6F3EF]/75">
							{project.kind} in {project.location}
						</p>
						<p className="mt-6">{project.summary}</p>
						{next !== project && (
							<p className="mt-10 text-sm">
								Next project:{' '}
								<Link
									href={`/split/projects/${next.slug}`}
									className={`${focusRing} underline underline-offset-[6px] hover:decoration-2`}
								>
									{next.name}
								</Link>
							</p>
						)}
					</div>
				}
			>
				<Frames preloadFirst frames={framesForProject(project)} />
			</SplitSection>
		</main>
	)
}
