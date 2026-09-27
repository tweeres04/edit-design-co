import type { Photo } from '@/lib/projects'
import { Frame } from './frame'

type Row =
	| { kind: 'wide'; photos: [Photo] }
	| { kind: 'wide-tall'; photos: [Photo, Photo]; flip: boolean }
	| { kind: 'three'; photos: Photo[] }
	| { kind: 'two'; photos: Photo[] }

// Group photos into rows that vary the rhythm: a landscape shot pairs with
// the next portrait, and runs of portraits alternate between three-up and
// a narrower two-up.
function toRows(photos: Photo[]): Row[] {
	const rows: Row[] = []
	let flip = false
	let threeNext = true
	let i = 0
	while (i < photos.length) {
		const photo = photos[i]
		const next = photos[i + 1]
		if (photo.orientation === 'landscape') {
			if (next?.orientation === 'portrait') {
				rows.push({ kind: 'wide-tall', photos: [photo, next], flip })
				flip = !flip
				i += 2
			} else {
				rows.push({ kind: 'wide', photos: [photo] })
				i += 1
			}
			continue
		}
		const run: Photo[] = []
		const size = threeNext ? 3 : 2
		while (run.length < size && photos[i]?.orientation === 'portrait') {
			run.push(photos[i])
			i += 1
		}
		rows.push({ kind: run.length === 2 ? 'two' : 'three', photos: run })
		threeNext = !threeNext
	}
	return rows
}

export function Mosaic({ photos }: { photos: Photo[] }) {
	return (
		<div className="space-y-3 md:space-y-4">
			{toRows(photos).map((row) => {
				const key = row.photos.map((p) => p.key).join('+')
				if (row.kind === 'wide') {
					return (
						<Frame key={key} photo={row.photos[0]} sizes="100vw" />
					)
				}
				if (row.kind === 'wide-tall') {
					const [wide, tall] = row.photos
					return (
						<div
							key={key}
							className="grid gap-3 md:aspect-[9/4] md:grid-cols-12 md:grid-rows-1 md:gap-4"
						>
							<Frame
								photo={wide}
								fill
								sizes="(min-width: 768px) 66vw, 100vw"
								className={`md:col-span-8 ${row.flip ? 'md:order-last' : ''}`}
							/>
							<Frame
								photo={tall}
								fill
								sizes="(min-width: 768px) 33vw, 100vw"
								className="md:col-span-4"
							/>
						</div>
					)
				}
				if (row.kind === 'two') {
					return (
						<div
							key={key}
							className="grid gap-3 md:grid-cols-12 md:gap-4"
						>
							{row.photos.map((photo, index) => (
								<Frame
									key={photo.key}
									photo={photo}
									sizes="(min-width: 768px) 42vw, 100vw"
									className={`md:col-span-5 ${index === 0 ? 'md:col-start-2' : ''}`}
								/>
							))}
						</div>
					)
				}
				return (
					<div
						key={key}
						className="grid gap-3 md:grid-cols-3 md:gap-4"
					>
						{row.photos.map((photo) => (
							<Frame
								key={photo.key}
								photo={photo}
								sizes="(min-width: 768px) 33vw, 100vw"
							/>
						))}
					</div>
				)
			})}
		</div>
	)
}
