'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import type { Photo } from '@/lib/projects'
import { focusRing } from './header'
import { TileImage, tileClass } from './tile'

// Project grid with a lightbox. The native <dialog> gives us the focus trap,
// Escape to close and aria-modal for free.
export function Gallery({ photos }: { photos: Photo[] }) {
	const dialog = useRef<HTMLDialogElement>(null)
	const [index, setIndex] = useState(0)
	const current = photos[index]

	function open(photoIndex: number) {
		setIndex(photoIndex)
		dialog.current?.showModal()
	}

	function step(by: number) {
		setIndex((i) => (i + by + photos.length) % photos.length)
	}

	const buttonClass = `px-3 py-2 text-[13px] text-white/80 hover:text-white ${focusRing} focus-visible:outline-white`

	return (
		<>
			<ul className="grid grid-cols-2 gap-1.5 px-1.5 [grid-auto-flow:dense] lg:grid-cols-3 lg:gap-2 lg:px-2">
				{photos.map((photo, photoIndex) => (
					<li
						key={photo.key}
						className={`relative ${tileClass(photo)}`}
					>
						<button
							type="button"
							onClick={() => open(photoIndex)}
							aria-label={`View larger: ${photo.alt}`}
							className={`group absolute inset-0 cursor-zoom-in overflow-hidden bg-(--line) ${focusRing}`}
						>
							<TileImage photo={photo} preload={photoIndex < 2} />
						</button>
					</li>
				))}
			</ul>

			<dialog
				ref={dialog}
				aria-label="Photo viewer"
				onKeyDown={(event) => {
					if (event.key === 'ArrowRight') step(1)
					if (event.key === 'ArrowLeft') step(-1)
				}}
				onClick={(event) => {
					if (event.target === event.currentTarget)
						dialog.current?.close()
				}}
				className="m-0 h-dvh max-h-none w-dvw max-w-none flex-col bg-transparent p-0 backdrop:bg-[#1E1611]/95 open:flex"
			>
				<div className="flex items-center justify-between px-2 pt-2">
					<p
						className="px-3 text-[13px] text-white/70"
						aria-live="polite"
					>
						{index + 1} of {photos.length}
					</p>
					<button
						type="button"
						onClick={() => dialog.current?.close()}
						className={buttonClass}
					>
						Close
					</button>
				</div>
				<div
					className="relative min-h-0 flex-1"
					onClick={(event) => {
						if (event.target === event.currentTarget)
							dialog.current?.close()
					}}
				>
					<Image
						key={current.key}
						src={current.src}
						alt={current.alt}
						fill
						sizes="100vw"
						className="pointer-events-none object-contain p-4"
					/>
				</div>
				<div className="flex items-center justify-between px-2 pb-2">
					<button
						type="button"
						onClick={() => step(-1)}
						className={buttonClass}
					>
						Previous
					</button>
					<p className="hidden max-w-[60ch] truncate text-[13px] text-white/60 sm:block">
						{current.alt}
					</p>
					<button
						type="button"
						onClick={() => step(1)}
						className={buttonClass}
					>
						Next
					</button>
				</div>
			</dialog>
		</>
	)
}
