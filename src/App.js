import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { getUserInfo } from './actions/vocab';
import { addAlert, logoutUser } from './actions/auth';

import AlertsContainer from './components/Alerts/AlertsContainer';

import './App.css';
import '@fontsource/roboto';

import NavBar from './components/Navigation/NavBar';
import Routes from './components/Routes/Routes';

function App() {
	const history = useHistory();
	const dispatch = useDispatch();
	const access_token = localStorage.getItem('access_token') || null;
	const { user, alerts } = useSelector(store => store);
	const [ displayAlerts, setDisplayAlerts ] = useState(alerts);

	async function attemptGetUserInfo() {
		const res = await dispatch(getUserInfo());

		if (res === 'ERROR') {
			console.log('cannot retrieve data - App.js');

			dispatch(logoutUser());

			dispatch(
				addAlert({
					type  : 'info',
					title : 'Login Required!',
					text  : 'You have been logged out.  Please log back in.'
				})
			);
			history.push('/login');
		}
	}

	useEffect(() => {
		if (access_token && !user) {
			// console.log('attempt get user info')
			attemptGetUserInfo();
		}
	}, []);

	useEffect(
		() => {
			setDisplayAlerts(alerts);

			// const timer = setTimeout(() => {
			// 	setDisplayAlerts([]);
			// }, 5000);
			// return () => clearTimeout(timer);
		},
		[ alerts ]
	);

	return (
		<div className="App">
			<NavBar />
			<div className="App-content">
				<AlertsContainer alerts={displayAlerts} />
				<Routes />
			</div>
		</div>
	);
}

export default App;
