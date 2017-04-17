import * as put_result from './put_result.js';

export const updateUserDetails = (token, detail, userId) => dispatch => {
  return fetch(`/account/${userId}/update`, {
    method: 'put', 
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(detail)
  }).then(res => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json(); 
  }).then(res => {
    dispatch(put_result.updateUserDetailsSuccess(res));
  }).catch(err => {
    dispatch(put_result.updateUserDetailsError(err));
  });
};
