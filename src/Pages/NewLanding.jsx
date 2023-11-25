import React, { useState } from 'react';
import PI from '../Components/PageIndicator/PI';
// import './Pages.css';
// import Grid from '@mui/material/Grid';
// import { Box } from '@mui/material';
// import Button from '@mui/material/Button';
// import Paper from '@mui/material/Paper';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import newlogo from '/newlogo.png';
const NewLanding = () => {
	const [email, setEmail] = useState('');
	const navigate = useNavigate();
	return (
		<PI title='Home' class='h-full'>
			<section class='w-full h-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black'>
				<div class='px-4 md:px-6'>
					<div
						class='flex justify-between items-center mb-8 w-full fixed top-0 left-0 bg-black px-4 py-2'
						id='cwt01doa3o'
					>
						<div className='logo'>
							<Link to='/'>
								<img src={newlogo} alt='logo' />
							</Link>
						</div>
						<h2 class='text-2xl font-semibold text-white'>LingoQL</h2>
						<a class='text-white underline' href='/login'>
							Log In
						</a>
					</div>
					<div class='grid gap-7 items-center'>
						<div class='flex flex-col justify-center space-y-4 text-center'>
							<div class='space-y-2'>
								<h1 class='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500'>
									Revolutionize Your Query Experience
								</h1>
								<p class='max-w-[600px] text-zinc-200 md:text-xl dark:text-zinc-100 mx-auto'>
									Join us and take control of your data. Unlock insights
									seamlessly; bridging the data divide with intuitive querying.
								</p>
							</div>
							<div class='w-full max-w-sm space-y-2 mx-auto '>
								<form class='flex space-x-2 items-center justify-center'>
									{/* <input
									class='flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-lg flex-1 bg-gray-800 text-white border-gray-900'
									placeholder='Enter your email'
									type='email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/> */}
									<button
										class='inline-flex items-center justify-center my-5 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-white text-black'
										type='submit'
										onClick={() => navigate(`/signup`)}
									>
										Sign Up
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>
		</PI>
	);
};

export default NewLanding;
const style = {
	h1: {
		fontSize: '4.2em',
		lineHeight: 1.1,
		color: 'white',
	},
	box: {
		height: '90vh',
	},
	p: {
		fontSize: '1.2em',
		lineHeight: 1.1,
		color: 'white',
		margin: 20,
	},
};
