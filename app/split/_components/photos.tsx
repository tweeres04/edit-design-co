import Image from 'next/image'
import { projects, type Photo, type Project } from '@/lib/projects'

// The photo column is 8/13 of the screen on desktop
const COLUMN = '(min-width: 1024px) 62vw, 100vw'
const HALF_COLUMN = '(min-width: 1024px) 31vw, 50vw'
// A portrait shown at full screen height is about 2/3 of the height wide
const SCREEN_TALL = '(min-width: 1024px) 45vw, 100vw'

export type Frame =
	| { kind: 'wide'; photo: Photo }
	| { kind: 'pair'; photos: [Photo, Photo] }
	| { kind: 'tall'; photo: Photo }

export function photoByKey(key: string) {
	for (const project of projects) {
		const photo = project.photos.find((p) => p.key === key)
		if (photo) return photo
	}
	throw new Error(`No photo with key ${key}`)
}

// Lays out a whole project: landscapes run full width, curated pairs sit
// side by side, and leftover portraits are paired with their neighbour.
export function framesForProject(project: Project): Frame[] {
	const pairedWith = new Map<string, [Photo, Photo]>()
	for (const pair of project.pairs) {
		pairedWith.set(pair[0].key, pair)
		pairedWith.set(pair[1].key, pair)
	}

	const frames: Frame[] = []
	const placed = new Set<string>()
	let waiting: Photo | undefined

	for (const photo of project.photos) {
		if (placed.has(photo.key)) continue
		const pair = pairedWith.get(photo.key)
		if (photo.orientation === 'landscape') {
			frames.push({ kind: 'wide', photo })
		} else if (pair) {
			frames.push({ kind: 'pair', photos: pair })
			placed.add(pair[0].key)
			placed.add(pair[1].key)
		} else if (waiting) {
			frames.push({ kind: 'pair', photos: [waiting, photo] })
			waiting = undefined
		} else {
			waiting = photo
		}
		placed.add(photo.key)
	}
	if (waiting) frames.push({ kind: 'tall', photo: waiting })

	return frames
}

export function Frames({
	frames,
	preloadFirst = false,
}: {
	frames: Frame[]
	preloadFirst?: boolean
}) {
	return frames.map((frame, index) => {
		const preload = preloadFirst && index === 0
		if (frame.kind === 'wide') {
			return (
				<Image
					key={frame.photo.key}
					src={frame.photo.src}
					width={frame.photo.width}
					height={frame.photo.height}
					alt={frame.photo.alt}
					sizes={COLUMN}
					preload={preload}
					className="h-auto w-full"
				/>
			)
		}
		if (frame.kind === 'pair') {
			return (
				<div
					key={frame.photos[0].key}
					className="grid grid-cols-2 gap-1.5"
				>
					{frame.photos.map((photo) => (
						<Image
							key={photo.key}
							src={photo.src}
							width={photo.width}
							height={photo.height}
							alt={photo.alt}
							sizes={HALF_COLUMN}
							preload={preload}
							className="h-auto w-full"
						/>
					))}
				</div>
			)
		}
		return (
			<TallFrame
				key={frame.photo.key}
				photo={frame.photo}
				caption={frame.photo.alt}
			/>
		)
	})
}

// A single portrait at full screen height, with its caption in the space
// beside it. On phones it just runs full width.
export function TallFrame({
	photo,
	caption,
}: {
	photo: Pick<Photo, 'src' | 'width' | 'height' | 'alt'>
	caption: React.ReactNode
}) {
	return (
		<figure className="lg:flex lg:h-dvh">
			<Image
				src={photo.src}
				width={photo.width}
				height={photo.height}
				alt={photo.alt}
				sizes={SCREEN_TALL}
				className="h-auto w-full lg:h-full lg:w-auto"
			/>
			<figcaption className="px-6 pt-3 pb-6 text-sm text-[#3A3738]/80 sm:px-10 lg:flex lg:max-w-xs lg:items-end lg:px-8 lg:pb-10">
				<p>{caption}</p>
			</figcaption>
		</figure>
	)
}
