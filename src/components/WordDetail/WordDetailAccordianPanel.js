import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import AllVariationCards from '../VariationCard/AllVariationCards';

const useStyles = makeStyles(theme => ({
	heading          : {
		fontSize   : theme.typography.pxToRem(15),
		flexBasis  : '33.33%',
		flexShrink : 0,
		fontWeight : 'bold'
	},
	secondaryHeading : {
		fontSize : theme.typography.pxToRem(15),
		color    : theme.palette.text.secondary
	},
	summary          : {
		borderBottom : '1px solid lightgrey'
	}
}));

export default function WordDetailAccordianPanel({ panel, expanded, onChange, pos, wordId }) {
	const classes = useStyles();
	const { words_array } = useSelector(store => store);
	const [ variationHeading, setVariationHeading ] = useState('');
	const [ hidePanel, setHidePanel ] = useState(true);

	useEffect(
		() => {
			const word = words_array.filter(w => w.id === wordId)[0];
			const variations = word.components.filter(c => c.part_of_speech === pos);
			if (variations.length > 0) {
				setHidePanel(false);
			}
			else {
				setHidePanel(true);
			}

			let varHeading = '';
			for (let i = 0; i < variations.length; i++) {
				if (i > 0 && i < variations.length) {
					varHeading = varHeading + ' | ';
					// varHeading = varHeading + ' • ';
				}
				varHeading = varHeading + variations[i].variation;
			}
			setVariationHeading(varHeading);
		},
		[ words_array ]
	);

	return (
		// <Accordion expanded={expanded} onChange={onChange} hidden={hidePanel}>
		<Accordion defaultExpanded={true} hidden={hidePanel}>
			<AccordionSummary
				className={classes.summary}
				expandIcon={<ExpandMoreIcon />}
				aria-controls={`panel${panel}bh-content`}
				id={`panel${panel}bh-header`}
			>
				<Typography className={classes.heading}>{pos}s</Typography>
				<Typography className={classes.secondaryHeading}>{variationHeading}</Typography>
			</AccordionSummary>

			<AccordionDetails>
				<AllVariationCards pos={pos} wordId={wordId} />
			</AccordionDetails>
		</Accordion>
	);
}
