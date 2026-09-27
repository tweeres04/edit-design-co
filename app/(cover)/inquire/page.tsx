import type { Metadata } from 'next'
import Link from 'next/link'
import { Wordmark } from '@/components/wordmark'
import { site } from '@/lib/site'
import { Menu } from '../_components/menu'
import { InquiryForm } from './inquiry-form'

export const metadata: Metadata = {
	title: 'Inquire | Edit Design Co',
}

export default function InquirePage() {
	return (
		<>
			<header className="flex items-start justify-between px-6 pt-7 text-[#6A1A1B]">
				<Link href="/cover">
					<Wordmark className="w-32" />
				</Link>
				<Menu />
			</header>
			<main className="px-6 pt-14 pb-20">
				<h1 className="font-(family-name:--font-caslon-display) text-[44px] leading-none text-[#6A1A1B]">
					Planning a renovation or new build?
				</h1>
				<p className="mt-5 text-[15px] leading-relaxed">
					Tell me a bit about your home and what you have in mind. I
					work with homeowners and builders across {site.serviceArea}.
				</p>
				<InquiryForm />
			</main>
		</>
	)
}
