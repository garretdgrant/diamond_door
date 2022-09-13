import { SET_COMPANY } from "./companies";
import csrfFetch from "./csrf";

export const REMOVE_REVIEW = 'REMOVE_REVIEW';
export const ADD_REVIEW = 'ADD_REVIEW'

const addReview = (payload)=>({
  type: ADD_REVIEW,
  payload
})

const removeReview = (payload) =>({
  type: REMOVE_REVIEW,
  payload
})

export const createReview = (payload) => async dispatch => {
  const response = await csrfFetch(`/api/reviews`, {
    method: 'POST',
    body: JSON.stringify(payload)
  })
  const data = await response.json();
  dispatch(addReview(data))
}

export const updateReview = (review) => async dispatch => {
  const response = await csrfFetch(`/api/reviews/${review.id}`, {
    method: 'PATCH',
    body: JSON.stringify(review)
  })
  const payload = await response.json();
  debugger
  dispatch(addReview(payload))
}

export const deleteReview = (reviewId) => async dispatch => {
  
  const response = await csrfFetch(`/api/reviews/${reviewId}`,
  {method: 'DELETE'});
  const payload = await response.json();
  dispatch(removeReview(reviewId))
  return response;
}



const reviewsReducer = (state = {}, action) => {
    Object.freeze(state);
    const nextState = { ...state };
  
    switch(action.type) {
      case SET_COMPANY:
        return {...action.payload.reviews}
      case REMOVE_REVIEW:
        delete nextState[action.payload]
        return nextState;
      case ADD_REVIEW:
       return {...nextState, [action.payload.review.id]: action.payload.review}
      default:
        return nextState;
    }
}

export default reviewsReducer;