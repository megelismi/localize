
export const CREATE_NEW_USER_ERROR = 'CREATE_NEW_USER_ERROR';
export const createNewUserError = error => ({
  type: CREATE_NEW_USER_ERROR,
  error
});

export const CREATE_NEW_USER_SUCCESS = 'CREATE_NEW_USER_SUCCESS';
export const createNewUserSuccess = user => ({
  type: CREATE_NEW_USER_SUCCESS,
  user
});

export const GET_LOCATIONS_FOR_TAGS_ERROR = 'GET_LOCATIONS_FOR_TAGS_ERROR';
export const getLocationsForTagsError = error => ({
  type: GET_LOCATIONS_FOR_TAGS_ERROR, 
  error
});

export const GET_LOCATIONS_FOR_TAGS_SUCCESS = 'GET_LOCATIONS_FOR_TAGS_SUCCESS';
export const getLocationsForTagsSuccess = filteredLocations => ({
  type: GET_LOCATIONS_FOR_TAGS_SUCCESS, 
  filteredLocations
});

export const GET_SELECTED_LOCATION_REVIEWS_ERROR = 'GET_SELECTED_LOCATION_REVIEWS_ERROR';
export const getSelectedLocationReviewsError = error => ({
  type: GET_SELECTED_LOCATION_REVIEWS_ERROR, 
  error
});

export const GET_SELECTED_LOCATION_REVIEWS_SUCCESS = 'GET_SELECTED_LOCATION_REVIEWS_SUCCESS';
export const getSelectedLocationReviewsSuccess = reviews => ({
  type: GET_SELECTED_LOCATION_REVIEWS_SUCCESS, 
  reviews
});

export const GET_RELEVANT_TAGS_ERROR = 'GET_RELEVANT_TAGS_ERROR';
export const getRelevantTagsError = error => ({
  type: GET_RELEVANT_TAGS_ERROR, 
  error
});

export const GET_RELEVANT_TAGS_SUCCESS = 'GET_RELEVANT_TAGS_SUCCESS';
export const getRelevantTagsSuccess = tags => ({
  type: GET_RELEVANT_TAGS_SUCCESS, 
  tags
});

export const LOG_OUT_ERROR = 'LOG_OUT_ERROR';
export const logOutError = error => ({
  type: LOG_OUT_ERROR,
  error
});

export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const logOutSuccess = () => ({
  type: LOG_OUT_SUCCESS
});

export const SAVE_MAP_ERROR = 'SAVE_MAP_ERROR';
export const saveMapError = () => ({
  type: SAVE_MAP_ERROR
});

export const SAVE_MAP_SUCCESS = 'SAVE_MAP_SUCCESS';
export const saveMapSuccess = () => ({
  type: SAVE_MAP_SUCCESS
});

export const SIGN_IN_USER_ERROR = 'SIGN_IN_USER_ERROR';
export const signInUserError = error => ({
  type: SIGN_IN_USER_ERROR,
  error
});

export const SIGN_IN_USER_SUCCESS = 'SIGN_IN_USER_SUCCESS';
export const signInUserSuccess = user => ({
  type: SIGN_IN_USER_SUCCESS,
  user
});
