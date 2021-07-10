import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import { emptyPartsOfSpeechObject } from '../../helpers/partsOfSpeech';

import WordDetailAccordianPanel from './WordDetailAccordianPanel';

const useStyles = makeStyles(theme => ({
	wordDetailAccordian : {
		borderRadius                   : '3px',
		border                         : '1px solid rgb(215, 215, 215)',
		[theme.breakpoints.down('sm')]: {
			margin : '5px'
		},
		[theme.breakpoints.up('md')]: {
			boxShadow : '5px 5px 8px grey',
			margin    : '15px'
		},
		// marginTop                      : '10px',
		// marginBottom                   : '10px'
	}
}));

export default function WordDetailAccordian({ wordId }) {
	const classes = useStyles();
	// const [ expanded, setExpanded ] = useState(false);
	const [ partsOfSpeechArray, setPartsOfSpeechArray ] = useState(null);
	const [ partsOfSpeechObj, setPartsOfSpeechObj ] = useState(emptyPartsOfSpeechObject);
	const { words_array } = useSelector(store => store);

	useEffect(
		() => {
			const word = words_array.filter(w => w.id === wordId)[0];
			const posObj = partsOfSpeechObj;
			function preparePosGroups() {
				word.components.forEach(component => {
					let pos = component.part_of_speech;
					posObj[pos].push(component);
				});
				return posObj;
			}
			preparePosGroups();
			setPartsOfSpeechObj(posObj);
			setPartsOfSpeechArray(Object.keys(posObj));
		},
		[ words_array ]
	);

	// const handleChange = panel => (event, isExpanded) => {
	// 	setExpanded(isExpanded ? panel : false);
	// };

	if (partsOfSpeechArray && partsOfSpeechObj) {
		return (
			<div className={classes.wordDetailAccordian}>
				{partsOfSpeechArray.map((pos, index) => {
					return (
						<WordDetailAccordianPanel
							key={`panel${index}`}
							panel={index}
							// expanded={expanded === `panel${index}`}
							// onChange={handleChange(`panel${index}`)}
							pos={pos}
							wordId={wordId}
						/>
					);
				})}
			</div>
		);
	}
	else {
		return <h1>Loading...</h1>;
	}
}
