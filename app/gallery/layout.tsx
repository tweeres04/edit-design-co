import { Albert_Sans } from 'next/font/google'
import { Header } from './_components/header'
import { Footer } from './_components/footer'

const albertSans = Albert_Sans({ subsets: ['latin'] })

export default function GalleryLayout({ children }: LayoutProps<'/gallery'>) {
	return (
		<div
			className={`${albertSans.className} min-h-screen bg-[#ECEAE6] text-[#3A3738] [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-[#6A1A1B]`}
		>
			<Header />
			{children}
			<Footer />
		</div>
	)
}
