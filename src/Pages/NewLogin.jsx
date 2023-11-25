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
import { account, ID } from '../Api/Appwrite';
import Header from '../Components/Header/Header';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import LinearProgress from '@mui/material/LinearProgress';

const Login = () => {
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
			<Header />
			<Container fixed maxWidth='sm'>
				<h1
					style={{
						fontSize: '1.2em',
						lineHeight: 1.1,
						alignItems: 'center',
						textAlign: 'center',
						color: 'white',
						marginBottom: 20,
					}}
				>
					Log in
				</h1>
				<Paper
					elevation={5}
					style={{
						display: 'grid',
						justifyContent: 'center',
						borderRadius: '16px',
						alignItems: 'space-between',
						alignContent: 'space-between',
						padding: '10vh',
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
								'http://localhost:5173/chat',
								'http://localhost:5173/404'
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
						Login with Email
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
						onClick={() => login(email, password, user)}
					>
						Log in
					</Button>
					<div style={{ marginTop: 20 }}>
						<p className='signup-writeup' style={{ textAlign: 'center' }}>
							New Here?
							<Link className='signup' to='/signup'>
								Sign Up
							</Link>
						</p>
					</div>
				</Paper>
			</Container>
		</PI>
	);
};

export default Login;
