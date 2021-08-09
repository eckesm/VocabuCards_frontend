import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import NavBar from '../Navigation/NavBar';
import NewPasswordForm from './NewPasswordForm';
import AlertsContainer from '../Alerts/AlertsContainer';
import LoginForm from '../Login/LoginForm';

const MOBILE_BACKGROUND = process.env.REACT_APP_SCREEN_LOGIN_MOBILE;
const DESKTOP_BACKGROUND = process.env.REACT_APP_SCREEN_LOGIN_DESKTOP;

const useStyles = makeStyles(theme => ({
	screen    : {
		height                         : '100vh',
		backgroundRepeat               : 'no-repeat',
		backgroundPosition             : 'center center',
		backgroundSize                 : 'cover',
		[theme.breakpoints.down('xs')]: {
			backgroundImage : `url(${MOBILE_BACKGROUND})`
		},
		[theme.breakpoints.up('sm')]: {
			backgroundImage : `url(${DESKTOP_BACKGROUND})`
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
		}
	}
}));

export default function NewPasswordScreen() {
	const classes = useStyles();
	const { token } = useParams();
	const [ showForm, setShowForm ] = useState(true);

	return (
		<div className={classes.screen}>
			<NavBar />
			<AlertsContainer />
			<div className={classes.container}>
				{showForm && <NewPasswordForm token={token} setShowForm={setShowForm} />}
				{!showForm && (
					<div>
						<h4>
							<i>Please log in again.</i>
						</h4>
						<LoginForm />
					</div>
				)}
			</div>
		</div>
	);
}
