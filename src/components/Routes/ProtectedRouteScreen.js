import React from 'react';
import LoginForm from '../Login/LoginForm';

export default function ProtectedRouteScreen() {
	return (
		<div>
			<h1>You must be logged in to access this page.</h1>
			<LoginForm />
		</div>
	);
}
