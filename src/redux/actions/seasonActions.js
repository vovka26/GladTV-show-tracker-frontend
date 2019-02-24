import { FETCH_SEASON_EPISODES, CLEAR_FETCHED_EPISODE } from './types'

import { BASE_URL } from './index'

const getSeasonDetails = (showId, seasonId) => dispatch => {
    fetch(`${BASE_URL}/seasons/${showId}/${seasonId}`)
        .then(res => res.json())
        .then(season => 
            dispatch({
                type: FETCH_SEASON_EPISODES,
                payload: season
            })
        )
}

const clearSeasonDetails = () => dispatch => {
    dispatch({
        type: CLEAR_FETCHED_EPISODE, 
        payload: null
    })
}

export { getSeasonDetails, clearSeasonDetails }