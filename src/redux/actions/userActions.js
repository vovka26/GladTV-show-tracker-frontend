import { BASE_URL } from './index'
import { SET_CURRENT_USER, USER_LOGOUT, ADDING_SHOW_TO_WATCHLIST, DELETING_SHOW_FROM_WATCHLIST } from './types';

const userLogin = (username, password) => dispatch => {
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

const userLogout = () => dispatch => {
    localStorage.clear()
    dispatch ({
        type: USER_LOGOUT
    })
}

const setUser = (response, dispatch) => {
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

const checkToken = token => dispatch => {
    fetch(`${BASE_URL}/profile`, {
        method: 'GET',
        headers: {
            'Authentication': `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(data => setUser(data, dispatch))
}

const createUser = formData => dispatch => {
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

const addShowToUserWatchlist = show => dispatch => {
	const token = localStorage.token
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
                type: ADDING_SHOW_TO_WATCHLIST,
                payload: response
            })
        }
    }

const deleteShowFromWatchlist = (showId) => dispatch => {
    const token = localStorage.token
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
            type: DELETING_SHOW_FROM_WATCHLIST,
            payload: response.showData[0]
        })
    }
}

export { userLogin, setUser, checkToken, userLogout, createUser, addShowToUserWatchlist,deleteShowFromWatchlist }
