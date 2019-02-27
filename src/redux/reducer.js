import { combineReducers } from 'redux';
import { FETCH_SHOWS, FETCH_SHOW_DETAILS, SET_SEARCH_TERM, CLEAR_SEARCH_TERM, FETCH_SEASON_EPISODES, CLEAR_FETCHED_EPISODE, SET_CURRENT_USER, USER_LOGOUT, ADD_SHOW_TO_WATCHLIST, DELETE_SHOW_FROM_WATCHLIST, GET_WATCHLIST, ADD_EPISODE_TO_WATCHLIST, DELETE_EPISODE_FROM_WATCHLIST, FETCH_WATCHED_EPISODES } from './actions/types'

const shows = (state='', action) => {
    switch(action.type){

        case FETCH_SHOWS: 
            return action.payload.results

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

const showDetails = (state='', action) => {
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

const watchList = (state=[], action) => {
    switch (action.type) {

        case GET_WATCHLIST:
            return action.payload

        case ADD_SHOW_TO_WATCHLIST:
            return [...state, action.payload.showData]

        case DELETE_SHOW_FROM_WATCHLIST: 
            const copy = state.slice()
            const index = state.findIndex(show => show.id === action.payload.id)
            copy.splice(index, 1)
            return [...copy]

        default:
            return state
    }
}

const episodes = (state=[], action) => {
    switch(action.type){
        case FETCH_WATCHED_EPISODES: 
            return action.payload

        case ADD_EPISODE_TO_WATCHLIST: 
            return [...state, action.payload]

        case DELETE_EPISODE_FROM_WATCHLIST:
            const copy = state.slice()
            const index = state.findIndex(episode => episode.id === action.payload.id)
            copy.splice(index, 1)
        return [...copy]

        default: 
            return state
    }
}


export default combineReducers({
    shows,
    showDetails,
    searchTerm,
    seasonDetails, 
    currentUser,
    watchList,
    episodes
})

