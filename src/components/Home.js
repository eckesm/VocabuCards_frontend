import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	container : {
		margin          : '0 auto',
		marginTop       : '150px',
		width           : '300px',
		fontFamily      : 'roboto, sans-serif',
		border          : '1px solid rgb(200, 200, 200)',
		padding         : '40px',
		backgroundColor : 'snow',
		borderRadius    : '3px',
		boxShadow       : '5px 5px 8px grey'
	},
	button    : {
		marginTop : '15px',
		marginLeft:'5px',
		marginRight:'5px'
	}
}));

export default function Home() {
	const classes = useStyles();
	const history = useHistory();
	const { user } = useSelector(store => store);

	function goToLogin() {
		history.push('/login');
	}
	function goToRegister() {
		history.push('/signup');
	}

	return (
		<div className={classes.container}>
			<h1>Welcome to VocabuCards!</h1>
			{!user && (
				<div>
				<Button
					variant="contained"
					type="submit"
					color="primary"
					size="large"
					className={classes.button}
					onClick={goToLogin}
				>
					Login
				</Button>
				<Button
					variant="contained"
					type="submit"
					color="default"
					size="large"
					className={classes.button}
					onClick={goToRegister}
				>
					New User
				</Button>
				</div>
			)}
		</div>
	);
}
