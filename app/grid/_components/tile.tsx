import Image from 'next/image'
import type { Photo } from '@/lib/projects'

// Portrait tiles are 2:3. Landscape tiles span two columns; on wide screens
// they stretch to the height of the portrait beside them, on narrow screens
// they take a full row at 4:3.
export function tileClass(photo: Photo) {
	return photo.orientation === 'landscape'
		? 'col-span-2 aspect-[4/3] lg:aspect-auto'
		: 'aspect-[2/3]'
}

export function tileSizes(photo: Photo) {
	return photo.orientation === 'landscape'
		? '(min-width: 1024px) 66vw, 100vw'
		: '(min-width: 1024px) 33vw, 50vw'
}

export function TileImage({
	photo,
	preload,
}: {
	photo: Photo
	preload?: boolean
}) {
	return (
		<Image
			src={photo.src}
			alt={photo.alt}
			fill
			sizes={tileSizes(photo)}
			preload={preload}
			className="object-cover motion-safe:transition-[filter] motion-safe:duration-300 group-hover:brightness-[0.82] group-focus-visible:brightness-[0.82]"
		/>
	)
}
