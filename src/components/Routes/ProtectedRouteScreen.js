import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import { addAlert } from '../../actions/auth';

import NavBar from '../Navigation/NavBar';
import AlertsContainer from '../Alerts/AlertsContainer';
import LoginForm from '../Login/LoginForm';

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

export default function ProtectedRouteScreen({ notice = null }) {
	const classes = useStyles();
	const dispatch = useDispatch();

	const noticeMessage = notice ? notice : 'You must be logged in to access this page.';

	useEffect(() => {
		dispatch(
			addAlert({
				type    : 'error',
				title   : 'Protected!',
				text    : noticeMessage,
				closeMs : true
			})
		);
	}, []);

	return (
		<div className={classes.screen}>
			<NavBar />
			<AlertsContainer />
			<div className={classes.container}>
				<h4>
					<i>{noticeMessage}.</i>
				</h4>
				<LoginForm forward={true} />
			</div>
		</div>
	);
}
