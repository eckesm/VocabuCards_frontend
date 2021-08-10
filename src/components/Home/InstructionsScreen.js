import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import NavBar from '../Navigation/NavBar';
import Instructions from './Instructions';
import AlertsContainer from '../Alerts/AlertsContainer';

const MOBILE_BACKGROUND = process.env.REACT_APP_SCREEN_HOME_MOBILE;
const DESKTOP_BACKGROUND = process.env.REACT_APP_SCREEN_HOME_DESKTOP;

const useStyles = makeStyles(theme => ({
	screen    : {
		height                         : 'max-content',
		minHeight                      : '100vh',
		paddingBottom                  : '25px',
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
		height                         : '75vh',
		fontFamily                     : 'roboto, sans-serif',
		border                         : '1px solid rgb(200, 200, 200)',
		padding                        : '40px',
		backgroundColor                : 'snow',
		borderRadius                   : '3px',
		overflowY                      : 'scroll',
		[theme.breakpoints.down('xs')]: {
			margin : '18px'
		},
		[theme.breakpoints.up('sm')]: {
			margin    : '40px',
			marginTop : '50px',
			boxShadow : '5px 5px 10px black'
		},
		[theme.breakpoints.up('md')]: {
			height    : '65vh',
			margin    : '80px',
			marginTop : '100px',
			boxShadow : '5px 5px 10px black'
		},
		[theme.breakpoints.up('lg')]: {
			margin : '160px',
			marginTop : '120px',
			boxShadow : '5px 5px 10px black'
		
		},
		[theme.breakpoints.up('xl')]: {
			margin : '500px',
			marginTop : '120px',
			marginBottom : '120px',
			boxShadow : '5px 5px 10px black'
		}
	}
}));

export default function InstructionsScreen() {
	const classes = useStyles();

	return (
		<div className={classes.screen}>
			<NavBar />
			<AlertsContainer />
			<div className={classes.container}>
				<h1>Getting Started</h1>
				<Instructions />
			</div>
		</div>
	);
}
