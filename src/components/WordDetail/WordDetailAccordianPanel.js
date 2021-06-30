import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import AllVariationCards from '../VariationCard/AllVariationCards';

const useStyles = makeStyles(theme => ({
	// root             : {
	// 	width : '100%'
	// },
	heading          : {
		fontSize   : theme.typography.pxToRem(15),
		flexBasis  : '33.33%',
		flexShrink : 0
	},
	secondaryHeading : {
		fontSize : theme.typography.pxToRem(15),
		color    : theme.palette.text.secondary
	}
}));

export default function WordDetailAccordianPanel({ panel, expanded, onChange, pos, components }) {
	const classes = useStyles();

	console.log(components)

	let variationHeading = '';
	for (let i = 0; i < components.length; i++) {
		if (i > 0 && i < components.length) {
			variationHeading = variationHeading + ' | ';
		}
		variationHeading = variationHeading + components[i].variation;
	}

	return (
		<Accordion expanded={expanded} onChange={onChange}>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls={`panel${panel}bh-content`}
				id={`panel${panel}bh-header`}
			>
				<Typography className={classes.heading}>{pos}</Typography>
				<Typography className={classes.secondaryHeading}>{variationHeading}</Typography>
			</AccordionSummary>

			<AccordionDetails>
				{/* <Typography>
					Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est, id
					dignissim quam.
				</Typography> */}
				<AllVariationCards variations={components} />
			</AccordionDetails>
		</Accordion>
	);
}
