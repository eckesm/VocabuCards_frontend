import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import { addAlert } from '../../actions/auth';
import { DEFAULT_ALERT_CLOSE_MS } from '../../settings';

import Home from '../Home/Home';

const useStyles = makeStyles(theme => ({
	container : {
		marginTop       : '100px',
		margin          : '0 auto',
		width           : '300px',
		fontFamily      : 'roboto, sans-serif',
		border          : '1px solid rgb(200, 200, 200)',
		padding         : '40px',
		backgroundColor : 'snow',
		borderRadius    : '3px',
		boxShadow       : '5px 5px 8px grey'
	}
}));

export default function UnauthorizedRouteNotice({ notice = null }) {
	const classes = useStyles();
	const dispatch = useDispatch();

	const noticeMessage = notice ? notice : 'You do not have permission to access this resource.';

	useEffect(() => {
		dispatch(
			addAlert({
				type    : 'error',
				title   : `Unauthorized!`,
				text    : noticeMessage,
				closeMs : DEFAULT_ALERT_CLOSE_MS * 2
			})
		);
	}, []);

	return (
		<div>
			<div className={classes.container}>
				<h4>
					<i>{noticeMessage}</i>
				</h4>
				<Home />
			</div>
		</div>
	);
}
