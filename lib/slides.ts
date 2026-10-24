// Homepage slideshow photos, in order. All portrait, which the photo loader
// needs to know from the src path.
export const slides = [
	{
		key: 'beaverbrooke-04',
		alt: 'Vaulted living room with a stone fireplace and timber beams',
	},
	{
		key: 'hampshire-kitchen-pantry-031',
		alt: 'Kitchen island under two white pendants',
	},
	{
		key: 'beaverbrooke-06',
		alt: 'Walnut kitchen cabinets around a white tile range wall',
	},
	{
		key: 'hampshire-master-bath-101',
		alt: 'Freestanding tub beside a window with a woven stool',
	},
	{
		key: 'beaverbrooke-13',
		alt: 'Primary bedroom with a beamed ceiling and linen bedding',
	},
].map((slide) => ({ ...slide, src: `/portrait/${slide.key}` }))
