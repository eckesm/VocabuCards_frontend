import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomeScreen from '../Home/HomeScreen';
import ProtectedRoute from './ProtectedRoute';
import RestrictedRoute from './RestrictedRoute';
import RenderTextScreen from '../RenderedText/RenderTextScreen';
import LoginScreen from '../Login/LoginScreen';
import SignUpScreen from '../Register/SignUpScreen';
import ConfirmEmailScreen from '../ConfirmEmail/ConfirmEmailScreen';
import PasswordResetScreen from '../ChangePassword/PasswordResetScreen';
import NewPasswordScreen from '../ChangePassword/NewPasswordScreen';
import AllWordCardsScreen from '../WordCard/AllWordCardsScreen';
import WordDetailScreen from '../WordDetail/WordDetailScreen';
import Logout from '../Login/Logout';
import StripeScreen from '../Stripe/StripeScreen';
import ErrorScreen from '../ErrorScreen';
import InstructionsScreen from '../Home/InstructionsScreen';

export default function Routes() {
	return (
		<Switch>
			<Route exact path="/">
				<HomeScreen />
			</Route>

			<Route exact path="/login">
				<LoginScreen />
			</Route>

			<Route exact path="/getting-started">
				<InstructionsScreen />
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

			<ProtectedRoute component={StripeScreen} path="/plans" exact />

			<ProtectedRoute component={StripeScreen} status="success" path="/plans/success" exact />

			<ProtectedRoute component={StripeScreen} status="updated" path="/plans/updated" exact />

			<Route exact path="/logout">
				<Logout />
			</Route>

			<Route exact path="/error">
				<ErrorScreen />
			</Route>

			<RestrictedRoute component={RenderTextScreen} path="/read" exact />

			<RestrictedRoute component={AllWordCardsScreen} path="/words" exact />

			<RestrictedRoute component={WordDetailScreen} path="/words/:rootId" exact />

			<Redirect to="/" />
		</Switch>
	);
}
