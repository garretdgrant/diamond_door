import { SET_COMPANY } from "./companies";

const reviewsReducer = (state = {}, action) => {
    Object.freeze(state);
    const nextState = { ...state };
  
    switch(action.type) {
      case SET_COMPANY:
        return {...action.payload.reviews}
      default:
        return nextState;
    }
}

export default reviewsReducer;