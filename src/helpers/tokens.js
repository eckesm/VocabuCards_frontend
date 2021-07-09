import axios from 'axios';
import { getRefreshToken, refreshAccessTokenViaAPI } from './API';

// help from: https://www.techynovice.com/setting-up-JWT-token-refresh-mechanism-with-axios/

export const customAxios = axios.create({});

customAxios.interceptors.response.use(
	function(response) {
		// console.log('no issues with axios request');
		// If the request succeeds, we don't have to do anything and just return the response
		return response;
	},
	function(error) {
		// console.log('there are issues with axios request');
		const errorResponse = error.response;
		if (isTokenExpiredError(errorResponse)) {
			return resetTokenAndReattemptRequest(error);
		}
		// If the error is due to other reasons, we just throw it back to axios
		return Promise.reject(error);
	}
);

function isTokenExpiredError(errorResponse) {
	// Your own logic to determine if the error is due to JWT token expired returns a boolean value
	if (errorResponse.data.status === 'expired_token') {
		// console.log('isTokenExpiredError = true');
		return true;
	}
	else {
		// console.log('isTokenExpiredError = false');
		return false;
	}
}

let isAlreadyFetchingAccessToken = false;

// This is the list of waiting requests that will retry after the JWT refresh complete
let subscribers = [];

async function resetTokenAndReattemptRequest(error) {
	try {
		const { response: errorResponse } = error;
		const resetToken = getRefreshToken(); // Your own mechanism to get the refresh token to refresh the JWT token
		if (!resetToken) {
			// We can't refresh, throw the error anyway
			return Promise.reject(error);
		}
		/* Proceed to the token refresh procedure
    We create a new Promise that will retry the request,
    clone all the request configuration from the failed
    request in the error object. */
		const retryOriginalRequest = new Promise(resolve => {
			/* We need to add the request retry to the queue
    since there another request that already attempt to
    refresh the token */
			addSubscriber(access_token => {
				errorResponse.config.headers.Authorization = 'Bearer ' + access_token;
				resolve(axios(errorResponse.config));
			});
		});
		if (!isAlreadyFetchingAccessToken) {
			isAlreadyFetchingAccessToken = true;
			// const response = await axios({
			// 	method  : 'get',
			// 	url     : `${API_URL}/refresh`,
			// 	headers : {
			// 		Authorization : 'Bearer ' + getRefreshToken()
			// 	}
			// });

			const response = await refreshAccessTokenViaAPI();

			// if (!response.data) {
			if (!response.status === 'success') {
				return Promise.reject(error);
			}
			const newToken = response.access_token;
			// TokenUtils.saveRefreshToken(newToken); // save the newly refreshed token for other requests to use
			// console.log('new access token', newToken);
			isAlreadyFetchingAccessToken = false;
			onAccessTokenFetched(newToken);
		}
		return retryOriginalRequest;
	} catch (err) {
		return Promise.reject(err);
	}
}

function onAccessTokenFetched(access_token) {
	// When the refresh is successful, we start retrying the requests one by one and empty the queue
	subscribers.forEach(callback => callback(access_token));
	subscribers = [];
}

function addSubscriber(callback) {
	subscribers.push(callback);
}
