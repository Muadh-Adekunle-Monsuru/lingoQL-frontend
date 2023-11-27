export function LoremIpsum() {
	return (
		<>
			<article className='text-white space-y-10'>
				<div className='p-10 m-5 border-dashed border-2 rounded-lg'>
					<h1 className='text-center text-4xl font-bold'>How to Use LingoQL</h1>
				</div>

				<div className='p-5 m-5 border-dashed border-2 rounded-lg'>
					<h2 className='text-3xl p-5 font-bold'>
						<span className='gradient-text'>1. </span>Sign Up
					</h2>
					<p className='p-5'>
						To get started, click on the sign-up button above and register using
						either your Google account or email.
					</p>
				</div>

				<div className='p-3 m-5 border-dashed border-2 rounded-lg'>
					<h2 className='text-3xl p-5 font-bold'>
						<span className='gradient-text'>2. </span> Submit Your Database
						Information
					</h2>
					<p className='p-5'>
						Provide details about your database, including its type. Currently,
						we only support PostgreSQL and MySQL. Additionally, include a link
						to your database with the format:
						<br />
						<code>postgresql://username:password@host:port/database</code>
						<br />
						or
						<br />
						<code>mysql://username:password@host:port/database</code>
					</p>
				</div>
				<div className='p-3 m-5 border-dashed border-2 rounded-lg'>
					<h2 className='text-3xl p-5 font-bold'>
						<span className='gradient-text'>3. </span> Query Away!
					</h2>
					<p className='p-5'>
						You are now set to ask insights about your database. You can start
						by asking how many tables are in the database.
					</p>
				</div>
			</article>
		</>
	);
}
