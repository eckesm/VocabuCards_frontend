// import logo from './logo.svg';
import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { loginUserViaAPI } from './actions/auth';

import './App.css';
import '@fontsource/roboto';

import NavBar from './components/Navigation/NavBar';
import Routes from './Routes';

function App() {
	// const dispatch = useDispatch();
	// const { user } = useSelector(store => store);
	// const access_token = localStorage.getItem('access_token') || null;

	// if (!user) {
	// 	console.log('NO USER')
	// 	if (access_token) {
	// 		dispatch(loginUserViaAPI());
	// 	}
	// }

	return (
		<div className="App">
			<NavBar />
			<Routes />
		</div>
	);
}

export default App;
