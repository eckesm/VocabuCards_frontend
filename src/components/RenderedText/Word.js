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
			// border          : '1px solid aqua',
			borderRadius    : '5px',
			backgroundColor : 'aqua'
		}
	},
	// clicked   : {
	// 	height          : 'fit-content',
	// 	display         : 'inline-block',
	// 	margin          : '0px',
	// 	paddingLeft     : '2px',
	// 	paddingRight    : '2px',
	// 	borderRadius    : '5px',
	// 	backgroundColor : 'pink',
	// 	'&:hover'       : {
	// 		backgroundColor : 'aqua'
	// 	}
	// },
	saved     : {
		height          : 'fit-content',
		display         : 'inline-block',
		margin          : '0px',
		paddingLeft     : '2px',
		paddingRight    : '2px',
		// border          : '1px solid yellow',
		borderRadius    : '5px',
		backgroundColor : 'palegoldenrod',
		'&:hover'       : {
			backgroundColor : 'aqua'
		}
	}
}));

export default function Word({ wordObject, updateModalText, sentenceText }) {
	const classes = useStyles();
	// const [ wordClassName, setWordClassName ] = useState(wordObject.type);
	// const [ clicked, setClicked ] = useState(false);

	function handleClick() {
		updateModalText({ text: wordObject.text, sentence: sentenceText });
		// setWordClassName('clicked');
		// setClicked(true);
		// console.log(clicked);
	}

	function handleSavedClick() {
		updateModalText({
			text           : wordObject.text,
			sentence       : sentenceText,
			savedComponent : wordObject.variation.component_id,
			savedRoot      : wordObject.variation.root_id
		});
	}

	if (wordObject.type === 'space') {
		return <span className={classes.space} />;
	}

	if (wordObject.type === 'ignore') {
		return <span className={classes.span}>{wordObject.text}</span>;
	}

	if (wordObject.type === 'period') {
		<span onClick={handleClick} className={classes.period}>
			{wordObject.text}
		</span>;
	}

	if (wordObject.type === 'saved') {
		return (
			<span onClick={handleSavedClick} className={classes.saved}>
				{wordObject.text}
			</span>
		);
	}

	// if (clicked) {
	// 	return (
	// 		<span onClick={handleClick} className={classes[wordClassName]}>
	// 			{wordObject.text}
	// 		</span>
	// 	);
	// }
	// if (!clicked) {
	return (
		<span onClick={handleClick} className={classes[wordObject.type]}>
			{wordObject.text}
		</span>
	);
	// }
}
