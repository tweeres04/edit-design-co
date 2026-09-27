import Image from 'next/image'
import type { Photo } from '@/lib/projects'

// A photo matted like a print: a pale mat around the image, and a small
// wall label underneath.
export function Framed({
	photo,
	sizes,
	caption,
	priority,
	className,
}: {
	photo: Photo
	sizes: string
	caption?: React.ReactNode
	priority?: boolean
	className?: string
}) {
	return (
		<figure className={className}>
			<div className="bg-[#FAFAF8] p-[clamp(12px,3.5vw,48px)]">
				<Image
					src={photo.src}
					width={photo.width}
					height={photo.height}
					alt={photo.alt}
					sizes={sizes}
					priority={priority}
					className="h-auto w-full"
				/>
			</div>
			{caption && (
				<figcaption className="mt-3 text-sm text-[#6E6A67]">
					{caption}
				</figcaption>
			)}
		</figure>
	)
}
