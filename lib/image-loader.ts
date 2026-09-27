// Photos live in MinIO pre-sized to 800, 1200, 1600 and 2400px on the long
// edge. Every photo is 2:3, so a portrait photo needs a long edge 1.5x the
// requested width. Photo srcs are `/portrait/<key>` or `/landscape/<key>`.
const BUCKET = 'https://files.tweeres.com/edit-design'
const LONG_EDGES = [800, 1200, 1600, 2400]

export default function photoLoader({
	src,
	width,
}: {
	src: string
	width: number
}) {
	const [, orientation, key] = src.split('/')
	// Local files in /public (e.g. the founder photo) are served as-is
	// (the ?w= only satisfies next/image's check that loaders use the width)
	if (orientation !== 'portrait' && orientation !== 'landscape')
		return `${src}?w=${width}`
	const longEdge = orientation === 'portrait' ? width * 1.5 : width
	const size = LONG_EDGES.find((edge) => edge >= longEdge) ?? 2400
	return `${BUCKET}/${key}-${size}.webp`
}
