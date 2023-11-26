import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import './Pages.css';
import PI from '../Components/PageIndicator/PI';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';

import { account, ID } from '../Api/Appwrite';

import Header from '../Components/Header/Header';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
const Signup = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();
	const register = async (email, password, name) => {
		if (name === '' || email === '' || password === '') {
			toast.error('All fields are required');
		} else if (password.length < 8) {
			return toast.error('password must be atleast 8 characters!');
		}
		try {
			setLoading(true);
			await account.create(ID.unique(), email, password, name);
			const loggedIn = await account.createEmailSession(email, password);
			setUser(loggedIn);
			console.log(user);
			toast.success('You successfully signed up!');
			navigate('/upload/database');
		} catch (e) {
			setLoading(false);
			toast.error('Something went wrong, check your password and email');
			console.log(e);
		}
	};
	return (
		<PI title='signup'>
			<Header />
			<Container fixed maxWidth='sm'>
				<h1
					className='login--title'
					style={{
						fontSize: '1.2em',
						alignItems: 'center',
						textAlign: 'center',
						lineHeight: 1.1,
						color: 'white',
						marginBottom: 20,
					}}
				>
					Sign up
				</h1>
				<Paper
					elevation={5}
					style={{
						display: 'grid',
						justifyContent: 'center',
						alignItems: 'space-between',
						borderRadius: '16px',
						alignContent: 'space-between',
						padding: '5vh',
						backgroundColor: '#f4f4f6',
					}}
				>
					<br />
					<Button
						variant='outlined'
						startIcon={<FcGoogle />}
						onClick={() =>
							account.createOAuth2Session(
								'google',
								'https://lingoql.onrender.com/chat',
								'https://lingoql.onrender.com/signup'
							)
						}
					>
						Continue with Google
					</Button>
					<br />
					<p style={{ fontSize: 12, fontWeight: 500, textAlign: 'center' }}>
						or
					</p>
					<br />
					<p style={{ fontSize: 17, fontWeight: 500, textAlign: 'center' }}>
						Sign up with Email
					</p>
					<br />
					{loading && <LinearProgress />}
					<Box
						component='form'
						sx={{
							'& > :not(style)': { m: 1, width: '25ch' },
						}}
						noValidate
						autoComplete='off'
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							display: 'grid',
						}}
					>
						<TextField
							id='outlined-basic'
							label='Full Name'
							variant='outlined'
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
						<TextField
							id='outlined-basic'
							label='Email'
							variant='outlined'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						<TextField
							id='outlined-basic'
							label='Password'
							variant='outlined'
							type='password'
							autoComplete='current-password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</Box>
					<br />
					<Button
						variant='contained'
						onClick={() => register(email, password, name, user)}
					>
						Register
					</Button>
					<br />
					<p className='signup-writeup' style={{ textAlign: 'center' }}>
						Already have an account?
						<Link className='signup' to='/login'>
							Log in
						</Link>
					</p>
				</Paper>
			</Container>
		</PI>
	);
};

export default Signup;
