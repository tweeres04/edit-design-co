'use server'

import Mailgun from 'mailgun.js'

export type InquiryErrors = Partial<Record<string, string>>

export type InquiryState =
	| { status: 'idle' }
	| { status: 'invalid'; errors: InquiryErrors; values: InquiryValues }
	| { status: 'failed'; values: InquiryValues }
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

	try {
		await emailInquiry(values)
	} catch (error) {
		// Log the inquiry too so it isn't lost
		console.error('Inquiry email failed', JSON.stringify(values), error)
		return { status: 'failed', values }
	}

	return { status: 'sent', firstName: values.text.firstName }
}

// INQUIRY_EMAIL is where inquiries go (Tyler while testing, Melissa at launch).
// Mailgun accepts a comma-separated list, e.g. "a@x.com, b@y.com"
async function emailInquiry({ text, heardFrom }: InquiryValues) {
	const { MAILGUN_API_KEY, MAILGUN_DOMAIN, INQUIRY_EMAIL } = process.env
	if (!MAILGUN_API_KEY || !MAILGUN_DOMAIN || !INQUIRY_EMAIL)
		throw new Error(
			'Missing MAILGUN_API_KEY, MAILGUN_DOMAIN or INQUIRY_EMAIL',
		)

	const name = `${text.firstName} ${text.lastName}`
	const address = [
		[text.street, text.unit].filter(Boolean).join(', '),
		`${text.city}, ${text.province} ${text.postalCode}`,
	].join('\n')

	const body = [
		`Name: ${name}`,
		`Email: ${text.email}`,
		`Phone: ${text.phone}`,
		`Heard about you from: ${heardFrom.join(', ')}`,
		...(text.referrer ? [`Referred by: ${text.referrer}`] : []),
		'',
		'Project:',
		text.project,
		'',
		'Project address:',
		address,
		...(text.feel
			? ['', 'How they want their home to feel:', text.feel]
			: []),
	].join('\n')

	const mailgun = new Mailgun(FormData).client({
		username: 'api',
		key: MAILGUN_API_KEY,
	})
	await mailgun.messages.create(MAILGUN_DOMAIN, {
		from: `Edit Design Co website <inquiries@${MAILGUN_DOMAIN}>`,
		to: INQUIRY_EMAIL,
		// Replying goes straight to the client
		'h:Reply-To': `${name} <${text.email}>`,
		subject: `New inquiry from ${name}`,
		text: body,
	})
}
