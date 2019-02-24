import { combineReducers } from 'redux';
import { FETCH_SHOWS, FETCH_SHOW_DETAILS, SET_SEARCH_TERM, CLEAR_SEARCH_TERM, FETCH_SEASON_EPISODES, CLEAR_FETCHED_EPISODE, SET_CURRENT_USER, USER_LOGOUT } from './actions/types'

const shows = (state=[], action) => {
    switch(action.type){
        case FETCH_SHOWS: 
            return {
                ...state, 
                shows: action.payload.results
            }
        default:
            return state;
    }
}

const searchTerm = (state='', action) => {
    switch (action.type) {
        case SET_SEARCH_TERM:
            return action.payload;
        case CLEAR_SEARCH_TERM: 
            return action.payload;
        default: 
            return state;
    }
}

const showDetails = (state=null, action) => {
    switch (action.type){
        case FETCH_SHOW_DETAILS:
            return action.payload;
        default: 
            return state;
    }
}

const seasonDetails = (state=null, action) => {
    switch (action.type) {
        case FETCH_SEASON_EPISODES:
            return action.payload;
        case CLEAR_FETCHED_EPISODE:
            return action.payload;
        default: 
            return state;
    }
}

const currentUser = (state=null, action) => {
    switch (action.type) {
        case SET_CURRENT_USER: 
            return action.payload;
        case USER_LOGOUT: 
            return null;
        default:
            return state;
    }
}


export default combineReducers({
    shows,
    showDetails,
    searchTerm,
    seasonDetails, 
    currentUser
})

