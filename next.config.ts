import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	output: 'standalone',
	reactCompiler: true,
	images: {
		loader: 'custom',
		loaderFile: './lib/image-loader.ts',
		deviceSizes: [640, 828, 1080, 1440, 1920, 2400],
		imageSizes: [320, 480],
		qualities: [75],
	},
}

export default nextConfig
