'use client'

import { useId, useRef, useState } from 'react'
import {
	getAddress,
	suggestAddresses,
	type AddressSuggestion,
} from './address-actions'

// Fields filled in from the chosen address, by input name
const FILLED_FIELDS = ['unit', 'city', 'province', 'postalCode'] as const

// Street address type-ahead. Picking a suggestion fills in the rest of the
// address fields in the same form. Typing an address by hand still works.
export function AddressInput({
	defaultValue = '',
	...inputProps
}: Omit<
	React.InputHTMLAttributes<HTMLInputElement>,
	'value' | 'onChange' | 'defaultValue'
> & { defaultValue?: string }) {
	const [query, setQuery] = useState(defaultValue)
	const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([])
	const [active, setActive] = useState(-1)
	const inputRef = useRef<HTMLInputElement>(null)
	const debounce = useRef<ReturnType<typeof setTimeout>>(undefined)
	const latestRequest = useRef(0)
	const sessionToken = useRef<string | null>(null)
	const listId = useId()

	const open = suggestions.length > 0

	function close() {
		setSuggestions([])
		setActive(-1)
	}

	function handleChange(value: string) {
		setQuery(value)
		clearTimeout(debounce.current)
		const input = value.trim()
		if (input.length < 3) return close()

		debounce.current = setTimeout(async () => {
			sessionToken.current ??= crypto.randomUUID()
			const request = ++latestRequest.current
			const results = await suggestAddresses(input, sessionToken.current)
			// Ignore responses that arrive after a newer request
			if (request !== latestRequest.current) return
			setSuggestions(results)
			setActive(-1)
		}, 250)
	}

	async function choose(suggestion: AddressSuggestion) {
		close()
		setQuery(suggestion.main)
		const token = sessionToken.current!
		sessionToken.current = null

		const address = await getAddress(suggestion.placeId, token)
		setQuery(address.street || suggestion.main)
		const form = inputRef.current!.form!
		for (const name of FILLED_FIELDS) {
			if (!address[name]) continue
			;(form.elements.namedItem(name) as HTMLInputElement).value =
				address[name]
		}
	}

	function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
		if (!open) return
		if (event.key === 'ArrowDown') {
			event.preventDefault()
			setActive((index) => (index + 1) % suggestions.length)
		} else if (event.key === 'ArrowUp') {
			event.preventDefault()
			setActive((index) => (index <= 0 ? suggestions.length : index) - 1)
		} else if (event.key === 'Enter' && active >= 0) {
			event.preventDefault()
			choose(suggestions[active])
		} else if (event.key === 'Escape') {
			close()
		}
	}

	return (
		<div className="relative">
			<input
				{...inputProps}
				ref={inputRef}
				type="text"
				role="combobox"
				aria-autocomplete="list"
				aria-expanded={open}
				aria-controls={listId}
				aria-activedescendant={
					active >= 0 ? `${listId}-${active}` : undefined
				}
				// Our suggestions replace the browser's own autofill list here
				autoComplete="off"
				value={query}
				onChange={(event) => handleChange(event.target.value)}
				onKeyDown={handleKeyDown}
				onBlur={close}
			/>
			<div
				hidden={!open}
				className="absolute inset-x-0 top-full z-20 border border-t-0 border-[#3A3738]/20 bg-[#F6F3EF] shadow-[0_12px_24px_-12px_rgba(58,55,56,0.35)]"
			>
				<ul id={listId} role="listbox" aria-label="Suggested addresses">
					{suggestions.map((suggestion, index) => (
						<li
							key={suggestion.placeId}
							id={`${listId}-${index}`}
							role="option"
							aria-selected={index === active}
							// Keep focus in the input so blur doesn't close the
							// list before the click lands
							onMouseDown={(event) => event.preventDefault()}
							onClick={() => choose(suggestion)}
							className="cursor-pointer px-3 py-3 hover:bg-[#6A1A1B]/10 aria-selected:bg-[#6A1A1B]/10"
						>
							<span className="block text-base">
								{suggestion.main}
							</span>
							<span className="block text-sm text-[#3A3738]/70">
								{suggestion.secondary}
							</span>
						</li>
					))}
				</ul>
				<p className="px-3 pt-1 pb-2 text-right text-xs text-[#3A3738]/60">
					Google Maps
				</p>
			</div>
		</div>
	)
}
