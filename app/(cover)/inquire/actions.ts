'use server'

export type InquiryErrors = Partial<Record<string, string>>

export type InquiryState =
	| { status: 'idle' }
	| { status: 'invalid'; errors: InquiryErrors; values: InquiryValues }
	| { status: 'sent'; firstName: string }

export type InquiryValues = {
	text: Record<string, string>
	heardFrom: string[]
}

const REQUIRED: Record<string, string> = {
	firstName: 'Please add your first name',
	lastName: 'Please add your last name',
	email: 'Please add your email',
	phone: 'Please add your phone number',
	project: 'Please tell me a little about your project',
	street: 'Please add the street address',
	city: 'Please add the city',
	province: 'Please add the province',
	postalCode: 'Please add the postal code',
}

const TEXT_FIELDS = [
	...Object.keys(REQUIRED),
	'unit',
	'referrer',
	'feel',
	'website',
]

export async function sendInquiry(
	_previous: InquiryState,
	formData: FormData,
): Promise<InquiryState> {
	const values: InquiryValues = {
		text: Object.fromEntries(
			TEXT_FIELDS.map((field) => [
				field,
				String(formData.get(field) ?? '').trim(),
			]),
		),
		heardFrom: formData.getAll('heardFrom').map(String),
	}

	// Hidden field only bots fill in. Pretend it worked so they move on.
	if (values.text.website) return { status: 'sent', firstName: '' }

	const errors: InquiryErrors = {}
	for (const [field, message] of Object.entries(REQUIRED)) {
		if (!values.text[field]) errors[field] = message
	}
	if (values.heardFrom.length === 0)
		errors.heardFrom = 'Please pick at least one'

	if (Object.keys(errors).length > 0)
		return { status: 'invalid', errors, values }

	// TODO: deliver to Melissa (email service not chosen yet). Until then
	// inquiries only show up in the server logs.
	console.log('New inquiry', JSON.stringify(values))

	return { status: 'sent', firstName: values.text.firstName }
}
