import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import './Header.css';
import logo from '/logo.png';

import { Link } from 'react-router-dom';
const Header = () => {
	return (
		<div className='header--container'>
			<div className='header--content'>
				<div className='header--left'>
					<div className='logo'>
						<Link to='/'>
							<img src={logo} alt='logo' />
						</Link>
					</div>
					<div className='logo--text'>
						<Link to='/'>
							<h1 className='LingoQL'>LingoQL</h1>
						</Link>
					</div>
				</div>
				<div className='header--right'>
					<div className='user'>
						<AiOutlineUser className='user' />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
