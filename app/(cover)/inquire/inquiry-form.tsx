'use client'

import { useActionState } from 'react'
import { sendInquiry, type InquiryState } from './actions'
import { AddressInput } from './address-input'
import { site } from '@/lib/site'

const HEARD_FROM = ['Instagram', 'Pinterest', 'Referral', 'Other']

const labelClass = 'block text-[15px]'
const inputClass =
	'mt-2 block w-full rounded-none border-0 border-b border-[#3A3738]/40 bg-transparent px-0 py-2 text-base outline-none focus:border-[#6A1A1B] aria-invalid:border-[#6A1A1B]'
const optional = <span className="text-[#3A3738]/70"> (optional)</span>

export function InquiryForm() {
	const [state, formAction, pending] = useActionState<InquiryState, FormData>(
		sendInquiry,
		{ status: 'idle' },
	)

	if (state.status === 'sent') {
		return (
			<div role="status" className="mt-10">
				<p className="font-(family-name:--font-caslon-display) text-[32px] leading-tight text-[#6A1A1B]">
					Thanks{state.firstName ? `, ${state.firstName}` : ''}
				</p>
				<p className="mt-4 text-[15px] leading-relaxed">
					I&rsquo;ve got your note and I&rsquo;ll be in touch soon to
					talk about your project.
				</p>
			</div>
		)
	}

	const errors = state.status === 'invalid' ? state.errors : {}
	// Keep what they typed if validation or sending failed
	const values = 'values' in state ? state.values : undefined

	function field(
		name: string,
		label: React.ReactNode,
		props: React.InputHTMLAttributes<HTMLInputElement> = {},
	) {
		const error = errors[name]
		return (
			<div>
				<label htmlFor={name} className={labelClass}>
					{label}
				</label>
				<input
					id={name}
					name={name}
					type="text"
					defaultValue={values?.text[name]}
					aria-invalid={error ? true : undefined}
					aria-describedby={error ? `${name}-error` : undefined}
					className={inputClass}
					{...props}
				/>
				<FieldError id={`${name}-error`} message={error} />
			</div>
		)
	}

	return (
		<form action={formAction} className="mt-10 space-y-8">
			<div className="grid grid-cols-2 gap-5">
				{field('firstName', 'First name', {
					required: true,
					autoComplete: 'given-name',
				})}
				{field('lastName', 'Last name', {
					required: true,
					autoComplete: 'family-name',
				})}
			</div>
			{field('email', 'Email', {
				type: 'email',
				required: true,
				autoComplete: 'email',
			})}
			{field('phone', 'Phone', {
				type: 'tel',
				required: true,
				autoComplete: 'tel-national',
			})}

			<fieldset
				aria-invalid={errors.heardFrom ? true : undefined}
				aria-describedby={
					errors.heardFrom ? 'heardFrom-error' : undefined
				}
			>
				<legend className={labelClass}>
					How did you hear about me?
				</legend>
				<div className="mt-3 space-y-3">
					{HEARD_FROM.map((option) => (
						<label
							key={option}
							className="flex items-center gap-3 text-base"
						>
							<input
								type="checkbox"
								name="heardFrom"
								value={option}
								defaultChecked={values?.heardFrom.includes(
									option,
								)}
								className="size-5 accent-[#6A1A1B]"
							/>
							{option}
						</label>
					))}
				</div>
				<FieldError id="heardFrom-error" message={errors.heardFrom} />
			</fieldset>

			{field(
				'referrer',
				<>If someone referred you, who can I thank?{optional}</>,
			)}

			<div>
				<label htmlFor="project" className={labelClass}>
					Tell me a bit about your project
				</label>
				<textarea
					id="project"
					name="project"
					required
					rows={5}
					defaultValue={values?.text.project}
					aria-invalid={errors.project ? true : undefined}
					aria-describedby={
						errors.project ? 'project-error' : undefined
					}
					className={`${inputClass} resize-y`}
				/>
				<FieldError id="project-error" message={errors.project} />
			</div>

			<fieldset className="space-y-6">
				<legend className="font-(family-name:--font-caslon-display) text-[28px] leading-none text-[#6A1A1B]">
					Project address
				</legend>
				<div>
					<label htmlFor="street" className={labelClass}>
						Street address
					</label>
					<AddressInput
						id="street"
						name="street"
						required
						defaultValue={values?.text.street}
						aria-invalid={errors.street ? true : undefined}
						aria-describedby={
							errors.street ? 'street-error' : undefined
						}
						className={inputClass}
					/>
					<FieldError id="street-error" message={errors.street} />
				</div>
				{field('unit', <>Unit or suite{optional}</>, {
					autoComplete: 'address-line2',
				})}
				{field('city', 'City', {
					required: true,
					autoComplete: 'address-level2',
				})}
				<div className="grid grid-cols-2 gap-5">
					{field('province', 'Province', {
						required: true,
						autoComplete: 'address-level1',
						defaultValue: values?.text.province ?? 'BC',
					})}
					{field('postalCode', 'Postal code', {
						required: true,
						autoComplete: 'postal-code',
					})}
				</div>
			</fieldset>

			{field('feel', <>How do you want your home to feel?{optional}</>)}

			{/* Hidden from people; bots fill it in and get ignored */}
			<div aria-hidden="true" className="absolute -left-[9999px]">
				<label htmlFor="website">Website</label>
				<input
					id="website"
					name="website"
					type="text"
					tabIndex={-1}
					autoComplete="off"
				/>
			</div>

			{state.status === 'invalid' && (
				<p role="alert" className="text-[15px] text-[#6A1A1B]">
					A few things need another look. They&rsquo;re marked above.
				</p>
			)}
			{state.status === 'failed' && (
				<p role="alert" className="text-[15px] text-[#6A1A1B]">
					Your inquiry didn&rsquo;t send. Please try again, or email
					me at{' '}
					<a href={`mailto:${site.email}`} className="underline">
						{site.email}
					</a>
					.
				</p>
			)}

			<button
				type="submit"
				disabled={pending}
				className="w-full bg-[#6A1A1B] px-6 py-4 text-[13px] tracking-[0.22em] text-[#F6F3EF] uppercase focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6A1A1B] disabled:opacity-70"
			>
				{pending ? 'Sending' : 'Send inquiry'}
			</button>
		</form>
	)
}

function FieldError({ id, message }: { id: string; message?: string }) {
	if (!message) return null
	return (
		<p id={id} className="mt-2 text-sm text-[#6A1A1B]">
			{message}
		</p>
	)
}
