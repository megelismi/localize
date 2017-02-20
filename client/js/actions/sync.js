export const ADD_LOCATION_TO_LOCALS_MAP = 'ADD_LOCATION_TO_LOCALS_MAP';
export const addLocationToLocalsMap = (feature, lat_long, short, long, image = null) => ({
  type: ADD_LOCATION_TO_LOCALS_MAP,
  feature,
  lat_long,
  short,
  long,
  image
});

export const GET_SEARCH_RESULTS = 'GET_SEARCH_RESULTS';
export const getSearchResults = (feature, lat_long) => ({
  type: GET_SEARCH_RESULTS,
  feature,
  lat_long
});

//////////////////////////////////////////////////////////////////////////

export const FILTER_BY_TAG = 'FILTER_BY_TAG';
export const filterByTag = tag => ({
  type: FILTER_BY_TAG,
  tag
});

export const CLEAR_ALL_APPLIED_TAGS = 'CLEAR_ALL_APPLIED_TAGS';
export const clearAllAppliedTags = boolean => ({
  type: CLEAR_ALL_APPLIED_TAGS,
  user_is_selected: boolean
});

export const SELECT_USER = 'SELECT_USER';
export const selectUser = user => ({
  type: SELECT_USER,
  user
});

export const SELECT_LOCATION_BY_ID = 'SELECT_LOCATION_BY_ID';
export const selectLocationById = id => ({
  type: SELECT_LOCATION_BY_ID,
  id
});

export const FILTER_TAGS_BY_SELECTED_LOCATIONS = 'FILTER_TAGS_BY_SELECTED_LOCATIONS';
export const filterTagsBySelectedLocations = () => ({
  type: FILTER_TAGS_BY_SELECTED_LOCATIONS
});

export const FILTER_TAGS_BY_USER = 'FILTER_TAGS_BY_USER';
export const filterTagsByUser = () => ({
  type: FILTER_TAGS_BY_USER
});

export const FILTER_LOCATIONS_BY_USER = 'FILTER_LOCATIONS_BY_USER';
export const filterLocationsByUser = user => ({
  type: FILTER_LOCATIONS_BY_USER,
  user
});

export const DESELECT_USER = 'DESELECT_USER';
export const deselectUser = () => ({
  type: DESELECT_USER
});

export const SIGN_UP_MODAL = 'SIGN_UP_MODAL';
export const signUpModal = () => ({
  type: SIGN_UP_MODAL
});

export const SIGN_IN_MODAL = 'SIGN_IN_MODAL'; 
export const signInModal = () => ({
  type: SIGN_IN_MODAL
});

export const UPDATE_USER_DETAILS_MODAL = 'UPDATE_USER_DETAILS_MODAL'; 
export const updateUserDetailsModal = () => ({
  type: UPDATE_USER_DETAILS_MODAL
});

export const UPDATE_PROFILE_PICTURE_MODAL = 'UPDATE_PROFILE_PICTURE_MODAL';
export const updateProfilePictureModal = () => ({
  type: UPDATE_PROFILE_PICTURE_MODAL
});

export const selectUserAndUpdateTags = user => (dispatch, getState) => {
  let currentUser = getState().selectedUser
  let currentUserLocations = getState().selectedUserLocations
  dispatch({
    type: SELECT_USER,
    user
  });
  if (currentUser !== getState().selectedUser) {
    dispatch({
      type: FILTER_LOCATIONS_BY_USER,
      user
    });
  }
  if (currentUserLocations !== getState().locationsFilteredByUser) {
    dispatch({
      type: FILTER_TAGS_BY_USER
    });
  }
}

export const filterLocations = () => (dispatch, getState) => {
  dispatch({
    type: FILTER_TAGS_BY_SELECTED_LOCATIONS
  });
  if (getState().allTags) {
    dispatch({
      type: FILTER_BY_TAG
    });
  }
}
