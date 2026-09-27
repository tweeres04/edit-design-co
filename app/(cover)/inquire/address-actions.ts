'use server'

// Google Places (New). Calls go through the server so the API key stays
// private. The session token groups a run of suggestions plus the final
// details lookup so Google bills them as one session.
const PLACES = 'https://places.googleapis.com/v1'

export type AddressSuggestion = {
	placeId: string
	main: string
	secondary: string
}

export type AddressParts = {
	street: string
	unit: string
	city: string
	province: string
	postalCode: string
}

function headers(fieldMask?: string) {
	return {
		'Content-Type': 'application/json',
		'X-Goog-Api-Key': process.env.GOOGLE_PLACES_API_KEY!,
		...(fieldMask && { 'X-Goog-FieldMask': fieldMask }),
	}
}

export async function suggestAddresses(
	input: string,
	sessionToken: string,
): Promise<AddressSuggestion[]> {
	// These actions are public endpoints, so keep them from being used as a
	// free proxy to Google
	if (input.length < 3 || input.length > 100) return []

	const response = await fetch(`${PLACES}/places:autocomplete`, {
		method: 'POST',
		headers: headers(),
		body: JSON.stringify({
			input,
			sessionToken,
			includedRegionCodes: ['ca'],
			includedPrimaryTypes: ['street_address', 'premise', 'subpremise'],
			// Favour Greater Victoria
			locationBias: {
				circle: {
					center: { latitude: 48.45, longitude: -123.45 },
					radius: 50000,
				},
			},
		}),
	})
	if (!response.ok)
		throw new Error(`Places autocomplete failed: ${response.status}`)

	const data: {
		suggestions?: {
			placePrediction: {
				placeId: string
				structuredFormat: {
					mainText: { text: string }
					secondaryText: { text: string }
				}
			}
		}[]
	} = await response.json()

	return (data.suggestions ?? []).map(({ placePrediction }) => ({
		placeId: placePrediction.placeId,
		main: placePrediction.structuredFormat.mainText.text,
		secondary: placePrediction.structuredFormat.secondaryText.text,
	}))
}

export async function getAddress(
	placeId: string,
	sessionToken: string,
): Promise<AddressParts> {
	const response = await fetch(
		`${PLACES}/places/${encodeURIComponent(placeId)}?sessionToken=${encodeURIComponent(sessionToken)}`,
		{ headers: headers('addressComponents') },
	)
	if (!response.ok)
		throw new Error(`Places details failed: ${response.status}`)

	const data: {
		addressComponents: {
			longText: string
			shortText: string
			types: string[]
		}[]
	} = await response.json()

	const part = (type: string, form: 'longText' | 'shortText' = 'longText') =>
		data.addressComponents.find((component) =>
			component.types.includes(type),
		)?.[form] ?? ''

	return {
		street: [part('street_number'), part('route')]
			.filter(Boolean)
			.join(' '),
		unit: part('subpremise'),
		city: part('locality') || part('sublocality'),
		province: part('administrative_area_level_1', 'shortText'),
		postalCode: part('postal_code'),
	}
}
