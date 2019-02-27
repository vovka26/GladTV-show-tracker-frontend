import { SET_SEARCH_TERM, CLEAR_SEARCH_TERM } from './types'

export const setSearchTerm = (searchTerm) => {
	return {
		type: SET_SEARCH_TERM, 
		payload: searchTerm
	}
}

export const clearSearchTerm = () => {
	return {
		type: CLEAR_SEARCH_TERM, 
		payload: ''
	}
}