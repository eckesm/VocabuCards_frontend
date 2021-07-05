import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from '../Home';
import ProtectedRoute from './ProtectedRoute';
// import ProtectedRouteScreen from './ProtectedRouteScreen';
import RenderTextScreen from '../RenderedText/RenderTextScreen';
import LoginScreen from '../Login/LoginScreen';
import SignUpScreen from '../Login/SignUpScreen';
import ConfirmEmailScreen from '../Login/ConfirmEmailScreen';
import PasswordResetScreen from '../Login/PasswordResetScreen';
import NewPasswordScreen from '../Login/NewPasswordScreen';
import VocabWordsAll from '../WordCard/AllWordCards';
import WordDetail from '../WordDetail/WordDetail';
import Logout from '../Login/Logout';

export default function Routes() {
	return (
		<Switch>
			<Route exact path="/">
				<Home />
			</Route>

			<Route exact path="/login">
				<LoginScreen />
			</Route>

			<Route exact path="/signup">
				<SignUpScreen />
			</Route>

			<Route exact path="/confirm-email/:token">
				<ConfirmEmailScreen />
			</Route>

			<Route exact path="/reset-password">
				<PasswordResetScreen />
			</Route>

			<Route exact path="/new-password/:token">
				<NewPasswordScreen />
			</Route>

			{/* <Route exact path="/logout">
				<Logout />
			</Route> */}

			<ProtectedRoute component={RenderTextScreen} path="/read" exact />

			<ProtectedRoute component={VocabWordsAll} path="/words" exact />

			<ProtectedRoute component={WordDetail} path="/words/:rootId" exact />

			<Redirect to="/" />
		</Switch>
	);
}
