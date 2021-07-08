import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';

import { deleteVariation } from '../../helpers/API';
import { deleteComponentInState } from '../../actions/vocab';

import VocabModal from '../VocabForms/VocabModal';
import DeleteDialog from '../VocabForms/DeleteDialog';

import './VariationCard.css';

const useStyles = makeStyles(theme => ({
	buttonGroup : {
		display       : 'flex',
		verticalAlign : 'middle'
	},
	button      : {
		height : '35px',
		width  : '35px'
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
		<div className="VariationCard">
			<div className="VariationCard-heading">
				<p className="VariationCard-headingText">{variation.variation}</p>
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
			<div className="VariationCard-body">
				{translation && (
					<div className="VariationCard-section">
						<p className="VariationCard-content">
							<b>Translation:</b> {translation}
						</p>
					</div>
				)}
				{examples && (
					<div className="VariationCard-section">
						<p className="VariationCard-content">
							<b>Example: </b> {examples}
						</p>
					</div>
				)}
				{description && (
					<div className="VariationCard-section">
						<p className="VariationCard-content">
							<b>Description:</b> {description}
						</p>
					</div>
				)}
				{definition && (
					<div className="VariationCard-section">
						<p className="VariationCard-content">
							<b>Definition:</b> {definition}
						</p>
					</div>
				)}
				{synonyms && (
					<div className="VariationCard-section">
						<p className="VariationCard-content">
							<b>Synonyms:</b> {synonyms}
						</p>
					</div>
				)}
				{notes && (
					<div className="VariationCard-section">
						<p className="VariationCard-content">
							<b>Notes: </b> {notes}
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
