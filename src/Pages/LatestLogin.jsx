import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import './Pages.css';
import newlogo from '/newlogo.png';
import PI from '../Components/PageIndicator/PI';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { account, ID } from '../Api/Appwrite';
import Header from '../Components/Header/Header';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import LinearProgress from '@mui/material/LinearProgress';

const NewLogin = () => {
	const { params } = useParams();
	const [email, setEmail] = useState(params);
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);

	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const login = async (email, password) => {
		if (email === '' || password === '') {
			toast.error('All fields are required');
		} else if (password.length < 8) {
			return toast.error('password must be atleast 8 characters!');
		}
		try {
			setLoading(true);
			const loggedIn = await account.createEmailSession(email, password);
			setUser(loggedIn);
			toast.success('Login successful!');
			navigate('/chat');
		} catch (e) {
			setLoading(false);
			console.log(e);
			toast.error('Something went wrong, check your password and email');
		}
	};
	return (
		<PI title='login'>
			<div class='bg-black h-screen'>
				<header className='w-full bg-black py-4 px-6 flex items-center justify-between'>
					<div className='logo flex items-center'>
						<Link to='/'>
							<img src={newlogo} alt='logo' />
						</Link>
						<Link to='/'>
							<h1 className='text-2xl font-bold text-white mx-5'>LinogoQL</h1>
						</Link>
					</div>
				</header>
				<div class='min-h-screen bg-black flex flex-col'>
					<main class='flex-grow flex items-center justify-center'>
						<div class='flex flex-col space-y-6 w-80 bg-white rounded p-8'>
							<h1 class='text-3xl font-bold text-black text-center'>Log In</h1>
							<button class='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full'>
								Log in with Google
							</button>
							<div class='flex flex-col space-y-2'>
								<label
									class='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white'
									for='email'
								>
									Email
								</label>
								<input
									class='flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full'
									id='email'
									placeholder='m@example.com'
									required=''
									type='email'
								/>
							</div>
							<div class='flex flex-col space-y-2'>
								<label
									class='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white'
									for='password'
								>
									Password
								</label>
								<input
									class='flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full'
									id='password'
									required=''
									type='password'
								/>
							</div>
							<button class='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full'>
								Log in
							</button>
							<div class='text-center text-white'>
								Don't have an account?
								<a class='underline text-blue-500' href='#' id='cz10lubdlb'></a>
							</div>
						</div>
					</main>
				</div>
			</div>
		</PI>
	);
};

export default NewLogin;
