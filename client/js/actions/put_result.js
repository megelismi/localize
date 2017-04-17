export const UPDATE_USER_DETAILS_ERROR = 'UPDATE_USER_DETAILS_ERROR';
export const updateUserDetailsError = error => ({
  type: UPDATE_USER_DETAILS_ERROR,
  error
});

export const UPDATE_USER_DETAILS_SUCCESS = 'UPDATE_USER_DETAILS_SUCCESS';
export const updateUserDetailsSuccess = user => ({
  type: UPDATE_USER_DETAILS_SUCCESS,
  user 
});

