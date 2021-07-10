import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

import { deleteVariation } from '../../helpers/API';
import { deleteComponentInState } from '../../actions/vocab';

import VocabModal from '../VocabForms/VocabModal';
import DeleteDialog from '../VocabForms/DeleteDialog';

const useStyles = makeStyles(theme => ({
	buttonGroup              : {
		display       : 'flex',
		verticalAlign : 'middle'
	},
	button                   : {
		height    : '25px',
		width     : '25px',
		marginTop : '5px'
	},
	card                     : {
		border          : '1px solid rgb(200, 200, 200)',
		borderRadius    : '3px',
		backgroundColor : 'rgb(239, 247, 253)',
		width           : '250px',
		textAlign       : 'left',
		margin          : '8px',
		boxShadow       : '5px 5px 8px grey',
		height          : '250px',
		overflow        : 'auto'
	},
	cardHeading              : {
		borderTopLeftRadius  : '3px',
		borderTopRightRadius : '3px',
		padding              : '5px',
		borderBottom         : '1px solid rgb(200, 200, 200)',
		backgroundColor      : 'rgb(218, 237, 255)',
		justifyContent       : 'space-between'
	},
	cardHeadingText          : {
		margin       : '5px',
		marginBottom : '0px',
		fontSize     : '1.25rem',
		fontWeight   : 'bold',
		color        : 'blue',
		width        : '75%',
		wordWrap     : 'break-word'
	},
	cardHeadingTextContainer : {
		width   : '100%',
		display : 'flex'
	},
	description              : {
		margin      : '0px',
		paddingLeft : '5px',
		fontSize    : '0.9rem'
	},
	cardBody                 : {
		padding : '5px'
	},
	cardSection              : {
		marginTop    : '5px',
		marginBottom : '5px'
	},
	cardContent              : {
		margin        : '0px',
		paddingTop    : '2px',
		paddingBottom : '2px'
	}
}));

export default function VariationCard({ initialVariation }) {
	const classes = useStyles();
	const [ variation, setVariation ] = useState(initialVariation);
	const dispatch = useDispatch();

	const translation = variation.translation === '' ? null : variation.translation;
	const description = variation.description === '' ? null : variation.description;
	const definition = variation.definition === '' ? null : variation.definition;
	const synonyms = variation.synonyms === '' ? null : variation.synonyms;
	const examples = variation.examples === '' ? null : variation.examples;
	const notes = variation.notes === '' ? null : variation.notes;

	const [ modalOpen, setModalOpen ] = useState(false);
	const handleModalOpen = () => {
		setModalOpen(true);
	};
	const handleModalClose = () => {
		setModalOpen(false);
	};

	const handleDelete = () => {
		deleteVariation(variation.id);
		dispatch(deleteComponentInState(variation.id, variation.root_id));
	};

	return (
		<div className={classes.card}>
			<div className={classes.cardHeading}>
				<div className={classes.cardHeadingTextContainer}>
					<p className={classes.cardHeadingText}>{variation.variation}</p>
					<div className={classes.buttonGroup}>
						<IconButton className={classes.button} color="primary" size="small" onClick={handleModalOpen}>
							<i className="fad fa-pencil" />
						</IconButton>
						<DeleteDialog variation={variation.variation} handleDelete={handleDelete} />
					</div>
					{modalOpen && (
						<VocabModal
							open={modalOpen}
							handleClose={handleModalClose}
							variation={variation}
							setVariation={setVariation}
							setting="variation"
						/>
					)}
				</div>
				{description && (
					<div>
						<p className={classes.description}>
							{/* <b>Description:</b>{' '} */}
							<i>{description}</i>
						</p>
					</div>
				)}
			</div>
			<div className={classes.cardBody}>
				{translation && (
					<div className={classes.cardSection}>
						<p className={classes.cardContent}>
							<b>Translation:</b> {translation}
						</p>
					</div>
				)}
				{examples && (
					<div className={classes.cardSection}>
						<p className={classes.cardContent}>
							<b>Example: </b> {examples}
						</p>
					</div>
				)}
				{definition && (
					<div className={classes.cardSection}>
						<p className={classes.cardContent}>
							<b>Definition:</b> {definition}
						</p>
					</div>
				)}
				{synonyms && (
					<div className={classes.cardSection}>
						<p className={classes.cardContent}>
							<b>Synonyms:</b> {synonyms}
						</p>
					</div>
				)}
				{notes && (
					<div className={classes.cardSection}>
						<p className={classes.cardContent}>
							<b>Notes: </b> {notes}
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
