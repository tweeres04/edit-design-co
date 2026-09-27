export type Photo = {
	key: string
	orientation: 'portrait' | 'landscape'
	alt: string
	// Pass to next/image `src`. The custom loader turns it into a MinIO URL.
	src: string
	width: number
	height: number
}

export type Project = {
	slug: string
	name: string
	// Placeholder until we get the real details from Melissa
	kind: string
	location: string
	summary: string
	cover: Photo
	// Curated, near-duplicates removed, in a sensible viewing order
	photos: Photo[]
	// Hand-picked portrait pairs (a room shot and a detail from the same space)
	// to fill wide layouts as diptychs
	pairs: [Photo, Photo][]
}

const LANDSCAPE = new Set([
	'beaverbrooke-05',
	'beaverbrooke-08',
	'beaverbrooke-09',
	'beaverbrooke-10',
	'beaverbrooke-11',
	'beaverbrooke-12',
	'beaverbrooke-20',
	'beaverbrooke-21',
	'hampshire-kitchen-pantry-040',
	'hampshire-kitchen-pantry-052',
	'hampshire-kitchen-pantry-068',
	'hampshire-laundry-room-003',
	'hampshire-living-room-076',
	'hampshire-living-room-077',
	'hampshire-master-bath-090',
])

function photo(key: string, alt: string): Photo {
	const orientation = LANDSCAPE.has(key) ? 'landscape' : 'portrait'
	return {
		key,
		orientation,
		alt,
		src: `/${orientation}/${key}`,
		width: orientation === 'landscape' ? 2400 : 1600,
		height: orientation === 'landscape' ? 1600 : 2400,
	}
}

const beaverbrookePhotos = [
	photo(
		'beaverbrooke-10',
		'Walnut kitchen with white pendants and a long dining table',
	),
	photo(
		'beaverbrooke-04',
		'Vaulted living room with a stone fireplace and timber beams',
	),
	photo(
		'beaverbrooke-01',
		'Long hallway framed in dark timber, looking toward the back door',
	),
	photo(
		'beaverbrooke-03',
		'Living room with built-in walnut shelving and garden doors',
	),
	photo(
		'beaverbrooke-05',
		'Living room shelving wall with a low coffee table',
	),
	photo(
		'beaverbrooke-07',
		'Kitchen island with upholstered stools and walnut cabinetry',
	),
	photo(
		'beaverbrooke-06',
		'Walnut kitchen cabinets around a white tile range wall',
	),
	photo(
		'beaverbrooke-09',
		'Kitchen with walnut uppers and a white plaster hood',
	),
	photo('beaverbrooke-11', 'Kitchen island seating looking toward the range'),
	photo(
		'beaverbrooke-02',
		'Stone fireplace with a large abstract painting above',
	),
	photo(
		'beaverbrooke-13',
		'Primary bedroom with a beamed ceiling and linen bedding',
	),
	photo('beaverbrooke-14', 'Bedroom corner opening to a walk-in closet'),
	photo(
		'beaverbrooke-15',
		'Powder room with a pleated sconce and zellige tile',
	),
	photo('beaverbrooke-16', 'Glass shower with a freestanding tub beyond'),
	photo('beaverbrooke-17', 'Bathroom vanity in walnut with a brass mirror'),
	photo(
		'beaverbrooke-18',
		'Laundry room with a black-framed window and pendant',
	),
	photo('beaverbrooke-23', 'Vanity in greige with an arched mirror'),
	photo('beaverbrooke-22', 'Front entry with cedar siding and black trim'),
	photo(
		'beaverbrooke-21',
		'Exterior of the home at dusk with cedar and stone',
	),
	photo(
		'beaverbrooke-19',
		'Front of the home with a garage and fresh landscaping',
	),
]

const hampshirePhotos = [
	photo(
		'hampshire-kitchen-pantry-052',
		'Bright kitchen with a taupe island and rush stools',
	),
	photo(
		'hampshire-front-entrance-011',
		'Front door in dark wood with a watering can of hydrangeas',
	),
	photo(
		'hampshire-living-room-077',
		'Living room fireplace flanked by oak shelves',
	),
	photo(
		'hampshire-kitchen-pantry-031',
		'Kitchen island under two white pendants',
	),
	photo(
		'hampshire-kitchen-pantry-024',
		'Kitchen with white perimeter cabinets and a stained island',
	),
	photo(
		'hampshire-kitchen-pantry-061',
		'Pantry cabinet opened to a coffee station',
	),
	photo(
		'hampshire-kitchen-pantry-073',
		'Open appliance garage with mugs and a woven tray',
	),
	photo(
		'hampshire-kitchen-pantry-037',
		'Kitchen sink under a window with styled greenery',
	),
	photo(
		'hampshire-kitchen-pantry-064',
		'Wall of stained oak pantry cabinetry',
	),
	photo(
		'hampshire-kitchen-pantry-057',
		'Dining nook flooded with afternoon light',
	),
	photo(
		'hampshire-front-entrance-016',
		'Mudroom bench with hooks and a woven basket',
	),
	photo(
		'hampshire-living-room-078',
		'Oak floating shelves over a built-in cabinet',
	),
	photo(
		'hampshire-living-room-083',
		'Marble fireplace surround with brass candlesticks',
	),
	photo(
		'hampshire-living-room-085',
		'Staircase with a potted branch on the landing',
	),
	photo(
		'hampshire-master-bath-101',
		'Freestanding tub beside a window with a woven stool',
	),
	photo(
		'hampshire-master-bath-089',
		'Double vanity with brass sconces and slate floor',
	),
	photo(
		'hampshire-master-bath-095',
		'Glass shower and tub in the primary bath',
	),
	photo(
		'hampshire-master-bath-100',
		'Detail of a stained vanity with cup pulls',
	),
	photo(
		'hampshire-master-closet-108',
		'Walk-in closet with oak shelving and hanging rails',
	),
	photo(
		'hampshire-upstairs-bathroom-110',
		'Upstairs bath with arched mirrors and a dark floral arrangement',
	),
	photo(
		'hampshire-upstairs-bathroom-113',
		'Vanity with an arched mirror and brass sconce',
	),
	photo(
		'hampshire-downstairs-bathroom-019',
		'Shower in hand-glazed green tile',
	),
	photo(
		'hampshire-downstairs-bathroom-021',
		'Powder room with an arched mirror',
	),
	photo(
		'hampshire-laundry-room-005',
		'Laundry sink with a green watering can of hydrangeas',
	),
	photo(
		'hampshire-laundry-room-009',
		'Laundry counter with a linen shirt and a small lamp',
	),
]

function pairsFrom(photos: Photo[], keys: [string, string][]) {
	const byKey = new Map(photos.map((p) => [p.key, p]))
	return keys.map(
		([a, b]) => [byKey.get(a)!, byKey.get(b)!] as [Photo, Photo],
	)
}

export const projects: Project[] = [
	{
		slug: 'beaverbrooke',
		name: 'Beaverbrooke',
		kind: 'New build',
		location: 'Greater Victoria',
		summary:
			'A new build with warm walnut cabinetry, a vaulted great room and a stone fireplace at its centre.',
		cover: beaverbrookePhotos[0],
		photos: beaverbrookePhotos,
		pairs: pairsFrom(beaverbrookePhotos, [
			['beaverbrooke-03', 'beaverbrooke-02'],
			['beaverbrooke-07', 'beaverbrooke-06'],
			['beaverbrooke-13', 'beaverbrooke-14'],
			['beaverbrooke-16', 'beaverbrooke-17'],
			['beaverbrooke-22', 'beaverbrooke-01'],
		]),
	},
	{
		slug: 'hampshire',
		name: 'Hampshire',
		kind: 'Whole-home renovation',
		location: 'Greater Victoria',
		summary:
			'A bright, whole-home renovation with stained oak cabinetry, hand-glazed tile and a hardworking pantry.',
		cover: hampshirePhotos[0],
		photos: hampshirePhotos,
		pairs: pairsFrom(hampshirePhotos, [
			['hampshire-front-entrance-011', 'hampshire-front-entrance-016'],
			['hampshire-kitchen-pantry-031', 'hampshire-kitchen-pantry-061'],
			['hampshire-kitchen-pantry-064', 'hampshire-kitchen-pantry-073'],
			['hampshire-living-room-083', 'hampshire-living-room-078'],
			['hampshire-master-bath-101', 'hampshire-master-bath-100'],
			['hampshire-laundry-room-005', 'hampshire-laundry-room-009'],
		]),
	},
]

export function getProject(slug: string) {
	return projects.find((project) => project.slug === slug)
}
