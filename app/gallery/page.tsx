import Image from 'next/image'
import Link from 'next/link'
import { projects } from '@/lib/projects'
import { site } from '@/lib/site'
import { Framed } from './_components/framed'

const heroPhoto = projects
	.flatMap((project) => project.photos)
	.find((photo) => photo.key === 'hampshire-living-room-077')!

const services = [
	{
		name: 'Full-service design',
		description:
			'From the first walkthrough to the last cabinet pull. I plan the layout, choose every finish and stay with the project through construction.',
	},
	{
		name: 'Architectural drawings',
		description:
			'Complete drawing sets in Vectorworks, detailed enough that your builder can price and build without guessing.',
	},
	{
		name: 'Spec packages',
		description:
			'Every material, finish and piece of hardware listed in one place, with sizes, sources and where each one goes.',
	},
	{
		name: 'Developer projects',
		description:
			'Interiors for new single-family homes, fourplexes and sixplexes, planned to sell and built to last.',
	},
]

const contactLink =
	'underline decoration-[#CFC9C2] underline-offset-4 transition-colors hover:text-[#6A1A1B] hover:decoration-current'

export default function GalleryHome() {
	return (
		<main className="mx-auto max-w-7xl px-5 sm:px-10">
			<Framed
				photo={heroPhoto}
				sizes="(min-width: 1280px) 1100px, 90vw"
				priority
				caption="Hampshire, living room"
			/>

			<h1 className="mt-20 max-w-2xl text-2xl leading-snug sm:mt-28 sm:text-3xl sm:leading-snug">
				Interior design for renovations and new builds across Greater
				Victoria, drawn and specified down to the last detail.
			</h1>

			<section id="projects" className="mt-28 scroll-mt-8 sm:mt-40">
				<h2 className="text-sm text-[#6E6A67]">Projects</h2>
				<ul className="mt-6 grid gap-16 md:grid-cols-2 md:gap-10">
					{projects.map((project) => (
						<li key={project.slug}>
							<Link
								href={`/gallery/projects/${project.slug}`}
								className="group block"
							>
								<Framed
									photo={project.cover}
									sizes="(min-width: 1280px) 560px, (min-width: 768px) 45vw, 90vw"
									caption={
										<>
											<span className="block text-lg text-[#3A3738] transition-colors group-hover:text-[#6A1A1B]">
												{project.name}
											</span>
											{project.kind} in {project.location}
										</>
									}
								/>
							</Link>
						</li>
					))}
				</ul>
			</section>

			<section
				id="about"
				className="mt-28 grid scroll-mt-8 gap-10 sm:mt-40 md:grid-cols-[5fr_7fr] md:gap-16"
			>
				<figure className="max-w-sm">
					<div className="bg-[#FAFAF8] p-[clamp(12px,3.5vw,40px)]">
						<Image
							src="/melissa.jpg"
							width={890}
							height={1182}
							alt="Melissa Orton"
							sizes="(min-width: 768px) 320px, 80vw"
							className="h-auto w-full"
						/>
					</div>
					<figcaption className="mt-3 text-sm text-[#6E6A67]">
						{site.founder}, {site.founderRole.toLowerCase()}
					</figcaption>
				</figure>
				<div className="max-w-xl md:pt-10">
					<h2 className="text-sm text-[#6E6A67]">About</h2>
					<div className="mt-6 space-y-5 text-lg leading-relaxed">
						<p>
							I&apos;m Melissa Orton, the designer behind Edit
							Design Co. Most of my clients are in the middle of a
							major renovation or building new, and they want one
							person to carry the design from the first
							conversation to move-in day.
						</p>
						<p>
							We start by talking about how you live and what you
							love. I turn that into drawings and a spec package
							your builder can work from, which is why contractors
							are happy to see my name on a project.
						</p>
					</div>
				</div>
			</section>

			<section id="services" className="mt-28 scroll-mt-8 sm:mt-40">
				<h2 className="text-sm text-[#6E6A67]">Services</h2>
				<dl className="mt-6 grid gap-x-16 gap-y-10 md:grid-cols-2">
					{services.map((service) => (
						<div
							key={service.name}
							className="border-t border-[#CFC9C2] pt-5"
						>
							<dt className="text-lg">{service.name}</dt>
							<dd className="mt-2 max-w-md leading-relaxed text-[#3A3738]/85">
								{service.description}
							</dd>
						</div>
					))}
				</dl>
			</section>

			<section id="contact" className="mt-28 scroll-mt-8 pb-16 sm:mt-40">
				<h2 className="text-2xl sm:text-3xl">
					Planning a renovation or new build?
				</h2>
				<p className="mt-4 max-w-xl text-lg leading-relaxed">
					Tell me a little about your home and your timeline, and
					we&apos;ll set up a time to talk.
				</p>
				<ul className="mt-8 space-y-2 text-lg">
					<li>
						<a
							href={`mailto:${site.email}`}
							className={contactLink}
						>
							{site.email}
						</a>
					</li>
					<li>
						<a href={site.phoneHref} className={contactLink}>
							{site.phone}
						</a>
					</li>
					<li>
						<a href={site.instagram} className={contactLink}>
							Instagram {site.instagramHandle}
						</a>
					</li>
				</ul>
			</section>
		</main>
	)
}
