// The logo PNG is used as a mask so it takes the text colour (currentColor).
// Swap for Melissa's real SVG once we have her assets.
export function Wordmark({ className }: { className?: string }) {
	return (
		<span
			role="img"
			aria-label="Edit Design Co"
			className={`inline-block aspect-[1131/532] bg-current [mask:url(/brand/wordmark.png)_center/contain_no-repeat] ${className ?? ''}`}
		/>
	)
}
