import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { renderHtml } from '../../helpers/renderingText';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { setTextInput } from '../../actions/vocab';
import { updateSavedRenderedText } from '../../helpers/API';
import { getArticleFromServer } from '../../helpers/newsSources';
import useLocalStorageState from '../../hooks/useLocalStorageState';

import NavBar from '../Navigation/NavBar';
import Paragraph from './Paragraph';
import VocabModal from '../VocabForms/VocabModal';
import CustomButton from '../CustomButton';

const MOBILE_BACKGROUND = process.env.REACT_APP_SCREEN_WELCOME_MOBILE;
const DESKTOP_BACKGROUND = process.env.REACT_APP_SCREEN_WELCOME_DESKTOP;

const useStyles = makeStyles(theme => ({
	screen           : {
		height                         : 'min-content',
		minHeight                      : '100vh',
		paddingBottom                  : '25px',
		// backgroundRepeat               : 'no-repeat',
		backgroundRepeat               : 'repeat-y',
		// backgroundSize                 : 'cover',
		backgroundSize                 : '100%',
		// backgroundPosition             : 'center center',
		[theme.breakpoints.down('xs')]: {
			backgroundImage : `url(${MOBILE_BACKGROUND})`
			// backgroundColor : 'linen'
		},
		[theme.breakpoints.up('sm')]: {
			backgroundImage : `url(${DESKTOP_BACKGROUND})`
		}
	},
	container        : {
		margin                         : '0 auto',
		border                         : '1px solid rgb(200, 200, 200)',
		borderRadius                   : '3px',
		fontFamily                     : 'roboto, sans-serif',
		backgroundColor                : 'snow',
		[theme.breakpoints.down('xs')]: {
			margin    : '18px',
			marginTop : '-50px'
		},
		[theme.breakpoints.up('sm')]: {
			margin    : '40px',
			marginTop : '-35px',
			boxShadow : '5px 5px 10px black'
		},
		[theme.breakpoints.up('md')]: {
			margin       : '80px',
			marginTop    : '-10px',
			marginBottom : '40px',
			boxShadow    : '5px 5px 10px black'
		},
		[theme.breakpoints.up('lg')]: {
			margin       : '160px',
			marginTop    : '0px',
			marginBottom : '80px',
			boxShadow    : '5px 5px 10px black'
		},
		[theme.breakpoints.up('xl')]: {
			margin       : '500px',
			marginTop    : '0px',
			marginBottom : '80px',
			boxShadow    : '5px 5px 10px black'
		}
	},
	root             : {
		'& > *'      : {
			width                          : '95%',
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
		marginBottom : '30px'
	},
	renderTextOutput : {
		border                         : '1px solid rgb(200, 200, 200)',
		borderRadius                   : '3px',
		fontFamily                     : 'roboto, sans-serif',
		backgroundColor                : 'snow',
		padding                        : '15px',
		textAlign                      : 'left',
		fontSize                       : '1.5rem',
		[theme.breakpoints.down('sm')]: {
			margin    : '5px',
			marginTop : '0px'
		},
		[theme.breakpoints.up('md')]: {
			margin    : '15px',
			marginTop : '0px'
		},
		[theme.breakpoints.up('lg')]: {
			margin    : '25px',
			marginTop : '0px'
		}
	},
	empty            : {
		textAlign : 'center'
	},
	buttonContainer  : {
		marginBottom                   : '0px',
		[theme.breakpoints.down('sm')]: {
			marginTop : '0px'
		},
		[theme.breakpoints.up('md')]: {
			marginTop : '-10px'
		},
		[theme.breakpoints.up('lg')]: {
			marginTop : '-15px'
		}
	},
	clearButton      : {
		width                          : 'max-content',
		marginTop                      : '-55px',
		position                       : 'relative',
		zIndex                         : '1',
		float                          : 'right',
		[theme.breakpoints.down('sm')]: {
			right : '-1px',
			top   : '38px'
		},
		[theme.breakpoints.up('md')]: {
			right : '3px',
			top   : '50px'
		},
		[theme.breakpoints.up('lg')]: {
			right : '5px',
			top   : '60px'
		}
	},

	rssTextOutput    : {
		borderBottom  : '1px solid rgb(200, 200, 200)',
		paddingBottom : '15px',
		marginBottom  : '15px'
	},
	title            : {
		fontSize     : '2rem',
		fontWeight   : 'bold',
		marginTop    : '5px',
		marginBottom : '5px'
	},
	author           : {
		fontSize     : '1.5rem',
		marginTop    : '0px',
		marginBottom : '5px'
	},
	pubDate          : {
		fontSize     : '1.5rem',
		marginTop    : '0px',
		marginBottom : '5px'
	},
	linkContainer    : {
		marginTop    : '20px',
		marginBottom : '10px'
	},
	linkDescription  : {
		fontSize   : '1.0rem',
		margin     : '0px',
		fontWeight : 'bold'
	},
	link             : {
		fontSize : '1.0rem',
		margin   : '0px',
		wordWrap : 'break-word'
	}
}));

export default function RenderTextScreen() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { text_input, language, language_object, news_sources, variations, words_array } = useSelector(
		store => store
	);
	const translate_code = 'en';
	const source_code = language;

	const [ renderedText, setRenderedText ] = useState([]);
	const [ modalText, setModalText ] = useState(null);

	const [ formData, setFormData ] = useState({
		foreignText : ''
	});
	const [ fetchingArticle, setFetchingArticle ] = useState(false);

	const [ rssObject, setRssObject ] = useLocalStorageState('rss_object', '');
	const [ clickedArray, setClickedArray ] = useLocalStorageState('clicked_words_array', []);
	const [ rssSource, setRssSource ] = useState(null);
	const [ enableRss, setEnableRss ] = useState(false);
	const [ initialLanguage, setInitialLanguage ] = useState(null);

	function handleChange(evt) {
		const { name, value } = evt.target;
		setFormData(data => ({
			...data,
			[name] : value
		}));
	}

	function clearForeignText() {
		setFormData({
			...formData,
			foreignText : ''
		});
	}

	function addToClickedArray(word) {
		if (clickedArray.indexOf(word) === -1) {
			setClickedArray([ ...clickedArray, word ]);
		}
	}

	async function handleGetArticle() {
		setFetchingArticle(true);
		const res = await getArticleFromServer(language);

		try {
			if (res.text) {
				setRssObject(res);
				setFormData({
					...formData,
					foreignText : res.text
				});

				renderAndSaveText(res.text);
			}
		} catch (e) {
			console.log('Error getting news article!');
			console.log(e);
		}

		setFetchingArticle(false);
	}

	function handleSubmit(evt) {
		evt.preventDefault();
		setRssObject('');
		renderAndSaveText(formData.foreignText);
	}

	function renderAndSaveText(text) {
		updateSavedRenderedText(text);
		dispatch(setTextInput(text));
		setClickedArray([]);

		let prepareRenderedText = renderHtml(text, source_code, translate_code, variations);
		setRenderedText(prepareRenderedText);
	}

	function updateModalText(wordObject) {
		setModalText(wordObject);
		setOpen(true);
	}

	const [ open, setOpen ] = useState(false);
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	useEffect(
		() => {
			setEnableRss(false);
			if (language) {
				if (initialLanguage !== null) {
					if (language !== initialLanguage) {
						setRssObject('');
						setFormData({
							...formData,
							foreignText : ''
						});
						setRenderedText([]);
						setInitialLanguage(null);
					}
				}

				if (news_sources) {
					if (news_sources.hasOwnProperty(language)) {
						setRssSource(news_sources[language]['source']);
						setEnableRss(true);
					}
				}
			}

			if (initialLanguage === null) {
				if (text_input !== '' && text_input !== null) {
					setFormData({ ...formData, foreignText: text_input });
					let prepareRenderedText = renderHtml(text_input, source_code, translate_code, variations);
					setRenderedText(prepareRenderedText);
				}
				setInitialLanguage(language);
			}

			if (words_array !== null && words_array.length > 0 && formData.foreignText !== '') {
				let prepareRenderedText = renderHtml(text_input, source_code, translate_code, variations);
				setRenderedText(prepareRenderedText);
			}
		},
		[ text_input, language, variations, words_array ]
	);

	return (
		<div className={classes.screen}>
			<NavBar />
			<div className={classes.container}>
				<h1>Study {language_object[language]} Text</h1>
				<form onSubmit={handleSubmit} className={classes.root}>
					{formData.foreignText !== '' && (
						<Button
							className={classes.clearButton}
							variant="contained"
							color="secondary"
							size="small"
							onClick={clearForeignText}
							startIcon={<i className="fad fa-trash-alt" />}
						>
							Clear Input
						</Button>
					)}
					<TextField
						id="foreignText"
						name="foreignText"
						label="Type or paste foreign language text"
						multiline
						rows={10}
						value={formData.foreignText}
						variant="outlined"
						onChange={handleChange}
					/>
					<div className={classes.buttonContainer}>
						<CustomButton onClick={handleSubmit} customtype="width_resize">
							Render Pasted/Entered Text
						</CustomButton>
						{enableRss && (
							<CustomButton
								customtype="width_resize"
								onClick={handleGetArticle}
								disabled={fetchingArticle ? true : false}
							>
								{fetchingArticle ? <i>fetching article</i> : `Get Article: ${rssSource}`}
							</CustomButton>
						)}
					</div>
				</form>

				<div className={classes.renderTextOutput}>
					{enableRss &&
					rssObject !== '' &&
					rssObject !== undefined && (
						<div className={classes.rssTextOutput}>
							{rssObject.title !== '' && <p className={classes.title}>{rssObject.title}</p>}
							{rssObject.author !== '' && <p className={classes.author}>{rssObject.author}</p>}
							{/* {rssObject.pubDate !== '' && ( */}
							{/* // <p className={classes.pubDate}>{Date(rssObject.pubDate).format('dd-m-yy')}</p> */}
							{/* )} */}
							{rssObject.link !== '' && (
								<div className={classes.linkContainer}>
									{rssObject.fullText === false && (
										<p className={classes.linkDescription}>The full article is available at: </p>
									)}
									{rssObject.fullText === true && (
										<p className={classes.linkDescription}>Link to article: </p>
									)}
									<a href={rssObject.link} target="_blank">
										<p className={classes.link}>{rssObject.link}</p>
									</a>
								</div>
							)}
						</div>
					)}
					{renderedText &&
					renderedText.length === 0 && (
						<h4 className={classes.empty}>
							<i>
								...type or paste {language_object[language]} text into the input box then click RENDER
								to process...
							</i>
						</h4>
					)}

					{renderedText &&
						renderedText.length > 0 &&
						renderedText.map((paragraphArray, i) => {
							return (
								<Paragraph
									key={i}
									paragraphArray={paragraphArray}
									updateModalText={updateModalText}
									clickedArray={clickedArray}
									addToClickedArray={addToClickedArray}
								/>
							);
						})}
				</div>

				<VocabModal
					open={open}
					handleOpen={handleOpen}
					handleClose={handleClose}
					wordText={modalText}
					setting="add_variation_or_root"
				/>
			</div>
		</div>
	);
}
