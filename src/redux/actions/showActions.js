import { FETCH_SHOWS, FETCH_SHOW_DETAILS } from './types'

import { BASE_URL } from './index'

const getShows = () => (dispatch, getState) => {
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

const getShowDetails = showId => dispatch => {
	fetch(`${BASE_URL}/apishows/${showId}`)
		.then(res => res.json())
		.then(show =>
			dispatch({
				type: FETCH_SHOW_DETAILS,
				payload: show
			})
		)
}

// const saveShowToWatchlist = () => dispatch => {
// 	fetch(`${BASE_URL}/watchlist `)
// }

export { getShows, getShowDetails }