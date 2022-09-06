import csrfFetch from "./csrf"

export const SET_USER = 'SET_USER'
export const REMOVE_USER = 'REMOVE_USER'

export const setCurrentUser =(payload) => ({
    type: SET_USER,
    payload
})

export const removeCurrentUser = () => ({
    type: REMOVE_USER
})


const storeCSRFToken = response => {
    const csrfToken = response.headers.get("X-CSRF-Token");
    if (csrfToken) sessionStorage.setItem("X-CSRF-Token", csrfToken);
  }
  
  const storeCurrentUser = user => {
    if (user) sessionStorage.setItem("currentUser", JSON.stringify(user));
    else sessionStorage.removeItem("currentUser");
  }
  
  export const login = ({ email, password }) => async dispatch => {
    const response = await csrfFetch("/api/session", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    return response;
  };

  export const signup = (user) => async dispatch => {
    const response = await csrfFetch("/api/users", {
        method: "POST",
        body: JSON.stringify({user})
      });
      const data = await response.json();
      storeCurrentUser(data.user);
      dispatch(setCurrentUser(data.user));
      return response;
  }
  
  export const restoreSession = () => async dispatch => {
    const response = await csrfFetch("/api/session");
    storeCSRFToken(response);
    const data = await response.json();
    storeCurrentUser(data.user);
    dispatch(setCurrentUser(data.user));
    return response;
  };
  
  export const logout = () => async (dispatch) => {
    const response = await csrfFetch("/api/session", {
      method: "DELETE"
    });
    storeCurrentUser(null);
    dispatch(removeCurrentUser());
    return response;
  };
    
    const initialState = { 
      user: JSON.parse(sessionStorage.getItem("currentUser"))
    };

const sessionReducer = (state = initialState, action) => {
    Object.freeze(state);
    const nextState = { ...state };
  
    switch(action.type) {
      case SET_USER:
        return {user: {...action.payload }};
      case REMOVE_USER:
      return { user: null };
      default:
        return nextState;
    }
}

export default sessionReducer;