import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomeScreen from '../Home/HomeScreen';
import ProtectedRoute from './ProtectedRoute';
import RestrictedRoute from './RestrictedRoute';
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
import StripeScreen from '../Stripe/StripeScreen';
import ErrorScreen from '../ErrorScreen';

export default function Routes() {
	return (
		<Switch>
			<Route exact path="/">
				<HomeScreen />
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

			{/* <Route exact path="/plans">
				<StripeScreen />
			</Route> */}

			<ProtectedRoute component={StripeScreen} path="/plans" exact />

			{/* <Route exact path="/plans/success">
				<StripeScreen status="success" />
			</Route> */}

			<ProtectedRoute component={StripeScreen} status="success" path="/plans/success" exact />

			{/* <Route exact path="/plans/updated">
				<StripeScreen status="updated" />
			</Route> */}

			<ProtectedRoute component={StripeScreen} status="updated" path="/plans/updated" exact />

			{/* <Route exact path="/plans/cancel">
				<StripeScreen message="Cancel!" />
			</Route> */}

			{/* <Route exact path="/plans">
				<StripeScreen message="Update Billing!" status="billing" />
			</Route> */}

			{/* <Route exact path="/plans/updated">
				<StripeScreen status="updated" />
			</Route> */}

			<Route exact path="/logout">
				<Logout />
			</Route>

			<Route exact path="/error">
				<ErrorScreen />
			</Route>

			{/* <ProtectedRoute component={RenderTextScreen} path="/read" exact /> */}
			<RestrictedRoute component={RenderTextScreen} path="/read" exact />

			{/* <ProtectedRoute component={VocabWordsAll} path="/words" exact /> */}
			<RestrictedRoute component={VocabWordsAll} path="/words" exact />

			{/* <ProtectedRoute component={WordDetail} path="/words/:rootId" exact /> */}
			<RestrictedRoute component={WordDetail} path="/words/:rootId" exact />

			<Redirect to="/" />
		</Switch>
	);
}
