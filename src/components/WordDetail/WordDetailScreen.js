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

import NavBar from '../Navigation/NavBar';
import WordDetailAccordian from './WordDetailAccordian';
import VocabModal from '../VocabForms/VocabModal';
import DeleteDialog from '../VocabForms/DeleteDialog';
import CustomButton from '../CustomButton';

import UnauthorizedRouteScreen from '../Routes/UnauthorizedRouteScreen';

const useStyles = makeStyles(theme => ({
	screen                      : {
		margin     : '0px',
		height     : 'max-content',
		marginTop  : '-10px',
		paddingTop : '15px'
	},
	container                   : {
		margin                         : '0 auto',
		[theme.breakpoints.down('xs')]: {
			margin    : '5px',
			marginTop : '-50px'
		},
		[theme.breakpoints.up('sm')]: {
			margin    : '15px',
			marginTop : '-35px'
		},
		[theme.breakpoints.up('lg')]: {
			margin    : '25px',
			marginTop : '-10px'
		}
	},
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
		textAlign       : 'left',
		display         : 'flex',
		justifyContent  : 'space-between'
	},
	wordDetailTitle             : {
		margin                         : '10px',
		wordWrap                       : 'break-word',
		[theme.breakpoints.down('sm')]: {
			maxWidth : '70%'
		},
		[theme.breakpoints.up('md')]: {
			maxWidth : '80%'
		},
		[theme.breakpoints.up('lg')]: {
			maxWidth : '90%'
		}
	},
	title                       : {
		color        : 'blue',
		fontSize     : '2rem',
		marginTop    : '0px',
		marginBottom : '5px'
	},
	translation                 : {
		fontSize     : '1.25rem',
		marginTop    : '0px',
		marginBottom : '0px',
		wordWrap     : 'break-word'
	},
	wordDetailButtonGroup       : {
		position  : 'relative',
		textAlign : 'right',
		top       : '5px',
		width     : 'max-content'
	},
	buttonGroup                 : {
		paddingBottom : '5px',
		textAlign     : 'center'
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

export default function WordDetailScreen() {
	const classes = useStyles();
	const { rootId } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();

	const { words_array, language, language_object } = useSelector(st => st);
	const languageName = language_object[language];
	const [ word, setWord ] = useState(null);
	const [ access, setAccess ] = useState(true);

	useEffect(
		() => {
			if (words_array !== null) {
				const thisWord = words_array.filter(w => w.id === rootId)[0];
				setWord(thisWord);
				if (!thisWord) {
					setAccess(false);
				}
			}
		},
		[ words_array ]
	);

	const [ editModalOpen, setEditModalOpen ] = useState(false);
	const [ newModalOpen, setNewModalOpen ] = useState(false);
	const handleEditModalOpen = () => {
		setEditModalOpen(true);
	};
	const handleEditModalClose = () => {
		setEditModalOpen(false);
	};

	const handleNewModalOpen = () => {
		setNewModalOpen(true);
	};
	const handleNewModalClose = () => {
		setNewModalOpen(false);
	};

	const handleDelete = () => {
		history.push('/words');
		deleteWord(rootId);
		dispatch(deleteWordInState(rootId));
	};

	const notes = word ? word.notes : null;

	return (
		<div>
			{access &&
			word && (
				<div className={classes.screen}>
					<NavBar />
					<div className={classes.container}>
						<div className={classes.button}>
							<CustomButton href={'/#/words'} startIcon={<i className="fas fa-arrow-circle-left" />}>
								Go to {languageName} Vocab Cards
							</CustomButton>
						</div>
						<Card className={classes.wordDetail}>
							<CardContent className={classes.wordDetailCardContent}>
								<div className={classes.WordDetailHeading}>
									<div className={classes.wordDetailTopHeading}>
										<div className={classes.wordDetailTitle}>
											<p className={classes.title}>
												<b>{word.root.toLowerCase()}</b>
											</p>
											{word.translation && (
												<p className={classes.translation}>
													<i>{word.translation.toLowerCase()}</i>
												</p>
											)}
										</div>

										<div className={classes.wordDetailButtonGroup}>
											<div className={classes.buttonGroup}>
												<div>
													<Button color="primary" onClick={handleNewModalOpen}>
														Add Variation
													</Button>
												</div>
												<Button
													color="primary"
													onClick={handleEditModalOpen}
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
											{editModalOpen && (
												<VocabModal
													open={editModalOpen}
													handleClose={handleEditModalClose}
													word={word}
													setWord={setWord}
													setting="edit_root"
												/>
											)}
											{newModalOpen && (
												<VocabModal
													open={newModalOpen}
													handleClose={handleNewModalClose}
													rootId={word.id}
													rootWord={word.root}
													setting="add_variation_of_root"
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
					</div>
				</div>
			)}
			{!access && <UnauthorizedRouteScreen />}
		</div>
	);
}
