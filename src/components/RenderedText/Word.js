import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
	span         : {
		height  : 'fit-content',
		display : 'inline-block'
	},
	space        : {
		height     : 'fit-content',
		display    : 'inline-block',
		marginLeft : '5px'
	},
	period       : {
		height  : 'fit-content',
		display : 'inline-block'
	},
	clickable    : {
		height    : 'fit-content',
		display   : 'inline-block',
		margin    : '0px',
		'&:hover' : {
			borderRadius    : '5px',
			backgroundColor : 'aqua'
		}
	},
	clicked      : {
		height          : 'fit-content',
		display         : 'inline-block',
		margin          : '0px',
		paddingLeft     : '2px',
		paddingRight    : '2px',
		borderRadius    : '5px',
		backgroundColor : 'palegoldenrod',
		'&:hover'       : {
			backgroundColor : 'aqua'
		}
	},
	saved        : {
		height          : 'fit-content',
		display         : 'inline-block',
		margin          : '0px',
		paddingLeft     : '2px',
		paddingRight    : '2px',
		borderRadius    : '5px',
		backgroundColor : 'palegreen',
		'&:hover'       : {
			backgroundColor : 'aqua'
		}
	},
	savedClicked : {
		height          : 'fit-content',
		display         : 'inline-block',
		margin          : '0px',
		paddingLeft     : '2px',
		paddingRight    : '2px',
		borderRadius    : '5px',
		backgroundColor : 'pink',
		'&:hover'       : {
			backgroundColor : 'aqua'
		}
	}
}));

export default function Word({ wordObject, updateModalText, sentenceText, clickedArray, addToClickedArray }) {
	const classes = useStyles();

	// TOOLTIPS
	const [ open, setOpen ] = React.useState(false);
	const handleTooltipClose = () => {
		setOpen(false);
	};
	const handleTooltipOpen = () => {
		setOpen(true);
	};
	// ----------------------------------

	function handleClick() {
		updateModalText({ text: wordObject.text, sentence: sentenceText });
		addToClickedArray(wordObject.text);
	}

	function handleSavedClick() {
		updateModalText({
			text           : wordObject.text,
			sentence       : sentenceText,
			savedComponent : wordObject.variation.component_id,
			savedRoot      : wordObject.variation.root_id
		});
		addToClickedArray(wordObject.text);
	}

	if (wordObject.type === 'space') {
		return <span className={classes.space} />;
	}

	if (wordObject.type === 'ignore') {
		return <span className={classes.span}>{wordObject.text}</span>;
	}

	if (wordObject.type === 'period') {
		return <span className={classes.period}>{wordObject.text}</span>;
	}

	if (wordObject.type === 'saved') {

		return (
			<Tooltip disableFocusListener disableTouchListener title={wordObject.variation.translation}>
				<span onClick={handleSavedClick} className={classes.saved}>
					{wordObject.text}
				</span>
			</Tooltip>
		);
	}
	// }

	if (clickedArray.indexOf(wordObject.text) !== -1) {
		return (
			<span onClick={handleClick} className={classes.clicked}>
				{wordObject.text}
			</span>
		);
	}
	else {
		return (
			<span onClick={handleClick} className={classes[wordObject.type]}>
				{wordObject.text}
			</span>
		);
	}
}
