import React from 'react';
import Header from '../Components/Header/Header';
import newlogo from '/newlogo.png';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { storage, ID } from '../Api/Appwrite';
import toast from 'react-hot-toast';
const CSV = () => {
	const navigate = useNavigate();

	const handlesubmit = async () => {
		try {
			storage.createFile(
				'6561eda0f1d53af10e64',
				ID.unique(),
				document.getElementById('file-input').files[0]
			);
			// toast.success('Upload Successful!');
			// navigate('/chat');
		} catch (e) {
			console.log('error uploading', e);
			toast.error('Upload unsuccessful');
		}
	};
	const mypromise = async () => {
		try {
			const response = handlesubmit();
			console.log(response);
		} catch (e) {
			console.log('error', e);
		}
	};
	return (
		<div>
			<div class='bg-black h-screen'>
				<header className='w-full bg-black py-4 px-6 flex items-center justify-between'>
					<div className='logo flex items-center'>
						<Link to='/'>
							<img src={newlogo} alt='logo' />
						</Link>
						<Link to='/'>
							<h1 className='text-2xl font-bold text-white mx-5'>LingoQL</h1>
						</Link>
					</div>
				</header>
				<div class=' max-w-xl mx-auto p-8 space-y-8 bg-white shadow-lg rounded-2xl  items-center my-10'>
					<div class='space-y-4'>
						<div class='text-center'>
							<h2 className='text-4xl font-bold text-black'>Upload Files</h2>
							<p class='text-zinc-500 dark:text-zinc-400 text-black'>
								You can upload files by providing a link or selecting from your
								computer.
							</p>
						</div>
						<div class='space-y-2'>
							<label
								class='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-black'
								htmlFor='link-input'
							>
								Link to Database
							</label>
							<input
								class='flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-200 text-black'
								id='link-input'
								placeholder='Enter link here'
								type='url'
							/>
							<button
								class='inline-flex bg-black text-white items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full'
								type='submit'
								onClick={() => navigate('/chat')}
							>
								Upload from Link
							</button>
						</div>
					</div>
					<div
						data-orientation='horizontal'
						role='none'
						class='shrink-0 bg-gray-100 h-[1px] w-full my-8'
					></div>
					<div class='space-y-4'>
						<div class='space-y-2'>
							<label
								class='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-black'
								htmlFor='file-input'
							>
								Upload csv from your computer
							</label>
							<input
								class='flex h-10 w-full text-blue-800 cursor-pointer rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-200 text-black'
								id='file-input'
								type='file'
							/>
							<button
								class='inline-flex items-center  bg-black text-white justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full'
								type='submit'
								onClick={() => mypromise()}
							>
								Upload File
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CSV;
