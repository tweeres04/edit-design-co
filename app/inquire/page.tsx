import type { Metadata } from 'next'
import Link from 'next/link'
import { Wordmark } from '@/components/wordmark'
import { Menu } from '../_components/menu'
import { InquiryForm } from './inquiry-form'

export const metadata: Metadata = {
	title: 'Inquire',
	description:
		'Tell us about your renovation or new build in Greater Victoria.',
}

export default function InquirePage() {
	return (
		<>
			<header className="flex items-start justify-between px-6 pt-7 text-[#6A1A1B]">
				<Link href="/">
					<Wordmark className="w-32" />
				</Link>
				<Menu />
			</header>
			<main className="px-6 pt-14 pb-20">
				<h1 className="font-(family-name:--font-caslon-display) text-[44px] leading-none text-[#6A1A1B]">
					Let&rsquo;s connect
				</h1>
				<p className="mt-5 text-[15px] leading-relaxed">
					We would love to hear about your new-build or renovation.
					Please fill out the form below. To give our best, we only
					accept a select number of full service projects each year.
				</p>
				<InquiryForm />
			</main>
		</>
	)
}
