import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';

import { logoutUser, clearAlerts } from '../../actions/auth';

import NavDrawer from './NavDrawer';
import VocabForm from '../VocabForms/VocabForm';

const useStyles = makeStyles(theme => ({
	root       : {
		flexGrow : 1
	},
	links      : {
		'& > * + *' : {
			marginLeft  : theme.spacing(2),
			marginRight : theme.spacing(2)
		}
	},
	menuButton : {
		marginRight : theme.spacing(2)
	},
	title      : {
		flexGrow  : 1,
		textAlign : 'left'
	}
}));

export default function NavBar() {
	const { user, language, language_object } = useSelector(store => store);
	const dispatch = useDispatch();
	const history = useHistory();
	const languageName = language_object[language];

	const classes = useStyles();
	const [ auth, setAuth ] = useState(false);
	const [ anchorEl, setAnchorEl ] = useState(null);
	const open = Boolean(anchorEl);

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

	const handleMenu = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

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

	return (
		<div className={classes.root}>
			<AppBar position="fixed">
				<Toolbar>
					{auth && <NavDrawer />}
					<Typography variant="h6" className={classes.title}>
						<Link href="#/" color="inherit">
							VocabuCards <i className="fad fa-kiwi-bird" />
						</Link>
					</Typography>

					{auth && (
						<Typography className={classes.links}>
							<Link href="#/read" color="inherit">
								Render & Study Foreign Text
							</Link>
							<Link href={'#/words'} color="inherit">
								{languageName}
							</Link>
						</Typography>
					)}

					{auth && (
						<div>
							{/* <IconButton
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleMenu}
								color="inherit"
							>
								<AccountCircle />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical   : 'top',
									horizontal : 'right'
								}}
								keepMounted
								transformOrigin={{
									vertical   : 'top',
									horizontal : 'right'
								}}
								open={open}
								onClose={handleClose}
							>
								<MenuItem onClick={handleClose}>Profile</MenuItem>
								<MenuItem onClick={handleClose}>My account</MenuItem>
							</Menu> */}
							<Button color="inherit" onClick={goToLogout}>
								Logout
							</Button>
							<Button color="inherit" onClick={handleModalOpen}>
								Add Word
							</Button>
							{modalOpen && (
								<VocabForm open={modalOpen} handleClose={handleModalClose} setting="variation" />
							)}
						</div>
					)}
					{!auth && (
						<div>
							<Button color="inherit" onClick={goToNewUser}>
								New User
							</Button>
							<Button color="inherit" onClick={goToLogin}>
								Login
							</Button>
						</div>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
}
