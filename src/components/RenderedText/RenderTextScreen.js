import React from 'react';

// import { renderHtml } from '../../helpers/renderingText';
// import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import NavBar from '../Navigation/NavBar';
import RenderText from './RenderText';

import { SCREEN_WELCOME_MOBILE, SCREEN_WELCOME_DESKTOP } from '../../settings';

const useStyles = makeStyles(theme => ({
	screen          : {
		height                         : 'min-content',
		minHeight                      : '100vh',
		paddingBottom                  : '25px',
		backgroundRepeat               : 'repeat-y',
		backgroundSize                 : '100%',
		[theme.breakpoints.down('xs')]: {
			backgroundImage : `url(${SCREEN_WELCOME_MOBILE})`
			// backgroundColor : 'linen'
		},
		[theme.breakpoints.up('sm')]: {
			backgroundImage : `url(${SCREEN_WELCOME_DESKTOP})`
		}
	},
	container       : {
		margin                         : '0 auto',
		border                         : '1px solid rgb(200, 200, 200)',
		borderRadius                   : '3px',
		fontFamily                     : 'roboto, sans-serif',
		backgroundColor                : 'snow',
		[theme.breakpoints.down('xs')]: {
			margin    : '10px',
			marginTop : '-45px'
		},
		[theme.breakpoints.up('sm')]: {
			margin    : '40px',
			marginTop : '-35px',
			boxShadow : '5px 5px 10px black'
		},
		[theme.breakpoints.up('md')]: {
			margin       : '80px',
			marginTop    : '-10px',
			marginBottom : '40px',
			boxShadow    : '5px 5px 10px black'
		},
		[theme.breakpoints.up('lg')]: {
			margin       : '160px',
			marginTop    : '0px',
			marginBottom : '80px',
			boxShadow    : '5px 5px 10px black'
		},
		[theme.breakpoints.up('xl')]: {
			margin       : '500px',
			marginTop    : '0px',
			marginBottom : '80px',
			boxShadow    : '5px 5px 10px black'
		}
	}
}));

export default function RenderTextScreen() {
	const classes = useStyles();

	return (
		<div className={classes.screen}>
			<NavBar />
			<div className={classes.container}>
				<RenderText />
			</div>
		</div>
	);
}
