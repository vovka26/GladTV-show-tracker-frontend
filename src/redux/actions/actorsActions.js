import { BASE_URL } from './index'
import { FETCH_ACTOR_DETAILS, RESET_ACTOR_DETAILS } from './types'

export const gettingActorDetails = actorId => dispatch => {
    fetch(`${BASE_URL}/actors/${actorId}`)
		.then(res => res.json())
		.then(actorData => dispatch({
            type: FETCH_ACTOR_DETAILS,
            payload: actorData
        }))
}

export const clearActorDetails = () => dispatch => {
  dispatch({
    type: RESET_ACTOR_DETAILS
  })
}