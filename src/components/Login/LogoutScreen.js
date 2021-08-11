import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { logoutUser, logoutUserViaAPI } from '../../actions/auth';
import { addAlert } from '../../actions/auth';
import { makeStyles } from '@material-ui/core/styles';

const MOBILE_BACKGROUND = process.env.REACT_APP_SCREEN_LOGIN_MOBILE;
const DESKTOP_BACKGROUND = process.env.REACT_APP_SCREEN_LOGIN_DESKTOP;

const useStyles = makeStyles(theme => ({
	screen    : {
		height                         : 'min-content',
		minHeight                      : '100vh',
		paddingBottom                  : '50px',
		backgroundRepeat               : 'no-repeat',
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
		[theme.breakpoints.up('md')]: {
			marginTop : '150px',
			boxShadow : '5px 5px 10px black'
		}
	}
}));

export default function Logout() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();

	async function handleLogout() {
		const res = await dispatch(logoutUserViaAPI());
		dispatch(logoutUser());
		try {
			dispatch(
				addAlert({
					type  : res.status,
					title : res.title,
					text  : res.message
				})
			);
		} catch (e) {
			console.log(e);
			dispatch(
				addAlert({
					type  : 'success',
					title : 'Logged Out!',
					text  :
						'There was an error logging you out via API (perhaps you have a poor netwoek connection) but you have been logged out of the browser.'
				})
			);
		}
		history.push('/login');
	}

	useEffect(() => {
		handleLogout();
	}, []);

	return (
		<div className={classes.container}>
			<h1>You are being logged out.</h1>
		</div>
	);
}
