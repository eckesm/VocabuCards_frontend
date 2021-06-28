import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo } from './actions/vocab';

import './App.css';
import '@fontsource/roboto';

import NavBar from './components/Navigation/NavBar';
import Routes from './components/Routes/Routes';

function App() {
	const dispatch = useDispatch();

	const access_token = localStorage.getItem('access_token') || null;
	const { user } = useSelector(store => store);

	if (access_token && !user) {
		dispatch(getUserInfo());
	}


	return (
		<div className="App">
			<NavBar />
			<Routes />
		</div>
	);
}

export default App;
