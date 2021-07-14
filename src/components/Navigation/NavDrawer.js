import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';
import { Divider, ListItemIcon, ListItemText } from '@material-ui/core';

import SelectLanguage from './SelectLanguage';

const useStyles = makeStyles(theme => ({
	list           : {
		width : 250
	},
	fullList       : {
		width : 'auto'
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

export default function NavDrawer({ handleModalOpen, goToLogin, goToLogout, goToNewUser }) {
	const classes = useStyles();
	const history = useHistory();
	const { user, language, language_object } = useSelector(store => store);
	const languageName = language_object[language];
	const [ state, setState ] = React.useState({
		top    : false,
		left   : false,
		bottom : false,
		right  : false
	});

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

	const toggleDrawer = (anchor, open) => event => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	const list = anchor => (
		<div
			className={clsx(classes.list, {
				[classes.fullList]: anchor === 'top' || anchor === 'bottom'
			})}
			role="presentation"
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<List>
				<ListItem
					button
					onClick={() => {
						history.push('/home');
					}}
				>
					<ListItemIcon>
						<i className="fas fa-home" />
					</ListItemIcon>
					<ListItemText primary="Home" />
				</ListItem>

				{/* {auth && <Divider />} */}

				{auth && (
					<ListItem>
						<SelectLanguage />
					</ListItem>
				)}

				<Divider />

				{!auth && (
					<ListItem button onClick={goToLogin}>
						<ListItemText>Login</ListItemText>
					</ListItem>
				)}
				{!auth && (
					<ListItem button onClick={goToNewUser}>
						<ListItemText>New User</ListItemText>
					</ListItem>
				)}

				{auth && (
					<ListItem
						button
						onClick={() => {
							history.push('/read');
						}}
					>
						<ListItemText>Study {languageName} Text</ListItemText>
					</ListItem>
				)}
				{auth && (
					<ListItem
						button
						onClick={() => {
							history.push('/words');
						}}
					>
						<ListItemText>{languageName} Vocab Cards</ListItemText>
					</ListItem>
				)}
				{auth && (
					<ListItem button onClick={handleModalOpen}>
						<ListItemText>Add Word</ListItemText>
					</ListItem>
				)}

				{auth && <Divider />}

				{auth && (
					<ListItem button onClick={goToLogout}>
						<ListItemText>Logout</ListItemText>
					</ListItem>
				)}
			</List>
		</div>
	);

	return (
		<div>
			{[ 'left' ].map(anchor => (
				<React.Fragment key={anchor}>
					<Button color="inherit" onClick={toggleDrawer(anchor, true)}>
						<MenuIcon />
					</Button>
					<Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
						{list(anchor)}
					</Drawer>
				</React.Fragment>
			))}
		</div>
	);
}
