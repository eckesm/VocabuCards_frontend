import React from 'react';
// import { useSelector } from 'react-redux';
// import { useHistory } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';

// import SelectLanguage from '../Navigation/SelectLanguage';
import CustomButton from '../CustomButton';

const useStyles = makeStyles(theme => ({
	container : {
		marginTop    : '25px',
		marginBottom : '25px'
	},
	button    : {
		marginTop   : '15px',
		marginLeft  : '5px',
		marginRight : '5px'
	},
	select    : {
		marginTop : '25px'
	}
}));

export default function Home() {
	const classes = useStyles();
	// const history = useHistory();
	// const { user } = useSelector(store => store);

	// useEffect(
	// 	() => {
	// 		if (user) {
	// 			history.push('/welcome');
	// 		}
	// 	},
	// 	[]
	// );

	return (
		<div className={classes.container}>
			<div>
				<CustomButton href="/#/login">Login</CustomButton>
				<CustomButton href="/#/new-user" customtype="default">
					New User
				</CustomButton>
			</div>
		</div>
	);
}
// }
