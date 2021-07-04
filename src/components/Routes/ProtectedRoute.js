// Referenced https://medium.com/@thanhbinh.tran93/private-route-public-route-and-restricted-route-with-react-router-d50b27c15f5e for help

import React from 'react';
import { Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logoutUser } from '../../actions/auth';

import ProtectedRouteScreen from './ProtectedRouteScreen';

const ProtectedRoute = ({ component: Component, path, ...rest }) => {
	const dispatch = useDispatch();
	const access_token = localStorage.getItem('access_token') || null;

	if (access_token === null) {
		dispatch(logoutUser());
	}

	return (
		<Route
			{...rest}
			render={props =>
				access_token ? (
					<Component {...props} {...rest} />
				) : (
					// <Redirect to="/restricted" />
					<ProtectedRouteScreen />
				)}
		/>
	);
};

export default ProtectedRoute;
