import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { clearAlerts } from '../../actions/auth';

import NavDrawer from './NavDrawer';
import VocabModal from '../VocabForms/VocabModal';

const useStyles = makeStyles(theme => ({
	grow           : {
		flexGrow      : 1,
		paddingBottom : '65px'
	},
	menuButton     : {
		marginRight : theme.spacing(2)
	},
	title          : {
		display                      : 'none',
		[theme.breakpoints.up('xs')]: {
			display : 'block'
		}
	},
	sectionDesktop : {
		display                      : 'none',
		[theme.breakpoints.up('md')]: {
			display : 'flex'
		}
	},
	sectionMobile  : {
		display                      : 'flex',
		[theme.breakpoints.up('md')]: {
			display : 'none'
		}
	}
}));

export default function NavBar() {
	const dispatch = useDispatch();
	const history = useHistory();
	
	// const { user, language, language_object, current_plan, subscription_status } = useSelector(store => store);
	const { user, language, language_object, subscription_status } = useSelector(store => store);
	const languageName = language_object[language];
	const [ auth, setAuth ] = useState(false);

	useEffect(
		() => {
			if (user) {
				setAuth(true);
			}
			else {
				setAuth(false);
			}
		},
		[ user ]
	);

	const goToHome = () => {
		dispatch(clearAlerts());
		history.push('/');
	};

	const goToNewUser = () => {
		dispatch(clearAlerts());
		history.push('/new-user');
	};

	const goToLogin = () => {
		dispatch(clearAlerts());
		history.push('/login');
	};

	const goToLogout = () => {
		dispatch(clearAlerts());
		history.push('/logout');
	};

	const goToPlans = () => {
		dispatch(clearAlerts());
		history.push('/plans');
	};

	const goToGettingStarted = () => {
		dispatch(clearAlerts());
		history.push('/getting-started');
	};

	const [ modalOpen, setModalOpen ] = useState(false);
	const handleModalOpen = () => {
		if (subscription_status === 'past_due') {
			history.push('/restricted');
		}
		else {
			setModalOpen(true);
		}
	};
	const handleModalClose = () => {
		setModalOpen(false);
	};

	const classes = useStyles();

	const [ mobileMoreAnchorEl, setMobileMoreAnchorEl ] = React.useState(null);

	return (
		<div className={classes.grow}>
			<AppBar position="fixed">
				<Toolbar>
					<NavDrawer
						handleModalOpen={handleModalOpen}
						goToHome={goToHome}
						goToLogin={goToLogin}
						goToLogout={goToLogout}
						goToNewUser={goToNewUser}
						goToPlans={goToPlans}
						goToGettingStarted={goToGettingStarted}
					/>
					<Typography className={classes.title} variant="h5" noWrap>
						VocabuCards
					</Typography>
					<div className={classes.sectionDesktop}>
						{auth && (
							<Typography
								className={classes.title}
								variant="h6"
								style={{ marginLeft: '15px', paddingRight: '5px', fontStyle: 'italic' }}
								noWrap
							>
								{languageName}
							</Typography>
						)}
					</div>
					<div className={classes.grow} />
					<div className={classes.sectionDesktop}>
						{auth &&
						subscription_status !== 'past_due' && (
							<Button color="inherit" href="/#/study-text" style={{ textTransform: 'none' }}>
								Study Text
							</Button>
						)}
						{!auth && (
							<Button color="inherit" href="/#/" style={{ textTransform: 'none' }}>
								Study Text
							</Button>
						)}
						{auth &&
						subscription_status === 'past_due' && (
							<Button color="inherit" href="/#/plans" style={{ textTransform: 'none' }}>
								Subscriptions
							</Button>
						)}
						{auth &&
						subscription_status !== 'past_due' && (
							<Button color="inherit" href="/#/words" style={{ textTransform: 'none' }}>
								My VocabuCards
							</Button>
						)}
						{auth &&
						subscription_status !== 'past_due' && (
							<Button color="inherit" onClick={handleModalOpen} style={{ textTransform: 'none' }}>
								Add Word
							</Button>
						)}
						{!auth && (
							<Button color="inherit" onClick={goToNewUser} style={{ textTransform: 'none' }}>
								Create an Account
							</Button>
						)}
						{!auth && (
							<Button color="inherit" onClick={goToLogin} style={{ textTransform: 'none' }}>
								Login
							</Button>
						)}
					</div>
					<div className={classes.sectionMobile}>
						{auth && (
							<Typography
								className={classes.title}
								variant="h6"
								style={{ fontSize: '1rem', marginLeft: '15px', fontStyle: 'italic' }}
								noWrap
							>
								{languageName}
							</Typography>
						)}
					</div>
				</Toolbar>
				{modalOpen && (
					<VocabModal open={modalOpen} handleClose={handleModalClose} setting="add_variation_or_root" />
				)}
			</AppBar>
		</div>
	);
}
