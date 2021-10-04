import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import NavBar from '../Navigation/NavBar';
import ConfirmEmailForm from './ConfirmEmailForm';
import AlertsContainer from '../Alerts/AlertsContainer';
// import Home from '../Home/Home';
import LoginForm from '../Login/LoginForm';

import { SCREEN_LOGIN_MOBILE, SCREEN_LOGIN_DESKTOP } from '../../settings';

const useStyles = makeStyles(theme => ({
	screen    : {
		height                         : '100vh',
		backgroundRepeat               : 'no-repeat',
		backgroundPosition             : 'center center',
		backgroundSize                 : 'cover',
		[theme.breakpoints.down('xs')]: {
			backgroundImage : `url(${SCREEN_LOGIN_MOBILE})`
		},
		[theme.breakpoints.up('sm')]: {
			backgroundImage : `url(${SCREEN_LOGIN_DESKTOP})`
		}
	},
	container : {
		margin                         : '0 auto',
		width                          : '300px',
		fontFamily                     : 'roboto, sans-serif',
		border                         : '1px solid rgb(200, 200, 200)',
		padding                        : '40px',
		backgroundColor                : 'snow',
		borderRadius                   : '3px',
		[theme.breakpoints.down('xs')]: {
			marginTop : '75px'
		},
		[theme.breakpoints.up('sm')]: {
			marginTop : '100px',
			boxShadow : '5px 5px 10px black'
		},
		[theme.breakpoints.up('xl')]: {
			marginTop : '150px',
			boxShadow : '5px 5px 10px black'
		}
	},
	button    : {
		marginTop : '15px'
	}
}));

export default function ConfirmEmailScreen() {
	const classes = useStyles();

	const { token } = useParams();
	const [ showForm, setShowForm ] = useState(true);
	const [ authEmailAddress, setAuthEmailAddress ] = useState(null);

	return (
		<div className={classes.screen}>
			<NavBar />
			<AlertsContainer />
			<div className={classes.container}>
				{showForm && (
					<ConfirmEmailForm
						token={token}
						setShowForm={setShowForm}
						setAuthEmailAddress={setAuthEmailAddress}
					/>
				)}
				{!showForm && (
					<div>
						<h3>
							<i>
								Your email address has been confirmed. Please log in using your authenticated
								credentials.
							</i>
						</h3>
						{/* <Home /> */}
						<LoginForm startEmailAddress={authEmailAddress} />
					</div>
				)}
			</div>
		</div>
	);
}
