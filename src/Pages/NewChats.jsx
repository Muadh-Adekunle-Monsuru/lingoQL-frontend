import React, { useState, useEffect } from 'react';
import MessageBox from '../Components/MessageBox/MessageBox';
// import '../Styles/Styles.css';
// import './Pages.css';
import Header from '../Components/Header/Header';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import { account } from '../Api/Appwrite';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import newlogo from '/newlogo.png';
import 'react-chat-elements/dist/main.css';
import { MessageList } from 'react-chat-elements';
import LinearProgress from '@mui/material/LinearProgress';

import axios from 'axios';
const messageListReferance = React.createRef();

const NewChats = () => {
	const navigate = useNavigate();
	const [message, setMessage] = useState('');
	const [user, setUser] = useState(null);
	const [open, setOpen] = React.useState(false);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [chatHistory, setChatHistory] = useState([]);
	const [loading, setLoading] = useState(false);
	const init = async () => {
		try {
			const loggedIn = await account.get();
			setUser(loggedIn.name);
			// console.log(loggedIn.name);
		} catch (err) {
			setUser(null);
		}
	};
	useEffect(() => {
		init();
	}, []);

	async function logout() {
		await account.deleteSession('current');
		setUser(null);
		toast.error('Log out succesful');
		navigate('/login');
	}
	const handleClick = (event) => {
		init();
		setAnchorEl(event.currentTarget);
		setOpen((previousOpen) => !previousOpen);
	};

	const canBeOpen = open && Boolean(anchorEl);
	const id = canBeOpen ? 'transition-popper' : undefined;
	const chipTexts = (value) => {
		setMessage(value);
	};
	const handleSubmit = () => {
		console.log('clicked');
		if (message == '') return;
		setChatHistory((prev) => [
			...prev,
			{ position: 'right', type: 'text', title: user, text: message },
		]);

		sendMessage(message);

		setMessage('');
	};
	const sendMessage = async (message) => {
		const endPoint = 'https://api.openai.com/v1/chat/completions';
		const headers = {
			'Content-Type': 'application/json',
			Authorization: `Bearer {key}`,
		};
		const data = {
			model: 'gpt-3.5-turbo',
			messages: [{ role: 'user', content: message }],
			temperature: 0.4,
		};
		setLoading(true);

		try {
			const response = await axios.post(endPoint, data, { headers: headers });
			console.log(response);
			setChatHistory((prev) => [
				...prev,
				{
					position: 'left',
					type: 'text',
					title: 'LingoBot',
					text: response.data.choices[0].message.content,
				},
			]);
		} catch (error) {
			console.error(error);
			toast.error('something went wrong!');
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<div class='flex flex-col h-screen bg-black'>
				<header class='flex items-center justify-between p-1 border-b border-gray-200'>
					<div className='logo flex items-center'>
						<Link to='/'>
							<img src={newlogo} alt='logo' />
						</Link>
						<Link to='/'>
							<h1 className='text-2xl font-bold text-white mx-5'>LinogoQL</h1>
						</Link>
					</div>
					<div class='flex items-center cursor-pointer' onClick={handleClick}>
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
						<Popper id={id} open={open} anchorEl={anchorEl} transition>
							{({ TransitionProps }) => (
								<Fade {...TransitionProps} timeout={350}>
									<Box
										sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}
										class='grid gap-4 bg-white p-3 rounded'
									>
										<p>User: {user}</p>
										<button
											class='inline-flex items-center bg-red-300  justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2'
											onClick={() => logout()}
										>
											Sign Out
										</button>
									</Box>
								</Fade>
							)}
						</Popper>
					</div>
				</header>
				<main class='flex-1 overflow-y-auto p-6'>
					{chatHistory.length === 0 && (
						<div class='flex flex-col items-center justify-center h-full space-y-4'>
							<h2 class='text-4xl font-semibold text-white'>
								How can I help you today?
							</h2>
							<div class='flex space-x-2 flex-wrap'>
								<div
									class='px-4 py-2 rounded bg-gray-800 text-gray-100 cursor-pointer
							
							'
									onClick={() => chipTexts("How's the weather today?")}
								>
									How's the weather today?
								</div>
								<div
									class='px-4 py-2 rounded bg-gray-800 text-gray-100 cursor-pointer'
									onClick={() => chipTexts('Set an alarm for 7 AM.')}
								>
									Set an alarm for 7 AM.
								</div>
								<div
									class='px-4 py-2 rounded bg-gray-800 text-gray-100 cursor-pointer'
									onClick={() => chipTexts('Find the nearest coffee shop.')}
								>
									Find the nearest coffee shop.
								</div>
								<div
									class='px-4 py-2 rounded bg-gray-800 text-gray-100 cursor-pointer'
									onClick={() => chipTexts("What's the news today?")}
								>
									What's the news today?
								</div>
							</div>
						</div>
					)}
					<div>
						<MessageList
							className='message-list'
							lockable={false}
							toBottomHeight={'100%'}
							dataSource={chatHistory}
						/>
					</div>
				</main>
				<footer class='p-2 border-t border-gray-200'>
					<div class='py-2'>{loading && <LinearProgress />}</div>

					<div class='flex space-x-2'>
						<input
							class='flex h-15  w-full rounded-md border border-input bg-background px-3 py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1'
							placeholder='Type your message here...'
							value={message}
							onChange={(e) => setMessage(e.target.value)}
						/>
						<button
							class='inline-flex items-center bg-slate-300 justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-5'
							onClick={handleSubmit}
						>
							Send
						</button>
					</div>
				</footer>
			</div>
		</>
	);
};

export default NewChats;
