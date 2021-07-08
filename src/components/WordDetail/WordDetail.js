import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import { deleteWord } from '../../helpers/API';
import { deleteWordInState } from '../../actions/vocab';

import WordDetailAccordian from './WordDetailAccordian';
import VocabModal from '../VocabForms/VocabModal';
import DeleteDialog from '../VocabForms/DeleteDialog';

import './WordDetail.css';

const useStyles = makeStyles(theme => ({
	buttonGroup : {
		display : 'flex',
		gap     : '10px'
	}
}));

export default function WordDetail() {
	const classes = useStyles();
	const { rootId } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();

	const { words_array } = useSelector(st => st);
	const [ word, setWord ] = useState(null);

	useEffect(
		() => {
			if (words_array !== null) {
				const thisWord = words_array.filter(w => w.id === rootId)[0];
				setWord(thisWord);
			}
		},
		[ words_array ]
	);

	const [ modalOpen, setModalOpen ] = useState(false);
	const handleModalOpen = () => {
		setModalOpen(true);
	};
	const handleModalClose = () => {
		setModalOpen(false);
	};

	const handleDelete = () => {
		history.push('/words');
		deleteWord(rootId);
		dispatch(deleteWordInState(rootId));
	};

	const notes = word ? word.notes : null;

	return (
		<div>
			{word && (
				<Card className="WordDetail">
					<CardContent>
						<div className="WordDetail-heading">
							<div className="WordDetail-topHeading">
								<p className="WordDetail-title">
									<b>{word.root.toLowerCase()}</b> - {word.translation.toLowerCase()}
								</p>

								<div className="WordDetail-buttonGroup">
									<div className={classes.buttonGroup}>
										<Button
											color="primary"
											onClick={handleModalOpen}
											startIcon={<i className="fad fa-pencil" />}
										>
											Edit
										</Button>
										<DeleteDialog
											root={word.root}
											variations={word.components}
											handleDelete={handleDelete}
										/>
									</div>
									{modalOpen && (
										<VocabModal
											open={modalOpen}
											handleClose={handleModalClose}
											word={word}
											setWord={setWord}
											setting="root"
										/>
									)}
								</div>
							</div>
							{notes &&
							notes !== '' && (
								<div className="WordDetail-wordInfoContainer">
									{notes && (
										<p className="WordDetail-wordInfo">
											<b>Notes:</b> {notes}
										</p>
									)}
								</div>
							)}
						</div>

						<WordDetailAccordian wordId={word.id} />
					</CardContent>
				</Card>
			)}
		</div>
	);
}
