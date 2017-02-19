export const UPDATE_USER_DETAIL_SUCCESS = 'UPDATE_USER_DETAIL_SUCCESS';
export const updateUserDetailSuccess = user => ({
  type: UPDATE_USER_DETAIL_SUCCESS,
  user 
});

export const UPDATE_USER_DETAIL_ERROR = 'UPDATE_USER_DETAIL_ERROR';
export const updateUserDetailError = error => ({
  type: UPDATE_USER_DETAIL_ERROR,
  error
});
