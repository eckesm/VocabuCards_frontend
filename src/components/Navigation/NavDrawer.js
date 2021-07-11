import React from 'react';
import { useHistory } from 'react-router';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';
import { Divider, ListItemIcon, ListItemText } from '@material-ui/core';

import SelectLanguage from './SelectLanguage';

const useStyles = makeStyles({
	list     : {
		width : 250
	},
	fullList : {
		width : 'auto'
	}
});

export default function NavDrawer() {
	const classes = useStyles();
	const history = useHistory();
	const [ state, setState ] = React.useState({
		top    : false,
		left   : false,
		bottom : false,
		right  : false
	});

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
				<Divider />
				<ListItem>
					<SelectLanguage />
				</ListItem>
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
