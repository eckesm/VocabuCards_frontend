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

const useStyles = makeStyles(theme => ({
	button                      : {
		[theme.breakpoints.down('sm')]: {
			textAlign : 'center'
		},
		[theme.breakpoints.up('md')]: {
			textAlign  : 'left',
			marginLeft : '10px'
		},
		marginTop                      : '5px'
	},
	wordDetail                  : {
		marginTop  : '10px',
		fontFamily : 'roboto, sans-serif',
		padding    : '0px',
		paddingTop : '10px'
		// paddingBottom : '10px'
	},
	WordDetailHeading           : {
		borderRadius                   : '3px',
		border                         : '1px solid rgb(215, 215, 215)',
		[theme.breakpoints.down('sm')]: {
			margin : '5px'
		},
		[theme.breakpoints.up('md')]: {
			boxShadow : '5px 5px 8px grey',
			margin    : '15px'
		}
	},
	wordDetailTopHeading        : {
		padding         : '10px',
		borderBottom    : '1px solid rgb(215, 215, 215)',
		backgroundColor : 'rgb(218, 237, 255)',
		fontSize        : '2rem',
		textAlign       : 'left',
		color           : 'blue',
		display         : 'flex',
		justifyContent  : 'space-between'
	},
	wordDetailTitle             : {
		margin : '10px'
	},
	translation                 : {
		fontSize : '1.5rem'
	},
	wordDetailButtonGroup       : {
		position : 'relative',
		top      : '5px'
	},
	buttonGroup                 : {
		paddingBottom : '5px'
	},
	wordDetailCardContent       : {
		padding                        : '0px',
		[theme.breakpoints.down('sm')]: {
			margin : '5px'
		},
		[theme.breakpoints.up('md')]: {
			margin : '15px'
		},
		[theme.breakpoints.up('lg')]: {
			margin : '25px'
		}
	},
	wordDetailWordInfoContainer : {
		paddingTop    : '15px',
		paddingRight  : '15px',
		paddingLeft   : '15px',
		paddingBottom : '10px'
	},
	wordDetailWordInfo          : {
		fontFamily   : 'Roboto, sans-serif',
		textAlign    : 'left',
		margin       : '0px',
		marginBottom : '5px'
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
			<div className={classes.button}>
				<Button
					href={'/#/words'}
					variant="contained"
					color="primary"
					className={classes.button}
					startIcon={<i class="fas fa-arrow-circle-left" />}
				>
					Go to All Words
				</Button>
			</div>
			{word && (
				<Card className={classes.wordDetail}>
					<CardContent className={classes.wordDetailCardContent}>
						<div className={classes.WordDetailHeading}>
							<div className={classes.wordDetailTopHeading}>
								<p className={classes.wordDetailTitle}>
									<b>{word.root.toLowerCase()}</b>
									{word.translation && ' - '}
									{word.translation && (
										<span className={classes.translation}>
											<i>{word.translation.toLowerCase()}</i>
										</span>
									)}
								</p>

								<div className={classes.wordDetailButtonGroup}>
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
								<div className={classes.wordDetailWordInfoContainer}>
									{notes && (
										<p className={classes.wordDetailWordInfo}>
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
