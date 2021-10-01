import React from 'react';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import NavBar from '../Navigation/NavBar';
import AlertsContainer from '../Alerts/AlertsContainer';
import Home from './Home';
import Welcome from './Welcome';
import ScreenShots from './ScreenShots';
import RenderText from '../RenderedText/RenderText';

import { SCREEN_HOME_MOBILE, SCREEN_HOME_DESKTOP, SCREEN_WELCOME_MOBILE, SCREEN_WELCOME_DESKTOP } from '../../settings';

const useStyles = makeStyles(theme => ({
	homeScreen          : {
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
	welcomeScreen       : {
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
	container           : {
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
	},
	renderTextContainer : {
		margin                         : '0 auto',
		border                         : '1px solid rgb(200, 200, 200)',
		borderRadius                   : '3px',
		fontFamily                     : 'roboto, sans-serif',
		backgroundColor                : 'snow',
		[theme.breakpoints.down('xs')]: {
			margin : '10px'
			// marginTop : '-45px'
		},
		[theme.breakpoints.up('sm')]: {
			margin    : '40px',
			// marginTop : '-35px',
			boxShadow : '5px 5px 10px black'
		},
		[theme.breakpoints.up('md')]: {
			margin       : '80px',
			// marginTop    : '-10px',
			marginBottom : '40px',
			boxShadow    : '5px 5px 10px black'
		},
		[theme.breakpoints.up('lg')]: {
			margin       : '160px',
			// marginTop    : '0px',
			marginBottom : '80px',
			boxShadow    : '5px 5px 10px black'
		},
		[theme.breakpoints.up('xl')]: {
			margin       : '500px',
			// marginTop    : '0px',
			marginTop    : '50px',
			marginBottom : '80px',
			boxShadow    : '5px 5px 10px black'
		}
	}
}));

export default function HomeScreen({ status = null }) {
// export default function HomeScreen() {
	const classes = useStyles();
	const { user } = useSelector(store => store);

	if (user || status === 'welcome') {
	// if (user) {
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
				{/* <div className={classes.container}>
					<h1>Welcome to VocabuCards!</h1>
					<Home />
				</div> */}

				{/* <h1>Welcome to VocabuCards!</h1> */}
				<div className={classes.renderTextContainer}>
					<RenderText />
				</div>
				{/* <ScreenShots /> */}
			</div>
		);
	}
}
