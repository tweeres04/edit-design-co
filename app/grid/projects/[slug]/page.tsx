import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProject, projects } from '@/lib/projects'
import { site } from '@/lib/site'
import { Gallery } from '../../_components/gallery'
import { focusRing } from '../../_components/header'

export function generateStaticParams() {
	return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata(
	props: PageProps<'/grid/projects/[slug]'>,
): Promise<Metadata> {
	const { slug } = await props.params
	const project = getProject(slug)
	return project
		? {
				title: `${project.name} | ${site.name}`,
				description: project.summary,
			}
		: {}
}

export default async function GridProject(
	props: PageProps<'/grid/projects/[slug]'>,
) {
	const { slug } = await props.params
	const project = getProject(slug)
	if (!project) notFound()

	const others = projects.filter((other) => other.slug !== project.slug)

	return (
		<main>
			<div className="grid gap-x-8 gap-y-3 px-3 pt-6 pb-8 lg:grid-cols-3 lg:px-4">
				<div>
					<h1 className="font-(family-name:--font-grid-serif) text-3xl tracking-normal">
						{project.name}
					</h1>
					<p className="mt-1 text-[13px] text-(--muted)">
						{project.kind} in {project.location}
					</p>
				</div>
				<p className="max-w-[46ch] leading-relaxed lg:col-span-2">
					{project.summary}
				</p>
			</div>

			<Gallery photos={project.photos} />

			<nav
				aria-label="More projects"
				className="flex flex-wrap gap-x-6 gap-y-2 px-3 pt-16 pb-8 lg:px-4"
			>
				<Link
					href="/grid"
					className={`underline decoration-(--line) underline-offset-4 hover:decoration-current ${focusRing}`}
				>
					All projects
				</Link>
				{others.map((other) => (
					<Link
						key={other.slug}
						href={`/grid/projects/${other.slug}`}
						className={`underline decoration-(--line) underline-offset-4 hover:decoration-current ${focusRing}`}
					>
						Next: {other.name}
					</Link>
				))}
			</nav>
		</main>
	)
}
