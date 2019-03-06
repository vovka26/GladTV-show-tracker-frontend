import { FETCH_SHOWS, FETCH_SHOW_DETAILS, GET_WATCHLIST, RESET_SHOW_PAGE, FETCH_POPULAR_SHOWS, FETCH_SIMILAR_SHOWS, FETCH_MORE_SIMILAR_SHOWS, RESET_SHOWS, FETCH_MORE_SHOWS } from './types'

import { BASE_URL } from './index'

export const getShows = (pageNum=null) => (dispatch, getState) => {
	if (getState().searchTerm) {
		const uriEncode = encodeURIComponent(getState().searchTerm)
		fetch(`${BASE_URL}/apishows?query=${uriEncode}&page=${pageNum}`)
			.then(res => res.json())
			.then(shows =>
				dispatch({
					type: FETCH_SHOWS,
					payload: shows
				})
			);
	}
}

export const getMoreShows = (pageNum=2) => (dispatch, getState) => {
	if (getState().searchTerm) {
		const uriEncode = encodeURIComponent(getState().searchTerm)
		fetch(`${BASE_URL}/apishows?query=${uriEncode}&page=${pageNum}`)
			.then(res => res.json())
			.then(shows =>
				dispatch({
					type: FETCH_MORE_SHOWS,
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

export const getSimilarShows = (showId, pageNum=1) => dispatch => {
	fetch(`${BASE_URL}/apishows/similar/${showId}?page=${pageNum}`)
		.then(res => res.json())
		.then(shows => 
			dispatch({
				type: FETCH_SIMILAR_SHOWS,
				payload: shows
			})
		)
}

export const getMoreSimilarShows = (showId, pageNum=2) => dispatch => {
	fetch(`${BASE_URL}/apishows/similar/${showId}?page=${pageNum}`)
	.then(res => res.json())
	.then(shows => 
		dispatch({
			type: FETCH_MORE_SIMILAR_SHOWS,
			payload: shows
		})
	)
}

export const getWatchList = () => dispatch => {
	fetch(`${BASE_URL}/shows`, {
		method: 'GET',
        headers: {
			'Authentication': `Bearer ${localStorage.token}`
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
