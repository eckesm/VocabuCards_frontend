import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
	root        : {
		border       : '1px solid rgb(200, 200, 200)',
		borderRadius : '3px',
		width        : '275px',
		textAlign    : 'left',
		margin       : '5px',
		marginTop    : '10px',
		marginBottom : '10px',
		boxShadow    : '5px 5px 8px grey'
	},
	heading     : {
		borderTopLeftRadius  : '3px',
		borderTopRightRadius : '3px',
		padding              : '5px',
		borderBottom         : '1px solid rgb(200, 200, 200)',
		backgroundColor      : 'rgb(218, 237, 255)'
	},
	headingText : {
		margin     : '5px',
		fontSize   : '1.5rem',
		fontWeight : 'bold'
	},
	body        : {
		padding         : '5px',
		backgroundColor : 'rgb(239, 247, 253)',
		height          : '150px',
		overflow        : 'auto'
	},
	section     : {
		marginTop    : '5px',
		marginBottom : '5px'
	},
	content     : {
		margin : '0px'
	},
	ul          : {
		margin : '0px'
	}
}));

export default function WordCard({ word }) {
	const classes = useStyles();
	const variations = word.components;
	const translation = word.translation === '' ? null : word.translation;
	const notes = word.notes === '' ? null : word.notes;

	return (
		<div className={classes.root}>
			<div className={classes.heading}>
				<Link href={'/#/words/' + word.id} className={classes.headingText}>
					{word.root}
				</Link>
			</div>
			<div className={classes.body}>
				{translation && (
					<div className={classes.section}>
						<p className={classes.content}>
							<b>Translation:</b> {translation}
						</p>
					</div>
				)}
				{variations.length > 0 && (
					<div className={classes.section}>
						<b>Variations</b>
						<ul className={classes.ul}>
							{variations.map(variation => {
								return <li key={variation.id}>{variation.variation}</li>;
							})}
						</ul>
					</div>
				)}
				{notes && (
					<div className={classes.section}>
						<p className={classes.content}>
							<b>Notes: </b> {notes}
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
