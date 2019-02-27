import { BASE_URL } from './index'
import { SET_CURRENT_USER, USER_LOGOUT, ADD_SHOW_TO_WATCHLIST, DELETE_SHOW_FROM_WATCHLIST, ADD_EPISODE_TO_WATCHLIST, DELETE_EPISODE_FROM_WATCHLIST } from './types';

const token = localStorage.token

export const userLogin = (username, password) => dispatch => {
    fetch(`${BASE_URL}/login`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(res => res.json())
    .then(response => setUser(response, dispatch))
}

export const userLogout = () => dispatch => {
    localStorage.clear()
    dispatch ({
        type: USER_LOGOUT
    })
}

export const setUser = (response, dispatch) => {
    if (response['success'] && response['token']) {
       localStorage.setItem('token', response['token'])
        dispatch({
            type: SET_CURRENT_USER, 
            payload: response['userData']
        })
    }else if(response['success']){
        dispatch({
            type: SET_CURRENT_USER,
            payload: response['userData']
        })
    }else{
        alert('something went wrong')
    }
}

export const checkToken = () => dispatch => {
    fetch(`${BASE_URL}/profile`, {
        method: 'GET',
        headers: {
            'Authentication': `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(data => setUser(data, dispatch))
}

export const createUser = formData => dispatch => {
    const {username, password, firstName, lastName} = formData
    
    fetch(`${BASE_URL}/newUser`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }, 
        body: JSON.stringify({
            user: {
                username: username.toLowerCase(), 
                password, 
                first_name: firstName,
                last_name: lastName
            }
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            alert(data.error)
        }else {
            setUser(data, dispatch)
        }
    })
}

export const addShowToUserWatchlist = show => dispatch => {
    const { name, vote_average, genres='N/A', id, poster_path  } = show
	fetch(`http://localhost:3000/api/v1/shows`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authentication': `Bearer ${token}`
		},
		body: JSON.stringify({
            title: name,
            rating: vote_average, 
            genre: genres[0].name,
            api_id: id,
            episodes: [],
            image_url: poster_path
		})
	})
		.then(res => res.json())
		.then(response => addingShowToWatchlist(response, dispatch))
}

const addingShowToWatchlist = (response, dispatch) => {
    if (response.error) {
        alert('You are already following this show')
    }else{
        dispatch({
                type: ADD_SHOW_TO_WATCHLIST,
                payload: response
            })
        }
    }

export const deleteShowFromWatchlist = (showId) => dispatch => {
    fetch(`http://localhost:3000/api/v1/shows/${showId}`, {
        method: 'DELETE',
        headers: {
            'Authentication': `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(response => deletingShowFromWatchlist(response, dispatch))
}

const deletingShowFromWatchlist = (response, dispatch) => {
    if (response.error) {
        alert('something went wrong')
    }else{
        dispatch({
            type: DELETE_SHOW_FROM_WATCHLIST,
            payload: response.showData[0]
        })
    }
}

export const addingEpisodeToWatchlist = (episode, seasonId) => dispatch => {
    
    fetch(`http://localhost:3000/api/v1/episodes`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authentication': `Bearer ${token}`
		},
		body: JSON.stringify({
            title: episode.name,
            image_url: episode.still_path,
           	air_date: episode.air_date,
			show_id: episode.show_id,
            season_id: seasonId,
            api_id: episode.id
		})
	})
		.then(res => res.json())
		.then(response => addEpisodeToWatchlist(response, dispatch))
}

const addEpisodeToWatchlist = (response, dispatch) => {
    console.log(response)
    dispatch({
            type: ADD_EPISODE_TO_WATCHLIST, 
            payload: response.episodeData
        })
}

export const deleteingEpisodeFromWatchList = episodeId => dispatch => {
    fetch(`http://localhost:3000/api/v1/episodes/${episodeId}`, {
        method: 'DELETE',
        headers: {
            'Authentication': `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(response => deleteEpisodeFromWatchlist(response, dispatch))
}

const deleteEpisodeFromWatchlist = (response, dispatch) => {
    console.log(response)
    dispatch({
        type: DELETE_EPISODE_FROM_WATCHLIST, 
        payload: response.episodeData
    })
}