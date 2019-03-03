import { FETCH_SHOWS, FETCH_SHOW_DETAILS, GET_WATCHLIST, RESET_SHOW_PAGE, FETCH_POPULAR_SHOWS, RESET_SHOWS } from './types'

import { BASE_URL } from './index'

export const getShows = () => (dispatch, getState) => {
	if (getState().searchTerm) {
		const uriEncode = encodeURIComponent(getState().searchTerm)

		fetch(`${BASE_URL}/apishows?query=${uriEncode}`)
			.then(res => res.json())
			.then(shows =>
				dispatch({
					type: FETCH_SHOWS,
					payload: shows
				})
			);
	}
}

export const getPopularShows = () => dispatch => {
	fetch(`${BASE_URL}/apishows/popular`)
	.then(res => res.json())
	.then(shows => 
		dispatch({
			type: FETCH_POPULAR_SHOWS,
			payload: shows
		})
	);
}

export const getShowDetails = showId => dispatch => {
	fetch(`${BASE_URL}/apishows/${showId}`)
		.then(res => res.json())
		.then(show =>
			dispatch({
				type: FETCH_SHOW_DETAILS,
				payload: show
			})
		)
}

export const getWatchList = () => dispatch => {
	const token = localStorage.token
	fetch(`${BASE_URL}/shows`, {
		method: 'GET',
        headers: {
			'Authentication': `Bearer ${token}`
		}
	})
	.then(res => res.json())
	.then(response => dispatch({
		type: GET_WATCHLIST,
		payload: response
	}))
}

export const resetShowPage = () => dispatch => {
	return dispatch({
		type: RESET_SHOW_PAGE
	})
}

export const resetShows = () => dispatch => {
	return dispatch({
		type: RESET_SHOWS
	})
}
