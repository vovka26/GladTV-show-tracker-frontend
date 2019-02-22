import { combineReducers } from 'redux';
import { FETCH_SHOWS, FETCH_SHOW_DETAILS, SET_SEARCH_TERM } from './actions/types'

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
        default: 
            return state;
    }
}

const showDetails = (state={}, action) => {
    switch (action.type){
        case FETCH_SHOW_DETAILS:
            return action.payload;
        default: 
            return state;
    }
}

export default combineReducers({
    shows,
    showDetails,
    searchTerm
})

