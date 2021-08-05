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
// import CustomButton from '../CustomButton';

const useStyles = makeStyles(theme => ({
	grow           : {
		flexGrow : 1
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
	const { user, language, language_object, current_plan } = useSelector(store => store);
	const dispatch = useDispatch();
	const history = useHistory();
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

	const goToNewUser = () => {
		dispatch(clearAlerts());
		history.push('/signup');
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

	const [ modalOpen, setModalOpen ] = useState(false);
	const handleModalOpen = () => {
		setModalOpen(true);
	};
	const handleModalClose = () => {
		setModalOpen(false);
	};

	const classes = useStyles();
	// const [ anchorEl, setAnchorEl ] = React.useState(null);
	const [ mobileMoreAnchorEl, setMobileMoreAnchorEl ] = React.useState(null);

	// const isMenuOpen = Boolean(anchorEl);
	// const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	// const handleMobileMenuClose = () => {
	// 	setMobileMoreAnchorEl(null);
	// };

	// const handleMenuClose = () => {
	// 	setAnchorEl(null);
	// 	handleMobileMenuClose();
	// };

	// const handleMobileMenuOpen = event => {
	// 	setMobileMoreAnchorEl(event.currentTarget);
	// };

	// const mobileMenuId = 'primary-search-account-menu-mobile';
	// const renderMobileMenu = (
	// 	<Menu
	// 		anchorEl={mobileMoreAnchorEl}
	// 		anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
	// 		id={mobileMenuId}
	// 		keepMounted
	// 		transformOrigin={{ vertical: 'top', horizontal: 'right' }}
	// 		open={isMobileMenuOpen}
	// 		onClose={handleMobileMenuClose}
	// 	>
	// 		{auth && (
	// 			<MenuItem>
	// 				<Button color="inherit" href="/#/read">
	// 					Study {languageName} Text
	// 				</Button>
	// 			</MenuItem>
	// 		)}
	// 		{auth && (
	// 			<MenuItem>
	// 				<Button color="inherit" href="/#/words">
	// 					{languageName} Vocab Cards
	// 				</Button>
	// 			</MenuItem>
	// 		)}
	// 		{auth && (
	// 			<MenuItem>
	// 				<Button color="inherit" onClick={handleModalOpen}>
	// 					Add Word
	// 				</Button>
	// 			</MenuItem>
	// 		)}
	// 		{auth && (
	// 			<MenuItem>
	// 				<Button color="inherit" onClick={goToLogout}>
	// 					Logout
	// 				</Button>
	// 			</MenuItem>
	// 		)}
	// 		{!auth && (
	// 			<MenuItem>
	// 				<Button color="inherit" onClick={goToNewUser}>
	// 					New User
	// 				</Button>
	// 			</MenuItem>
	// 		)}
	// 		{!auth && (
	// 			<MenuItem>
	// 				<Button color="inherit" onClick={goToLogin}>
	// 					Login
	// 				</Button>
	// 			</MenuItem>
	// 		)}
	// 	</Menu>
	// );

	return (
		<div className={classes.grow}>
			<AppBar position="fixed">
				<Toolbar>
					{/* {auth && <NavDrawer />} */}
					<NavDrawer
						handleModalOpen={handleModalOpen}
						goToLogin={goToLogin}
						goToLogout={goToLogout}
						goToNewUser={goToNewUser}
						goToPlans={goToPlans}
					/>
					<Typography className={classes.title} variant="h5" noWrap>
						{/* VocabuCards <i className="fad fa-kiwi-bird" /> */}
						VocabuCards
					</Typography>
					{/* {auth &&
					current_plan === 'trial' && (
						<Button color="inherit" onClick={goToPlans} style={{ textTransform: 'none' }}>
							Trial
						</Button>
					)} */}
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
						{auth && (
							<Button color="inherit" href="/#/read" style={{ textTransform: 'none' }}>
								Study Text
							</Button>
						)}
						{auth && (
							<Button color="inherit" href="/#/words" style={{ textTransform: 'none' }}>
								Vocab Cards
							</Button>
						)}
						{auth && (
							<Button color="inherit" onClick={handleModalOpen} style={{ textTransform: 'none' }}>
								Add Word
							</Button>
						)}
						{/* {auth && (
							<Button color="inherit" onClick={goToLogout} style={{ textTransform: 'none' }}>
								Logout
							</Button>
						)} */}
						{!auth && (
							<Button color="inherit" onClick={goToNewUser} style={{ textTransform: 'none' }}>
								New User
							</Button>
						)}
						{!auth && (
							<Button color="inherit" onClick={goToLogin} style={{ textTransform: 'none' }}>
								Login
							</Button>

							// 	<CustomButton
							// 	onClick={goToLogin}
							// 	>
							// 	Login
							// </CustomButton>
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
						{/* <IconButton
							aria-label="show more"
							aria-controls={mobileMenuId}
							aria-haspopup="true"
							onClick={handleMobileMenuOpen}
							color="inherit"
						>
							<MoreIcon />
						</IconButton> */}
					</div>
				</Toolbar>
				{modalOpen && (
					<VocabModal open={modalOpen} handleClose={handleModalClose} setting="add_variation_or_root" />
				)}
			</AppBar>
			{/* {renderMobileMenu} */}
		</div>
	);
}
