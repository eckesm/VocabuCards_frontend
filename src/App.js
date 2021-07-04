import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo } from './actions/vocab';

import { makeStyles } from '@material-ui/core/styles';

import './App.css';
import '@fontsource/roboto';

import NavBar from './components/Navigation/NavBar';
import Routes from './components/Routes/Routes';

// const useStyles = makeStyles(theme => ({
// 	alerts : {
// 		marginTop : '60px'
// 	}
// }));

function App() {
	const dispatch = useDispatch();

	const access_token = localStorage.getItem('access_token') || null;
	const { user, alerts } = useSelector(store => store);
	// const [ displayAlerts, setDisplayAlerts ] = useState([]);
	// const classes = useStyles();

	if (access_token && !user) {
		dispatch(getUserInfo());
	}

	// useEffect(
	// 	() => {
	// 		setDisplayAlerts(alerts);
	// 	},
	// 	[ alerts ]
	// );

	return (
		<div className="App">
			<NavBar />
			<Routes />
		</div>
	);
}

export default App;
