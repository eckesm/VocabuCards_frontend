// Referenced https://medium.com/@thanhbinh.tran93/private-route-public-route-and-restricted-route-with-react-router-d50b27c15f5e for help

import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import RestrictedRouteScreen from './RestrictedRouteScreen';
import ProtectedRouteScreen from './ProtectedRouteScreen';

export default function RestrictedRoute({ component: Component, path, ...rest }) {
<<<<<<< HEAD
	const { user, subscription_status } = useSelector(st => st);
=======
	const { user, subscription_status, account_override } = useSelector(st => st);
>>>>>>> dev

	if (!user) {
		return <Route {...rest} render={props => <ProtectedRouteScreen />} />;
	}
<<<<<<< HEAD
=======
	else if (account_override === 'full_access') {
		return <Route {...rest} render={props => <Component {...props} {...rest} />} />;
	}
>>>>>>> dev
	else {
		return (
			<Route
				{...rest}
				render={props =>
					subscription_status === 'expired' ? <RestrictedRouteScreen /> : <Component {...props} {...rest} />}
			/>
		);
	}
}
