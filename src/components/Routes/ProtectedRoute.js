// Referenced https://medium.com/@thanhbinh.tran93/private-route-public-route-and-restricted-route-with-react-router-d50b27c15f5e for help

import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ProtectedRouteScreen from './ProtectedRouteScreen';

export default function ProtectedRoute({ component: Component, path, ...rest }) {
	const { user } = useSelector(st => st);

	return <Route {...rest} render={props => (user ? <Component {...props} {...rest} /> : <ProtectedRouteScreen />)} />;
}
