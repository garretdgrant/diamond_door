import { SET_COMPANY } from "./companies";
import csrfFetch from "./csrf";

export const REMOVE_REVIEW = 'REMOVE_REVIEW';

const removeReview = (payload) =>({
  type: REMOVE_REVIEW,
  payload
})

export const deleteReview = (reviewId) => async dispatch => {
  
  const response = await csrfFetch(`/api/reviews/${reviewId}`,
  {method: 'DELETE'});
  const payload = await response.json();
  console.log(payload)
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
      default:
        return nextState;
    }
}

export default reviewsReducer;