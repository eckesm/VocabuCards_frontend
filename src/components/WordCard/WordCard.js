import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';

import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
	card        : {
		border                         : '1px solid rgb(200, 200, 200)',
		borderRadius                   : '3px',
		backgroundColor                : 'rgb(239, 247, 253)',
		overflow                       : 'auto',
		textAlign                      : 'left',
		transitionDuration             : '500ms',
		[theme.breakpoints.down('sm')]: {
			width        : '100%',
			height       : '200px',
			margin       : '5px',
			marginLeft   : '2px',
			marginRight  : '2px',
			marginTop    : '10px',
			marginBottom : '20px',
			'&:hover'   : {
			// 	transform : 'rotate(1deg)',
				boxShadow : '0px 0px 10px blue'
			}
		},
		[theme.breakpoints.up('md')]: {
			width       : '250px',
			height      : '200px',
			margin      : '8px',
			marginLeft  : '8px',
			marginRight : '8px',
			boxShadow   : '5px 5px 8px grey',
			'&:hover'   : {
				// transform : 'rotate(1deg)',
				boxShadow : '0px 0px 10px blue'
			}
		},
	},
	heading     : {
		textAlign            : 'left',
		borderTopLeftRadius  : '3px',
		borderTopRightRadius : '3px',
		padding              : '5px',
		borderBottom         : '1px solid rgb(200, 200, 200)',
		backgroundColor      : 'rgb(218, 237, 255)'
	},
	headingText : {
		margin     : '5px',
		fontSize   : '1.5rem',
		fontWeight : 'bold',
		width      : '100%',
		wordWrap   : 'break-word'
	},
	body        : {
		textAlign : 'left',
		padding   : '5px'
	},
	section     : {
		marginTop    : '5px',
		marginBottom : '5px'
	},
	content     : {
		margin : '0px'
	},
	ul          : {
		margin      : '0px',
		paddingLeft : '25px'
	}
}));

export default function WordCard({ word }) {
	const classes = useStyles();
	const history = useHistory();
	const variations = word.components;
	const translation = word.translation === '' ? null : word.translation;
	const notes = word.notes === '' ? null : word.notes;

	const handleLinkedClick = () => {
		history.push(`/words/${word.id}`);
	};

	return (
		<div className={classes.card} onClick={handleLinkedClick}>
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
