// help from: https://medium.com/@d_danailov/react-and-material-ui-creating-a-custom-button-ba8d5678506

import React from 'react';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import './CustomButton.css'

const useStyles = makeStyles(theme => ({
	root            : {
		background         : 'rgb(16,110,148)',
		background         : 'linear-gradient(90deg, rgba(16,110,148,1) 25%, rgba(82,82,214,1) 90%)',
		// background         : 'linear-gradient(90deg, rgba(16,110,148,1) 25%, rgba(82,82,214,1) 100%)',
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
	small_text            : {
		background         : 'rgb(16,110,148)',
		background         : 'linear-gradient(90deg, rgba(16,110,148,1) 25%, rgba(82,82,214,1) 90%)',
		// background         : 'linear-gradient(90deg, rgba(16,110,148,1) 25%, rgba(82,82,214,1) 100%)',
		borderRadius       : 3,
		border             : 0,
		color              : 'white',
		fontFamily         : 'roboto, sans-serif',
		fontWeight         : 'bold',
		fontSize           : '0.85rem',
		height             : 'min-content',
		// width              : 'max-content',
		width              : '90%',
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
	fixed_width_125 : {
		background         : 'rgb(16,110,148)',
		background         : 'linear-gradient(90deg, rgba(16,110,148,1) 25%, rgba(82,82,214,1) 90%)',
		// background         : 'linear-gradient(90deg, rgba(16,110,148,1) 25%, rgba(82,82,214,1) 100%)',
		borderRadius       : 3,
		border             : 0,
		color              : 'white',
		fontFamily         : 'roboto, sans-serif',
		fontWeight         : 'bold',
		fontSize           : '.85rem',
		// height             : 'min-content',
		width              : '125px',
		marginTop          : '3px',
		marginBottom       : '3px',
		padding            : '5px 8px',
		boxShadow          : '0 3px 5px 2px rgba(16,110,148,.3)',
		textTransform      : 'none',
		opacity            : '.85',
		transitionDuration : '500ms',
		transitionProperty : 'opacity',
		'&:hover'          : {
			opacity : '1'
		}
	},
	small           : {
		background         : 'rgb(16,110,148)',
		background         : 'linear-gradient(90deg, rgba(16,110,148,1) 25%, rgba(82,82,214,1) 90%)',
		// background         : 'linear-gradient(90deg, rgba(16,110,148,1) 25%, rgba(82,82,214,1) 100%)',
		borderRadius       : 3,
		border             : 0,
		color              : 'white',
		fontFamily         : 'roboto, sans-serif',
		fontWeight         : 'bold',
		fontSize           : '.85rem',
		height             : 'min-content',
		width              : 'max-content',
		margin             : '5px',
		marginTop          : 'auto',
		marginBottom       : 'auto',
		padding            : '5px 10px',
		boxShadow          : '0 3px 5px 2px rgba(16,110,148,.3)',
		textTransform      : 'none',
		opacity            : '.85',
		transitionDuration : '500ms',
		transitionProperty : 'opacity',
		'&:hover'          : {
			opacity : '1'
		}
	},
	width_resize    : {
		background                     : 'rgb(16,110,148)',
		background                     : 'linear-gradient(90deg, rgba(16,110,148,1) 25%, rgba(82,82,214,1) 90%)',
		// background                     : 'linear-gradient(90deg, rgba(16,110,148,1) 25%, rgba(82,82,214,1) 100%)',
		borderRadius                   : 3,
		border                         : 0,
		color                          : 'white',
		fontFamily                     : 'roboto, sans-serif',
		fontWeight                     : 'bold',
		fontSize                       : '1.15rem',
		height                         : 'min-content',
		margin                         : '5px',
		padding                        : '8px 20px',
		boxShadow                      : '0 3px 5px 2px rgba(16,110,148,.3)',
		textTransform                  : 'none',
		opacity                        : '.85',
		transitionDuration             : '500ms',
		transitionProperty             : 'opacity',
		'&:hover'                      : {
			opacity : '1'
		},
		[theme.breakpoints.down('sm')]: {
			width : '100%'
		},
		[theme.breakpoints.up('md')]: {
			width : '300px'
		}
	},
	default         : {
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
	// container       : {
	// 	background   : 'white',
	// 	borderRadius : 3,
	// 	width        : 'min-content',
	// 	height       : 'max-content',
	// 	margin       : '5px',
	// 	padding      : '0px'
	// }
}));
export default function CustomButton(props) {
	const classes = useStyles();
	return (
		// <div className={classes.container}>
		<Button className={classes[props.customtype || 'root']} {...props} />
		// <Button className={props.customtype || 'root'} {...props} />
		// </div>
	);
}
