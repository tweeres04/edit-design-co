import Image from 'next/image'
import type { Photo } from '@/lib/projects'

export function Figure({
	photo,
	caption,
	sizes,
	className,
	priority,
}: {
	photo: Photo
	caption?: string
	sizes: string
	className?: string
	priority?: boolean
}) {
	return (
		<figure className={className}>
			<Image
				src={photo.src}
				width={photo.width}
				height={photo.height}
				alt={photo.alt}
				sizes={sizes}
				priority={priority}
				className="h-auto w-full"
			/>
			{caption && (
				<figcaption className="mt-3 max-w-xs text-[13px] text-[#72635A]">
					{caption}
				</figcaption>
			)}
		</figure>
	)
}

export function Diptych({
	pair,
	caption,
	className,
}: {
	pair: [Photo, Photo]
	caption?: string
	className?: string
}) {
	return (
		<figure className={className}>
			<div className="grid grid-cols-2 gap-2 md:gap-3">
				{pair.map((photo) => (
					<Image
						key={photo.key}
						src={photo.src}
						width={photo.width}
						height={photo.height}
						alt={photo.alt}
						sizes="(min-width: 768px) 35vw, 50vw"
						className="h-auto w-full"
					/>
				))}
			</div>
			{caption && (
				<figcaption className="mt-3 max-w-xs text-[13px] text-[#72635A]">
					{caption}
				</figcaption>
			)}
		</figure>
	)
}
