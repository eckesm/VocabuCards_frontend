// Referenced https://medium.com/@thanhbinh.tran93/private-route-public-route-and-restricted-route-with-react-router-d50b27c15f5e for help

import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { logoutUser } from '../../actions/auth';
import { getUserInfo } from '../../actions/vocab';

import ProtectedRouteScreen from './ProtectedRouteScreen';

const ProtectedRoute = ({ component: Component, path, ...rest }) => {
	const dispatch = useDispatch();
	const { user } = useSelector(store => store);
	const access_token = localStorage.getItem('access_token') || null;

	if (access_token === null) {
		dispatch(logoutUser());
	}

	async function attemptGetUserInfo() {
		const res = await dispatch(getUserInfo());
		if (res === 'ERROR') {
			console.log('cannot retrieve data - ProtectedRoute.js');
		}
	}

	if (access_token && !user) {
		attemptGetUserInfo();
	}

	return (
		<Route
			{...rest}
			render={props => (access_token ? <Component {...props} {...rest} /> : <ProtectedRouteScreen />)}
		/>
	);
};

export default ProtectedRoute;
