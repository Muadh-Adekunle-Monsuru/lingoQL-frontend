import React from 'react';
import MessageBox from '../Components/MessageBox/MessageBox';
// import '../Styles/Styles.css';
// import './Pages.css';
import Header from '../Components/Header/Header';

const NewChats = () => {
	return (
		<>
			<div class='flex flex-col h-screen bg-black'>
				<header class='flex items-center justify-between p-6 border-b border-gray-200'>
					<h1 class='text-2xl font-bold text-white'>AI Chat</h1>
					<div class='flex items-center'>
						<span class='relative flex shrink-0 overflow-hidden h-8 w-8 rounded-full mr-2'></span>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							stroke-width='2'
							stroke-linecap='round'
							stroke-linejoin='round'
							class='h-6 w-6 text-white'
						>
							<path d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'></path>
							<circle cx='12' cy='7' r='4'></circle>
						</svg>
					</div>
				</header>
				<main class='flex-1 overflow-y-auto p-6'>
					<div class='flex flex-col items-center justify-center h-full space-y-4'>
						<h2 class='text-4xl font-semibold text-white'>
							How can I help you today?
						</h2>
						<div class='flex space-x-2 flex-wrap'>
							<div class='px-4 py-2 rounded bg-gray-800 text-gray-100'>
								How's the weather today?
							</div>
							<div class='px-4 py-2 rounded bg-gray-800 text-gray-100'>
								Set an alarm for 7 AM.
							</div>
							<div class='px-4 py-2 rounded bg-gray-800 text-gray-100'>
								Find the nearest coffee shop.
							</div>
							<div class='px-4 py-2 rounded bg-gray-800 text-gray-100'>
								What's the news today?
							</div>
						</div>
					</div>
				</main>
				<footer class='p-6 border-t border-gray-200'>
					<div class='flex space-x-2'>
						<input
							class='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1'
							placeholder='Type your message here...'
						/>
					</div>
				</footer>
			</div>
		</>
	);
};

export default NewChats;
