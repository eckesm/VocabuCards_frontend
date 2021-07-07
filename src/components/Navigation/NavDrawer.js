import React from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';

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
