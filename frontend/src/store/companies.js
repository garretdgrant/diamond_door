import csrfFetch from "./csrf"

export const SET_COMPANIES = 'SET_COMPANIES'
export const SET_COMPANY = 'SET_COMPANY'


export const setCompanies =(payload) => ({
    type: SET_COMPANIES,
    payload
})

export const setCompany = (payload) => ({
  type: SET_COMPANY,
  payload
})




export const fetchCompanies = () => async dispatch => {
    const response = await fetch("/api/companies");
    const payload = await response.json();
    dispatch(setCompanies(payload))
    return response;
}

export const fetchCompany = (companyId) => async dispatch => {
  const response = await fetch(`/api/companies/${companyId}`);
  const payload = await response.json();
  dispatch(setCompany(payload))
  return response;
}
  
const companiesReducer = (state = {}, action) => {
    Object.freeze(state);
    const nextState = { ...state };
  
    switch(action.type) {
      case SET_COMPANIES:
        return {...action.payload };
      case SET_COMPANY:
        // return {...nextState,...action.payload}
        console.log(action.payload)
        nextState[action.payload.company.id] = action.payload.company
        return nextState
      default:
        return nextState;
    }
}

export default companiesReducer;