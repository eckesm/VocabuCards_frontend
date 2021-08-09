import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import { logoutUser, logoutUserViaAPI } from '../../actions/auth';
import { getAccessToken } from '../../helpers/API';

import NavBar from '../Navigation/NavBar';
import SignUpForm from './SignUpForm';
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
		marginTop                      : '40px',
		width                          : '300px',
		fontFamily                     : 'roboto, sans-serif',
		border                         : '1px solid rgb(200, 200, 200)',
		padding                        : '40px',
		backgroundColor                : 'snow',
		borderRadius                   : '3px',
		[theme.breakpoints.down('xs')]: {
			marginTop : '40px'
		},
		[theme.breakpoints.up('sm')]: {
			marginTop : '40px',
			boxShadow : '5px 5px 10px black'
		}
	}
}));

export default function SignUpScreen() {
	const classes = useStyles();
	const dispatch = useDispatch();
	useEffect(() => {
		if (getAccessToken()) {
			try {
				dispatch(logoutUserViaAPI());
				dispatch(logoutUser());
			} catch (e) {
				console.log(e);
			}
		}
	}, []);

	return (
		<div className={classes.screen}>
			<NavBar />
			<AlertsContainer />
			<div className={classes.container}>
				<SignUpForm />
			</div>
		</div>
	);
}
