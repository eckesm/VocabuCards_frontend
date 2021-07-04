import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	span      : {
		height  : 'fit-content',
		display : 'inline-block'
	},
	space     : {
		height     : 'fit-content',
		display    : 'inline-block',
		marginLeft : '5px'
	},
	clickable : {
		height    : 'fit-content',
		display   : 'inline-block',
		margin    : '0px',
		'&:hover' : {
			backgroundColor : 'aqua'
		}
	},
	clicked   : {
		height          : 'fit-content',
		display         : 'inline-block',
		margin          : '0px',
		backgroundColor : 'yellow'
	}
}));

export default function Word({ wordObject, updateModalText, sentenceText }) {
	const classes = useStyles();
	const [ wordClassName, setWordClassName ] = useState(wordObject.type);

	function handleClick() {
		updateModalText({ text: wordObject.text, sentence: sentenceText });
		setWordClassName('clicked');
	}

	if (wordObject.type === 'space') {
		return <span className={classes.space} />;
	}

	if (wordObject.type === 'ignore') {
		return <span className={classes.span}>{wordObject.text}</span>;
	}

	return (
		<span onClick={handleClick} className={classes[wordClassName]}>
			{wordObject.text}
		</span>
	);
}
