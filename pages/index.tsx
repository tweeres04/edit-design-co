import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
	return (
		<div className="container">
			<Head>
				<title>Edit Design Co</title>
				<meta name="description" content="Edit Design Co" />
				<link rel="icon" href="/favicon.ico" />
				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css"
				></link>
			</Head>
			<h1 className="title">Edit Design Co</h1>
			<h3 className="subtitle">Let's Connect</h3>
			<p>Thank you for your interest. Tell us about your project.</p>
			<form action={process.env.NEXT_PUBLIC_FORM_URL} method="POST">
				<div className="field">
					<label htmlFor="nameInput" className="label">
						Name
					</label>
					<input
						type="text"
						className="input"
						id="nameInput"
						name="name"
					/>
				</div>
				<div className="columns">
					<div className="column">
						<div className="field">
							<label htmlFor="emailInput" className="label">
								Email
							</label>
							<input
								type="email"
								className="input"
								id="emailInput"
								name="email"
							/>
						</div>
					</div>
					<div className="column">
						<div className="field">
							<label htmlFor="phoneInput" className="label">
								Phone number
							</label>
							<input
								type="text"
								className="input"
								id="phoneInput"
								name="phone"
							/>
						</div>
					</div>
				</div>
				<div className="columns">
					<div className="column">
						<div className="field">
							<label htmlFor="projectTypeInput" className="label">
								Project type
							</label>
							<div className="select">
								<select
									name="projectType"
									id="projectTypeInput"
								>
									<option value=""></option>
									<option value="new_build">New Build</option>
									<option value="furniture">Furniture</option>
									<option value="renovation">
										Renovation
									</option>
									<option value="other">Other</option>
								</select>
							</div>
						</div>
					</div>
					<div className="column">
						<div className="field">
							<label htmlFor="startDateInput" className="label">
								Ideal start date
							</label>
							<input
								type="date"
								className="input"
								id="startDateInput"
								name="startDate"
							/>
						</div>
					</div>
				</div>
				<div className="field">
					<label htmlFor="messageInput" className="label">
						Brief description of your project
					</label>
					<textarea
						className="textarea"
						id="messageInput"
						name="message"
					></textarea>
				</div>
				<div className="field">
					<button className="button is-primary">Submit</button>
				</div>
			</form>
		</div>
	)
}

export default Home
