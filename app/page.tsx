import Image, { getImageProps } from 'next/image'
import { Wordmark } from '@/components/wordmark'
import { site } from '@/lib/site'
import { slides } from '@/lib/slides'
import { Menu } from './_components/menu'

const SLIDE_SECONDS = 7
const FADE_SECONDS = 2.5
const LOOP_SECONDS = slides.length * SLIDE_SECONDS

// Keyframe percentages depend on the loop length, so they're generated from
// the slide count. Each slide fades in on top (z-index 2), drops beneath the
// next slide, then stays opaque until that slide has fully faded in over it,
// so the crossfade never dims to the background.
function percentOfLoop(seconds: number) {
	return (seconds / LOOP_SECONDS) * 100
}
const fadedIn = percentOfLoop(FADE_SECONDS)
const coveredByNext = percentOfLoop(SLIDE_SECONDS + FADE_SECONDS)
const slideshowKeyframes = `@keyframes cover-slideshow {
	0% { opacity: 0; z-index: 2; }
	${fadedIn.toFixed(2)}% { opacity: 1; z-index: 2; }
	${(fadedIn + 0.01).toFixed(2)}% { z-index: 1; }
	${coveredByNext.toFixed(2)}% { opacity: 1; z-index: 1; }
	${(coveredByNext + 0.01).toFixed(2)}% { opacity: 0; }
	100% { opacity: 0; }
}`

// Tells search engines who the business is. She works from home, so it
// lists her town and service area instead of a street address.
const jsonLd = {
	'@context': 'https://schema.org',
	'@graph': [
		{
			'@type': 'WebSite',
			'@id': `${site.url}/#website`,
			name: site.name,
			url: site.url,
			publisher: { '@id': `${site.url}/#business` },
		},
		{
			'@type': 'LocalBusiness',
			'@id': `${site.url}/#business`,
			// Schema.org has no interior designer type; this is Wikidata's
			// "interior design"
			additionalType: 'https://www.wikidata.org/wiki/Q179232',
			name: site.name,
			url: site.url,
			description: site.description,
			logo: `${site.url}/brand/icon.png`,
			image: `https://files.tweeres.com/edit-design/${slides[0].key}-1600.webp`,
			email: site.email,
			telephone: site.phoneHref.replace('tel:', ''),
			address: {
				'@type': 'PostalAddress',
				addressLocality: 'Langford',
				addressRegion: 'BC',
				addressCountry: 'CA',
			},
			areaServed: { '@type': 'Place', name: `${site.serviceArea}, BC` },
			founder: {
				'@type': 'Person',
				name: site.founder,
				jobTitle: site.founderRole,
			},
			sameAs: [site.instagram],
		},
	],
}

export default function Home() {
	return (
		<main className="relative h-svh overflow-hidden bg-[#2B2627]">
			<style>{slideshowKeyframes}</style>
			{slides.map((photo, index) => {
				const image = (
					<Image
						key={photo.key}
						src={photo.src}
						alt={photo.alt}
						fill
						preload={index === 0}
						sizes="100vw"
						className={`animate-[cover-slideshow_ease-in-out_infinite] object-cover motion-reduce:animate-none ${index === 0 ? '' : 'opacity-0'}`}
						// Offset so the first slide starts fully shown
						style={{
							animationDuration: `${LOOP_SECONDS}s`,
							animationDelay: `${index * SLIDE_SECONDS - FADE_SECONDS}s`,
							objectPosition: photo.objectPosition,
						}}
					/>
				)
				if (!photo.landscapeSrc) return image
				const {
					props: { srcSet: landscapeSrcSet },
				} = getImageProps({
					src: photo.landscapeSrc,
					alt: photo.alt,
					fill: true,
					sizes: '100vw',
				})
				return (
					<picture key={photo.key}>
						<source
							media="(orientation: landscape)"
							srcSet={landscapeSrcSet}
						/>
						{image}
					</picture>
				)
			})}
			{/* Her photos have bright white ceilings, so the light wordmark
			    needs a soft shade behind it */}
			<div className="absolute inset-x-0 top-0 z-10 h-44 bg-linear-to-b from-black/45 to-transparent" />
			<header className="absolute inset-x-0 top-0 z-10 flex items-start justify-between px-6 pt-7 text-[#F6F3EF]">
				<Wordmark className="w-32" />
				<Menu />
			</header>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
				}}
			/>
		</main>
	)
}
