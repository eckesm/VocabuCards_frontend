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
// import LoginScreen from './components/Login/LoginScreen';

function App() {
	const history = useHistory();
	const dispatch = useDispatch();
	const access_token = localStorage.getItem('access_token') || null;
	const { user, alerts } = useSelector(store => store);
	const [ displayAlerts, setDisplayAlerts ] = useState(alerts);
	// const [promptLogin,setPromptLogin]=useState(false)

	async function attemptGetUserInfo() {
		const res = await dispatch(getUserInfo());

		if (res === 'ERROR') {
			console.log('cannot retrieve data - App.js');
			// setPromptLogin(true)
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

	if (access_token && !user) {
		attemptGetUserInfo();
	}

	useEffect(
		() => {
			setDisplayAlerts(alerts);
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
