import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import VocabForm from '../VocabForms/VocabForm';

import { deleteVariation } from '../../helpers/API';
import { deleteComponentInState } from '../../actions/vocab';

import './VariationCard.css';

export default function VariationCard({ initialVariation }) {
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
				<ButtonGroup variant="text" size="small" aria-label="small text primary button group">
					<Button color="primary" onClick={handleModalOpen}>
						<i className="fad fa-pencil" />
					</Button>
					<Button color="secondary" onClick={handleDelete}>
						<i className="fad fa-trash-alt" />
					</Button>
				</ButtonGroup>
			</div>
			{modalOpen && (
				<VocabForm
					open={modalOpen}
					handleClose={handleModalClose}
					variation={variation}
					setVariation={setVariation}
					setting="variation"
				/>
			)}
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
