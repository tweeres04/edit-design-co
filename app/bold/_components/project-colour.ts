// Each project gets the colour of its signature material
const colours: Record<string, string> = {
	beaverbrooke: 'bg-(--walnut)',
	hampshire: 'bg-(--tile)',
}

export function projectColour(slug: string) {
	return colours[slug] ?? 'bg-(--walnut)'
}
