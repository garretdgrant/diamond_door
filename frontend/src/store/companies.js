import csrfFetch from "./csrf"

export const SET_COMPANIES = 'SET_COMPANIES'


export const setCompanies =(payload) => ({
    type: SET_COMPANIES,
    payload
})




export const fetchCompanies = () => async dispatch => {
    const response = await fetch("/api/companies");
    const payload = await response.json();
    dispatch(setCompanies(payload))
    return response;
}

  
const companiesReducer = (state = {}, action) => {
    Object.freeze(state);
    const nextState = { ...state };
  
    switch(action.type) {
      case SET_COMPANIES:
        return {...action.payload };
      default:
        return nextState;
    }
}

export default companiesReducer;