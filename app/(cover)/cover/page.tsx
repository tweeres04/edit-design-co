import Image from 'next/image'
import { Wordmark } from '@/components/wordmark'
import { projects } from '@/lib/projects'
import { Menu } from '../_components/menu'
import './cover.css'

// The 35s loop (5 slides x 7s) and fade timing are baked into the keyframe
// percentages in cover.css; change them together
const SLIDE_SECONDS = 7
const FADE_SECONDS = 2.5

const slideKeys = [
	'beaverbrooke-04',
	'hampshire-kitchen-pantry-031',
	'beaverbrooke-06',
	'hampshire-master-bath-101',
	'beaverbrooke-13',
]
const allPhotos = projects.flatMap((project) => project.photos)
const slides = slideKeys.map((key) =>
	allPhotos.find((photo) => photo.key === key)!,
)

export default function CoverHome() {
	return (
		<main className="relative h-svh overflow-hidden bg-[#2B2627]">
			{slides.map((photo, index) => (
				<Image
					key={photo.key}
					src={photo.src}
					alt={photo.alt}
					fill
					preload={index === 0}
					sizes="100vw"
					className={`animate-[cover-slideshow_35s_ease-in-out_infinite] object-cover motion-reduce:animate-none ${index === 0 ? '' : 'opacity-0'}`}
					// Offset so the first slide starts fully shown
					style={{
						animationDelay: `${index * SLIDE_SECONDS - FADE_SECONDS}s`,
					}}
				/>
			))}
			{/* Her photos have bright white ceilings, so the light wordmark
			    needs a soft shade behind it */}
			<div className="absolute inset-x-0 top-0 z-10 h-44 bg-linear-to-b from-black/45 to-transparent" />
			<header className="absolute inset-x-0 top-0 z-10 flex items-start justify-between px-6 pt-7 text-[#F6F3EF]">
				<Wordmark className="w-32" />
				<Menu />
			</header>
		</main>
	)
}
