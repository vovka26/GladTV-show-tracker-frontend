import { BASE_URL } from './index'
import { SET_CURRENT_USER, USER_LOGOUT, ADDING_SHOW_TO_WATCHLIST } from './types';

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
    debugger
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
    const { name, vote_average, genres, id, poster_path  } = show
    debugger
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
            genre: genres[0],
            api_id: id,
            image_url: poster_path
		})
	})
		.then(res => res.json())
		.then(response => dispatch({
			type: ADDING_SHOW_TO_WATCHLIST,
			payload: response
		}))
}

export { userLogin, setUser, checkToken, userLogout, createUser, addShowToUserWatchlist }
