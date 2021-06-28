import React from 'react';
import { useDispatch } from 'react-redux';
// import { useHistory } from 'react-router';
import { logoutUser } from '../../actions/auth';
import LoginForm from './LoginForm';

export default function Logout() {
	const dispatch = useDispatch();
	const history = useHistory();

	dispatch(logoutUser());
	// history.push('/');

	return (
		<div>
			<h1>You have been logged out.</h1>
			<LoginForm />
		</div>
	);
}
