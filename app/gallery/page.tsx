import { notFound } from 'next/navigation'
import { slides } from '@/lib/slides'

// Dev-only contact sheet of every photo in the MinIO bucket, to help pick
// photos for the site
const BUCKET = 'https://files.tweeres.com/edit-design'

// Where each photo is used on the site. The share image is
// app/opengraph-image.jpg, cropped by hand from this photo.
const usage = new Map<string, string>([
	...slides.map((slide, index) => [slide.key, `Slide ${index + 1}`] as const),
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

export default async function GalleryPage() {
	if (process.env.NODE_ENV === 'production') notFound()
	const groups = await listPhotoKeysByGroup()

	return (
		<main className="px-6 py-10">
			<h1 className="font-(family-name:--font-caslon-display) text-[44px] leading-none text-[#6A1A1B]">
				All photos
			</h1>
			{[...groups].map(([group, keys]) => (
				<section key={group} className="mt-12">
					<h2 className="text-lg">
						{group} ({keys.length})
					</h2>
					<ul className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
						{keys.map((key) => (
							<li key={key}>
								<a
									href={`${BUCKET}/${key}-2400.webp`}
									target="_blank"
								>
									{/* Plain img: the photo loader needs an orientation we don't
									    know for photos not on the site */}
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img
										src={`${BUCKET}/${key}-800.webp`}
										alt=""
										loading="lazy"
										className="aspect-square w-full bg-[#E9E4DE] object-contain"
									/>
								</a>
								<p className="mt-1 text-xs select-all">{key}</p>
								{usage.has(key) && (
									<p className="text-xs text-[#6A1A1B]">
										{usage.get(key)}
									</p>
								)}
							</li>
						))}
					</ul>
				</section>
			))}
		</main>
	)
}
