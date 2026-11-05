// Homepage slideshow photos, in order. They all use the loader's portrait path,
// even landscape ones like beaverbrooke-05: slides fill the screen's height, so
// a landscape photo on a phone needs the larger file that path picks.
// objectPosition sets which part of the photo
// stays in frame on wide screens, where portrait photos lose their top and
// bottom; it defaults to the centre. landscapeKey swaps in a landscape photo on
// landscape screens, so alt has to describe both.
type Slide = {
	key: string
	alt: string
	objectPosition?: string
	landscapeKey?: string
}

const photos: Slide[] = [
	{
		key: 'beaverbrooke-04',
		alt: 'Vaulted living room with a stone fireplace and timber beams',
	},
	{
		key: 'beaverbrooke-06',
		alt: 'Walnut kitchen cabinets around a white tile range wall',
	},
	{
		key: 'moss-street-50',
		alt: 'Kitchen range under a white hood, with brass sconces and a dark stone backsplash',
		objectPosition: '50% 38%',
	},
	{
		key: 'moss-street-46',
		landscapeKey: 'moss-street-58',
		alt: 'Dining table with a bowl of fruit in front of built-in shelves and a coffee station',
	},
	{
		key: 'hampshire-kitchen-pantry-031',
		alt: 'Kitchen island under two white pendants',
	},
	{
		key: 'beaverbrooke-05',
		alt: 'Living room with dark wood built-in shelves behind a grey sofa',
	},
	{
		key: 'hampshire-master-bath-101',
		alt: 'Freestanding tub beside a window with a woven stool',
	},
]

export const slides = photos.map((slide) => ({
	...slide,
	src: `/portrait/${slide.key}`,
	landscapeSrc: slide.landscapeKey && `/landscape/${slide.landscapeKey}`,
}))
