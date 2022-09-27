import csrfFetch from "./csrf"
import { logout, removeCurrentUser } from "./session";


export const deleteUser = (userId) => async dispatch => {
  await dispatch(logout())
  const response = await csrfFetch(`/api/users/${userId}`,
  {method: 'DELETE'})
  const payload = await response.json();
  return response;
}

const updateUser = (user) => async dispatch => {
    const res = await csrfFetch(`/api/users/${user.id}`, {
        method: 'PATCH',
        body: JSON.stringify(user)
      })
      if (res.ok){
         const payload = await res.json();
         return payload;
      } 
      return res;
}

export default updateUser;