import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

import { clearAlerts } from '../../actions/auth';

import NavBar from '../Navigation/NavBar';
import AlertsContainer from '../Alerts/AlertsContainer';
// import Home from './Home';
import Welcome from './Welcome';
// import ScreenShots from './ScreenShots';
import RenderText from '../RenderedText/RenderText';
import SelectLanguage from '../Navigation/SelectLanguage';

import { SCREEN_HOME_MOBILE, SCREEN_HOME_DESKTOP, SCREEN_WELCOME_MOBILE, SCREEN_WELCOME_DESKTOP } from '../../settings';

const useStyles = makeStyles(theme => ({
	homeScreen                : {
		position                       : 'relative',
		height                         : 'min-content',
		minHeight                      : '100vh',
		paddingBottom                  : '50px',
		backgroundRepeat               : 'repeat-y',
		backgroundSize                 : '100%',
		[theme.breakpoints.down('sm')]: {
			backgroundImage : `url(${SCREEN_HOME_MOBILE})`
		},
		[theme.breakpoints.up('md')]: {
			backgroundImage : `url(${SCREEN_HOME_DESKTOP})`
		}
	},
	welcomeScreen             : {
		position                       : 'relative',
		height                         : 'min-content',
		minHeight                      : '100vh',
		paddingBottom                  : '50px',
		backgroundRepeat               : 'no-repeat',
		backgroundSize                 : 'cover',
		[theme.breakpoints.down('xs')]: {
			backgroundImage : `url(${SCREEN_WELCOME_MOBILE})`
		},
		[theme.breakpoints.up('sm')]: {
			backgroundImage : `url(${SCREEN_WELCOME_DESKTOP})`
		}
	},
	container                 : {
		margin                         : '0 auto',
		width                          : '300px',
		fontFamily                     : 'roboto, sans-serif',
		border                         : '1px solid rgb(200, 200, 200)',
		padding                        : '40px',
		backgroundColor                : 'snow',
		borderRadius                   : '3px',
		[theme.breakpoints.down('xs')]: {
			marginTop : '75px'
		},
		[theme.breakpoints.up('sm')]: {
			marginTop : '75px',
			boxShadow : '5px 5px 10px black'
		},
		[theme.breakpoints.up('xl')]: {
			marginTop : '150px',
			boxShadow : '5px 5px 10px black'
		}
	},
	renderTextContainer       : {
		margin                         : '0 auto',
		border                         : '1px solid rgb(200, 200, 200)',
		borderRadius                   : '3px',
		fontFamily                     : 'roboto, sans-serif',
		backgroundColor                : 'snow',
		[theme.breakpoints.down('xs')]: {
			margin    : '10px',
			marginTop : '15px'
		},
		[theme.breakpoints.up('sm')]: {
			margin       : '40px',
			marginTop    : '20px',
			marginBottom : '25px',
			boxShadow    : '5px 5px 10px black'
		},
		[theme.breakpoints.up('md')]: {
			margin       : '80px',
			marginTop    : '25px',
			marginBottom : '40px',
			boxShadow    : '5px 5px 10px black'
		},
		[theme.breakpoints.up('lg')]: {
			margin       : '160px',
			marginTop    : '30px',
			marginBottom : '60px',
			boxShadow    : '5px 5px 10px black'
		},
		[theme.breakpoints.up('xl')]: {
			margin       : '500px',
			marginTop    : '35px',
			marginBottom : '80px',
			boxShadow    : '5px 5px 10px black'
		}
	},
	IntroductionTextContainer : {
		margin                         : '0 auto',
		border                         : '1px solid rgb(200, 200, 200)',
		borderRadius                   : '3px',
		fontFamily                     : 'roboto, sans-serif',
		backgroundColor                : 'snow',
		padding                        : '25px',
		[theme.breakpoints.down('xs')]: {
			margin       : '10px',
			marginTop    : '15px',
			marginBottom : '0px'
		},
		[theme.breakpoints.up('sm')]: {
			margin       : '40px',
			marginTop    : '20px',
			marginBottom : '0px',
			boxShadow    : '5px 5px 10px black'
		},
		[theme.breakpoints.up('md')]: {
			margin       : '80px',
			marginTop    : '30px',
			marginBottom : '0px',
			boxShadow    : '5px 5px 10px black'
		},
		[theme.breakpoints.up('lg')]: {
			margin       : '160px',
			marginTop    : '40px',
			marginBottom : '0px',
			boxShadow    : '5px 5px 10px black'
		},
		[theme.breakpoints.up('xl')]: {
			margin       : '500px',
			marginTop    : '50px',
			marginBottom : '0px',
			boxShadow    : '5px 5px 10px black'
		}
	},
	InstructionText           : {
		textAlign : 'left',
		fontSize  : '1.1rem'
	},
	InstructionsContainer     : {
		justifyContent : 'start'
	}
}));

export default function HomeScreen({ status = null }) {
// export default function HomeScreen() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();

	const { user } = useSelector(store => store);

	const goToNewUser = () => {
		dispatch(clearAlerts());
		history.push('/new-user');
	};

	const goToGettingStarted = () => {
		dispatch(clearAlerts());
		history.push('/getting-started');
	};

	if (user || status === 'welcome') {
	// if (user) {
		return (
			<div className={classes.welcomeScreen}>
				<NavBar />
				<AlertsContainer />
				<div className={classes.container}>
					<h1>Welcome to VocabuCards!</h1>
					<Welcome />
				</div>
			</div>
		);
	}
	else {
		return (
			<div className={classes.homeScreen}>
				<NavBar />
				<AlertsContainer />
				{/* <div className={classes.container}>
					<h1>Welcome to VocabuCards!</h1>
					<Home />
				</div> */}

				<div className={classes.IntroductionTextContainer}>
					<h1>Welcome to VocabuCards!</h1>
					<h3>VocabuCards is a site for studying foreign languages through news articles. </h3>
					<div className={classes.InstructionsContainer}>
						<p className={classes.InstructionText}>
							Current languages include French, German, Italian, Spanish, and Swedish -- more languages
							coming soon!
						</p>
						<p className={classes.InstructionText}>Select a language to get started.</p>
						<SelectLanguage />
						<p className={classes.InstructionText}>
							<b>Load a random news article</b> <i>(click the "Get New Random Article" buttons)</i> or{' '}
							<b>enter your own text</b> <i>(and click "Render Entered Text" button)</i>. As you are
							reading, click words in the rendered text screen to see tranlsations of words and sentences.
						</p>
						<p className={classes.InstructionText}>
							<b>
								<Link onClick={goToNewUser}
								//  href="/#/new-user"
								 >
									Create an account
								</Link>
							</b>{' '}
							to save your translations for future study.
						</p>
						<p className={classes.InstructionText}>
							Check out the{' '}
							<b>
								<Link onClick={goToGettingStarted} 
								// href="/#/getting-started"
								>
									Getting Started
								</Link>
							</b>{' '}
							page for screenshots and account instructions.
						</p>
					</div>
				</div>
				<div className={classes.renderTextContainer}>
					<RenderText />
				</div>
				{/* <ScreenShots /> */}
			</div>
		);
	}
}
