import { BASE_URL } from './index';
import { FETCH_WATCHED_EPISODES } from './types';

export const gettingEpisodesForSeason = (showId) => dispatch => {
    fetch(`${BASE_URL}/shows/${showId}/episodes`, {
        method: 'GET',
        headers: {
			'Authentication': `Bearer ${localStorage.token}`
        }
    })
    .then(res=>res.json())
    .then(response => gotEpisodesForSeason(response, dispatch))
}

const gotEpisodesForSeason = (response, dispatch) => {
    if (response.error) {
        console.log('user does not have any episodes')
    }else{
        dispatch({
            type: FETCH_WATCHED_EPISODES, 
            payload: response.episodes
        })
    }
} 

// const gettingWatchedEpisodes = () => dispatch => {

// }