import React from 'react';

const NotFound = () => {
	return (
		<div>
			<div class='flex flex-col items-center justify-center min-h-screen bg-white dark:bg-zinc-900 text-center px-4 sm:px-6 lg:px-8'>
				<h1 class='text-6xl font-extrabold text-zinc-800 dark:text-zinc-100 mt-6'>
					404
				</h1>
				<p class='text-xl text-zinc-600 dark:text-zinc-400 mt-2'>
					Oops! The page you're looking for can't be found.
				</p>
				<a
					class='inline-flex h-9 items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-50 shadow transition-colors hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 dark:focus-visible:ring-zinc-300 mt-6'
					href='/'
				>
					Return Home
				</a>
			</div>
		</div>
	);
};

export default NotFound;
