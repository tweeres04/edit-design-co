'use client'

import { useEffect, useRef, useState } from 'react'

type Photo = { key: string; usage?: string }

// A room's thumbnails. Clicking one opens it in the browser's fullscreen mode,
// where the left and right arrow keys flip through the room and Escape exits.
export function PhotoGrid({
	bucket,
	photos,
}: {
	bucket: string
	photos: Photo[]
}) {
	const viewerRef = useRef<HTMLDivElement>(null)
	const [openIndex, setOpenIndex] = useState<number | null>(null)

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
			<ul className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
				{photos.map((photo, index) => (
					<li key={photo.key}>
						<button
							type="button"
							aria-label={`View ${photo.key} fullscreen`}
							onClick={() => {
								setOpenIndex(index)
								viewerRef.current?.requestFullscreen()
							}}
							className="block w-full cursor-zoom-in"
						>
							{/* Plain img: the photo loader needs an orientation we don't
							    know for photos not on the site */}
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src={`${bucket}/${photo.key}-800.webp`}
								alt=""
								loading="lazy"
								className="aspect-square w-full bg-[#E9E4DE] object-contain"
							/>
						</button>
						<p className="mt-1 text-xs select-all">{photo.key}</p>
						{photo.usage && (
							<p className="text-xs text-[#6A1A1B]">
								{photo.usage}
							</p>
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
							src={`${bucket}/${photos[openIndex].key}-2400.webp`}
							alt=""
							className="min-h-0 flex-1 object-contain"
						/>
						<p className="py-2 text-center text-sm select-all">
							{photos[openIndex].key} ({openIndex + 1} of{' '}
							{photos.length})
							{photos[openIndex].usage &&
								`, ${photos[openIndex].usage}`}
						</p>
					</>
				)}
			</div>
		</>
	)
}
