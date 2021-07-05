import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../actions/auth';
import LoginForm from './LoginForm';

export default function Logout() {
	const dispatch = useDispatch();

	dispatch(logoutUser());

	return (
		<div>
			<h1>You have been logged out.</h1>
			<LoginForm />
		</div>
	);
}
