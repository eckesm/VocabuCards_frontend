import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import NavBar from '../Navigation/NavBar';
import ConfirmEmailForm from './ConfirmEmailForm';
import AlertsContainer from '../Alerts/AlertsContainer';
import Home from '../Home/Home';

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

	return (
		<div className={classes.screen}>
			<NavBar />
			<AlertsContainer />
			<div className={classes.container}>
				{showForm && <ConfirmEmailForm token={token} setShowForm={setShowForm} />}
				{!showForm && (
					<div>
						<h1>Your email address has been confirmed.</h1>
						<Home />
					</div>
				)}
			</div>
		</div>
	);
}
