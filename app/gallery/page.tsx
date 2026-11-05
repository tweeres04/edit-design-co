import Link from 'next/link'
import { notFound } from 'next/navigation'
import { slides } from '@/lib/slides'
import { PhotoGrid } from './_components/photo-grid'

// Dev-only contact sheet of every photo in the MinIO bucket, to help pick
// photos for the site
const BUCKET = 'https://files.tweeres.com/edit-design'

// Where each photo is used on the site. The share image is
// app/opengraph-image.jpg, cropped by hand from this photo.
const usage = new Map<string, string>([
	...slides.map(
		(slide, index) =>
			[
				slide.key,
				`Slide ${index + 1}${slide.landscapeKey ? ' on phones' : ''}`,
			] as const,
	),
	...slides.flatMap((slide, index) =>
		slide.landscapeKey
			? [[slide.landscapeKey, `Slide ${index + 1} on desktop`] as const]
			: [],
	),
	['beaverbrooke-12', 'Share image'],
])

async function listPhotoKeysByGroup() {
	// The bucket is publicly listable and holds well under the 1,000 keys
	// a single list request returns
	const xml = await (await fetch(`${BUCKET}?list-type=2`)).text()
	const keys = [...xml.matchAll(/<Key>([^<]+)-800\.webp<\/Key>/g)].map(
		(match) => match[1],
	)
	const groups = new Map<string, string[]>()
	for (const key of keys) {
		const group = key.replace(/-\d+$/, '')
		groups.set(group, [...(groups.get(group) ?? []), key])
	}
	return groups
}

export default async function GalleryPage({
	searchParams,
}: {
	searchParams: Promise<{ show?: string }>
}) {
	if (process.env.NODE_ENV === 'production') notFound()
	const showCarousel = (await searchParams).show === 'carousel'
	// The carousel stays in slide order, so flipping through it matches the site
	const groups = showCarousel
		? new Map([['carousel', slides.map((slide) => slide.key)]])
		: await listPhotoKeysByGroup()

	return (
		<main className="px-6 py-10">
			<h1 className="font-(family-name:--font-caslon-display) text-[44px] leading-none text-[#6A1A1B]">
				{showCarousel ? 'Carousel photos' : 'All photos'}
			</h1>
			<Link
				href={showCarousel ? '/gallery' : '/gallery?show=carousel'}
				className="mt-4 inline-block text-sm underline underline-offset-4"
			>
				{showCarousel ? 'Show all photos' : 'Show only the carousel'}
			</Link>
			{showCarousel && (
				<p className="mt-2 text-sm">
					Each photo shows its 16:9 desktop crop, then its phone crop.
					Click either one to see it fullscreen.
				</p>
			)}
			{[...groups].map(([group, keys]) => (
				<section key={group} className="mt-12">
					<h2 className="text-lg">
						{group} ({keys.length})
					</h2>
					<PhotoGrid
						bucket={BUCKET}
						showCrops={showCarousel}
						photos={keys.map((key) => {
							const slide = slides.find(
								(slide_) => slide_.key === key,
							)
							return {
								key,
								usage: usage.get(key),
								objectPosition: slide?.objectPosition,
								landscapeKey: slide?.landscapeKey,
							}
						})}
					/>
				</section>
			))}
		</main>
	)
}
