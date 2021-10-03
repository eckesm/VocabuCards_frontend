import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { renderHtml } from '../../helpers/renderingText';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { setTextInput, setCurrentArticle } from '../../actions/vocab';
import { updateSavedRenderedText } from '../../helpers/API';
import { getNewArticle, getRandomSavedArticle, getSavedArticleById } from '../../helpers/newsSources';
import useLocalStorageState from '../../hooks/useLocalStorageState';

import Paragraph from './Paragraph';
import VocabModal from '../VocabForms/VocabModal';
import CustomButton from '../CustomButton';

const useStyles = makeStyles(theme => ({
	root                       : {
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
	renderTextOutput           : {
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
	empty                      : {
		textAlign : 'center'
	},
	buttonContainer            : {
		marginBottom                   : '0px',
		// justifyContent                 : 'space-around',
		justifyContent                 : 'center',
		[theme.breakpoints.down('sm')]: {
			marginTop : '0px'
		},
		[theme.breakpoints.up('md')]: {
			display   : 'flex',
			marginTop : '-10px'
		},
		[theme.breakpoints.up('lg')]: {
			marginTop : '-15px'
		}
	},
	RenderTextButtonContainer  : {
		// marginTop     : '10px',
		marginBottom                   : '10px',
		paddingTop                     : '10px',
		paddingBottom                  : '10px',
		[theme.breakpoints.down('sm')]: {
			marginLeft : '0px',
			width      : '100%',
			marginTop  : '20px'
		},
		[theme.breakpoints.up('md')]: {
			// border       : '1px solid rgb(200, 200, 200)',
			// borderRadius : '3px',
			// marginLeft   : '25px',
			width : '300px'
		}
	},
	getArticlesButtonContainer : {
		// marginTop     : '10px',
		marginBottom                   : '10px',
		paddingTop                     : '10px',
		paddingBottom                  : '10px',
		[theme.breakpoints.down('sm')]: {
			marginLeft : '0px',
			width      : '100%',
			marginTop  : '20px'
		},
		[theme.breakpoints.up('md')]: {
			border       : '1px solid rgb(200, 200, 200)',
			borderRadius : '3px',
			marginLeft   : '25px',
			width        : '300px'
		}
	},
	buttonHeading              : {
		fontWeight     : 'bold',
		textDecoration : 'underline',
		fontSize       : '1.2rem',
		marginTop      : '0px',
		marginBottom   : '5px'
	},
	clearButton                : {
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

	rssTextOutput              : {
		borderBottom  : '1px solid rgb(200, 200, 200)',
		paddingBottom : '15px',
		marginBottom  : '15px'
	},
	title                      : {
		fontSize     : '2rem',
		fontWeight   : 'bold',
		marginTop    : '5px',
		marginBottom : '5px'
	},
	publication                : {
		fontSize     : '1.5rem',
		marginTop    : '0px',
		marginBottom : '5px'
	},
	author                     : {
		fontSize     : '1.2rem',
		marginTop    : '0px',
		marginBottom : '5px',
		fontStyle    : 'italic'
	},
	pubDate                    : {
		fontSize     : '1.5rem',
		marginTop    : '0px',
		marginBottom : '5px'
	},
	linkContainer              : {
		marginTop    : '20px',
		marginBottom : '10px'
	},
	linkDescription            : {
		fontSize   : '1.0rem',
		margin     : '0px',
		fontWeight : 'bold'
	},
	link                       : {
		fontSize : '1.0rem',
		margin   : '0px',
		wordWrap : 'break-word'
	}
}));

export default function RenderText() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const {
		text_input,
		language,
		language_object,
		news_sources,
		variations,
		words_array,
		user,
		current_article
	} = useSelector(store => store);
	const translate_code = 'en';
	const source_code = language;

	const [ renderedText, setRenderedText ] = useState([]);
	const [ modalText, setModalText ] = useState(null);

	const [ formData, setFormData ] = useState({
		foreignText : ''
	});
	const [ fetchingArticle, setFetchingArticle ] = useState(false);
	const [ fetchingSavedArticle, setFetchingSavedArticle ] = useState(false);

	const [ articleObject, setArticleObject ] = useLocalStorageState('rss_object', '');
	const [ clickedArray, setClickedArray ] = useLocalStorageState('clicked_words_array', []);
	const [ rssNewsSource, setRssNewsSource ] = useState(null);
	const [ enableRssNewsSources, setEnableRssNewsSources ] = useState(false);
	// const [ initialLanguage, setInitialLanguage ] = useState(null);

	// console.log(articleObject);

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
		const res = await getNewArticle(language);

		try {
			if (res.text) {
				setArticleObject(res);
				setFormData({
					...formData,
					foreignText : res.text
				});

				renderAndSaveText(res.text, res.id);
			}
		} catch (e) {
			console.log('Error getting news article!');
			console.log(e);
		}

		setFetchingArticle(false);
	}

	async function handleGetSavedArticle() {
		setFetchingSavedArticle(true);
		const res = await getRandomSavedArticle(language);
		try {
			if (res.text) {
				setArticleObject(res);
				setFormData({
					...formData,
					foreignText : res.text
				});
				renderAndSaveText(res.text, res.id);
			}
		} catch (e) {
			console.log('Error getting news article!');
			console.log(e);
		}
		setFetchingSavedArticle(false);
	}

	function handleSubmit(evt) {
		evt.preventDefault();
		setArticleObject({ ...text_input, text: formData.foreignText });
		renderAndSaveText(formData.foreignText);
	}

	function renderAndSaveText(text, articleId = null) {
		if (user) {
			updateSavedRenderedText(text, articleId);
		}
		dispatch(setTextInput(text));
		dispatch(setCurrentArticle(articleId));
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
		async () => {
			setEnableRssNewsSources(false);

			if (language) {
				// if (initialLanguage !== null) {
				// 	if (language !== initialLanguage) {
				// 		setArticleObject('');
				// 		setFormData({
				// 			...formData,
				// 			foreignText : ''
				// 		});
				// 		setRenderedText([]);
				// 		setInitialLanguage(null);
				// 	}
				// }

				if (news_sources) {
					if (news_sources.hasOwnProperty(language)) {
						setRssNewsSource(news_sources[language]['source']);
						setEnableRssNewsSources(true);
					}
				}
			}

			// if (initialLanguage === null) {
			// if (text_input !== '' && text_input !== null) {
			// 	setFormData({ ...formData, foreignText: text_input });
			// 	let prepareRenderedText = renderHtml(text_input, source_code, translate_code, variations);
			// 	setRenderedText(prepareRenderedText);
			// }
			// else if (!user && articleObject) {
			// if (articleObject) {
			// 	setFormData({ ...formData, foreignText: articleObject.text });
			// 	dispatch(setTextInput(articleObject.text));
			// }
			// setInitialLanguage(language);
			// }

			if (articleObject && articleObject.text) {
				setFormData({ ...formData, foreignText: articleObject.text });
				dispatch(setTextInput(articleObject.text));
				let prepareRenderedText = renderHtml(articleObject.text, source_code, translate_code, variations);
				setRenderedText(prepareRenderedText);
			}
			else if (user && text_input !== '' && text_input !== null) {
				setFormData({ ...formData, foreignText: text_input });
				let prepareRenderedText = renderHtml(text_input, source_code, translate_code, variations);
				setRenderedText(prepareRenderedText);
			}

			if (current_article) {
				if (articleObject && articleObject.id) {
					if (current_article !== articleObject.id) {
						const article = getSavedArticleById(current_article);
						setArticleObject(article);
					}
				}
				else {
					const article = await getSavedArticleById(current_article);
					setArticleObject(article);
				}
			}

			// if (user && words_array !== null && words_array.length > 0 && formData.foreignText !== '') {
			// console.log('RAN user');
			// let prepareRenderedText = renderHtml(text_input, source_code, translate_code, variations);
			// setRenderedText(prepareRenderedText);
			// }

			// if (!user && formData.foreignText !== '') {
			// console.log(text_input, source_code, translate_code, variations);
			// 	let prepareRenderedText = renderHtml(text_input, source_code, translate_code, variations);
			// 	setRenderedText(prepareRenderedText);
			// }
		},
		[ text_input, language, variations, words_array, news_sources, user, current_article ]
	);

	return (
		<div>
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
					<div className={classes.RenderTextButtonContainer}>
						{/* <CustomButton onClick={handleSubmit} customtype="width_resize"> */}
						<CustomButton onClick={handleSubmit} customtype="RenderText_RenderEnteredText">
							Render Entered Text
						</CustomButton>
					</div>
					{enableRssNewsSources && (
						<div className={classes.getArticlesButtonContainer}>
							<p className={classes.buttonHeading}>Get Article from {rssNewsSource}</p>
							<CustomButton
								// customtype="width_resize"
								onClick={handleGetArticle}
								disabled={fetchingArticle ? true : false}
								customtype="RenderText_GetArticles"
							>
								{fetchingArticle ? (
									<i>fetching new article</i>
								) : (
									// `Get New Article: ${rssNewsSource}`
									'Recent Article (slower)'
								)}
							</CustomButton>

							<CustomButton
								// customtype="width_resize"
								onClick={handleGetSavedArticle}
								disabled={fetchingSavedArticle ? true : false}
								customtype="RenderText_GetArticles"
							>
								{fetchingSavedArticle ? (
									<i>fetching saved article</i>
								) : (
									// `Get Saved Article: ${rssNewsSource}`
									`Saved Article (faster)`
								)}
							</CustomButton>
						</div>
					)}
				</div>
			</form>

			<div className={classes.renderTextOutput}>
				{enableRssNewsSources &&
				articleObject !== '' &&
				articleObject !== undefined &&
				(articleObject.title ||
					articleObject.author ||
					articleObject.publication ||
					articleObject.publication_date ||
					articleObject.url) && (
					<div className={classes.rssTextOutput}>
						{articleObject.title !== '' && <p className={classes.title}>{articleObject.title}</p>}
						{articleObject.publication !== '' && (
							<p className={classes.publication}>{articleObject.publication}</p>
						)}
						{articleObject.author !== articleObject.publication &&
						articleObject.author !== '' && <p className={classes.author}>By {articleObject.author}</p>}
						{articleObject.url !== '' && (
							<div className={classes.linkContainer}>
								{articleObject.full_text === false && (
									<p className={classes.linkDescription}>The full article is available at: </p>
								)}
								{articleObject.full_text === true && (
									<p className={classes.linkDescription}>Link to article: </p>
								)}
								<a href={articleObject.url} target="_blank">
									<p className={classes.link}>{articleObject.url}</p>
								</a>
							</div>
						)}
					</div>
				)}
				{renderedText &&
				renderedText.length === 0 && (
					<h4 className={classes.empty}>
						<i>
							...type or paste {language_object[language]} text into the input box then click "Render
							Entered Text" to process...
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
	);
}
