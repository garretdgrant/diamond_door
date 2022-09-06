import csrfFetch from "./csrf"

export const SET_USER = 'SET_USER'
export const REMOVE_USER = 'REMOVE_USER'

export const setUser =(payload) => ({
    type: SET_USER,
    payload
})

export const removeUser = (payload) => ({
    type: REMOVE_USER,
    payload
})

export const login = (user) => async dispatch =>{
    const {email, password} = user;
    const res = await csrfFetch('api/session',{
        method: "POST",
        body: JSON.stringify({email, password})
    });
    let payload = await res.json();
    dispatch(setUser(payload.user))
    return res;
}


export const logout = (userId) => async dispatch => {
    await csrfFetch('api/sission',{
        method: 'DELETE'
    });
    dispatch(removeUser(userId))
}

let currentUser = sessionStorage.getItem('currentUser');
let initialState;
if (currentUser) {
  initialState = { user: JSON.parse(currentUser) };
} else {
  initialState = { user: null };
}


const sessionReducer = (state = initialState, action) => {
    Object.freeze(state);
    const nextState = { ...state };
  
    switch(action.type) {
      case SET_USER:
        return { ...action.payload };
      case REMOVE_USER:
        return { user: null };
      default:
        return nextState;
    }
}

export default sessionReducer;