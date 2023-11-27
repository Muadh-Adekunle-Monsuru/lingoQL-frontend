import React, { useState, useEffect } from 'react';
import MessageBox from '../Components/MessageBox/MessageBox';
// import '../Styles/Styles.css';
// import './Pages.css';
import Header from '../Components/Header/Header';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import { account, ID, databases, Query } from '../Api/Appwrite';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import newlogo from '/newlogo.png';
import 'react-chat-elements/dist/main.css';
import { MessageList } from 'react-chat-elements';
import LinearProgress from '@mui/material/LinearProgress';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const messageListReferance = React.createRef();

const NewChats = () => {
	const navigate = useNavigate();
	const [message, setMessage] = useState('');
	const [user, setUser] = useState(null);
	const [open, setOpen] = React.useState(false);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [chatHistory, setChatHistory] = useState([]);
	const [loading, setLoading] = useState(false);
	const [openModal, setOpenModal] = React.useState(false);
	const handleOpen = () => setOpenModal(true);
	const handleClose = () => setOpenModal(false);
	const [dbType, setDbType] = useState('');
	const [dbURI, setDbURI] = useState('');
	const [previous, setPrevious] = useState('');
	const init = async () => {
		try {
			const loggedIn = await account.get();
			setUser(loggedIn);
			postInit(loggedIn);
		} catch (err) {
			console.log(err);
			toast.error('Unauthorized User');
			setUser(null);
			navigate('/login');
		}
	};
	useEffect(() => {
		init();
	}, []);

	async function postInit(params) {
		try {
			prevParameters(params);
		} catch (e) {
			console.log(e);
		}
	}

	async function prevParameters(params) {
		try {
			const response = await databases.listDocuments(
				'656301e1955db1d3d67f',
				'656301ef9e452ec31d59',
				[
					Query.orderDesc('$createdAt'),
					Query.limit(1),
					Query.equal('userId', [params.$id]),
				]
			);
			setPrevious(response.documents);
			setDbType(response.documents[0].dbType);
			setDbURI(response.documents[0].dbURI);
			if (response.documents.length === 0) {
				handleOpen();
			}
		} catch (e) {
			console.log(e);
			handleOpen();
		}
	}
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

	async function saveParams(params) {
		console.log(params);
		try {
			const response = await databases.createDocument(
				'656301e1955db1d3d67f',
				'656301ef9e452ec31d59',
				ID.unique(),
				params
			);
			toast.success('Parameters Saved');
			handleClose();
		} catch (e) {
			console.log(e.response);
			toast.error('Error saving parameters');
		}
	}

	const canBeOpen = open && Boolean(anchorEl);
	const id = canBeOpen ? 'transition-popper' : undefined;
	const chipTexts = (value) => {
		setMessage(value);
	};
	const handleSubmit = () => {
		if (message == '') return;
		setChatHistory((prev) => [
			...prev,
			{ position: 'right', type: 'text', title: user.name, text: message },
		]);

		// sendMessage(message);
		sendRequest();

		setMessage('');
	};
	const sendMessage = async (message) => {
		const endPoint = 'https://api.openai.com/v1/chat/completions';
		const headers = {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
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

	const messageRequest = JSON.stringify({
		'dbType': dbType,
		'dbURI': dbURI,
		'userInput': message,
	});

	const config = {
		method: 'post',
		maxBodyLength: Infinity,
		url: 'https://lingoql-backend.onrender.com/api/lingo/query-your-db',
		headers: {
			'Content-Type': 'application/json',
		},
		data: { messageRequest },
	};
	const sendRequest = async () => {
		console.log(messageRequest);
		try {
			setLoading(true);
			axios
				.request(config)
				.then((response) => {
					setChatHistory((prev) => [
						...prev,
						{
							position: 'left',
							type: 'text',
							title: 'LingoBot',
							text: JSON.stringify(response.data),
						},
					]);
					console.log(JSON.stringify(response.data));
				})
				.catch((error) => {
					console.log(error);
					toast.error('Error making request');
				});
		} catch (e) {
			console.log(e);
			toast.error('Error making request');
		} finally {
			setLoading(false);
		}
	};
	return (
		<>
			<div className='flex flex-col h-screen bg-black'>
				<header className='flex items-center justify-between p-1 border-b border-gray-200'>
					<div className='logo flex items-center'>
						<Link to='/'>
							<img src={newlogo} alt='logo' />
						</Link>
						<Link to='/'>
							<h1 className='text-2xl font-bold text-white mx-5'>LinogoQL</h1>
						</Link>
					</div>
					<div
						className='flex items-center cursor-pointer'
						onClick={handleClick}
					>
						<span className='relative flex shrink-0 overflow-hidden h-8 w-8 rounded-full mr-2'></span>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
							className='h-6 w-6 text-white'
						>
							<path d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'></path>
							<circle cx='12' cy='7' r='4'></circle>
						</svg>
						<Popper id={id} open={open} anchorEl={anchorEl} transition>
							{({ TransitionProps }) => (
								<Fade {...TransitionProps} timeout={350}>
									<Box
										sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}
										className='grid gap-4 bg-white p-3 rounded'
									>
										<p>User: {user.name}</p>
										<button
											className='inline-flex items-center bg-red-300  justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2'
											onClick={handleOpen}
										>
											Edit Data
										</button>
										<button
											className='inline-flex items-center bg-blue-300  justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2'
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
				<main className='flex-1 overflow-y-auto p-6'>
					{chatHistory.length === 0 && (
						<div className='flex flex-col items-center justify-center h-full space-y-4'>
							<h2 className='text-4xl font-semibold text-white'>
								How can I help you today?
							</h2>
							<div className='flex space-x-2 flex-wrap'>
								<div
									className='px-4 py-2 rounded bg-gray-800 text-gray-100 cursor-pointer
							
							'
									onClick={() => chipTexts("How's the weather today?")}
								>
									How's the weather today?
								</div>
								<div
									className='px-4 py-2 rounded bg-gray-800 text-gray-100 cursor-pointer'
									onClick={() => chipTexts('Set an alarm for 7 AM.')}
								>
									Set an alarm for 7 AM.
								</div>
								<div
									className='px-4 py-2 rounded bg-gray-800 text-gray-100 cursor-pointer'
									onClick={() => chipTexts('Find the nearest coffee shop.')}
								>
									Find the nearest coffee shop.
								</div>
								<div
									className='px-4 py-2 rounded bg-gray-800 text-gray-100 cursor-pointer'
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
							isShowChild={true}
							dataSource={chatHistory}
						/>
					</div>{' '}
					<Modal
						open={openModal}
						onClose={handleClose}
						aria-labelledby='modal-modal-title'
						aria-describedby='modal-modal-description'
					>
						<Box sx={style}>
							<div className=' max-w-xl mx-auto p-8 space-y-8 bg-white shadow-lg rounded-2xl  items-center my-10'>
								<div className='space-y-4'>
									<div className='text-center'>
										<p className='text-zinc-500 dark:text-zinc-400 text-black'>
											Provide information about your database
										</p>
									</div>
									<div className='space-y-5'>
										<div>
											<label
												className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-black'
												htmlFor='link-input'
											>
												Database Type
											</label>
											<select
												id='dbType'
												name='dbType'
												className='w-64 h-10 border border-gray-300 rounded-md px-3 '
												onChange={(e) => setDbType(e.target.value)}
												value={dbType}
											>
												<option value=''>Select...</option>
												<option value='postgres'>PostgreSQL</option>
												<option value='mysql'>MySQL</option>
											</select>
										</div>
										<div>
											<label
												className=' text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-black'
												htmlFor='link-input'
											>
												Link to Database
											</label>
											<input
												className='my-2 flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-200 text-black'
												id='link-input'
												placeholder='Enter link here'
												type='url'
												value={dbURI}
												onChange={(e) => setDbURI(e.target.value)}
											/>
											<button
												className='inline-flex bg-black text-white items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full'
												type='submit'
												onClick={() =>
													saveParams({ userId: user.$id, dbType, dbURI })
												}
											>
												Save
											</button>
										</div>
									</div>
								</div>
							</div>
						</Box>
					</Modal>
				</main>
				<footer className='p-2 border-t border-gray-200'>
					<div className='py-2'>{loading && <LinearProgress />}</div>

					<div className='flex space-x-2'>
						<input
							className='flex h-15  w-full rounded-md border border-input bg-background px-3 py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1'
							placeholder='Type your message here...'
							value={message}
							onChange={(e) => setMessage(e.target.value)}
						/>
						<button
							className='inline-flex items-center bg-slate-300 justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-5'
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

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};
