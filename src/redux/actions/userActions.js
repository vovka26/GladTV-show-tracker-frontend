import { BASE_URL } from './index'
import { SET_CURRENT_USER, USER_LOGOUT } from './types';

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

//helper method to check if the login and password are valid
const setUser = (response, dispatch) => {
    if (response['success']) {
        
       localStorage.setItem('token', response['token'])
        dispatch({
            type: SET_CURRENT_USER, 
            payload: response['userData']
        })
    }else{
        console.log(response)
    }
}

const getUserWithToken = token => dispatch => {
    fetch(`${BASE_URL}/profile`,{
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

export { userLogin, setUser, getUserWithToken, userLogout, createUser }
