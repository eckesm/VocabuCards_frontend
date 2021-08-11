import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	introductionCard  : {
		position                       : 'relative',
		textAlign                      : 'center',
		margin                         : '10px',
		[theme.breakpoints.down('xs')]: {
			width : '80%'
		},
		[theme.breakpoints.up('sm')]: {
			width : '250px'
		}
	},
	introductionImage : {
		backgroundColor : 'black',
		border          : '3px solid black',
		borderRadius    : '3%',
		boxShadow       : '5px 5px 10px black',
		width           : '100%'
	},
	textContainer     : {
		backgroundColor                : 'black',
		color                          : 'white',
		border                         : '3px solid black',
		width                          : '100%',
		height                         : '50px',
		textAlign                      : 'center',
		display                        : 'flex',
		alignItems                     : 'center',
		[theme.breakpoints.down('xs')]: {
			transform : 'translate(0px,-75px)'
		},
		[theme.breakpoints.up('sm')]: {
			transform : 'translate(0px,-70px)'
		}
	},
	text              : {
		fontFamily    : 'roboto, sans-serif',
		textAlign     : 'center',
		fontSize      : '1.25rem',
		wordWrap      : 'normal',
		width         : '100%',
		display       : 'inline-block',
		verticalAlign : 'middle'
	}
}));

export default function ScreenShotCard({ src, text }) {
	const classes = useStyles();

	return (
		<div className={classes.introductionCard}>
			<img className={classes.introductionImage} src={src} />
			<div className={classes.textContainer}>
				<h3 className={classes.text}>{text}</h3>
			</div>
		</div>
	);
}
