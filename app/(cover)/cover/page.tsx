import Image from 'next/image'
import { Wordmark } from '@/components/wordmark'
import { projects } from '@/lib/projects'
import { site } from '@/lib/site'
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
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
				}}
			/>
		</main>
	)
}
