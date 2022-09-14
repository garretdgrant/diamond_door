import { SET_COMPANY } from "./companies";
import csrfFetch from "./csrf";

export const REMOVE_INTERVIEW = 'REMOVE_INTERVIEW';
export const ADD_INTERVIEW = 'ADD_INTERVIEW'

const addInterview = (payload)=>({
  type: ADD_INTERVIEW,
  payload
})

const removeInterview = (payload) =>({
  type: REMOVE_INTERVIEW,
  payload
})

export const createInterview = (payload) => async dispatch => {
  const response = await csrfFetch(`/api/interviews`, {
    method: 'POST',
    body: JSON.stringify(payload)
  })
  const data = await response.json();
  dispatch(addInterview(data.interview))
}

export const updateInterview = (interview) => async dispatch => {
  const response = await csrfFetch(`/api/interviews/${interview.id}`, {
    method: 'PATCH',
    body: JSON.stringify(interview)
  })
  const payload = await response.json();
  debugger
  dispatch(addInterview(payload))
}

export const deleteInterview = (interviewId) => async dispatch => {
  
  const response = await csrfFetch(`/api/interviews/${interviewId}`,
  {method: 'DELETE'});
  const payload = await response.json();
  dispatch(removeInterview(interviewId))
  return response;
}

export const fetchInterview = (interviewId) => async dispatch => {
  const response = await fetch(`/api/interviews/${interviewId}`);
  const payload = await response.json();
  dispatch(addInterview(payload))
  return response;
}


const interviewsReducer = (state = {}, action) => {
    Object.freeze(state);
    const nextState = { ...state };
  
    switch(action.type) {
      case SET_COMPANY:
        return {...action.payload.interviews}
      case REMOVE_INTERVIEW:
        delete nextState[action.payload]
        return nextState;
      case ADD_INTERVIEW:
       return {...nextState, [action.payload.id]: action.payload}
      default:
        return nextState;
    }
}

export default interviewsReducer;