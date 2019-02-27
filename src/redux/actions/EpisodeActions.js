import { BASE_URL } from './index';
import { FETCH_WATCHED_EPISODES } from './types';

const token = localStorage.token

export const gettingEpisodesForSeason = (showId, seasonId) => dispatch => {
    fetch(`${BASE_URL}/shows/${showId}/${seasonId}/episodes`, {
        method: 'GET',
        headers: {
			'Authentication': `Bearer ${token}`
        }
    })
    .then(res=>res.json())
    .then(response => gotEpisodesForSeason(response, dispatch))
}

const gotEpisodesForSeason = (response, dispatch) => {
    if (response.error) {
        alert('elements were not recieved')
    }else{
        dispatch({
            type: FETCH_WATCHED_EPISODES, 
            payload: response.episodes
        })
    }
} 