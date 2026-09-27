import Image from 'next/image'
import type { Photo } from '@/lib/projects'

// On mobile every photo keeps its own shape. From md up, `fill` photos
// stretch to whatever grid cell they sit in and crop to cover.
export function Frame({
	photo,
	sizes,
	fill = false,
	className = '',
	priority = false,
}: {
	photo: Photo
	sizes: string
	fill?: boolean
	className?: string
	priority?: boolean
}) {
	if (!fill) {
		return (
			<Image
				src={photo.src}
				width={photo.width}
				height={photo.height}
				alt={photo.alt}
				sizes={sizes}
				priority={priority}
				className={`h-auto w-full ${className}`}
			/>
		)
	}

	const shape =
		photo.orientation === 'landscape' ? 'aspect-[3/2]' : 'aspect-[2/3]'
	return (
		<div className={`relative ${shape} md:aspect-auto ${className}`}>
			<Image
				src={photo.src}
				fill
				alt={photo.alt}
				sizes={sizes}
				priority={priority}
				className="object-cover"
			/>
		</div>
	)
}
