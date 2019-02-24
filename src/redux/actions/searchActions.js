import { SET_SEARCH_TERM, CLEAR_SEARCH_TERM } from './types'

const setSearchTerm = (searchTerm) => {
	return {
		type: SET_SEARCH_TERM, 
		payload: searchTerm
	}
}

const clearSearchTerm = () => {
	return {
		type: CLEAR_SEARCH_TERM, 
		payload: ''
	}
}

export { setSearchTerm, clearSearchTerm }