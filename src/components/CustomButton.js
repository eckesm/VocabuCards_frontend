// help from: https://medium.com/@d_danailov/react-and-material-ui-creating-a-custom-button-ba8d5678506

import React from 'react';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	root    : {
		background         : 'rgb(16,110,148)',
		background         : 'linear-gradient(90deg, rgba(16,110,148,1) 25%, rgba(82,82,214,1) 90%)',
		borderRadius       : 3,
		border             : 0,
		color              : 'white',
		fontFamily         : 'roboto, sans-serif',
		fontWeight         : 'bold',
		fontSize           : '1.15rem',
		height             : 'min-content',
		width              : 'max-content',
		margin             : '5px',
		padding            : '8px 20px',
		boxShadow          : '0 3px 5px 2px rgba(16,110,148,.3)',
		textTransform      : 'none',
		opacity            : '.85',
		transitionDuration : '500ms',
		transitionProperty : 'opacity',
		'&:hover'          : {
			opacity : '1'
		}
	},
	default : {
		background         : 'darkgrey',
		borderRadius       : 3,
		border             : 0,
		color              : 'white',
		fontFamily         : 'roboto, sans-serif',
		fontWeight         : 'bold',
		fontSize           : '1.15rem',
		height             : 50,
		width              : 'max-content',
		margin             : '5px',
		padding            : '0 20px',
		boxShadow          : '0 3px 5px 2px lightgrey',
		textTransform      : 'none',
		opacity            : '.9',
		transitionDuration : '500ms',
		transitionProperty : 'background',
		'&:hover'          : {
			background : 'grey'
		}
	}
}));
export default function CustomButton(props) {
	const classes = useStyles();

	if (props.customType === 'default') {
		return <Button className={classes.default} {...props} />;
	}
	else {
		return <Button className={classes.root} {...props} />;
	}
}
