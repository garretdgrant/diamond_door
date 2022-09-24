import csrfFetch from "./csrf";
import { setCurrentUser, SET_USER } from "./session";

export const ADD_FOLLOW = 'ADD_FOLLOW';
export const REMOVE_FOLLOW = 'REMOVE_FOLLOW';

// action creators

export const addFollow = (payload) =>({
    type:  ADD_FOLLOW,
    payload
})

export const removeFollow = (followId) => ({
    type: REMOVE_FOLLOW,
    payload: followId
})

export const createFollow = (payload) => async dispatch =>{
    const response = await  csrfFetch(`/api/follows`, {
        method: 'POST',
        body: JSON.stringify(payload)
      })
      const data = await response.json();
      dispatch(addFollow(data.follow))
}

export const deleteFollow = (followId) => async dispatch => {
  
    const response = await csrfFetch(`/api/follows/${followId}`,
    {method: 'DELETE'});
    const payload = await response.json();
    dispatch(removeFollow(followId))
    return response;
  }

  export const fetchFollows = (userId) => async dispatch =>{
    const response = await fetch(`/api/users/${userId}`)
    const payload = await response.json()
    dispatch(setCurrentUser(payload))
  }

  const followsReducer = (state = null, action) => {
    Object.freeze(state);
    const nextState = { ...state };
    switch(action.type) {
      case SET_USER:
        // debugger
        if(!action.payload) return null
        return{...nextState,...action.payload.follows}
      case REMOVE_FOLLOW:
        delete nextState[action.payload]
        return nextState;
      case ADD_FOLLOW:
       return {...nextState, [action.payload.id]: action.payload}
      default:
        return nextState;
    }
}

export default followsReducer;