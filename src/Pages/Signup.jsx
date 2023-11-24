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

const Signup = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	console.log(name, email, password);
	return (
		<PI title='signup'>
			<Container fixed maxWidth='sm'>
				<h1 className='login--title'>Sign up</h1>
				<Paper
					elevation={5}
					style={{
						display: 'grid',
						padding: 20,
						justifyContent: 'center',
					}}
				>
					<Button variant='outlined' startIcon={<FcGoogle />}>
						Continue with Google
					</Button>
					<p style={{ fontSize: 12, fontWeight: 500, textAlign: 'center' }}>
						or
					</p>
					<p style={{ fontSize: 17, fontWeight: 500, textAlign: 'center' }}>
						Sign up with Email
					</p>
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

					<Button variant='contained' onClick={() => navigate('/signup')}>
						Register
					</Button>
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
