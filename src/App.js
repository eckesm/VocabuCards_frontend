import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getUserInfo } from './actions/vocab';

import AlertsContainer from './components/Alerts/AlertsContainer';

import './App.css';
import '@fontsource/roboto';

import NavBar from './components/Navigation/NavBar';
import Routes from './components/Routes/Routes';


function App() {
	const dispatch = useDispatch();
	const access_token = localStorage.getItem('access_token') || null;
	const { user, alerts } = useSelector(store => store);
	const [ displayAlerts, setDisplayAlerts ] = useState(alerts);

	if (access_token && !user) {
		dispatch(getUserInfo());
	}

	useEffect(
		() => {
			setDisplayAlerts(alerts);
		},
		[ alerts ]
	);

	return (
		<div className="App">
			<AlertsContainer alerts={displayAlerts} />
			<NavBar />
			<Routes />
		</div>
	);
}

export default App;
