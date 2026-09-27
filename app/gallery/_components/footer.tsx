import { site } from '@/lib/site'

export function Footer() {
	return (
		<footer className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-10 text-sm text-[#6E6A67] sm:flex-row sm:justify-between sm:px-10">
			<p>
				© {new Date().getFullYear()} {site.name}
			</p>
			<p>
				Based in {site.location}, working across {site.serviceArea}
			</p>
		</footer>
	)
}
