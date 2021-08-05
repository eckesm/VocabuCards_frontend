import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { getUserInfo } from './actions/vocab';
import { addAlert, logoutUser } from './actions/auth';
import { stripeCurrentAlert, stripeSuccessAlert, stripeExpiringAlert } from './helpers/Stripe';

import AlertsContainer from './components/Alerts/AlertsContainer';

import './App.css';
import '@fontsource/roboto';

import NavBar from './components/Navigation/NavBar';
import Routes from './components/Routes/Routes';

function App() {
	const history = useHistory();
	const dispatch = useDispatch();
	const access_token = localStorage.getItem('access_token') || null;
	// const { user, alerts } = useSelector(store => store);
	const { user } = useSelector(store => store);
	// const [ displayAlerts, setDisplayAlerts ] = useState(alerts);
	const [ loading, setLoading ] = useState(true);

	async function attemptGetUserInfo() {
		const res = await dispatch(getUserInfo());
		setLoading(false);

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
			attemptGetUserInfo();
		}
		else {
			setLoading(false);
		}
	}, []);

	// useEffect(
	// 	() => {
	// 		setDisplayAlerts(alerts);
	// 	},
	// 	[ alerts ]
	// );

	// useEffect(
	// 	() => {
	// 		if (stripe_period_end && current_plan) {
	// 			if (subscription_status === 'expiring') {
	// 				dispatch(addAlert(stripeExpiringAlert(current_plan, stripe_period_end,true)));
	// 			}
	// 			else {
	// 				dispatch(addAlert(stripeCurrentAlert(current_plan, stripe_period_end,true)));
	// 			}
	// 		}
	// 	},
	// 	[ stripe_period_end, current_plan ]
	// );

	return (
		<div className="App">
			{!loading && (
				<div>
					<NavBar />
					<div className="App-content">
						{/* <AlertsContainer alerts={displayAlerts} /> */}
						<Routes />
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
