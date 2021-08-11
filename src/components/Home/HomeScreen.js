import React from 'react';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import NavBar from '../Navigation/NavBar';
import AlertsContainer from '../Alerts/AlertsContainer';
import Home from './Home';
import Welcome from './Welcome';
import ScreenShots from './ScreenShots';

import { SCREEN_HOME_MOBILE, SCREEN_HOME_DESKTOP, SCREEN_WELCOME_MOBILE, SCREEN_WELCOME_DESKTOP } from '../../settings';

const useStyles = makeStyles(theme => ({
	homeScreen    : {
		position                       : 'relative',
		height                         : 'min-content',
		minHeight                      : '100vh',
		paddingBottom                  : '50px',
		backgroundRepeat               : 'repeat-y',
		backgroundSize                 : '100%',
		[theme.breakpoints.down('sm')]: {
			backgroundImage : `url(${SCREEN_HOME_MOBILE})`
		},
		[theme.breakpoints.up('md')]: {
			backgroundImage : `url(${SCREEN_HOME_DESKTOP})`
		}
	},
	welcomeScreen : {
		position                       : 'relative',
		height                         : 'min-content',
		minHeight                      : '100vh',
		paddingBottom                  : '50px',
		backgroundRepeat               : 'no-repeat',
		backgroundSize                 : 'cover',
		[theme.breakpoints.down('xs')]: {
			backgroundImage : `url(${SCREEN_WELCOME_MOBILE})`
		},
		[theme.breakpoints.up('sm')]: {
			backgroundImage : `url(${SCREEN_WELCOME_DESKTOP})`
		}
	},
	container     : {
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
			marginTop : '75px',
			boxShadow : '5px 5px 10px black'
		},
		[theme.breakpoints.up('xl')]: {
			marginTop : '150px',
			boxShadow : '5px 5px 10px black'
		}
	}
}));

export default function HomeScreen({ status = null }) {
	const classes = useStyles();
	const { user } = useSelector(store => store);

	if (user || status === 'welcome') {
		return (
			<div className={classes.welcomeScreen}>
				<NavBar />
				<AlertsContainer />
				<div className={classes.container}>
					<h1>Welcome to VocabuCards!</h1>
					<Welcome />
				</div>
			</div>
		);
	}
	else {
		return (
			<div className={classes.homeScreen}>
				<NavBar />
				<AlertsContainer />
				<div className={classes.container}>
					<h1>Welcome to VocabuCards!</h1>
					<Home />
				</div>
				<ScreenShots />
			</div>
		);
	}
}
