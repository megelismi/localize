export const CREATE_NEW_USER_SUCCESS = 'CREATE_NEW_USER_SUCCESS';
export const createNewUserSuccess = user => ({
  type: CREATE_NEW_USER_SUCCESS,
  user 
});

export const CREATE_NEW_USER_ERROR = 'CREATE_NEW_USER_ERROR';
export const createNewUserError = error => ({
  type: CREATE_NEW_USER_ERROR,
  error
});