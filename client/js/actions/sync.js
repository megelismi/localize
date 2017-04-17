
export const ADD_LOCATION_TO_LOCALS_MAP = 'ADD_LOCATION_TO_LOCALS_MAP';
export const addLocationToLocalsMap = (user_id, feature, lat_long, short = null, long = null, tag_array = null) => ({
  type: ADD_LOCATION_TO_LOCALS_MAP,
  user_id,
  feature,
  lat_long,
  short,
  long,
  tag_array
});

export const ADD_SELECTED_TAG = 'ADD_SELECTED_TAG';
export const addSelectedTag = tagId => ({
  type: ADD_SELECTED_TAG,
  tagId
});

export const CLEAR_ALL_APPLIED_TAGS = 'CLEAR_ALL_APPLIED_TAGS';
export const clearAllAppliedTags = () => ({
  type: CLEAR_ALL_APPLIED_TAGS
});

export const DELETE_REVIEW_FROM_REDUX_STORE = 'DELETE_REVIEW_FROM_REDUX_STORE';
export const deleteReviewFromReduxStore = review => ({
  type: DELETE_REVIEW_FROM_REDUX_STORE,
  review
});

export const DESELECT_TAG = 'DESELECT_TAG'; 
export const deselectTag = selectedTags => ({
  type: DESELECT_TAG,
  selectedTags
});

export const DESELECT_USER = 'DESELECT_USER';
export const deselectUser = () => ({
  type: DESELECT_USER
});

export const EDIT_LOCATION_DETAIL_MODAL = 'EDIT_LOCATION_DETAIL_MODAL';
export const editLocationDetailModalFunction = boolean => ({
  type: EDIT_LOCATION_DETAIL_MODAL,
  boolean
});

export const FILTER_LOCATIONS_BY_TAGS = 'FILTER_LOCATIONS_BY_TAGS'; 
export const filterLocationsByTags = filteredLocations => ({
  type: FILTER_LOCATIONS_BY_TAGS, 
  filteredLocations
});

export const FILTER_LOCATIONS_BY_USER = 'FILTER_LOCATIONS_BY_USER';
export const filterLocationsByUser = filteredLocations => ({
  type: FILTER_LOCATIONS_BY_USER,
  filteredLocations
});

export const LOCATIONS_SAVED_MODAL = 'LOCATIONS_SAVED_MODAL';
export const locationsSavedModal = () => ({
  type: LOCATIONS_SAVED_MODAL
});

export const RESET_LOCATIONS = 'RESET_LOCATIONS';
export const resetLocations = () => ({
  type: RESET_LOCATIONS
});

export const SELECT_LOCATION_BY_ID = 'SELECT_LOCATION_BY_ID';
export const selectLocationById = id => ({
  type: SELECT_LOCATION_BY_ID,
  id
});

export const SELECT_USER = 'SELECT_USER';
export const selectUser = user => ({
  type: SELECT_USER,
  user
});

export const SHOW_UPLOAD_MODAL_FUNCTION = 'SHOW_UPLOAD_MODAL_FUNCTION';
export const showUploadModalFunction = boolean => ({
  type: SHOW_UPLOAD_MODAL_FUNCTION,
  boolean
});

export const SIGN_IN_MODAL = 'SIGN_IN_MODAL';
export const signInModal = () => ({
  type: SIGN_IN_MODAL
});

export const SIGN_UP_MODAL = 'SIGN_UP_MODAL';
export const signUpModal = () => ({
  type: SIGN_UP_MODAL
});

export const TUTORIAL_MODAL = 'TUTORIAL_MODAL';
export const tutorialModal = () => ({
  type: TUTORIAL_MODAL
});

export const UPDATE_LOCATION_IN_LOCALS_MAP = 'UPDATE_LOCATION_IN_LOCALS_MAP';
export const updateLocationInLocalsMap = (review) => ({
  type: UPDATE_LOCATION_IN_LOCALS_MAP,
  review
});

export const UPDATE_PROFILE_PICTURE_MODAL = 'UPDATE_PROFILE_PICTURE_MODAL';
export const updateProfilePictureModal = () => ({
  type: UPDATE_PROFILE_PICTURE_MODAL
});

export const UPDATE_USER_DETAILS_MODAL = 'UPDATE_USER_DETAILS_MODAL';
export const updateUserDetailsModal = () => ({
  type: UPDATE_USER_DETAILS_MODAL
});

export const filterLocations = (locationIds, actionType) => (dispatch, getState) => {
  const allLocations = [...getState().locations]; 
  const filteredLocations = allLocations.filter(location => {
    if (locationIds.indexOf(location.id) !== -1) {
      return location; 
    }
  }); 
  dispatch({
    type: actionType, 
    filteredLocations
  }); 
};

export const removeSelectedTag = (tagId) => (dispatch, getState) => {
  const selectedTags = [...getState().selectedTags]; 
  const index = selectedTags.indexOf(tagId); 
  selectedTags.splice(index, 1); 
  dispatch({
    type: DESELECT_TAG, 
    selectedTags
  });
};

