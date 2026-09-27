import Link from 'next/link'
import { Wordmark } from '@/components/wordmark'

// Temporary index for comparing directions. Becomes the real homepage once
// Melissa picks one.
const approaches = [
	{
		href: '/cover',
		name: 'Cover',
		description:
			'For phones. A full-screen photo and a full-screen menu. Below the fold is still to come.',
	},
	{
		href: '/gallery',
		name: 'Gallery',
		description:
			'Quiet and framed. One typeface, photos matted like prints.',
	},
	{
		href: '/editorial',
		name: 'Editorial',
		description:
			'Magazine spreads. Big serif project names, photos placed off-centre.',
	},
	{
		href: '/split',
		name: 'Split',
		description:
			'The studio stays put on the left while tall photos scroll on the right.',
	},
	{
		href: '/bold',
		name: 'Bold',
		description:
			'Colour blocks pulled from the cabinetry and oversized condensed type.',
	},
	{
		href: '/grid',
		name: 'Grid',
		description:
			'Almost nothing but the work: a tight grid of tall photos.',
	},
]

export default function Home() {
	return (
		<main className="mx-auto max-w-2xl px-6 py-20 text-[#3A3738]">
			<Wordmark className="w-40 text-[#6A1A1B]" />
			<h1 className="mt-12 text-2xl">Directions for the new site</h1>
			<p className="mt-3 text-[#3A3738]/80">
				Each one uses the same photos and details. Click through the
				homepage and a project page for each.
			</p>
			<ol className="mt-10 space-y-6">
				{approaches.map((approach) => (
					<li key={approach.href}>
						<Link
							href={approach.href}
							className="text-lg underline underline-offset-4"
						>
							{approach.name}
						</Link>
						<p className="mt-1">{approach.description}</p>
					</li>
				))}
			</ol>
		</main>
	)
}
