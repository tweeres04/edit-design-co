'use client'

import { useEffect, useRef, useState } from 'react'

type Photo = {
	key: string
	usage?: string
	objectPosition?: string
	landscapeKey?: string
}

type CropFormat = 'desktop' | 'phone'

const CROP_ASPECTS: Record<CropFormat, string> = {
	desktop: 'aspect-video',
	phone: 'aspect-[9/19.5]',
}

function keyForFormat(photo: Photo, format: CropFormat) {
	return format === 'desktop' ? (photo.landscapeKey ?? photo.key) : photo.key
}

// A room's thumbnails. Clicking one opens it in the browser's fullscreen mode,
// where the left and right arrow keys flip through the room and Escape exits.
// With showCrops, each photo has a desktop and a phone thumbnail cropped the way
// the homepage does, and fullscreen stays in the format that was clicked.
export function PhotoGrid({
	bucket,
	photos,
	showCrops = false,
}: {
	bucket: string
	photos: Photo[]
	showCrops?: boolean
}) {
	const viewerRef = useRef<HTMLDivElement>(null)
	const [openIndex, setOpenIndex] = useState<number | null>(null)
	const [openFormat, setOpenFormat] = useState<CropFormat>('desktop')

	function openFullscreen(index: number, format: CropFormat) {
		setOpenIndex(index)
		setOpenFormat(format)
		viewerRef.current?.requestFullscreen()
	}

	useEffect(() => {
		function flipWithArrowKeys(event: KeyboardEvent) {
			const step =
				event.key === 'ArrowRight'
					? 1
					: event.key === 'ArrowLeft'
						? -1
						: 0
			if (step === 0) return
			setOpenIndex((index) =>
				index === null
					? null
					: (index + step + photos.length) % photos.length,
			)
		}
		function closeWhenFullscreenExits() {
			if (document.fullscreenElement !== viewerRef.current)
				setOpenIndex(null)
		}
		window.addEventListener('keydown', flipWithArrowKeys)
		document.addEventListener('fullscreenchange', closeWhenFullscreenExits)
		return () => {
			window.removeEventListener('keydown', flipWithArrowKeys)
			document.removeEventListener(
				'fullscreenchange',
				closeWhenFullscreenExits,
			)
		}
	}, [photos.length])

	return (
		<>
			<ul
				className={`mt-4 grid gap-4 ${showCrops ? 'grid-cols-[repeat(auto-fill,minmax(560px,1fr))]' : 'grid-cols-[repeat(auto-fill,minmax(180px,1fr))]'}`}
			>
				{photos.map((photo, index) => (
					<li key={photo.key}>
						{/* Plain imgs: the photo loader needs an orientation we don't
						    know for photos not on the site */}
						{showCrops ? (
							<div className="flex h-60 gap-2">
								{(['desktop', 'phone'] as const).map(
									(format) => (
										<button
											key={format}
											type="button"
											aria-label={`View the ${format} crop of ${photo.key} fullscreen`}
											onClick={() =>
												openFullscreen(index, format)
											}
											className={`h-full cursor-zoom-in ${CROP_ASPECTS[format]}`}
										>
											{/* eslint-disable-next-line @next/next/no-img-element */}
											<img
												src={`${bucket}/${keyForFormat(photo, format)}-800.webp`}
												alt=""
												loading="lazy"
												style={{
													objectPosition:
														photo.objectPosition,
												}}
												className="size-full bg-[#E9E4DE] object-cover"
											/>
										</button>
									),
								)}
							</div>
						) : (
							<button
								type="button"
								aria-label={`View ${photo.key} fullscreen`}
								onClick={() => openFullscreen(index, 'desktop')}
								className="block w-full cursor-zoom-in"
							>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={`${bucket}/${photo.key}-800.webp`}
									alt=""
									loading="lazy"
									className="aspect-square w-full bg-[#E9E4DE] object-contain"
								/>
							</button>
						)}
						<p className="mt-1 text-xs select-all">
							{showCrops && photo.landscapeKey
								? `${photo.landscapeKey} on desktop, ${photo.key} on phones`
								: photo.key}
						</p>
						{showCrops ? (
							<p className="text-xs text-[#6A1A1B]">
								Slide {index + 1}
							</p>
						) : (
							photo.usage && (
								<p className="text-xs text-[#6A1A1B]">
									{photo.usage}
								</p>
							)
						)}
					</li>
				))}
			</ul>
			<div
				ref={viewerRef}
				className="hidden flex-col bg-black text-white [&:fullscreen]:flex"
			>
				{openIndex !== null && (
					<>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src={`${bucket}/${showCrops ? keyForFormat(photos[openIndex], openFormat) : photos[openIndex].key}-2400.webp`}
							alt=""
							style={
								showCrops
									? {
											objectPosition:
												photos[openIndex]
													.objectPosition,
										}
									: undefined
							}
							className={
								!showCrops
									? 'min-h-0 w-full flex-1 object-contain'
									: openFormat === 'phone'
										? `mx-auto h-full object-cover ${CROP_ASPECTS.phone}`
										: 'min-h-0 w-full flex-1 object-cover'
							}
						/>
						<p
							className={`py-2 text-center text-sm select-all ${showCrops ? 'absolute inset-x-0 bottom-0 bg-black/60' : ''}`}
						>
							{showCrops
								? keyForFormat(photos[openIndex], openFormat)
								: photos[openIndex].key}{' '}
							({openIndex + 1} of {photos.length})
							{showCrops
								? `, ${openFormat} crop`
								: photos[openIndex].usage &&
									`, ${photos[openIndex].usage}`}
						</p>
					</>
				)}
			</div>
		</>
	)
}
