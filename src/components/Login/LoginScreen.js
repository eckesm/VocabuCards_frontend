import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import NavBar from '../Navigation/NavBar';
import LoginForm from './LoginForm';
import AlertsContainer from '../Alerts/AlertsContainer';

const MOBILE_BACKGROUND = process.env.REACT_APP_SCREEN_LOGIN_MOBILE;
const DESKTOP_BACKGROUND = process.env.REACT_APP_SCREEN_LOGIN_DESKTOP;

const useStyles = makeStyles(theme => ({
	screen    : {
		height                         : 'min-content',
		minHeight                      : '100vh',
		paddingBottom                  : '50px',
		backgroundRepeat               : 'no-repeat',
		backgroundPosition             : 'center center',
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

export default function LoginScreen() {
	const classes = useStyles();

	return (
		<div className={classes.screen}>
			<NavBar />
			<AlertsContainer />
			<div className={classes.container}>
				<LoginForm />
			</div>
		</div>
	);
}
