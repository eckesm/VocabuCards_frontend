import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';

import { clearAlerts } from '../../actions/auth';

import NavDrawer from './NavDrawer';
import VocabModal from '../VocabForms/VocabModal';

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
	const { user, language, language_object } = useSelector(store => store);
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

	const [ modalOpen, setModalOpen ] = useState(false);
	const handleModalOpen = () => {
		setModalOpen(true);
	};
	const handleModalClose = () => {
		setModalOpen(false);
	};

	const classes = useStyles();
	const [ anchorEl, setAnchorEl ] = React.useState(null);
	const [ mobileMoreAnchorEl, setMobileMoreAnchorEl ] = React.useState(null);

	// const isMenuOpen = Boolean(anchorEl);
	// const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = event => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

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
					<NavDrawer handleModalOpen={handleModalOpen} goToLogin={goToLogin} goToLogout={goToLogout} goToNewUser={goToNewUser}/>
					<Typography className={classes.title} variant="h6" noWrap>
						{/* VocabuCards <i className="fad fa-kiwi-bird" /> */}
						VocabuCards
					</Typography>
					<div className={classes.grow} />
					<div className={classes.sectionDesktop}>
						{auth && (
							<Button color="inherit" href="/#/read">
								Study {languageName} Text
							</Button>
						)}
						{auth && (
							<Button color="inherit" href="/#/words">
								{languageName} Vocab Cards
							</Button>
						)}
						{auth && (
							<Button color="inherit" onClick={handleModalOpen}>
								Add {languageName} Word
							</Button>
						)}
						{auth && (
							<Button color="inherit" onClick={goToLogout}>
								Logout
							</Button>
						)}
						{!auth && (
							<Button color="inherit" onClick={goToNewUser}>
								New User
							</Button>
						)}
						{!auth && (
							<Button color="inherit" onClick={goToLogin}>
								Login
							</Button>
						)}
					</div>
					{/* <div className={classes.sectionMobile}>
						<IconButton
							aria-label="show more"
							aria-controls={mobileMenuId}
							aria-haspopup="true"
							onClick={handleMobileMenuOpen}
							color="inherit"
						>
							<MoreIcon />
						</IconButton>
					</div> */}
				</Toolbar>
				{modalOpen && (
					<VocabModal open={modalOpen} handleClose={handleModalClose} setting="add_variation_or_root" />
				)}
			</AppBar>
			{/* {renderMobileMenu} */}
		</div>
	);
}
