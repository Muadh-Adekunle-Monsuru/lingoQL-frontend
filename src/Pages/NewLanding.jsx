import React, { useState } from 'react';
import PI from '../Components/PageIndicator/PI';

import { motion, useScroll, useSpring } from 'framer-motion';

import { Outlet, Link, useNavigate } from 'react-router-dom';
import newlogo from '/newlogo.png';
import { LoremIpsum } from '../Components/Lorem';
const NewLanding = () => {
	const navigate = useNavigate();
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001,
	});
	return (
		<PI title='Home' className='h-vh'>
			<motion.div className='progress-bar' style={{ scaleX }} />
			<div
				className='flex justify-between items-center  w-full  bg-black px-4 py-2'
				id='cwt01doa3o'
			>
				<div className='logo'>
					<Link to='/'>
						<img src={newlogo} alt='logo' />
					</Link>
				</div>
				<h2 className='text-2xl font-semibold text-white'>LingoQL</h2>
				<a className='text-white underline' href='/login'>
					Log In
				</a>
			</div>
			<section className='w-full h-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black'>
				<div className='px-4 md:px-6'>
					<div className='grid gap-7 items-center justify-center'>
						<div className='flex flex-col justify-center space-y-4 text-center'>
							<div className='space-y-2'>
								<h1 className=' text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500'>
									Revolutionize Your{' '}
									<span className='gradient-text'>Query </span>
									Experience
								</h1>
								<p className='max-w-[600px] text-zinc-200 md:text-xl dark:text-zinc-100 mx-auto'>
									Join us and take control of your data. Unlock insights
									seamlessly; bridging the data divide with intuitive querying.
								</p>
							</div>
							<div className='w-full max-w-sm space-y-2 mx-auto '>
								<form className='flex space-x-2 items-center justify-center'>
									<button
										className=' hover:gradient-border-btn inline-flex items-center justify-center my-5 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-sky-100 hover:bg-primary/90 h-10 px-4 py-2 bg-white text-black'
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
				<div className='container w-3/4 mx-auto mt-44'>
					<LoremIpsum />
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
