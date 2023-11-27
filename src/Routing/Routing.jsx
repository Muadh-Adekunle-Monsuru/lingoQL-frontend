import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CSV from '../Pages/CSV';
import NotFound from '../Pages/NotFound';
import Signup from '../Pages/Signup';
import Login from '../Pages/NewLogin';
import NewLanding from '../Pages/NewLanding';
import NewChats from '../Pages/NewChats';
import NewLogin from '../Pages/LatestLogin';
const Routing = () => {
	return (
		<Routes>
			<Route path='home' element={<Navigate to='/' />} />
			<Route path='chat' element={<NewChats />} />
			<Route path='upload/database' element={<CSV />} />
			<Route path='404' element={<NotFound />} />
			<Route path='*' element={<NotFound />} />
			<Route path='signup' element={<Signup />} />
			<Route path='login' element={<Login />} />
			<Route path='newlogin' element={<NewLogin />} />
			<Route path='/' element={<NewLanding />} />
		</Routes>
	);
};
export default Routing;
