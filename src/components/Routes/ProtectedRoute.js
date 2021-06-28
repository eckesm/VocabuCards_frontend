// Referenced https://medium.com/@thanhbinh.tran93/private-route-public-route-and-restricted-route-with-react-router-d50b27c15f5e for help

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { isLogin } from '../utils';

const ProtectedRoute = ({ component: Component, ...rest }) => {
	const access_token = localStorage.getItem('access_token') || null;
	// const { user } = useSelector(store => store);

	return (
		<Route
			{...rest}
			render={props => (access_token ? <Component {...props} {...rest} /> : <Redirect to="/restricted" />)}
		/>
	);
};

export default ProtectedRoute;
