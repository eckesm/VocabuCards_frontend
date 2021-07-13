import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from '../Home';
import ProtectedRoute from './ProtectedRoute';
// import ProtectedRouteScreen from './ProtectedRouteScreen';
import RenderTextScreen from '../RenderedText/RenderTextScreen';
import LoginScreen from '../Login/LoginScreen';
import SignUpScreen from '../Register/SignUpScreen';
import ConfirmEmailScreen from '../ConfirmEmail/ConfirmEmailScreen';
import PasswordResetScreen from '../ChangePassword/PasswordResetScreen';
import NewPasswordScreen from '../ChangePassword/NewPasswordScreen';
import VocabWordsAll from '../WordCard/AllWordCards';
import WordDetail from '../WordDetail/WordDetail';
import Logout from '../Login/Logout';
import ErrorScreen from '../ErrorScreen';

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

			<Route exact path="/logout">
				<Logout />
			</Route>

			<Route exact path="/error">
				<ErrorScreen />
			</Route>

			<ProtectedRoute component={RenderTextScreen} path="/read" exact />

			<ProtectedRoute component={VocabWordsAll} path="/words" exact />

			<ProtectedRoute component={WordDetail} path="/words/:rootId" exact />

			<Redirect to="/" />
		</Switch>
	);
}
